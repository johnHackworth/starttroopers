Crafty.c('POPsView', {
  init: function() {
    this.requires('DOM, Text, Color');
    this.attr({w:1200, h:700, x: 0, y: 0})
    this.color('rgba(104,155,155,.85)');
    this.company = tr.app.director.company;
    this.render();
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.renderVisits();
  },
  renderVisits: function() {
    this.visitsView = Crafty.e('BarGraph');
    this.visitsView.attr({
      x:50,
      y:80,
      w: 30*30,
      h: 120
    });
    var visits = this.company.product.visits;
    var origin = visits.length - 30;
    var end = origin + 30;
    if(origin < 0) origin = 0;
    this.visitsView.set(visits.slice(origin, end));
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  }
})
