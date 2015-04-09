jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Search", {

	inputId : "",

	onInit : function() {
		sap.ui.localResources("fragment");

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


	handleSearchPress : function(oEvent) {
		var resultList = sap.ui.getCore().byId("vMain--pResult--resultTable");
		resultList.removeAllItems();
		
		var items = sap.ui.getCore().byId("vMain--pHome--dashboard").getItems();
		var dirLin = this.byId("SelectDirection").getSelectedItem().getText();
		var stop = this.byId("SelectStop").getSelectedItem().getText();
		var linArr = dirLin.split("-");
		linArr[0] = linArr[0].slice(6, linArr[0].length-1);
		linArr[1] = linArr[1].slice(1, linArr[1].length);
		
		for (var i =0 ; i < items.length; i++){
			var cells = items[i].getCells();
			var line = cells[0].getText();
			var dir = cells[1].getText();
			var stopDash = cells[3].getText();
			
			
			if ((line == linArr[0]) &&
					(dir == linArr[1]) && (stop == stopDash)){
				resultList.addItem(items[i]);
			}
		}

		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Result"));		

	},
	handleAddFavPress : function(oEvent) {
		var lineDir = this.byId("SelectDirection").getSelectedItem().getText();
		var input = new sap.m.Input({
			id: "favNam",
			placeholder: "Bitte benennen sie ihren Favoriten"
		});
		jQuery.sap.require("sap.m.MessageBox");
		sap.m.MessageBox.confirm(input, {
			icon: sap.m.MessageBox.Icon.INFORMATION,
			title: "Name des Favoriten",
			actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
		});
		
		var oListItem = new sap.m.StandardListItem({
			description : lineDir,
			title : input.getText(), //MessageBox
			type : "Active"
		});

		switch (this.byId("SelectTransportation").getSelectedItem().getText()) {
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
		sap.ui.getCore().byId("vMain--pFavorites--favList").addItem(oListItem);
		sap.m.MessageToast.show("Favorit wurde gespeichert");
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
	},

	_handleValueHelpConfirm : function(evt) {
		var oSelectedItem = evt.getParameter("selectedItem");
		if (oSelectedItem) {
			this.inputId.setValue(oSelectedItem.getTitle());
				this.byId("inputStart").setEnabled(true);
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
			this.byId("ButtonSearch").setEnabled(true);
			this.byId("ButtonAddFavorite").setEnabled(true);
		} else {
			this.byId("SelectTransportation").setEnabled(false);
			this.byId("SelectStop").setEnabled(false);
			this.byId("SelectDirection").setEnabled(false);
			this.byId("ButtonSearch").setEnabled(false);
			this.byId("ButtonAddFavorite").setEnabled(false);
		}
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
			var select = "Duale Hochschule";

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