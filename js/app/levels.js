/**
 * A module defining the level ordering
 * @module app/enemies
 */
define(["app/config", "app/level/1", "app/level/2"],
function(config, level1, level2){
    "use strict"
    console.log(level2);
    level1.then(level2);
    return level1;
});
