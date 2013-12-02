Crafty.c("IndustryHubView", {
  init: function() {
    this.requires('DOM, Text, Color, IndustryButtoner');
    this.attr({w:1200, h:700, x: 0, y: 0})
    this.color('rgba(200,200,200,.85)');
    this.company = tr.app.director.company;
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.createIndustryButtoner();
  },


})
