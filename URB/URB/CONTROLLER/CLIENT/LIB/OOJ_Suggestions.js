/**
 * Framework
 * 
 * @module Widgets
 */

/**
 * The widget provides suggestions while you type into the field.
 *
 * @class OOJ_Suggestions
 * @constructor
 * @method init
 * @param	{Object}			oOptions	Options. 
 * 
 * @return	{OOJ_Suggestions}
 */
var OOJ_Suggestions = OOJ_Widget.extend({

	oSPA: null,
	sMethod: null,
	oInput:null,
	oSuggestions:null,
	iMin:3,
	bBusy:false,
	fnCompleted: null,
	oDlg: null,
	vValues: [],

	/**
	 * Constructor.
	 * 
	 * @method init
	 * @param	{Object}	oOptions	Options. 
	 * 
	 * @return	{OOJ_Suggestions}
	 */
	init: function(oOptions) {
		var oParent;

		this.oSPA    = oOptions.oSPA;
		this.sMethod = oOptions.sMethod;
		this.oInput  = oOptions.oInput;
		this.iMin    = oOptions.iMin;

		oParent = oOptions.oInput;
		while (oParent != null) {
			if (oParent.classList.contains('urb-frm-dialog')) {
				break;
			}

			oParent = oParent.parentNode;
		}

		if (oParent) {
			this.oDlg = oParent;
		}

		this.buildControl();
		this.bindEvents();
	},

	buildControl: function() {

		this.oSuggestions = document.createElement('div');
		this.oSuggestions.id = this.oInput.id +'_' + 'suggestions';
		this.oSuggestions.style.display = 'none';
		this.oSuggestions.style.width = this.oInput.clientWidth + 'px';
		this.oSuggestions.classList.add('urb-frm-dialog-suggestions');

		this.oDlg.appendChild(this.oSuggestions);
	},

	showSuggestions: function() {
		var oPoint;
		var oRD;
		var oR;
		var iLeft;
		var iTop;

		this.bSelected = false;

		oRD = this.oDlg.getBoundingClientRect();
		oR = this.oInput.getBoundingClientRect();

		iTop  = oR.y - oRD.y;
		iLeft = oR.x - oRD.x;

		this.oSuggestions.style.top     = (iTop + oR.height) + 'px';
		this.oSuggestions.style.left    = (iLeft + 15) + 'px';
		this.oSuggestions.style.width   = (oR.width - 15) + 'px';
		this.oSuggestions.style.zIndex  = this.oInput.style.zIndex;
		this.oSuggestions.style.display = 'block';

	},

	hideSuggestions: function() {
		if (this.oSuggestions) {
			this.oSuggestions.style.display = 'none';
		}
	},

	inputHandler : function(e) {
		var sValue;
		var sKCode;
		var iLng;

		e = e || window.event;

		sValue = this.oInput.value;
		iLng = sValue.length;
		if (iLng > this.iMin) {
			if (this.sMethod) {
				this.buildSuggestions(sValue);
			}
		} else {
			this.hideSuggestions();
		}

	},

	bindEvents : function() {
		var fnIHandler;

		fnIHandler = this.inputHandler.bind(this);

		this.oInput.addEventListener('input', fnIHandler);
	},

	/**
	 * Called when the asynchronous buildSuggestions call is completed.
	 *
	 * @method suggestionsReceived
	 * @private
	 * @param	{Boolean}		bSuccess	Indicates success of completion.
	 * @param	{Object}		oResponse	Server side controller response.
	 */
	suggestionsReceived: function(bSuccess, oResponse) {
		if (bSuccess) {
			if (this.fnCompleted) {
				this.fnCompleted(this.oInput, oResponse.vItems);
			}
		}

		this.bBusy = false;
	},

	buildSuggestions: function(sToken) {
		var oP;

		oP = {sMethod:this.sMethod, sToken:sToken};
		this.oSPA.serverController(this.oSPA.sService, oP, this.suggestionsReceived, this);

	}

});
