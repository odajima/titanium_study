Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup({});

var win1 = Titanium.UI.createWindow({
    url: 'win1.js',
    title:'@appcelerater',
    backgroundColor:'#fff'
});

var tab1 = Titanium.UI.createTab({
    icon: 'dark_appcelerator.png',
    title: '@appcelerator',
    window: win1
});

var win2 = Titanium.UI.createWindow({
    url: 'win2.js',
    title:'@appcelerater_ja',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({
    icon:'dark_appcelerator.png',
    title:'@appcelerator_ja',
    window:win2
}); 
var win3 = Titanium.UI.createWindow({
    url: 'win3.js',
    title:'@Titanium',
    backgroundColor:'#fff'
});
var tab3 = Titanium.UI.createTab({
    icon:'dark_pegman.png',
    title:'@Titanium',
    window:win3
}); 
var win4 = Titanium.UI.createWindow({
    url: 'win4.js',
    title:'@TitaniumJP',
    backgroundColor:'#fff'
});
var tab4 = Titanium.UI.createTab({
    icon:'dark_pegman.png',
    title:'@Titanium',
    window:win4
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
tabGroup.addTab(tab4);  
tabGroup.addTab(tab5);  
tabGroup.open();