jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Notify", {
	onInit : function() {
		
		
		//Haltestellen
		
		var oModelStops = new sap.ui.model.json.JSONModel();
		oModelStops.loadData("data/stops.json");
		
		var SelectStop = this.byId("SelectStop");
		
		SelectStop.setModel(oModelStops);
		
		var oItemTemplate = new sap.ui.core.Item({text:"{name}"});
		SelectStop.bindItems("/haltestellen", oItemTemplate);
		
		
		
		//Transportmittel
		
		var oModelTransport = new sap.ui.model.json.JSONModel();
		oModelTransport.loadData("data/transportation.json");
		
		
		var SelectTransportation = this.byId("SelectTransportation");
		SelectTransportation.setModel(oModelTransport);
		
		var oItemTemplate2 = new sap.ui.core.Item({text:"{name}"});
		SelectTransportation.bindItems("/transportmittel", oItemTemplate2);
		
		
		

	},
	handleLocatePress : function(oEvent) {

	},
	handleSendNotificationPress : function(oEvent) {
		
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
	
	locationChanged: function(oEvent){
		this.enableFields(oEvent.getSource());

	},
	
	enableFields: function(oControl){
		if(oControl.getValue() != ""){
			this.byId("SelectTransportation").setEnabled(true);
			this.byId("SelectStop").setEnabled(true);
			this.byId("SelectDirection").setEnabled(true);
			this.byId("SelectDelay").setEnabled(true);
			
		}else{
			this.byId("SelectTransportation").setEnabled(false);
			this.byId("SelectStop").setEnabled(false);
			this.byId("SelectDirection").setEnabled(false);
			this.byId("SelectDelay").setEnabled(false);
			this.byId("SelectDelay").setValue("00:00");
			this.byId("ButtonReport").setEnabled(false);
			
		}	
	},
	
	delayChanged: function(oEvent){
		if(oEvent.getSource().getValue() != "00:00"){
			this.byId("ButtonReport").setEnabled(true);
		}else{
			this.byId("ButtonReport").setEnabled(false);
		}
	}
	
	
});