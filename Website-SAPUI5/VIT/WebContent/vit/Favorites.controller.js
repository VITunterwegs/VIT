sap.ui.controller("vit.Favorites", {
	onInit : function() {

		// Load Favorites

<<<<<<< HEAD
		var oList = this.byId("favList");
		$.getJSON("json/favoriten.json", function(data) {
			for (var i = 0; i < data.favoriten.length; i++) {
				var oListItem = new sap.m.StandardListItem({
					description : "Linie " + data.favoriten[i].line + " - "
							+ data.favoriten[i].direction,
					title : data.favoriten[i].favName,
					press: "handleFavPress"
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
		});

=======
		oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("json/favoriten.json");

		var oListen = sap.ui.getCore().byId("vMain--pFavorites--favList");

		oListen.setModel(oModel);

		var oItemTemplate = new sap.ui.core.ListItem({
			text : "Linie",
			icon: "img/bus.jpg"
		});

		//oListen.addItem(oItemTemplate);

>>>>>>> origin/master
	},

	showMenu : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Navigation"));
	},
	
	
	handleFavPress: function(oEvent){
		
	},

});