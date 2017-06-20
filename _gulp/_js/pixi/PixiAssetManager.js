YSD.PixiAssetManager = (function(){
    
    var callBack;

    function PixiAssetManager( assetUrls, _callBack ) {

        callBack = _callBack;

        var loader = new PIXI.AssetLoader( assetUrls, false);
        loader.onComplete = this.assetsLoadComp.bind(this);
        loader.load();
    
    }

    PixiAssetManager.prototype = {

        assetsLoadComp : function() {

            callBack();
        
        }
    
    }

    return PixiAssetManager;

})();