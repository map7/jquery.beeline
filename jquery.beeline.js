/*
 * jQuery beeline (Shortcut keys plugin)
 *
 * Based upon plugin
 * http://github.com/jeresig/jquery.hotkeys
 *
 * Special thanks to Andrew France.
 *
 */
(function($){

    // Hold special keys
    var special = {8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 
				   18: "alt", 19: "pause", 20: "capslock", 27: "esc", 32: "space", 
				   33: "pageup", 34: "pagedown", 35: "end", 36: "home", 37: "left", 
				   38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 96: "0", 
				   97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 
				   104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
				   112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 
				   118: "f7", 119: "f8", 120: "f9", 121: "f10", 122: "f11", 123: "f12", 
				   144: "numlock", 145: "scroll", 191: "/", 224: "meta"};

    var keys = [];

    $.beeline = {
		defaults: {
			field_keys: []
		}
    }

    $.fn.beeline = function(options){
		$(this).ready(function(event){

			options = $.extend($.beeline.defaults, options);
			field_keys = options['field_keys'];

			if (!field_keys)
				var field_keys = new Array();

			// Remove the other keybindings
			$(this).keypress(function(e){ check_keys(e); });
			$(this).keyup(function(e){ check_keys(e); });
			$(this).keydown(function(e) { handler(e); });
			
			// Capture any keydown and search for any links/buttons which have 
			// an accesskey the same.

			// need to use keyCode instead of which on keypress.
			function check_keys(e){

				accesskey=get_accesskey(e);
				keyOccurances = keys.indexOf(accesskey);

				// Check array for the key hit
				if (keys.indexOf(accesskey) >= 0){
					e.preventDefault();
					return false;
				}else{
					return true;
				};
			};

			function get_accesskey(e){
				var modif = '';

				if (e.ctrlKey) { modif = 'ctrl+'; }
				if (e.altKey) { modif = 'alt+'; }

				if (e.which === 0 && e.keyCode > 0)
					code = e.keyCode;
				else if (e.which > 0 && e.keyCode === 0)
					code = 0;
				else
					code = e.which;

				if (special[code]){
					accesskey = special[code]
				}else{
					str = String.fromCharCode(code);
					accesskey = modif+str;
					accesskey = accesskey.toLowerCase();
				};

				return accesskey;
			};
			
			function handler(e){

				var accesskey= new String();
				accesskey=get_accesskey(e);

				//		console.log("beeline, keyCode: " + e.keyCode + ", accesskey: " + accesskey);

				// Check if we have any field_keys for shortcut keys within an input field.
				if (field_keys.indexOf(accesskey) == -1)
					if (/textarea|select/i.test( e.target.nodeName) || e.target.type === "text") 
						return;
				
				// Click the associated button.
				$('a.ajax[accesskey='+accesskey+']').click();

				// Build an array of all accesskeys
				keys = [];

				$('a.ajax[accesskey]').each(function(e){
					keys.push($(this).attr('accesskey'));
				});
				
				check_keys(e);

			}; //handler
		}); // document.ready
    }; //beeline
})(jQuery);
