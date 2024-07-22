/**
 * Framework
 * 
 * @module Widgets
 */

/**
 * Viewer
 *
 * @class OOJ_Cropper
 * @constructor
 * @method init
 * @param	{OOJ_Application}	oSPA		Single Page Application. 
 * @param	{Object}			oOptions	Options. 
 * 
 * @return	{OOJ_Cropper}
 */
var OOJ_Cropper = OOJ_Widget.extend({
	oSPA: null,

	bDragging: false,
	iDXPos: 0,
	iDYPos:0,
	iMXPos: 0,
	iMYPos:0,

	divPreview: null,
	divParent: null,
	divWrapper: null,
	divHeader: null,
	divTitle: null,
	divClose: null,
	divBody: null,
	divTBar:null,
	oUpload:null,
	iWidth:0,
	iHeight:0,
	bVisible:false,

	imgImage: null,
	imgPreview: null,
	oCrop: null,
	dQuality: 0.5,

	/**
	 * Constructor.
	 * 
	 * @method init
	 * @param	{OOJ_Application}	oSPA		Single Page Application. 
	 * @param	{Object}			oOptions	Options. 
	 * 
	 * @return	{OOJ_Cropper}
	 */
	init: function(oOptions) {
		this.oSPA = oOptions.oSPA;

		this.divParent  = oOptions.divParent;
		this.divPreview = oOptions.divPreview;
		this.fnCropped  = oOptions.fnCropped;
		this.iWidth     = oOptions.iWidth;
		this.iHeight    = oOptions.iHeight;
		this.bVisible   = oOptions.bVisible;

		this.buildViewer();

	},

	cropperReady: function(e) {

	},

	cropperStart: function(e) {

	},

	cropperEnd: function(e) {

	},

	cropperMove: function(e) {

	},

	cropperCrop: function(e) {

	},

	cropperZoom: function(e) {

	},

	buildCropper: function() {
		var oOptions;
		var fnCReady;
		var fnCStart;
		var fnCEnd;
		var fnCMove;
		var fnCCrop;
		var fnCZoom;

		fnCReady = this.cropperReady.bind(this);
		fnCStart = this.cropperStart.bind(this);
		fnCEnd   = this.cropperEnd.bind(this);
		fnCMove  = this.cropperMove.bind(this);
		fnCCrop  = this.cropperCrop.bind(this);
		fnCZoom  = this.cropperZoom.bind(this);

		oOptions = {};
		oOptions.modal              = false;
		oOptions.initialAspectRatio = NaN;
		oOptions.aspectRatio        = NaN;
		oOptions.viewMode           = 0;
		oOptions.preview            = this.divPreview;
		oOptions.ready              = fnCReady;
		oOptions.cropstart          = fnCStart;
		oOptions.cropmove           = fnCMove;
		oOptions.cropend            = fnCEnd;
		oOptions.crop               = fnCCrop;
		oOptions.zoom               = fnCZoom;

		if (this.oCrop) {
			this.oCrop.reset();
		} else {
			this.oCrop = new window.Cropper(this.imgImage, oOptions);
		}

	},

	toolBar: function() {
		var vHTML;
		var sHTML;

		vHTML = [];
		vHTML.push("<div class='urb-frm-dialog-tbsection-left'>");
		vHTML.push("   <button type='button' id='btnCamera'><i class='icon-camera-alt'></i></button>");
		vHTML.push("</div>");
		vHTML.push("<div class='urb-frm-dialog-tbsection-left'>");
		vHTML.push("   <button type='button' id='btnZIn' style='font-size:10px;'><i class='icon-zoom-in'></i></button>");
		vHTML.push("   <button type='button' id='btnZOut' style='font-size:10px;'><i class='icon-zoom-out'></i></button>");
		vHTML.push("</div>");
		vHTML.push("<div class='urb-frm-dialog-tbsection-left'>");
		vHTML.push("   <button type='button' id='btnLMove' style='font-size:10px;'><i class='icon-left-bold'></i></button>");
		vHTML.push("   <button type='button' id='btnRMove' style='font-size:10px;'><i class='icon-right-bold'></i></button>");
		vHTML.push("   <button type='button' id='btnUMove' style='font-size:10px;'><i class='icon-up-bold'></i></button>");
		vHTML.push("   <button type='button' id='btnDMove' style='font-size:10px;'><i class='icon-down-bold'></i></button>");
		vHTML.push("</div>");
		vHTML.push("<div class='urb-frm-dialog-tbsection-left'>");
		vHTML.push("   <button type='button' id='btnRLeft'  style='font-size:10px;'><i class='icon-ccw'></i></button>");
		vHTML.push("   <button type='button' id='btnRRight' style='font-size:10px;'><i class='icon-cw' ></i></button>");
		vHTML.push("</div>");
		vHTML.push("<div class='urb-frm-dialog-tbsection-left'>");
		vHTML.push("   <div style='height:30px;float:left;margin-left:5px;'>Calidad:</div>");
		vHTML.push("   <input id='rngQuality' type='range' min='0' max='100' step='1' class='vis-configuration vis-config-range' style='float:left;width:100px;height:24px;'>");
		vHTML.push("   <div id='divQuality' style='width:24px;height:24px;line-height:24px;float:left;margin-left:3px;font-size:9px;text-align:center;border:solid 1px #ccc'>" + this.dQuality + "</div>");
		vHTML.push("</div>");
		vHTML.push("<div class='urb-frm-dialog-tbsection-right'>");
		vHTML.push("   <button type='button' id='btnCrop' style='font-size:10px;'><i class='icon-crop'></i></button>");
		vHTML.push("</div>");

		sHTML = vHTML.join('');

		this.divTBar.innerHTML = sHTML;
	},

	bindCommands: function() {
		var oOptions;
		var fnCrop;
		var fnZIn;
		var fnZOut;
		var fnRRight;
		var fnRLeft;
		var fnUMove;
		var fnDMove;
		var fnLMove;
		var fnRMove;
		var fnQuality;

		oOptions = {};
		oOptions.sURL        = 'GATE.php';
		oOptions.sBID        = 'btnCamera';
		oOptions.divDlg      = this.divWrapper;
		oOptions.sName       = 'IMG';
		oOptions.oCParent    = this.divWrapper;
		oOptions.iWidth      = 24;
		oOptions.iHeight     = 24;
		oOptions.fnChange    = this.uploadChange.bind(this);
		oOptions.fnBefore    = this.beforeUpload.bind(this);
		oOptions.fnCompleted = this.uploadCompleted.bind(this);
		oOptions.oData       = {sMethod:'GLBL_uploadPicture', sID:this.sIDExercise};

		this.oUpload = new OOJ_Upload(this.oSPA, oOptions);

		fnCrop    = this.cropImage.bind(this);
		fnZIn     = this.zoomIn.bind(this);
		fnZOut    = this.zoomOut.bind(this);
		fnRLeft   = this.rotateLeft.bind(this);
		fnRRight  = this.rotateRight.bind(this);
		fnUMove   = this.moveUp.bind(this);
		fnDMove   = this.moveDown.bind(this);
		fnLMove   = this.moveLeft.bind(this);
		fnRMove   = this.moveRight.bind(this);
		fnQuality = this.changeQuality.bind(this);

		document.getElementById('btnCrop'   ).addEventListener('click', fnCrop);
		document.getElementById('btnZIn'    ).addEventListener('click', fnZIn);
		document.getElementById('btnZOut'   ).addEventListener('click', fnZOut);
		document.getElementById('btnRLeft'  ).addEventListener('click', fnRLeft);
		document.getElementById('btnRRight' ).addEventListener('click', fnRRight);
		document.getElementById('btnUMove'  ).addEventListener('click', fnUMove);
		document.getElementById('btnDMove'  ).addEventListener('click', fnDMove);
		document.getElementById('btnLMove'  ).addEventListener('click', fnLMove);
		document.getElementById('btnRMove'  ).addEventListener('click', fnRMove);
		document.getElementById('rngQuality').addEventListener('input', fnQuality);

	},

	/**
	 * Creates all elements of viewer.
	 * 
	 * @method buildViewer
	 * @private
	 */
	buildViewer: function() {

		this.imgImage = document.createElement('img');
		this.imgImage.style.maxWidth  = '100%';

		this.divWrapper = document.createElement('div');
		if (!this.bVisible) {
			this.divWrapper.style.display='none';
		}

		this.divHeader   = document.createElement('div');
		this.divTitle    = document.createElement('div');
		this.divClose    = document.createElement('div');
		this.divBody     = document.createElement('div');
		this.divTBar     = document.createElement('div');

		this.divWrapper.classList.add('urb-frm-dialog');
		this.divHeader .classList.add('urb-frm-dialog-header');
		this.divTitle  .classList.add('urb-frm-dialog-title');
		this.divClose  .classList.add('urb-frm-dialog-close');
		this.divBody   .classList.add('urb-frm-dialog-body');
		this.divTBar   .classList.add('urb-frm-dialog-toolbar');

		this.divClose.innerHTML = "<i class='icon-window-close'></i>";
		if (this.iWidth != 0 && this.iHeight != 0) {
			this.divBody.style.width  = this.iWidth  + 'px';
			this.divBody.style.height = this.iHeight + 'px';
		} else {
			this.divBody.style.width = '477px';
			this.divBody.style.height = '674px';
		}

		this.divHeader .appendChild(this.divTitle);
		this.divHeader .appendChild(this.divClose);
		this.divBody   .appendChild(this.imgImage);
		this.divWrapper.appendChild(this.divHeader);
		this.divWrapper.appendChild(this.divTBar);
		this.divWrapper.appendChild(this.divBody);

		this.divWrapper.style.position = 'absolute';

		this.divParent.appendChild(this.divWrapper);
		this.toolBar();

		this.bindCommands();
		this.bindEvents();

	},

	bindEvents: function() {
		var fnClose;
		var fnMDown;
		var fnMUp;
		var fnMMove;

		fnClose = this.closeViewer.bind(this);
		fnMDown = this.mouseDown.bind(this);
		fnMUp   = this.mouseUp.bind(this);
		fnMMove = this.moveCropper.bind(this);

		this.divClose.addEventListener('click', fnClose);
		this.divHeader.addEventListener('mousedown', fnMDown);
		document.addEventListener('mouseup'  , fnMUp);
		document.addEventListener('mousemove', fnMMove);

		// Touch screen
		/*
		this.divHeader.addEventListener('touchstart' , fnMDown);
		document      .addEventListener('touchend'   , fnMUp);
		document      .addEventListener('touchcancel', fnMUp);
		document      .addEventListener('touchleave' , fnMUp);
		document      .addEventListener('touchmove'  , fnMMove);
		*/

	},

	/**
	 * Called by OOJ_Upload when the picture upload is completed.
	 * 
	 * @method uploadCompleted
	 * @param {Boolean}	bSuccess	Indicates success of upload
	 * @param {Object}	oResponse	Response object from server
	 * @param {String}	sFile		File name
	 */
	uploadCompleted: function(bSuccess, oResponse, sFile) {
		var sB64Image;
		var sSrc;

		sB64Image = oResponse.sB64Image;
		sSrc = 'data:image/jpeg;base64,' + sB64Image;
		this.imgImage.src = sSrc;

		this.buildCropper();

	},

	/**
	 * Called by OOJ_Upload before starting the upload.
	 * 
	 * @method beforeUpload
	 * 
	 * @return {Boolean}			False to abort the upload. True otherwise.
	 */
	beforeUpload: function() {
		var bResult;

		bResult = true;

		return bResult;
	},

	/**
	 * Called by OOJ_Upload on file element changed.
	 * 
	 * @method uploadChange
	 * 
	 * @return {Boolean}			False to abort the upload. True otherwise.
	 */
	uploadChange: function() {
		var bResult;

		bResult = true;

		return bResult;
	},

	/**
	 * Drags dialog according mouse position.
	 *
	 * @method moveCropper
	 * @private
	 */
	moveCropper: function(e) {

		if (e.type === 'touchstart') {
			this.iMXPos = e.touches[0].pageX;
			this.iMYPos = e.touches[0].pageY;
		} else {
			this.iMXPos = document.all ? window.event.clientX : e.pageX;
			this.iMYPos = document.all ? window.event.clientY : e.pageY;
		}

		if (this.bDragging) {

			this.divWrapper.style.left = (this.iMXPos - this.iDXPos) + 'px';
			this.divWrapper.style.top  = (this.iMYPos - this.iDYPos) + 'px';
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
	 * Closes dialog and removes all elements from DOM.
	 *
	 * @method closeViewer
	 * @private
	 */
	closeViewer:function() {
		
	},

	cropImage: function() {
		var oData;
		var oCOut;
		var oURLData;

		if (this.oCrop) {
			oData = this.oCrop.getData(false);
			oCOut = this.oCrop.getCroppedCanvas();
			oURLData = oCOut.toDataURL('image/jpeg', this.dQuality);
		}

		if (this.fnCropped) {
			this.fnCropped(oURLData, oData);
		}
	},

	zoomIn: function(e) {
		this.oCrop.zoom(0.1);
	},

	zoomOut: function(e) {
		this.oCrop.zoom(-0.1);
	},

	rotateLeft: function(e) {
		var iAngle;

		iAngle = 45;
		if (e.ctrlKey) {
			iAngle = 1;
		}

		iAngle = -1 * iAngle;
		this.oCrop.rotate(iAngle);
	},

	rotateRight: function(e) {
		var iAngle;

		iAngle = 45;
		if (e.ctrlKey) {
			iAngle = 1;
		}

		this.oCrop.rotate(iAngle);
	},

	moveUp: function(e) {
		var iPixels;

		iPixels = 10;
		if (e.ctrlKey) {
			iPixels = 1;
		}

		iPixels = iPixels * -1;
		this.oCrop.move(0, iPixels);
	},

	moveDown: function(e) {
		var iPixels;

		iPixels = 10;
		if (e.ctrlKey) {
			iPixels = 1;
		}

		this.oCrop.move(0, iPixels);
	},

	moveLeft: function(e) {
		var iPixels;

		iPixels = 10;
		if (e.ctrlKey) {
			iPixels = 1;
		}

		iPixels = iPixels * -1;
		this.oCrop.move(iPixels, 0);
	},

	moveRight: function(e) {
		var iPixels;

		iPixels = 10;
		if (e.ctrlKey) {
			iPixels = 1;
		}

		this.oCrop.move(iPixels, 0);
	},

	showDialog: function() {
		this.divWrapper.style.display='block';
		this.bVisible=true;
	},

	hideDialog: function() {
		this.divWrapper.style.display='none';
		this.bVisible=false;
	},

	changeQuality: function(e) {
		var iValue;

		iValue =  parseInt(e.target.value);
		this.dQuality = iValue / 100;
		document.getElementById('divQuality').innerHTML = this.dQuality; 
	}

});

