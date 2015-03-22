var router = new sap.ui.core.routing.Router([
			{
				pattern : "",
				name : "Home",
				view : "vit.Home",
				viewType : sap.ui.core.mvc.ViewType.JSON,
				targetControl : "vMain" + "--" + "splitApp",
				targetAggregation : "detailPages", // content/Page
				clearTarget : false,
				callback : function() {
					sap.ui.getCore().byId("vMain" + "--" + "splitApp")
							.toDetail("vMain" + "--" + "pHome");
				}
			},
			{
				pattern : [ "notify", "Notify" ],
				name : "Notify",
				view : "vit.Notify",
				viewType : sap.ui.core.mvc.ViewType.JSON,
				targetControl : "vMain" + "--" + "splitApp",
				targetAggregation : "detailPages", // content/Page
				clearTarget : false,
				callback : function() {
					sap.ui.getCore().byId("vMain" + "--" + "splitApp")
							.toDetail("vMain" + "--" + "pNotify");
				}
			},
			{
				pattern : [ "search", "Search" ],
				name : "Search",
				view : "vit.Search",
				viewType : sap.ui.core.mvc.ViewType.JSON,
				targetControl : "vMain" + "--" + "splitApp",
				targetAggregation : "detailPages", // content/Page
				clearTarget : false,
				callback : function() {
					sap.ui.getCore().byId("vMain" + "--" + "splitApp")
							.toDetail("vMain" + "--" + "pSearch");
				}
			},
			{
				pattern : [ "navigation", "Navigation" ],
				name : "Navigation",
				view : "vit.Navigation",
				viewType : sap.ui.core.mvc.ViewType.JSON,
				targetControl : "vMain" + "--" + "splitApp",
				targetAggregation : "masterPages", // content/Page
				clearTarget : false,
				callback : function() {
					sap.ui.getCore().byId("vMain" + "--" + "splitApp")
							.backToPage("vMain" + "--" + "pNavigation");
					sap.ui.getCore().byId("vMain" + "--" + "splitApp")
							.showMaster();
				}
			},
			{
				pattern : [ "favorites", "Favorites" ],
				name : "Favorites",
				view : "vit.Favorites",
				viewType : sap.ui.core.mvc.ViewType.JSON,
				targetControl : "vMain" + "--" + "splitApp",
				targetAggregation : "detailPages", // content/Page
				clearTarget : false,
				callback : function() {
					sap.ui.getCore().byId("vMain" + "--" + "splitApp")
							.toDetail("vMain" + "--" + "pFavorites");
				}
			}

	]);

	router.register("appRouter");
	router.initialize();