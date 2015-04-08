jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Favorites", {
	onInit : function() {

		// Load Favorites

		oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("json/favoriten.json");

		var oList = this.byId("oList");

		oList.setModel(oModel);

		var oItemTemplate = new sap.ui.core.ListItem({
			text : "Linie {line} - {direction}",
			icon: "img/bus.jpg"
		});

		oList.bindItems("/favoriten", oItemTemplate);

	},

	showMenu : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Navigation"));
	}

});