define(function (require) {

	var $ = require('jquery');
	var ko = require('knockout-3.4.0');



	var passwordCtrl = document.getElementById('password');
	var userNameCtrl = document.getElementById('username');
	var rememberMeCtrl =$(':checkbox');

	var loginSuccess = false;

	

	// function login () {
	// 	if(rememberMe.value) {
	// 		if (typeof(Storage) !== "undefined") {
 //    			console.log("hi");
	// 		} else {
 //    			alert("rememberMe functionality is not suppoerted");
	// 		}
	// 	}

	// };



	rememberMeCtrl.change(function(){
		var bool = rememberMeCtrl.prop('checked');
		if(typeof(Storage) !== "undefined" && bool) {
			localStorage.setItem('rememberMe', bool);
			localStorage.setItem('password',self.password());
			localStorage.setItem('username',self.username());			
		}
	});

	var checkLogin = function() {
		if(self.username()!= undefined && self.password() != undefined && self.username()!= "" && self.password() != "") {
				this.enableLogin(true);
		} else {
			this.enableLogin(false);
		}
		self.update("");
	}

	function loginViewModel() {
		var self =this;
		this.update = ko.observable();
		this.username = ko.observable();
		this.password = ko.observable();
		this.enableLogin=ko.observable(false);

		if (typeof(Storage) !== "undefined") {

		if(localStorage.getItem('rememberMe') != undefined && localStorage.getItem('rememberMe')!=undefined && 
			localStorage.getItem('rememberMe')) {
			this.password(localStorage.getItem('password'));
			this.username(localStorage.getItem('username'));
			rememberMeCtrl.prop('checked', localStorage.getItem('rememberMe'));
			this.enableLogin(true);
		}
    	
		} 


		this.username.subscribe(function(){
			checkLogin();
		});

		this.password.subscribe(function(){
			checkLogin();
		})

		this.doLogin = function() {
			$.get("/library/models/profile.json", function(data, status) {
                
                serverData = JSON.parse(JSON.stringify(data));
                
               
                    for(var i=0; i<serverData.profiles.length; i++) {                         
                        if (serverData.profiles[i].userId === self.username() 
                        && serverData.profiles[i].password === self.password()) {
                        	loginSuccess =true;
                    		localStorage.setItem("userRole", serverData.profiles[i].role);
                    		userRole = serverData.profiles[i].role;
                    		if(localStorage.getItem("username") != self.username() && rememberMeCtrl.prop('checked')) {
                    			var bool = rememberMeCtrl.prop('checked');
                    			localStorage.setItem('rememberMe', bool);
								localStorage.setItem('password',self.password());
								localStorage.setItem('username',self.username());		

                    		}

                    	}
                    }

                    if(loginSuccess && userRole && userRole !="") {
                    	location.replace("/library/main.html");                    	
                    } else if(!loginSuccess) {
                    	self.update("Invalis credentials")
                    }              
               
            });
			
		}


	}

	ko.applyBindings(loginViewModel(),document.getElementById('login-window'));

});