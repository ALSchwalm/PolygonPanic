/**
 * A module defining a set of enemies to be used throughout levels
 * @module app/enemies
 */
define(["app/config", "app/enemies/line/line1", "app/enemies/line/line2",
        "app/enemies/line/line3", "app/enemies/triangle/triangle1",
        "app/enemies/triangle/triangle2", "app/enemies/triangle/triangle3",
        "app/enemies/rhombus/rhombus1", "app/enemies/rhombus/rhombus2",
        "app/enemies/rhombus/rhombus3"],
function(config, Line1, Line2, Line3, Triangle1, Triangle2, Triangle3,
         Rhombus1, Rhombus2, Rhombus3){
    "use strict"

    return {
        "line1" : Line1,
        "line2" : Line2,
        "line3" : Line3,
        "triangle1" : Triangle1,
        "triangle2" : Triangle2,
        "triangle3" : Triangle3,
        "rhombus1"  : Rhombus1,
        "rhombus2"  : Rhombus2,
        "rhombus3"  : Rhombus3
    };
});
