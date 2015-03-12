jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("vit.Home", {
  onInit: function() {
	  
  },

  handlePressConfiguration: function(oEvent) {
    var oItem = oEvent.getSource();
    var oShell = this.getView().byId("myShell");
    var bState = oShell.getShowPane();
    oShell.setShowPane(!bState);
    oItem.setShowMarker(!bState);
    oItem.setSelected(!bState);
  },

  handleLogoffPress: function(oEvent) {
    sap.m.MessageToast.show("Logoff Button Pressed");
  },

  handleHomePressed: function(oEvent) {
    sap.m.MessageToast.show("Home Button Pressed");
  },
  
  handleSearchItemSelect: function(oEvent) {
    sap.m.MessageToast.show("Search Entry Selected: " + oEvent.getSource().getTitle());
  },

  handleShellOverlayClosed: function() {
    sap.m.MessageToast.show("Overlay closed");
  },


});