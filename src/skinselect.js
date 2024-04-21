/**
 * A Graveyard for Dreams
 * 
 * (c) 2020 Jani Nykänen
 */

import { Menu, MenuButton } from "./menu.js";
import { Scene } from "./core/scene.js";
import { Intro } from "./intro.js";


export class SkinSelect extends Scene {


    constructor(ev, param) {

        super(ev, param);

        let startScene = Intro;
        let loc = ev.assets.localization["en"];

        this.menu = new Menu(12, true,
            [
                new MenuButton(
                    loc["defaultskin"], (ev) => {

                        ev.settings.skin = "figure";

                        ev.changeScene(startScene);
                        
                    }, false),
                new MenuButton(
                    loc["npcskin"], (ev) => {

                        ev.settings.skin = "figure_npc";
                        ev.changeScene(startScene);
                    }, true),
                new MenuButton(
                    loc["sleepyskin"], (ev) => {

                        ev.settings.skin = "figure_sleepy";
                        ev.changeScene(startScene);
                    }, true)
            ]);

        this.questionText = loc["skinselect"];
    }


    refresh(ev) {

        this.menu.update(ev);
    }


    redraw(c) {

        c.clear(0, 85, 170);

        c.drawText(c.bitmaps["font"],
            this.questionText,
            32, c.height/2 - 32, 0, 2, false);

        this.menu.draw(c, c.width/2, c.height/2+16);
    }

}
