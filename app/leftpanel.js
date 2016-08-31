define(function (require) {
    var $ = require('jquery');
	var ko = require('knockout-3.4.0');
    var issuedBooks = require('./issuedBooks');

    var roleEnum = {
    	USER : "user",
    	ADMIN : "admin"
    };
    var model;
    var role;
    var modelAdmin = [
            "About Us",
            "Book Shelf", 
            "Checkout",
            "Add Books",
            "Books Issued",
            "Logout"];
    var modelUser = [
            "About Us",
            "Book Shelf", 
            "Checkout",
            "Books Issued",
            "Logout"];
    var navIDEnum = {
        ABOUTUS: "about-us",
        BROWSE: "book-shelf",
        CHECKOUT: "checkout",
        ADDBOOKS: "add-new-books",
        ISSUEDBOOKS: "issued-books"
    };

    var navEnum = {
        ABOUTUS: "About Us",
        BROWSE: "Book Shelf",
        CHECKOUT: "Checkout",
        ADDBOOKS: "Add Books",
        ISSUEDBOOKS: "Books Issued",
        LOGOUT: "Logout"
    }

    var presentApp = navIDEnum.ABOUTUS;

    var setUserRole = function (options) {
    	role = localStorage.getItem('userRole') || roleEnum.ADMIN;    	
    }

    var getUserRole = function () {
    	return role;
    }

    var getLeftPanelModel = function () {
    	if (typeof role != undefined || role != null) {
    		switch(role) {
    			case roleEnum.USER:
    				model = modelUser;
    				break;
    			case roleEnum.ADMIN:
    				model = modelAdmin;
    				break;
    			default :
    				model = modelAdmin;
    		}
        }
        return model;
    }

    var showHideApp = function(nxtApp) {
        $('#'+presentApp).addClass('hidden');
        $('#'+nxtApp).removeClass('hidden');        
        presentApp = nxtApp;
    }

    var setDefaultScreen = function() {
        $('#'+navIDEnum.ABOUTUS).removeClass('hidden');
        $('#side-bar').removeClass('hidden');
    }

    function leftPanelViewmodel () {
        //var self = this;
        setUserRole(); // set just to chcek ...
        setDefaultScreen();
        this.leftPanelModel = getLeftPanelModel();
        //this.aboutUs = ko.observable();
        this.navigateTo = function(viewModel) {
            //console.log("navigate to"+ viewModel);
            switch(viewModel) {
                case navEnum.ABOUTUS:
                    //console.log("navigating to about us");
                    //$('.apps').toggleClass('hidden');
                    showHideApp(navIDEnum.ABOUTUS);
                    break;
                case navEnum.BROWSE:
                    //console.log("navigating to Browse");                    
                    showHideApp(navIDEnum.BROWSE);
                    break;
                case navEnum.CHECKOUT:
                    //console.log("navigating to Browse");
                    showHideApp(navIDEnum.CHECKOUT);
                    break;
                case navEnum.ADDBOOKS:
                    //console.log("navigating to Browse");
                    showHideApp(navIDEnum.ADDBOOKS);
                    break;
                case navEnum.ISSUEDBOOKS:
                    //console.log("navigating to Browse");
                    showHideApp(navIDEnum.ISSUEDBOOKS);
                    break;

                case navEnum.LOGOUT:

                    $.ajax({
                        type: "POST",
                        dataType : 'json',
                        url: 'save_checkout_data.php',
                        data: { data: JSON.stringify(issuedArray) },
                        complete: function () { 
                        getBrowsedataFromServer();},
                        failure: function() { }
                    });

                    location.replace("/library/login.html");
                default:
                    //console.log("no valid navigation option");

            }

        }

    }

    ko.applyBindings( leftPanelViewmodel(), document.getElementById('side-bar'));
});