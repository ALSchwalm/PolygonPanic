/**
* Original shader from http://glsl.heroku.com/e#12260.0
* Tweaked, uniforms added and converted to Phaser/PIXI by Richard Davey
*/
Phaser.Filter.Lightwave = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.alpha = { type: '1f', value: 1.0 };
    this.uniforms.vrp = { type: '3f', value: { x: 0.0, y: -5.0, z: 0.0 }};
    this.uniforms.color1 = { type: '3f', value: { x: 0, y: 1, z: 1 }};
    this.uniforms.color2 = { type: '3f', value: { x: 1, y: 1, z: 1 }};
    this.fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2     resolution;",

        "#define PI 3.1415926535897932384626433832795",

        "const float position = 0.0;",
        "const float scale = 1.0;",
        "const float intensity = 1.0;",

        // "varying vec2 surfacePosition;",
        // "vec2 pos;",

        "float band(vec2 pos, float amplitude, float frequency) {",
            "float wave = scale * amplitude * sin(1.0 * PI * frequency * pos.x + time) / 2.05;",
            "float light = clamp(amplitude * frequency * 0.02, 0.001 + 0.001 / scale, 5.0) * scale / abs(wave - pos.y);",
            "return light;",
        "}",

        "void main() {",

            "vec3 color = vec3(0.5, 1.5, 10.0);",
            "color = color == vec3(0.0) ? vec3(10.5, 0.5, 1.0) : color;",
            "vec2 pos = (gl_FragCoord.xy / resolution.xy);",
            "pos.y += - 0.5;",
            "float spectrum = 0.0;",
            "const float lim = 28.0;",
            "#define time time*0.037 + pos.x*10.",
            "for(float i = 0.0; i < lim; i++){",
                "spectrum += band(pos, 1.0*sin(time*0.1/PI), 1.0*sin(time*i/lim))/pow(lim, 0.25);",
            "}",

            "spectrum += band(pos, cos(10.7), 2.5);",
            "spectrum += band(pos, 0.4, sin(2.0));",
            "spectrum += band(pos, 0.05, 4.5);",
            "spectrum += band(pos, 0.1, 7.0);",
            "spectrum += band(pos, 0.1, 1.0);",

            "gl_FragColor = vec4(color * spectrum, spectrum);",

        "}"
    ];
};

Phaser.Filter.Lightwave.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Lightwave.prototype.constructor = Phaser.Filter.Lightwave;

Phaser.Filter.Lightwave.prototype.init = function (width, height) {

    this.setResolution(width, height);

};

Phaser.Filter.Lightwave.prototype.setColor1 = function (red, green, blue) {

    this.uniforms.color1.value.x = red;
    this.uniforms.color1.value.y = green;
    this.uniforms.color1.value.z = blue;

};

Phaser.Filter.Lightwave.prototype.setColor2 = function (red, green, blue) {

    this.uniforms.color2.value.x = red;
    this.uniforms.color2.value.y = green;
    this.uniforms.color2.value.z = blue;

};

Object.defineProperty(Phaser.Filter.Lightwave.prototype, 'alpha', {

    get: function() {
        return this.uniforms.alpha.value;
    },

    set: function(value) {
        this.uniforms.alpha.value = value;
    }

});

Object.defineProperty(Phaser.Filter.Lightwave.prototype, 'cameraX', {

    get: function() {
        return this.uniforms.vrp.value.x;
    },

    set: function(value) {
        this.uniforms.vrp.value.x = value;
    }

});

Object.defineProperty(Phaser.Filter.Lightwave.prototype, 'cameraY', {

    get: function() {
        return this.uniforms.vrp.value.y;
    },

    set: function(value) {
        this.uniforms.vrp.value.y = value;
    }

});

Object.defineProperty(Phaser.Filter.Lightwave.prototype, 'cameraZ', {
    get: function() {
        return this.uniforms.vrp.value.z;
    },

    set: function(value) {
        this.uniforms.vrp.value.z = value;
    }

});
