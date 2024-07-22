/**
 * Framework
 * 
 * @module Widgets
 */

/**
 * Mask
 * 
 * @class OOJ_Mask
 * @constructor
 * @method init
 * @param {Object}	oOptions Options.
 * 
 * @return {OOJ_Dialog}
 */
var OOJ_Mask = Class.extend({
	
	oElement: null,
	vData: null,
	vInvalid: [],

	iOMPosition: 0,
	iCMPosition: 0,
	useInput: true,
	byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
	keyStrokeCompensation: 10,
	sVOld: '',
	oTranslation: {
		'0': {pattern: /\d/},
		'9': {pattern: /\d/, bOptional : true},
		'#': {pattern: /\d/, bRecursive: true},
		'A': {pattern: /[a-zA-Z0-9]/},
		'S': {pattern: /[a-zA-Z]/}
	},
	sPlaceholder:null,
	bReverse: false,
	sMask:null,


	/**
	 * Constructor.
	 * 
	 * @method init
	 * @param {Object}	oOptions Options.
	 * 
	 * @return {OOJ_Dialog}
	 */
	init : function(oOptions) {
		var iCaret;
		var sMasked;

		this.oElement = oOptions.oElement;
		this.vData = [];

		this.sMask = oOptions.sMask;

		if (oOptions.sPlaceholder) {
			this.sPlaceholder = oOptions.sPlaceholder;
			this.oElement.setAttribute('placeholder', this.sPlaceholder);
		}

		this.unbindEvents();
		this.bindEvents();

		iCaret = this.getCaret();
		sMasked = this.getMasked();
		this.controlValue(sMasked);
		this.setCaret(iCaret);
	},

	unbindEvents: function() {
		var fnKDown;
		var fnIHandler;
		var fnChange;
		var fnBlur;

		fnDown     = this.keyDown.bind(this);
		fnIHandler = this.inputHandler.bind(this);
		fnChange   = this.changedValue.bind(this);
		fnBlur     = this.blurControl.bind(this);

		this.oElement.removeEventListener('keydown', fnDown);
		this.oElement.removeEventListener('input', fnIHandler);
		this.oElement.removeEventListener('change', fnChange);
		this.oElement.removeEventListener('blur', fnBlur);

	},

	storeData:function(sKey, oValue) {
		var oKV;
		var iLng;
		var iIdx;
		var bFound;

		oKV = {};
		oKV.sKey = sKey;
		oKV.oValue = oValue;

		bFound = false;
		iLng = this.vData.length;
		for (iIdx = 0; iIdx < iLng; iIdx++) {
			if (this.vData[iIdx].sKey == sKey) {
				this.vData[iIdx].oValue = oValue;
				break;
			}
		}

		if (!bFound) {
			this.vData.push(oKV);
		}
	},

	retrieveData:function(sKey) {
		var oValue;
		var iLng;
		var iIdx;
		var bFound;

		oValue = null;
		iLng = this.vData.length;
		for (iIdx = 0; iIdx < iLng; iIdx++) {
			if (this.vData[iIdx].sKey == sKey) {
				oValue = this.vData[iIdx].oValue;
				break;
			}
		}

		return oValue;
	},

	inArray: function(vArray, iValue) {
		var iLng;
		var iIdx;
		var bFound;

		bFound = false;
		iLng = vArray.length;
		for (iIdx = 0; iIdx < iLng; iIdx++) {
			if (vArray[iIdx]  == iValue) {
				bFound = true;
				break;
			}
		}

		return bFound;
	},

	controlValue: function(sValue) {
		var bInput;
		var sContent;

		sContent = sValue;
		bInput = false;
		if (this.oElement.tagName == 'INPUT') {
			bInput = true;
		}

		if (arguments.length > 0) {
			if (bInput) {
				this.oElement.value = sValue;
			} else {
				this.oElement.innerHTML = sValue;
			}
		} else {
			sContent = this.oElement.value;
		}

		return sContent;
	},

	getCaret : function() {
		try {
			var oRange;
			var iPos;
			var fnSelection;
			var iSStart;

			iPos = 0;
			fnSelection = document.selection;
			iSStart = this.oElement.selectionStart;

			// IE Support
			if (fnSelection && navigator.appVersion.indexOf('MSIE 10') === -1) {
				oRange = fnSelection.createRange();
				oRange.moveStart('character', -this.controlValue().length);
				iPos = oRange.text.length;
			} else if (iSStart || iSStart === '0') {
				// Firefox support
				iPos = iSStart;
			}

			return iPos;
		} catch (e) {
		}
	},

	setCaret : function(iPos) {
		try {
			if (this.oElement.hasFocus) {
				var oRange;


				// Firefox, WebKit, etc..
				if (this.oElement.setSelectionRange) {
					this.oElement.setSelectionRange(iPos, iPos);
				} else { // IE
					oRange = this.oElement.createTextRange();
					oRange.collapse(true);
					oRange.moveEnd('character', iPos);
					oRange.moveStart('character', iPos);
					oRange.select();
				}
			}
		} catch (e) {
		}
	},

	keyDown: function(e) {
		this.storeData('mask-keycode', e.keyCode || e.which);
		this.storeData('mask-previus-value', this.oElement.value);
		this.storeData('mask-previus-caret-pos', this.getCaret());

		this.iOMPosition = this.iCMPosition;
	},

	positionCompensation: function() {
		var iPos;

		iPos = this.calculateCaretPosition();
		this.setCaret(iPos);
	},

	inputHandler : function(e) {
		var keyCode;
		var newVal;
		var caretPos;
		var fnCompensation;

		e = e || window.event;

		this.vInvalid = [];
		keyCode = this.retrieveData('mask-keycode');

		if (!this.inArray(this.byPassKeys, keyCode)) {
			newVal = this.getMasked();
			caretPos = this.getCaret();

			fnCompensation = this.positionCompensation.bind(this);
			setTimeout(fnCompensation, this.keyStrokeCompensation);

			this.controlValue(newVal);
			this.setCaret(caretPos);

			return this.callbacks(e);
		}
	},

	changedValue: function(e) {
		this.storeData('changed', true);
	},

	blurControl: function(e) {
		var bChanged;

		bChanged = this.retrieveData('changed');
		if (this.sVOld !== this.controlValue() && !bChanged) {
			//el.trigger('change');
		}

		this.storeData('changed', false);
	},

	bindEvents : function() {
		var fnKDown;
		var fnIHandler;
		var fnChange;
		var fnBlur;

		fnDown     = this.keyDown.bind(this);
		fnIHandler = this.inputHandler.bind(this);
		fnChange   = this.changedValue.bind(this);
		fnBlur     = this.blurControl.bind(this);

		this.oElement.addEventListener('keydown', fnDown);
		if (this.useInput) {
			this.oElement.addEventListener('input', fnIHandler);
		}

		this.oElement.addEventListener('change', fnChange);
		this.oElement.addEventListener('blur', fnBlur);

	},

	getRegexMask : function() {
		var maskChunks = [], translation, pattern, optional, recursive, oRecursive, r;

		for (var i = 0; i < mask.length; i++) {
			translation = jMask.translation[mask.charAt(i)];

			if (translation) {

				pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
				optional = translation.bOptional;
				recursive = translation.bRecursive;

				if (recursive) {
					maskChunks.push(mask.charAt(i));
					oRecursive = {digit : mask.charAt(i), pattern : pattern};
				} else {
					maskChunks.push(!optional && !recursive ? pattern : (pattern + '?'));
				}

			} else {
				maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
			}
		}

		r = maskChunks.join('');

		if (oRecursive) {
			r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?').replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
		}

		return new RegExp(r);
	},


	calculateCaretPosition : function() {
		var oldVal;
		var newVal;
		var caretPosNew;

		oldVal      = this.retrieveData('mask-previus-value') || '';
		newVal      = this.getMasked();
		caretPosNew = this.getCaret();

		if (oldVal !== newVal) {
			var caretPosOld = this.retrieveData('mask-previus-caret-pos') || 0;
			var newValL = newVal.length;
			var oldValL = oldVal.length;
			var maskDigitsBeforeCaret = 0;
			var maskDigitsAfterCaret = 0;
			var maskDigitsBeforeCaretAll = 0;
			var maskDigitsBeforeCaretAllOld = 0;
			var i = 0;

			for (i = caretPosNew; i < newValL; i++) {
				if (!this.iCMPosition[i]) {
					break;
				}
				maskDigitsAfterCaret++;
			}

			for (i = caretPosNew - 1; i >= 0; i--) {
				if (!this.iCMPosition[i]) {
					break;
				}
				maskDigitsBeforeCaret++;
			}

			for (i = caretPosNew - 1; i >= 0; i--) {
				if (this.iCMPosition[i]) {
					maskDigitsBeforeCaretAll++;
				}
			}

			for (i = caretPosOld - 1; i >= 0; i--) {
				if (this.iOMPosition[i]) {
					maskDigitsBeforeCaretAllOld++;
				}
			}

			if (caretPosNew > oldValL) {
				caretPosNew = newValL * 10;
			} else if (caretPosOld >= caretPosNew && caretPosOld !== oldValL) {
				if (!this.iOMPosition[caretPosNew]) {
					var caretPos = caretPosNew;
					caretPosNew -= maskDigitsBeforeCaretAllOld - maskDigitsBeforeCaretAll;
					caretPosNew -= maskDigitsBeforeCaret;
					if (this.iCMPosition[caretPosNew]) {
						caretPosNew = caretPos;
					}
				}
			} else if (caretPosNew > caretPosOld) {
				caretPosNew += maskDigitsBeforeCaretAll - maskDigitsBeforeCaretAllOld;
				caretPosNew += maskDigitsAfterCaret;
			}
		}

		return caretPosNew;
	},

	getMasked : function(bSkip, val) {
		var sVNew;
		var vBuffer;
		var sValue;
		var m;
		var maskLen;
		var v = 0;
		var valLen;
		var offset;
		var addMethod;
		var resetPos;
		var maskDigitCount;
		var maskDigitPosArr;
		var lastMaskChar;
		var fnCheck;
		var lastMaskCharDigit;
		var lastUntranslatedMaskChar;

		sValue = val === undefined ? this.controlValue() : val + '';
		valLen = sValue.length;
		vBuffer = [];
		m = 0;
		maskLen = this.sMask.length;
		offset = 1;
		addMethod = 'push';
		resetPos = -1;
		maskDigitCount = 0;
		maskDigitPosArr = [];

		if (this.bReverse) {
			addMethod = 'unshift';
			offset = -1;
			lastMaskChar = 0;
			m = maskLen - 1;
			v = valLen - 1;
			fnCheck = function() {
				return m > -1 && v > -1;
			};
		} else {
			lastMaskChar = maskLen - 1;
			fnCheck = function() {
				return m < maskLen && v < valLen;
			};
		}

		while (fnCheck()) {
			var maskDigit;
			var valDigit;
			var translation;

			maskDigit = this.sMask.charAt(m);
			translation = this.oTranslation[maskDigit];
			valDigit = sValue.charAt(v);

			if (translation) {
				if (valDigit.match(translation.pattern)) {
					vBuffer[addMethod](valDigit);
					if (translation.bRecursive) {
						if (resetPos === -1) {
							resetPos = m;
						} else if (m === lastMaskChar && m !== resetPos) {
							m = resetPos - offset;
						}

						if (lastMaskChar === resetPos) {
							m -= offset;
						}
					}
					m += offset;
				} else if (valDigit === lastUntranslatedMaskChar) {
					maskDigitCount--;
					lastUntranslatedMaskChar = undefined;
				} else if (translation.bOptional) {
					m += offset;
					v -= offset;
				} else if (translation.fallback) {
					vBuffer[addMethod](translation.fallback);
					m += offset;
					v -= offset;
				} else {
					this.vInvalid.push({p : v, v : valDigit, e : translation.pattern});
				}
				v += offset;
			} else {
				if (!bSkip) {
					vBuffer[addMethod](maskDigit);
				}

				if (valDigit === maskDigit) {
					maskDigitPosArr.push(v);
					v += offset;
				} else {
					lastUntranslatedMaskChar = maskDigit;
					maskDigitPosArr.push(v + maskDigitCount);
					maskDigitCount++;
				}

				m += offset;
			}
		}

		lastMaskCharDigit = this.sMask.charAt(lastMaskChar);
		if (maskLen === valLen + 1 && !this.oTranslation[lastMaskCharDigit]) {
			vBuffer.push(lastMaskCharDigit);
		}

		sVNew = vBuffer.join('');
		this.mapMaskdigitPositions(sVNew, maskDigitPosArr, valLen);

		return sVNew;
	},

	mapMaskdigitPositions : function(newVal, maskDigitPosArr, valLen) {
		var maskDiff;

		maskDiff = this.bReverse ? newVal.length - valLen : 0;
		this.iCMPosition = {};
		for (var i = 0; i < maskDigitPosArr.length; i++) {
			this.iCMPosition[maskDigitPosArr[i] + maskDiff] = 1;
		}
	},

	callback: function(name, criteria, args) {
		if (typeof this[name] === 'function' && criteria) {
			this[name].apply(this, args);
		}
	},

	callbacks : function(e) {
		var sValue;
		var changed;
		var defaultArgs;

		sValue = this.controlValue();

		changed = sValue !== this.sVOld;
		defaultArgs = [ sValue, e, this.oElement, this ];

		this.callback('onChange'  , changed === true, defaultArgs);
		this.callback('onKeyPress', changed === true, defaultArgs);
		this.callback('onComplete', sValue.length === this.sMask.length, defaultArgs);
		this.callback('onInvalid' , this.vInvalid.length > 0, [ sValue, e, this.oElement, this.vInvalid, this ]);
	}

});
