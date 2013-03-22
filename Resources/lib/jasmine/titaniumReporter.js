(function() {
    
    if (!jasmine) {
        throw new Exception("jasmine library does not exist in global namespace!");
    }
    
    /**
	* TitaniumReporter, by Guilherme Chapiewski - http://guilhermechapiewski.com
	*
	* TitaniumReporter is a Jasmine reporter that outputs spec results to a new 
	* window inside your iOS application. It helps you develop Titanium Mobile 
	* applications with proper unit testing.
	* 
	* More info at http://github.com/guilhermechapiewski/titanium-jasmine
	*
	* Usage:
	*
	* jasmine.getEnv().addReporter(new jasmine.TitaniumReporter());
	* jasmine.getEnv().execute();
	*/
	var TitaniumReporter = function() {
		// create Titanium Window and WebView to display results
		var titaniumTestWindow = Titanium.UI.createWindow({
			title:'Application Tests',
			navBarHidden: false,
			zIndex: 999
		});
		
		var titaniumTestsResultsWebView = Ti.UI.createWebView({
			html: ''
		});
		titaniumTestWindow.add(titaniumTestsResultsWebView);
		titaniumTestWindow.open();
		
		var testResults = '';
		var testResultsHeader = '<html><head><style type="text/css">body{font-size:10px;font-family:sans-serif;background-color:#BBB}</style></head><body>';
		var testResultsFooter = '</body></html>';
		
		this.updateTestResults = function(message) {
			testResults += message;
			titaniumTestsResultsWebView.html = testResultsHeader + testResults + testResultsFooter;
		};
    };

    TitaniumReporter.prototype = {
        reportRunnerResults: function(runner) {
            this.log('<h3>Test Runner Finished.</h3>');
        },

        reportRunnerStarting: function(runner) {
            this.log('<h3>Test Runner Started</h3>');
        },

        reportSpecResults: function(spec) {
        	var results = spec.results()
        	
			var color = '#009900';
			var pass = results.passedCount + ' pass';
			var fail = null;
            if (!results.passed()) {
                color = '#FF0000';
				fail = results.failedCount + ' fail';
            }

			var msg = ' (' + pass;
			if (fail) {
				msg += ', ' + fail
			}
			msg += ' of '+results.totalCount+')';
			
            //this.log('[' + spec.suite.description + '] <font color="' + color + '">' + spec.description + '</font><br>');
			this.log('&gt;&gt; <font color="' + color + '">' + spec.description + '</font>' + msg + '<br>');
			
			if (!results.passed()) {
				for (var i=0; i<results.items_.length; i++) {
					item = results.items_[i] 
					if (!item.passed_) {
						this.log('&nbsp;&nbsp;&nbsp;&nbsp;(' + (i+1) + ') <i>' + item.message + '</i><br>');
						if (item.expected)
							this.log('&nbsp;&nbsp;&nbsp;&nbsp;&gt;&gt; Expected: "' + item.expected + '"<br>');
						if (item.expected)
							this.log('&nbsp;&nbsp;&nbsp;&nbsp;&gt;&gt; Result: "' + item.actual + '"<br>');
						this.log('<br>');
					}
					else {
						this.log('&nbsp;&nbsp;&nbsp;&nbsp;(' + (i+1) + ') <i>' + item.message + '</i><br>');
					}
				}
			}
			Ti.API.error(JSON.stringify(results));
        },

        reportSpecStarting: function(spec) {
            this.log(spec.suite.description+'... <br/>');
        },

        reportSuiteResults: function(suite) {
            var results = suite.results();

            this.log('<b>[' + suite.description + '] ' + results.passedCount + ' of ' + results.totalCount + ' assertions passed.</b><br><br>');
        },

        log: function(str) {
        	Ti.API.warn(str)
            this.updateTestResults(str);
        }
    };
    
    // export public
    jasmine.TitaniumReporter = TitaniumReporter;
})();