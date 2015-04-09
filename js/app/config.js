/**
 * General configuration information
 * @module app/config
 */
define(function(){
    "use strict"

    /**
     * @alias module:app/config
     * @namespace
     * @property {object}  config                   - Configuration options
     * @property {object}  config.game              - General game configuration
     * @property {number}  config.game.width        - Width of the canvas in px
     * @property {number}  config.game.height       - Height of the canvas in px
     *
     * @property {object}  config.grid              - Grid settings
     * @property {number}  config.grid.cellSize     - Width/Height of each cell in px
     * @property {number}  config.grid.speed        - Speed the grid moves in px/update
     *
     * @property {object}  config.color              - Color options
     * @property {number}  config.color.unbreakable  - Color of the central unbreakable blocks
     * @property {number}  config.color.available    - List of colors used for levels in ascending order
     *
     * @property {object}  config.sound                   - Sound settings
     * @property {object}  config.sound.beat              - Beat detection settings
     * @property {number}  config.sound.beat.delay        - Minimum frames between beats
     * @property {number}  config.sound.beat.decayRate    - Decay rate of beat threshold
     * @property {number}  config.sound.beat.minThreshold - Minimum volume of beat
     */
    var config = {
        game : {
            width : 1000,
            height : window.innerHeight,
        },
        grid : {
            cellCount : 10,
            speed : 4
        },
        player : {
            defaultSpeed : 4,
            defaultAttackRate : 100
        },
        powerups : {
            dropRate : 0.2
        },
        color : {
            background : [
                0x0193CD,
                0xB2248F,
                0x590000,
                0xCCCCCC
            ]
        },
        sound : {
            beat : {
                delay : 45,
                decayRate : 0.95,
                minThreshold : 60
            },
        },
    };

    return config;
})
