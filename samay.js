'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function parseDate(strDate) {

	var REGEXP_TO_EXTRACT_DATE = /(\d{4})(\d{2})(\d{2})/g,
	    splitDate = REGEXP_TO_EXTRACT_DATE.exec(strDate);

	if (splitDate) {
		var date = [splitDate[1], splitDate[2], splitDate[3]].join('-'),
		    structuredDate = date + 'T00:00:00+05:30'; // iOS needs format 2020-12-30T23:30:10+05:30 , default parses into GMT time, so need +05:30 for IST conversion
		return structuredDate;
	} else {
		return strDate;
	}
}

// Function for format 20170317
function parseDateTime(strDate) {

	var REGEXP_TO_EXTRACT_DATE = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/g,
	    splitDate = REGEXP_TO_EXTRACT_DATE.exec(strDate);

	if (splitDate) {
		var date = [splitDate[1], splitDate[2], splitDate[3]].join('-'),
		    time = [splitDate[4], splitDate[5]].join(':'),
		    structuredDate = date + 'T' + time + '+05:30'; // iOS needs format 2020-12-30T23:30:10+05:30 , default parses into GMT time, so need +05:30 for IST conversion
		return structuredDate;
	} else {
		return strDate;
	}
}

// Function for format 17-03-2017 22:10:30
function parseDateTime2(strDate) {
	var REGEXP_TO_EXTRACT_DATE = /(\d{2})-(\d{2})-(\d{4})\s(\d{2}):(\d{2}):(\d{2})/g,
	    splitDate = REGEXP_TO_EXTRACT_DATE.exec(strDate);

	if (splitDate) {
		var date = [splitDate[3], splitDate[2], splitDate[1]].join('-'),
		    time = [splitDate[4], splitDate[5], splitDate[6]].join(':'),
		    structuredDate = date + 'T' + time + '+05:30'; // iOS needs format 2020-12-30T23:30:10+05:30 , default parses into GMT time, so need +05:30 for IST conversion
		return structuredDate;
	} else {
		return strDate;
	}
}

function parseDateTime3(strDate) {
	var REGEXP_TO_EXTRACT_DATE = /(\w{3}),\s(\d{2})\s(\w{3}),\s(\d{4})/g,
	    splitDate = REGEXP_TO_EXTRACT_DATE.exec(strDate);

	if (splitDate) {
		var month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(splitDate[3].toLowerCase()),
		    date = [splitDate[4], _prepandZero(month + 1), splitDate[2]].join('-'),
		    structuredDate = date + 'T00:00:00+05:30'; // iOS needs format 2020-12-30T23:30:10+05:30 , default parses into GMT time, so need +05:30 for IST conversion
		return structuredDate;
	} else {
		return strDate;
	}
}

function parseDateTime4(strDate) {
	var REGEXP_TO_EXTRACT_DATE = /(\d{2})\/(\d{2})\/(\d{4})/g,
	    splitDate = REGEXP_TO_EXTRACT_DATE.exec(strDate);
	if (splitDate) {
		var date = [splitDate[3], splitDate[2], splitDate[1]].join('-'),
		    structuredDate = date + 'T00:00:00+05:30'; // iOS needs format 2020-12-30T23:30:10+05:30 , default parses into GMT time, so need +05:30 for IST conversion
		return structuredDate;
	} else {
		return strDate;
	}
}

// Parse format MMM DD, YYYY
function parseDateTime5(strDate) {
	var REGEXP_TO_EXTRACT_DATE = /(\w{3})\s(\w{2}),\s(\d{4})/g,
	    splitDate = REGEXP_TO_EXTRACT_DATE.exec(strDate);
	if (splitDate) {
		var month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(splitDate[1].toLowerCase()),
		    date = [splitDate[3], _prepandZero(month + 1), splitDate[2]].join('-'),
		    structuredDate = date + 'T00:00:00+05:30'; // iOS needs format 2020-12-30T23:30:10+05:30 , default parses into GMT time, so need +05:30 for IST conversion
		return structuredDate;
	} else {
		return strDate;
	}
}

/**
* isPastDate compares given dates
* @param date1 date to be compared
* @param date2 reference date from which whether date1 is of past is determined
* @return Boolean true/false based on the date calculation
*/
function isPastDate(date1, date2) {
	var structuredDate1 = parseDate(date1),
	    structuredDate2 = date2 ? parseDate(date2) : new Date(currentDateTime);
	return new Date(structuredDate2).getTime() > new Date(structuredDate1).getTime();
}

function addDays(sourceDate, days) {
	var miliseconds = 24 * 60 * 60 * 1000 * (days || 0),
	    epochTime = new Date(sourceDate);
	return new Date(+epochTime + miliseconds);
}

function getDayName(dateObj) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var inputDate = new Date(dateObj),
	    dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][inputDate.getDay()] || '';
	return options.short ? dayName.substr(0, 3) : dayName;
}

function _subtract(value, type) {
	var map = {
		'days': _subtractDays.bind(this),
		'hour': _subtractHours.bind(this),
		'seconds': _addSeconds.bind(this)
	};

	return _samay.call(this, map[type](value));
}

function _subtractDays(days) {
	var miliseconds = 24 * 60 * 60 * 1000 * (days || 0),
	    epochTime = +this.inputDate;
	return new Date(+epochTime - miliseconds);
}

function _subtractHours(hours) {
	var miliseconds = 60 * 60 * 1000 * (hours || 0),
	    epochTime = +this.inputDate;
	return new Date(+epochTime - miliseconds);
}

function _add(value, type) {
	var map = {
		'days': _addDays.bind(this),
		'hour': _addHours.bind(this),
		'seconds': _addSeconds.bind(this)
	};

	return _samay.call(this, map[type](value));
}

function _addHours(hours) {
	var miliseconds = 60 * 60 * 1000 * (hours || 0),
	    epochTime = +this.inputDate;
	return new Date(+epochTime + miliseconds);
}

function _addDays(days) {
	var miliseconds = 24 * 60 * 60 * 1000 * (days || 0),
	    epochTime = +this.inputDate;
	return new Date(+epochTime + miliseconds);
}

function _addSeconds(seconds) {
	var miliseconds = 1000 * seconds,
	    epochTime = +this.inputDate;

	return new Date(+epochTime + miliseconds);
}

function _getDayName(day) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day] || '';
	return options.length ? dayName.substr(0, options.length) : dayName;
}

function _getMonthName(month) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month] || '';
	return options.length ? monthName.substr(0, options.length) : monthName;
}

function _formatMonth(month) {
	var updatedMonth = month + 1;
	return _prepandZero(updatedMonth);
}

function _formatDate(date) {
	return _prepandZero(date);
}

function _prepandZero(value) {
	return value < 10 ? '0' + value : value;
}

function _ordinalSuffix(i) {
	var j = i % 10,
	    k = i % 100;
	if (j === 1 && k !== 11) {
		return i + 'st';
	}
	if (j === 2 && k !== 12) {
		return i + 'nd';
	}
	if (j === 3 && k !== 13) {
		return i + 'rd';
	}
	return i + 'th';
}

function _format(format) {
	var inputDate = this.inputDate,
	    date = inputDate.getDate(),
	    month = inputDate.getMonth(),
	    day = inputDate.getDay(),
	    // Sunday is 0, Monday is 1 and so on .....
	fullYear = inputDate.getFullYear(),
	    year = fullYear % 100,
	    hour24 = inputDate.getHours(),
	    hour12 = hour24 > 12 ? hour24 % 12 : hour24,
	    minutes = inputDate.getMinutes(),
	    seconds = inputDate.getSeconds(),
	    isPM = hour24 >= 12;

	return (format || '').replace('mm', _prepandZero(minutes)) // Lower case depicts minutes
	.replace('ss', _prepandZero(seconds)).replace('hh', _prepandZero(hour12)) // 'hh' depicts 12 hour format
	.replace('HH', _prepandZero(hour24)) // 'HH' stands for the 24 hours format
	.replace('h', hour12).replace('H', hour24).replace('A', isPM ? 'PM' : 'AM').replace('ddd', _getDayName(day, { length: 3 })).replace('DD', _formatDate(date)).replace('MMMM', _getMonthName(month)).replace('MMM', _getMonthName(month, { length: 3 })).replace('MM', _formatMonth(month)).replace('yyyy', fullYear).replace('YYYY', fullYear).replace('yy', _prepandZero(year)).replace('YY', _prepandZero(year)).replace('Do', _ordinalSuffix(date)); // If st/nd/rd/th ordinal suffix is requested
}

function _isAfter(refDate) {
	var date = this.inputDate;

	var refNativeDate = void 0;

	if (refDate instanceof Date) {
		refNativeDate = refDate;
	}

	if (refDate && refDate.samayInstance) {
		refNativeDate = refDate.originalDate;
	}
	return +date > +refNativeDate;
}

function _getDaysInMonth() {
	var date = this.inputDate,
	    lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	return lastDate.getDate();
}

function _day(dayNumber) {
	var day = dayNumber - this.inputDate.getDay();
	return _add.call(this, day, 'days');
}

function _samay(inputDate, scanFormat) {
	var _fnCallMap;

	var formats = _samay.FORMATS,
	    fnCallMap = (_fnCallMap = {}, _defineProperty(_fnCallMap, formats.DD_MM_YYYY_HH_mm_ss, parseDateTime2), _defineProperty(_fnCallMap, formats.YYYYMMDDHHmm, parseDateTime), _defineProperty(_fnCallMap, formats.YYYYMMDD, parseDate), _defineProperty(_fnCallMap, formats.ddd_DD_MMM_YYYY, parseDateTime3), _defineProperty(_fnCallMap, formats.DD_MM_YYYY, parseDateTime4), _defineProperty(_fnCallMap, formats.MMM_DD_YYYY, parseDateTime5), _fnCallMap);

	if (inputDate instanceof Date) {
		this.inputDate = inputDate;
	} else if (inputDate && fnCallMap[scanFormat]) {
		this.inputDate = new Date(fnCallMap[scanFormat](inputDate));
	} else if (inputDate && !fnCallMap[scanFormat]) {
		this.inputDate = new Date(inputDate);
	} else if (!inputDate) {
		this.inputDate = new Date();
	}

	if (this.inputDate === _samay.INVALID) {
		throw new SamayError('INVALID DATE - Exception Occurred in constructor');
	}

	return {
		samayInstance: true,
		originalDate: this.inputDate,
		format: _format.bind(this),
		add: _add.bind(this),
		subtract: _subtract.bind(this),
		isAfter: _isAfter.bind(this),
		getDaysInMonth: _getDaysInMonth.bind(this),
		day: _day.bind(this)
	};
}

_samay.INVALID = 'Invalid Date';
_samay.FORMATS = {
	'DD_MM_YYYY_HH_mm_ss': 'DD-MM-YYYY HH:mm:ss',
	'YYYYMMDDHHmm': 'YYYYMMDDHHmm',
	'YYYYMMDD': 'YYYYMMDD',
	'ddd_DD_MMM_YYYY': 'ddd, DD MMM, YYYY',
	'DD_MM_YYYY': 'DD/MM/YYYY',
	'MMM_DD_YYYY': 'MMM DD, YYYY'
};

function SamayError(message) {
	this.message = message;
	this.name = 'Samay Exception';
}

module.exports = {
	samay: function samay() {
		// Provide fresh context everytime. Context isolation of all instances
		return _samay.apply({}, arguments);
	},
	parseDate: parseDate,
	parseDateTime: parseDateTime,
	parseDateTime2: parseDateTime2,
	isPastDate: isPastDate,
	addDays: addDays,
	getDayName: getDayName
};