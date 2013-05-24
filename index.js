var jade = require('jade'),
	fs = require('fs'),
	deap = require('deap/shallow'),
	WHITELIST = {},
	BLACKLIST = [ '.js', '.json', '.node' ],
	DEFAULTS = {
		compileDebug: false,
		encoding: 'utf8',
		extension: '.jade'
	};

var jadequire = module.exports = function(options) {
	options = deap({}, DEFAULTS, options || {});

	if(require.extensions[options.extension]) throw new Error(options.extension + ' extension already has a handler');

	var handler = require.extensions[options.extension] = function(module, filename) {
		options.filename = filename;

		module.exports = jade.compile(
			fs.readFileSync(filename, options.encoding),
			options
		);
	};
	WHITELIST[options.extension] = true;

	handler.remove = function() {
		jadequire.remove(options.extension);
	};

	return handler;
};

jadequire.remove = function(extension) {
	extension = extension||DEFAULTS.extension;
	if(!!~BLACKLIST.indexOf(extension)) throw new Error('cannot remove native extensions');
	if(!WHITELIST[extension]) throw new Error("cannot remove extension that wasn't registered");

	delete require.extensions[extension];
	delete WHITELIST[extension];
};
