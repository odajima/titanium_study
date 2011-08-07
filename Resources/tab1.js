var win = Ti.UI.currentWindow;

// 公式アカウント一覧
var tableView = Ti.UI.createTableView({
	data : [
		{title: '@appcelerator',	url: 'win1.js', hasChild: true},
		{title: '@appcelerator_ja',	url: 'win2.js', hasChild: true}
	]
});
win.add(tableView);

tableView.addEventListener('click', function(e){
	var newWindowUrl = e.rowData.url;
	var newWindow = Ti.UI.createWindow({
		title: e.row.title,
		backgroundColor: '#fff',
		url: newWindowUrl
	});
	Ti.UI.currentTab.open(newWindow);
})
