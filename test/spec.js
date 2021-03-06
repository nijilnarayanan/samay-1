describe('samay.js test suite', function(){

	var samay = require('../samay').samay;

	it('constructor with no arguments', function() {
		expect(+samay().originalDate === +(new Date)).toBe(true)
	});

	it('constructor with current date object timing', function() {
		expect(+samay(new Date).originalDate === +(new Date)).toBe(true)
	});

	it('format test YYYYMMDD against format MM/DD/YYYY HH:mm', function() {
		expect(samay('20180330', 'YYYYMMDD').format('MM/DD/YYYY HH:mm')).toBe('03/30/2018 00:00')
	});

	it('format test YYYYMMDD against format MM/DD/YYYY HH:mm', function() {
		expect(samay('20180330', 'YYYYMMDD').format('MM/DD/YYYY HH:mm')).toBe('03/30/2018 00:00')
	});

	it('format test YYYYMMDD against format MM/DD/YYYY HH:mm', function() {
		expect(samay('20180330', 'YYYYMMDD').subtract(2,'hour').format('MM/DD/YYYY HH:mm')).toBe('03/29/2018 22:00')
	});

	it('format test YYYYMMDD against format MM/DD/YYYY HH:mm', function() {
		expect(samay('20180101', 'YYYYMMDD').subtract(2,'hour').format('MM/DD/YYYY HH:mm')).toBe('12/31/2017 22:00')
	});

	it('format test YYYYMMDD against format MM/DD/YYYY HH:mm', function() {
		expect(samay('20170301', 'YYYYMMDD').subtract(2,'hour').format('MM/DD/YYYY HH:mm')).toBe('02/28/2017 22:00')
	});

	it('format test YYYYMMDD against format MM/DD/YYYY HH:mm', function() {
		expect(samay('20170301', 'YYYYMMDD').subtract(2,'days').format('MM/DD/YYYY HH:mm')).toBe('02/27/2017 00:00')
	});

	it('format test YYYYMMDD against format MM/DD/YYYY HH:mm', function() {
		expect(samay('201712311545', 'YYYYMMDDHHmm').add(2,'days').subtract(2,'hour').format('MM/DD/YYYY HH:mm')).toBe('01/02/2018 13:45')
	});

	it('1st jan 2017', function() {
		expect(samay('201701011345', 'YYYYMMDDHHmm').format('MM/DD/YYYY HH:mm ddd')).toBe('01/01/2017 13:45 Sun')
	});

	it('1st feb 2017', function() {
		expect(samay('201702011345', 'YYYYMMDDHHmm').format('MM/DD/YYYY HH:mm ddd')).toBe('02/01/2017 13:45 Wed')
	});

	it('Add seconds', function() {
		expect(samay('201702011345', 'YYYYMMDDHHmm').add(600, 'seconds').format('HHmm')).toBe('1355')
	});

	it('format test YYYYMMDD against format YYYY-MM-DD HH:mm:ss', function() {
		expect(samay('2017-07-31 15:31:08', 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY HH:mm')).toBe('07/31/2017 15:31')
	});

});
