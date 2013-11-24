Crafty.c('StatusBar', {
  init: function() {
    this.requires('2D, DOM, Color');
    this.attr({w:1200, h:45, x: 0, y: 0})
    this.company = tr.app.director.company;
    this.color('#333333')
    this.render();
    this.createNextButton();
    this.createProductButton();
    this.createProjectCompletion();
    this.createBusinessButton();
    this.createDateContainer();
    this.createMoneyContainer();
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
      color: '#CCAA00',
      text: "Next Turn",
      y: 5,
        onClick: this.nextTurn.bind(this)
      })
    },
    createOfficeButton: function() {
      this.firstButton = Crafty.e('Button');
      this.firstButton.set({
        color: '#7777CC',
        text: "Main Office",
        y: 5,
        onClick: this.backToOffice.bind(this)
      })
    },
    createProductButton: function() {
      this.productButton = Crafty.e('Button');
      this.productButton.set({
        color: '#CC00AA',
      text: "Product View",
      y: 5,
      x:420,
      onClick: this.productView.bind(this)
    })
  },
  createBusinessButton: function() {
    this.businessButton = Crafty.e('Button');
    this.businessButton.set({
      color: '#00AA55',
      text: "Business View",
      y: 5,
      x:530,
      onClick: this.businessView.bind(this)
    })
  },
  productView: function() {
    Crafty.trigger('ProductSelected');
  },
  businessView: function() {
    Crafty.trigger('BusinessSelected');
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
      this.replace('<div class="statusMoney">'+self.company.cash+"$</div>");
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
    this.render();
  }
})
