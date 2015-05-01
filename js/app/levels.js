/**
 * A module defining the level ordering
 * @module app/enemies
 */
define(["app/config", "app/level/1", "app/level/2", "app/level/3"],
function(config, level1, level2, level3){
    "use strict"

    level1.then(level2).then(level3);
    return level1;
});
