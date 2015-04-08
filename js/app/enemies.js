/**
 * A module defining a set of enemies to be used throughout levels
 * @module app/enemies
 */
define(["app/config", "app/enemies/line/line1", "app/enemies/line/line2"],
function(config, Line1, Line2){
    "use strict"

    return {
        "line1" : Line1,
        "line2" : Line2
    };
});
