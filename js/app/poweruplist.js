/**
 * This module is here to force require to actually load all of the
 * powerup modules. If nothing depends on them, require won't load them,
 * but the construction of the basic Powerup in the initialization of the
 * derived powerups is what actually puts them into the pool to be dropped.
 * So, just require all of them here, and then require this in create.
 */
define(["app/powerups/triple", "app/powerups/shield",
        "app/powerups/bomb", "app/powerups/missle",
        "app/powerups/beam"], function(){});
