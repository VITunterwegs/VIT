sap.ui.controller("vit.Impressum", {
	onInit : function() {

		jQuery.ajax({
			type : "GET",
			contentType : "text/html",
			url : "vit//impressum/kontakt.html",
			dataType : "html",
			async : false,
			success : function(response) {
				sap.ui.getCore().byId(
						"vMain" + "--" + "pImpressum" + "--" + "kontakt")
						.setContent(response.toString());
			}
		});
		
		
		jQuery.ajax({
			type : "GET",
			contentType : "text/html",
			url : "vit//impressum/register.html",
			dataType : "html",
			async : false,
			success : function(response) {
				sap.ui.getCore().byId(
						"vMain" + "--" + "pImpressum" + "--" + "register")
						.setContent(response.toString());
			}
		});
		
		
		jQuery.ajax({
			type : "GET",
			contentType : "text/html",
			url : "vit//impressum/haftungsausschluss.html",
			dataType : "html",
			async : false,
			success : function(response) {
				sap.ui.getCore().byId(
						"vMain" + "--" + "pImpressum" + "--" + "disclaimer")
						.setContent(response.toString());
			}
		});
		
		

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
	}

});