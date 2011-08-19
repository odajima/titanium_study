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
var tab3 = Titanium.UI.createTab({
    //icon:'dark_search.png',
    title:'タイムライン',
    window:Ti.UI.createWindow({
	    url: 'timeline.js',
    	title:'タイムライン',
    	backgroundColor:'#fff'
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
tabGroup.addTab(tab3);
tabGroup.addTab(tab5);  
tabGroup.open();



