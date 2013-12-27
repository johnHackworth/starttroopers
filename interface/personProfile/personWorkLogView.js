Crafty.c('PersonWorkLogView', {
  personalDataHTML: "<div class='socialData'>"+
  "<div class='name'>%NAME%'s work log</div>"+
  // "<div class='sociability'>Sociability: %SOCIABILITY%</div>"+
  "</div>",
  init: function() {
    this.requires('2D, DOM, Color, Faces, PersonProfileButtoner');
    this.attr({w:1200, h: 800, x: 0, y: 0});
    this.color('rgb(104,154,104)');
    this.person = tr.app.director.selectedId;
    this.company = tr.app.director.company;
    this.statusBar = Crafty.e('StatusBar, PersonProfileButtoner');
    this.statusBar.createOfficeButton();
    this.render();
    this.buttons = [];
    this.createPersonFace();
    this.createButtoner();
    this.renderPersonData();
    this.renderHours();
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
  renderHours: function() {
    this.hoursView = Crafty.e('BarGraph');
    this.hoursView.attr({
      x:50,
      y:290,
      w: 20 + 30*35,
      h: 200
    });
    var hours = this.person.hoursLog;
    var colors = {
      social: '#7799FF',
      unoccupied: '#CC4422',
      recruiting: '#AA9933',
      marketing: '#3399AA'
    }
    if(this.company) {
      for(var n in this.company.projects) {
        var proy = this.company.projects[n];
        colors[proy.name] = proy.color;
      }
    }
    this.hoursView.set({
      values: hours,
      title: "Last 30 days work log",
      topValue: 14,
      barColors: colors,
      barPadding: 5,
      barWidth: 30
    });
  },

  render: function() {
    for(var n in this.buttons) {
      this.buttons[n].render();
    }
  }
})
