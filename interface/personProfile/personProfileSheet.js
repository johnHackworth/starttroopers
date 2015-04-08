Crafty.c('PersonProfileSheet', {
  positions: [{
    name:'visualDesign',
    text: 'Visual design'
  },
  {
    name: 'productDesign',
    text: 'Product design',
  },
  {
    name: 'front',
    text: 'Frontend dev.'
  },
  {
    name: 'back',
    text: 'Backend dev.'
  },
  {
    name: 'operations',
    text: 'Devops'
  },
  {
    name: 'architecture',
    text: 'Data architect'
  },
  {
    name: 'qa',
    text: 'Q.A.'
  }
  ],
  happinessArray: ['Very Unhappy', 'Unhappy', 'Content', 'Happy', 'Joyfull'],
  personalDataHTML: "<div class='personalData'>"+
  "<div class='name'>%NAME%</div>"+
  "<div class='company'>%COMPANY%</div>"+
  "<div class='mainInterest' data-interest=%INTEREST%>%INTEREST%</div>" +
  "<div class='happiness' data-happiness=%HAPPINESS%>%HAPPINESS%</div>" +
  "<div class='experience'>%EXPERIENCE% years of experience</div>" +
  "<div class='followers'>%FOLLOWERS% followers</div>" +
  "</div>",
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
  init: function() {
    this.requires('DOM, Text, Color, PersonProfileButtoner');
    this.attr({w:1200, h: 800, x: 0, y: 0})
    this.color('rgba(55,85,105, 0.90)');
    this.person = tr.app.director.selectedId;
    this.render();
    this.buttons = [];

    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.createPersonFace();
    this.createButtoner();
    this.renderPersonalData();
    this.renderStats();
    this.renderPersonalStats();
    if(this.person.company && this.person.company.human) {
      this.createPositionButtons()
    } else {
      this.createOtherCompanyButtons();
    }
    // this.person.on('change', function() {Crafty.scene('PersonProfile')})

  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  },

  redrawButtons: function() {
    for(var n in this.buttons) {
      this.buttons[n].render();
    }
  },
  renderPersonalData: function() {
    this.personalData = Crafty.e('2D, DOM, HTML');
    var happiness = this.happinessArray[Math.floor(this.person.happiness / 20)];
    var company = this.person.company? this.person.company.name : '';
    this.personalData.attr({
      x: 250,
      y: 70,
      w: 800,
      h: 300
    }).append(
      this.personalDataHTML
      .replace(/%NAME%/g, this.person.name)
      .replace(/%HAPPINESS%/g, happiness)
      .replace(/%INTEREST%/g, this.person.mainInterest)
      .replace(/%EXPERIENCE%/g, this.person.experience)
      .replace(/%FOLLOWERS%/g, this.person.followers)
      .replace(/%COMPANY%/g, company)
    )
    this.renderPerkViews();
    this.renderHobbieViews();
  },
  renderPerkViews: function() {
    this.perksTitle = Crafty.e('2D, DOM, HTML');
    this.perksTitle.attr({
      x: 250,
      y: 160
    }).append("<div class='perksTitle'>Perks</div>");
    this.perkViews = [];
    var i = 0;
    for(var n in this.person.perks) {
      var perkView = Crafty.e('PerkView');
      perkView.set({
        x: 250 + (i * 55),
        y: 180,
        perk: this.person.perks[n]
      });
      i++;
      this.perkViews.push(perkView);
    }
  },
  renderHobbieViews: function() {
    this.hobbiesTitle = Crafty.e('2D, DOM, HTML');
    this.hobbiesTitle.attr({
      x: 250,
      y: 230
    }).append("<div class='hobbiesTitle'>Hobbies</div>");
    this.hobbieViews = [];
    var i = 0;
    for(var n in this.person.hobbies) {
      var hobbieView = Crafty.e('HobbieView');
      hobbieView.set({
        x: 250 + (i * 55),
        y: 255,
        hobbie: this.person.hobbies[n]
      });
      i++;
      this.hobbieViews.push(hobbieView);
    }
  },
  renderStats: function() {
    this.statsView = Crafty.e('2D, DOM, HTML');
    this.statsView.attr({
      x: 50,
      y: 350,
      h: 400,
      w: 1000
    }).append(
      this.completeText(this.statsHTML)
    )
  },
  renderPersonalStats: function() {
    this.personalStatsView = Crafty.e('2D, DOM, HTML');
    this.personalStatsView.attr({
      x: 750,
      y: 350,
      h: 400,
      w: 500
    }).append(
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

  renderText: function() {
    for(var n in this.buttons) {
      if(this.buttons[n].render) {
        this.buttons[n].render();
      }
    }
  }

})
