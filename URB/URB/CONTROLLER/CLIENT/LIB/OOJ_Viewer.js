/**
 * Framework
 * 
 * @module Widgets
 */

/**
 * Viewer
 *
 * @class OOJ_Viewer
 * @constructor
 * @method init
 * @param	{OOJ_Application}	oSPA		Single Page Application. 
 * @param	{Object}			oOptions	Options. 
 * 
 * @return	{OOJ_Viewer}
 */
var OOJ_Viewer = OOJ_Widget.extend({
	iDXPos: 0,
	iDYPos:0,
	iMXPos: 0,
	iMYPos:0,
	bDragging: false,
	bSEResizing: false,
	bSWResizing: false,
	oLiterals:null,

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
	iHeight:0,
	oReport: null,
	sID: '',

	/**
	 * Constructor.
	 * 
	 * @method init
	 * @param	{OOJ_Application}	oSPA		Single Page Application. 
	 * @param	{Object}			oOptions	Options. 
	 * 
	 * @return	{OOJ_Viewer}
	 */
	init: function(oSPA, oOptions) {
		this.oSPA = oSPA;
		this.fnCompleted = oOptions.fnCompleted;
		this.sID      = oOptions.sID;
		this.vButtons = oOptions.vButtons;
		this.sMethod  = oOptions.sMethod;
		this.iWidth   = oOptions.iWidth;
		this.iHeight  = oOptions.iHeight;
		this.sTitle   = oOptions.sTitle;
		this.oReport  = oOptions.oReport;
		this.sID      = oOptions.sID;

		this.buildViewer();
	},

	/**
	 * Creates all elements of viewer.
	 * 
	 * @method buildViewer
	 * @private
	 */
	buildViewer: function() {
		var iIdx;
		var iLng;
		var fnMDown;
		var fnMUp;
		var fnMMove;
		var fnClose;

		this.divModal    = document.createElement('div');
		this.divWrapper  = document.createElement('div');
		this.divHeader   = document.createElement('div');
		this.divTitle    = document.createElement('div');
		this.divClose    = document.createElement('div');
		this.divBody     = document.createElement('div');
		this.divFooter   = document.createElement('div');
		this.divDocument = document.createElement('iframe');

		this.divSEResizer  = document.createElement('div');
		this.divSWResizer  = document.createElement('div');

		if (this.sTitle) {
			this.divTitle.innerHTML = this.sTitle;
		}

		this.divClose.innerHTML = "<i class='icon-window-close'></i>";

		this.divDocument.style.width = '100%';
		this.divDocument.style.height = '100%';

		this.divWrapper.id = this.sID;
		if (this.iWidth) {
			this.divBody.style.width =this.iWidth + 'px';
		}

		if (this.iHeight) {
			this.divBody.style.height = this.iHeight + 'px';
		}

		this.divTitle.setAttribute('style','display:inline-block');


		this.divModal.classList.add('urb-frm-modal');

		this.divWrapper.classList.add('urb-frm-dialog');
		this.divHeader.classList.add('urb-frm-dialog-header');

		this.divTitle.classList.add('urb-frm-dialog-title');
		this.divClose.classList.add('urb-frm-dialog-close');

		this.divBody.classList.add('urb-frm-dialog-body');
		this.divFooter.classList.add('urb-frm-dialog-footer');

		this.divSEResizer.id = 'divSE';
		this.divSEResizer.style.width = '10px';
		this.divSEResizer.style.height = '10px';
		this.divSEResizer.style.position = 'absolute';
		this.divSEResizer.style.right = 0;
		this.divSEResizer.style.bottom = 0;
		this.divSEResizer.style.cursor = 'se-resize';

		this.divSWResizer.id = 'divSW';
		this.divSWResizer.style.width = '10px';
		this.divSWResizer.style.height = '10px';
		this.divSWResizer.style.position = 'absolute';
		this.divSWResizer.style.left = 0;
		this.divSWResizer.style.bottom = 0;
		this.divSWResizer.style.cursor = 'sw-resize';

		this.divHeader.appendChild(this.divTitle);
		this.divHeader.appendChild(this.divClose);

		this.divBody.appendChild(this.divDocument);

		this.divWrapper.appendChild(this.divHeader);
		this.divWrapper.appendChild(this.divBody);
		this.divWrapper.appendChild(this.divFooter);

		this.divWrapper.appendChild(this.divSEResizer);
		this.divWrapper.appendChild(this.divSWResizer);

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

		fnMDown = this.mouseDown.bind(this);
		fnMUp   = this.mouseUp.bind(this);
		fnMMove = this.moveViewer.bind(this);

		this.divHeader.addEventListener('mousedown', fnMDown);
		this.divSEResizer.addEventListener('mousedown', fnMDown);
		this.divSWResizer.addEventListener('mousedown', fnMDown);

		document.addEventListener('mouseup'  , fnMUp);
		document.addEventListener('mousemove', fnMMove);

		fnClose = this.closeViewer.bind(this);
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
	 * @method closeViewer
	 * @private
	 */
	closeViewer:function() {
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
	 * Starts resizing and records position.
	 *
	 * @method resizeInit
	 * @private
	 */
	resizeInit: function(sID) {

		if (sID == 'divSE') {
			this.bSEResizing = true;
		} else if (sID == 'divSW') {
			this.bSWResizing = true;
		}

		this.iDXPos = this.iMXPos - this.divBody.offsetLeft;
		this.iDYPos = this.iMYPos - this.divBody.offsetTop;
	},

	/**
	 * Drags dialog according mouse position.
	 *
	 * @method moveViewer
	 * @private
	 */
	moveViewer: function(e) {
		var oR;
		var iW;
		var iH;


		this.iMXPos = document.all ? window.event.clientX : e.pageX;
		this.iMYPos = document.all ? window.event.clientY : e.pageY;
		oR = this.divWrapper.getBoundingClientRect();

		if (this.bSEResizing) {
			iW = this.iMXPos - oR.left;
			iH = this.iMYPos - oR.top;

			if (iW >= 100 && iH >= 100) {
				this.divBody.style.width = iW + 'px';
				this.divBody.style.height = iH + 'px';
			}

		} else if (this.bSWResizing) {
			iW = oR.right - this.iMXPos;
			iH = this.iMYPos - oR.top;

			if (iW >= 100 && iH >= 100) {
				this.divBody.style.width = iW + 'px';
				this.divBody.style.height = iH + 'px';
			}

		} else if (this.bDragging) {
			this.divWrapper.style.left = (this.iMXPos - this.iDXPos) + 'px';
			this.divWrapper.style.top  = (this.iMYPos - this.iDYPos) + 'px';
		}
	},

	resizeViewer: function(e) {
	},

	/**
	 * Ends resizing.
	 *
	 * @method resizeEnd
	 * @private
	 */
	resizeEnd: function(e) {
		this.bSEResizing = false;
		this.bSWResizing = false;
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
	 * @method mouseDown
	 * @private
	 */
	mouseDown: function(e) {
		var sID;

		sID = e.target.id;
		if (sID == 'divSE' || sID == 'divSW') {
			this.resizeInit(sID);
		} else {
			this.dragInit();
		}
	},

	/**
	 * Determines ending of dragging.
	 *
	 * @method mouseUp
	 * @private
	 */
	mouseUp: function() {

		this.dragEnd();
		if (this.bSEResizing || this.bSWResizing) {
			this.resizeEnd();
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
			this.divDocument.src = oResponse.sCode;
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

		if (this.oReport) {
			oP = {sMethod:this.sMethod, sTitle:this.sTitle, oReport:this.oReport};
		} else {
			oP = {sMethod:this.sMethod, sTitle:this.sTitle, sID:this.sID};
		}
		this.oSPA.serverController(this.oSPA.sService, oP, this.contentLoaded, this);
	}

});

