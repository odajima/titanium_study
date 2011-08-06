var win = Ti.UI.currentWindow;

Ti.include('titwitter.js');

win.add(TiTwitter.UI.tableView);

TiTwitter.UI.setRefreshButton(function(){
	TiTwitter.loadSearchResult('#TitaniumJP');
});

TiTwitter.loadSearchResult('#TitaniumJP');

