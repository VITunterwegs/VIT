sap.ui.controller("vit.Shell", {
	onInit : function() {
		
	},

	handlePressConfiguration : function(oEvent) {
		var oItem = oEvent.getSource();
		var oShell = sap.ui.getCore().byId("vMain" + "--" + "shell");
		var bState = oShell.getShowCurtainPane();
		oShell.setShowCurtainPane(!bState);
		oItem.setShowMarker(!bState);
		oItem.setSelected(!bState);
	},

	

});