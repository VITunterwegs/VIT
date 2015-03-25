sap.ui.controller("vit.Shell", {
	onInit : function() {
		sap.ui.getCore().byId("vMain"+"--"+"splitApp").attachBrowserEvent("swiperight", function(oEvent){
			var oHashChanger = sap.ui.core.routing.HashChanger.getInstance();
			oHashChanger.setHash(sap.ui.core.routing.Router.getRouter("appRouter").getURL("Navigation"));
		});
		
		sap.ui.getCore().byId("vMain"+"--"+"splitApp").attachBrowserEvent("swipeleft", function(oEvent){
			var oHistory = sap.ui.core.routing.History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			// The history contains a previous entry
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var bReplace = true; // otherwise we go backwards with a forward history
				this.navTo(sRoute, mData, bReplace);
			}
		})
	},	

});