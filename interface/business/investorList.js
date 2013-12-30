Crafty.c('InvestorList', {
  investorHTML: '<div class="investor"><div class="name">%NAME%</div></div>',
  init: function() {
    this.investors = tr.app.director.world.investors;
    this.renderInvestors();
  },
  renderInvestors: function() {
    var i = 0;
    for(var n in this.investors) {
      var investor = Crafty.e('2D, DOM, HTML, Mouse')
        investor.attr({
        x:620,
        y:150 + i * 40,
        w:400,
        h:40,
        z: 999999
      })
      investor.append(
        this.investorHTML
        .replace(/%NAME%/g, this.investors[n].name)
      );
      investor.bind('Click', this.createInvestorClickResponse(this.investors[n]).bind(this));
      var name = investor.name
      // module.bind('Click', this.createModuleClickResponse(this.product.modules[n]));
      var knowledgeProgressBar = Crafty.e('ProgressBar');
      knowledgeProgressBar.setOptions({
        w: 50,
        h: 12,
        y: 152 + 40*i,
        x: 900
      });
      knowledgeProgressBar.setValue(this.investors[n].knowledgeAboutTheCompany);
      var hypeAboutTheCompanyBar = Crafty.e('ProgressBar');
      hypeAboutTheCompanyBar.setOptions({
        w: 50,
        h: 12,
        y: 152 + 40*i,
        x: 960
      });
      hypeAboutTheCompanyBar.setValue(this.investors[n].hypeAboutTheCompany);
      var companyPerceptionBar = Crafty.e('ProgressBar');
      companyPerceptionBar.setOptions({
        w: 50,
        h: 12,
        y: 152 + 40*i,
        x: 1020
      });
      companyPerceptionBar.setValue(this.investors[n].companyPerception);

      i++;
    }
  },
  createInvestorClickResponse: function(investor) {
    var localInvestor = investor;
    return (function() {
      tr.app.director.selectedId = localInvestor;
      Crafty.trigger('InvestorSelected');
    }).bind(this);
  },

})
