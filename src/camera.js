/**
 * A Graveyard for Dreams
 * 
 * (c) 2020 Jani Nykänen
 */

import { Vector2 } from "./core/vector.js";


export const ROOM_WIDTH = 10;
export const ROOM_HEIGHT = 9;


export class Camera {

    
    constructor(x, y, w, h, 
        screenCountX, screenCountY, loopx) {

        this.pos = new Vector2(x, y);
        this.target = this.pos.clone();
        this.rpos = this.pos.clone();

        this.startPos = this.pos.clone();

        this.width = w;
        this.height = h;

        this.moving = false;
        this.moveTimer = 0;
        this.moveSpeed = 0;

        this.screenCountX = screenCountX;
        this.screenCountY = screenCountY;
        this.loopx = loopx;

        this.isLooping = false;
        this.loopDir = 0;

        this.jumpForced = false;
    }


    reset() {

        this.pos = this.startPos.clone();
        this.target = this.pos.clone();
        this.rpos = this.pos.clone();

        this.moving = false;
        this.moveTimer = 0;
        this.moveSpeed = 0;
    }


    move(dx, dy, speed) {

        if (this.moving) return 0;

        if (!this.loopx && ((this.pos.x == 0 && dx < 0) ||
            (this.pos.x == this.screenCountX-1 && dx > 0) )) {

            return 0;
        }
        if (!this.loopy && ((this.pos.y == 0 && dy < 0) ||
            (this.pos.y == this.screenCountY-1 && dy > 0) )) {
 
            return 0;
        }

        this.moveTimer = 1.0;
        this.moveSpeed = speed;

        this.target.x = (this.pos.x + dx) | 0;
        this.target.y = (this.pos.y + dy) | 0;

        this.moving = true;

        if (this.loopx && this.target.x < 0) {

            this.pos.x += this.screenCountX;
            this.target.x += this.screenCountX;

            this.isLooping = true;
            this.loopDir = -1;

            return 1;
        }
        else if (this.loopx && this.target.x >= this.screenCountX) {

            this.pos.x -= this.screenCountX;
            this.target.x -= this.screenCountX;

            this.isLooping = true;
            this.loopDir = 1;

            return -1;
        }

        this.isLooping = false; 

        return 0;
    }


    updateMovement(ev) {

        this.jumpForced = false;

        if (!this.moving) return;

        if ((this.moveTimer -= this.moveSpeed * ev.step) <= 0) {

            this.moveTimer = 0;
            this.pos = this.target.clone();
            this.rpos = this.pos.clone();

            this.moving = false;
            this.isLooping = false;

            return;
        }

        // Compute "render position"
        let t = this.moveTimer;

        this.rpos.x = t * this.pos.x + (1 - t) * this.target.x;
        this.rpos.y = t * this.pos.y + (1 - t) * this.target.y;
    }


    update(ev) {

        this.updateMovement(ev);
    }


    use(c) {

        c.moveTo(-Math.round(this.rpos.x * this.width), 
                 -Math.round(this.rpos.y * this.height));
    }


    useYOnly(c) {

        c.moveTo(0, -Math.round(this.rpos.y * this.height));
    }


    setPosition(x, y) {

        this.pos = new Vector2(x, y);
        this.target = this.pos.clone();
        this.rpos = this.pos.clone();

        this.jumpForced = true;
    }


    isObjectInside(o) {

        if (o.spr == undefined) return false;

        let left = this.rpos.x * this.width;
        let top = this.rpos.y * this.height;

        return o.pos.x + o.spr.width/2 >= left &&
               o.pos.y + o.spr.height/2 >= top &&
               o.pos.x - o.spr.width/2 < left + this.width &&
               o.pos.y - o.spr.height/2 < top + this.height;
    }
}
