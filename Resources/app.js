Ti.UI.setBackgroundColor('#000');

var tabGroup = Ti.UI.createTabGroup({});

var tab1 = Ti.UI.createTab({
	icon: 'dark_appcelerator.png',
	title: '公式アカウント',
	window: Ti.UI.createWindow({
		title: '公式アカウント',
		backgroundColor: '#fff',
		url: 'tab1.js'	
	})
});
var tab2 = Ti.UI.createTab({
	icon: 'dark_pegman.png',
	title: 'ハッシュタグ',
	window: Ti.UI.createWindow({
		title: 'ハッシュタグ',
		backgroundColor: '#fff',
		url: 'tab2.js'
	})
});
var tab5 = Titanium.UI.createTab({
    icon:'dark_search.png',
    title:'検索',
    window:Ti.UI.createWindow({
	    url: 'win5.js',
    	title:'検索',
    	backgroundColor:'#fff'
	})
}); 


//win1.hideTabBar();
 
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tabGroup.addTab(tab5);  
tabGroup.open();

if(Ti.Platform.osname !== 'android'){
	path_lib = 'lib';
}else{
	path_lib = '';
}
Ti.include("lib/twitter_api.js");
Ti.App.twitterApi = new TwitterApi({
	consumerKey: 'lVL9WygcRqyvy5IJ2smflA',
	consumerSecret: 'W8sIlKabYT22Heok6gBolRVs3nrhy12OohcKw4I3XA'
});
var twitterApi = Ti.App.twitterApi;
twitterApi.init();

twitterApi.statuses_update({
	onSuccess: function(responce){
		alert('Tweet完了しました');
		Ti.API.info(responce);
	},
	onError: function(error){
		Ti.API.error(error);
	},
	parameters:{status:'テストTweet by twitter_api.js!'}
});

