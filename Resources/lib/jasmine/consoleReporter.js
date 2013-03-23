(function() {
    
    if (!jasmine) {
        throw new Exception("jasmine library does not exist in global namespace!")
    }
    
    /**
	* ConsoleReporter, by Igor Santos - http://www.igorsantos.com.br
	* Based on TitaniumReporter by Guilherme Chapiewski - http://guilhermechapiewski.com
	*
	* ConsoleReporter is a Jasmine reporter that outputs spec results to the
	* Titanium console. It helps you develop Titanium Mobile applications with
	* proper unit testing.
	* 
	* More info at http://github.com/guilhermechapiewski/titanium-jasmine
	*
	* Usage:
	*
	* jasmine.getEnv().addReporter(new jasmine.ConsoleReporter());
	* jasmine.getEnv().execute();
	* 
	* @param verbose {Boolean} If the output should be loudy or more quiet. Defaults to quiet.
	* @param level {String} The level that should be used as output. By default uses custom TEST level,
	* 	that goes inside the INFO level. This is useful to help filtering output in the TI IDE console.
	* 
	*/
	var ConsoleReporter = function(verbose, level) {
		this.verbose = verbose || false
		this.level = level || 'TEST'
		this.lastSuite = ''
    }

    ConsoleReporter.prototype = {
        reportRunnerStarting: function(runner) {
            this.log('~~~~~~~~~~~~~~~~~~~~~~ Test Runner Started ~~~~~~~~~~~~~~~~~~~~~~');
        },
        
        reportRunnerResults: function(runner) {
            this.log('~~~~~~~~~~~~~~~~~~~~~~ Test Runner Finished ~~~~~~~~~~~~~~~~~~~~~~');
        },

        reportSpecResults: function(spec) {
        	var results = spec.results()
        	
			var numbers = ' (' + results.passedCount + ' pass';
			if (!results.passed())
				numbers += ', ' + results.failedCount + ' fail';
			numbers += ' of '+results.totalCount+')';
			
			this.log('>> ' + spec.description + '' + numbers);
			
			if (!results.passed()) {
				for (var i=0; i<results.items_.length; i++) {
					item = results.items_[i] 
					if (!item.passed_) {
						this.log('    (' + (i+1) + ') ' + item.message);
//						if (item.expected)
//							this.log('    >> Expected: "' + item.expected);
//						if (item.expected)
//							this.log('    >> Result: "' + item.actual);
					}
					else {
						if (this.verbose)
							this.log('    (' + (i+1) + ') ' + item.message);
					}
				}
			}
			//Ti.API.error(JSON.stringify(results));
        },

        reportSpecStarting: function(spec) {
        	suite = spec.suite.description
        	if (this.lastSuite != suite) {
            	this.log('~~~~~~~~~~~ '+suite+'...');
            	this.lastSuite = suite;
            }
        },

        reportSuiteResults: function(suite) {
            var results = suite.results()

            this.log('~~~~~~~~~~~ '+suite.description+' have passed ' + results.passedCount + ' of ' + results.totalCount + ' assertions.');
        },

        log: function(str) {
        	Ti.API.log(this.level, str)
        }
    };
    
    // export public
    jasmine.ConsoleReporter = ConsoleReporter;
})();