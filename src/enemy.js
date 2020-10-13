/**
 * The End of Journey
 * 
 * (c) 2020 Jani Nykänen
 */


import { Vector2 } from "./core/vector.js";
import { CollisionObject } from "./collisionobject.js";
import { clamp, overlay } from "./core/util.js";
import { Sprite } from "./core/sprite.js";
import { Flip } from "./core/canvas.js";


export class Enemy extends CollisionObject {
	
	
	constructor(x, y, row, health, dmg) {
		
		super(x, y);
		
		this.startPos = this.pos.clone();
        
		this.spr = new Sprite(16, 16);
		this.spr.setFrame(0, row+1);
		
		this.maxHealth = health;
		this.health = health;
		this.damage = dmg;
		
		this.hurtTimer = 0;
		this.hurtIndex = -1;
		
		this.dir = 1;
		this.flip = Flip.None;
		
		this.canJump = false;
		
		this.friction = new Vector2(0.1, 0.1);
		this.mass = 1;
		
		this.hitbox = new Vector2(8, 8);
        this.collisionBox = new Vector2(8, 8);
        this.renderOffset = new Vector2(0, 0);
		
		this.deactivated = false;
		
		this.init(x, y);
	}
	
	
	init(x, y) {}
	updateAI(ev) {}
	animate(ev) {}
	playerEvent(pl, ev) {}
	
	
	die(ev) {
		
		const DEATH_SPEED = 6;
		
		this.spr.animate(0, 0, 4, DEATH_SPEED, ev.step);
		return this.spr.frame == 4;
	}

	
	activate() {
		
		this.deactivated = false;
		// TODO: Not for all enemies, though
		this.disableCollisions = false;
		
		this.init(this.startPos.x, this.startPos.y);
	}

	
	updateLogic(ev) {
           
		if (this.deactivated) {
			
			return;
		}
        
        this.updateAI(ev);
        this.animate(ev);
	}
	
	
	postUpdate(ev) {
		
		this.canJump = false;
	}
	
	
	playerCollision(pl, ev) {
		
		const HURT_TIME = 30;
		
		if (this.deactivated) 
			return false;
	
        this.playerEvent(pl, ev);

		pl.hurtCollision(
			this.pos.x + this.center.x - this.hitbox.x/2,
			this.pos.y + this.center.y - this.hitbox.y/2,
			this.hitbox.x, this.hitbox.y,
			this.damage, ev);
		
		if (pl.isSwordActive() && pl.attackId > this.hurtIndex) {
			
			if (overlay(this.pos, this.center, this.hitbox,
				pl.swordHitPos.x, pl.swordHitPos.y,
				pl.swordHitSize.x, pl.swordHitSize.y)) {

				this.health -= pl.getAttackDamage();
				this.speed.x = this.mass * pl.getAttackKnockback();
					
				this.hurtTimer = HURT_TIME;
				this.hurtIndex = pl.attackId;
				
				return true;
			}
		}
		
		return false;
	}
	
	
	draw(c) {
		
		if (this.deactivated ||
			!this.exist || !this.inCamera ||
			(this.hurtTimer > 0 && 
			Math.floor(this.hurtTimer/2) % 2 == 0)) 
			return;
		
		let px = this.pos.x + this.renderOffset.x - this.spr.width/2;
        let py = this.pos.y + this.renderOffset.y - this.spr.height/2;

		this.spr.draw(c, c.bitmaps["enemies"], px | 0, py | 0, this.flip);
	}
	
	
	floorCollisionEvent(x, y, w, ev) {
		
        this.canJump = true;
	}
	
	
	cameraEvent(cam, ev) {
		
		if (!this.exist) return;
		
		let oldState = this.inCamera;
		this.inCamera = cam.isObjectInside(this);
		
		if (!this.inCamera && this.deactivated) {
			
			this.activate();
			return;
		}
		
		// If left the camera, return to the original position
		// (if not dead)
		if (!this.dying &&
			this.inCamera != oldState && oldState) {
			
			this.pos = this.startPos.clone();
			this.stopMovement();
			
			if (!cam.isMoving) {
				
				this.deactivated = true;
				this.disableCollisions = true;
			}
		}
		
		// Collisions with the left and right sides of the
		// camera
		if (!cam.isMoving && this.inCamera) {
			
            this.wallCollision(cam.rpos.x * cam.width, 
                cam.rpos.y * cam.height, cam.height, -1, ev);
            
            this.wallCollision((cam.rpos.x+1) * cam.width, 
                cam.rpos.y * cam.height, cam.height, 1, ev);    
		}
	}
}


/*
 * Enemy types:
 */
 

export function getEnemyType(index) {

    const TYPES = [Walker];
    
    return TYPES[clamp(index, 0, TYPES.length-1) | 0];
}


export class Walker extends Enemy {
	
	
	constructor(x, y) {
		
		super(x, y, 0, 2, 1);
		
		this.friction.x = 0.05;
		
		this.oldCanJump = true;
		
		this.center.y = 2;
		this.collisionBox = new Vector2(4, 12);
        // this.hitbox = new Vector2(8, 8);
        this.renderOffset.y = 1;
	}
	
	
	init(x, y) {
		
		const BASE_SPEED = 0.25;
		const BASE_GRAVITY = 2.0;
		
		this.dir = 2 - 1 * (((x / 16) | 0) % 2);
		this.flip = this.dir > 0 ? Flip.Horizontal : Flip.None;
		
		this.target.x = BASE_SPEED;
		this.speed.x = this.target.x;
		this.target.y = BASE_GRAVITY;
	}
	
	
	updateAI(ev) {
		
		// If going to move off the ledge, change direction
		if (this.oldCanJump && !this.canJump) {
			
			this.dir *= -1;
			this.speed.x *= -1;
			this.target.x *= -1;
			
			this.pos.x += this.speed.x * ev.step;
		}
		
        this.oldCanJump = this.canJump;
	}
	
	
	animate(ev) {
		
		const WALK_ANIM_SPEED = 6.0;
		
		this.flip = this.dir > 0 ? Flip.Horizontal : Flip.None;
		
		if (this.canJump) {
			
			this.spr.animate(this.spr.row, 0, 3, WALK_ANIM_SPEED, ev.step);
		}
	}
	
	
	wallCollisionEvent(x, y, h, dir, ev) {
		
		this.speed.x *= -1;
		this.target.x *= -1;
		
		this.dir *= -1;
	}
}
