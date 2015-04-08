jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Result", {
	onInit : function() {

	},
	
	showMenu : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter").getURL("Navigation"));
	},
	handleLiveChange : function (oEvent){
		var label = this.byId("rangeLabel");
		label.setText(oEvent.getSource().getValue()*0.1+" km Umkreis");
	},
	handleMapPress : function (oEvent){
		var source = oEvent.getSource();
		if (source.getText() == "Kartenansicht" ){
			source.setText("Listenansicht");
			source.setIcon("sap-icon://menu2");
		} else {
			source.setText("Kartenansicht");
			source.setIcon("sap-icon://map-2");
		}
	}

});