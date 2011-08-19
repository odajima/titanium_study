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
/*
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
*/
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
			/*
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
			*/
			var thistweet = e.rowData.tweet;
			Ti.UI.currentTab.open(
				TiTwitter.UI.createTweetWindow(thistweet)
			);
		});
		return row;
	}
	
	TiTwitter.UI.createTweetWindow =function(thisTweet){
		var newWindow = Ti.UI.createWindow({
			title: 'Tweet',
			backgroundColor: '#fff'
		});

		
		newWindow.add((function(){
			var view = Ti.UI.createView({
				top:0, height:80,
				backgroundColor: '#ccc'
			});
			view.add(Ti.UI.createImageView({
				image: thisTweet.user.profile_image_url,
				top:8, left:8, width:64, height:64
			}));
			view.add(Ti.UI.createLabel({
				top:8, left:80, right:8, height:'auto', width:'auto',
				text: thisTweet.user.name
			}));
			view.add(Ti.UI.createLabel({
				top:30, left:80, height:'auto', width:'auto',
				text: '@' + thisTweet.user.screen_name,
				font:{fontsize:11}
			}));
		
			// 共有ボタン作成
			var button = Ti.UI.createButton({
				top:'auto', right:8, height:'auto', width:'auto',
				title: '共有'
			});
			view.add(button);

			// ボタンイベント設置
			button.addEventListener('click', function(e){
				var url = 'http://twitter.com/' + thisTweet.user.screen_name + '/status/' + thisTweet.id_str;
				if(Ti.Platform.osname === 'android'){
					var intent = Ti.Android.createIntent({
						action: Ti.Android.ACTION_SEND,
						type: "text/plain"
					});
					intent.putExtra(Ti.Android.EXTRA_TEXT, url);
					
					Ti.Android.currentActivity.startActivity(intent, "Choose App");
				}else{
					var dialog = Ti.UI.createOptionDialog({
						title: '処理を選択してください',
						options: ["Safari","Twitter for iPhone","E-Mail","Read it Later","キャンセル"],
						cancel: 4
					});
					Ti.Platform.openURL(url);
				}
	
			});
			return view;
		})());
		// tweet
		newWindow.add((function(){
			var webView = Ti.UI.createWebView({
				top:80
			});
			webView.html = '<html><body style="padding:8px"><div>'
				+ thisTweet.text + '</div>'
				+ '<div>' + String.formatDate(new Date(thisTweet.created_at), "long") + " "
				+ String.formatTime(new Date(thisTweet.created_at))
				+ '</div></body></html>';
			return webView;
		})());
		// button
		/*
		newWindow.add((function(){
			var button = Ti.UI.createButton({
				title: '共有'
			});
			button.addEventListener('click', function(e){
				var url = 'http://twitter.com/' + thisTweet.user.screen_name + '/status/' + thisTweet.id_str;
				if(Ti.Platform.osname === 'android'){
					var intent = Ti.Android.createIntent({
						action: Ti.Android.ACTION_SEND,
						type: "text/plain"
					});
					intent.putExtra(Ti.Android.EXTRA_TEXT, url);
					
					Ti.Android.currentActivity.startActivity(intent, "Choose App");
				}else{
						Ti.Platform.openURL(url);
				}
	
			});
			return button;
		})());
		*/
		
		if(Ti.Platform.osname !== 'android'){
			newWindow.rightNavButton = (function(){
				var button = Ti.UI.createButton({
					systemButton: Ti.UI.iPhone.SystemButton.ACTION
				});
				button.addEventListener('click',function(){
					TiTwitter.UI.showOptionDialog(thisTweet, url);
				});
				return button;
			})
		}
		else{
			newWindow.activity = Ti.Android.currentActivity;
			if(newWindow.activity){
				newWindow.activity.onCreateOptionsMenu = function(e){
					var menu = e.menu;
					var menuItem_reply = menu.add({title:"返信"});
					menuItem_reply.setIcon("dark_pencil.png");
					menuItem_reply.addEventListener("click",function(e){
						TiTwitter.UI.replyWindow(thisTweet, 0);
					});
					var menuItem_inyo = menu.add({title:"引用"});
					menuItem_inyo.setIcon("dark_pencil.png");
					menuItem_inyo.addEventListener("click",function(e){
						TiTwitter.UI.replyWindow(thisTweet, 1);
					});
					var menuItem_retweet = menu.add({title:"Retweet"});
					menuItem_retweet.setIcon("dark_jump.png");
					menuItem_retweet.addEventListener("click",function(e){
						TiTwitter.UI.othersFunc(thisTweet, 2);
					});
					var menuItem_favorite = menu.add({title:"お気に入り"});
					menuItem_favorite.setIcon("dark_list---add.png");
					menuItem_favorite.addEventListener("click",function(e){
						TiTwitter.UI.othersFunc(thisTweet, 3);
					});
				};
			}
		}
		
		return newWindow;				

	}

	// Android用
	TiTwitter.UI.replyWindow = function(thisTweet, event_num){
		var postWindow = Ti.UI.createWindow({
			title:'返信する',
			url:'post.js',
			backgroundColor:'#fff'
		});
		
		postWindow.init_text = '@' + thisTweet.user.screen_name + ' ' + ((event_num == 1) ? thisTweet.text : '');
		postWindow.in_reply_to_status_id = thisTweet.id_str;
		postWindow.open({
			modal:true,
			modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
			modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
		});
	};
	TiTwitter.UI.othersFunc = function(thisTweet, event_num){
		var params = {
			onSuccess:function(responce){
				Ti.API.info(responce);
			},
			onError:function(error){
				Ti.API.error(error);
			},
			id:thisTweet.id_str
		};
		if(event_num == 2){
			twitterApi.statuses_retweet(params);
		}
		else{
			twitterApi.favorites_create(params);
		}
	}
	

	TiTwitter.UI.showOptionDialog = function(thisTweet, url){
		var dialog = Ti.UI.createOptionDialog({
			title: '処理を選択してください。',
			options:['返信','引用','Retweet','お気に入り','キャンセル'],
			cancel:4
		});
		dialog.addEventListener('click',function(e){
			if((e.index == 0) || (e.index == 1)){
				var postWindow = Ti.UI.createWindow({
					title:'返信する',
					url:'post.js',
					backgroundColor:'#fff'
				});
				postWindow.init_text = '@' + thisTweet.user.screen_name + ' ' + ((e.index == 1) ? thisTweet.text : '');
				postWindow.in_reply_to_status_id = thisTweet.id_str;
				postWindow.open({
					modal:true,
					modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
					modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
				});
			}
			else if((e.index == 2) || (e.index == 3)){
				var params = {
					onSuccess:function(responce){
						Ti.API.info(responce);
					},
					onError:function(error){
						Ti.API.error(error);
					},
					id:thisTweet.id_str
				};
				if(e.index == 2){
					twitterApi.statuses_retweet(params);
				}
				else{
					twitterApi.favorites_create(params);
				}
			}
		});
		dialog.show();
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
	
	TiTwitter.loadHomeTimeline = function(){
		twitterApi.statuses_home_timeline({
			onSuccess: function(tweets){
				TiTwitter.UI.tableView.data = [];
				for(var i=0;i<tweets.length; i++){
					TiTwitter.UI.tableView.appendRow(TiTwitter.UI.createTableViewRow(tweets[i]));
				}
			},
			onError: function(error){
				Ti.API.error(error);
			}
		});
	};

	TiTwitter.postTweet = function(newStatus, in_reply_to_status_id){
		params = {
			onSuccess:function(responce){
				Ti.API.info(responce);
			},
			onError:function(error){
				Ti.API.error(error);
			},
			parameters:{
				status:newStatus
				}
		};
		params.url = 'http://api.twitter.com/1/statuses/update.json';
		params.method = 'POST';
		if(in_reply_to_status_id != null && in_reply_to_status_id > 0){
			params.url = params.url + '?in_reply_to_status_id=' + in_reply_to_status_id;
		}
		return twitterAPI.callAPI(params);
	};
})();

