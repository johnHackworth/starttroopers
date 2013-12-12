Crafty.c('CharCreatorView', {
  perkHTML: "<div class='perk'>%PERK%</div>",
  hobbieHTML: "<div class='hobbie'>%HOBBIE%</div>",
  statsHTML: "<div class='stats'>"+
  "<div class='statCol'>" +
  "<div class='stat business'>Business Knowledge <span>%BUSINESS%</span></div>" +
  "<div class='stat marketing'>Marketing <span>%MARKETING%</span></div>" +
  "<div class='stat productDesign'>Product Design <span>%PRODUCTDESIGN%</span></div>" +
  "<div class='stat visualDesign'>Visual Design <span>%VISUALDESIGN%</span></div>" +
  "<div class='stat qa'>Quality Assurance <span>%QA%</span></div>" +
  "</div><div class='statCol'>" +
  "<div class='stat backend'>Backend development <span>%BACKEND%</span></div>" +
  "<div class='stat frontend'>Frontend development <span>%FRONTEND%</span></div>" +
  "<div class='stat architecture'>Data architecture <span>%ARCHITECTURE%</span></div>" +
  "<div class='stat operations'>Operations <span>%OPERATIONS%</span></div>" +
  "</div>" +
  "</div>",
  personalStatsHTML: "<div class='personalStats'>"+
  "<div class='statCol'>" +
  "<div class='stat negotiation'>Negociation <span>%NEGOTIATION%</span></div>" +
  "<div class='stat sociability'>Sociability <span>%SOCIABILITY%</span></div>" +
  "<div class='stat learning'>Learning <span>%LEARNING%</span></div>" +
  "<div class='stat attention'>Attention <span>%ATTENTION%</span></div>" +
  "<div class='stat scouting'>Scouting <span>%SCOUTING%</span></div>" +

  "</div>" +
  "</div>",
  hobbieHTML: "<div class='hobbie'>%HOBBIE%</div>",
  perkHTML: "<div class='perk'>%PERK%</div>",
  nameHTML: '<div class="nameContainer"><input id="name" value="%NAME%"></input></div>',
  init: function() {
    this.requires('2D, DOM, HTML, Faces');
    this.hobbieViews = [];
    this.attr({w:1200, h: 800, x: 0, y: 0});
    this.person = new tr.models.Person({});
    this.person.scoutLevel = 0;
    this.randomizePeople();
    this.otherFaces = [];
    this.showPersonFace();
    this.renderButtoner();
    this.renderName();
    this.renderChecks();
    this.renderRandomButton();
    this.createTitle();
    this.renderBackButton();
    this.renderNextButton();
    // window.creator = this;
  },
  createTitle: function() {
    this.charTitle = Crafty.e('HeaderText');
    this.charTitle.setName('Your character', 'Choose your look and your stats');
    this.charTitle.attr({x: 10, y: 10})
    this.charTitle.render();
  },
  personSet: function(gene, value) {
    var pos = this.person.DNA.map[gene];
    this.person.DNA.chromosomes[pos] += value;
    if(this.person.DNA.chromosomes[pos] >= this.person.DNA.maxs[pos]) {
      this.person.DNA.chromosomes[pos] = 0;
    }
    if(this.person.DNA.chromosomes[pos] < 0) {
      this.person.DNA.chromosomes[pos] = this.person.DNA.maxs[pos] -1;
    }
    this.showPersonFace();
  },
  showPersonFace: function() {
    this.personFace && this.personFace.destroy();
    this.personFace = this.createOtherFace(this.person, 475, 160);
    this.personFace.setSize(250)
    this.personFace.overrideClick(function(){})
  },
  renderButtoner: function() {
    var buttons = ['sex','background','haircolor',
      'face','eyes','nose','mouth','hair','clothes',
      'facialfeatures','beard','glasses']
    var self = this;
    var i = 0;
    for(var b in buttons) {
      this['button'+buttons[b]] = Crafty.e('Button');
      this['button'+buttons[b]].set({
        color: '#333333',
        text: "next " + buttons[b],
        y: 200 + 30 * Math.floor(i/2),
        x: 300 + (i%2) * 500,
        z: 99999999999,
        onClick: this.createButtonResponse(buttons[b])
      })
      i++;
    }
  },
  createButtonResponse: function(button) {
    var self = this;
    return function() {
      self.personSet(button, 1)
    }
  },
  renderName: function() {
    var self = this;
    this.nameInput = Crafty.e('2D, DOM, HTML, Keyboard')
      .attr({x: 300, y: 50, w:600, h:40, z:99999999999})
      .append(
        this.nameHTML
          .replace(/%NAME%/g, this.person.name)
      )
    document.getElementById('name').addEventListener('keyup', function() {
      self.person.name = this.value;
    })
  },
  renderChecks: function() {
    var self = this;
    this.designCheck = Crafty.e('PropertyCheckbox, creatorProp')
    this.designCheck.assignFreeText('Design');
    this.designCheck.assignValue('design')
    this.designCheck.attr({x: 350, y: 120, w: 150, h: 30});
    this.designCheck.assignGroup('mainInterest');
    this.designCheck.render();
    this.designCheck.bind('change', function() {self.person.setInterest('design')});
    this.designCheck.select()
    this.designCheck.trigger('change')

    this.engineeringCheck = Crafty.e('PropertyCheckbox, creatorProp')
    this.engineeringCheck.assignFreeText('Engineer');
    this.engineeringCheck.assignValue('engineering')
    this.engineeringCheck.attr({x: 550, y:120, w: 150, h: 30});
    this.engineeringCheck.assignGroup('mainInterest');
    this.engineeringCheck.render();
    this.engineeringCheck.bind('change', function() {self.person.setInterest('engineering')});

    this.businessCheck = Crafty.e('PropertyCheckbox, creatorProp')
    this.businessCheck.assignFreeText('Business');
    this.businessCheck.assignValue('business')
    this.businessCheck.attr({x: 750, y: 120, w: 150, h: 30});
    this.businessCheck.assignGroup('mainInterest');
    this.businessCheck.render();
    this.businessCheck.bind('change', function() {self.person.setInterest('business')});
  },
  renderStats: function() {
    if(!this.statsView) this.statsView = Crafty.e('2D, DOM, HTML');
    this.statsView.attr({
      x: 0,
      y: 450,
      h: 400,
      w: 1000
    }).replace(
      this.completeText(this.statsHTML)
    )
  },
  renderPersonalStats: function() {
    if(!this.personalStatsView) this.personalStatsView = Crafty.e('2D, DOM, HTML');
    this.personalStatsView.attr({
      x: 700,
      y: 450,
      h: 400,
      w: 500
    }).replace(
      this.completeText(this.personalStatsHTML)
    )
  },
  completeText: function(param) {
    var text = param;
    for(var n in this.person) {
      text = text.replace(new RegExp('%'+n.toUpperCase()+'%','g'), this.person.getStat(n))
    }
    return text;
  },
  randomizePeople: function() {
    // this.person.randomizeInterest();
    this.person.randomizePersonalStats();
    this.person.randomizeStudies();
    this.person.randomizeExperience();
    this.person.randomizeHobbies();
    this.renderStats();
    this.renderPersonalStats();
    this.renderHobbieViews();
    this.renderPerkViews();
  },
  renderRandomButton: function() {
    this.randomButton = Crafty.e('Button');
    this.randomButton.set({
        color: 'rgb(247, 146, 114)',
        text: "I'm feeling lucky",
        y: 600,
        x: 550,
        z: 99999999999,
        onClick: this.randomizePeople.bind(this)
    })
  },
  renderHobbieViews: function() {
    if(!this.hobbiesTitle) this.hobbiesTitle = Crafty.e('2D, DOM, HTML');
    this.hobbiesTitle.attr({
      x: 300,
      y: 710
    }).replace("<div class='hobbiesTitle'>Hobbies</div>");
    var i = 0;
    for(var n in this.hobbieViews) {
      this.hobbieViews[n].replace('').destroy();
    }
    for(var n in this.person.hobbies) {
      var hobbieView = Crafty.e('2D, DOM, HTML');
      hobbieView.attr({
        x: 400 + (i * 110),
        y: 710,
        w: 90,
        h: 25
      }).append(
        this.hobbieHTML
        .replace(/%HOBBIE%/g, this.person.hobbies[n])
      )
      i++;
      this.hobbieViews.push(hobbieView);
    }
  },
  renderPerkViews: function() {
    if(!this.perksTitle) this.perksTitle = Crafty.e('2D, DOM, HTML');
    this.perksTitle.attr({
      x: 300,
      y: 750
    }).replace("<div class='perksTitle'>Perks</div>");
    if(!this.perkViews) this.perkViews = [];
    var i = 0;
    for(var n in this.perkViews) {
      this.perkViews[n].replace('').destroy();
    }
    for(var n in this.person.perks) {
      var perkView = Crafty.e('2D, DOM, HTML');
      perkView.attr({
        x: 400 + (i * 110),
        y: 750,
        w: 90,
        h: 40
      }).append(
        this.perkHTML
        .replace(/%PERK%/g, this.person.perks[n])
      )
      i++;
      this.perkViews.push(perkView);
    }
  },
  renderBackButton: function() {
    this.backButton = Crafty.e('Button');
    this.backButton.set({
        color: 'rgb(215, 48, 39)',
        text: "Back to menu",
        y: 750,
        x: 25,
        z: 99999999999,
        onClick: function() {
          Crafty.trigger('MainMenuSelected')
        }
    })
  },
  renderNextButton: function() {
    var self = this;
    this.nextButton = Crafty.e('Button');
    this.nextButton.set({
        color: 'rgb(26, 152, 80)',
        text: "Start!",
        y: 750,
        x: 1050,
        z: 99999999999,
        onClick: function() {
          tr.app.director.createWorld(self.person)
          Crafty.trigger('OfficeSelected');
        }
    })
  }
})
