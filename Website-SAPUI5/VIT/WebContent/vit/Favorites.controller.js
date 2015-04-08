sap.ui.controller("vit.Favorites", {
	onInit : function() {

		// Load Favorites

		var oListen = sap.ui.getCore().byId("vMain--pFavorites--favList");
		
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
		});

	},

	showMenu : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Navigation"));
	},
	
	
	handleFavPress: function(oEvent){
		
	},

});