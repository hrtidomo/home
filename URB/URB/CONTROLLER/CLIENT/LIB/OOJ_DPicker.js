/**
 * Framework
 * 
 * @module Widgets
 */

/**
 * Calendar
 * 
 * @class OOJ_DPicker
 * @constructor
 * @method init
 * @param {Object}	oOptions Options.
 * 
 * @return {OOJ_DPicker}
 */
var OOJ_DPicker = OOJ_Widget.extend({

	divCalendar: null,

	oDefault: {

		oElement: null,
		bBound: undefined,
		ariaLabel: 'Utilice las flechas para elegir una fecha',
		position: 'bottom left',
		reposition: true,
		format: 'DD/MM/YYYY',
		toString: null,
		parse: null,
		defaultDate: null,
		setDefaultDate: false,
		firstDay: 0,
		formatStrict: false,
		minDate: null,
		maxDate: null,
		yearRange: 10,
		showWeekNumber: false,
		pickWholeWeek: false,
		minYear: 0,
		maxYear: 9999,
		minMonth: undefined,
		maxMonth: undefined,
		startRange: null,
		endRange: null,
		isRTL: false,
		yearSuffix: '',
		showMonthAfterYear: false,
		showDaysInNextAndPreviousMonths: false,
		enableSelectionDaysInNextAndPreviousMonths: false,
		numberOfMonths: 1,
		mainCalendar: 'left',
		container: undefined,
		blurFieldOnSelect : true,
		i18n: {
			previousMonth : 'Anterior',
			nextMonth     : 'Siguiente',
			months        : ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
			weekdays      : ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
			weekdaysShort : ['D','L','M','X','J','V','S']
		},
		theme: null,
		events: [],
		onSelect: null,
		onOpen: null,
		onClose: null,
		onDraw: null,
		keyboardInput: true
	},

	hasEventListeners: true,
	bVisible: false,
	oDate: null,
	bClass: false,
	iYear: 0,
	iMonth: 0,

	/**
	 * Constructor.
	 * 
	 * @method init
	 * @param {Object}	oOptions Options.
	 * 
	 * @return {OOJ_DPicker}
	 */
	init : function(oOptions) {
		var fnKChange;
		var fnVChange;
		var fnMDown;
		var fnIClick;
		var fnIChange;
		var fnIFocus;
		var fnIBlur;
		var divModal;

		fnKChange = this.keyChange.bind(this);
		fnVChange = this.changeValue.bind(this);
		fnMDown   = this.mouseDown.bind(this);
		fnIClick  = this.inputClick.bind(this);
		fnIFocus  = this.inputFocus.bind(this);
		fnIBlur   = this.inputBlur.bind(this);
		fnIChange = this.inputChange.bind(this);

		this.hasEventListeners = !!window.addEventListener;
		this.configureCalendar(oOptions);
		this.oOptions.toString = this.formatDate;
		this.oOptions.parse = this.parseDate;

		this.divCalendar = document.createElement('div');
		this.divCalendar.className = 'pika-single' + (this.oOptions.isRTL ? ' is-rtl' : '') + (this.oOptions.theme ? ' ' + this.oOptions.theme : '');

		this.addEvent(this.divCalendar, 'mousedown', fnMDown, true);
		this.addEvent(this.divCalendar, 'touchend' , fnMDown, true);
		this.addEvent(this.divCalendar, 'change'   , fnVChange);

		if (this.oOptions.keyboardInput) {
			this.addEvent(document, 'keydown', fnKChange);
		}

		if (this.oOptions.oElement) {
			divModal = document.querySelector('.urb-frm-modal');
			if (divModal) {
				this.oOptions.container = divModal;
			}

			if (this.oOptions.container) {
				this.oOptions.container.appendChild(this.divCalendar);
			} else if (this.oOptions.bBound) {
				document.body.appendChild(this.divCalendar);
			} else {
				this.oOptions.oElement.parentNode.insertBefore(this.divCalendar, this.oOptions.oElement.nextSibling);
			}

			this.addEvent(this.oOptions.oElement, 'change', fnIChange);

			if (!this.oOptions.defaultDate) {
				this.oOptions.defaultDate = new Date(Date.parse(this.oOptions.oElement.value));
				this.oOptions.setDefaultDate = true;
			}
		}

		var defDate = this.oOptions.defaultDate;

		if (this.isDate(defDate)) {
			if (this.oOptions.setDefaultDate) {
				this.setDate(defDate, true);
			} else {
				this.gotoDate(defDate);
			}
		} else {
			this.gotoDate(new Date());
		}

		if (this.oOptions.bBound) {
			this.hide();
			this.divCalendar.className += ' is-bound';
			this.addEvent(this.oOptions.trigger, 'click', fnIClick);
			this.addEvent(this.oOptions.trigger, 'focus', fnIFocus);
			this.addEvent(this.oOptions.trigger, 'blur' , fnIBlur );
		} else {
			this.show();
		}

	},

	/**
	 * Adds event handler to element
	 * 
	 * @method addEvent
	 * @param {Object}      el          Element.
	 * @param {Event}       e           Event.
	 * @param {Function}    fnCallback  Callback function.
	 * 
	 * @private
	 */
	addEvent: function(el, e, fnCallback, capture) {
		if (this.hasEventListeners) {
			el.addEventListener(e, fnCallback, !!capture);
		} else {
			el.attachEvent('on' + e, fnCallback);
		}
	},

	/**
	 * Removes event handler from element
	 * 
	 * @method removeEvent
	 * @param {Object}      el          Element.
	 * @param {Event}       e           Event.
	 * @param {Function}    fnCallback  Callback function.
	 * 
	 * @private
	 */
	removeEvent:function(el, e, fnCallback, capture) {
		if (this.hasEventListeners) {
			el.removeEventListener(e, fnCallback, !!capture);
		} else {
			el.detachEvent('on' + e, fnCallback);
		}
	},


	/**
	 * Removes trailing and ending spaces from string
	 * 
	 * @method trim
	 * @param {String}      str         String.
	 * 
	 * @private
	 */
	trim:function(str) {
		return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
	},

	/**
	 * Determines if the element has the specified class name
	 * 
	 * @method trim
	 * @param {String}      str         String.
	 * 
	 * @private
	 */
	hasClass: function(el, sClass) {
		var bHas;
		var sCName;

		sCName = (' ' + el.className + ' ');
		bHas = sCName.indexOf(' ' + sClass + ' ') !== -1;

		return bHas;
	},

	addClass:function(el, cn) {
		if (!this.hasClass(el, cn)) {
			el.className = (el.className === '') ? cn : el.className + ' ' + cn;
		}
	},

	removeClass:function(el, cn) {
		el.className = this.trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
	},

	isArray:function(obj) {
		return (/Array/).test(Object.prototype.toString.call(obj));
	},

	isDate:function(obj) {
		return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
	},

	isWeekend:function(date) {
		var day = date.getDay();
		return day === 0 || day === 6;
	},

	isLeapYear:function(year) {
		return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	},

	getDaysInMonth:function(year, month) {
		return [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	},

	truncateDate:function(date) {
		if (this.isDate(date)) {
			date.setHours(0,0,0,0);
		}
	},

	compareDates:function(a,b) {
		// weak date comparison (use truncateDate(date) to ensure correct result)
		return a.getTime() === b.getTime();
	},

	fireEvent:function(el, eventName, data) {
		var ev;

		if (document.createEvent) {
			ev = document.createEvent('HTMLEvents');
			ev.initEvent(eventName, true, false);
			ev = this.extendObject(ev, data);
			el.dispatchEvent(ev);
		} else if (document.createEventObject) {
			ev = document.createEventObject();
			ev = extend(ev, data);
			el.fireEvent('on' + eventName, ev);
		}
	},

	adjustCalendar:function(calendar) {
		if (calendar.month < 0) {
			calendar.year -= Math.ceil(Math.abs(calendar.month)/12);
			calendar.month += 12;
		}

		if (calendar.month > 11) {
			calendar.year += Math.floor(Math.abs(calendar.month)/12);
			calendar.month -= 12;
		}

		return calendar;
	},

	renderDayName:function(opts, day, abbr) {
		day += this.oOptions.firstDay;
		while (day >= 7) {
			day -= 7;
		}

		return abbr ? this.oOptions.i18n.weekdaysShort[day] : this.oOptions.i18n.weekdays[day];
	},

	renderDay:function(opts) {
		var arr = [];
		var ariaSelected = 'false';
		if (opts.isEmpty) {
			if (opts.showDaysInNextAndPreviousMonths) {
				arr.push('is-outside-current-month');

				if(!opts.enableSelectionDaysInNextAndPreviousMonths) {
					arr.push('is-selection-disabled');
				}
			} else {
				return '<td class="is-empty"></td>';
			}
		}

		if (opts.isDisabled) {
			arr.push('is-disabled');
		}

		if (opts.isToday) {
			arr.push('is-today');
		}

		if (opts.isSelected) {
			arr.push('is-selected');
			ariaSelected = 'true';
		}

		if (opts.hasEvent) {
			arr.push('has-event');
		}

		if (opts.isInRange) {
			arr.push('is-inrange');
		}

		if (opts.isStartRange) {
			arr.push('is-startrange');
		}

		if (opts.isEndRange) {
			arr.push('is-endrange');
		}

		return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' +
		'<button class="pika-button pika-day" type="button" ' +
		'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' +
		opts.day +
		'</button>' +
		'</td>';

	},

	renderWeek:function (d, m, y) {
		var onejan = new Date(y, 0, 1), weekNum = Math.ceil((((new Date(y, m, d) - onejan) / 86400000) + onejan.getDay()+1)/7);
		return '<td class="pika-week">' + weekNum + '</td>';
	},

	renderRow:function(days, isRTL, pickWholeWeek, isRowSelected) {
		return '<tr class="pika-row' + (pickWholeWeek ? ' pick-whole-week' : '') + (isRowSelected ? ' is-selected' : '') + '">' + (isRTL ? days.reverse() : days).join('') + '</tr>';
	},

	renderBody:function(rows) {
		return '<tbody>' + rows.join('') + '</tbody>';
	},

	renderHead:function(opts) {
		var i, arr = [];
		if (opts.showWeekNumber) {
			arr.push('<th></th>');
		}

		for (i = 0; i < 7; i++) {
			arr.push('<th scope="col"><abbr title="' + this.renderDayName(opts, i) + '">' + this.renderDayName(opts, i, true) + '</abbr></th>');
		}

		return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
	},

	renderTitle:function(instance, c, year, month, refYear, randId) {
		var i;
		var j;
		var arr;
		var opts = instance.oOptions;
		var isMinYear = year === this.oOptions.minYear;
		var isMaxYear = year === this.oOptions.maxYear;
		var html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">';
		var monthHtml;
		var yearHtml;
		var prev = true;
		var next = true;

		for (arr = [], i = 0; i < 12; i++) {
			arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' +
					(i === month ? ' selected="selected"': '') +
					((isMinYear && i < this.oOptions.minMonth) || (isMaxYear && i > this.oOptions.maxMonth) ? 'disabled="disabled"' : '') + '>' +
					this.oOptions.i18n.months[i] + '</option>');
		}

		monthHtml = '<div class="pika-label">' + this.oOptions.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

		if (this.isArray(this.oOptions.yearRange)) {
			i = this.oOptions.yearRange[0];
			j = this.oOptions.yearRange[1] + 1;
		} else {
			i = year - this.oOptions.yearRange;
			j = 1 + year + this.oOptions.yearRange;
		}

		for (arr = []; i < j && i <= this.oOptions.maxYear; i++) {
			if (i >= this.oOptions.minYear) {
				arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"': '') + '>' + (i) + '</option>');
			}
		}

		yearHtml = '<div class="pika-label">' + year + this.oOptions.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

		if (this.oOptions.showMonthAfterYear) {
			html += yearHtml + monthHtml;
		} else {
			html += monthHtml + yearHtml;
		}

		if (isMinYear && (month === 0 || this.oOptions.minMonth >= month)) {
			prev = false;
		}

		if (isMaxYear && (month === 11 || this.oOptions.maxMonth <= month)) {
			next = false;
		}

		if (c === 0) {
			html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + this.oOptions.i18n.previousMonth + '</button>';
		}

		if (c === (instance.oOptions.numberOfMonths - 1) ) {
			html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + this.oOptions.i18n.nextMonth + '</button>';
		}

		return html += '</div>';
	},

	renderTable:function(opts, data, randId) {
		var sHTML;

		sHTML = '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="';
		sHTML += randId + '">';
		sHTML += this.renderHead(opts);
		sHTML += this.renderBody(data) + '</table>';

		return sHTML;
	},

	extendObject:function(oDestination, oOrigin, bOverwrite) {
		var sProperty;
		var bContained;

		for (sProperty in oOrigin) {
			bContained = oDestination[sProperty] !== undefined;
			if (bContained && typeof oOrigin[sProperty] === 'object' && oOrigin[sProperty] !== null && oOrigin[sProperty].nodeName === undefined) {
				if (this.isDate(oOrigin[sProperty])) {
					if (bOverwrite) {
						oDestination[sProperty] = new Date(oOrigin[sProperty].getTime());
					}
				} else if (this.isArray(oOrigin[sProperty])) {
					if (bOverwrite) {
						oDestination[sProperty] = oOrigin[sProperty].slice(0);
					}
				} else {
					oDestination[sProperty] = extend({}, oOrigin[sProperty], bOverwrite);
				}
			} else if (bOverwrite || !bContained) {
				oDestination[sProperty] = oOrigin[sProperty];
			}
		}

		return oDestination;
	},

	configureCalendar:function(oOptions) {
		this.oOptions = this.extendObject({}, this.oDefault, true);
		this.oOptions = this.extendObject(this.oOptions, oOptions, true);

		this.oOptions.isRTL = !!this.oOptions.isRTL;
		this.oOptions.oElement = (this.oOptions.oElement && this.oOptions.oElement.nodeName) ? this.oOptions.oElement : null;
		this.oOptions.theme = (typeof this.oOptions.theme) === 'string' && this.oOptions.theme ? this.oOptions.theme : null;
		this.oOptions.bBound = !!(this.oOptions.bBound !== undefined ? this.oOptions.oElement && this.oOptions.bBound : this.oOptions.oElement);
		this.oOptions.trigger = (this.oOptions.trigger && this.oOptions.trigger.nodeName) ? this.oOptions.trigger : this.oOptions.oElement;
		this.oOptions.disableWeekends = !!this.oOptions.disableWeekends;
		this.oOptions.disableDayFn = (typeof this.oOptions.disableDayFn) === 'function' ? this.oOptions.disableDayFn : null;
		var nom = parseInt(this.oOptions.numberOfMonths, 10) || 1;

		this.oOptions.numberOfMonths = nom > 4 ? 4 : nom;
		if (!this.isDate(this.oOptions.minDate)) {
			this.oOptions.minDate = false;
		}

		if (!this.isDate(this.oOptions.maxDate)) {
			this.oOptions.maxDate = false;
		}

		if ((this.oOptions.minDate && this.oOptions.maxDate) && this.oOptions.maxDate < this.oOptions.minDate) {
			this.oOptions.maxDate = this.oOptions.minDate = false;
		}

		if (this.oOptions.minDate) {
			this.setMinDate(this.oOptions.minDate);
		}

		if (this.oOptions.maxDate) {
			this.setMaxDate(this.oOptions.maxDate);
		}

		if (this.isArray(this.oOptions.yearRange)) {
			var fallback = new Date().getFullYear() - 10;
			this.oOptions.yearRange[0] = parseInt(this.oOptions.yearRange[0], 10) || fallback;
			this.oOptions.yearRange[1] = parseInt(this.oOptions.yearRange[1], 10) || fallback;
		} else {
			this.oOptions.yearRange = Math.abs(parseInt(this.oOptions.yearRange, 10)) || this.oDefault.yearRange;
			if (this.oOptions.yearRange > 100) {
				this.oOptions.yearRange = 100;
			}
		}

		return this.oOptions;

	},

	blurControl: function() {
		this.hide();
		if (this.oOptions.blurFieldOnSelect && this.oOptions.oElement) {
			this.oOptions.oElement.blur();
		}
	},

	mouseDown:function(e) {
		var fnBlur;;

		if (!this.bVisible) {
			return;
		}

		e = e || window.event;
		var target = e.target || e.srcElement;
		if (!target) {
			return;
		}

		if (!this.hasClass(target, 'is-disabled')) {
			if (this.hasClass(target, 'pika-button') && !this.hasClass(target, 'is-empty') && !this.hasClass(target.parentNode, 'is-disabled')) {
				this.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
				if (this.oOptions.bBound) {
					fnBlur = this.blurControl.bind(this);
					setTimeout(fnBlur, 100);
				}
			} else if (this.hasClass(target, 'pika-prev')) {
				this.prevMonth();
			} else if (this.hasClass(target, 'pika-next')) {
				this.nextMonth();
			}
		}

		if (!this.hasClass(target, 'pika-select')) {
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
				return false;
			}
		} else {
			this.bClass = true;
		}

	},

	changeValue: function(e) {
		var oTarget;

		e = e || window.event;
		oTarget = e.target || e.srcElement;
		if (oTarget) {
			if (this.hasClass(oTarget, 'pika-select-month')) {
				this.gotoMonth(oTarget.value);
			} else if (this.hasClass(oTarget, 'pika-select-year')) {
				this.gotoYear(oTarget.value);
			}
		}

	},

	keyChange: function(e) {
		e = e || window.event;

		if (this.isVisible()) {

			switch(e.keyCode){
				case 13:
				case 27:
					if (this.oOptions.oElement) {
						this.oOptions.blur();
					}
				break;

				case 37:
					e.preventDefault();
					this.adjustDate('subtract', 1);
				break;

				case 38:
					this.adjustDate('subtract', 7);
				break;

				case 39:
					this.adjustDate('add', 1);
				break;

				case 40:
					this.adjustDate('add', 7);
				break;
			}
		}
	},

	inputChange: function(e) {
		var date;

		if (e.firedBy === this) {
			return;
		}

		if (this.oOptions.parse) {
			date = this.oOptions.parse(this.oOptions.oElement.value, this.oOptions.format);
		} else {
			date = new Date(Date.parse(this.oOptions.oElement.value));
		}

		if (this.isDate(date)) {
			this.setDate(date);
		}

		if (!this.bVisible) {
			this.show();
		}
	},

	inputFocus: function() {
		this.show();
	},

	inputClick: function() {
		this.show();
	},

	inputBlur: function() {
		var fnHide;

		// IE allows pika div to gain focus; catch blur the input field
		var pEl = document.activeElement;
		do {
			if (this.hasClass(pEl, 'pika-single')) {
				return;
			}
		} while ((pEl = pEl.parentNode));

		if (!this.bClass) {
			fnHide = this.hide.bind(this);
			setTimeout(fnHide, 50);
		}

		this.bClass = false;
	},

	mouseClick:function(e) {
		var fnVChange;
		var target;
		var pEl;

		e = e || window.event;
		target = e.target || e.srcElement;
		pEl = target;

		if (!target) {
			return;
		}

		if (!this.hasEventListeners && this.hasClass(target, 'pika-select')) {
			if (!target.onchange) {
				fnVChange = this.changeValue.bind(this);
				target.setAttribute('onchange', 'return;');
				addEvent(target, 'change', fnVChange);
			}
		}

		do {
			if (this.hasClass(pEl, 'pika-single') || pEl === this.oOptions.trigger) {
				return;
			}
		} while ((pEl = pEl.parentNode));

		if (this.bVisible && target !== this.oOptions.trigger && pEl !== this.oOptions.trigger) {
			this.hide();
		}
	},

	getDate: function() {
		return this.isDate(this.oDate) ? new Date(this.oDate.getTime()) : null;
	},

	setDate: function(date, preventOnSelect) {
		if (!date) {
			this.oDate = null;

			if (this.oOptions.oElement) {
				this.oOptions.oElement.value = '';
				this.fireEvent(this.oOptions.oElement, 'change', { firedBy: this });
			}

			return this.draw();
		}

		if (typeof date === 'string') {
			date = new Date(Date.parse(date));
		}

		if (!this.isDate(date)) {
			return;
		}

		var min = this.oOptions.minDate;
		var max = this.oOptions.maxDate;

		if (this.isDate(min) && date < min) {
			date = min;
		} else if (this.isDate(max) && date > max) {
			date = max;
		}

		this.oDate = new Date(date.getTime());
		this.truncateDate(this.oDate);
		this.gotoDate(this.oDate);

		if (this.oOptions.oElement) {
			this.oOptions.oElement.value = this.toString();
			this.fireEvent(this.oOptions.oElement, 'change', { firedBy: this });
		}

		if (!preventOnSelect && typeof this.oOptions.onSelect === 'function') {
			this.oOptions.onSelect.call(this, this.getDate());
		}
	},

	gotoDate: function(date) {
		var newCalendar = true;

		if (!this.isDate(date)) {
			return;
		}

		if (this.calendars) {
			var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1);
			var lastVisibleDate = new Date(this.calendars[this.calendars.length-1].year, this.calendars[this.calendars.length-1].month, 1);
			var visibleDate = date.getTime();

			// get the end of the month
			lastVisibleDate.setMonth(lastVisibleDate.getMonth()+1);
			lastVisibleDate.setDate(lastVisibleDate.getDate()-1);
			newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
		}

		if (newCalendar) {
			this.calendars = [{
				month: date.getMonth(),
				year: date.getFullYear()
			}];
			if (this.oOptions.mainCalendar === 'right') {
				this.calendars[0].month += 1 - this.oOptions.numberOfMonths;
			}
		}

		this.adjustCalendars();
	},

	adjustDate: function(sign, days) {
		var day;
		var difference;
		var newDay;

		day = this.getDate() || new Date();
		difference = parseInt(days)*24*60*60*1000;

		if (sign === 'add') {
			newDay = new Date(day.valueOf() + difference);
		} else if (sign === 'subtract') {
			newDay = new Date(day.valueOf() - difference);
		}

		this.setDate(newDay);
	},

	adjustCalendars: function() {
		this.calendars[0] = this.adjustCalendar(this.calendars[0]);
		for (var c = 1; c < this.oOptions.numberOfMonths; c++) {
			this.calendars[c] = adjustCalendar({
				month: this.calendars[0].month + c,
				year: this.calendars[0].year
			});
		}

		this.draw();
	},

	gotoToday: function() {
		this.gotoDate(new Date());
	},

	gotoMonth: function(month) {
		if (!isNaN(month)) {
			this.calendars[0].month = parseInt(month, 10);
			this.adjustCalendars();
		}
	},

	nextMonth: function() {
		this.calendars[0].month++;
		this.adjustCalendars();
	},

	prevMonth: function() {
		this.calendars[0].month--;
		this.adjustCalendars();
	},

	gotoYear: function(year) {
		if (!isNaN(year)) {
			this.calendars[0].year = parseInt(year, 10);
			this.adjustCalendars();
		}
	},


	setMinDate: function(value) {
		if(value instanceof Date) {
			this.truncateDate(value);
			this.oOptions.minDate  = value;
			this.oOptions.minYear  = value.getFullYear();
			this.oOptions.minMonth = value.getMonth();
		} else {
			this.oOptions.minDate    = this.oDefault.minDate;
			this.oOptions.minYear    = this.oDefault.minYear;
			this.oOptions.minMonth   = this.oDefault.minMonth;
			this.oOptions.startRange = this.oDefault.startRange;
		}

		this.draw();
	},

	setMaxDate: function(value) {
		if(value instanceof Date) {
			this.truncateDate(value);
			this.oOptions.maxDate  = value;
			this.oOptions.maxYear  = value.getFullYear();
			this.oOptions.maxMonth = value.getMonth();
		} else {
			this.oOptions.maxDate  = this.oDefault.maxDate;
			this.oOptions.maxYear  = this.oDefault.maxYear;
			this.oOptions.maxMonth = this.oDefault.maxMonth;
			this.oOptions.endRange = this.oDefault.endRange;
		}

		this.draw();
	},

	setStartRange: function(value) {
		this.oOptions.startRange = value;
	},

	setEndRange: function(value) {
		this.oOptions.endRange = value;
	},

	focusControl:function() {
		this.oOptions.trigger.focus();
	},

	draw: function(force) {
		var fnFocus;

		if (!this.bVisible && !force) {
			return;
		}

		var opts = this.oOptions;
		var minYear = this.oOptions.minYear;
		var maxYear = this.oOptions.maxYear;
		var minMonth = this.oOptions.minMonth;
		var maxMonth = this.oOptions.maxMonth;
		var html = '';
		var randId;

		if (this.iYear <= minYear) {
			this.iYear = minYear;
			if (!isNaN(minMonth) && this.iMonth < minMonth) {
				this.iMonth = minMonth;
			}
		}

		if (this.iYear >= maxYear) {
			this.iYear = maxYear;
			if (!isNaN(maxMonth) && this.iMonth > maxMonth) {
				this.iMonth = maxMonth;
			}
		}

		randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

		for (var c = 0; c < this.oOptions.numberOfMonths; c++) {
			html += '<div class="pika-lendar">';
			html += this.renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId);
			html += this.render(this.calendars[c].year, this.calendars[c].month, randId);
			html += '</div>';
		}

		this.divCalendar.innerHTML = html;

		if (this.oOptions.bBound) {
			if(this.oOptions.oElement.type !== 'hidden') {
				fnFocus = this.focusControl.bind(this);
				setTimeout(fnFocus, 1);
			}
		}

		if (typeof this.oOptions.onDraw === 'function') {
			this.oOptions.onDraw(this);
		}

		if (this.oOptions.bBound) {
			// let the screen reader user know to use arrow keys
			this.oOptions.oElement.setAttribute('aria-label', this.oOptions.ariaLabel);
		}
	},

	adjustPosition: function() {
		var oElement;
		var pEl;
		var width;
		var height;
		var viewportWidth;
		var viewportHeight;
		var scrollTop;
		var left;
		var top;
		var clientRect;
		var leftAligned;
		var bottomAligned;

		if (this.oOptions.container) {
			//return;
		}

		this.divCalendar.style.position = 'absolute';

		oElement = this.oOptions.trigger;
		pEl = oElement;
		width = this.divCalendar.offsetWidth;
		height = this.divCalendar.offsetHeight;
		viewportWidth = window.innerWidth || document.documentElement.clientWidth;
		viewportHeight = window.innerHeight || document.documentElement.clientHeight;
		scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
		leftAligned = true;
		bottomAligned = true;

		if (typeof oElement.getBoundingClientRect === 'function') {
			clientRect = oElement.getBoundingClientRect();
			left = clientRect.left + window.pageXOffset;
			top = clientRect.bottom + window.pageYOffset;
		} else {
			left = pEl.offsetLeft;
			top  = pEl.offsetTop + pEl.offsetHeight;
			while((pEl = pEl.offsetParent)) {
				left += pEl.offsetLeft;
				top  += pEl.offsetTop;
			}
		}

		// default position is bottom & left
		if ((this.oOptions.reposition && left + width > viewportWidth) ||
				(
						this.oOptions.position.indexOf('right') > -1 &&
						left - width + oElement.offsetWidth > 0
				)
		) {
			left = left - width + oElement.offsetWidth;
			leftAligned = false;
		}

		if ((this.oOptions.reposition && top + height > viewportHeight + scrollTop) ||
			(this.oOptions.position.indexOf('top') > -1 && top - height - oElement.offsetHeight > 0)) {
			top = top - height - oElement.offsetHeight;
			bottomAligned = false;
		}

		this.divCalendar.style.left = left + 'px';
		this.divCalendar.style.top = top + 'px';

		this.addClass(this.divCalendar   , leftAligned    ? 'left-aligned'   : 'right-aligned');
		this.addClass(this.divCalendar   , bottomAligned  ? 'bottom-aligned' : 'top-aligned');
		this.removeClass(this.divCalendar, !leftAligned   ? 'left-aligned'   : 'right-aligned');
		this.removeClass(this.divCalendar, !bottomAligned ? 'bottom-aligned' : 'top-aligned');
	},

	render: function(year, month, randId) {
		var opts   = this.oOptions;
		var now    = new Date();
		var days   = this.getDaysInMonth(year, month);
		var before = new Date(year, month, 1).getDay();
		var data   = [];
		var row    = [];

		this.truncateDate(now);
		if (this.oOptions.firstDay > 0) {
			before -= this.oOptions.firstDay;
			if (before < 0) {
				before += 7;
			}
		}

		var previousMonth = month === 0 ? 11 : month - 1;
		var nextMonth = month === 11 ? 0 : month + 1;
		var yearOfPreviousMonth = month === 0 ? year - 1 : year;
		var yearOfNextMonth = month === 11 ? year + 1 : year;
		var daysInPreviousMonth = this.getDaysInMonth(yearOfPreviousMonth, previousMonth);
		var cells = days + before;
		var after = cells;

		while(after > 7) {
			after -= 7;
		}

		cells += 7 - after;
		var isWeekSelected = false;
		for (var i = 0, r = 0; i < cells; i++) {
			var day = new Date(year, month, 1 + (i - before));
			var isSelected = this.isDate(this.oDate) ? this.compareDates(day, this.oDate) : false;
			var isToday = this.compareDates(day, now);
			var hasEvent = this.oOptions.events.indexOf(day.toDateString()) !== -1 ? true : false;
			var isEmpty = i < before || i >= (days + before);
			var dayNumber = 1 + (i - before);
			var monthNumber = month;
			var yearNumber = year;
			var isStartRange = this.oOptions.startRange && this.compareDates(this.oOptions.startRange, day);
			var isEndRange = this.oOptions.endRange && this.compareDates(this.oOptions.endRange, day);
			var isInRange = this.oOptions.startRange && this.oOptions.endRange && this.oOptions.startRange < day && day < this.oOptions.endRange;
			var isDisabled = 	(this.oOptions.minDate && day < this.oOptions.minDate) ||
								(this.oOptions.maxDate && day > this.oOptions.maxDate) ||
								(this.oOptions.disableWeekends && isWeekend(day)) ||
								(this.oOptions.disableDayFn && this.oOptions.disableDayFn(day));

			if (isEmpty) {
				if (i < before) {
					dayNumber = daysInPreviousMonth + dayNumber;
					monthNumber = previousMonth;
					yearNumber = yearOfPreviousMonth;
				} else {
					dayNumber = dayNumber - days;
					monthNumber = nextMonth;
					yearNumber = yearOfNextMonth;
				}
			}

			var dayConfig = {
				day: dayNumber,
				month: monthNumber,
				year: yearNumber,
				hasEvent: hasEvent,
				isSelected: isSelected,
				isToday: isToday,
				isDisabled: isDisabled,
				isEmpty: isEmpty,
				isStartRange: isStartRange,
				isEndRange: isEndRange,
				isInRange: isInRange,
				showDaysInNextAndPreviousMonths: this.oOptions.showDaysInNextAndPreviousMonths,
				enableSelectionDaysInNextAndPreviousMonths: this.oOptions.enableSelectionDaysInNextAndPreviousMonths
			};

			if (this.oOptions.pickWholeWeek && isSelected) {
				isWeekSelected = true;
			}

			row.push(this.renderDay(dayConfig));

			if (++r === 7) {
				if (this.oOptions.showWeekNumber) {
					row.unshift(renderWeek(i - before, month, year));
				}

				data.push(this.renderRow(row, this.oOptions.isRTL, this.oOptions.pickWholeWeek, isWeekSelected));
				row = [];
				r = 0;
				isWeekSelected = false;
			}
		}

		return this.renderTable(opts, data, randId);
	},

	isVisible: function() {
		return this.bVisible;
	},

	show: function() {
		var fnMClick;

		if (!this.isVisible()) {
			this.bVisible = true;
			this.draw();
			this.removeClass(this.divCalendar, 'is-hidden');
			if (this.oOptions.bBound) {
				fnClick = this.mouseClick.bind(this);
				this.addEvent(document, 'click', fnMClick);
				this.adjustPosition();
			}

			if (typeof this.oOptions.onOpen === 'function') {
				this.oOptions.onOpen.call(this);
			}
		}
	},

	hide: function() {
		var fnMClick;

		var v = this.bVisible;
		if (v !== false) {
			if (this.oOptions.bBound) {
				fnMClick = this.mouseClick.bind(this);
				this.removeEvent(document, 'click', fnMClick);
			}

			this.divCalendar.style.position = 'static'; // reset
			this.divCalendar.style.left = 'auto';
			this.divCalendar.style.top = 'auto';
			this.addClass(this.divCalendar, 'is-hidden');
			this.bVisible = false;
			if (v !== undefined && typeof this.oOptions.onClose === 'function') {
				this.oOptions.onClose.call(this);
			}
		}
	},

	toString: function(format) {
		var sDate;

		format = format || this.oOptions.format;
		if (!this.isDate(this.oDate)) {
			sDate = '';
		} else {
			if (this.oOptions.toString) {
				sDate = this.oOptions.toString(this.oDate, format);
			} else {
				sDate = this.oDate.toDateString();
			}
		}

		return sDate;
	},

	formatDate:function(oDate, sFormat) {
		var sDate;
		var iDay;
		var iMonth;
		var iYear;
		var sDay;
		var sMonth;
		var sYear;

		iDay   = oDate.getDate();
		iMonth = oDate.getMonth() + 1;
		iYear  = oDate.getFullYear();

		sDay   = '00' + iDay;
		sMonth = '00' + iMonth;
		sYear  = '0000' + iYear;

		sDay   = sDay.substr(sDay.length - 2, 2);
		sMonth = sMonth.substr(sMonth.length - 2, 2);
		sYear = sYear.substr(sYear.length - 4, 4);

		sDate = sDay + '/' + sMonth + '/' + sYear;

		return sDate;
	},

	parseDate:function(sDate, sFormat) {
		var oDate;
		var iDay;
		var iMonth;
		var iYear;
		var sDay;
		var sMonth;
		var sYear;

		sDay   = sDate.substr(0,2);
		sMonth = sDate.substr(3,2);
		sYear  = sDate.substr(6,4);

		iDay   = parseInt(sDay);
		iMonth = parseInt(sMonth) - 1;
		iYear  = parseInt(sYear);

		oDate = new Date(iYear, iMonth, iDay, 0, 0, 0, 0);

		return oDate;
	},

	destroy: function() {
		var opts = this.oOptions;

		this.hide();
		removeEvent(this.divCalendar, 'mousedown', this.mouseDown, true);
		removeEvent(this.divCalendar, 'touchend' , this.mouseDown, true);
		removeEvent(this.divCalendar, 'change'   , this.changeValue);
		if (this.oOptions.keyboardInput) {
			this.removeEvent(document, 'keydown', this.keyChange);
		}

		if (this.oOptions.oElement) {
			removeEvent(this.oOptions.oElement, 'change', this.inputChange);
			if (this.oOptions.bBound) {
				this.removeEvent(this.oOptions.trigger, 'click', this.inputClick);
				this.removeEvent(this.oOptions.trigger, 'focus', this.inputFocus);
				this.removeEvent(this.oOptions.trigger, 'blur' , this.inputBlur);
			}
		}

		if (this.divCalendar.parentNode) {
			this.divCalendar.parentNode.removeChild(this.divCalendar);
		}
	}

});
