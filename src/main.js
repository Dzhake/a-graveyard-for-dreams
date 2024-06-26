/**
 * A Graveyard for Dreams
 * 
 * (c) 2020 Jani Nykänen
 */

import { Application } from "./core/application.js";
import { AudioIntro } from "./setting_audiointro.js";


window.onload = () => (new Application(160, 144, 0))
    .loadAssets("assets/assets.json")
    .addActions(
        [
            // Arrow keys are added by default
            {name: "fire1", key: "KeyZ", button1: 0},
            {name: "fire2", key: "KeyX", button1: 2},
            {name: "fire3", key: "KeyC", button1: 1},
            {name: "start", key: "Enter", button1: 9, button2: 7},
            {name: "back", key: "Escape", button1: 8, button2: 6},
            {name: "select", key: "ShiftLeft", button1: 4, button2: 5},
        ]
    )
    .run(AudioIntro);