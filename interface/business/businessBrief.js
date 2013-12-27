Crafty.c('BusinessBrief', {
  businessHTML: "<div class='businessData'>"+
  "<div class='title'>Business Briefing</div>"+
  "</div>",
  finantialStatusHTML: '<div class="finantialStatus">'+
  "<div class='title'>Company expenses</div>"+
  "<div class='finantialLine'>Payroll ...........<span>%PAYROLL%$</span></div>"+
  "<div class='finantialLine'>Advertising .......<span>%ADVERTISING%$</span></div>"+
  "<div class='finantialLine'>Infrastructure ....<span>%INFRASTRUCTURE%$</span></div>"+

  "</div>",
  init: function() {
    this.requires('2D, DOM, Color, Faces');
    this.attr({w:1190, h:790, x: 5, y: 5});
    this.color('rgb(104,154,104)');
    this.person = tr.app.director.selectedId;
    this.company = tr.app.director.company;
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.renderHeader();
    this.renderBriefing();
    this.renderInvestors();
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
  renderBriefing: function() {
    this.briefing = Crafty.e('2D, DOM, HTML');
    this.briefing.attr({
      x:20,
      y:150,
      w:1000,
      h:200
    })
    this.briefing.append(
      this.finantialStatusHTML
        .replace(/%PAYROLL%/g, this.company.getPayroll())
        .replace(/%ADVERTISING%/g, this.company.getAdvertisingFunds())
        .replace(/%INFRASTRUCTURE%/g, this.company.getInfrastructureFunds())
    )
  },
  renderInvestors: function() {
    this.investorList = Crafty.e('InvestorList')
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  }
})
