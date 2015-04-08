sap.ui.controller("vit.Home", {
	onInit : function() {

		var oTable = this.byId("dashboard");
		$.getJSON("json/meldung.json", function(data) {
			
			console.log("vorher: "+sap.ui.getCore().myGlobalArray.length);
			
			if (sap.ui.getCore().myGlobalArray.length == 0) {
				for (var i = 0; i < data.meldungen.length; i++) {
					sap.ui.getCore().myGlobalArray.push(data.meldungen[i]);
				}
			}
			
			console.log("nachher: "+sap.ui.getCore().myGlobalArray.length);
			
			
			for (var j = 0; j < sap.ui.getCore().myGlobalArray.length; j++) {
				var row = new sap.m.ColumnListItem();
				row.addCell(new sap.m.Text({
					text : data.meldungen[j].line
				}));
				row.addCell(new sap.m.Text({
					text : data.meldungen[j].direction
				}));
				row.addCell(new sap.m.Text({
					text : "+" + data.meldungen[j].delay
				}));

				var time = new Date();
				var timeArray = data.meldungen[j].uAbfahrt.split(":");
				var delayArray = data.meldungen[j].delay.split(":");
				var hours = parseInt(timeArray[0])
						+ parseInt(delayArray[0] - 2);
				var minutes = parseInt(timeArray[1]) + parseInt(delayArray[1]);

				time.setUTCHours(hours);
				time.setUTCMinutes(minutes);

				var tArr = time.toLocaleTimeString().split(":");

				row.addCell(new sap.m.ObjectIdentifier({
					title : tArr[0] + ":" + tArr[1],
					text : data.meldungen[j].stop
				}));
				oTable.addItem(row);
			}

		});

	},
	
	onAfterRendering: function(){
		console.log("test");
	},

	handleSearchPress : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Search"));
	},
	handleNotifyPress : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Notify"));
	},
	showMenu : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Navigation"));
	},

});