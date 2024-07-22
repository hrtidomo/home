/**
 * Framework
 * 
 * @module Widgets
 */

/**
 * Message
 *
 * @class OOJ_Upload
 */
var OOJ_Upload = OOJ_Widget.extend({

	oData: null,
	sURL:'',
	responseType: 'json',
	sName:'',
	bSubmit:true,
	oButton: null,
	oIContainer: null,
	oInput:null,
	bDisabled: false,
	fnChange: null,
	fnBefore: null,
	fnCompleted: null,
	hoverClass: 'hover',
	disabledClass: 'disabled',
	oIFrame: null,
	bDelete: false,
	sFile: '',
	oCParent:null,


	/**
	 * Constructor.
	 * 
	 * @method init
	 * @param	{OOJ_Application}	oSPA		Single Page Application. 
	 * @param	{Object}			oOptions	Options. 
	 * 
	 * @return	{OOJ_Upload}
	 */
	init: function(oSPA, oOptions) {
		this.oSPA = oSPA;

		for (sParameter in oOptions) {
			this[sParameter] = oOptions[sParameter];
		}

		this.oButton = document.getElementById(oOptions.sBID);

		this.rerouteClicks();
	},

	createUUID: function() {
		var dt = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (dt + Math.random()*16)%16 | 0;
			dt = Math.floor(dt/16);
			return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
		return uuid;
	},

	rerouteClicks: function() {
		var fnBMOver;

		fnBMOver = this.buttonOver.bind(this);

		this.oButton.addEventListener('mouseover', fnBMOver);

	},

	buttonOver: function(e) {

		if (this.bDisabled === false) {
			if (!this.oInput) {
				this.createInput();
			}

			this.copyLayout(this.oButton, this.oIContainer);
			this.oInput.style.height = this.oIContainer.style.height;
			this.oIContainer.style.visibility = 'visible';
		}
	},

	createInput:function() {
		var oStyles;
		var fnIChange;
		var fnIMOver;
		var fnIMOut;
		var vOverlay;

		this.oInput = document.createElement('input');
		this.oInput.setAttribute('type', 'file');
		this.oInput.setAttribute('name', this.sName);

		oStyles = {};
		oStyles.position = 'absolute';
		oStyles.right    = 0;
		oStyles.margin   = 0;
		oStyles.padding  = 0;
		oStyles.fontSize = '12px';
		oStyles.cursor   = 'pointer';
		this.addStyles(this.oInput, oStyles);

		this.oIContainer = document.createElement('div');
		oStyles = {};
		oStyles.position   = 'absolute';
		oStyles.display    = 'block';
		oStyles.overflow   = 'hidden';
		oStyles.margin     = 0;
		oStyles.padding    = 0;
		oStyles.opacity    = 0;
		oStyles.direction  = 'ltr';
		oStyles.zIndex  = 2147483583; // Max zIndex supported by Opera 9.0-9.2
		this.addStyles(this.oIContainer, oStyles);

		// Make sure that element opacity exists.
		// Otherwise use IE filter
		if (this.oIContainer.style.opacity !== '0') {
			if (typeof(this.oIContainer.filters) == 'undefined'){
				throw new Error('Opacity not supported by the browser');
			}
			this.oIContainer.style.filter = 'alpha(opacity=0)';
		}

		fnIChange = this.inputChange.bind(this);
		fnIMOver  = this.inputOver.bind(this);
		fnIMOut   = this.inputOut.bind(this);

		this.oInput.addEventListener('change'   , fnIChange);
		this.oInput.addEventListener('mouseover', fnIMOver);
		this.oInput.addEventListener('mouseout' , fnIMOut);

		this.oIContainer.appendChild(this.oInput);

		if (!this.oCParent) {
			vOverlay = document.getElementsByClassName('urb-frm-dialog');
			if (vOverlay.length > 0) {
				vOverlay[0].appendChild(this.oIContainer);
			} else {
				document.body.appendChild(this.oIContainer);
			}
		} else {
			this.oCParent.appendChild(this.oIContainer);
		}
	},

	inputOver: function(e) {
		this.oButton.classList.add(this.hoverClass);
	},

	inputOut: function(e) {
		this.oButton.classList.remove(this.hoverClass);

		// We use visibility instead of display to fix problem with Safari 4
		// The problem is that the value of input doesn't change if it 
		// has display none when user selects a file           
		this.oIContainer.style.visibility = 'hidden';

	},

	inputChange: function(e) {
		var sFile;
		var sExtension;
		var bResult;

		// Get filename from input, required
		// as some browsers have path instead of it
		sFile = this.fileFromPath(this.oInput.value);

		bResult = true;
		if (this.fnChange) {
			sExtension = this.fileExtension(sFile);
			bResult = this.fnChange(sFile, sExtension);
		}

		if (bResult) {
			if (this.bSubmit) {
				this.uploadFile();
			}
		} else {
			this.clearInput();
		}

	},

	clearInput: function() {
		var oParent;

		if (this.oInput) {
			oParent = this.oInput.parentNode;
			this.oInput = null;
			this.createInput();
		}

	},

	fileFromPath: function(sFile) {
		return sFile.replace(/.*(\/|\\)/, "");
	},

	fileExtension:function(sFile) {
		return (-1 !== sFile.indexOf('.')) ? sFile.replace(/.*[.]/, '') : '';
	},

	removeNode:function(oNode) {
		oNode.parentNode.removeChild(oNode);
	},

	copyLayout: function(from, to) {
		var oParent;
		var oRP;
		var oRF;
		var oBox;
		var oStyles;

		oParent = to.parentNode;
		oRP = oParent.getBoundingClientRect();
		oRF = from.getBoundingClientRect();

		oStyles = {};
		oStyles.position = 'absolute';
		oStyles.left     = (oRF.left - oRP.left) + 'px';
		oStyles.top      = (oRF.top  - oRP.top ) + 'px';
		oStyles.width    = from.offsetWidth + 'px';
		oStyles.height   = from.offsetHeight + 'px';

		this.addStyles(to, oStyles);
	},

	addStyles:function(oElement, oStyles) {
		var sAttribute;

		for (sAttribute in oStyles) {
			if (oStyles.hasOwnProperty(sAttribute)) {
				oElement.style[sAttribute] = oStyles[sAttribute];
			}
		}
	},

	createIFrame: function() {
		var sUID;

		sUID = this.createUUID();
		this.oIFrame = document.createElement('iframe');
		this.oIFrame.setAttribute('id'  , sUID);
		this.oIFrame.setAttribute('name', sUID);
		this.oIFrame.style.display = 'none';

		document.body.appendChild(this.oIFrame);

		return this.oIFrame;
	},

	createForm: function() {
		var oForm;
		var sProperty;
		var oElement;

		oForm = document.createElement('form');
		oForm.setAttribute('method' , 'post');
		oForm.setAttribute('enctype', 'multipart/form-data');
		oForm.setAttribute('action' , this.sURL);
		oForm.setAttribute('target' , this.oIFrame.name);
		oForm.style.display = 'none';
		document.body.appendChild(oForm);

		// Create hidden input element for each data key
		for (sProperty in this.oData) {
			if (this.oData.hasOwnProperty(sProperty)) {
				oElement = document.createElement('input');
				oElement.setAttribute('type', 'hidden');
				oElement.setAttribute('name', sProperty);
				oElement.setAttribute('value', this.oData[sProperty]);
				oForm.appendChild(oElement);
			}
		}

		return oForm;
	},

	removeFrame: function() {
		this.removeNode(this.oIFrame);
	},

	frameLoad: function() {
		var fnRemove;
		var oDoc;
		var sResponse;
		var oResponse;
		var bSuccess;

		bSuccess = false;
		if (   this.oIFrame.src == "javascript:'%3Chtml%3E%3C/html%3E';"
			|| this.oIFrame.src == "javascript:'<html></html>';") {
			// First time around, do not delete.
			// We reload to blank page, so that reloading main page
			// does not re-submit the post.
			if (this.bDelete) {
				// Fix busy state in FF3
				fnRemove = this.removeFrame.bind(this);
				setTimeout(fnRemove, 10);
			}
			return;
		}

		oDoc = this.oIFrame.contentDocument ? this.oIFrame.contentDocument : window.frames[this.oIFrame.id].document;
		// Fixing Opera 9.26,10.00
		if (oDoc.readyState && oDoc.readyState != 'complete') {
			// Opera fires load event multiple times
			// Even when the DOM is not ready yet
			// this fix should not affect other browsers
			return;
		}

		// fixing Opera 9.64
		if (oDoc.body && oDoc.body.innerHTML == "false") {
			// In Opera 9.64 event was fired second time
			// when body.innerHTML changed from false 
			// to server response approx. after 1 sec
			return;
		}

		if (oDoc.XMLDocument) {
			// response is a xml document Internet Explorer property
			sResponse = oDoc.XMLDocument;
		} else if (oDoc.body){
			// response is html document or plain text
			sResponse = oDoc.body.innerHTML;

			if (this.responseType && this.responseType.toLowerCase() == 'json') {
				// If the document was sent as 'application/javascript' or
				// 'text/javascript', then the browser wraps the text in a <pre>
				// tag and performs html encoding on the contents.  In this case,
				// we need to pull the original text content from the text node's
				// nodeValue property to retrieve the unmangled content.
				// Note that IE6 only understands text/html
				if (oDoc.body.firstChild && oDoc.body.firstChild.nodeName.toUpperCase() == 'PRE') {
					sResponse = oDoc.body.firstChild.firstChild.nodeValue;
				}

				if (sResponse) {
					//sResponse = eval("(" + sResponse + ")");
					oResponse = JSON.parse(sResponse);
					if (oResponse.hasOwnProperty('iCode')) {
						if (oResponse.iCode == 0 || oResponse.iCode == '0') {
							bSuccess = true;
						}
					}

				} else {
					sResponse = {};
				}
			}
		} else {
			// response is a xml document
			sResponse = oDoc;
		}

		if (this.fnCompleted) {
			this.fnCompleted(bSuccess, oResponse, this.sFile);
		}

		// Reload blank page, so that reloading main page
		// does not re-submit the post. Also, remember to
		// delete the frame
		this.bDelete = true;

		// Fix IE mixed content issue
		this.oIFrame.src = "javascript:'<html></html>';";

	},

	getResponse : function() {
		var fnLoad;

		this.bDelete = false;
		fnLoad = this.frameLoad.bind(this);

		this.oIFrame.addEventListener('load', fnLoad);

	},

	uploadFile: function() {
		var sFile;
		var sExtension;
		var bResult;
		var oForm;

		sFile = this.fileFromPath(this.oInput.value);

		bResult = true;
		if (this.fnBefore) {
			sExtension = this.fileExtension(sFile);
			bResult = this.fnBefore(sFile, sExtension);
		}

		if (bResult) {
			this.createIFrame();
			oForm = this.createForm();

			this.removeNode(this.oInput.parentNode);
			this.oButton.classList.remove(this.hoverClass);

			oForm.appendChild(this.oInput);
			oForm.submit();

			this.removeNode(oForm);
			this.removeNode(this.oInput);
			this.oInput = null;

			// Get response from iframe and fire onComplete event when ready
			this.sFile = sFile;
			this.getResponse();

			// Get ready for next request
			this.createInput();

		}
	}

});

