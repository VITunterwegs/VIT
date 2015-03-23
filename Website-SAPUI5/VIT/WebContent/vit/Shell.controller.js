sap.ui.controller("vit.Shell", {
	onInit : function() {
		sap.ui.getCore().byId("vMain"+"--"+"splitApp").attachBrowserEvent("swiperight", function(oEvent){
			var oHashChanger = new sap.ui.core.routing.HashChanger();
			oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter").getURL("Navigation"));
		})
	},	

});