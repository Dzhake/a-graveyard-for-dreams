/**
 * A Graveyard for Dreams
 * 
 * (c) 2020 Jani Nykänen
 */

import { Menu, MenuButton } from "./menu.js";
import { Game } from "./game.js";
import { Scene } from "./core/scene.js";
import { Flip } from "./core/canvas.js";
import { TransitionType } from "./core/transition.js";
import { RGB } from "./core/vector.js";
import { MessageBox } from "./messagebox.js";
import { State } from "./core/input.js";
import { StoryIntro } from "./storyintro.js";


const APPEAR_TIME = 60;


export class TitleScreen extends Scene {


    constructor(ev, param) {

        super(ev, param);

        this.loc = ev.assets.localization["en"];

        this.menu = new Menu(12, true,
            [
                new MenuButton(
                    this.loc["newgame"], (ev) => {

                        ev.audio.stopMusic();

                        this.load = false;
                        this.gotoGame(ev);
                        
                    }, false),
                new MenuButton(
                    this.loc["continue"], (ev) => {

                        let exist = false;
                        try {

                            exist = window.localStorage.getItem("agff_savedata");
                        }
                        catch(e) {

                            exist = false;
                        }
                        if (!exist) {

                            ev.audio.playSample(ev.assets.samples["deny"], 0.60);
                            this.message.addMessage(this.loc["noSaveData"])
                                .activate((ev) => {}, false);

                            return;
                        }
                        ev.audio.stopMusic();

                        this.load = true;
                        this.gotoGame(ev);
                    }, true)
            ]);

        this.phase = 0;
        this.timer = APPEAR_TIME;

        this.load = false;
    
        this.message = new MessageBox(ev);

        ev.audio.fadeInMusic(ev.assets.samples["titleScreen"], 0.225, 2000);
    }


    gotoGame(ev) {

        ev.tr.activate(true, TransitionType.CircleOutside, 
            1.0/30.0, 
            (ev) => {
                
                ev.changeScene(this.load ? Game : StoryIntro);
                if (!this.load)
                    ev.tr.deactivate();
            },
            new RGB(0, 0, 0));

        ev.tr.setCenter(78, 24);
    }


    refresh(ev) {

        if (ev.tr.active) return;

        if (this.message.active) {

            this.message.update(ev);
            return;
        }

        if (this.phase == 0) {

            if ((this.timer -= ev.step) <= 0) {

                ++ this.phase;
                this.timer = 29;
            }
        }
        else if (this.phase == 1) {

            if (ev.input.actions["start"].state == State.Pressed ||
                ev.input.actions["fire1"].state == State.Pressed) {

                ++ this.phase;
                ev.audio.playSample(ev.assets.samples["pause"], 0.60);
            }

            this.timer = (this.timer + ev.step) % 60;
        }
        else if (this.phase == 2) {

            this.menu.update(ev);
        }
    }


    redraw(c) {

        c.clear(0, 0, 0);

        let t = 0;
        if (this.phase == 0) {

            t = this.timer / APPEAR_TIME;
        }

        let bmp = c.bitmaps["titlebg"];
        c.drawBitmap(bmp, 0, bmp.height * t, Flip.None);

        bmp = c.bitmaps["logo"];
        c.drawBitmap(c.bitmaps["logo"], 0, -bmp.height*t + 8, Flip.None);

        c.drawText(c.bitmaps["font"],
            this.loc["copyright"],
            c.width/2 + c.width*t, c.height-9, 0, 0, true);

        if (this.phase == 2) {

            this.menu.draw(c,  c.width/2, c.height-32);
        }
        else if (this.phase == 1) {

            if (this.timer >= 30) {

                c.drawText(c.bitmaps["font"], "Press Enter or (Start)",
                    c.width/2, c.height/2 + 32, -1, 0, true);
            }
        }

        this.message.draw(c, true);

        if (this.phase > 0) {

            c.drawText(c.bitmaps["fontYellow"], "v.0.9.3 BETA", 1, 1, -1, 0, false);
        }
    }


    dispose() {

        return this.load;
    }

}
