/**
 * A Graveyard for Fools
 * 
 * (c) 2020 Jani Nykänen
 */

import { Menu, MenuButton } from "./menu.js";
import { Game } from "./game.js";
import { Scene } from "./core/scene.js";


export class AudioIntro extends Scene {


    constructor(ev, param) {

        super(ev, param);

        let loc = ev.assets.localization["en"];

        this.menu = new Menu(12, true,
            [
                new MenuButton(
                    loc["yes"], (ev) => {

                        ev.audio.toggle(true);
                        ev.audio.setGlobalSampleVolume(0.60);   

                        ev.changeScene(Game);
                        
                    }, false),
                new MenuButton(
                    loc["no"], (ev) => {

                        ev.audio.toggle(false);
                        ev.changeScene(Game);
                    }, true)
            ]);

        this.questionText = loc["audiointro"];
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
