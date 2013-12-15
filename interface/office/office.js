Crafty.c('OfficeFloor', {
  init: function() {
    this.requires('DOM, Text, Color');
    this.attr({w:1200, h: 800, x: 0, y: 0})
    this.color('rgba(64,64,84,.90)');
    this.company = tr.app.director.company;
    this.render();

    this.personViews = [];
    this.createPersons();
    this.createStatusBar();
    this.createCompanyLog();
    this.createMainMenuButton();
    this.bind('Remove', this.delete.bind(this));
  },
  delete: function() {
    this.company.off('newHire')
    this.company.off('newTurn');
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  },
  createPersons: function() {
    this.i = 0;
    this.personY = 110;
    this.personX = 30;
    for(var n in this.company.people) {
      var personView = Crafty.e('Person');
      personView.assignPerson({
        person: this.company.people[n],
        x: this.personX,
        y: this.personY
      })
      this.personX += 150;
      this.i++
      if(this.i % 6 === 0) {
        this.personX = 30;
        this.personY += 120;
      }
      this.personViews.push(personView);
    }
    this.company.on('newHire', this.addNewHire.bind(this));
  },
  addNewHire: function(person) {
    var personView = Crafty.e('Person');
    personView.assignPerson({
      person: person,
      x: this.personX,
      y: this.personY
    })
    this.personX += 150;
    this.i++
    if(this.i % 6 === 0) {
      this.personX = 30;
      this.personY += 120;
    }
    this.personViews.push(personView);
  },
  createStatusBar: function() {
    var self = this;
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.bind('newTurn', function() {
      self.turn()
    })
  },
  createCompanyLog: function() {
    this.companyLog = Crafty.e('LogView');
    this.companyLog.setOptions({
      x: 650,
      y: 100,
      logged: this.company,
      title: "What's happening?",
      h: 100,
      w: 500
    });
    this.companyLog.render()
    this.company.on("newTurn", this.companyLog.render.bind(this.companyLog))
  },
  createMainMenuButton: function() {
    this.mainMenuButton = Crafty.e('2D, DOM, HTML, Mouse')
      .attr({
        x: 5,
        y: 760,
        w: 100,
        h: 30,
        z: 9999999999
      })
      .replace('<div class="mainMenuButton">Main menu</div> ' )
      .bind('Click', function() {
        Crafty.trigger('MainMenuSelected')
      })
  },
  turn: function() {
    this.trigger('change:background')
    this.showProgrees();
  },
  showProgrees: function() {
    var self = this;
    for(var n in this.personViews) {
      var person = this.personViews[n].person;
      var lastHours = person.lastHours;
      for(var m in lastHours) {
        var progressBubble = Crafty.e('ProgressBubble');
        setTimeout((
          function(progressBubble, n, m) {
            return function() {
              progressBubble.set({
                workType: m,
                workAmount: lastHours[m] * 1,
                x: self.personViews[n].x + tr.randInt(100),
                y: self.personViews[n].y + tr.randInt(100)
              })
            }
          })(progressBubble, n, m),
          tr.randInt(2000)
        );
      }
    }
  }
})
