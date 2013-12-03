Crafty.c('PersonContractSheet', {
  personalDataHTML: "<div class='socialData'>"+
  "<div class='name'>%NAME%'s social circle</div>"+
  "<div class='sociability'>Sociability: %SOCIABILITY%</div>"+
  "</div>",
  init: function() {
    this.requires('2D, DOM, Color, Faces, PersonProfileButtoner');
    this.attr({w:1200, h:700, x: 0, y: 0});
    this.color('rgb(104,154,104)');
    this.person = tr.app.director.selectedPerson;

    this.statusBar = Crafty.e('StatusBar, PersonProfileButtoner');
    this.statusBar.createOfficeButton();
    this.render();
    this.buttons = [];
    this.createPersonFace();
    this.createButtoner();
    this.renderPersonData();
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  },

  renderPersonData: function() {
    this.personalData = Crafty.e('2D, DOM, HTML');
    this.personalData.attr({
      x: 250,
      y: 70,
      w: 600,
      h: 300
    }).append(
      this.personalDataHTML
      .replace(/%NAME%/g, this.person.name)
      .replace(/%SOCIABILITY%/g, this.person.sociability)
    );
  },
  render: function() {
    for(var n in this.buttons) {
      this.buttons[n].render();
    }
  }

})
