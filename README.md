Sencha-PullRefresh-RefreshFn
============================

version 1.0.0  
based on Sencha Touch 2.2.0  
written by [Martin Hess](https://github.com/p5hema2)  
@ [flyacts GmbH](https://github.com/flyacts)

tested against:
- Sencha Touch 2.2.0

## About:

Sencha removed the refreshFn from the pullrefresh plugin in ST 2.2.  
Here is an user extension with gives the old functionality back to you.

## Usage:


- copy the PullRefreshFn.js to "./ux/touch/"

- add ",${app.dir}/ux/touch" to "./.sencha/app/sencha/cfg" to variable "app.classpath" 
(builder needs to know where the plugin is located)

```
app.classpath=${app.dir}/app.js,${app.dir}/app,${app.dir}/ux/touch
```

- load your the file in your "./app.js"

```javascript
    Ext.Loader.setPath({  
    	'Ext': 'touch/src',  
    	'Ext.ux.touch': 'ux/touch',  
    	...
    });
```

- create a List like this (it's the sencha touch 2.1.1 way)

```javascript
Ext.create('Ext.dataview.List', {
	fullscreen: true,

	store: store,

	plugins: [
		{
			xclass: 'Ext.ux.touch.PullRefreshFn',
			pullRefreshText: 'Pull down for more new Tweets!'
			refreshFn: function() { 
				Ext.getStore('ENTER YOUR STORE HERE').load()
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
[Martin Hess](https://github.com/p5hema2)  
@ [flyacts GmbH](https://github.com/flyacts)
### Don't forget to star the repo. :-)
