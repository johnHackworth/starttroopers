Crafty.c('StatusBar', {
  init: function() {
    this.requires('2D, DOM, Color');
    this.attr({w:1200, h:45, x: 0, y: 0})
    this.company = tr.app.director.company;
    this.color('#333333')
    this.render();
    this.createNextButton();
    this.createProjectCompletion();
    this.createDateContainer();
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
    this.nextTurnButton = Crafty.e('Button');
    this.nextTurnButton.set({
      color: '#CCAA00',
      text: "NextTurn",
      y: 5,
      onClick: this.nextTurn.bind(this)
    })
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
  renderTurn: function() {
    if(this.dateContainer) {
      var date = tr.turnToDate(this.company.currentTurn).toString().substr(0,15);

      this.dateContainer.replace('<div class="statusBarTurn">Today is '+ date+'</div>')
    }
  },
  nextTurn: function() {
    this.company.turn();
    this.render();
  }
})
