define(function (require) {
    
    var ko = require('knockout-3.4.0');
    var $ = require('jquery');
    
    var navigatorPageId = "CheckoutList"; // to add  items in the checkout list from the browse section
    var eachCarouselCard = 4;

    var categoryArray = [];

    var serverData;

    this.boxArtModels = [
        {
            category : "Mathematics",
            dataArray : [new boxArtModel({
            author: "R.S.Agarwal",
            copies: "5",
            imgSrc: "res/math.jpg",
            bookId: 0,
            category: "Mathematics"
            }),
            new boxArtModel({
            author: "R.S.Agarwal",
            copies: "5",
            imgSrc: "res/math.jpg",
            bookId: 1,
            category: "Mathematics"
            }),
            new boxArtModel({
            author: "R.S.Agarwal",
            copies: "5",
            imgSrc: "res/math.jpg",
            bookId: 2,
            category: "Mathematics"
            }),
            new boxArtModel({
            author: "R.S.Agarwal",
            copies: "5",
            imgSrc: "res/math.jpg",
            bookId: 3,
            category: "Mathematics"
            }),
            new boxArtModel({
            author: "R.S.Agarwal",
            copies: "5",
            imgSrc: "res/math.jpg",
            bookId: 4,
            category: "Mathematics"
            })]
        }
    ];

    var getBrowsedataFromServer = function () {
        $.get("/library/models/browseModel.json", function(data, status) {
                serverData = null;
                categoryArray =[];
                serverData = JSON.parse(JSON.stringify(data));
                console.log("hello data read");
                console.log(data);
                for(var i =0; i<data.model.length; i++) {
                    for(var j=0; j<data.model[i].dataArray.length; j++) {
                        data.model[i].dataArray[j] = new boxArtModel( data.model[i].dataArray[j]);
                    }
                }
                carouselCategory(data.model);
                self.carouselArray(categoryArray);
            });
    }

    var prepareCategory = function(categoryItem) {        
        var index = 0;
        var carouselArray = [];
        var carouselItems = Math.ceil(categoryItem.dataArray.length/eachCarouselCard);
        for(var i=0; i<carouselItems; i++) {
            carouselArray.push(categoryItem.dataArray.slice(index, eachCarouselCard + index));
            index = index + 4;
        };

        categoryArray.push({ category: categoryItem.category, dataArray: carouselArray , hrefId: "#"+categoryItem.category})

    };

    var carouselCategory = function(options) {
        var arrayItems = options;
        var Index = 0;
            for(var i=0; i<arrayItems.length; i++) {
                //categoryArray.push(arrayItems[i])
                prepareCategory(arrayItems[i]);
            }

    };

    var sendData = function(options) {
        $.ajax({
        type: "POST",
        dataType : 'json',
        url: 'save_data.php',
        data: { data: JSON.stringify(options) },
        complete: function () { 
            getBrowsedataFromServer();},
        failure: function() { }
        });

        console.log("data loaded");

    };
    
    function boxArtModel (options) {
    	this.author = options.author;
    	this.copies = ko.observable(options.copies || 0);
    	this.imgSrc = ko.observable(options.imgSrc || "http://placehold.it/250x250");
        this.bookId =options.bookId;
        this.pageId = navigatorPageId;
        this.category = options.category;
    }
    

    $( document ).on( "updateBrowsePanel", function( event, options) {
        console.log("updating browse panel");
        for(var i=0; i<self.carouselArray().length; i++) {
            if(self.carouselArray()[i].category === options.viewModel.category) {
                for(var k = 0; k<self.carouselArray()[i].dataArray.length; k++) {
                    for(var j = 0; j<self.carouselArray()[i].dataArray[k].length; j++) {
                        console.log("hello updating browse panel");
                        if(self.carouselArray()[i].dataArray[k][j].bookId === options.viewModel.bookId) {
                            self.carouselArray()[i].dataArray[k][j].copies(self.carouselArray()[i].dataArray[k][j].copies()+1);
                        }
                    }
                }
            }
        }
        //self.boxArtModels.slice()
        // self.boxArtModels.slice(options.viewModel.bookId, options.viewModel.bookId+1)[0].copies(
        //                 self.boxArtModels.slice(options.viewModel.bookId, options.viewModel.bookId+1)[0].copies() + 1);

    });

    $( document ).on("updateModel" , function(event, options) {

        for(var i=0; i<options.viewModel.length; i++) {
            var dataUpdated = false;
            for(var j=0; j<serverData.model.length; j++) {
                for(var k = 0; k<serverData.model[j].dataArray.length; k++) {
                    if(!dataUpdated && serverData.model[j].dataArray[k].bookId === options.viewModel[i].bookId ) {
                        if(options.remove) {
                            serverData.model[j].dataArray[k].copies = serverData.model[j].dataArray[k].copies - 1;
                        } else {
                            serverData.model[j].dataArray[k].copies = serverData.model[j].dataArray[k].copies + 1;
                        }

                        dataUpdated = true;
                    }
                    
                }
            }
        }

        sendData(serverData);
        //setTimeout(getBrowsedataFromServer,500);
        //getBrowsedataFromServer();

    }); 

    $( document ).on("addNewItems", function(event,options) {
        //console.log("adding new items");        
        for(var j=0; j<options.viewModel.length; j++) {
            var dataAdded = false;
            for(var i =0; i<serverData.model.length; i++) {                
                if(options.viewModel[j].category === serverData.model[i].category) {
                    serverData.model[i].dataArray.push(JSON.parse(JSON.stringify(options.viewModel[j])));
                    dataAdded= true;
                }
            }
            if(!dataAdded) {
                serverData.model.push({ category : options.viewModel[j].category, 
                    dataArray: [JSON.parse(JSON.stringify(options.viewModel[j]))] });
            }
        }

       sendData(serverData);
       //setTimeout(getBrowsedataFromServer,500);

    });

    function categoryModel () {
        var self = this;
        getBrowsedataFromServer();
        //carouselCategory(boxArtModels);
        this.carouselArray = ko.observableArray([]);
        this.computeActive = function (index) {
            if(index() === 0) {
                return "active";
            }
            return "";
        }
    }

    ko.applyBindings(categoryModel(), document.getElementById('browseSegment'));


});