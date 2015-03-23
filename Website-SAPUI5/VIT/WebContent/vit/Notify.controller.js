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
	valueHelpPressed : function(oEvent) {
		this.inputId = oEvent.oSource.sId;
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
			var productInput = this.getView().byId(this.inputId);
			productInput.setValue(oSelectedItem.getTitle());
		}
		evt.getSource().getBinding("items").filter([]);
	},
	__handleValueHelpCancel : function(evt) {
	}
});