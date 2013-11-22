Crafty.c('BusinessBrief', {
  businessHTML: "<div class='businessData'>"+
  "<div class='title'>Business Briefing</div>"+
  "</div>",
  init: function() {
    this.requires('2D, DOM, Color, Faces');
    this.attr({w:1190, h:790, x: 5, y: 5});
    this.color('rgb(104,154,104)');
    this.person = tr.app.director.selectedPerson;

    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.renderHeader();
    this.render();
    this.buttons = [];
  },
  renderHeader: function() {
    this.productInfo = Crafty.e('2D, DOM, HTML');
    this.productInfo.attr({
      x:20,
      y:70,
      w:1000,
      h:200
    })
    this.productInfo.append(
      this.businessHTML
    )
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  }
})
