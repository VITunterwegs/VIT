jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Search", {
	onInit : function() {

	},
	showMenu : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter").getURL("Navigation"));
	}


});