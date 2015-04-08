jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Notify", {
	onInit : function() {

		// Haltestellen

		var oModelStops = new sap.ui.model.json.JSONModel();
		oModelStops.loadData("json/stops.json");

		var SelectStop = this.byId("SelectStop");

		SelectStop.setModel(oModelStops);

		var oItemTemplate = new sap.ui.core.Item({
			text : "{name}"
		});
		SelectStop.bindItems("/haltestellen", oItemTemplate);

		// Transportmittel

		var oModelTransport = new sap.ui.model.json.JSONModel();
		oModelTransport.loadData("json/transportation.json");

		var SelectTransportation = this.byId("SelectTransportation");
		SelectTransportation.setModel(oModelTransport);

		var oItemTemplate2 = new sap.ui.core.Item({
			text : "{name}"
		});
		SelectTransportation.bindItems("/transportmittel", oItemTemplate2);

	},
	handleLocatePress : function(oEvent) {

	},
	handleSendNotificationPress : function(oEvent) {
		var transport = this.byId("SelectTransportation").getSelectedItem()
				.getText();
		var stop = this.byId("SelectStop").getSelectedItem().getText();
		var lineDir = this.byId("SelectDirection").getSelectedItem().getText();
		var lineDirArr = lineDir.split("-");
		lineDirArr[0] = lineDirArr[0].slice(6, lineDirArr[0].length - 1);
		lineDirArr[1] = lineDirArr[1].slice(1, lineDirArr[1].length);

		var delay = this.byId("SelectDelay").getDateValue();
		var date = new Date(delay);
		var delayArr = date.toString().split(":");
		var sliceString = delayArr[0].slice((delayArr[0].length - 2),
				delayArr[0].length);

		var arr = [];
		arr.line = lineDirArr[0];
		arr.direction = lineDirArr[1];
		arr.delay = sliceString + ":" + delayArr[1];
		arr.stop = stop;

		$.getJSON("json/stops.json", function(data) {
			var id
			for (var ii = 0; ii < data.haltestellen.length; ii++) {
				if (data.haltestellen[ii].name = arr.stop) {
					id = data.haltestellen[ii].id;
				}
			}

			$.getJSON("json/linien.json", function(data) {
				for (var jj = 0; jj < data.Linien.length; jj++){
					
					if ((data.Linien[jj].name == arr.line)&&
							(data.Linien[jj].Richtung == arr.direction)){
						for (var kk = 0; kk < data.Linien[jj].Haltestellen.length; kk++){
							if (data.Linien[jj].Haltestellen[kk].id == id){
								for (var mm = 0; mm < data.Linien[jj].Haltestellen[kk].times.length ; mm++){
									var stopTime = data.Linien[jj].Haltestellen[kk].times[mm].time;
									var nowDate = new Date();
									var timesArr = nowDate.toString().split(":");
									var nowTime = timesArr[0].slice((timesArr[0].length - 2),
											timesArr[0].length);
									nowTime = nowTime + ":" + timesArr[1];
									var compArrStop = stopTime.split(":");
									var compArrNow	= nowTime.split(":");
									
									if ( (parseInt(compArrStop[0]) == parseInt(compArrNow[0])) &&
										 (parseInt(compArrStop[1]) < parseInt(compArrNow[1] + 9))	&&
										 (parseInt(compArrStop[1]) > parseInt(compArrNow[1] - 9)) &&
										 (arr.uAbfahrt == null)){
										arr.uAbfahrt = data.Linien[jj].Haltestellen[kk].times[mm].time;
										sap.ui.getCore().myGlobalArray.push(arr);
										var row = new sap.m.ColumnListItem();
										row.addCell(new sap.m.Text({
											text : arr.line
										}));
										row.addCell(new sap.m.Text({
											text : arr.direction
										}));
										row.addCell(new sap.m.Text({
											text : arr.delay
										}));
										var time = new Date();
										var timeArray = arr.uAbfahrt.split(":");
										var delayArray = arr.delay.split(":");
										var hours = parseInt(timeArray[0])
												+ parseInt(delayArray[0] - 2);
										var minutes = parseInt(timeArray[1]) + parseInt(delayArray[1]);

										time.setUTCHours(hours);
										time.setUTCMinutes(minutes);

										var tArr = time.toLocaleTimeString().split(":");

										row.addCell(new sap.m.ObjectIdentifier({
											title : tArr[0] + ":" + tArr[1],
											text : arr.stop

										}));
										sap.ui.getCore().byId("vMain--pHome--dashboard").addItem(row);
										}

								}
							}
						}
					}
				}
			});
		});

		/*
		 * { "line":"3", "direction":"Heide", "delay":"00:05",
		 * "stop":"Kolpingplatz", "uAbfahrt":"12:35" }
		 */

	},
	showMenu : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Navigation"));
	},
	valueHelpPressed : function(oEvent) {
		this.inputId = oEvent.getSource();
		// create value help dialog
		if (!this._valueHelpDialog) {
			this._valueHelpDialog = new sap.ui.xmlfragment(
					"fragment.SelectDialog", this);
			this.getView().addDependent(this._valueHelpDialog);
		}

		// open value help dialog
		this._valueHelpDialog.open();
	},

	_handleValueHelpSearch : function(evt) {
		var sValue = evt.getParameter("value");
		var oFilter = new sap.ui.model.Filter("Name",
				sap.ui.model.FilterOperator.Contains, sValue);
		evt.getSource().getBinding("items").filter([ oFilter ]);
	},

	_handleValueHelpConfirm : function(evt) {
		var oSelectedItem = evt.getParameter("selectedItem");
		if (oSelectedItem) {
			this.inputId.setValue(oSelectedItem.getTitle());
			this.enableFields(this.inputId);
		}
	},
	__handleValueHelpCancel : function(evt) {
	},

	locationChanged : function(oEvent) {
		this.enableFields(oEvent.getSource());

	},

	enableFields : function(oControl) {
		if (oControl.getValue() != "") {
			this.byId("SelectTransportation").setEnabled(true);
			this.byId("SelectStop").setEnabled(true);
			this.byId("SelectDirection").setEnabled(true);
			this.byId("SelectDelay").setEnabled(true);

		} else {
			this.byId("SelectTransportation").setEnabled(false);
			this.byId("SelectStop").setEnabled(false);
			this.byId("SelectDirection").setEnabled(false);
			this.byId("SelectDelay").setEnabled(false);
			this.byId("SelectDelay").setValue("00:00");
			this.byId("ButtonReport").setEnabled(false);

		}
	},

	delayChanged : function(oEvent) {
		if (oEvent.getSource().getValue() != "00:00") {
			this.byId("ButtonReport").setEnabled(true);
		} else {
			this.byId("ButtonReport").setEnabled(false);
		}
	},
	
	goToHome: function(oEvent){
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Home"));
	},
	
handleStopChoose : function(){
		
		// Linie
		var oModelLines = new sap.ui.model.json.JSONModel();
		oModelLines.loadData("json/linien.json");
		
		var SelectDirection = this.byId("SelectDirection");
		SelectDirection.setModel(oModelLines);
		
		var selectedItem = this.byId("SelectStop").getSelectedItem().getText();
		
		this.byId("SelectDirection").removeAllItems();
		
		$.getJSON( "json/stops.json", function( data ) {
			var stops = [];
			var length_stop;
			this.stops = data.haltestellen;
			length_stop = data.haltestellen.length;
			
			var arrstops = [];
			
			for (var x=0; x < data.haltestellen.length ; x++){
				if (data.haltestellen[x].name == selectedItem){
					for (var y=0 ; y < data.haltestellen[x].linien.length ; y++){
						arrstops.push(data.haltestellen[x].linien[y].linie);
					}
				}
				
			}
			
			$.getJSON( "json/linien.json", function( data ) {
				
				var j_stop;
				var i_stop;
				for (i_stop=0; i_stop < data.Linien.length; i_stop++){
					for (j_stop=0; j_stop < arrstops.length; j_stop++){
						if (data.Linien[i_stop].name == arrstops[j_stop]){
							var oItem = new sap.ui.core.Item({
								text : "Linie "+data.Linien[i_stop].name+" - "+data.Linien[i_stop].Richtung
							});
							SelectDirection.addItem(oItem);
						}
					}
				}
			} );
		} );
		
		
		
	}

});