
sap.ui.controller("vit.Favorites", {
	onInit : function() {

		// Load Favorites

		oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("json/favoriten.json");

		var oList = sap.ui.getCore().byId("vMain--pFavorites--favList");

		oList.setModel(oModel);

		var oItemTemplate = new sap.ui.core.ListItem({
			text : "Linie",
			icon: "img/bus.jpg"
		});

		//oList.addItem(oItemTemplate);

	},

	showMenu : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Navigation"));
	}

});