/**
 * A module which defines a type representing levels in the game
 * @module app/level
 */
define(["app/config", "app/background", "app/music", "app/player"],
function(config, background, music, player){
    "use strict"

    var Level = function(phases, backgroundKey, musicKey){
        this.phases = phases;
        this.currentPhase = null;
        this.nextLevel = null;
        this.backgroundKey = backgroundKey || "CheckerWave";
        this.musicKey = musicKey || "level1";
    };

    Level.prototype.init = function(game) {
        this.game = game;
        var l = this.nextLevel;
        while(l) {
            l.init(game);
            l = l.nextLevel;
        }
        return this;
    }

    Level.prototype.start = function(){
        this.nextPhase();
        background.setBackground(this.backgroundKey);
        music.play(this.musicKey);
    };

    Level.prototype.stop = function(){
        this.currentPhase.stop();
    };

    Level.prototype.nextPhase = function(){
        if (this.currentPhase)
            this.currentPhase.stop();
        this.currentPhase = this.phases.shift(1);
        if (this.currentPhase) {
            this.currentPhase.start(this, this.game);
        } else {
            this.endLevel();
        }
    };

    Level.prototype.endLevel = function() {

        // Calculate time played
        var minutes = Math.floor(player.timer.ms / 60000) % 60;
        var seconds = Math.floor(player.timer.ms / 1000) % 60;
        if (seconds < 10)
            seconds = '0' + seconds;
        if (minutes < 10)
            minutes = '0' + minutes;
        var timePlayed = minutes + ':' + seconds;

        $("#level-transition").fadeIn(2000);
        $("#total-score").html(String(player.score));
        $("#enemies-destroyed").html(String(player.killCount));
        $("#time-played").html(timePlayed);
        $("#level-transition button").unbind();
        $("#level-transition button").click(function(){
            $("#level-transition").fadeOut(1000);
            this.nextLevel.start();
        }.bind(this));

        // Heal the player between each level
        player.health = 4;
        player.drawHealthBar();
    }

    Level.prototype.then = function(level) {
        this.nextLevel = level;
        return level;
    }

    return Level;
});
