jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Shell", {
	onInit : function() {

	},

	onSwipeLeft : function(oEvent) {
		handleSearchPress(oEvent);
	},
	
	
	handlePressConfiguration : function(oEvent) {
		var oItem = oEvent.getSource();
		var oShell = this.getView().byId("myShell");
		var bState = oShell.getShowPane();
		oShell.setShowPane(!bState);
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
	},
	
	handleMenuPress: function(oEvent){
		if(sap.ui.getCore().byId("shellArea" + "--" + "splitContainer").getShowSecondaryContent()){
			sap.ui.getCore().byId("shellArea" + "--" + "splitContainer").setShowSecondaryContent(false);
		}else{
			sap.ui.getCore().byId("shellArea" + "--" + "splitContainer").setShowSecondaryContent(true);
		}
	},

	closeMenu : function() {
		var oShell = this.getView().byId("shellArea" + "--" + "myShell");
		oShell.setShowPane(false);
		var oItem = this.getView().byId("shellArea" + "--" + "menuItem");
		oItem.setShowMarker(false);
		oItem.setSelected(false);

	}
});