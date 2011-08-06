var win = Ti.UI.currentWindow;

Ti.include('titwitter.js');

win.add(TiTwitter.UI.tableView);

TiTwitter.UI.setRefreshButton(function(){
	TiTwitter.loadUserTimeline('appcelerator_ja');
});

TiTwitter.loadUserTimeline('appcelerator_ja');
