/**
 * Framework
 * 
 * @module Widgets
 */

/**
 * Message
 *
 * @class OOJ_Message
 */
var OOJ_Message = OOJ_Dialog.extend({

	sMode: '',

	/**
	 * Constructor.
	 * 
	 * @method init
	 * @param	{Object}	oOptions	Options. 
	 * 
	 * @return	{OOJ_Message}
	 */
	init: function(oOptions) {
		var oOptions;
		var vButtons;
		var fnCancel;
		var fnBuilt;

		fnCancel = this.closeDialog.bind(this);
		fnBuilt  = this.dialogBuilt.bind(this);

		vButtons = [];
		vButtons.push({sName:'Cerrar', sID:'btnCancel', fnClick:fnCancel});

		oOptions.vButtons = vButtons;
		oOptions.fnCompleted = fnBuilt;
		oOptions.bModal = false;
		this.sMode = oOptions.sMode;

		//oOptions.sTitle = '';
		if (this.sMode == 'E') {
			oOptions.sID = 'msgWarning';
		} else if (this.sMode == 'W') {
			oOptions.sID = 'msgError';
		} else if (this.sMode == 'I') {
			oOptions.sID = 'msgInfo';
		} else {
			oOptions.sID = 'msgOther';
		}

		this._super(false, oOptions);
		this.divBody.innerHTML = oOptions.sHTML;

		this.divModal.addEventListener('click', fnCancel);

	},

	dialogBuilt: function() {
		if (this.sMode == 'U') {
			
		} else if (this.sMode == 'C') {
			
		}
	}

});

