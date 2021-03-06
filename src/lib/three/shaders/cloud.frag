#pragma glslify: fm3d = require('glsl-fractal-brownian-noise/3d')
#pragma glslify: snoise3 = require('glsl-noise/simplex/3d')
#pragma glslify: levels = require('./levels')


uniform sampler2D uTxtShape;
uniform sampler2D uTxtCloudNoise;
uniform float uSpeed;
uniform float uTime;
uniform float uFac1;
uniform float uFac2;
uniform float uTimeFactor1;
uniform float uTimeFactor2;
uniform float uDisplStrength1;
uniform float uDisplStrength2;

varying vec2 vUv;

void main() {
	vec2 newUv = vUv;

	vec4 txtNoise1 = texture2D(uTxtCloudNoise, vec2(vUv.x + uTime * 0.0001, vUv.y - uTime * 0.0014 * uSpeed)); // these multipliers affect speed
	vec4 txtNoise2 = texture2D(uTxtCloudNoise, vec2(vUv.x - uTime * 0.00002, vUv.y + uTime * 0.00017 * uSpeed + 0.2)); // these multipliers affect speed

	float noiseBig = fm3d(vec3(vUv * uFac1, uTime * uTimeFactor1), 4) + 1.0 * 0.5;
	newUv += noiseBig * uDisplStrength1;

	float noiseSmall = snoise3(vec3(newUv * uFac2, uTime * uTimeFactor2));

	vec4 txtShape = texture2D(uTxtShape, newUv);

	float alpha = levels((txtNoise1 + txtNoise2) * 0.6, 0.2, 0.4, 0.7).r; // these multipliers affect density
	alpha *= txtShape.r;

	gl_FragColor = vec4(vec3(0.95, 0.95, 0.95), alpha);
}