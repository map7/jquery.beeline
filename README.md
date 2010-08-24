#About

**jQuery Beeline** 

Beeline means take the most direct route.  In the case of application development it's faster and more direct to use the keyboard than the mouse.

Based upon: http://github.com/jeresig/jquery.hotkeys

#Requires

jquery-1.4.2

#Use

Add the following to your $(document).ready(function(event)) area:
    $(document).beeline();

Your links must have the class set as 'ajax' here is a typical link within a Rails app:
     <%= link_to "Products", products_path, :class => 'ajax', :target => 'content', :accesskey => 'f1' %>

This must have the following in your $(document).ready area to work
    // Ajax navigation
    $('a.ajax').live('click', function(e) { 
	e.preventDefault();
	link = $(this); 
	target = link.attr('target')
	$('#'+target).load(link.attr('href'), function() {});
    });

#Field Key Exceptions

If you would like to allow some keystrokes within text fields then you can add them as exceptions to the beeline function call like so:
   $(document).beeline({field_keys: ['ctrl+b','f1','f2']});


#No layout
  Add the following to your application_controller
   
  # If the request is ajax then don't include a layout
  layout :no_xhr_layout
  
  def no_xhr_layout
    request.xhr? ? false : 'application'
  end

#Note
Key combinations can only be put on links/buttons which have been binded to a click event.

