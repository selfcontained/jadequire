var assert = require('chai').assert,
	jadequire = require('../index');

describe('jadequire', function() {

	var existingHandler = require.extensions['.jade'];

	it('should be a function', function() {
		assert.isFunction(jadequire);
	});

	it('should add a .jade handler by default', function() {
		var j = jadequire();

		assert.equal(require.extensions['.jade'], j);
		assert.notEqual(existingHandler, require.extensions['.jade']);

		j.remove();
		assert.isUndefined(require.extensions['.jade']);
	});

	it('should be removeable via main export', function() {
		jadequire();
		assert.isFunction(require.extensions['.jade']);
		jadequire.remove();
		assert.isUndefined(require.extensions['.jade']);
	});

	it('should allow extension to be specified', function() {
		var j = jadequire({
			extension: '.jd'
		});

		assert.equal(require.extensions['.jd'], j);

		j.remove();
		assert.isUndefined(require.extensions['.jd']);
	});

	it('should render a jade file with default .jade extension', function() {
		jadequire();

		var template = require('./test.jade');

		assert.equal(template({name:'grr'}), '<h1>grr</h1>');

		jadequire.remove();
	});

	it('should render a jade file with configurable .jade extension', function() {
		var j = jadequire({ extension: '.jade' }),
			template = require('./test.jade');

		assert.equal(template({name:'grr'}), '<h1>grr</h1>');

		j.remove();
	});

	it('should render a jade file with configurable extension', function() {
		var j = jadequire({ extension: '.jd' }),
			template = require('./test.jd');

		assert.equal(template({name:'grr'}), '<h1>grr</h1>');

		j.remove();
	});

});
