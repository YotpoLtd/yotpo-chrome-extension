var yotpo_widget_version = null;
var yotpo_v1_selector = null;
var yotpo_v2_app_key = null;
//if (document.getElementsByClassName('yotpo-main-widget').length > 0)
if (hasYotpoWidgetV2())
	yotpo_widget_version = 'v2';
else {
	if (document.getElementsByClassName('yotpo reviews').length > 0) {
		yotpo_v1_selector = 'yotpo reviews';
		yotpo_widget_version = 'v1';
	}
	else if (document.getElementsByClassName('yotpo bottomLine').length > 0) {
		yotpo_v1_selector = 'yotpo bottomLine';
		yotpo_widget_version = 'v1';
	}
}

message = { url: window.location.href };
if (yotpo_widget_version != null) {
	message['yotpo_version'] = yotpo_widget_version;
	if (yotpo_widget_version == 'v1') {
		var yotpoEl = document.getElementsByClassName(yotpo_v1_selector)[0];
		message['app_key'] = yotpoEl.getAttribute('data-appkey');
		if (yotpo_v1_selector.indexOf('bottomLine') == -1)
			message['product_id'] = yotpoEl.getAttribute('data-product-id');
	}
	else {
		var yotpoEl = document.getElementsByClassName('yotpo-main-widget')[0];
		message['app_key'] = yotpo_v2_app_key;
		message['product_id'] = yotpoEl.getAttribute('data-product-id');
	}
}
else
	message['yotpo_version'] = 'y u no yotpo';

function hasYotpoWidgetV2() {
	var script_tags = document.getElementsByTagName('script');
	var script_tags_length = script_tags.length;
	for (var i = 0; i < script_tags_length; i++) {
		var script_tag = script_tags[i];
		if (script_tag.src && script_tag.src.indexOf('staticw2.yotpo.com') > -1) {
			yotpo_v2_app_key = script_tag.src.split('/')[3];
			return true;
		}
	}
	return false;
}

chrome.runtime.sendMessage(message);