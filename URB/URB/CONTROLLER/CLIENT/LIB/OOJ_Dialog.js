/**
 * Framework
 * 
 * @module Widgets
 */

/**
 * Dialog
 *
 * @class OOJ_Dialog
 * @constructor
 * @method init
 * @param	{OOJ_Application}	oSPA		Single Page Application. 
 * @param	{Object}			oOptions	Options. 
 * 
 * @return	{OOJ_Dialog}
 */
var OOJ_Dialog = OOJ_Widget.extend({
	iDXPos: 0,
	iDYPos:0,
	iMXPos: 0,
	iMYPos:0,
	bDraggable: true,
	bDragging: false,
	iMode:0,
	oLiterals:null,
	vControls:null,

	oSPA: null,
	sID: '',
	sTitle: '',
	fnCompleted: null,
	fnDLoaded: null,
	divModal: null,
	divWrapper: null,
	divHeader: null,
	divTitle: null,
	divClose: null,
	divBody: null,
	divFooter:null,
	vButtons: null,
	sMethod: '',
	iWidth:0,

	/**
	 * Constructor.
	 * 
	 * @method init
	 * @param	{OOJ_Application}	oSPA		Single Page Application. 
	 * @param	{Object}			oOptions	Options. 
	 * 
	 * @return	{OOJ_Dialog}
	 */
	init: function(oSPA, oOptions) {
		this.oSPA = oSPA;
		this.fnCompleted = oOptions.fnCompleted;
		this.sID         = oOptions.sID;
		this.vButtons    = oOptions.vButtons;
		this.sMethod     = oOptions.sMethod;
		this.iWidth      = oOptions.iWidth;
		this.sTitle      = oOptions.sTitle;

		this.buildDialog();
	},

	/**
	 * Finds control by sID
	 * 
	 * @method findControlIndex
	 * 
	 */
	findControlIndex: function(sID) {
		var iLng;
		var iIdx;

		iIdx = -1;
		if (this.vControls) {
			iLng = this.vControls.length;
			for (iIdx = 0; iIdx < iLng; iIdx++) {
				if (this.vControls[iIdx].sID == sID) {
					break;
				}
			}
		}

		return iIdx;
	},

	/**
	 * Creates all elements of dialog.
	 * 
	 * @method buildDialog
	 * @private
	 */
	buildDialog: function() {
		var iIdx;
		var iLng;
		var fnMDown;
		var fnMUp;
		var fnMMove;
		var fnClose;

		this.divModal   = document.createElement('div');
		this.divWrapper = document.createElement('div');
		this.divHeader  = document.createElement('div');
		this.divTitle   = document.createElement('div');
		this.divClose   = document.createElement('div');
		this.divBody    = document.createElement('div');
		this.divFooter  = document.createElement('div');

		if (this.sTitle) {
			this.divTitle.innerHTML = this.sTitle;
		}

		this.divClose.innerHTML = "<i class='icon-window-close'></i>";

		this.divWrapper.id = this.sID;
		if (this.iWidth) {
			this.divWrapper.setAttribute('style','width:' + this.iWidth + 'px');
		}

		this.divTitle.setAttribute('style','display:inline-block');
		this.divTitle.setAttribute('style','display:inline-block');

		
		this.divModal.classList.add('urb-frm-modal');

		this.divWrapper.classList.add('urb-frm-dialog');
		this.divHeader.classList.add('urb-frm-dialog-header');

		this.divTitle.classList.add('urb-frm-dialog-title');
		this.divClose.classList.add('urb-frm-dialog-close');

		this.divBody.classList.add('urb-frm-dialog-body');
		this.divFooter.classList.add('urb-frm-dialog-footer');

		this.divHeader.appendChild(this.divTitle);
		this.divHeader.appendChild(this.divClose);

		this.divWrapper.appendChild(this.divHeader);
		this.divWrapper.appendChild(this.divBody);
		this.divWrapper.appendChild(this.divFooter);

		if (this.vButtons) {
			iLng = this.vButtons.length;
			for (iIdx = 0; iIdx < iLng; iIdx++) {
				this.vButtons[iIdx].oElement = document.createElement('button');
				this.vButtons[iIdx].oElement.id   = this.sID + '_' + this.vButtons[iIdx].sID;
				if (this.vButtons[iIdx].sName) {
					this.vButtons[iIdx].oElement.innerHTML = this.vButtons[iIdx].sName;
				}

				this.vButtons[iIdx].oElement.addEventListener('click', this.vButtons[iIdx].fnClick);
				this.divFooter.appendChild(this.vButtons[iIdx].oElement);
			}
		}

		this.divModal.appendChild(this.divWrapper);
		document.body.appendChild(this.divModal);

		if (this.bDraggable) {
			fnMDown = this.mouseDown.bind(this);
			fnMUp   = this.mouseUp.bind(this);
			fnMMove = this.moveDialog.bind(this);
			this.divHeader.addEventListener('mousedown', fnMDown);
			document.addEventListener('mouseup'  , fnMUp);
			document.addEventListener('mousemove', fnMMove);
		}

		fnClose = this.closeDialog.bind(this);
		this.divClose.addEventListener('click', fnClose);

		this.divModal.setAttribute('style','display:block;opacity:1;');

		if (this.oSPA) {
			this.loadContent();
		} else {
			if (this.fnCompleted) {
				this.fnCompleted();
			}
		}
	},

	/**
	 * Closes dialog and removes all elements from DOM.
	 *
	 * @method closeDialog
	 * @private
	 */
	closeDialog:function() {
		if (this.divModal) {
			if (document.body.contains(this.divModal)) {
				document.body.removeChild(this.divModal);
			}
		}
	},

	/**
	 * Starts dragging and records position.
	 *
	 * @method dragInit
	 * @private
	 */
	dragInit: function() {
		this.bDragging = true;

		this.iDXPos = this.iMXPos - this.divWrapper.offsetLeft;
		this.iDYPos = this.iMYPos - this.divWrapper.offsetTop;
	},

	/**
	 * Drags dialog according mouse position.
	 *
	 * @method moveDialog
	 * @private
	 */
	moveDialog: function(e) {

		this.iMXPos = document.all ? window.event.clientX : e.pageX;
		this.iMYPos = document.all ? window.event.clientY : e.pageY;
		if (this.bDragging) {
			this.divWrapper.style.left = (this.iMXPos - this.iDXPos) + 'px';
			this.divWrapper.style.top  = (this.iMYPos - this.iDYPos) + 'px';
		}
	},

	/**
	 * Ends dragging.
	 *
	 * @method dragEnd
	 * @private
	 */
	dragEnd: function() {
		this.bDragging = false;
	},

	/**
	 * Starts dragging.
	 *
	 * @method mouseUp
	 * @private
	 */
	mouseDown: function() {
		this.dragInit();
	},

	/**
	 * Determines ending of dragging.
	 *
	 * @method mouseUp
	 * @private
	 */
	mouseUp: function() {
		if (this.bDragging) {
			this.dragEnd();
		}
	},

	/**
	 * Parses field elements of dialog
	 *
	 * @method analyzeDOM
	 * @private
	 */
	analyzeDOM: function() {
		var vChildren;
		var iLng;
		var iIdx;
		var oElement;
		var sType;
		var sTransform;
		var oControl;
		var oObject;
		var oMOptions;
		var iPos;
		var sRE;
		var vMatch;
		var sTxt;
		var sInteger;
		var sDecimal;
		var vParts;
		var iN;
		var sKName;
		var oModal;

		this.vControls = [];
		vChildren = document.getElementById(this.sID).querySelectorAll('input, select, button, textarea');
		iLng = vChildren.length;
		for (iIdx = 0; iIdx < iLng; iIdx++) {
			oElement = vChildren[iIdx];
			sType = oElement.getAttribute('data-dialog-type');
			if (!sType) {
				sType = oElement.type;
			}

			iPos = sType.indexOf('number');
			if (sType == 'date') {
				oMOptions = {};
				oMOptions.oElement = oElement;
				oMOptions.sMask = '00/00/0000';
				oMOptions.sPlaceholder = 'DD/MM/AAAA';
				oObject = new OOJ_Mask(oMOptions);
			} else if (sType == 'calendar') {
				oMOptions = {};
				oMOptions.oElement = oElement;
				oObject = new OOJ_Calendar(oMOptions);
			} else if (sType == 'attachment') {
				oObject = {};
				oObject.key = oElement.getAttribute('data-dialog-kname');
				oObject.value = '0';
				oElement[oObject.key] = oObject.value; 
			} else if (sType == 'suggestions') {
				oMOptions = {};
				oMOptions.oSPA = this.oSPA;
				oMOptions.sMethod = oElement.getAttribute('data-dialog-method');
				oMOptions.oInput = oElement;
				oMOptions.iMin = 3;

				if (oElement.getAttribute('data-dialog-min')) {
					oMOptions.iMin = parseInt(oElement.getAttribute('data-dialog-min'), 10);
				}

				oObject = new OOJ_Suggestions(oMOptions);
			} else if (iPos != -1) {
				sRE = /\((.*)\)/i;
				vMatch = sType.match(sRE)
				if (vMatch.length > 1) {
					sTxt = vMatch[1];
					vParts = sTxt.split(',');
					iN = parseInt(vParts[0]);
					sInteger = '9'.repeat(iN);
					if (vParts.length > 1) {
						iN = parseInt(vParts[1]);
						if (iN > 0) {
							sDecimal = '9'.repeat(iN);
							sInteger = sInteger + '.' + sDecimal;
						}
					} 
					oMOptions = {};
					oMOptions.oElement = oElement;
					oMOptions.sMask = sInteger;
					oObject = new OOJ_Mask(oMOptions);
				}
			}

			sTransform = oElement.getAttribute('data-dialog-transform');
			if (sTransform) {
				if (sTransform == 'upper') {
					oElement.style.textTransform  = 'uppercase';
				}
			} else {
				sTransform = '';
			}

			oControl = {};
			oControl.oElement = oElement;
			oControl.sID = oElement.id;
			oControl.sName = oElement.name;
			oControl.sType = sType;
			oControl.sTransform = sTransform;
			oControl.oObject = oObject;

			this.vControls.push(oControl);
		}
	},

	/**
	 * Called when the asynchronous loadContent call is completed.
	 *
	 * @method contentLoaded
	 * @private
	 * @param	{Boolean}		bSuccess	Indicates success of completion.
	 * @param	{Object}		oResponse	Server side controller response.
	 */
	contentLoaded:function(bSuccess, oResponse) {

		if (bSuccess) {
			if (oResponse.oLiterals) {
				this.oLiterals = oResponse.oLiterals;
			}

			this.divBody.innerHTML = oResponse.sHTML;
			this.analyzeDOM();

			if (this.fnCompleted) {
				this.fnCompleted(oResponse);
			}
		}
	},

	/**
	 * Retrieves HTML from server.
	 *
	 * @method loadContent
	 * @protected
	 */
	loadContent: function() {
		var oP;
		oP = {sMethod:this.sMethod};
		this.oSPA.serverController(this.oSPA.sService, oP, this.contentLoaded, this);
	},

	/**
	 * Creates an object containing all field values and names.
	 *
	 * @method getValues
	 * @protected
	 */
	getValues:function() {
		var oObject;
		var iIdx;
		var iLng;
		var sValue;
		var sKName;
		var sKValue;
		var oItem;
		var bNumber;
		var sV;
		var sT;

		oObject = {};
		if (this.vControls) {
			iLng = this.vControls.length;
			for (iIdx = 0; iIdx < iLng; iIdx++) {
				oItem = this.vControls[iIdx];

				sValue = '';
				bNumber = false;
				if (oItem.sType.indexOf('number') != -1) {
					bNumber = true;
				}

				if (oItem.sType == 'text' || oItem.sType == 'password' || oItem.sType == 'textarea' || oItem.sType == 'mail') {
					sValue = oItem.oElement.value;
				} else if (oItem.sType == 'date') {
					sValue = oItem.oElement.value;
					if (sValue == 'DD/MM/AAAA') {
						sValue = '';
					}
				} else if (oItem.sType == 'calendar') {
					sValue = oItem.oObject.toString();
				} else if (bNumber) {
					sValue = oItem.oElement.value;
					if (isNaN(sValue)) {
						sValue = '';
					}
				} else if (oItem.sType == 'radio') {
					sValue = 'N';
					if (oItem.oElement.checked) {
						sValue = 'Y';
					}

					if (oItem.sType == 'radio') {
						oItem.sName = false;
					}
				} else if (oItem.sType == 'checkbox') {
					sValue = 'N';
					if (oItem.oElement.checked) {
						sValue = 'Y';
					}
				} else if (oItem.sType == 'select-one') {
					if (oItem.oElement.options.length > 0) {
						sV = '';
						if (oItem.oElement.selectedIndex) {
							if (oItem.oElement.selectedIndex != -1) {
								sV = oItem.oElement.options[oItem.oElement.selectedIndex].value;
								sT = oItem.oElement.options[oItem.oElement.selectedIndex].text;
							}
						}
	
						sValue = sV;
					}
				} else if (oItem.sType == 'suggestions') {
					var iLValues;
					var iIValue;

					iLValues = oItem.oObject.vValues.length;
					for (iIValue = 0; iIValue < iLValues; iIValue++) {
						sKName = oItem.sID + '_' + 'V' + iIValue;
						oObject[sKName] = oItem.oObject.vValues[iIValue];
					}
				}

				if (oItem.sTransform == 'upper') {
					sValue = sValue.toUpperCase();
				}

				if (oItem.sName) {
					oObject[oItem.sName] = sValue;
					if (oItem.sType == 'attachment') {
						sKName  = oItem.sName + '_' + oItem.oObject.key;
						oObject[sKName] = oItem.oObject.value;
					}
				} else {
					oObject[oItem.sID] = sValue;
					if (oItem.sType == 'attachment') {
						sKName  = oItem.sID + '_' + oItem.oObject.key;
						oObject[sKName] = oItem.oObject.value;
					}
				}

			}
		}

		return oObject;
	},


	/**
	 * Sends dialog data to server.
	 *
	 * @method pushData
	 * @protected
	 */
	pushData: function(sMethod, oData, fnSent) {
		var oP;

		oP = {sMethod:sMethod, oData:oData};
		this.oSPA.serverController(this.oSPA.sService, oP, fnSent, this);
	},

	/**
	 * Called when the asynchronous loadData call is completed.
	 *
	 * @method dataLoaded
	 * @private
	 * @param	{Boolean}		bSuccess	Indicates success of completion.
	 * @param	{Object}		oResponse	Server side controller response.
	 */
	dataLoaded:function(bSuccess, oResponse) {
		var iAttributes;
		var iItems;
		var sAttribute;
		var sCAttribute;
		var iLng;
		var oItem;
		var sValue;
		var bNumber;
		var sKey;

	

		if (bSuccess) {
			iLng = this.vControls.length;
			for (sAttribute in oResponse.oRecord) {
				for (iElement = 0; iElement < iLng; iElement++) {
					oItem = this.vControls[iElement];
					if (oItem.sName == sAttribute ||
						oItem.sID == sAttribute ) {

						bNumber = false;
						if (oItem.sType.indexOf('number') != -1) {
							bNumber = true;
						}

						sValue = oResponse.oRecord[sAttribute];
						if (oItem.sType == 'text' || oItem.sType == 'suggestions' || oItem.sType == 'mail' || oItem.sType == 'textarea' || oItem.sType == 'date' || bNumber) {
							oItem.oElement.value = sValue;
						} else if (oItem.sType == 'calendar') {
							if (sValue) {
								oDate = oItem.oObject.parseDate(sValue);
								oItem.oObject.setDate(oDate);
							}
						} else if (oItem.sType == 'radio') {
							oItem.oElement.checked = false;
							if (sValue == 'Y' || sValue == 'S') {
								oItem.oElement.checked = true;
							}
						} else if (oItem.sType == 'checkbox') {
							oItem.oElement.removeAttribute('checked');
							if (sValue == 'Y' || sValue == 'S') {
								oItem.oElement.setAttribute('checked', 'checked');
							}
						} else if (oItem.sType == 'attachment') {
							oItem.oElement.value = sValue;
							sKey = sAttribute + '_' + oItem.oObject.key;
							oItem.oObject.value = oResponse.oRecord[sKey];
						} else if (oItem.sType == 'select-one') {
							if (!sValue) {
								sValue = '0';
							}
							oItem.oElement.value = sValue;
						}
					
						break;
					}
				}
			}

			if (this.fnDLoaded) {
				if (!oResponse.oExtra) {
					oResponse.oExtra = null;
				}

				this.fnDLoaded(oResponse.oRecord, oResponse.oExtra);
				this.fnDLoaded = null;
			}
		}
	},

	/**
	 * Retrieves dialog data from server.
	 *
	 * @method loadData
	 * @protected
	 */
	loadData: function(sMethod, sID, fnLoaded) {
		var oP;

		this.fnDLoaded = fnLoaded;

		if (typeof sID === 'object') {
			oP = sID;
		} else {
			oP = {sMethod:sMethod, sID:sID};
		}
		this.oSPA.serverController(this.oSPA.sService, oP, this.dataLoaded, this);
	},

	validateMail: function(email) {
		var re;

		re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

});

