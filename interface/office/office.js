Crafty.c('OfficeFloor', {
  orderMethod: 'basicOrder',
  init: function() {
    var orderMethod = localStorage.getItem('officeOrder');
    if(orderMethod) {
      this.orderMethod = orderMethod;
    }
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
    this.createOrderButtons();
    this.bind('Remove', this.delete.bind(this));
    this.bind('sizeChange', this.refresh.bind(this));
  },
  refresh: function() {
    Crafty.trigger('OfficeSelected')
  },
  delete: function() {
    this.company.off('newHire')
    this.company.off('removePerson')
    this.company.off('newTurn');
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  },
  checkCurrentPeopleSize: function(size) {
    if(this.currentPeopleSize != size) {
      this.currentPeopleSize = size;
      this.trigger('sizeChange');
    }
  },
  getPeopleSize: function() {

    if(this.company.people.length < 10
      && !this.orderMethod == 'professionOrder') {
      this.checkCurrentPeopleSize(1);
      return 130;
    }
    if(this.company.people.length < 20
      && !this.orderMethod == 'professionOrder') {
      this.checkCurrentPeopleSize(2);
      return 125;
    }
    if(this.company.people.length < 30
      && !this.orderMethod == 'professionOrder') {
      this.checkCurrentPeopleSize(3);
      return 100;
    }
    if(this.company.people.length < 50) {
      this.checkCurrentPeopleSize(4);
      return 75;
    }
    this.checkCurrentPeopleSize(5);
    return 60;
  },
  basicOrder: function(i) {
    var size =  this.getPeopleSize();
    var peopleInARow = 1 + Math.floor(800 / (size + (size/2)));
    this.teamTitleTexts = [];
    for(var n in this.company.people) {
      this.company.people[n].personViewY = 110 + (size + 20) * Math.floor(n/peopleInARow);
      this.company.people[n].personViewX = 30 + (size + (size/2)) * (n % peopleInARow);
    }

  },
  professionOrder: function() {
    var designers = [];
    var engineers = [];
    var business = [];
    var nPeople = {
      'design': 0,
      'engineering': 0,
      'business': 0
    }
    var nextPos = 0;
    var interest = ''
    for(var n in this.company.people) {
      nPeople[this.company.people[n].mainInterest]++;
    }

    var size =  this.getPeopleSize();
    var peopleInARow = 1 + Math.floor(800 / (size + (size/2)));

    var designerRows = Math.ceil(nPeople['design'] / peopleInARow)
    var engineerAndDesignerRows = designerRows + Math.ceil(nPeople['engineering'] / peopleInARow)
    this.teamTitleTexts = [];
    if(nPeople['design']) {
      this.teamTitleTexts.push({
        "title": "Design Team",
        "pos": 60
      })
    }
    if(nPeople['engineering']) {
      this.teamTitleTexts.push({
        "title": "Engineering Team",
        "pos": 110 + 50 + (size + 20) * designerRows - 50
      })
    }
    if(nPeople['business']) {
      this.teamTitleTexts.push({
        "title": "Business Team",
        "pos": 110 + 100 + (size + 20) * engineerAndDesignerRows - 50
      })
    }
    nPeople = {
      'design': 0,
      'engineering': 0,
      'business': 0
    }
    for(var n in this.company.people) {
      var i = nPeople[this.company.people[n].mainInterest];
      nPeople[this.company.people[n].mainInterest]++;
      var origin = 110;
      var interest = this.company.people[n].mainInterest;

      if(interest == 'engineering') {
        origin = 110 +50 + (size + 20) * designerRows;

      }
      if(interest == 'business') {
        origin = 110 + 100 + (size + 20) * engineerAndDesignerRows;
      }
      this.company.people[n].personViewY = origin + (size + 20) * Math.floor(i/peopleInARow);
      this.company.people[n].personViewX = 30 + (size + (size/2)) * (i % peopleInARow);
    }
  },
  destroyTeamTitles: function() {
    for(var i in this.teamTitles) {
      this.teamTitles[i].destroy();
    }
  },
  paintTeamTitles: function() {
    this.destroyTeamTitles();
    this.teamTitles = [];
    for(var i in this.teamTitleTexts) {
      var title = Crafty.e("2D, DOM, HTML");
      title.replace('<div class="teamTitle">'+this.teamTitleTexts[i].title+'</div>')
        .attr({
          x: 30,
          y: this.teamTitleTexts[i].pos,
          w: 600
        })
      this.teamTitles.push(title);
    }
  },
  createPersons: function() {
    if(!this.ordered) {
      this[this.orderMethod](this.i);
      this.ordered;
    }
    this.paintTeamTitles();
    for(var n in this.company.people) {
      var personView = Crafty.e('Person');
      personView.assignPerson({
        person: this.company.people[n],
        x: this.company.people[n].personViewX,
        y: this.company.people[n].personViewY
      })
      personView.setSize(this.getPeopleSize());
      this.personViews.push(personView);
    }
    this.company.on('newHire', this.addNewHire.bind(this));
    this.company.on('removePerson', this.removePerson.bind(this));
  },
  removePerson: function(person) {
    for(var n in this.personViews) {
      if(this.personViews[n].person == person) {
        this.personViews[n].destroy();
      }
    }
  },
  addNewHire: function(person) {
    var personView = Crafty.e('Person');
    this[this.orderMethod]();
    personView.assignPerson({
      person: person,
      x: person.personViewX,
      y: person.personViewY
    })
    personView.setSize(this.getPeopleSize());
    this.personViews.push(personView);
    this.setPeopleOrdered();
  },
  setPeopleOrdered: function() {
    this.paintTeamTitles();
    for(var n in this.personViews) {
      this.personViews[n].goToLocation()
    }
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
        x: 1095,
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
  createOrderButtons: function() {
    var self = this;
    this.professionOrderButton = Crafty.e('2D, DOM, HTML, Mouse')
      .attr({
        x: 5,
        y: 765,
        w: 130,
        h: 20,
        z: 9999999999
      })
      .replace('<div class="orderMenuButton">Order by dept.</div> ' )
      .bind('Click', function() {
        self.changeOrderMethod('professionOrder')
      })
    this.basicOrderButton = Crafty.e('2D, DOM, HTML, Mouse')
      .attr({
        x: 145,
        y: 765,
        w: 130,
        h: 20,
        z: 9999999999
      })
      .replace('<div class="orderMenuButton">No order</div> ' )
      .bind('Click', function() {
        self.changeOrderMethod('basicOrder')
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
          function(progressBubble, n, m, personView) {
            if(!lastHours || !self || !m || !personView){
              return;
            }
            return function() {
              progressBubble.set({
                workType: m,
                workAmount: personView.person.lastHours[m] * 1,
                x: personView.x + tr.randInt(100),
                y: personView.y + tr.randInt(100)
              })
            }
          })(progressBubble, n, m, self.personViews[n]),
          tr.randInt(2000)
        );
      }
    }
  },
  changeOrderMethod: function(methodName) {
    this.orderMethod = methodName;
    localStorage.setItem('officeOrder', methodName);
    this[this.orderMethod]();
    this.setPeopleOrdered();
  }
})
