/**
 * A Graveyard for Fools
 * 
 * (c) 2020 Jani Nykänen
 */

import { Menu, MenuButton } from "./menu.js";
import { Game } from "./game.js";
import { Scene } from "./core/scene.js";
import { Flip } from "./core/canvas.js";
import { TransitionType } from "./core/transition.js";
import { RGB } from "./core/vector.js";


const APPEAR_TIME = 60;


export class TitleScreen extends Scene {


    constructor(ev, param) {

        super(ev, param);

        this.loc = ev.assets.localization["en"];

        this.menu = new Menu(12, true,
            [
                new MenuButton(
                    this.loc["newgame"], (ev) => {

                        this.gotoGame(ev);
                        
                    }, false),
                new MenuButton(
                    this.loc["continue"], (ev) => {

                        this.gotoGame(ev);
                    }, true)
            ]);

        this.phase = 0;
        this.timer = APPEAR_TIME;
    }


    gotoGame(ev) {

        ev.tr.activate(true, TransitionType.CircleOutside, 
            1.0/30.0, 
            (ev) => ev.changeScene(Game),
            new RGB(0, 0, 0));

        ev.tr.setCenter(78, 24);
    }


    refresh(ev) {

        if (this.phase == 0) {

            if ((this.timer -= ev.step) <= 0) {

                ++ this.phase;
            }
        }
        else if (this.phase == 1) {

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

        this.menu.draw(c, -c.width * t + c.width/2, c.height-32);
    }

}