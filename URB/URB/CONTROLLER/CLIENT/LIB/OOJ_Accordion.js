/**
 * Framework
 * 
 * @module Widgets
 */

/**
 * Accordion
 *
 * @class OOJ_Accordion
 * @constructor
 * @method init
 * @param	{OOJ_Application}	oSPA		Single Page Application. 
 * @param	{Object}			oOptions	Options. 
 * 
 * @return	{OOJ_Accordion}
 */
var OOJ_Accordion = Class.extend({
	oSPA: null,

	divFrame:null,
	fnFolded: null,
	fnUnfolded: null,
	vItems:null,

	/**
	 * Constructor.
	 * 
	 * @method init
	 * @param	{OOJ_Application}	oSPA		Single Page Application. 
	 * @param	{Object}			oOptions	Options. 
	 * 
	 * @return	{OOJ_Accordion}
	 */
	init: function(oSPA, oOptions) {

		this.oSPA   = oSPA;

		this.divFrame   = oOptions.divFrame;
		this.fnUnfolded = oOptions.fnUnfolded;
		this.fnFolded   = oOptions.fnFolded;

		this.divFrame.classList.add('urb-accordion-container');
		this.vItems = [];
	},

	addItem: function(sID, sHTMLHeader, sHTMLContent) {
		var divItem;
		var divHeader;
		var divContent;
		var oItem;
		var fnHClick;

		divItem    = document.createElement('div');
		divHeader  = document.createElement('div');
		divContent = document.createElement('div');

		divItem.appendChild(divHeader);
		divItem.appendChild(divContent);
		this.divFrame.appendChild(divItem);

		divItem.className    = 'urb-accordion-item';
		divHeader.className  = 'urb-accordion-header';
		divContent.className = 'urb-accordion-content urb-accordion-folded';

		divHeader.innerHTML  = sHTMLHeader;
		divContent.innerHTML = sHTMLContent;

		fnHClick  = this.headerClick.bind(this);
		divHeader.addEventListener('click', fnHClick);

		oItem = {};
		oItem.sID        = sID;
		oItem.divItem    = divItem;
		oItem.divContent = divContent;

		this.vItems.push(oItem);

	},

	headerClick: function(e) {
		var oElement;
		var bVisible;
		var divContent;
		var oItem;
		var vUnfolded;
		var iLng;
		var iIdx;

		oElement = e.target;
		while (oElement && !oElement.classList.contains('urb-accordion-item')) {
			oElement = oElement.parentElement;
		};

		if (oElement) {
			divContent = oElement.querySelector('.urb-accordion-content');
			bVisible = this.oSPA.isVisible(divContent);
			if (bVisible) {
				divContent.classList.remove('urb-accordion-unfolded');
				divContent.classList.add('urb-accordion-folded');
				divContent.style.height = null;

				if (this.fnFolded) {
					oItem = this.findItemByElement(oElement);
					if (oItem) {
						this.fnFolded(oItem);
					}
				}

			} else {
				vUnfolded = this.divFrame.querySelectorAll('.urb-accordion-unfolded');
				iLng = vUnfolded.length;
				for (iIdx = 0; iIdx < iLng; iIdx ++) {
					vUnfolded[iIdx].innerHTML = '';
					vUnfolded[iIdx].classList.remove('urb-accordion-unfolded');
				}

				if (this.fnUnfolded) {
					oItem = this.findItemByElement(oElement);
					if (oItem) {
						this.fnUnfolded(oItem);
					}
				}
				divContent.classList.remove('urb-accordion-folded');
				divContent.classList.add('urb-accordion-unfolded');
			}
		}
	},

	findItemByElement: function(oElement) {
		var iLng;
		var iIdx;
		var oItem;

		oItem = null;
		iLng = this.vItems.length;
		for (iIdx = 0; iIdx < iLng; iIdx++) {
			oItem = this.vItems[iIdx];

			if (oItem.divItem == oElement) {
				break;
			}
		}

		return oItem;
	},

	moveScroll: function(iPixels) {
		if (this.divFrame.clientHeight < this.divFrame.scrollHeight) {
			this.divFrame.scrollTop = iPixels;
		}
	},

	findText: function(sText) {
		var vItems;
		var iLng;
		var iIdx;
		var sContent;
		var iStart;

		vFound = [];
		vItems = this.divFrame.querySelectorAll('.urb-accordion-item');
		iLng = vItems.length;
		for (iIdx = 0; iIdx < iLng; iIdx++) {
			vItems[iIdx].style.display = 'block';
		}

		if (sText) {
			for (iIdx = 0; iIdx < iLng; iIdx++) {
				sContent = vItems[iIdx].innerHTML;
				iStart = sContent.indexOf(sText);
				if (iStart == -1) {
					vItems[iIdx].style.display = 'none';
				}
			}
		}

	}

});
