Crafty.c('StatusBar', {
  init: function() {
    this.requires('2D, DOM, Color');
    this.attr({w:1200, h:45, x: 0, y: 0})
    this.company = tr.app.director.company;
    this.color('#333333')
    this.checks = Crafty.e('WarningChecks');
    this.checks.set({company: this.company});
    this.createNextButton();
    this.createProductButton();
    this.createProjectCompletion();
    this.createBusinessButton();
    this.createIndustryButton();
    this.createMarketingButton();
    this.createDateContainer();
    this.createMoneyContainer();
    this.createNotificationCounter();
    this.createHistoryBrowser();
    this.render();

    this.bindNotificationCreated = this.company.on('notificationCreated', this.checkNotificationPopUp.bind(this));
    this.bindNotificationClose = this.company.on('notificationClose', this.updateNotificationCounter.bind(this))
    this.bind('Remove', this.delete.bind(this));
  },
  delete: function() {
    this.company.off('notificationCreated', this.bindNotificationCreated)
    this.company.off('notificationClose', this.bindNotificationClose)
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
    if(this.projectCompletionBar) {
      this.projectCompletionBar.render();
    }
    this.renderTurn();
  },
  createNextButton: function() {
    this.firstButton = Crafty.e('Button');
    this.firstButton.set({
      color: 'rgb(26, 152, 80)',
      text: "Next Turn",
      y: 5,
      x: 5,
      hintText: 'Finish the current turn',
      onClick: this.nextTurn.bind(this)
    })
  },
  createOfficeButton: function() {
    this.firstButton = Crafty.e('Button');
    this.firstButton.set({
      color: '#7777CC',
      text: "Main Office",
      y: 5,
      x: 5,
      hintText: 'Back to the office screen',
      onClick: this.backToOffice.bind(this)
    })
  },
  createProductButton: function() {
    this.productButton = Crafty.e('Button');
    this.productButton.set({
      color: 'rgb(140, 206, 138)',
      text: "Product View",
      hintText: 'Product and projects screen',
      y: 5,
      x:420,
      onClick: this.productView.bind(this)
    })
  },
  createBusinessButton: function() {
    this.businessButton = Crafty.e('Button');
    this.businessButton.set({
      color: 'rgb(255, 242, 204)',
      text: "Business View",
      hintText: 'Money related issues',
      y: 5,
      x:530,
      onClick: this.businessView.bind(this)
    })
  },
  createMarketingButton: function() {
    this.marketingButton = Crafty.e('Button');
    this.marketingButton.set({
      color: 'rgb(247, 146, 114)',
      text: "Marketing View",
      hintText: 'Promote your product!',
      y: 5,
      x:640,
      onClick: this.marketingView.bind(this)
    })
  },
  createIndustryButton: function() {
    this.industryButton = Crafty.e('Button');
    this.industryButton.set({
      color: 'rgb(215, 48, 39)',
      text: "Industry View",
      hintText: 'Companies and people building the net!',
      y: 5,
      x:750,
      onClick: this.industryView.bind(this)
    })
  },
  industryView: function() {
    Crafty.trigger('JobOffersSelected')
  },
  productView: function() {
    Crafty.trigger('ProductSelected');
  },
  businessView: function() {
    Crafty.trigger('BusinessSelected');
  },
  marketingView: function() {
    Crafty.trigger('MarketingSelected');
  },
  backToOffice: function() {
    Crafty.trigger('OfficeSelected');
  },
  createProjectCompletion: function() {
    this.projectCompletionBar = Crafty.e('ProjectCompletion');
    // debugger;
    this.projectCompletionBar.setCompany({company: this.company})
  },
  createDateContainer: function() {
    this.dateContainer = Crafty.e('2D, DOM, HTML');
    this.dateContainer.attr({
      x:1000,
      y:10,
      w:190,
      h:30
    })
  },
  createMoneyContainer: function() {
    var self = this;
    this.moneyContainer = Crafty.e('2D, DOM, HTML');
    this.moneyContainer.attr({
      x: 900,
      y: 10,
      w: 100,
      h: 30
    })
    this.moneyContainer.render = function() {
      this.replace('<div class="statusMoney">'+Math.floor(self.company.cash)+"$</div>");
    }
  },
  renderTurn: function() {
    if(this.dateContainer) {
      var date = tr.turnToDate(this.company.currentTurn).toString().substr(0,15);
      this.dateContainer.replace('<div class="statusBarTurn">Today is '+ date+'</div>')
    }
    if(this.moneyContainer) {
      this.moneyContainer.render();
    }
  },
  nextTurn: function() {
    this.company.turn();
    this.checks.checkOngoingProjectsPeople();
    this.checks.checkOngoingProjectsPeopleActive();
    this.render();
    this.trigger('newTurn')
  },
  createNotificationCounter: function() {
    this.notificationCounter = Crafty.e('NotificationCounter');
    this.notificationCounter.attr({
      x: 120,
      y: 5
    })
    this.notificationCounter.assignCompany(this.company);
    this.notificationCounter.render();
  },
  updateNotificationCounter: function() {
    this.notificationCounter.render();
  },
  checkNotificationPopUp: function(notif) {
    this.updateNotificationCounter();
    if(notif.autoOpen) {
      this.notificationCounter.createPopUp(notif);
    }
  },
  createHistoryBrowser: function() {
    this.historyBrowser && this.historyBrowser.destroy();
    this.historyBrowser = Crafty.e('HistoryBrowser');
  }
})
