define(function (require) {
    var $ = require('jquery');
    var ko = require('knockout-3.4.0');  
    
    //console.log("HI  registering book list components");
    

    ko.components.register('book-media-control', {
        //this.imgSrc= "http://placehold.it/250x250";
    	viewModel: function (options){
            var self =this;
            this.bookAuthor = options.items.author || "authorName";
            //this.copies = options.items.copies || 0; 
            this.bookImgSrc = options.items.imgSrc || "http://placehold.it/250x250";
            this.bookId = options.items.bookId;
            this.pageId = options.items.pageId;
            this.category = options.items.category;
            if(options.items.hasOwnProperty('btnRemove')) {
              this.btnRemove = options.items.btnRemove;
            } else {
              this.btnRemove = true;
            }
            this.removeBook = function(index, viewModel) {
                //viewModel.copies( viewModel.copies() - 1);
                $( document ).trigger( "updateBookList", {viewModel: viewModel, remove:true, index: index});
            };  		
    	},
        
        template:
           '<div class="media space" style="margin-top: 1em;">\
              <a class="media-left" href="#">\
                <img class="media-object" src="#" alt="image" data-bind="attr:{src: bookImgSrc}">\
                </img>\
              </a>\
              <div class="media-body">\
              <h4 class="media-heading" data-bind="text: bookAuthor"></h4>\
              This is book media item\
              <button type="button" class="btn btn-danger"data-bind="click: removeBook.bind($data, $index()), visible: btnRemove">Remove</button>\
            </div>\
          </div>'
    });
});