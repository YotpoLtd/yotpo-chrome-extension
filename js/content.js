var yotpo_widget_version = null;
var yotpo_type = null;
var yotpo_el_selector = null;
var yotpo_v2_app_key = null;

if (hasYotpoWidgetV2()) {
	yotpo_widget_version = 'v2';
	if (document.getElementsByClassName('yotpo bottomLine').length > 0) {
		yotpo_type = 'bottom line';
	}
	else if (document.getElementsByClassName('yotpo-main-widget').length > 0) {
		yotpo_el_selector = 'yotpo-main-widget';
		yotpo_type = 'widget'
	}
	else
		yotpo_type = 'site'
}	
else {
	if (document.getElementsByClassName('yotpo reviews').length > 0) {
		yotpo_type = 'widget';
		yotpo_el_selector = 'yotpo reviews';
		yotpo_widget_version = 'v1';
	}
	else if (document.getElementsByClassName('yotpo bottomLine').length > 0) {
		yotpo_type = 'bottom line';
		yotpo_el_selector = 'yotpo bottomLine';
		yotpo_widget_version = 'v1';
	}
	else
		yotpo_type = 'site'
}

message = { url: window.location.href };
if (yotpo_widget_version != null) {
	message['yotpo_version'] = yotpo_widget_version;
	message['yotpo_type'] = yotpo_type;
	
	if (yotpo_widget_version == 'v1' && yotpo_el_selector != null)
		message['app_key'] = document.getElementsByClassName(yotpo_el_selector)[0].getAttribute('data-appkey');
	else
		message['app_key'] = yotpo_v2_app_key;
		
	if (yotpo_type == 'widget')
		message['product_id'] = document.getElementsByClassName(yotpo_el_selector)[0].getAttribute('data-product-id');
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