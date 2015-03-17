jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Home", {
	onInit : function() {

	},
	handleSearchPress : function(oEvent) {
		var app = sap.ui.getCore().byId("shellArea" + "--" + "myApp");
		app.to("shellArea" + "--" + "searchPage");
	},
	handleNotifyPress : function(oEvent) {
		var app = sap.ui.getCore().byId("shellArea" + "--" + "myApp");
		app.to("shellArea" + "--" + "notifyPage");
	},
	handleChange: function(oEvent){
		
	}

});