define(function (require) {

    //var checkoutBook = require('./../checkoutBookList');
    var $ = require('jquery');
    //var checkoutList = require('./../checkoutBookList');
    var ko = require('knockout-3.4.0');

    issuedArray =[];

    var issuedBooksViewModel = function() {
    	var self = this;
        $.get("/library/models/checkoutData.json", function(data, status) {
                
                serverData = JSON.parse(JSON.stringify(data));
                //console.log("hello data read");
                //console.log(data);
                self.issuedBookListArray(serverData);
                issuedArray=serverData;
                
        });
    	this.issuedBookListArray =ko.observableArray();
        this.returnBook = function(index ,viewModel) {
            $( document ).trigger( "updateModel", {viewModel: [viewModel], remove: false});
            self.issuedBookListArray.splice(index,1);
            issuedArray = self.issuedBookListArray();           

        }
    }
       	

    $( document ).on( "updateIssueList", function( event, options) {
    	for(var i=0; i<options.viewModel.length; i++) {
    		options.viewModel[i].btnRemove = false;
    	}
    	self.issuedBookListArray(self.issuedBookListArray().concat(options.viewModel));
        issuedArray = self.issuedBookListArray();
    });

    ko.applyBindings(issuedBooksViewModel(), document.getElementById('issued-books'));

        
});
