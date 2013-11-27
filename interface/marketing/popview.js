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
    this.renderNewUsers();
  },
  renderVisits: function() {
    this.visitsView = Crafty.e('BarGraph');
    this.visitsView.attr({
      x:50,
      y:80,
      w: 20 + 30*35,
      h: 200
    });
    var visits = this.company.product.visits;
    var origin = visits.length - 30;
    var end = origin + 30;
    if(origin < 0) origin = 0;
    this.visitsView.set({values: visits.slice(origin, end),
      title: "Last 30 days visits"
    });
  },
  renderNewUsers: function() {
    this.visitsView = Crafty.e('BarGraph');
    this.visitsView.attr({
      x:50,
      y:300,
      w: 20 + 30*35,
      h: 200
    });
    var newUsers = this.company.product.newUsers;
    var origin = newUsers.length - 30;
    var end = origin + 30;
    if(origin < 0) origin = 0;
    this.visitsView.set({values: newUsers.slice(origin, end),
      title: "Last 30 days new accounts",
      barColor: '#2266CC'
    });
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  }
})
