sap.ui.controller("vit.Favorites", {
	onInit : function() {

		// Load Favorites

		var oListen = this.byId("favList");

		var oList = this.byId("favList");
		$.getJSON("json/favoriten.json", function(data) {
			for (var i = 0; i < data.favoriten.length; i++) {
				var oListItem = new sap.m.StandardListItem({
					description : "Linie " + data.favoriten[i].line + " - "
							+ data.favoriten[i].direction,
					title : data.favoriten[i].favName,
					type : "Active"
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
				oListItem.attachPress(function(oEvent){
					var resultList = sap.ui.getCore().byId("vMain--pResult--resultTable");
					resultList.removeAllItems();
					
					var items = sap.ui.getCore().byId("vMain--pHome--dashboard").getItems();
					var listItem = oEvent.getSource();
					var dirLin = listItem.getDescription();
					var linArr = dirLin.split("-");
					linArr[0] = linArr[0].slice(6, linArr[0].length-1);
					linArr[1] = linArr[1].slice(1, linArr[1].length);
					
					for (var i =0 ; i < items.length; i++){
						var cells = items[i].getCells();
						var line = cells[0].getText();
						var dir = cells[1].getText();
						if ((line == linArr[0]) &&
								(dir == linArr[1])){
							resultList.addItem(items[i]);
						}
					}
					var oHashChanger = new sap.ui.core.routing.HashChanger();
					oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
							.getURL("Result"));
					
				});
				oList.addItem(oListItem);
				
			}
		});

	},

	showMenu : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Navigation"));
	},
	
	goToHome: function(oEvent){
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Home"));
	},
	
	handleDeletePress : function(oEvent){
		 var oList = oEvent.getSource();
	      oItem = oEvent.getParameter("listItem");
	      oList.removeItem(oItem);
	}

});