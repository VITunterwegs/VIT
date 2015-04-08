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
	handleMapPress : function(oEvent) {
		var source = oEvent.getSource();
		if (this.map == null) {
			this.map = new sap.m.Image({
				src : "img/dummy.png",
				width : "100%",
				height : "100%"
			});
		}
		
		console.log(sap.ui.getCore().myList);

		if (source.getText() == "Kartenansicht") {
			this.liste = this.byId("contentBox").getItems();
			this.byId("contentBox").removeAllItems();
			source.setText("Listenansicht");
			source.setIcon("sap-icon://menu2");
			this.byId("contentBox").addItem(this.map);
		} else {
			this.byId("contentBox").removeAllItems();
			source.setText("Kartenansicht");
			source.setIcon("sap-icon://map-2");
			this.byId("contentBox").addItem(this.liste[0]);
		}
	}

});