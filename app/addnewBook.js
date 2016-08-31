define(function (require) {
    
    var $ = require('jquery');    
    var ko = require('knockout-3.4.0');
    var $form = require('jqueryForm');

    var pageId = "AddNewBook";
    

    var bookItemModel = function(options) {
    	this.category = options.category;
    	this.author = options.author;
    	this.copies = options.copies;
    	this.bookId = options.bookId;
        this.imgSrc = options.imgSrc;
        this.pageId = pageId;    	
    }

    var checkAddBtnEnable = function() {
        return self.bookCategory() != "undefined" && isNaN(self.author()) && self.copies() > 0
            && self.bookId() > 0;
    }
    var checkAddBtnEnableWithImg = function() {
        return self.bookCategory() != "undefined" && isNaN(self.author()) && self.copies() > 0
            && self.bookId() > 0 && self.imgSrc() != "";
    }
    var newBook = function () {
    	var self = this;
    	this.newBookArray = ["Mathematics", "Science", "Launguages", "Miscellaneous"];
    	this.copies = ko.observable();
    	this.author = ko.observable();
    	this.bookId = ko.observable();
    	this.bookCategory = ko.observable();
        this.imgSrc = ko.observable();
    	this.newBookListArray = ko.observableArray();
        this.enableAddBook = ko.observable(false);
        this.enableAddAllBook = ko.observable(false);
    	this.addBook = function() {
    		console.log("Adding book in list panel below");
    		self.newBookListArray.push(new bookItemModel({category: self.bookCategory(), copies: self.copies(),
    								 author: self.author(), bookId: self.bookId(), imgSrc: self.imgSrc()}));
            self.copies("");
            self.author("");
            self.bookId("");
            self.bookCategory("");
            self.imgSrc("");
            self.enableAddBook(false);
            document.getElementById('imgInput').value=""

    	};

        this.addAllBook = function () {
            $( document ).trigger('addNewItems',{viewModel: self.newBookListArray()});
            self.newBookListArray([]);
        };

        $( document ).on( "updateBookList", function( event, options) {
        //console.log( event );
            if (options.remove && options.viewModel.pageId === pageId) {
                self.newBookListArray.splice(options.index,1);
                //$( document ).trigger( "updateBrowsePanel", {viewModel: options.viewModel});
            }       
        });

        this.copies.subscribe(function() {
            self.enableAddBook(checkAddBtnEnableWithImg());
        });

        this.author.subscribe(function() {
             self.enableAddBook(checkAddBtnEnableWithImg());
        });

        this.bookId.subscribe(function() {
             self.enableAddBook(checkAddBtnEnableWithImg());
        });

        this.bookCategory.subscribe(function() {
             self.enableAddBook(checkAddBtnEnableWithImg());
        });

        this.newBookListArray.subscribe(function() {
            self.enableAddAllBook(self.newBookListArray().length>0);
        })
    	
    };

    // function readURL(input) {
    //     if (input.files && input.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = function (event) {
    //                 //$('#imagePreview').attr('src', event.target.result);
    //                 self.imgSrc(event.target.result);
    //             }
    //             reader.readAsDataURL(input.files[0]);
    //         }
    //     }
    $("#imgInput").change(function(){

        $("#imageUploadForm").submit();

        if(!checkAddBtnEnable()) {
            return;
        }

        self.enableAddBook(true);

        //$("#imageUploadForm").submit();        
    });

    $("#imageUploadForm").ajaxForm({
            complete: function(response) {
                //console.log(response.responseText);
                self.imgSrc(response.responseText);
            }
    }); 

        // $.ajax({
        // type: "POST",
        // dataType : 'image',
        // url: 'upload_image.php',
        // data: this.files[0],
        // success: function ( response) { 
        //     console.log(response);},
        // failure: function() {alert("Error!");}
        // });

            //readURL(this);

    

  

    // var bookList = function() {
    // 	var self = this;
    // 	//this.newbookArray = ko.observableArray();
    // };
    ko.applyBindings(newBook(), document.getElementById('add-new-books'));
    
 });
