jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Result", {
	onInit : function() {

	},

	showMenu : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Navigation"));
	},
	handleLiveChange : function(oEvent) {
		var label = this.byId("rangeLabel");
		label.setText(oEvent.getSource().getValue() * 0.1 + " km Umkreis");
	},
	
	goToHome: function(oEvent){
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Home"));
	},
	
	handleBackPress : function(oEvent){
		window.history.go(-1);
	}

});