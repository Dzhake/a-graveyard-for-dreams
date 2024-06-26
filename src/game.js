/**
 * A Graveyard for Dreams
 * 
 * (c) 2020 Jani Nykänen
 */

import { Scene } from "./core/scene.js";
import { Stage } from "./stage.js";
import { ObjectManager } from "./objectmanager.js";
import { GameProgress, ItemType } from "./progress.js";
import { Camera, ROOM_HEIGHT, ROOM_WIDTH } from "./camera.js";
import { State } from "./core/input.js";
import { TransitionType } from "./core/transition.js";
import { RGB } from "./core/vector.js";
import { MessageBox } from "./messagebox.js";
import { PauseMenu } from "./pausemenu.js";
import { TitleScreen } from "./titlescreen.js";
import { loadData } from "./savedata.js";
import { Shop } from "./shop.js";
import { GameMap } from "./gamemap.js";
import { PlayerSkin } from "./settings.js";


export const MAIN_THEME_VOLUME = 0.25;


export class Game extends Scene {


    constructor(ev, param) {

        super(ev, param);

        let loadedData = null;
        if (param === true) {

            loadedData = loadData();        
        }

        this.progress = new GameProgress();
        if (loadedData != null) {

            loadedData.applyProgress(this.progress);
        }

        // TODO: Unneeded variable, remove
        this.isIntro = this.progress.isIntro;

        this.stage = new Stage(ev.assets, this.isIntro);
        this.cam = new Camera(0, 0, 160, 144,
            (this.stage.width/ROOM_WIDTH) | 0,
            (this.stage.height/ROOM_HEIGHT) | 0,
            true);

        if (!this.isIntro) {

            this.progress.setRoomCount(
                this.cam.screenCountX, 
                this.cam.screenCountY);
        }

        this.message = new MessageBox(ev);
        this.shop = new Shop(this.progress, this.message, ev);
       
        this.objects = new ObjectManager(this.progress, this.shop, this.message); 
        this.stage.parseObjects(this.objects, 
            (ev) => this.portalCallback(ev),
            (ev) => this.resetCallback(ev));
        this.objects.positionCamera(this.cam);

        this.shop.constructMenu(this.objects.player, ev);
        
        this.pauseMenu = new PauseMenu(ev => {

                this.objects.killPlayer(ev);
            }, 
            ev => {
                
                this.quit(ev);
            }, 
            ev => {

                this.activateMap(this.pauseMenu.message, false, ev);
            },
            ev);

        this.playMainTheme(ev);

        ev.tr.activate(false, TransitionType.CircleOutside, 
            this.isIntro ? 1.0/60.0 : 1.0/30.0, 
            null, new RGB(0, 0, 0));
        this.objects.centerTransition(ev.tr);
        this.objects.initialCheck(this.cam);

        // If I write "param == null" someone will come here
        // to say that "== true" is useless. But param can be null!
        if (loadedData != null) {

            loadedData.applySavePoint(this.objects.player);       
            this.objects.positionCamera(this.cam);
        }
        this.shop.disableButtons();
        
        this.gameMap = new GameMap(this.stage.width, this.stage.height, ev);

        this.updatePlayerSkin = true;
    }


    playMainTheme(ev) {

        // Work of art
        ev.audio.playMusic(
            ev.assets.samples[
                this.isIntro ? "intro" : 
                (this.progress.isNight ? "theme1" : "theme2")
            ],
            MAIN_THEME_VOLUME);
    }


    reset(ev, doNotGoToCheckpoint) {
        this.updatePlayerSkin = true;

        this.stage.reset();
        this.objects.reset(this.stage, 
            (ev) => this.portalCallback(ev), 
            (ev) => this.resetCallback(ev),
            doNotGoToCheckpoint);
        this.cam.reset();
        this.objects.positionCamera(this.cam);
        this.objects.centerTransition(ev.tr);
        this.objects.initialCheck(this.cam);
        this.progress.reset();

        this.shop.constructMenu(this.objects.player, ev);
        this.shop.disableButtons();

        this.playMainTheme(ev); 
        
    }


    portalCallback(ev) {

        // ev.audio.stopMusic();

        this.isIntro = !this.isIntro;
        this.progress.isIntro = this.isIntro;

        this.stage = new Stage(ev.assets, this.isIntro);
        this.gameMap = new GameMap(this.stage.width, this.stage.height, ev);

        this.cam = new Camera(0, 0, 160, 144,
            (this.stage.width/ROOM_WIDTH) | 0,
            (this.stage.height/ROOM_HEIGHT) | 0,
            true);    
        if (!this.isIntro) {
            
            this.progress.setRoomCount(
                this.cam.screenCountX, 
                this.cam.screenCountY);
        }

        this.reset(ev, true);
    }


    resetCallback(ev) {

        this.reset(ev, false);
    }


    resetTransition(ev) {

        ev.tr.activate(true, TransitionType.CircleOutside, 
            1.0/30.0, 
            (ev) => this.reset(ev, false), null,
            new RGB(0, 0, 0));
        this.objects.centerTransition(ev.tr);
    }


    quit(ev) {

        ev.tr.activate(true, TransitionType.VerticalBar, 
            1.0/30.0, 
            (ev) => {

                ev.changeScene(TitleScreen);
                ev.tr.deactivate();
            },
            new RGB(0, 0, 0));

    }


    activateMap(msg, playSound, ev) {

        let loc = ev.assets.localization["en"];

        if (!this.progress.isIntro &&
            this.progress.hasItem(ItemType.DreamMap)) {

            this.gameMap.activate(this.stage.generateMapData(), 
                this.objects.player.pos, this.cam, this.progress,
                this.objects.interactableObjects);

            // Sound effect
            if (playSound)
                ev.audio.playSample(ev.assets.samples["pause"], 0.60);
        }
        else {

            for (let m of loc["noMap"]) {

                msg.addMessage(m);
            }
            msg.activate(() => {}, false);

            // Sound effect
            if (playSound)
                ev.audio.playSample(ev.assets.samples["deny"], 0.60);
        }
    }


    refresh(ev) {

        // Needed when using doors etc
        if (this.cam.jumpForced) {

            this.objects.initialCheck(this.cam);
            this.cam.jumpForced = false;
        }

        if (this.updatePlayerSkin) {
            this.objects.player.skin = PlayerSkin;
            this.updatePlayerSkin = false;
        }

        if (ev.tr.active) return;

        if (this.gameMap.active) {

            this.gameMap.update(ev);
            return;
        }

        if (this.message.active) {

            this.message.update(ev);
            return; 
        }

        if (this.shop.active) {

            this.shop.update(ev);
            return;
        }

        if (this.pauseMenu.active) {

            this.pauseMenu.update(ev);
            return;
        }

        // Map
        if (!this.cam.moving &&
            ev.input.actions["select"].state == State.Pressed) {

            this.activateMap(this.message, true, ev);

            return;
        }

        // Pause
        if (ev.input.actions["start"].state == State.Pressed) {

            this.pauseMenu.activate(this.progress);
            ev.audio.pauseMusic();

            // Sound effect
            ev.audio.playSample(ev.assets.samples["pause"], 0.60);
            
            return;
        }

        this.stage.update(this.cam, ev);
        if (!this.objects.update(this.cam, this.stage, this.message, ev)) {

            this.resetTransition(ev);
            return;
        }
        this.cam.update(ev);
    }


    dispose() {

        // ...
    }


    genItemString(count, icon) {

        return String.fromCharCode(icon) + 
               String.fromCharCode(2) + 
               String(count);
    }


    drawHUD(c, coinOnly) {

        const SIDE_OFFSET = 2;

        let bmp = c.bitmaps["font"];

        c.setColor(0, 0, 0, 0.33);
        c.fillRect(0, 0, c.width, 10);

        // Coins
        let str = this.genItemString(this.progress.coins, 6);
        c.drawText(bmp, str, c.width - str.length*8 -1, 1, 0, 0, false);

        if (coinOnly) return;

        // Life
        let x;
        for (let i = 0; i < this.progress.maxHealth; ++ i) {

            x = ((i / 2) | 0)*9;

            // Gray
            if (i % 2 == 0) {

                c.drawBitmapRegion(bmp, 40, 0, 8, 8,
                    x + SIDE_OFFSET, 1);
            }

            // Red
            if (this.progress.health > i) {

                c.drawBitmapRegion(bmp, 32 + (i % 2)*4, 0, 4, 8,
                    x + SIDE_OFFSET + (i % 2) * 4, 1);
            }
        }

        if (this.progress.keys > 0 || this.progress.orbs > 0 ||
            this.progress.stars > 0) {

            c.fillRect(0, c.height-10, c.width, 10);
        }

        // Other items
        if (this.progress.keys > 0) {

            c.drawText(bmp, this.genItemString(this.progress.keys, 7), 
                SIDE_OFFSET, c.height-9, 
                1, 0, false);
        }

        if (!this.isIntro && this.progress.stars > 0) {

            str = this.genItemString(this.progress.stars, 9);
            c.drawText(bmp, str, 
                c.width - str.length*8 -SIDE_OFFSET -1, c.height-9, 
                1, 0, false);
        }
        // This should not happen at the same time, anyway, but
        // in the case of a bug it is more important to draw the
        // stars (since when the player can collect them he or she
        // should not have orbs in the first place)
        else if (this.progress.orbs > 0) {
            
            str = this.genItemString(this.progress.orbs, 8);
            c.drawText(bmp, str, 
                c.width - str.length*8 -SIDE_OFFSET -1, c.height-9, 
                1, 0, false);
        }      
    }


    redraw(c) {

        c.moveTo(0, 0);
        
        this.stage.drawBackground(c, this.cam, this.progress.isNight);

        this.cam.use(c);
        if (!this.paused)
            c.applyShake();

        this.stage.draw(c, this.cam, this.progress.isNight && !this.progress.isIntro);
        this.objects.draw(c, this.cam);

        this.cam.use(c);
        this.stage.postDraw(c, this.cam, this.progress.isInFinalRoom);

        c.moveTo(0, 0);
        this.drawHUD(c, false);
        
        c.moveTo(0, 0);
        this.objects.postDraw(c);

        if (this.message.active) {

            this.message.draw(c, true);
        }
        this.pauseMenu.draw(c, this.gameMap.active);
        this.shop.draw(c);

        if (this.shop.active)
            this.drawHUD(c, true);

        this.gameMap.draw(c);
    }
}
