var win = Ti.UI.currentWindow;

Ti.include('titwitter.js');

win.add(TiTwitter.UI.tableView);

/*
TiTwitter.UI.setRefreshButton(function(){
	TiTwitter.loadHomeTimeline();
});
*/

TiTwitter.loadHomeTimeline();



var showPostWindow = function(){
	var tweetWindow = Ti.UI.createWindow({
		title:'新規Tweet',
		url:'post.js',
		backgroundColor:'#fff'
	});
	
	tweetWindow.open({
		modal:true,
		modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
		modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
	});
};

if(Ti.Platform.osname === 'android'){
	var activity = Ti.Android.currentActivity;
	if(activity){
		activity.onCreateOptionsMenu = function(e){
			var menu = e.menu;
			var menuItem_tweet = menu.add({title:"Tweetする"});
			menuItem_tweet.setIcon("dark_pencil.png");
			menuItem_tweet.addEventListener("click",function(e){
				showPostWindow();
			});
			var menuItem_reload = menu.add({title:"再読込"});
			menuItem_reload.setIcon("dark_refresh.png");
			menuItem_reload.addEventListener("click",function(e){
				TiTwitter.loadHomeTimeline();
			});
		};
	}
}
else{
	win.leftNavButton = (function(){
		var button = TI.UI.createButton({
			systemButton: Ti.UI.iPhone.SystemButton.COMPOSE
		});
		button.addEventListener('click', function(){
			showPostWindow();
		});
		return button;
	})();
}
