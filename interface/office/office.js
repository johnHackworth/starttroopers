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
    var y = 70;
    var x = 30;
    for(var n in this.company.people) {
      var personView = Crafty.e('Person');
      personView.assignPerson({
        person: this.company.people[n],
        x: x,
        y: y
      })
      x += 110;
      i++
      if(i % 6 === 0) {
        x = 30;
        y += 120;
      }
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
