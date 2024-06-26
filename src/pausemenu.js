/**
 * A Graveyard for Dreams
 * 
 * (c) 2020 Jani Nykänen
 */

import { State } from "./core/input.js";
import { Menu, MenuButton } from "./menu.js";
import { MessageBox } from "./messagebox.js";
import { drawBoxWithOutlines } from "./misc.js";
import { ItemType } from "./progress.js";


export class PauseMenu {


    constructor(resetCB, quitCB, mapCB, ev) {

        let loc = ev.assets.localization["en"];

        this.message = new MessageBox(ev);
        this.menu = new Menu(12, true,
        [

            new MenuButton(loc["resume"], (ev) => {

                this.deactivate(ev);
            }, false),

            new MenuButton(loc["respawn"], (ev) => {

                this.showRespawnMessage(ev);
            }, false),

            new MenuButton(loc["map"], (ev) => {

                mapCB(ev);
                
            }, false),

            new MenuButton(loc["quit"], (ev) => {

                this.showQuitMessage(ev);
            }, false),
        ]);

        this.resetCB = resetCB;
        this.quitCB = quitCB;
        // this.mapCB = mapCB;

        this.active = false;
    }


    activate(progress) {

        this.active = true;
        this.menu.activate(0);

        this.menu.toggleButton(2, 
            !progress.isIntro && progress.hasItem(ItemType.DreamMap));
    }


    deactivate(ev) {

        this.menu.deactivate();
        this.active = false;

        ev.audio.resumeMusic();
    }


    showRespawnMessage(ev) {

        let loc = ev.assets.localization["en"];

        this.message.addMessage(loc["respawnText"])
            .activate((ev) => {

                this.resetCB(ev);

                this.menu.deactivate();
                this.active = false;
            }, true);
    }


    showQuitMessage(ev) {

        let loc = ev.assets.localization["en"];

        this.message.addMessage(loc["quitText"])
            .activate((ev) => {

                this.quitCB(ev);

                this.menu.deactivate();
                this.active = false;
            }, true);
    }


    update(ev) {

        if (!this.active) return;

        if (this.message.active) {

            this.message.update(ev);
            return;
        }

        if (ev.input.actions["back"].state == State.Pressed) {

            ev.audio.playSample(ev.assets.samples["deny"], 0.60);
            this.deactivate(ev);
            return;
        }

        this.menu.update(ev);
    }


    draw(c, mapActive) {

        const BOX_WIDTH = 76;
        const BOX_HEIGHT = 48;

        if (!this.active || mapActive) return;

        c.setColor(0, 0, 0, 0.67);
        c.fillRect(0, 0, c.width, c.height);

        if (this.message.active) {

            this.message.draw(c, true);
            return;
        }

        drawBoxWithOutlines(c, 
            c.width/2 - BOX_WIDTH/2, c.height/2 - BOX_HEIGHT/2, 
            BOX_WIDTH, BOX_HEIGHT);

        this.menu.draw(c, c.width/2, c.height/2 +1);
    }
}
