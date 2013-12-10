Crafty.c("CompanyListView", {
  companyHTML: '<div class="companyButton">%NAME%</div>',
  init: function() {
    this.requires('DOM, Text, Color, IndustryButtoner');
    this.attr({w:1200, h: 800, x: 0, y: 0})
    this.color('rgba(200,200,200,.85)');
    this.company = tr.app.director.company;
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.createTitle();
    this.createIndustryButtoner();
    this.renderCompanies();
  },
  createTitle: function() {
    this.currentJobOffersTitle = Crafty.e('HeaderText');
    this.currentJobOffersTitle.setName('Startups', 'Internet companies');
    this.currentJobOffersTitle.attr({x: 200})
    this.currentJobOffersTitle.render();
  },
  renderCompanies: function() {
    var companies = this.company.world.companies;
    var x = 200;
    var y = 200;
    for(var n in companies) {
      var companyView = Crafty.e('2D, DOM, HTML, Mouse')
        .attr({x: x, y: y, w:150, h:30})
        .replace(this.companyHTML
          .replace(/%NAME%/g, companies[n].name)
        )
        .bind('Click', this.createSelectCompany(companies[n]))
      x += 155;
      if(x > 1100) {
        x = 200;
        y += 50;
      }
    }
  },
  createSelectCompany: function(company) {
    var self = this;
    return function() {
      Crafty.trigger('CompanyViewSelected', company);
    }
  }
})
