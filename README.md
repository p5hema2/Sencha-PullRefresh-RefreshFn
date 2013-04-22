Sencha-Domfriendly-Navigation
=============================

version 0.1.0  
based on Sencha Touch 2.2.0
written by [Martin Heﬂ](https://github.com/p5hema2)

tested against:
- Sencha Touch 2.2.0

(working in all my cases, pls report if it is not working)

## About:

Sencha removed the refreshFn from the pullrefresh plugin in ST 2.2.  
Here is an user extension with gives the old functionality back to you.

## Usage:


- copy the MhNavigationView.js to "./ux/touch/"
- load your the file in your "./app.js"

```javascript
    Ext.Loader.setPath({  
    	'Ext': 'touch/src',  
    	'Ext.ux.touch': 'ux/touch',  
    	...
    });
```

- create a List like this (its the sencha touch 2.1.1 way)

```javascript
Ext.create('Ext.dataview.List', {
	fullscreen: true,

	store: store,

	plugins: [
		{
			xclass: 'Ext.ux.touch.PullRefreshFn',
			pullRefreshText: 'Pull down for more new Tweets!'
			refreshFn: function() { 
				Ext.getStore('ENTER YOUR STORE HERE').load('',1)
		   }
		}
	],

	itemTpl: [
		'YOUR ITEMTPL'
	]
});
```


- Enjoy!

<br><br>
Greetings,  
[Martin Heﬂ](https://github.com/p5hema2)
### Don't forget to star the repo. :-)