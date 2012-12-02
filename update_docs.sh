#!/bin/bash

jsduck Resources/ \
	--output="docs" \
	--title="MarketShare - docs" \
	--ignore-global \
	--external="const,Ti.UI.Window,Ti.UI.Label,Ti.UI.View,Ti.UI.Button,Ti.UI.TableView,Ti.UI.TableViewRow,Ti.UI.TableViewSection,Ti.UI.Switch,Ti.UI.Picker,Ti.UI.TextField"
