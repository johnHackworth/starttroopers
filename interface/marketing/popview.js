Crafty.c('POPsView', {
  init: function() {
    this.requires('DOM, Text, Color, Faces');
    this.attr({w:1200, h: 800, x: 0, y: 0})
    this.color('rgba(104,155,155,.85)');
    this.company = tr.app.director.company;
    this.render();
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.renderVisits();
    this.renderResourcesButtons();
    this.renderNewUsers();
    this.renderHype();
    this.renderMarketingPeople(30, 560);
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
  renderResourcesButtons: function() {
    this.resourcesButton = Crafty.e('Button')
    this.resourcesButton.set({
      color: '#AAAA55',
      text: "Rersources",
      y:640,
      x:5,
      onClick: this.marketingResourcesView.bind(this)
    })
  },

  marketingResourcesView: function() {
    Crafty.trigger('MarketingResourcesSelected');
  },
  renderHype: function() {
    this.hypeView = Crafty.e('2D, DOM, HTML, hypeview');
    var hype = Math.floor(this.company.hype * 100) / 100;
    this.hypeView.append('<div class="title">Hype</div><div class="value">'+hype+'</div>');
    this.hypeView.attr({
      x: 1000,
      y: 640,
      w: 200,
      h: 60
    })
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  }
})
