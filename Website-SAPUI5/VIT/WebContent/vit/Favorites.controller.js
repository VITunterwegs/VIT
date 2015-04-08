
sap.ui.controller("vit.Favorites", {
	onInit : function() {

		// Load Favorites

		oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("json/favoriten.json");

		var oListen = sap.ui.getCore().byId("vMain--pFavorites--favList");
		console.log("Hallo1 " + oListen.toString());

		oListen.setModel(oModel);

		console.log("Hallo2 " + oListen.toString());
		
<<<<<<< HEAD
		var oList = this.byId("favList");
		$.getJSON("json/favoriten.json", function(data) {
			for (var i = 0; i < data.favoriten.length; i++) {
				var oListItem = new sap.m.StandardListItem({
					description : "Linie " + data.favoriten[i].line + " - "
							+ data.favoriten[i].direction,
					title : data.favoriten[i].favName,
					press: "handleFavPress",
					type: "Active"
				});

				switch (data.favoriten[i].transportation) {
				case "Bus":
					oListItem.setIcon("img/bus.jpg");
					break;
				case "Bahn":
					oListItem.setIcon("img/bahn.png");
					break;
				case "TRAM":
					oListItem.setIcon("img/tram.png");
					break;
				}

				oList.addItem(oListItem);
			}
=======
		var oItemTemplate = new sap.ui.core.ListItem({
			text : "Linie",
			icon: "img/bus.jpg"
>>>>>>> origin/master
		});
		console.log("Hallo Templae: "+oItemTemplate);
		console.log("Hallo3 " + oListen.toString());
		oListen.addItem(oItemTemplate);

	},

	showMenu : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Navigation"));
	}

});