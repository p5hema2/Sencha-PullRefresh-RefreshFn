/**
 * This user extension gives st 2.3.0 Pullrefresh the RefreshFn back
 * based on sencha touch 2.3.0
 * 
 * @class Ext.ux.touch.PullRefreshFn
 * @version 2.0.1-beta
 * @author Martin Hess <https://github.com/p5hema2>
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
 *                        Ext.getStore('ENTER YOUR STORE HERE').load('',1)
 *                   }
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
    
    fetchLatest: function() {
        if (this.getRefreshFn()) {
            this.getRefreshFn().call(this, this);
            this.setState("loaded");
            this.fireEvent('latestfetched', this, 'refreshFn, you have to handle toInsert youself');
            if (this.getAutoSnapBack()) {
                this.snapBack();
            }
        } else {    
            console.log('fetchLatest')
            var store = this.getList().getStore(),
                proxy = store.getProxy(),
                operation;
    
            operation = Ext.create('Ext.data.Operation', {
                page: 1,
                start: 0,
                model: store.getModel(),
                limit: store.getPageSize(),
                action: 'read',
                sorters: store.getSorters(),
                filters: store.getRemoteFilter() ? store.getFilters() : []
            });
    
            proxy.read(operation, this.onLatestFetched, this);
        }
    },
    
    /**
     * Snaps the List back to the top after a pullrefresh is complete
     * @param {Boolean=} force Force the snapback to occur regardless of state {optional}
     */
    snapBack: function(force) {
        if(this.getState() !== "loaded" && force !== true) return;

        var that = this,
            list = this.getList(),
            scroller = list.getScrollable().getScroller(),
            currentY = scroller.minPosition.y;
            
        scroller.refresh();
        scroller.minPosition.y = 0;
        
        scroller.on({
            scrollend: this.onSnapBackEnd,
            single: true,
            scope: this
        });

        this.setIsSnappingBack(true);
        
        scroller.getTranslatable().translateAnimated(0, currentY, {duration: this.getSnappingAnimationDuration()});
        setTimeout(
            function () {
                scroller.scrollTo(0,1);
                scroller.scrollToTop();
            },
            that.getSnappingAnimationDuration()
        );
        
    }
});
