var win = Ti.UI.currentWindow;

Ti.include('titwitter.js');

win.add(TiTwitter.UI.tableView);

TiTwitter.UI.setRefreshButton(function(){
	TiTwitter.loadSearchResult({q:'#TitaniumJP',lang:'ja',locale:'ja'});
});

TiTwitter.loadSearchResult({q:'#TitaniumJP',lang:'ja',locale:'ja'});

