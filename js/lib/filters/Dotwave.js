/**
* Original shader from http://glsl.heroku.com/e#12260.0
* Tweaked, uniforms added and converted to Phaser/PIXI by Richard Davey
*/
Phaser.Filter.Dotwave = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.alpha = { type: '1f', value: 1.0 };
    this.uniforms.vrp = { type: '3f', value: { x: 0.0, y: -5.0, z: 0.0 }};
    this.uniforms.color1 = { type: '3f', value: { x: 0, y: 1, z: 1 }};
    this.uniforms.color2 = { type: '3f', value: { x: 1, y: 1, z: 1 }};
    this.fragmentSrc = [
        "precision mediump float;",

        "uniform vec2      resolution;",
        "uniform float     time;",

        "#define PI 90",

        "void main( void ) {",

        "vec2 p = ( gl_FragCoord.xy / resolution.xy ) - 0.5;",

        "float sx = 0.3 * (p.x + 0.8) * sin( 900.0 * p.x - 1. * pow(time, 0.55)*5.);",

        "float dy = 4./ ( 500.0 * abs(p.y - sx));",

        "dy += 1./ (25. * length(p - vec2(p.x, 0.)));",

        "gl_FragColor = vec4( (p.x + 0.1) * dy, 0.3 * dy, dy, 1.1 );",

    "}"];
};

Phaser.Filter.Dotwave.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Dotwave.prototype.constructor = Phaser.Filter.Dotwave;

Phaser.Filter.Dotwave.prototype.init = function (width, height) {

    this.setResolution(width, height);

};

Phaser.Filter.Dotwave.prototype.setColor1 = function (red, green, blue) {

    this.uniforms.color1.value.x = red;
    this.uniforms.color1.value.y = green;
    this.uniforms.color1.value.z = blue;

};

Phaser.Filter.Dotwave.prototype.setColor2 = function (red, green, blue) {

    this.uniforms.color2.value.x = red;
    this.uniforms.color2.value.y = green;
    this.uniforms.color2.value.z = blue;

};

Object.defineProperty(Phaser.Filter.Dotwave.prototype, 'alpha', {

    get: function() {
        return this.uniforms.alpha.value;
    },

    set: function(value) {
        this.uniforms.alpha.value = value;
    }

});

Object.defineProperty(Phaser.Filter.Dotwave.prototype, 'cameraX', {

    get: function() {
        return this.uniforms.vrp.value.x;
    },

    set: function(value) {
        this.uniforms.vrp.value.x = value;
    }

});

Object.defineProperty(Phaser.Filter.Dotwave.prototype, 'cameraY', {

    get: function() {
        return this.uniforms.vrp.value.y;
    },

    set: function(value) {
        this.uniforms.vrp.value.y = value;
    }

});

Object.defineProperty(Phaser.Filter.Dotwave.prototype, 'cameraZ', {
    get: function() {
        return this.uniforms.vrp.value.z;
    },

    set: function(value) {
        this.uniforms.vrp.value.z = value;
    }

});
