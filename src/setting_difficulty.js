/**
 * A Graveyard for Dreams
 * 
 * (c) 2020 Jani Nykänen
 */

import { Menu, MenuButton } from "./menu.js";
import { Scene } from "./core/scene.js";
import { Intro } from "./intro.js";
import { Settings } from "./settings.js";


export class DifficultySelect extends Scene {


    constructor(ev, param) {

        super(ev, param);

        let startScene = Intro;
        let loc = ev.assets.localization["en"];

        this.menu = new Menu(12, true,
            [
                new MenuButton(
                    loc["difficulty_normal"], (ev) => {

                        Settings.setDifficulty(1)

                        ev.changeScene(startScene);
                        
                    }, false),
                new MenuButton(
                    loc["difficulty_hard"], (ev) => {

                        Settings.setDifficulty(2)
                        ev.changeScene(startScene);
                    }, true),
                new MenuButton(
                    loc["difficulty_very_hard"], (ev) => {

                        Settings.setDifficulty(3)
                        ev.changeScene(startScene);
                    }, true),
                new MenuButton(
                    loc["difficulty_impossible"], (ev) => {

                        Settings.setDifficulty(4)
                        ev.changeScene(startScene);
                    }, true)
            ]);

        this.questionText = loc["difficultyselect"];
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
