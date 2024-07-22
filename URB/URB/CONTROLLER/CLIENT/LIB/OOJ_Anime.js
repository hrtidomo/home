
var OOJ_Anime = Class.extend({

	defaultInstanceSettings: null,
	defaultTweenSettings: null,
	validTransforms: ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective'],
	cache: {CSS: {}, springs: {}},

	init : function() {
		this.defaultInstanceSettings = {
				update: null,
				begin: null,
				loopBegin: null,
				changeBegin: null,
				change: null,
				changeComplete: null,
				loopComplete: null,
				complete: null,
				loop: 1,
				direction: 'normal',
				autoplay: true,
				timelineOffset: 0
		};

		this.defaultTweenSettings = {
				duration: 1000,
				delay: 0,
				endDelay: 0,
				easing: 'easeOutElastic(1, .5)',
				round: 0
		};

	},

	minMax: function(val, min, max) {
		return Math.min(Math.max(val, min), max);
	},

	stringContains: function(str, text) {
		return str.indexOf(text) > -1;
	},

	applyArguments: function(func, args) {
		return func.apply(null, args);
	},

	is: {
		arr: function (a) { return Array.isArray(a); },
		obj: function (a) { return this.stringContains(Object.prototype.toString.call(a), 'Object'); },
		pth: function (a) { return this.is.obj(a) && a.hasOwnProperty('totalLength'); },
		svg: function (a) { return a instanceof SVGElement; },
		inp: function (a) { return a instanceof HTMLInputElement; },
		dom: function (a) { return a.nodeType || this.is.svg(a); },
		str: function (a) { return typeof a === 'string'; },
		fnc: function (a) { return typeof a === 'function'; },
		und: function (a) { return typeof a === 'undefined'; },
		hex: function (a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a); },
		rgb: function (a) { return /^rgb/.test(a); },
		hsl: function (a) { return /^hsl/.test(a); },
		col: function (a) { return (this.is.hex(a) || this.is.rgb(a) || this.is.hsl(a)); },
		key: function (a) { return !this.defaultInstanceSettings.hasOwnProperty(a) && !this.defaultTweenSettings.hasOwnProperty(a) && a !== 'targets' && a !== 'keyframes'; }
	},

	parseEasingParameters: function(string) {
		var match = /\(([^)]+)\)/.exec(string);
		return match ? match[1].split(',').map(function (p) { return parseFloat(p); }) : [];
	},

	// Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js
	spring: function(string, duration) {
		var params = parseEasingParameters(string);
		var mass = minMax(is.und(params[0]) ? 1 : params[0], .1, 100);
		var stiffness = minMax(is.und(params[1]) ? 100 : params[1], .1, 100);
		var damping = minMax(is.und(params[2]) ? 10 : params[2], .1, 100);
		var velocity =  minMax(is.und(params[3]) ? 0 : params[3], .1, 100);
		var w0 = Math.sqrt(stiffness / mass);
		var zeta = damping / (2 * Math.sqrt(stiffness * mass));
		var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
		var a = 1;
		var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;

		function solver(t) {
			var progress = duration ? (duration * t) / 1000 : t;
			if (zeta < 1) {
				progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
			} else {
				progress = (a + b * progress) * Math.exp(-progress * w0);
			}
			if (t === 0 || t === 1) { return t; }
			return 1 - progress;
		}

		function getDuration() {
			var cached = cache.springs[string];
			if (cached) { return cached; }
			var frame = 1/6;
			var elapsed = 0;
			var rest = 0;
			while(true) {
				elapsed += frame;
				if (solver(elapsed) === 1) {
					rest++;
					if (rest >= 16) { break; }
				} else {
					rest = 0;
				}
			}
			var duration = elapsed * frame * 1000;
			cache.springs[string] = duration;
			return duration;
		}

		return duration ? solver : getDuration;
	},

	// Elastic easing adapted from jQueryUI http://api.jqueryui.com/easings/
	elastic: function(amplitude, period) {
		if ( amplitude === void 0 ) amplitude = 1;
		if ( period === void 0 ) period = .5;

		var a = minMax(amplitude, 1, 10);
		var p = minMax(period, .1, 2);
		return function (t) {
			return (t === 0 || t === 1) ? t : 
				-a * Math.pow(2, 10 * (t - 1)) * Math.sin((((t - 1) - (p / (Math.PI * 2) * Math.asin(1 / a))) * (Math.PI * 2)) / p);
		}
	},

	// Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function
	steps: function(steps) {
		if ( steps === void 0 ) steps = 10;

		return function (t) { return Math.round(t * steps) * (1 / steps); };
	},

	// BezierEasing https://github.com/gre/bezier-easing
	bezier: function () {
		var kSplineTableSize = 11;
		var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

		function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1 }
		function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1 }
		function C(aA1)      { return 3.0 * aA1 }

		function calcBezier(aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT }
		function getSlope(aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1) }

		function binarySubdivide(aX, aA, aB, mX1, mX2) {
			var currentX, currentT, i = 0;
			do {
				currentT = aA + (aB - aA) / 2.0;
				currentX = calcBezier(currentT, mX1, mX2) - aX;
				if (currentX > 0.0) { aB = currentT; } else { aA = currentT; }
			} while (Math.abs(currentX) > 0.0000001 && ++i < 10);
			return currentT;
		}

		function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
			for (var i = 0; i < 4; ++i) {
				var currentSlope = getSlope(aGuessT, mX1, mX2);
				if (currentSlope === 0.0) { return aGuessT; }
				var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
				aGuessT -= currentX / currentSlope;
			}
			return aGuessT;
		}

		function bezier(mX1, mY1, mX2, mY2) {
			if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) { return; }
			var sampleValues = new Float32Array(kSplineTableSize);

			if (mX1 !== mY1 || mX2 !== mY2) {
				for (var i = 0; i < kSplineTableSize; ++i) {
					sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
				}
			}

			function getTForX(aX) {

				var intervalStart = 0;
				var currentSample = 1;
				var lastSample = kSplineTableSize - 1;

				for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
					intervalStart += kSampleStepSize;
				}

				--currentSample;

				var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
				var guessForT = intervalStart + dist * kSampleStepSize;
				var initialSlope = getSlope(guessForT, mX1, mX2);

				if (initialSlope >= 0.001) {
					return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
				} else if (initialSlope === 0.0) {
					return guessForT;
				} else {
					return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
				}

			}

			return function (x) {
				if (mX1 === mY1 && mX2 === mY2) { return x; }
				if (x === 0 || x === 1) { return x; }
				return calcBezier(getTForX(x), mY1, mY2);
			}

		}

		return bezier;
	},

	penner: function () {
		var names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Sine', 'Expo', 'Circ', 'Back', 'Elastic'];

		// Approximated Penner equations http://matthewlein.com/ceaser/
		var curves = {
				In: [
					[0.550, 0.085, 0.680, 0.530], /* inQuad */
					[0.550, 0.055, 0.675, 0.190], /* inCubic */
					[0.895, 0.030, 0.685, 0.220], /* inQuart */
					[0.755, 0.050, 0.855, 0.060], /* inQuint */
					[0.470, 0.000, 0.745, 0.715], /* inSine */
					[0.950, 0.050, 0.795, 0.035], /* inExpo */
					[0.600, 0.040, 0.980, 0.335], /* inCirc */
					[0.600,-0.280, 0.735, 0.045], /* inBack */
					elastic /* inElastic */
					],
				Out: [
					[0.250, 0.460, 0.450, 0.940], /* outQuad */
					[0.215, 0.610, 0.355, 1.000], /* outCubic */
					[0.165, 0.840, 0.440, 1.000], /* outQuart */
					[0.230, 1.000, 0.320, 1.000], /* outQuint */
					[0.390, 0.575, 0.565, 1.000], /* outSine */
					[0.190, 1.000, 0.220, 1.000], /* outExpo */
					[0.075, 0.820, 0.165, 1.000], /* outCirc */
					[0.175, 0.885, 0.320, 1.275], /* outBack */
					function (a, p) { return function (t) { return 1 - elastic(a, p)(1 - t); }; } /* outElastic */
					],
				InOut: [
					[0.455, 0.030, 0.515, 0.955], /* inOutQuad */
					[0.645, 0.045, 0.355, 1.000], /* inOutCubic */
					[0.770, 0.000, 0.175, 1.000], /* inOutQuart */
					[0.860, 0.000, 0.070, 1.000], /* inOutQuint */
					[0.445, 0.050, 0.550, 0.950], /* inOutSine */
					[1.000, 0.000, 0.000, 1.000], /* inOutExpo */
					[0.785, 0.135, 0.150, 0.860], /* inOutCirc */
					[0.680,-0.550, 0.265, 1.550], /* inOutBack */
					function (a, p) { return function (t) { return t < .5 ? elastic(a, p)(t * 2) / 2 : 1 - elastic(a, p)(t * -2 + 2) / 2; }; } /* inOutElastic */
					]
		};

		var eases = { 
				linear: [0.250, 0.250, 0.750, 0.750]
		};

		var loop = function ( coords ) {
			curves[coords].forEach(function (ease, i) {
				eases['ease'+coords+names[i]] = ease;
			});
		};

		for (var coords in curves) loop( coords );

		return eases;

	},

	parseEasings: function(easing, duration) {
		if (is.fnc(easing)) { return easing; }
		var name = easing.split('(')[0];
		var ease = penner[name];
		var args = parseEasingParameters(easing);
		switch (name) {
			case 'spring' : return spring(easing, duration);
			case 'cubicBezier' : return applyArguments(bezier, args);
			case 'steps' : return applyArguments(steps, args);
			default : return is.fnc(ease) ? applyArguments(ease, args) : applyArguments(bezier, ease);
		}
	}



});
