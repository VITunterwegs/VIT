jQuery.sap.require("sap.m.MessageToast");

sap.ui
		.controller(
				"vit.Search",
				{

					inputId : "",

					onInit : function() {
						sap.ui.localResources("fragment");
						
						var oModel = new sap.ui.model.json.JSONModel();
						var aData = jQuery
								.ajax({
									type : "GET",
									contentType : "application/json",
									url : "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=48.993670,8.402181&radius=500&types=train_station&key=AIzaSyAsy-TRO4W8zmOdK3Epk3p4jAJ3IniJwzw",
									dataType : "json",
									success : function(data, textStatus, jqXHR) {
										oModel.setData({
											modelData : data
										});
									}

								});
						
						
						
						this.setModel(oModel);

					},
					showMenu : function(oEvent) {
						var oHashChanger = new sap.ui.core.routing.HashChanger();
						oHashChanger.setHash(sap.ui.core.routing.Router
								.getRouter("appRouter").getURL("Navigation"));
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
							var productInput = this.getView()
									.byId(this.inputId);
							productInput.setValue(oSelectedItem.getTitle());
						}
						evt.getSource().getBinding("items").filter([]);
					},
					__handleValueHelpCancel : function(evt) {
					}

				});