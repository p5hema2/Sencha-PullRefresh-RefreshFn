/**
 * This user extension gives st 2.2.0 Pullrefresh the RefreshFn back
 *
 * ## Example
 *
 *     Ext.create('Ext.dataview.List', {
 *         fullscreen: true,
 *
 *         store: store,
 *
 *         plugins: [
 *             {
 *                 xclass: 'Ext.ux.touch.PullRefreshFn',
 *                 pullRefreshText: 'Pull down for more new Tweets!'
 *                 refreshFn: function() { 
 *		                Ext.getStore('ENTER YOUR STORE HERE').load('',1)
 *		           }
 *             }
 *         ],
 *
 *         itemTpl: [
 *             'YOUR ITEMTPL'
 *         ]
 *     });
 */
Ext.define('Ext.ux.touch.PullRefreshFn', {
    extend: 'Ext.plugin.PullRefresh',
    alias: 'plugin.pullrefreshfn',
    requires: ['Ext.DateExtras'],

    config: {
    	/**
         * @cfg {Function} refreshFn The function that will be called to refresh the list.
         * If this is not defined, the store's load function will be called.
         * The refresh function gets called with a reference to this plugin instance.
         * @accessor
         */
        refreshFn: null
    },

	loadStore: function() {
	    var me = this,
	        list = me.getList(),
	        scroller = list.getScrollable().getScroller();
	
	
	    me.setViewState('loading');
	    me.isReleased = false;
	
	    Ext.defer(function() {
	        scroller.on({
	            scrollend: function() {
	                if (me.getRefreshFn()) {
	                    me.getRefreshFn().call(me, me);
	                } else {
	                    me.fetchLatest();
	                }
	                me.resetRefreshState();
	            },
	            delay: 100,
	            single: true,
	            scope: me
	        });
	        scroller.minPosition.y = 0;
	        scroller.scrollTo(null, 0, true);
	    }, 500, me);
	
	}
});
