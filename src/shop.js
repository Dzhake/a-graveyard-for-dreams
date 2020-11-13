/**
 * A Graveyard for Fools
 * 
 * (c) 2020 Jani Nykänen
 */

import { addItemDescription, applyItemEvent, ChestType } from "./chest.js";
import { Flip } from "./core/canvas.js";
import { State } from "./core/input.js";
import { Menu, MenuButton } from "./menu.js";
import { MessageBox } from "./messagebox.js";
import { drawBoxWithOutlines } from "./misc.js";


const ITEM_TYPES = [
    0, 2, 1, 1, 1
];
const ITEM_IDS = [
    16, 16, 17, 18, 19
];


// What do you mean I'm hard-coding prices?
// ...well, I am. You were right
const PRICES = [
    20, 10, 20, 30, 10
];


export class Shop {


    constructor(progress, globalMessage, ev) {

        this.progress = progress;
        this.menu = null;
        this.active = false;

        // Needed in drawing
        this.loc = ev.assets.localization["en"];

        this.message = new MessageBox(ev);
        this.globalMessage = globalMessage;

        this.itemWaitTime = 0;
    }


    constructMenu(pl, ev) {

        this.menu = new Menu(12, true, this.constructMenuButtons(pl, ev));
    }


    constructMenuButtons(pl, ev) {

        let loc = ev.assets.localization["en"];

        let buttons = new Array();

        for (let i = 0; i < loc["shopItemNames1"].length; ++ i) {

            buttons.push(new MenuButton(" " + loc["shopItemNames1"][i], 
                (ev) => {

                    if (this.progress.isItemBought(i)) {

                        // TODO: Disable the other sound effect
                        // ev.audio.playSample(ev.assets.samples["deny"], 0.60);
                        return;
                    }

                    if (this.progress.coins < PRICES[i]) {

                        this.message.addMessage(loc["cannotAfford"])    
                            .activate((ev) => {}, false);
                    }
                    else {
                        

                        this.message.addMessage(loc["confirmTransaction"])
                            .activate((ev) => {

                                const ITEM_WAIT = 60;
                
                                this.progress.setItemBoughtStatus(i, true);
                                this.progress.addCoins(-PRICES[i]);

                                this.menu.toggleButton(i, false);

                                this.deactivate();
                                addItemDescription(this.loc, this.globalMessage, 
                                    ITEM_TYPES[i], ITEM_IDS[i]);
                                this.itemWaitTime = ITEM_WAIT;

                                pl.setObtainItemPose(ITEM_TYPES[i], 
                                    ITEM_TYPES[i] == ChestType.Item ? ITEM_IDS[i] : 0);

                                // Sound effect
                                ev.audio.playSample(ev.assets.samples["treasure"], 0.50);

                                ev.audio.pauseMusic();
                                this.globalMessage.addStartCondition((ev) => {

                                    return (this.itemWaitTime -= ev.step) <= 0;
                                    
                                }).activate((ev) => {

                                    applyItemEvent(ITEM_TYPES[i], pl);
                                    ev.audio.resumeMusic();

                                }, false);

                            }, true);
                    }

                }, false));
        }

        
        buttons.push(new MenuButton(loc["back"], 
            (ev) => {

                this.deactivate();

            }, true));

        return buttons;
    }


    disableButtons() {

        for (let i = 0; i < this.menu.buttons.length-1; ++ i) {

            if (this.progress.isItemBought(i)) {

                this.menu.toggleButton(i, false);
            }
        }
    }


    update(ev) {

        if (!this.active) return;

        if (this.message.active) {

            this.message.update(ev);
            return;
        }

        if (ev.input.actions["back"].state == State.Pressed) {

            // Sound effect
            ev.audio.playSample(ev.assets.samples["deny"], 0.60);

            this.deactivate();
            return;
        }

        this.menu.update(ev);
    }


    draw(c) {

        const TOP_BOX_WIDTH = 48;
        const TOP_BOX_HEIGHT = 12;
        const TOP_BOX_OFFSET_Y = 4;

        const Y_OFFSET = -12;
        const MENU_X = 60;
        const MENU_RIGHT = 144;
        const BOTTOM_BOX_TOP_OFFSET = -4;
        const BOTTOM_BOX_HEIGHT = 40;

        if (!this.active) return;

        c.setColor(0, 0, 0, 0.67);
        c.fillRect(0, 0, c.width, c.height);

        let topElementY = c.height/2 - this.menu.height/2 + Y_OFFSET;

        // "Shop" box
        drawBoxWithOutlines(c,
            c.width/2 - TOP_BOX_WIDTH/2,
            TOP_BOX_OFFSET_Y,
            TOP_BOX_WIDTH, TOP_BOX_HEIGHT);
        c.drawText(c.bitmaps["font"], "SHOP",
            c.width/2, TOP_BOX_OFFSET_Y+2, 0, 0, true);

        // Name box
        drawBoxWithOutlines(c, 
            MENU_X - (this.menu.width-8)/2 -4, 
            topElementY - 2,
            c.width - (c.width/2 - MENU_X) + 4, 
            this.menu.height);
        // Names
        this.menu.draw(c, MENU_X +4, c.height/2 + Y_OFFSET);

        // Icons
        for (let i = 0; i < PRICES.length; ++ i) {

            c.drawBitmapRegion(c.bitmaps["shopicons"],
                i*8, this.progress.isItemBought(i) ? 8 : 0, 8, 8,
                MENU_X - (this.menu.width-8)/2 + 7, 
                topElementY + i*this.menu.offset, Flip.None);
        }

        // Prices
        let str = "";
        let x = 0;
        let font = "";
        for (let i = 0; i < PRICES.length; ++ i) {

            if (this.progress.isItemBought(i)) {

                str = this.loc["sold"];
                font = "fontGray";
            }
            else {

                font = this.menu.cpos == i ? "fontYellow" : "font";
                str = String(PRICES[i]) + String.fromCharCode(6);
            }
            x = MENU_RIGHT - str.length * 8;

            c.drawText(
                c.bitmaps[font], str, 
                x, topElementY + i*this.menu.offset, 0, 0, false);
        }

        // Bottom box
        let bottomElementY = topElementY + 
            this.menu.height + 
            BOTTOM_BOX_TOP_OFFSET + 12;
        drawBoxWithOutlines(c, 
            MENU_X - (this.menu.width-8)/2 -4, 
            bottomElementY - 4,
            c.width - (c.width/2 - MENU_X) + 4, 
            BOTTOM_BOX_HEIGHT);

        // Description
        if (this.menu.cpos < this.menu.buttons.length-1) {

            str = this.loc["shopItemDesc1"] [this.menu.cpos];
            c.drawText(c.bitmaps["font"], str, 
                MENU_X - (this.menu.width-8)/2, bottomElementY -2, 0, 1, 
                false);
        }
        
        if (this.message.active) {

            c.setColor(0, 0, 0, 0.67);
            c.fillRect(0, 0, c.width, c.height);

            this.message.draw(c, true);
        }
    }


    activate() {

        this.active = true;
        this.menu.activate(this.menu.buttons.length-1);
    }


    deactivate() {

        this.menu.deactivate();
        this.active = false;
    }
}
