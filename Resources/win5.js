var win = Ti.UI.currentWindow;

// @appcelerator
var searchBar = Ti.UI.createSearchBar({
	showCancel:true,
	height:60,
	top:0
});

var tableView = Ti.UI.createTableView({
	top:60
})
win.add(searchBar);
win.add(tableView);

var url = 'http://search.twitter.com/search.json';

function refreshTimeline(){
	if(Ti.Network.online != false){
		var xhr = Ti.Network.createHTTPClient();
		xhr.open('GET', url, false);
		xhr.onload = function(){
			tableView.data = [];
			var json = JSON.parse(this.responseText);
			for(var i=0; i<json.results.length; i++){
				var tweet = json.results[i];
				tweet.user = {};
				tweet.user.screen_name = tweet.from_user;
				tweet.user.profile_image_url = tweet.profile_image_url;
				var row = Ti.UI.createTableViewRow();
				row.className = 'tweet';
				row.height = 180;
				row.add(Ti.UI.createLabel({
					text: tweet.user.screen_name,
					top: 8,
					left: 64,
					height: 'auto'
				}));
				row.add(Ti.UI.createLabel({
					text: tweet.text,
					top: 32,
					left: 64,
					width: 256,
					height: 'auto'
				}));
				row.add(Ti.UI.createImageView({
					image: tweet.user.profile_image_url,
					top: 8,
					left: 8,
					width: 48,
					height: 48
				}));
				tableView.appendRow(row);
	//			alert(Ti.Network.networkTypeName);
	//			tableViewData.push({title: json[i].text})
			}
	//		tableView.data = tableViewData
		};
		xhr.onerror = function(error){
			alert(error);
		}
		xhr.send({
			q:searchBar.value,
			lang:'ja',
			locale:'ja'
		});
	}
	else{
		alert('オフラインなのでデータを取得できません。');
	}
}

searchBar.addEventListener('cancel',function(){
	searchBar.blur();
})
searchBar.addEventListener('return',function(){
	Ti.App.Properties.setString('query_string', searchBar.value)
	searchBar.blur();
	refreshTimeline();
})

if(Ti.App.Properties.getString('query_string', null) != null){
	searchBar.value = Ti.App.Properties.getString('query_string');
	refreshTimeline();
}

var activity = Ti.Android.currentActivity;
if(activity){
	activity.onCreateOptionsMenu = function(e){
//		alert("test");
		var menu = e.menu;
		var menuItem = menu.add({title: '再読込'});
		menuItem.setIcon("dark_refresh.png");
		menuItem.addEventListener("click", function(e){
			refreshTimeline();
		});
	};
}

//refreshTimeline();
