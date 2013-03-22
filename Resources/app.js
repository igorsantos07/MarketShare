// currently there's no way to change the --deploy-type option through the IDE, so it should be done manually
//var deployType = Ti.App.deployType 
deployType = 'test'

if (deployType == 'test')
	require('start_tests')()
else
	require('start')()