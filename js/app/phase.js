/**
 * A module with utility functions for generating random colors
 * @module app/level
 */
define(["app/config"],
function(config){
    "use strict"

    var Phase = function(phaseConfig){
        this.config = phaseConfig
    };

    Phase.prototype.start = function(level, game){
        this.level = level;
        this.game = game;
        this.config.onStart.call(this);
    };

    Phase.prototype.stop = function(){
        this.config.onStop.call(this);
    };

    Phase.prototype.nextPhase = function() {
        this.level.nextPhase();
    }

    return Phase;
});
