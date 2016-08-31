define(function (require) {

    //var checkoutBook = require('./../checkoutBookList');
    var $ = require('jquery');
    //var checkoutList = require('./../checkoutBookList');
    var ko = require('knockout-3.4.0');
        
    //var bootstrap = require('bootstrap');
    
    //console.log("HI  registering components");
    

    ko.components.register('boxart-control', {
        //this.imgSrc= "http://placehold.it/250x250";
    	viewModel: function (options){
            var self =this;
            this.author = options.items.author || "authorName";
            this.copies = options.items.copies || 0; 
            this.imgSrc = options.items.imgSrc;
            this.bookId = options.items.bookId;
            this.pageId = options.items.pageId;
            this.category = options.items.category;
            this.btnIssue = ko.observable(options.items.copies()>0);
            this.issueBook = function(viewModel) {
                viewModel.copies( viewModel.copies() - 1);
                self.btnIssue(viewModel.copies()>0);
                $( document ).trigger( "updateBookList", {viewModel: viewModel});
                // var checkoutBookModel = checkoutBookList.book({author: viewModel.author, imgSrc: viewModel.imgSrc});
                // checkoutBooksArray.push(checkoutBookModel);
            };  		
    	},
        
        template:
           '<div class="col-lg-3">\
                <a href="#x" class="thumbnail">\
                <img src= "#" alt="Image" style="max-width:100%;" data-bind="attr:{src: imgSrc}">\
                    <div style="display: inline-flex">\
                        <div > Author : </div> \
                        <div data-bind = "text: author"></div>\
                    </div>\
                    <div style="display: inline-flex">\
                        <div > Available Copies : </div> \
                        <div data-bind = "text: copies"></div>\
                    </div>\
                    <div style = "padding-left: 3em;">\
                    <button type="button" class="btn btn-primary" data-bind="click: issueBook, enable: btnIssue">Issue Book</button>\
                    </div>\
                </img>\
                </a>\
            </div>'
    });
});