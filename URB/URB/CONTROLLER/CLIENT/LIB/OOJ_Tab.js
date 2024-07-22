/**
 * Framework
 * 
 * @module Widgets
 */

/**
 * Tab control
 *
 * @class OOJ_Tab
 */
var OOJ_Tab = Class.extend({

	// -----------------------------------------------------------------------
	// Atributos privados
	// -----------------------------------------------------------------------
	_vDisparadores : [],

	/**
		ID del elemento del DOM para el control.

		@property _sID 
		@private
		@type string
	**/
	_sID:null,

	/**
		Elemento del DOM correspondiente al DIV marco del control.

		@property _DIV_Frame 
		@private
		@type Object
	**/
	_DIV_Frame:null,

	/**
		Elemento del DOM correspondiente al DIV marco de las pestañas del tab.

		@property _TR_Tabs 
		@private
		@type Object
	**/
	_TR_Tabs:null,

	// -----------------------------------------------------------------------
	// Atributos publicos
	// -----------------------------------------------------------------------
	/**
		Numero total de pestañas que componen el control-

		@property iTabs 
		@private
		@type int
	**/
	iTabs:0,
	divFiller:null,
	fnSelect:null,

	/**
	 * Constructor.
	 * 
	 * @method init
	 * @param {Object}	oOptions Options.
	 * 
	 * @return {wksCursillos}
	 */
	init : function(oOptions) {
		var oParent;
		var sTipo;
		var bCadena = false;
		var tableTabs;
		var bodyTabs;
		var rowTabs;
		var iLng;
		var iIdx;

		sTipo = typeof oOptions.sID;
		if (sTipo == 'string')
			bCadena = true;

		if (bCadena) {
			this._DIV_Frame = $('#' + oOptions.sID)[0];
			this._sID = 'urb-tab_' + oOptions.sID;
		} else {
			oParent = oOptions.sID;

			this._DIV_Frame = oParent;
			this._sID = 'urb-tab_' + oParent.id;
		}

		this.fnSelect = false;
		if (oOptions.fnSelect) {
			this.fnSelect = oOptions.fnSelect;
		}

		tableTabs = document.createElement('table');
		bodyTabs = document.createElement('tbody');
		this._TR_Tabs = document.createElement('tr');
		this._TR_Tabs.classList.add('urb-tab-container');

		bodyTabs.appendChild(this._TR_Tabs);
		tableTabs.appendChild(bodyTabs);

		this._DIV_Frame.appendChild(tableTabs);
		tableTabs.style.width = '100%';
		tableTabs.setAttribute('cellspacing', '0'); 

		iLng = oOptions.vTabs.length;
		for (iIdx = 0; iIdx < iLng; iIdx++) {
			this.addTab(oOptions.vTabs[iIdx]);
		}

		this.divFiller = this._TR_Tabs.insertCell(-1);
		this.divFiller.classList.add('urb-tab-filler');

		var DIV_Tab;
		var SPAN_Text;


		DIV_Tab = document.createElement('DIV');
		SPAN_Text = document.createElement('SPAN');
		SPAN_Text.style.cssFloat = 'right';

		DIV_Tab.appendChild(SPAN_Text);
		this.divFiller.appendChild(DIV_Tab);

		this.selectTab(0);

	},

	isInteger: function(x) {
		return x % 1 === 0;
	},

	/**
		Selecciona la pestaña indicada.
		
		@method selectTab
		@private
		@param	{object}	DIV_Tab	Elemento DIV de la pestaña de la que se desea el contenido.
		@return {Integer}	Retorna 0 en caso de exito y un codigo de error en caso contrario.
	*/
	selectTab : function(e) {
		var iIdx;
		var iSTab;
		var fnDisparador;
		var oT;
		var sID;
		var sPosicion;
		var oContent;
		var DIV_Tab;
		var sNode;

		if (this.isInteger(e)) {
			iIdx = e;
			sID = '#' + this._sID + '_T_' + iIdx;
			DIV_Tab = $(sID)[0];
			sNode = 'SPAN';
		} else {
			sNode = e.target.tagName;
			sNode = sNode.toUpperCase();
			if (sNode == 'SPAN') {
				DIV_Tab = e.target.parentNode;
			} else {
				DIV_Tab = e.target;
			}
		}

		if (sNode == 'SPAN') {
			iSTab = $(this._DIV_Frame).find('.urb-tab.urb-tab-selected')[0];
			if (iSTab) {
				iSTab.classList.remove('urb-tab-selected');
				sID = iSTab.getAttribute('urb-tab');
				oContent = document.getElementById(sID);
				oContent.style.display = 'none';
			}

			DIV_Tab.classList.add('urb-tab-selected');

			sID = DIV_Tab.getAttribute('urb-tab');
			oContent = document.getElementById(sID);
			oContent.style.display = 'block';

			sID = oContent.id;
			if (this.fnSelect) {
				this.fnSelect(sID);
			}
		}

	},

	addTab : function(oTab) {
		var TD_Tab;
		var SPAN_Text;
		var DIV_Content;
		var sTID;
		var sCID;
		var fnSelect;
		sTID = this._sID + '_T_' + this.iTabs;
		sCID = this._sID + '_C_' + this.iTabs;


		SPAN_Text = document.createElement('SPAN');
		SPAN_Text.innerHTML = oTab.sTitle;
		SPAN_Text.style.cssFloat = 'left';
		DIV_Content = document.createElement('DIV');

		TD_Tab = this._TR_Tabs.insertCell(-1);
		TD_Tab.id = sTID;
		TD_Tab.appendChild(SPAN_Text);

		this._DIV_Frame.appendChild(DIV_Content);

		TD_Tab.setAttribute('urb-tab', sCID);
		TD_Tab.classList.add('urb-tab');
		DIV_Content.classList.add('urb-tab-content');
		DIV_Content.id = sCID;
		if (oTab.sHeight) {
			DIV_Content.style.height = oTab.sHeight;
		}

		if (oTab.bActive) {
			TD_Tab.classList.add('urb-tab-active');
			fnSelect = this.selectTab.bind(this);
			SPAN_Text.addEventListener('click', fnSelect);
		}

		this.iTabs++;
	},

	activateTab : function(iIndex) {
		var sID;
		var fnSelect;
		var oElement;

		sID = '#' + this._sID + '_T_' + iIndex;
		$(sID).addClass('urb-tab-active');

		fnSelect = this.selectTab.bind(this);
		oElement = document.getElementById(this._sID + '_T_' + iIndex);
		oElement.addEventListener('click', fnSelect);

	},


	setContent: function(iIndex, sHTML) {
		var sID;
		var oElement;

		sID = this._sID + '_C_' + iIndex;
		oElement = document.getElementById(sID);
		oElement.innerHTML = sHTML;

	}

});
