var TiTwitter = {};
(function(){
	TiTwitter.UI = {};
	TiTwitter.UI.tableView = Ti.UI.createTableView();
	
	// TableView生成
	TiTwitter.UI.createTableViewRow = function(tweet){
		var row = Ti.UI.createTableViewRow();
		row.height = 180;
		row.add(Ti.UI.createLabel({
			text:tweet.user.screen_name,
			top:8,
			left:64,
			height:'auto'
		}));
		row.add(Ti.UI.createLabel({
			text:tweet.text,
			top:32,
			left:64,
			width:256,
			height:'auto'
		}));
		row.add(Ti.UI.createImageView({
			image:tweet.user.profile_image_url,
			top:8,
			left:8,
			width:48,
			height:48
		}));
		
		row.tweet = tweet;
		row.addEventListener('click', function(e){
			var t = e.rowData.tweet;
			var url = 'http://twitter.com/' + t.user.screen_name + '/status/' + t.id_str;
			if(Ti.Platform.osname === 'android'){
				var intent = Ti.Android.createIntent({
					action: Ti.Android.ACTION_SEND,
					type: "text/plain"
				});
				intent.putExtra(Ti.Android.EXTRA_TEXT, url);
				
				var chooserIntent = Ti.Android.createIntentChooser(intent, "Choose App");
				Ti.Android.currentActivity.startActivity(chooserIntent);
			}else{
					Ti.Platform.openURL(url);
			}
		});
		return row;
	}
	
	// 再取得ボタン生成
	TiTwitter.UI.setRefreshButton = function(callback){
		if(Ti.Platform.osname === 'android'){
			var activity = Ti.Android.currentActivity;
			if(activity){
				activity.onCreateOptionsMenu = function(e){
					var menu = e.menu;
					var menuItem = menu.add({title:"再読込"});
					menuItem.setIcon("dark_refresh.png");
					menuItem.addEventListener("click",function(e){
						callback();
					});
				};
			}
		}else{
			var rightButton = Ti.UI.createButton({
				systemButton:Ti.UI.iPhone.SystemButton.REFRESH
			});
			Ti.UI.currentWindow.rightNavButton = rightButton;
			rightButton.addEventListener('click',function(){
				callback();
			});
		}
	};
	
	// API呼び出し
	TiTwitter.callAPI = function(method,url,params,callbackOnLoad){
		if(Ti.Network.online == false){
			alert('オフラインなのでデータを取得できません。');
			return;
		}
		var xhr = Ti.Network.createHTTPClient();
		xhr.open(method,url,false);
		xhr.onload = function(){
			callbackOnLoad(xhr.status,xhr.responseText);
		}
		
		xhr.onerror = function(error){
			alert(error);
		}
		if(params){
			xhr.send(params);
		}else{
			xhr.send();
		}
	};
	
	// タイムライン取得
	TiTwitter.loadUserTimeline = function(screenName){
		var url = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=' + screenName;
		TiTwitter.callAPI('GET',url,null,function(status,responseText){
			TiTwitter.UI.tableView.data = [];
			var json = JSON.parse(responseText);
			for(var i=0; i<json.length; i++){
				TiTwitter.UI.tableView.appendRow(TiTwitter.UI.createTableViewRow(json[i]));
			}
		});
	};
	
	// 検索結果取得
	TiTwitter.loadSearchResult = function(apiParam){
		var url = 'http://search.twitter.com/search.json';
		TiTwitter.callAPI('GET',url,apiParam,function(status,responseText){
			TiTwitter.UI.tableView.data = [];
			var json = JSON.parse(responseText);
			for(var i=0; i<json.results.length; i++){
				var tweet = json.results[i];
				tweet.user = {};
				tweet.user.screen_name = tweet.from_user;
				tweet.user.name = tweet.from_user;
				tweet.user.profile_image_url = tweet.profile_image_url;
				TiTwitter.UI.tableView.appendRow(TiTwitter.UI.createTableViewRow(tweet));
			}
		});
	};
})();
