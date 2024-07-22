/**
 * Framework
 * 
 * @module Widgets
 */

/**
 * Grid
 *
 * @class OOJ_Grid
 */
var OOJ_Grid = Class.extend({
	oSPA:null,
	sID:'',
	oTable:null,
	browser:null,
	oOptions:null,
	sRID:null,

	hset: {},
	pager: 0,

	hDiv:null,
	oCDrag:null,
	cdpad:0,
	divBody:null,
	nDiv:null,
	block:null,
	rDiv:null,
	nBtn:null,
	colresize:null,
	hset:null,
	dcol:null,
	dcoln:null,
	colCopy:null,
	vresize:null,
	gDiv:null,
	dcolt:null,
	cdropleft:null,
	cdropright:null,
	bLoading:false,
	combo_flag: true,
	bMSelect:false,

	/**
	 *
	 * @constructor
	 * @method init
	 * 
	 * @param	{String}	sID
	 * @param	{Object}	oOptions
	 * 
	 * @return	{OOJ_Grid}
	 */
	init: function(oSPA, sID, oOptions) {
		var oTHIS;
		var matched;
		var thead;
		var tr;
		var cm;
		var th;
		var cookie_width;
		var ci;

		oTHIS = this;
		this.oSPA = oSPA;
		this.sID = sID;
		this.oTable = document.getElementById(sID);

		matched = this.uaMatch(navigator.userAgent);
		this.browser = {};

		if (matched.browser) {
			this.browser[matched.browser] = true;
			this.browser.version = matched.version;
		}

		// Chrome is Webkit, but Webkit is also Safari.
		if (this.browser.chrome ) {
			this.browser.webkit = true;
		} else if (this.browser.webkit) {
			this.browser.safari = true;
		}

		/*!
		 * START code from jQuery UI
		 *
		 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		 * http://jquery.org/license
		 *
		 * http://docs.jquery.com/UI
		 */

		if(typeof $.support.selectstart != 'function') {
			$.support.selectstart = 'onselectstart' in document.createElement('div');
		}

		if(typeof $.fn.disableSelection != 'function') {
			$.fn.disableSelection = function() {
				return this.bind( ( $.support.selectstart ? 'selectstart' : 'mousedown' ) + '.ui-disableSelection', function( event ) {
					event.preventDefault();
				});
			};
		}

		/* END code from jQuery UI */

		this.oOptions = $.extend({ //apply default properties
			uid        : sID,
			iHeight    : 200,         // Default height
			iWidth     : 'auto',      // Auto width
			striped    : true,        // Apply odd even stripes
			novstripe  : false,
			minwidth   : 30,          // Min width of columns
			iMHeight   : 80,          // Min height of columns
			bResizable : false,       // Allow table resizing
			sURL       : false,       // URL if using data from AJAX
			bSSelect   : true,
			method     : 'POST',      // Data sending method
			sDType     : 'json',      // Type of data for AJAX, either xml or json
			errormsg   : 'Connection Error',
			bPager     : false,
			nowrap     : true,
			iPage      : 1,           // Current page
			iTPages    : 1,           // Total pages
			iTRows     : 1,           // Total rows
			bRPP       : true,        // Use the results per page select box
			iRPP       : 15,          // Results per page
			vRPP       : [10, 15, 20, 30, 50], //allowed per-page values
			sTitle     : false,
			idProperty : 'id',
			pagestat   : 'Desde {from} a {to} de {total} filas',
			pagetext   : 'Página',
			outof      : 'de',
			findtext   : 'Buscar',
			vParams    : [], //allow optional parameters to be passed around
			procmsg    : 'Procesando, espe ror favor ...',
			sQValue    : '',
			sQField    : '',
			vConditions: [],
			nomsg      : 'No hay elementos',
			minColToggle: 1, //minimum allowed column to be hidden
			bCTButton  : false, //show or hide column toggle popup
			bTTButton: false,
			hideOnSubmit: true,
			bLoad      : true,
			blockOpacity: 0.8,
			preProcess: false,
			addTitleToCell: false, // add a title attr to cells with truncated contents
			dblClickResize: false, //auto resize column by double clicking
			onDragCol: false,
			onToggleCol: false,
			onChangeSort: false,
			onDoubleClick: false,
			bHAlign: true,
			fnSuccess: false,
			fnError: false,
			fnSubmit: false, //using a custom populate function
			__mw: {//extendable middleware function holding object
				datacol: function(p, col, val) {
					//middleware for formatting data columns
					var _col = (typeof oTHIS.oOptions.datacol[col] == 'function') ? oTHIS.oOptions.datacol[col](val) : val; //format column using function
					if(typeof oTHIS.oOptions.datacol['*'] == 'function') { //if wildcard function exists
						return oTHIS.oOptions.datacol['*'](_col); //run wildcard function
					} else {
						return _col; //return column without wildcard
					}
				}
			},
			getGridClass: function(g) { //get the grid class, always returns g
				return g;
			},
			datacol: {}, //datacol middleware object 'colkey': function(colval) {}
			colResize: true, //from: http://stackoverflow.com/a/10615589
			colMove: true
		}, oOptions);

		$(this.oTable).show() //show if hidden
		.attr({
			cellPadding: 0,
			cellSpacing: 0,
			border: 0
		}) //remove padding and spacing
		.removeAttr('width'); //remove width properties

		//create model if any
		if (this.oOptions.vColumns) {
			this.createModel();
		}

		//init divs
		this.gDiv    = document.createElement('div'); //create global container
		this.mDiv    = document.createElement('div'); //create title container
		this.hDiv    = document.createElement('div'); //create header container
		this.divBody = document.createElement('div'); //create body container
		this.vDiv    = document.createElement('div'); //create grip
		this.rDiv    = document.createElement('div'); //create horizontal resizer
		this.oCDrag  = document.createElement('div'); //create column drag
		this.block   = document.createElement('div'); //creat blocker
		this.nDiv    = document.createElement('div'); //create column show/hide popup
		this.nBtn    = document.createElement('div'); //create column show/hide button
		this.oTBar   = document.createElement('div'); //create toolbar
		this.sDiv    = document.createElement('div');
		this.pDiv    = document.createElement('div'); //create pager container

		if(this.oOptions.colResize === false) {
			//don't display column drag if we are not using it
			$(this.oCDrag).css('display', 'none');
		}

		if (!this.oOptions.bPager) {
			this.pDiv.style.display = 'none';
		}

		this.hTable = document.createElement('table');
		this.gDiv.className = 'urb-grid';
		if (this.oOptions.iWidth != 'auto') {
			this.gDiv.style.width = this.oOptions.iWidth + (isNaN(this.oOptions.iWidth) ? '' : 'px');
		}

		//add conditional classes
		if (this.browser.msie) {
			$(this.gDiv).addClass('ie');
		}

		if (this.oOptions.novstripe) {
			$(this.gDiv).addClass('novstripe');
		}

		$(this.oTable).before(this.gDiv);
		$(this.gDiv).append(this.oTable);

		//set toolbar
		if (this.oOptions.vButtons) {
			this.createToolbar();
		}

		this.hDiv.className = 'urb-grid-colhdrwrap';

		// Define a combo button set with custom action'ed calls when clicked.
		if( this.oOptions.combobuttons && $(this.oBPad) ) {
			var btnDiv = document.createElement('div');
			btnDiv.className = 'fbutton';

			var tSelect = document.createElement('select');
			$(tSelect).change( function () { this.combo_doSelectAction( tSelect ) } );
			$(tSelect).click( function () { this.combo_resetIndex( tSelect) } );
			tSelect.className = 'cselect';
			$(btnDiv).append(tSelect);

			for (i=0;i<this.oOptions.combobuttons.length;i++) {
				var btn = this.oOptions.combobuttons[i];
				if (!btn.separator) {
					var btnOpt = document.createElement('option');
					btnOpt.innerHTML = btn.name;

					if (btn.sClass) {
						$(btnOpt).addClass(btn.sClass).css({paddingLeft:20});
					}

					// if bimage defined, use its string as an image url for this buttons style (RS)
					if (btn.bimage) {
						$(btnOpt).css( 'background', 'url('+btn.bimage+') no-repeat center left' );
						$(btnOpt).css( 'paddingLeft', 20 );
					}

					// add title if exists (RS)
					if (btn.tooltip) {
						$(btnOpt)[0].title = btn.tooltip;
					}

					if (btn.onpress) {
						btnOpt.value = btn.onpress;
					}

					$(tSelect).append(btnOpt);
				}
			}

			$('.oBPad').append(btnDiv);
		}


		$(this.oTable).before(this.hDiv);
		this.hTable.cellPadding = 0;
		this.hTable.cellSpacing = 0;
		$(this.hDiv).append('<div class="urb-grid-colheader"></div>');
		$('div', this.hDiv).append(this.hTable);
		var thead = $("thead:first", this.oTable).get(0);
		if (thead) {
			$(this.hTable).append(thead);
		}

		thead = null;
		if (!this.oOptions.vColumns) {
			ci = 0;
		}

		$('thead tr:first th', this.hDiv).each(function () {
			var thdiv;

			thdiv = document.createElement('div');
			if ($(this).attr('abbr')) {
				$(this).click(function (e) {
					var obj;

					if (!$(this).hasClass('thOver')) {
						return false;
					}

					obj = (e.target || e.srcElement);
					if (obj.href || obj.type) {
						return true;
					}

					oTHIS.changeSort(this);
				});

				if ($(this).attr('abbr') == oTHIS.oOptions.sSName) {
					this.className = 'urb-grid-sorted';
					thdiv.className = 's' + oTHIS.oOptions.sSOrder;
				}
			}

			if (this.hidden) {
				$(this).hide();
			}

			if (!oTHIS.oOptions.vColumns) {
				$(this).attr('axis', 'col' + ci++);
			}
			
			// if there isn't a default width, then the column headers don't match
			// i'm sure there is a better way, but this at least stops it failing
			if (this.width == '') {
				this.width = 100;
			}

			if (oTHIS.bHAlign) {
				$(thdiv).css({textAlign: this.align, width: this.width + 'px'});
			} else {
				$(thdiv).css({width: this.width + 'px'});
			}

			thdiv.innerHTML = this.innerHTML;
			$(this).empty().append(thdiv).removeAttr('width').mousedown(function (e) {
				var bShifted;

				bShifted = e.shiftKey;

				if (!bShifted) {
					oTHIS.dragStart('colMove', e, this);
				}

			}).hover(function () {
				var no;
				var n;
				var nv;
				var onl;
				var nw;
				var nl;
				var ndw;

				if (!oTHIS.colresize && !$(this).hasClass('thMove') && !oTHIS.colCopy) {
					$(this).addClass('thOver');
				}

				if ($(this).attr('abbr') != oTHIS.oOptions.sSName && !oTHIS.colCopy && !oTHIS.colresize && $(this).attr('abbr')) {
					$('div', this).addClass('s' + oTHIS.oOptions.sSOrder);
				} else if ($(this).attr('abbr') == oTHIS.oOptions.sSName && !oTHIS.colCopy && !oTHIS.colresize && $(this).attr('abbr')) {
					no = (oTHIS.oOptions.sSOrder == 'asc') ? 'desc' : 'asc';
					$('div', this).removeClass('s' + oTHIS.oOptions.sSOrder).addClass('s' + no);
				}

				if (oTHIS.colCopy) {
					n = $('th', oTHIS.hDiv).index(this);
					if (n == oTHIS.dcoln) {
						return false;
					}

					if (n < oTHIS.dcoln) {
						$(this).append(oTHIS.cdropleft);
					} else {
						$(this).append(oTHIS.cdropright);
					}

					oTHIS.dcolt = n;
				} else if (!oTHIS.colresize) {
					nv = $('th:visible', this.hDiv).index(this);
					onl = parseInt($('div:eq(' + nv + ')', this.oCDrag).css('left'), 10);
					nw = jQuery(oTHIS.nBtn).outerWidth();
					nl = onl - nw + Math.floor(oTHIS.oOptions.cgwidth / 2);

					$(oTHIS.nDiv).hide();
					$(oTHIS.nBtn).hide();
					$(oTHIS.nBtn).css({'left': nl, top: oTHIS.hDiv.offsetTop}).show();

					ndw = parseInt($(this.nDiv).width(), 10);
					$(oTHIS.nDiv).css({top: oTHIS.divBody.offsetTop});
					if ((nl + ndw) > $(oTHIS.gDiv).width()) {
						$(oTHIS.nDiv).css('left', onl - ndw + 1);
					} else {
						$(oTHIS.nDiv).css('left', nl);
					}
					if ($(this).hasClass('urb-grid-sorted')) {
						$(oTHIS.nBtn).addClass('srtd');
					} else {
						$(oTHIS.nBtn).removeClass('srtd');
					}
				}
			}, function () {
				var no;

				$(this).removeClass('thOver');
				if ($(this).attr('abbr') != oTHIS.oOptions.sSName) {
					$('div', this).removeClass('s' + oTHIS.oOptions.sSOrder);
				} else if ($(this).attr('abbr') == oTHIS.oOptions.sSName) {
					no = (oTHIS.oOptions.sSOrder == 'asc') ? 'desc' : 'asc';
					$('div', this).addClass('s' + oTHIS.oOptions.sSOrder).removeClass('s' + no);
				}

				if (oTHIS.colCopy) {
					$(oTHIS.cdropleft).remove();
					$(oTHIS.cdropright).remove();
					oTHIS.dcolt = null;
				}
			});

		});


		//set divBody
		this.divBody.className = 'urb-grid-body';
		$(this.oTable).before(this.divBody);

		var sHCalculated = '';
		var sTmp = this.oOptions.iHeight + ' ';
		if (sTmp.substring(0, 4) == 'calc') {
			sHCalculated = this.oOptions.iHeight;
		} else if (this.oOptions.iHeight == 'auto') {
			sHCalculated = this.oOptions.iHeight;
		} else {
			sHCalculated = this.oOptions.iHeight;
			sHCalculated += 'px'; 
		}

		$(this.divBody).css({height: sHCalculated}).scroll(function (e) {
			oTHIS.scroll()
		}).append(this.oTable);

		if (this.oOptions.iHeight == 'auto' || sTmp.substring(0, 4) == 'calc') {
			$('table', this.divBody).addClass('autoht');
		}

		//add td & row properties
		this.addCellProp();
		this.addRowProp();

		//set oCDrag only if we are using it
		if (this.oOptions.colResize === true) {
			var cdcol = $('thead tr:first th:first', this.hDiv).get(0);
			if(cdcol !== null) {
				this.oCDrag.className = 'urb-grid-coldrag';
				this.cdpad = 0;
				this.cdpad += (isNaN(parseInt($('div', cdcol).css('borderLeftWidth'), 10)) ? 0 : parseInt($('div', cdcol).css('borderLeftWidth'), 10));
				this.cdpad += (isNaN(parseInt($('div', cdcol).css('borderRightWidth'), 10)) ? 0 : parseInt($('div', cdcol).css('borderRightWidth'), 10));
				this.cdpad += (isNaN(parseInt($('div', cdcol).css('paddingLeft'), 10)) ? 0 : parseInt($('div', cdcol).css('paddingLeft'), 10));
				this.cdpad += (isNaN(parseInt($('div', cdcol).css('paddingRight'), 10)) ? 0 : parseInt($('div', cdcol).css('paddingRight'), 10));
				this.cdpad += (isNaN(parseInt($(cdcol).css('borderLeftWidth'), 10)) ? 0 : parseInt($(cdcol).css('borderLeftWidth'), 10));
				this.cdpad += (isNaN(parseInt($(cdcol).css('borderRightWidth'), 10)) ? 0 : parseInt($(cdcol).css('borderRightWidth'), 10));
				this.cdpad += (isNaN(parseInt($(cdcol).css('paddingLeft'), 10)) ? 0 : parseInt($(cdcol).css('paddingLeft'), 10));
				this.cdpad += (isNaN(parseInt($(cdcol).css('paddingRight'), 10)) ? 0 : parseInt($(cdcol).css('paddingRight'), 10));
				$(this.divBody).before(this.oCDrag);
				var cdheight = $(this.divBody).height();
				var hdheight = $(this.hDiv).height();
				$(this.oCDrag).css({top: -hdheight + 'px'});

				$('thead tr:first th', this.hDiv).each(function() {
					var cgDiv;

					cgDiv = document.createElement('div');
					$(oTHIS.oCDrag).append(cgDiv);
					if (!oTHIS.oOptions.cgwidth) {
						oTHIS.oOptions.cgwidth = $(cgDiv).width();
					}

					$(cgDiv).css({height: cdheight + hdheight}).mousedown(function(e) {
						oTHIS.dragStart('colresize', e, this);
					}).dblclick(function(e) {
						oTHIS.autoResizeColumn(this);
					});

					if (oTHIS.browser.msie && oTHIS.browser.version < 7.0) {
						oTHIS.fixHeight($(this.gDiv).height());
						$(cgDiv).hover(function() {
							oTHIS.fixHeight();
							$(this).addClass('dragging');
						}, function() {
							if(!oTHIS.colresize) {
								$(this).removeClass('dragging');
							}
						});
					}
				});
			}
		}

		//add strip
		if (this.oOptions.striped) {
			$('tbody tr:odd', this.divBody).addClass('erow');
		}

		var sTmp = this.oOptions.iHeight + ' ';
		if (this.oOptions.bResizable && this.oOptions.iHeight != 'auto' && sTmp.substring(0, 4) != 'calc') {
			this.vDiv.className = 'vGrip';
			$(this.vDiv).mousedown(function (e) {
				oTHIS.dragStart('vresize', e);
			}).html('<span></span>');
			$(this.divBody).after(this.vDiv);
		}

		if (this.oOptions.bResizable && this.oOptions.iWidth != 'auto' && !this.oOptions.nohresize) {
			this.rDiv.className = 'hGrip';
			$(this.rDiv).mousedown(function (e) {
				oTHIS.dragStart('vresize', e, true);
			}).html('<span></span>').css('height', $(this.gDiv).height());

			if (this.browser.msie && this.browser.version < 7.0) {
				$(this.rDiv).hover(function () {
					$(this).addClass('hgOver');
				}, function () {
					$(this).removeClass('hgOver');
				});
			}
			$(this.gDiv).append(this.rDiv);
		}

		// add pager
		if (this.oOptions.bPager) {
			this.createPager();

			$('#'+"btnC_" + this.oOptions.uid).click(function () {
				$('input[name=q]', oTHIS.sDiv).val('');
				oTHIS.oOptions.sQValue = '';
				oTHIS.doSearch();
			});

			$('#'+"btnS_" + this.oOptions.uid).click(function () {
				oTHIS.doSearch();
			});

		}

		$(this.pDiv, this.sDiv).append("<div style='clear:both'></div>");

		// add title
		if (this.oOptions.sTitle) {
			this.mDiv.className = 'urb-grid-header';
			this.mDiv.innerHTML = '<div class="urb-grid-title">' + this.oOptions.sTitle + '</div>';
			$(this.gDiv).prepend(this.mDiv);
			if (this.oOptions.bTTButton) {
				$(this.mDiv).append('<div class="ptogtitle"><span><i class="icon-angle-up"></i></span></div>');
				$('div.ptogtitle', this.mDiv).click(function () {
					$(oTHIS.gDiv).toggleClass('grid-hidebody');
					if ($(oTHIS.gDiv).hasClass('grid-hidebody')) {
						$(this).html('<span><i class="icon-angle-down"></i></span>');
					} else {
						$(this).html('<span><i class="icon-angle-up"></i></span>');
					}
				});
			}
		}

		//setup cdrops
		this.cdropleft = document.createElement('span');
		this.cdropleft.className = 'urb-grid-dropleft';
		this.cdropright = document.createElement('span');
		this.cdropright.className = 'urb-grid-dropright';

		//add block
		this.block.className = 'gBlock';
		var gh = $(this.divBody).height();
		var gtop = this.divBody.offsetTop;
		$(this.block).css({
			width: this.divBody.style.width,
			height: gh,
			background: 'white',
			position: 'relative',
			marginBottom: (gh * -1),
			zIndex: 1,
			top: gtop,
			left: '0px'
		});

		$(this.block).fadeTo(0, this.oOptions.blockOpacity);

		// add column control
		if ($('th', this.hDiv).length) {
			this.nDiv.className = 'nDiv';
			this.nDiv.innerHTML = "<table cellpadding='0' cellspacing='0'><tbody></tbody></table>";

			var vElements = $(this.nDiv).css({marginBottom: (gh * -1), display: 'none', top: gtop});
			this.noSelect(vElements);

			var cn = 0;
			$('th div', this.hDiv).each(function() {
				var kcol;
				var chk;
				var sSelector;

				sSelector = "th[axis='col" + cn + "']";
				kcol = $(sSelector, oTHIS.hDiv)[0];
				chk = 'checked="checked"';
				if (kcol) {
					if (kcol.style.display == 'none') {
						chk = '';
					}
				}

				$('tbody', oTHIS.nDiv).append('<tr><td class="ndcol1"><input type="checkbox" ' + chk + ' class="togCol" value="' + cn + '" /></td><td class="ndcol2">' + this.innerHTML + '</td></tr>');
				cn++;
			});

			if (this.browser.msie && this.browser.version < 7.0) $('tr', this.nDiv).hover(function() {
				$(this).addClass('ndcolover');
			}, function () {
				$(this).removeClass('ndcolover');
			});

			$('td.ndcol2', this.nDiv).click(function () {
				if ($('input:checked', this.nDiv).length <= oTHIS.oOptions.minColToggle && $(this).prev().find('input')[0].checked) {
					return false;
				}

				return oTHIS.toggleCol($(this).prev().find('input').val());
			});

			$('input.togCol', this.nDiv).click(function () {
				if ($('input:checked', this.nDiv).length < oTHIS.oOptions.minColToggle && this.checked === false) return false;
				$(this).parent().next().trigger('click');
			});

			$(this.gDiv).prepend(this.nDiv);
			$(this.nBtn).addClass('nBtn')
				.html('<div></div>')
				.attr('title', 'Hide/Show Columns')
				.click(function() {
					$(oTHIS.nDiv).toggle();
					return true;
				});

			if (this.oOptions.bCTButton) {
				$(this.gDiv).prepend(this.nBtn);
			}
		}

		// add flexigrid events
		$(this.divBody).hover(function () {
			$(this.nDiv).hide();
			$(this.nBtn).hide();
		}, function () {
			if (this.bMSelect) {
				this.bMSelect = false;
			}
		});

		$(this.gDiv).hover(function () {}, function () {
			$(oTHIS.nDiv).hide();
			$(oTHIS.nBtn).hide();
		});

		//add document events
		$(document).mousemove(function (e) {
			oTHIS.dragMove(e);
		}).mouseup(function (e) {
			oTHIS.dragEnd();
		}).hover(function () {}, function () {
			oTHIS.dragEnd();
		});

		//browser adjustments
		if (this.browser.msie && this.browser.version < 7.0) {
			$('.urb-grid-colhdrwrap,.urb-grid-body,.urb-grid-header,.urb-grid-paginationbar,.vGrip,.urb-grid-toolbar, .urb-grid-searchbar', this.gDiv).css({
				width: '100%'
			});

			$(this.gDiv).addClass('ie6');
			if (this.oOptions.iWidth != 'auto') {
				$(this.gDiv).addClass('ie6fullwidthbug');
			}
		}

		this.rePosDrag();
		this.fixHeight();

		// load data
		if (this.oOptions.sURL && this.oOptions.bLoad) {
			this.populateGrid();
		}

	},

	createPager: function() {
		var oTHIS;
		var vHTML;
		var sHTML;

		oTHIS = this;

		this.pDiv.className = 'urb-grid-paginationbar';
		this.pDiv.innerHTML = '<div class="urb-grid-paginationpad"></div>';
		$(this.divBody).after(this.pDiv);

		vHTML = [];
		vHTML.push("<div class='urb-grid-group'>");
		vHTML.push("   <div class='urb-grid-pgfirst urb-grid-pgbutton'>");
		vHTML.push("      <span><i class='icon-to-start'></i></span>");
		vHTML.push("   </div>");
		vHTML.push("   <div class='pPrev urb-grid-pgbutton'>");
		vHTML.push("      <span><i class='icon-left-dir'></i></span>");
		vHTML.push("   </div>");
		vHTML.push("</div>");
		vHTML.push("<div class='btnseparator'></div>");
		vHTML.push("<div class='urb-grid-group'>");
		vHTML.push("   <span class='urb-grid-pgcontrol'>" + this.oOptions.pagetext);
		vHTML.push("      <input type='text' maxlength='5' value='1' style='max-width:45px;margin-right:3px;'/>" + this.oOptions.outof);
		vHTML.push("      <span> 1 </span>");
		vHTML.push("   </span>");
		vHTML.push("</div>");
		vHTML.push("<div class='btnseparator'></div>");
		vHTML.push("<div class='urb-grid-group'>");
		vHTML.push("   <div class='pNext urb-grid-pgbutton'>");
		vHTML.push("      <span><i class='icon-right-dir'></i></span>");
		vHTML.push("   </div>");
		vHTML.push("   <div class='pLast urb-grid-pgbutton'>");
		vHTML.push("      <span><i class='icon-to-end'></i></span>");
		vHTML.push("   </div>");
		vHTML.push("</div>");
		vHTML.push("<div class='btnseparator'></div>");
		vHTML.push("<div class='urb-grid-group'>");
		vHTML.push("   <div class='urb-grid-reload urb-grid-pgbutton'>");
		vHTML.push("      <span><i class='icon-spin3'></i></span>");
		vHTML.push("   </div>");
		vHTML.push("</div>");
		vHTML.push("<div class='btnseparator'></div>");
		vHTML.push("<div class='urb-grid-group'>");
		vHTML.push("   <span class='pPageStat'></span>");
		vHTML.push("</div>");

		sHTML = vHTML.join('');

		$('div', this.pDiv).html(sHTML);
		$('.urb-grid-reload', this.pDiv).click(function () {
			oTHIS.populateGrid();
		});
		$('.urb-grid-pgfirst', this.pDiv).click(function () {
			oTHIS.changePage('first');
		});
		$('.pPrev', this.pDiv).click(function () {
			oTHIS.changePage('prev');
		});
		$('.pNext', this.pDiv).click(function () {
			oTHIS.changePage('next');
		});
		$('.pLast', this.pDiv).click(function () {
			oTHIS.changePage('last');
		});
		$('.urb-grid-pgcontrol input', this.pDiv).keydown(function (e) {
			if (e.keyCode == 13) { 
				oTHIS.changePage('input');
			}
		});

		if (this.browser.msie && this.browser.version < 7) $('.urb-grid-pgbutton', this.pDiv).hover(function () {
			$(this).addClass('urb-grid-btnover');
		}, function () {
			$(this).removeClass('urb-grid-btnover');
		});

		if (this.oOptions.bRPP) {
			var opt = '';
			var sel = '';

			for (var nx = 0; nx < this.oOptions.vRPP.length; nx++) {
				if (this.oOptions.iRPP == this.oOptions.vRPP[nx]) {
					sel = 'selected="selected"';
				} else {
					sel = '';
				}

				opt += "<option value='" + this.oOptions.vRPP[nx] + "' " + sel + " >" + this.oOptions.vRPP[nx] + "&nbsp;&nbsp;</option>";
			}

			vHTML = [];
			vHTML.push("<div class='urb-grid-group'>");
			vHTML.push("   <select name='rp' style='width:50px;'>");
			vHTML.push(opt);
			vHTML.push("   </select>");
			vHTML.push("</div>");
			vHTML.push("<div class='btnseparator'></div>");

			sHTML = vHTML.join('');

			$('.urb-grid-paginationpad', this.pDiv).prepend(sHTML);
			$('select', this.pDiv).change(function() {
				if (oTHIS.oOptions.onRpChange) {
					this.oOptions.onRpChange(+this.value);
				} else {
					oTHIS.oOptions.newp = 1;
					oTHIS.oOptions.iRPP = +this.value;

					oTHIS.populateGrid();
				}
			});
		}

		// Add search button
		if (this.oOptions.vSItems) {
			vHTML = [];
			vHTML.push("<div class='urb-grid-group'>");
			vHTML.push("   <div class='urb-grid-pgsearch urb-grid-pgbutton'>");
			vHTML.push("      <span><i class='icon-search'></i></span>");
			vHTML.push("   </div>");
			vHTML.push("</div>");
			vHTML.push("<div class='btnseparator'></div>");

			sHTML = vHTML.join('');
			$('.urb-grid-paginationpad', this.pDiv).prepend(sHTML);
			$('.urb-grid-pgsearch', this.pDiv).click(function () {
				var iOHeight;
				var vElements;
				var oSBar;
				var bVisible;

				bVisible = false;
				iOHeight = parseInt(oTHIS.divBody.style.height, 10);
				vElements = $('.urb-grid-searchbar', oTHIS.gDiv);
				if (vElements.length > 0) {
					oSBar = vElements[0];
					bVisible = oTHIS.oSPA.isVisible(oSBar);
					if (!bVisible) {
						iOHeight = iOHeight - 32;
						oTHIS.divBody.style.height = iOHeight + 'px';
						oTHIS.oOptions.iHeight = iOHeight;
						oTHIS.fixHeight(iOHeight);
					}
				}

				$(oTHIS.sDiv).slideToggle('fast', function () {
					$('.urb-grid-searchbar:visible input:first', oTHIS.gDiv).trigger('focus');
					if (bVisible) {
						iOHeight = iOHeight + 32;
						oTHIS.divBody.style.height = iOHeight + 'px';
						oTHIS.oOptions.iHeight = iOHeight;
						oTHIS.fixHeight(iOHeight);
					}
				});
			});

			//add search box
			this.sDiv.className = 'urb-grid-searchbar';
			var sitems = this.oOptions.vSItems;
			var sopt = '', sel = '';
			for (var s = 0; s < sitems.length; s++) {
				if (this.oOptions.sQField === '' && sitems[s].bDefault === true) {
					this.oOptions.sQField = sitems[s].name;
					sel = 'selected="selected"';
				} else {
					sel = '';
				}
				sopt += "<option value='" + sitems[s].sName + "' " + sel + " >" + sitems[s].sDisplay + "&nbsp;&nbsp;</option>";
			}

			if (this.oOptions.sQField === '') {
				this.oOptions.sQField = sitems[0].sName;
			}

			vHTML = [];
			vHTML.push("<div class='urb-grid-searchpad'>");
			vHTML.push("   <select name='sQField' style='float:left;margin-right:10px;'>" + sopt + "</select>");
			vHTML.push("   <input type='text' value='" + this.oOptions.sQValue + "' size='30' name='q' class='qsbox' style='float:left;' />");
			vHTML.push("   <div id='btnS_" + this.oOptions.uid + "' class='urb-grid-pgbutton'>");
			vHTML.push("      <span><i class='icon-search'></i></span>");
			vHTML.push("   </div>");
			vHTML.push("   <div id='btnC_" + this.oOptions.uid + "' class='urb-grid-pgbutton' style='width:90px;'>");
			vHTML.push("      <span>Limpiar filtro</i></span>");
			vHTML.push("   </div>");
			vHTML.push("</div>");

			sHTML = vHTML.join('');
			$(this.sDiv).append(sHTML);

			//Split into separate selectors because of bug in jQuery 1.3.2
			$('input[name=q]', this.sDiv).keydown(function (e) {
				if (e.keyCode == 13) {
					oTHIS.doSearch();
				}
			});

			$('select[name=sQField]', this.sDiv).keydown(function (e) {
				if (e.keyCode == 13) {
					oTHIS.doSearch();
				}
			});

			$('input[value=Clear]', this.sDiv).click(function () {
				$('input[name=q]', oTHIS.sDiv).val('');
				oTHIS.oOptions.sQValue = '';
				oTHIS.doSearch();
			});

			$(this.divBody).after(this.sDiv);
		}

	},

	createModel:function() {
		var thead;
		var tr;
		var iIdx;
		var oColumn;
		var th;
		var cookie_width;

		thead = document.createElement('thead');
		tr = document.createElement('tr');
		for (iIdx = 0; iIdx < this.oOptions.vColumns.length; iIdx++) {
			oColumn = this.oOptions.vColumns[iIdx];
			th = document.createElement('th');
			$(th).attr('axis', 'col' + iIdx);
			if(oColumn) {
				if ($.cookies) {
					cookie_width = 'flexiwidths/'+oColumn.sName;		// Re-Store the widths in the cookies
					if( $.cookie(cookie_width) != undefined ) {
						oColumn.iWidth = $.cookie(cookie_width);
					}
				}

				if( oColumn.sDisplay != undefined ) {
					th.innerHTML = oColumn.sDisplay;
				}

				if (oColumn.sName && oColumn.bSortable) {
					$(th).attr('abbr', oColumn.sName);
				}

				if (oColumn.sAlign) {
					th.align = oColumn.sAlign;
				}

				if (oColumn.iWidth) {
					$(th).attr('width', oColumn.iWidth);
				}

				if ($(oColumn).attr('hide')) {
					th.hidden = true;
				}

				if (oColumn.fnProcess) {
					th.fnProcess = oColumn.fnProcess;
				}
			} else {
				th.innerHTML = '';
				$(th).attr('width',30);
			}
			$(tr).append(th);
		}
		$(thead).append(tr);
		$(this.oTable).prepend(thead);

	},

	createToolbar: function() {
		var oTHIS;
		var iIdx;
		var oButton;
		var btnDiv;

		oTHIS = this;

		this.oTBar.className = 'urb-grid-toolbar';
		var oBPad = document.createElement('div');
		oBPad.className = 'urb-grid-btnpad';

		for (iIdx = 0; iIdx < this.oOptions.vButtons.length; iIdx++) {
			oButton = this.oOptions.vButtons[iIdx];

			if (!oButton.bSeparator) {
				btnDiv = document.createElement('div');
				btnDiv.className = 'fbutton';
				btnDiv.innerHTML = ("<div><span>") + (oButton.hidename ? "&nbsp;" : oButton.sName) + ("</span></div>");
				if (oButton.sClass) {
					$('span', btnDiv).addClass(oButton.sClass).css({paddingLeft: 20});
				}

				// if bimage defined, use its string as an image url for this buttons style (RS)
				if (oButton.sImage) {
					$('span',btnDiv).css( 'background', 'url('+oButton.sImage+') no-repeat center left' );
					$('span',btnDiv).css( 'paddingLeft', 20 );
				}

				// add title if exists (RS)
				if (oButton.sTTip) {
					$('span',btnDiv)[0].title = oButton.sTTip;
				}

				btnDiv.fnClick = oButton.fnClick;
				btnDiv.name = oButton.sName;
				if (oButton.sID) {
					btnDiv.id = oButton.sID;
				}

				if (oButton.fnClick) {
					$(btnDiv).click(function () {
						this.fnClick(this.id || this.name, oTHIS);
					});
				}

				$(oBPad).append(btnDiv);
				if (this.browser.msie && this.browser.version < 7.0) {
					$(btnDiv).hover(function () {
						$(this).addClass('fbOver');
					}, function () {
						$(this).removeClass('fbOver');
					});
				}
			} else {
				$(oBPad).append("<div class='btnseparator'></div>");
			}
		}

		$(this.oTBar).append(oBPad);
		$(this.oTBar).append("<div style='clear:both'></div>");
		$(this.gDiv).prepend(this.oTBar);

	},

	rePosDrag: function() {
		var vHeaders;
		var vSliders;
		var iCol;
		var iIdx;
		var iLng;
		var iLeft;
		var iDecrement;
		var iW;


		this.oCDrag.style.top = this.hDiv.offsetTop + 1 + 'px';

		vSliders = this.oCDrag.querySelectorAll('div');
		iLng = vSliders.length;
		for (iIdx = 0; iIdx < iLng; iIdx++) {
			vSliders[iIdx].style.display = 'none';
		}

		iCol = 0;
		iLeft = 0 - this.hDiv.scrollLeft;
		if (this.hDiv.scrollLeft > 0) {
			iLeft -= Math.floor(this.oOptions.cgwidth / 2);
		}

		vHeaders = this.hDiv.querySelectorAll('thead tr:first-child th');
		iLng = vHeaders.length;
		for (iIdx = 0; iIdx < iLng; iIdx++) {
			if (vHeaders[iIdx].style.display != 'none') {
				iW = vHeaders[iIdx].offsetWidth;
				iDecrement = Math.floor(this.oOptions.cgwidth / 2);
				vSliders[iCol].style.left = iLeft + iW -2 + 'px';
				vSliders[iCol].style.display = 'block';

				iLeft = iLeft + iW;
				iCol ++;
			}
		}
	},

	fixHeight: function (newH) {
		var hdHeight;
		var nd;
		var hrH;

		newH = false;
		if (!newH) {
			newH = $(this.divBody).height();
		}

		hdHeight = $(this.hDiv).height();
		$('div', this.oCDrag).each(function () {
			$(this).height(newH + hdHeight);
		});

		nd = parseInt($(this.nDiv).height(), 10);
		if (nd > newH) {
			$(this.nDiv).height(newH).width(200);
		} else {
			$(this.nDiv).height('auto').width('auto');
		}

		$(this.block).css({height: newH, marginBottom: (newH * -1)});
		hrH = this.divBody.offsetTop + newH;
		if (this.oOptions.iHeight != 'auto' && this.oOptions.bResizable) {
			hrH = this.vDiv.offsetTop;
		}

		$(this.rDiv).css({height: hrH});
	},

	setHeight: function(iH) {
		var vElements;
		var bVisible;
		var oTitle;
		var oTBar;
		var oSBar;
		var oPBar;
		var iBHeight;

		if ((iH > this.oOptions.iMHeight || this.oOptions.iHeight < this.oOptions.iMHeight)) {
			bVisible = false;
			iBHeight = 0;
			vElements = $('.urb-grid-title', this.gDiv);
			if (vElements.length > 0) {
				oTitle = vElements[0];
				bVisible = this.oSPA.isVisible(oTitle);
				if (bVisible) {
					iBHeight = iBHeight + oTitle.offsetHeight;
				}
			}

			vElements = $('.urb-grid-toolbar', this.gDiv);
			if (vElements.length > 0) {
				oTBar = vElements[0];
				bVisible = this.oSPA.isVisible(oTBar);
				if (bVisible) {
					iBHeight = iBHeight + oTBar.offsetHeight;
				}
			}

			vElements = $('.urb-grid-searchbar', this.gDiv);
			if (vElements.length > 0) {
				oSBar = vElements[0];
				bVisible = this.oSPA.isVisible(oSBar);
				if (bVisible) {
					iBHeight = iBHeight + oSBar.offsetHeight;
				}
			}

			vElements = $('.urb-grid-paginationbar', this.gDiv);
			if (vElements.length > 0) {
				oPBar = vElements[0];
				//bVisible = this.oSPA.isVisible(oPBar);
				if (oPBar.style.display != 'none') {
					bVisible = true;
				}

				if (bVisible) {
					iBHeight = iBHeight + oPBar.offsetHeight;
				}
			}

			iH = iH - iBHeight - 4;
			this.divBody.style.height = iH + 'px';
			this.oOptions.iHeight = iH;
			this.fixHeight(iH);
		}
	},

	//default drag function start
	dragStart: function (dragtype, e, obj) {
		var n;
		var ow;
		var hgo;

		if (dragtype == 'colresize' && this.oOptions.colResize === true) {
			//column resize

			$(this.nDiv).hide();
			$(this.nBtn).hide();

			n = $('div', this.oCDrag).index(obj);
			ow = $('th:visible div:eq(' + n + ')', this.hDiv).width();
			$(obj).addClass('dragging').siblings().hide();
			$(obj).prev().addClass('dragging').show();
			this.colresize = {startX: e.pageX, ol: parseInt(obj.style.left, 10), ow: ow, n: n};
			$('body').css('cursor', 'col-resize');
		} else if (dragtype == 'vresize') {
			//table resize

			hgo = false;
			$('body').css('cursor', 'row-resize');
			if (obj) {
				hgo = true;
				$('body').css('cursor', 'col-resize');
			}

			this.vresize = {h: this.oOptions.iHeight, sy: e.pageY, w: this.oOptions.iWidth, sx: e.pageX, hgo: hgo};
		} else if (dragtype == 'colMove') {
			//column header drag

			//disable selecting the column header
			$(e.target).disableSelection();

			if((this.oOptions.colMove === true)) {
				$(this.nDiv).hide();
				$(this.nBtn).hide();
				this.hset = $(this.hDiv).offset();
				this.hset.right = this.hset.left + $('table', this.hDiv).width();
				this.hset.bottom = this.hset.top + $('table', this.hDiv).height();
				this.dcol = obj;
				this.dcoln = $('th', this.hDiv).index(obj);
				this.colCopy = document.createElement("div");
				this.colCopy.className = "colCopy";
				this.colCopy.innerHTML = obj.innerHTML;
				if (this.browser.msie) {
					this.colCopy.className = "colCopy ie";
				}

				$(this.colCopy).css({
					position: 'absolute',
					'float': 'left',
					display: 'none',
					textAlign: obj.align
				});

				$('body').append(this.colCopy);
				$(this.oCDrag).hide();
			}
		}

		var vElements = $('body');
		this.noSelect(vElements);
	},

	dragMove: function (e) {
		var n;
		var diff;
		var nleft;
		var nw;
		var v;
		var y;
		var x;
		var xdiff;
		var newW;
		var newH;

		if (this.colresize) {
			//column resize

			n = this.colresize.n;
			diff = e.pageX - this.colresize.startX;
			nleft = this.colresize.ol + diff;
			nw = this.colresize.ow + diff;
			if (nw > this.oOptions.minwidth) {
				$('div:eq(' + n + ')', this.oCDrag).css('left', nleft);
				this.colresize.nw = nw;
			}
		} else if (this.vresize) {
			//table resize

			v = this.vresize;
			y = e.pageY;
			diff = y - v.sy;
			if (!this.oOptions.defwidth) {
				this.oOptions.defwidth = this.oOptions.iWidth;
			}

			if (this.oOptions.iWidth != 'auto' && !this.oOptions.nohresize && v.hgo) {
				x = e.pageX;
				xdiff = x - v.sx;
				newW = v.w + xdiff;
				if (newW > this.oOptions.defwidth) {
					this.gDiv.style.width = newW + 'px';
					this.oOptions.iWidth = newW;
				}
			}

			newH = v.h + diff;
			if ((newH > this.oOptions.iMHeight || this.oOptions.iHeight < this.oOptions.iMHeight) && !v.hgo) {
				this.divBody.style.height = newH + 'px';
				this.oOptions.iHeight = newH;
				this.fixHeight(newH);
			}
			v = null;
		} else if (this.colCopy) {
			$(this.dcol).addClass('thMove').removeClass('thOver');
			if (e.pageX > this.hset.right || e.pageX < this.hset.left || e.pageY > this.hset.bottom || e.pageY < this.hset.top) {
				$('body').css('cursor', 'move');
			} else {
				$('body').css('cursor', 'pointer');
			}

			$(this.colCopy).css({top: e.pageY + 10, left: e.pageX + 20, display: 'block'});
		}
	},

	dragEnd: function () {
		var oTHIS;
		var n;
		var nw;
		var name;

		oTHIS = this;

		if (this.colresize) {
			n = this.colresize.n;
			nw = this.colresize.nw;
			$('th:visible div:eq(' + n + ')', this.hDiv).css('width', nw);
			$('tr', this.divBody).each(function() {
				var $tdDiv;

				$tdDiv = $('td:visible div:eq(' + n + ')', this);
				$tdDiv.css('width', nw);
				oTHIS.addTitleToCell($tdDiv);
			});

			this.hDiv.scrollLeft = this.divBody.scrollLeft;
			$('div:eq(' + n + ')', this.oCDrag).siblings().show();
			$('.dragging', this.oCDrag).removeClass('dragging');
			this.rePosDrag();
			this.fixHeight();
			this.colresize = false;
			if ($.cookies) {
				name = this.oOptions.vColumns[n].name;		// Store the widths in the cookies
				$.cookie('flexiwidths/'+name, nw);
			}
		} else if (this.vresize) {
			this.vresize = false;
		} else if (this.colCopy) {
			$(this.colCopy).remove();
			if (this.dcolt !== null) {
				if (this.dcoln > this.dcolt) {
					$('th:eq(' + this.dcolt + ')', this.hDiv).before(this.dcol);
				} else {
					$('th:eq(' + this.dcolt + ')', this.hDiv).after(this.dcol);
				}

				this.switchCol(this.dcoln, this.dcolt);
				$(this.cdropleft).remove();
				$(this.cdropright).remove();
				this.rePosDrag();
				if (this.oOptions.onDragCol) {
					this.oOptions.onDragCol(this.dcoln, this.dcolt);
				}
			}
			this.dcol = null;
			this.hset = null;
			this.dcoln = null;
			this.dcolt = null;
			this.colCopy = null;
			$('.thMove', this.hDiv).removeClass('thMove');
			$(this.oCDrag).show();
		}

		$('body').css('cursor', 'default');

		var vElements = $('body'); 
		this.noSelect(vElements);
	},

	toggleCol: function(cid, visible) {
		var ncol;
		var n;
		var cb;

		ncol = $("th[axis='col" + cid + "']", this.hDiv)[0];
		n = $('thead th', this.hDiv).index(ncol);
		cb = $('input[value=' + cid + ']', this.nDiv)[0];
		if (visible == null) {
			visible = ncol.hidden;
		}

		if ($('input:checked', this.nDiv).length < this.oOptions.minColToggle && !visible) {
			return false;
		}

		if (visible) {
			ncol.hidden = false;
			$(ncol).show();
			cb.checked = true;
		} else {
			ncol.hidden = true;
			$(ncol).hide();
			cb.checked = false;
		}

		$('tbody tr', this.oTable).each(function () {
			if (visible) {
				$('td:eq(' + n + ')', this).show();
			} else {
				$('td:eq(' + n + ')', this).hide();
			}
		});

		this.rePosDrag();
		if (this.oOptions.onToggleCol) {
			this.oOptions.onToggleCol(cid, visible);
		}

		return visible;
	},

	//switch columns
	switchCol: function (cdrag, cdrop) {
		$('tbody tr', this.oTable).each(function () {
			if (cdrag > cdrop) {
				$('td:eq(' + cdrop + ')', this).before($('td:eq(' + cdrag + ')', this));
			} else {
				$('td:eq(' + cdrop + ')', this).after($('td:eq(' + cdrag + ')', this));
			}
		});

		//switch order in nDiv
		if (cdrag > cdrop) {
			$('tr:eq(' + cdrop + ')', this.nDiv).before($('tr:eq(' + cdrag + ')', this.nDiv));
		} else {
			$('tr:eq(' + cdrop + ')', this.nDiv).after($('tr:eq(' + cdrag + ')', this.nDiv));
		}

		if (this.browser.msie && this.browser.version < 7.0) {
			$('tr:eq(' + cdrop + ') input', this.nDiv)[0].checked = true;
		}

		this.hDiv.scrollLeft = this.divBody.scrollLeft;
	},

	scroll: function () {
		this.hDiv.scrollLeft = this.divBody.scrollLeft;
		this.rePosDrag();
	},

	// parse data
	addData: function(data) {
		var oTHIS;
		var tbody;

		oTHIS = this;

		if (this.oOptions.sDType == 'json') {
			data = $.extend({vRows: [], iPage: 0, iTRows: 0}, data);
		}

		if (this.oOptions.preProcess) {
			data = this.oOptions.preProcess(data);
		}

		$('.urb-grid-reload span i', this.pDiv).removeClass('animate-spin');
		this.bLoading = false;
		if (!data) {
			$('.pPageStat', this.pDiv).html(this.oOptions.errormsg);
			if (this.oOptions.fnSuccess) {
				this.oOptions.fnSuccess(this);
			}

			return false;
		}

		if (this.oOptions.sDType == 'xml') {
			this.oOptions.iTRows = +$('vRows iTRows', data).text();
		} else {
			this.oOptions.iTRows = data.iTRows;
		}

		if (this.oOptions.iTRows === 0) {
			$('tr, a, td, div', this.oTable).unbind();
			$(this.oTable).empty();
			this.oOptions.iTPages = 1;
			this.oOptions.iPage = 1;
			this.buildpager();
			$('.pPageStat', this.pDiv).html(this.oOptions.nomsg);
			if (this.oOptions.fnSuccess) {
				this.oOptions.fnSuccess(this);
			}

			return false;
		}

		this.oOptions.iTPages = Math.ceil(this.oOptions.iTRows / this.oOptions.iRPP);
		if (this.oOptions.sDType == 'xml') {
			this.oOptions.iPage = +$('vRows iPage', data).text();
		} else {
			this.oOptions.iPage = data.iPage;
		}

		this.buildpager();

		//build new body
		tbody = document.createElement('tbody');
		if (this.oOptions.sDType == 'json') {
			$.each(data.vRows, function (i, row) {
				var tr;
				var jtr;

				tr = document.createElement('tr');
				jtr = $(tr);

				if (row.name) {
					tr.name = row.name;
				}

				if (row.color) {
					jtr.css('background',row.color);
				} else {
					if (i % 2 && oTHIS.oOptions.striped) {
						tr.className = 'erow';
					}
				}

				if (row[oTHIS.oOptions.idProperty]) {
					tr.id = 'row' + row[oTHIS.oOptions.idProperty];
					jtr.attr('data-id', row[oTHIS.oOptions.idProperty]);
				}

				$('thead tr:first th', oTHIS.hDiv).each(function() {
					//add cell
					var td;
					var idx;
					var offs;
					var iHTML;

					td = document.createElement('td');
					idx = $(this).attr('axis').substr(3);
					td.align = this.align;

					// If each row is the object itself (no 'cell' key)
					if (typeof row.vCells == 'undefined') {
						td.innerHTML = row[oTHIS.oOptions.vColumns[idx].sName];
					} else {
						// If the json elements aren't named (which is typical), use numeric order
						iHTML = '';
						if (typeof row.vCells[idx] != "undefined") {
							iHTML = (row.vCells[idx] !== null) ? row.vCells[idx] : ''; //null-check for Opera-browser
						} else {
							iHTML = row.vCells[oTHIS.oOptions.vColumns[idx].sName];
						}

						td.innerHTML = oTHIS.oOptions.__mw.datacol(oTHIS.oOptions, $(this).attr('abbr'), iHTML); //use middleware datacol to format cols
					}

					// If the content has a <BGCOLOR=nnnnnn> option, decode it.
					offs = td.innerHTML.indexOf( '<BGCOLOR=' );
					if( offs >0 ) {
						$(td).css('background', text.substr(offs+7,7) );
					}

					$(td).attr('abbr', $(this).attr('abbr'));
					$(tr).append(td);
					td = null;
				});

				//handle if grid has no headers
				if ($('thead', this.gDiv).length < 1) {
					for (idx = 0; idx < row.vCells.length; idx++) {
						var td = document.createElement('td');

						// If the json elements aren't named (which is typical), use numeric order
						if (typeof row.vCells[idx] != "undefined") {
							td.innerHTML = (row.vCells[idx] != null) ? row.vCells[idx] : '';//null-check for Opera-browser
						} else {
							td.innerHTML = row.vCells[this.oOptions.vColumns[idx].sName];
						}
						$(tr).append(td);
						td = null;
					}
				}
				$(tbody).append(tr);
				tr = null;
			});
		} else if (this.oOptions.sDType == 'xml') {
			var i = 1;
			$("vRows row", data).each(function () {
				i++;
				var tr = document.createElement('tr');
				if ($(this).attr('name')) tr.name = $(this).attr('name');
				if ($(this).attr('color')) {
					$(tr).css('background',$(this).attr('id'));
				} else {
					if (i % 2 && this.oOptions.striped) tr.className = 'erow';
				}
				var nid = $(this).attr('id');
				if (nid) {
					tr.id = 'row' + nid;
				}
				nid = null;
				var robj = this;
				$('thead tr:first th', this.hDiv).each(function () {
					var td = document.createElement('td');
					var idx = $(this).attr('axis').substr(3);
					td.align = this.align;

					var text = $("cell:eq(" + idx + ")", robj).text();
					var offs = text.indexOf( '<BGCOLOR=' );
					if( offs >0 ) {
						$(td).css('background',	 text.substr(offs+7,7) );
					}
					td.innerHTML = this.oOptions.__mw.datacol(p, $(this).attr('abbr'), text); //use middleware datacol to format cols
					$(td).attr('abbr', $(this).attr('abbr'));
					$(tr).append(td);
					td = null;
				});
				if ($('thead', this.gDiv).length < 1) {//handle if grid has no headers
					$('cell', this).each(function () {
						var td = document.createElement('td');
						td.innerHTML = $(this).text();
						$(tr).append(td);
						td = null;
					});
				}
				$(tbody).append(tr);
				tr = null;
				robj = null;
			});
		}

		$('tr', this.oTable).unbind();
		$(this.oTable).empty();
		$(this.oTable).append(tbody);
		this.addCellProp();
		this.addRowProp();
		this.rePosDrag();
		tbody = null;
		data = null;
		i = null;
		if (this.oOptions.fnSuccess) {
			this.oOptions.fnSuccess(this);
		}

		if (this.oOptions.hideOnSubmit) {
			$(this.block).remove();
		}

		this.hDiv.scrollLeft = this.divBody.scrollLeft;
		if (this.browser.opera) {
			$(this.oTable).css('visibility', 'visible');
		}
	},

	//change sortorder
	changeSort: function (th) {
		if (this.bLoading) {
			return true;
		}

		$(this.nDiv).hide();
		$(this.nBtn).hide();
		if (this.oOptions.sSName == $(th).attr('abbr')) {
			if (this.oOptions.sSOrder == 'asc') {
				this.oOptions.sSOrder = 'desc';
			} else {
				this.oOptions.sSOrder = 'asc';
			}
		}

		$(th).addClass('urb-grid-sorted').siblings().removeClass('urb-grid-sorted');
		$('.sdesc', this.hDiv).removeClass('sdesc');
		$('.sasc', this.hDiv).removeClass('sasc');
		$('div', th).addClass('s' + this.oOptions.sSOrder);

		this.oOptions.sSName = $(th).attr('abbr');
		if (this.oOptions.onChangeSort) {
			this.oOptions.onChangeSort(this.oOptions.sSName, this.oOptions.sSOrder);
		} else {
			this.populateGrid();
		}
	},

	//rebuild pager based on new properties
	buildpager: function () {
		var r1;
		var r2;
		var stat;

		$('.urb-grid-pgcontrol input', this.pDiv).val(this.oOptions.iPage);
		$('.urb-grid-pgcontrol span', this.pDiv).html(this.oOptions.iTPages);
		r1 = this.oOptions.iTRows == 0 ? 0 : (this.oOptions.iPage - 1) * this.oOptions.iRPP + 1;
		r2 = r1 + this.oOptions.iRPP - 1;
		if (this.oOptions.iTRows < r2) {
			r2 = this.oOptions.iTRows;
		}

		stat = this.oOptions.pagestat;
		stat = stat.replace(/{from}/, r1);
		stat = stat.replace(/{to}/, r2);
		stat = stat.replace(/{total}/, this.oOptions.iTRows);
		$('.pPageStat', this.pDiv).html(stat);
	},

	doSearch: function () {
		this.oOptions.sQValue = $('input[name=q]', this.sDiv).val();
		this.oOptions.sQField = $('select[name=sQField]', this.sDiv).val();
		this.oOptions.newp = 1;
		this.populateGrid();
	},

	//change page
	changePage: function (ctype) {
		if (this.bLoading) {
			return true;
		}

		switch (ctype) {
			case 'first':
				this.oOptions.newp = 1;
			break;

			case 'prev':
				if (this.oOptions.iPage > 1) {
					this.oOptions.newp = parseInt(this.oOptions.iPage, 10) - 1;
				}
			break;

			case 'next':
				if (this.oOptions.iPage < this.oOptions.iTPages) {
					this.oOptions.newp = parseInt(this.oOptions.iPage, 10) + 1;
				}
			break;

			case 'last':
				this.oOptions.newp = this.oOptions.iTPages;
			break;

			case 'input':
				var nv = parseInt($('.urb-grid-pgcontrol input', this.pDiv).val(), 10);
				if (isNaN(nv)) {
					nv = 1;
				}

				if (nv < 1) {
					nv = 1;
				} else if (nv > this.oOptions.iTPages) {
					nv = this.oOptions.iTPages;
				}

				$('.urb-grid-pgcontrol input', this.pDiv).val(nv);
				this.oOptions.newp = nv;
			break;
		}

		if (this.oOptions.newp == this.oOptions.iPage) {
			return false;
		}

		if (this.oOptions.onChangePage) {
			this.oOptions.onChangePage(this.oOptions.newp);
		} else {
			this.populateGrid();
		}
	},

	addCellProp: function () {
		var oTHIS;

		oTHIS = this;
		$('tbody tr td', this.divBody).each(function () {
			var tdDiv;
			var n;
			var pth;
			var prnt;
			var pid;

			tdDiv = document.createElement('div');
			n = $('td', $(this).parent()).index(this);
			pth = $('th:eq(' + n + ')', oTHIS.hDiv).get(0);
			if (pth != null) {
				if (oTHIS.oOptions.sSName == $(pth).attr('abbr') && oTHIS.oOptions.sSName) {
					this.className = 'urb-grid-sorted';
				}

				$(tdDiv).css({textAlign: pth.align, width: $('div:first', pth)[0].style.width});
				if (pth.hidden) {
					$(this).css('display', 'none');
				}
			}

			if (oTHIS.oOptions.nowrap == false) {
				$(tdDiv).css('white-space', 'normal');
			}

			if (this.innerHTML == '') {
				this.innerHTML = '&nbsp;';
			}

			tdDiv.innerHTML = this.innerHTML;
			prnt = $(this).parent()[0];
			pid = false;
			if (prnt.id) {
				pid = prnt.id.substr(3);
			}

			if (pth != null) {
				if (pth.fnProcess) pth.pnProcess(tdDiv, pid);
			}

			$(this).empty().append(tdDiv).removeAttr('width'); //wrap content
			oTHIS.addTitleToCell(tdDiv);
		});
	},

	// get cell prop for editable event
	getCellDim: function (obj) {
		var ht = parseInt($(obj).height(), 10);
		var pht = parseInt($(obj).parent().height(), 10);
		var wt = parseInt(obj.style.width, 10);
		var pwt = parseInt($(obj).parent().width(), 10);
		var top = obj.offsetParent.offsetTop;
		var left = obj.offsetParent.offsetLeft;
		var pdl = parseInt($(obj).css('paddingLeft'), 10);
		var pdt = parseInt($(obj).css('paddingTop'), 10);
		return {
			ht: ht,
			wt: wt,
			top: top,
			left: left,
			pdl: pdl,
			pdt: pdt,
			pht: pht,
			pwt: pwt
		};
	},

	addRowProp: function () {
		var oTHIS;
		var vElements;

		oTHIS = this;
		$('tbody tr', this.divBody).on('click', function (e) {
			var vValues;
			var iLng;
			var iIdx;
			var obj;

			obj = (e.target || e.srcElement);
			if (obj.href || obj.type) {
				return true;
			}

			if (e.ctrlKey || e.metaKey) {
				// mousedown already took care of this case
				return;
			}

			$(this).toggleClass('urb-grid-rselected');
			if (oTHIS.oOptions.bSSelect && ! this.bMSelect) {
				$(this).siblings().removeClass('urb-grid-rselected');
			}

			if ($(this).hasClass('urb-grid-rselected')) {
				if (oTHIS.oOptions.rowSelected) {
					vValues = [];
					iLng = this.cells.length;
					for (iIdx = 0; iIdx < iLng; iIdx++) {
						vValues.push($(this.cells[iIdx]).text());
					}
					oTHIS.oOptions.rowSelected(vValues);
				}
			} else {
				// Row has been unselected
				if (oTHIS.oOptions.rowSelected) {
					vValues = [];
					oTHIS.oOptions.rowSelected(vValues);
				}
			}

		}).on('mousedown', function (e) {
			if (e.shiftKey) {
				$(this).toggleClass('urb-grid-rselected');
				this.bMSelect = true;
				this.focus();

				vElements = $(oTHIS.gDiv);
				oTHIS.noSelect(vElements);
			}
			if (e.ctrlKey || e.metaKey) {
				$(this).toggleClass('urb-grid-rselected');
				this.bMSelect = true;
				this.focus();
			}
		}).on('mouseup', function (e) {
			if (this.bMSelect && ! (e.ctrlKey || e.metaKey)) {
				this.bMSelect = false;

				vElements = $(oTHIS.gDiv);
				oTHIS.noSelect(vElements);
			}
		}).on('dblclick', function () {
			if (oTHIS.oOptions.onDoubleClick) {
				vValues = [];
				iLng = this.cells.length;
				for (iIdx = 0; iIdx < iLng; iIdx++) {
					vValues.push($(this.cells[iIdx]).text());
				}
				oTHIS.oOptions.onDoubleClick(vValues);

				//oTHIS.oOptions.onDoubleClick(this, g, p);
			}
		}).hover(function (e) {
			if (this.bMSelect && e.shiftKey) {
				$(this).toggleClass('urb-grid-rselected');
			}
		}, function () {});

		if (this.browser.msie && this.browser.version < 7.0) {
			$(this).hover(function () {
				$(this).addClass('trOver');
			}, function () {
				$(this).removeClass('trOver');
			});
		}
	},

	combo_resetIndex: function(selObj) {
		if(this.combo_flag) {
			selObj.selectedIndex = 0;
		}
		this.combo_flag = true;
	},

	combo_doSelectAction: function(selObj) {
		eval( selObj.options[selObj.selectedIndex].value );
		selObj.selectedIndex = 0;
		this.combo_flag = false;
	},

	//Add title attribute to div if cell contents is truncated
	addTitleToCell: function(tdDiv) {
		if(this.oOptions.addTitleToCell) {
			var $span = $('<span />').css('display', 'none'),
				$div = (tdDiv instanceof jQuery) ? tdDiv : $(tdDiv),
				div_w = $div.outerWidth(),
				span_w = 0;

			$('body').children(':first').before($span);
			$span.html($div.html());
			$span.css('font-size', '' + $div.css('font-size'));
			$span.css('padding-left', '' + $div.css('padding-left'));
			span_w = $span.innerWidth();
			$span.remove();

			if(span_w > div_w) {
				$div.attr('title', $div.text());
			} else {
				$div.removeAttr('title');
			}
		}
	},

	autoResizeColumn: function (obj) {
		if(!this.oOptions.dblClickResize) {
			return;
		}
		var n = $('div', this.oCDrag).index(obj),
			$th = $('th:visible div:eq(' + n + ')', this.hDiv),
			ol = parseInt(obj.style.left, 10),
			ow = $th.width(),
			nw = 0,
			nl = 0,
			$span = $('<span />');
		$('body').children(':first').before($span);
		$span.html($th.html());
		$span.css('font-size', '' + $th.css('font-size'));
		$span.css('padding-left', '' + $th.css('padding-left'));
		$span.css('padding-right', '' + $th.css('padding-right'));
		nw = $span.width();
		$('tr', this.divBody).each(function () {
			var $tdDiv = $('td:visible div:eq(' + n + ')', this),
				spanW = 0;
			$span.html($tdDiv.html());
			$span.css('font-size', '' + $tdDiv.css('font-size'));
			$span.css('padding-left', '' + $tdDiv.css('padding-left'));
			$span.css('padding-right', '' + $tdDiv.css('padding-right'));
			spanW = $span.width();
			nw = (spanW > nw) ? spanW : nw;
		});
		$span.remove();
		nw = (this.oOptions.minWidth > nw) ? this.oOptions.minWidth : nw;
		nl = ol + (nw - ow);
		$('div:eq(' + n + ')', this.oCDrag).css('left', nl);
		this.colresize = {
			nw: nw,
			n: n
		};
		this.dragEnd();
	},

	uaMatch: function(ua) {
		var oR;
		var match;

		ua = ua.toLowerCase();

		match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
			/(webkit)[ \/]([\w.]+)/.exec(ua) ||
			/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
			/(msie) ([\w.]+)/.exec( ua ) ||
			ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
			[];

		oR = {};
		oR.browser = match[ 1 ] || "";
		oR.version = match[ 2 ] || "0";

		return oR;
	},

	noSelect:function(vElements) {
		var oTHIS;

		oTHIS = this;

		return vElements.each(function () {
			if (oTHIS.browser.msie || oTHIS.browser.safari) {
				$(this).bind('selectstart', function () {
					return false;
				});
			} else if (oTHIS.browser.mozilla) {
				$(this).css('MozUserSelect', 'none');
				$('body').trigger('focus');
			} else if (oTHIS.browser.opera) {
				$(this).bind('mousedown', function () {
					return false;
				});
			} else {
				$(this).attr('unselectable', 'on');
			}
		});

	},

	/**
	 * Called when the asynchronous populateGrid call is completed.
	 *
	 * @method populateCompleted
	 * 
	 * @param	{Boolean}	bSuccess	Indicates if controller call succeded.
	 * @param	{Object}	oResponse	JSON object returned by server.
	 */
	populateCompleted:function(bSuccess, oResponse) {
		var vRows;
		var oRow;
		var iIdx;
		var iLng;
		var iH;

		if (bSuccess) {
			this.addData(oResponse.oGData);

			vRows = this.oTable.rows;
			iLng = vRows.length;
			for (iIdx = 0; iIdx < iLng; iIdx++) {
				oRow = vRows[iIdx];
				//iH = $(oRow).outerHeight(); 
				iH = $(oRow).height();
				if (iH > 0) {
					//$(oRow).css({'line-height':iH + 'px'});
				}
			}

			if (this.sRID) {
				this.selectRow(this.sRID);
			}
		}
	},

	/**
	 * Loads grid data.
	 *
	 * @method populateGrid
	 *
	 */
	populateGrid:function(sRID) {
		var oP;
		var iLng;
		var iIdx;
		var sName;
		var oValue;
		var bContinue;
		var param;
		var oData;
		var sData;

		if (!this.bLoading) {
			if (sRID) {
				this.sRID = sRID;
			}

			bContinue = true;
			if (this.oOptions.fnSubmit) {
				bContinue = this.oOptions.fnSubmit(this);
			}

			this.bLoading = true;
			if (!this.oOptions.sURL) {
				return false;
			}

			$('.pPageStat', this.pDiv).html(this.oOptions.procmsg);
			$('.urb-grid-reload span i', this.pDiv).addClass('animate-spin');
			$(this.block).css({top: this.divBody.offsetTop});
			if (this.oOptions.hideOnSubmit) {
				$(this.gDiv).prepend(this.block);
			}

			if (this.browser.opera) {
				$(this.oTable).css('visibility', 'hidden');
			}

			if (!this.oOptions.newp) {
				this.oOptions.newp = 1;
			}

			if (this.oOptions.iPage > this.oOptions.iTPages) {
				this.oOptions.iPage = this.oOptions.iTPages;
			}

			oP = {};
			oP.sMethod     = this.oOptions.sURL;
			oP.sUID        = this.oOptions.uid;
			oP.iPage       = this.oOptions.newp;
			oP.iRPP        = this.oOptions.iRPP;
			oP.sSName      = this.oOptions.sSName;
			oP.sSOrder     = this.oOptions.sSOrder;
			oP.sQField     = this.oOptions.sQField;
			oP.sQValue     = this.oOptions.sQValue;
			oP.vConditions = this.oOptions.vConditions;

			iLng = this.oOptions.vParams.length;
			if (this.oOptions.vParams.length) {
				oP.vParameters = [];
				for (iIdx = 0; iIdx < iLng; iIdx++) {
					//sName = this.oOptions.vParams[iIdx].sName;
					//oValue = this.oOptions.vParams[iIdx].oValue;

					oP.vParameters.push(this.oOptions.vParams[iIdx]);
				}

			}

			this.oSPA.serverController(this.oSPA.sService, oP, this.populateCompleted, this);
		} else {
			return true;
		}

	},

	selectedRows:function() {
		var iRow;
		var iColumn;
		var iTRows;
		var iTColumns;
		var vElements;
		var vRows;
		var vColumns;
		var oRow;
		var oColumn;

		vRows = [];
		vElements = $('#'+this.oOptions.uid + ' .urb-grid-rselected');
		iTRows = vElements.length;
		for (iRow = 0; iRow < iTRows; iRow++) {
			vColumns = [];
			oRow = vElements[iRow];
			iTColumns = oRow.cells.length;
			for (iColumn = 0; iColumn < iTColumns; iColumn++) {
				oColumn = oRow.cells[iColumn];
				vColumns.push($(oColumn).text());
			}

			vRows.push(vColumns);
		}

		return vRows;
	},

	gridRows:function() {
		var sSelector;
		var iRow;
		var iColumn;
		var iTRows;
		var iTColumns;
		var vElements;
		var vRows;
		var vColumns;
		var oRow;
		var oColumn;

		vRows = [];
		sSelector = '#'+this.oOptions.uid + ' tr' 
		vElements = $(sSelector);
		iTRows = vElements.length;
		for (iRow = 0; iRow < iTRows; iRow++) {
			vColumns = [];
			oRow = vElements[iRow];
			iTColumns = oRow.cells.length;
			for (iColumn = 0; iColumn < iTColumns; iColumn++) {
				oColumn = oRow.cells[iColumn];
				vColumns.push($(oColumn).text());
			}

			vRows.push(vColumns);
		}

		return vRows;
	},

	selectedRowId:function() {
		var sID;
		var vElements;

		vElements = $('#'+this.oOptions.uid + ' .urb-grid-rselected');
		if (vElements.length) {
			sID = vElements[0].id;
		}

		return sID;
	},

	selectRow:function(sRID) {
		$('#'+sRID).toggleClass('urb-grid-rselected');
	},

	getWidth: function() {
		var oR;

		oR = this.gDiv.getBoundingClientRect();
		return oR.width;
	},

	setWidth: function(oWidth) {

		this.oOptions.iWidth = oWidth;
		if (typeof oWidth === 'string') {
			this.gDiv.style.width = oWidth;
		} else {
			this.gDiv.style.width = oWidth + 'px';
		}
	}

});

