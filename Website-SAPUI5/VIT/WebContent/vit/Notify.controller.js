jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Notify", {
	onInit : function() {

	},
	handleLocatePress : function(oEvent) {

	},
	handleSendNotificationPress : function(oEvent) {
	    	var url = "schoeneborn-online.de:7070/vit_server/SaveNotification?";
	    	url = url + "userID=1&"
	    				+ "" + sap.ui.getCore().byId("not_direction");
	    	var formData = {userid:"1",
	    			type:this.byId("SelectTransportation").getSelectedItem().getText(),
	    			stop:"TestHaltestelle",
	    			lastStop:"TestEndhaltestelle",
	    			line:"TestLinie",
	    			track:"TestTrack",
	    			direction:"TestDirection",
	    			originArr:"20140302020202",
	    			delay:"5",
	    			currArr:"20140302020202"}; //Array 
	    	 
	    	$.ajax({
	    	    url : "./vit_server/SaveNotification",
	    	    type: "POST",
	    	    data : formData,
	    	    success: function(data, textStatus, jqXHR)
	    	    {
	    	        //data - response from server
	    	    },
	    	    error: function (jqXHR, textStatus, errorThrown)
	    	    {
	    	    	
	    	    }
	    	});
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
		if(oEvent.getSource().getValue() != ""){
			this.byId("inputDestination").setEnabled(true);
		}else{
			this.byId("inputDestination").setEnabled(false);
		}

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