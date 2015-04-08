sap.ui.controller("vit.Home", {
	onInit : function() {

		var oTable = this.byId("dashboard");
		$.getJSON("json/meldung.json", function(data) {
			for (var i = 0; i < data.meldungen.length; i++) {
				var row = new sap.m.ColumnListItem();
				row.addCell(new sap.m.Text({
					text : data.meldungen[i].line
				}));
				row.addCell(new sap.m.Text({
					text : data.meldungen[i].direction,
					textAlgin: "center"
				}));
				row.addCell(new sap.m.Text({
					text : "+" + data.meldungen[i].delay,
					styleClass: "delay"
				}));
				
				var time = new Date();
				var timeArray = data.meldungen[i].uAbfahrt.split(":");
				var delayArray = data.meldungen[i].delay.split(":");
				
				time.setUTCHours(timeArray[0]- 2 + delayArray[0]);
				time.setUTCMinutes(timeArray[1]+ delayArray[1]);
				
				console.log(time);
				
				row.addCell(new sap.m.ObjectIdentifier({
					title : time.getHours() + ":" + time.getMinutes(),
					text: data.meldungen[i].stop
					
				}));
				// console.log(data.meldungen[i].line);
				oTable.addItem(row);
			}

		});

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