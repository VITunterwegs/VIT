jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Shell", {
	onInit : function() {

	},

	 handlePressConfiguration: function(oEvent) {
		    var oItem = oEvent.getSource();
		    var oShell = sap.ui.getCore().byId("shellArea"+ "--" + "shell");
		    var bState = oShell.getShowCurtainPane();
		    oShell.setShowCurtainPane(!bState);
		    oItem.setShowMarker(!bState);
		    oItem.setSelected(!bState);
		  },

	handleFavoritesPress : function(oEvent) {
		var app = sap.ui.getCore().byId("shellArea" + "--" + "myApp");
		app.to("shellArea" + "--" + "favPage");
		sap.ui.getCore().byId("shellArea").getController().closeMenu();
	},
	handleHomePress : function(oEvent) {
		var app = sap.ui.getCore().byId("shellArea" + "--" + "myApp");
		app.to("shellArea" + "--" + "homePage");
		sap.ui.getCore().byId("shellArea").getController().closeMenu();
	},

	handleSearchPress : function(oEvent) {
		var app = sap.ui.getCore().byId("shellArea" + "--" + "myApp");
		app.to("shellArea" + "--" + "searchPage");
		sap.ui.getCore().byId("shellArea").getController().closeMenu();

	},
	handleNotifyPress : function(oEvent) {
		var app = sap.ui.getCore().byId("shellArea" + "--" + "myApp");
		app.to("shellArea" + "--" + "notifyPage");
		sap.ui.getCore().byId("shellArea").getController().closeMenu();
		handleMenuPress(oEvent);
	},
	
	closeMenu: function(oEvent){
		
	}

});