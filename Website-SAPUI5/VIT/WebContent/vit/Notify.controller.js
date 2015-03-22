jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Notify", {
	onInit : function() {

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
	handleValueHelp : function(oController) {
		this.inputId = oController.oSource.sId;
		// create value help dialog
		if (!this._valueHelpDialog) {
			_valueHelpDialog = new sap.m.SelectDialog({
				"title" : "Standortauswahl",
				"class" : "sapUiPopupWithPadding",
				"search" : "_handleValueHelpSearch",
				"confirm" : "_handleValueHelpClose",
				"cancel" : "_handleValueHelpClose",
				"items" : [ {
					"Type" : "sap.m.StandardListItem",
					"icon" : "sap-icon://locate-me",
					"title" : "Standortdienst nutzen"
				} ]
			});
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

	_handleValueHelpClose : function(evt) {
		var oSelectedItem = evt.getParameter("selectedItem");
		if (oSelectedItem) {
			var productInput = this.getView().byId(this.inputId);
			productInput.setValue(oSelectedItem.getTitle());
		}
		evt.getSource().getBinding("items").filter([]);
	}

});