/**
* Original shader from http://glsl.heroku.com/e#12260.0
* Tweaked, uniforms added and converted to Phaser/PIXI by Richard Davey
*/
Phaser.Filter.Plane = function (game) {
    this.game = game;
    Phaser.Filter.call(this, game);
    this.uniforms.iChannel0 = {
        type: 'sampler2D',
        value: null,
        textureData: { repeat: true }
    };


    this.fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform sampler2D iChannel0;",

        "void main( void ) {",

            "float t = time;",

            "vec2 uv = gl_FragCoord.xy / resolution.xy;",
            "vec2 texcoord = gl_FragCoord.xy / vec2(resolution.y);",

            "texcoord.y -= t*0.2;",

            "float zz = 1.0/(1.0-uv.y*1.7);",
            "texcoord.y -= zz * sign(zz);",

            "vec2 maa = texcoord.xy * vec2(zz, 1.0) - vec2(zz, 0.0) ;",
            "vec2 maa2 = (texcoord.xy * vec2(zz, 1.0) - vec2(zz, 0.0))*0.3 ;",
            "vec4 stone = texture2D(iChannel0, maa);",
            "vec4 blips = texture2D(iChannel0, maa);",
            "vec4 mixer = texture2D(iChannel0, maa2);",

            "float shade = abs(1.0/zz);",

            "vec3 outp = mix(shade*stone.rgb, mix(1.0, shade, abs(sin(t+maa.y-sin(maa.x))))*blips.rgb, min(1.0, pow(mixer.g*2.1, 2.0)));",
            "gl_FragColor = vec4(outp,1.0);",

        "}"
    ];
};

Phaser.Filter.Plane.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Plane.prototype.constructor = Phaser.Filter.Plane;

Phaser.Filter.Plane.prototype.init = function (width, height, texture) {
    this.setResolution(width, height);
    this.uniforms.iChannel0.value = texture;
};
