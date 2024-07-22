/**
 * Framework
 * 
 * @module Widgets
 */

/**
 * Splitter
 *
 * @class OOJ_Split
 * @constructor
 * @method init
 * @param	{Object}			oOptions	Options. 
 * 
 * @return	{OOJ_Split}
 */
 var OOJ_Split = OOJ_Widget.extend({

	sDisposition: '',
	oAPanel: null,
	oBPanel: null,
	oDivider: null,
	oDrag: null,
	bDragging: false,
	fnMoving: null,
	divDrag: null,
	iYParent: 0,
	iXParent: 0,
	bRParent: false,
	iYDelta: 0,
	oFrame: null,

	/**
	 * Constructor.
	 * 
	 * @method init
	 * @param	{Object}	oOptions	Options. 
	 * 
	 * @return	{OOJ_Split}
	 */
	init: function(oOptions) {
		var oParent;
		var oR;

		this.sDisposition = oOptions.sDisposition;
		this.oAPanel      = oOptions.oAPanel;
		this.oBPanel      = oOptions.oBPanel;
		this.oDivider     = oOptions.oDivider;
		this.fnMoving     = oOptions.fnMoving;
		this.oFrame       = oOptions.oFrame;

		if (oOptions.bRParent) {
			this.bRParent = true;
		}

		if (oOptions.iYDelta) {
			this.iYDelta = oOptions.iYDelta;
		}

		this.divDrag = document.createElement('div');
		this.divDrag.style.display = 'none';
		this.divDrag.classList.add('urb-split-dragging-slider');
		oParent = this.oDivider.parentNode;
		oParent.appendChild(this.divDrag);

		if (this.sDisposition == 'H') {
			this.oDivider.className = 'urb-hsplitter';
		} else if (this.sDisposition == 'V') {
			this.oDivider.className = 'urb-vsplitter';
		}

		this.bindEvents();
	},

	/**
	 *	Mouse down. Start drag
	 *
	 * @method dragStart
	 * @private
	 */
	dragStart:function(e) {
		var oR;
		var iPL;

		iPL = 0;
		oR = this.oDivider.parentNode.getBoundingClientRect();
		if (this.oFrame) {
			iPL = parseFloat(window.getComputedStyle(this.oFrame, null).getPropertyValue('padding-left'));
			oR = this.oFrame.getBoundingClientRect();
		}

		this.iYParent = oR.y;
		this.iXParent = oR.x;

		oR = this.oDivider.getBoundingClientRect();
		this.divDrag.style.width   = oR.width  + 'px';
		this.divDrag.style.height  = oR.height + 'px';
		if (this.sDisposition == 'V') {
			this.divDrag.style.top     = 0 + 'px';
			this.divDrag.style.left    = (oR.x - this.iXParent) + 'px';
		} else {
			if (this.bRParent) {
				this.divDrag.style.left    = oR.left + 'px';
				this.divDrag.style.top     = oR.y + 'px';
			} else {
				this.divDrag.style.left    = iPL + 'px';
				this.divDrag.style.top     = (oR.y - this.iYParent) + 'px';
			}
		}
		this.divDrag.style.display = 'block';

		this.bDragging = true;
	},

	/**
	 *	Mouse moving after mouse down
	 *
	 * @method dragMove
	 * @private
	 */
	dragMove:function(e) {
		var touch;

		if (e.targetTouches) {
			if (e.targetTouches.length > 0) {
				touch = e.targetTouches[0];
				e = touch;
			}
		}

		if (this.bDragging) {
			if (this.sDisposition == 'H') {
				if (this.bRParent) {
					this.divDrag.style.top = e.clientY + 'px';
					//this.divDrag.style.top = (e.clientY - this.iYParent) + 'px';
				} else {
					this.divDrag.style.top = (e.clientY - this.iYParent) + 'px';
				}
			}

			if (this.sDisposition == 'V') {
				this.divDrag.style.left = (e.clientX - this.iXParent) + 'px';
			}
		}
	},

	dragEnd: function(e) {
		var oR;
		var oContainer;
		var iWWidth;
		var iWHeight;
		var iAExtension;
		var iBExtension;

		if (this.bDragging) {
			this.bDragging = false;

			oContainer = this.oDivider.parentNode;
			oR = oContainer.getBoundingClientRect();
			if (this.sDisposition == 'V') {
				iWWidth = oR.width;
				iAExtension = (e.clientX - this.iXParent) - 3;
				iBExtension = iWWidth - iAExtension - 3

			}

			if (this.sDisposition == 'H') {
				iWHeight = oR.height;
				iAExtension = (e.clientY - this.iYParent) - 3;
				if (this.oFrame) {
					oR = this.oFrame.getBoundingClientRect();
					iAExtension = iAExtension - oR.top;
				}
				iBExtension = iWHeight - iAExtension - 6;
			}

			this.divDrag.style.display = 'none';
			if (this.fnMoving) {
				this.fnMoving(iAExtension, iBExtension);
			}
		}


	},

	bindEvents: function() {
		var fnDown;
		var fnMove;
		var fnUp;

		fnDown = this.dragStart.bind(this);
		fnMove = this.dragMove.bind(this);
		fnUp   = this.dragEnd.bind(this);

		this.oDivider.addEventListener('mousedown' , fnDown);
		this.oDivider.addEventListener('touchstart', fnDown, {passive:true});

		document.addEventListener('mousemove'  , fnMove);
		document.addEventListener('mouseup'    , fnUp);

		document.addEventListener('touchmove'  , fnMove);
		document.addEventListener('touchend'   , fnUp);
		document.addEventListener('touchleave' , fnUp);
		document.addEventListener('touchcancel', fnUp);

	},

	setPosition: function(iPixels) {
		if (this.sDisposition == 'H') {
			this.oDivider.style.top  = iPixels + 'px';
		} else {
			this.oDivider.style.left  = iPixels + 'px';
		}

		this.dragEnd();
	}

});
