Crafty.c('OfficeFloor', {
  init: function() {
    this.requires('DOM, Text, Color');
    this.attr({w:1190, h:790, x: 5, y: 5})
    this.color('rgb(104,104,204)');
    this.company = tr.app.director.company;
    this.render();
    this.createPersons();
    this.createStatusBar();
    this.createCompanyLog();
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  },
  createPersons: function() {
    this.personViews = [];
    var i = 0;
    for(var n in this.company.people) {
      var personView = Crafty.e('Person');
      personView.assignPerson({
        person: this.company.people[n],
        x: 30 + i * 110,
        y: 70
      })
      i++
      this.personViews.push(personView);
    }
  },
  createStatusBar: function() {
    this.statusBar = Crafty.e('StatusBar');
  },
  createCompanyLog: function() {
    this.companyLog = Crafty.e('LogView');
    this.companyLog.setOptions({
      x: 650,
      y: 70,
      logged: this.company,
      title: "What's happening?",
      h: 100,
      w: 500
    });
    this.companyLog.render()
    this.company.on("newTurn", this.companyLog.render.bind(this.companyLog))
  }
})
