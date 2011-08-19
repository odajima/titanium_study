var win = Ti.UI.currentWindow;

var init_text = win.init_text || '';
var in_reply_to_status_id = win.in_reply_to_status_id || 0;

if(Ti.Platform.osname !== 'android'){
	win.leftNavButton = (function(){
		var button = Ti.UI.createButton({
			title:'閉じる'
		});
		button.addEventListener('click', function(){
			win.close();
		});
		return button;
	})();
}

var textarea = Ti.UI.createTextArea({
	value: init_text,
	height:146,
	left:4,
	right:4,
	top:4,
	font:{
		fontSize:20,
		fontFamily:'HirakakuProN-W3',
		fontWeight:'bold'
	},
	color:'#000',
	textAlign:'left',
	borderWidth:2,
	borderColor:'#bbb',
	borderRadius:5
});
win.add(textarea);

win.addEventListener('open', function(e){
	textarea.focus();
});

Ti.include('./titwitter.js');

var postTweet = function(){
	var status = textarea.value;
	if(status === ''){
		return;
	}
	if(status.length > 140){
		textarea.value = status;
		Ti.UI.createAlertDialog({
			title:'TinyTweet',
			message:'発言内容が長すぎます。'
		}).show();
		return;
	}
	textarea.value = '';
	TiTwitter.postTweet(status, in_reply_to_status_id);
}

if(Ti.Platform.osname === 'android'){
	var activity = Ti.Android.currentActivity;
	if(activity){
		activity.onCreateOptionsMenu = function(e){
			var menu = e.menu;
			var menuItem = menu.add({title:"送信"});
			menuItem.setIcon("dark_pencil.png");
			menuItem.addEventListener("click", function(e){
				postTweet();
			});
		};
	}
}
else{
	win.leftNavButton = (function(){
		var button = Ti.UI.createButton({
			title:'閉じる'
		});
		button.addEventListener('click', function(){
			win.close();
		});
		return button;
	})();
	win.rightNavButton = (function(){
		var button = Ti.UI.createButton({
			title:'送信'
		});
		button.addEventListener('click', function(){
			postTweet();
		});
		return button;
	})();
}


