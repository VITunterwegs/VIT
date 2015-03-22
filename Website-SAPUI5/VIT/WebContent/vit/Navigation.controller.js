jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Navigation", {
	onInit : function() {

	},
	
	handleFavoritesPress : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter").getURL("Favorites"));
	},
	handleHomePress : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter").getURL(""));
	},

	handleSearchPress : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter").getURL("Search"));
	},
	handleNotifyPress : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter").getURL("Notify"));
	},
	handleConfigPress: function(oEvent){
		
	},
	handleHelpPress: function(oEvent){
		
	},
	handleImpressumPress: function(oEvent){
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter").getURL("Impressum"));
	},
	navBack: function(oEvent){
		
	}

});