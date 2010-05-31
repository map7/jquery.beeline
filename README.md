#About

**jQuery Beeline** 

Beeline means take the most direct route.  In the case of application development it's faster and more direct to use the keyboard than the mouse.

Based upon: http://github.com/jeresig/jquery.hotkeys

#Use

Add the following to your $(document).ready(function(event)) area:
  beeline();

#Exceptions

If you would like to allow some keystrokes within text fields then you can add them as exceptions to the beeline function call like so:
  beeline(['ctrl+b','f1','f2']);


#Note
Key combinations can only be put on links/buttons which have been binded to a click event.

