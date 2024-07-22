/**
 * Framework
 * 
 * @module Widgets
 */

/**
 * Message
 *
 * @class OOJ_Confirm
 */
var OOJ_Confirm = OOJ_Dialog.extend({

	fnAccept: null,
	oCBParams:null,

	/**
	 * Constructor.
	 * 
	 * @method init
	 * @param	{Object}	oOptions	Options. 
	 * 
	 * @return	{OOJ_Confirm}
	 */
	init: function(sTitle, sText, sCancel, sAccept, fnCBAccept, oCBParams) {
		var oOptions;
		var vButtons;
		var fnCancel;
		var fnAccept;
		var fnBuilt;

		this.fnAccept = fnCBAccept;
		if (oCBParams) {
			this.oCBParams = oCBParams;
		}

		fnCancel = this.closeDialog.bind(this);
		fnAccept = this.acceptDialog.bind(this);
		fnBuilt  = this.dialogBuilt.bind(this);

		vButtons = [];
		vButtons.push({sName:sCancel, sID:'btnCancel', fnClick:fnCancel});
		vButtons.push({sName:sAccept, sID:'btnAccept', fnClick:fnAccept});

		oOptions = {};
		oOptions.sTitle = sTitle;
		oOptions.vButtons = vButtons;
		oOptions.fnCompleted = fnBuilt;

		this._super(false, oOptions);
		this.divBody.innerHTML = sText;

		this.divModal.addEventListener('click', fnCancel);

	},

	/**
	 * Called by parent class when the dialog is built.
	 * 
	 * @method dialogBuilt
	 * @private
	 */
	dialogBuilt: function() {

	},

	/**
	 * Called when user clicks on 'accept' button.
	 * 
	 * @method acceptDialog
	 * @private
	 */
	acceptDialog: function() {
		this.closeDialog();

		if (this.fnAccept) {
			this.fnAccept(this.oCBParams);
		}

	}


});

