define(function (require) {
	  var $ = require('jquery');
	  var ko = require('knockout-3.4.0');

	  //console.log("entering checkout segment");

	  var pageId= "CheckoutList";

	function book (options) {
		this.author = options.author;
		this.imgSrc = options.imgSrc;
		this.bookId = options.bookId;
		this.pageId = pageId; 
		this.category = options.category;
	};

	var checkoutBooksViewModel = function() {
		var self = this;
		this.checkoutBooksArray = ko.observableArray();
		this.enableAllCheckout = ko.observable(checkoutBooksArray>0);
		$( document ).on( "updateBookList", function( event, options) {
    	//console.log( event );
    		if (options.remove && options.viewModel.pageId === pageId) {
    			self.checkoutBooksArray.splice(options.index,1);
				$( document ).trigger( "updateBrowsePanel", {viewModel: options.viewModel});
    		} else if(options.viewModel.pageId === pageId){
       			self.checkoutBooksArray.push(new book({author:options.viewModel.author, imgSrc:options.viewModel.imgSrc(), bookId:options.viewModel.bookId, category:options.viewModel.category}));
       		}

       		//self.enableAllCheckout(self.checkoutBooksArray().length>0);        
		});

		this.checkoutBooks = function() {
			$( document ).trigger( "updateIssueList", {viewModel: self.checkoutBooksArray()});
			$( document ).trigger( "updateModel", {viewModel: self.checkoutBooksArray(), remove: true});
			self.checkoutBooksArray.removeAll();
		}

		this.checkoutBooksArray.subscribe(function() {
			self.enableAllCheckout(self.checkoutBooksArray().length>0);
		})
	};

	 ko.applyBindings(checkoutBooksViewModel(),document.getElementById('checkout'));
});