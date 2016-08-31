requirejs.config({
    baseUrl: 'lib',
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    },
    paths: {
    	jquery:'jquery',
    	bootstrap: 'bootstrap',
        app: '../app',

        //bootstrap: 'bootstrap',
        //jquery:'jquery'
    }
});

requirejs(['app/main']);
