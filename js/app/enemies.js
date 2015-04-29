/**
 * A module defining a set of enemies to be used throughout levels
 * @module app/enemies
 */
define(["app/config", "app/enemies/line/line1", "app/enemies/line/line2",
        "app/enemies/line/line3", "app/enemies/triangle/triangle1",
        "app/enemies/triangle/triangle2", "app/enemies/triangle/triangle3"],
function(config, Line1, Line2, Line3, Triangle1, Triangle2, Triangle3){
    "use strict"

    return {
        "line1" : Line1,
        "line2" : Line2,
        "line3" : Line3,
        "triangle1" : Triangle1,
        "triangle2" : Triangle2,
        "triangle3" : Triangle3,
    };
});
