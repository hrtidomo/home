/**
 * Framework
 * 
 * @module Framework
 */

/**
 * Application. Common to all applications.
 *
 * @class OOJ_Application
 * @constructor
 * @method init
 * @param	{String}	sService	URL of the service. 
 * 
 * @return	{OOJ_Application}
 */
var OOJ_Application = Class.extend({

	sService:'',

	/**
	 * Constructor.
	 * 
	 * @method init
	 * @param	{String}	sService	URL of the service. 
	 * 
	 * @return	{OOJ_Application}
	 */
	init: function(sService) {
		this.sService = sService;

	},

	/**
	 * Makes an asinchronous request to the server.
	 * 
	 * @method serverController
	 * @protected
	 * @param {String}		sURL			URL to call
	 * @param {Object}		oData			Parameters for the server controller
	 * @param {Function}	fnCompleted		Callback function to invoke on completion
	 * @param {Object}		oContext		Context of the callback
	 */
	serverController:function(sURL, oData, fnCompleted, oContext) {
		var oRequest;
		var sParameters;

		oRequest = new XMLHttpRequest();
		oRequest.onreadystatechange = function(aEvt) {
			var oResponse;
			var bSuccess;

			oResponse = null;
			bSuccess = false;
			if (oRequest.readyState == 4) {
				if(oRequest.status == 200) {
					oResponse = JSON.parse(oRequest.responseText);
					if (oResponse.hasOwnProperty('iCode')) {
						if (oResponse.iCode == 0 || oResponse.iCode == '0') {
							bSuccess = true;
						}
					}
				}

				fnCompleted.call(oContext, bSuccess, oResponse, oData);
			}
		};

		sParameters = JSON.stringify(oData);
		sURL = sURL + '?XDEBUG_SESSION_START';
		oRequest.open('POST', sURL, true);
		oRequest.setRequestHeader('Content-Type','application/json; charset=utf-8');
		oRequest.send(sParameters);
	},

	/**
	 * Links indicated CSS
	 *
	 * @method linkCSS
	 * @protected
	 * @param	{String}	sURL	URL to link.
	 * @return	{Object}			Containing result and HTML code.
	 * 
	 */
	linkCSS:function(sURL) {
		var lnkFile;
		var vElements;

		lnkFile = document.createElement('link');
		lnkFile.setAttribute('rel', 'stylesheet');
		lnkFile.setAttribute('type', 'text/css');
		lnkFile.setAttribute('href', sURL);

		vElements = document.getElementsByTagName('head');
		vElements[0].appendChild(lnkFile);
	},

	isVisible: function(elem) {
		if (!(elem instanceof Element)){
			throw Error('DomUtil: elem is not an element.');
		}

		const style = getComputedStyle(elem);
		if (style.display === 'none') return false;
		if (style.visibility !== 'visible') return false;
		if (style.opacity < 0.1) return false;
		if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
				elem.getBoundingClientRect().width === 0) {
			return false;
		}
		const elemCenter   = {
				x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
				y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
		};
		if (elemCenter.x < 0) return false;
		if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
		if (elemCenter.y < 0) return false;
		if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
		let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
		do {
			if (pointContainer === elem) return true;
			if (!pointContainer) {
				break;
			}
		} while (pointContainer = pointContainer.parentNode);
		return false;
	}

});

