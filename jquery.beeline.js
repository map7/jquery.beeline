/*
 * jQuery beeline (Shortcut keys plugin)
 *
 * Based upon plugin
 * http://github.com/jeresig/jquery.hotkeys
 *
 * Special thanks to Andrew France.
 *
*/

// Hold special keys
var special = {	8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 
		19: "pause", 20: "capslock", 27: "esc", 32: "space", 33: "pageup", 
		34: "pagedown", 35: "end", 36: "home", 37: "left", 38: "up", 39: "right", 
		40: "down", 45: "insert", 46: "del", 96: "0", 97: "1", 98: "2", 99: "3", 
		100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9", 106: "*", 
		107: "+", 109: "-", 110: ".", 111 : "/", 112: "f1", 113: "f2", 114: "f3", 
		115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 120: "f9", 
		121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 
		191: "/", 224: "meta"};

function beeline(exceptions){


    if (!exceptions)
	var exceptions = new Array();

    // Remove the other keybindings
    $(document).keypress(function(e){ check_keys(e); });
    $(document).keyup(function(e){ check_keys(e); });
    $(document).keydown(function(e) { handler(e); });
    
    // Capture any keydown and search for any links/buttons which have 
    // an accesskey the same.

    function check_keys(e){
	e.preventDefault()
	return false;
    }

    function handler(e){

	var modif = '';
	var accesskey= new String();
	
	str = String.fromCharCode(e.which);

	if (e.ctrlKey) { modif = 'ctrl+'; }
	if (e.altKey) { modif = 'alt+'; }
	
	if (special[e.which]){
	    accesskey = special[e.which]
	}else{
	    accesskey = modif+str;
	    accesskey = accesskey.toLowerCase();
	};
	
	// Check if we have any exceptions for shortcut keys within an input field.
	if (exceptions.indexOf(accesskey) == -1)
	    if (/textarea|select/i.test( e.target.nodeName) || e.target.type === "text") 
		return;
	    
	// Click the associated button.
	$('a.ajax[accesskey='+accesskey+']').click();

	// Build an array of all accesskeys
	var keys = [];

	$('a.ajax[accesskey]').each(function(e){
	    keys.push($(this).attr('accesskey'));
	});

	$('#content').append("keys array total: " + keys.length + "<br />");
	
	// Check array for the key hit
	if (keys.indexOf(accesskey) >= 0){
	    e.preventDefault();
	    return false;
	}else{
	    return true;
	};


    }; //handler
}; //beeline

