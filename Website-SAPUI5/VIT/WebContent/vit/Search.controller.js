jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Search", {

	inputId : "",

	onInit : function() {
		sap.ui.localResources("fragment");
		
		jQuery.ajax({
              type : "GET",
              contentType : "application/json",
              url : "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
              dataType : "json",
              data: { location: "-33.8670522,151.1957362", radius: "500", types: "transit_station", key: "AIzaSyCjbccUJz5zW9FXnbo0oErrbgfw4M6Wyfg" },
              success : function(data) {
                  console.log(data);
              }

          });
		
		
		
		
		
		
	},
	showMenu : function(oEvent) {
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter")
				.getURL("Navigation"));
	},

	handleSearchPress : function(oEvent) {

	},
	handleAddFavPress : function(oEvent) {

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
			if (this.inputId == this.byId("inputStart")) {
				this.byId("inputDestination").setEnabled(true);
			}else{
				this.enableFields(this.inputId);
			}
		}
	},
	__handleValueHelpCancel : function(evt) {
	},

	locationChanged : function(oEvent) {
		if (oEvent.getSource().getValue() != "") {
			this.byId("inputDestination").setEnabled(true);

		} else {
			this.byId("inputDestination").setEnabled(false);
			this.byId("SelectTransportation").setEnabled(false);
			this.byId("SelectStop").setEnabled(false);
			this.byId("SelectDirection").setEnabled(false);
			this.byId("ButtonSearch").setEnabled(false);
			this.byId("ButtonAddFavorite").setEnabled(false);
		}
	},
	
	destinationChanged : function(oEvent){
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

});