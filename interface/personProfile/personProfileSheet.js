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
  "<div class='mainInterest' data-interest=%INTEREST%>%INTEREST%</div>" +
  "<div class='happiness' data-happiness=%HAPPINESS%>%HAPPINESS%</div>" +
  "<div class='experience'>%EXPERIENCE% years of experience</div>" +
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
  "</div>" +
  "</div>",
  init: function() {
    this.requires('DOM, Text, Color');
    this.attr({w:1190, h:790, x: 5, y: 5})
    this.color('rgb(104,104,104)');
    this.person = tr.app.director.selectedPerson;
    this.render();
    this.buttons = [];

    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.createPersonFace();
    this.createButtoner();
    this.renderPersonalData();
    this.renderStats();
    this.renderPersonalStats();

    // this.person.on('change', function() {Crafty.scene('PersonProfile')})

  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  },
  createPersonFace: function() {
    this.personFaceView = Crafty.e('PersonFace');
    this.personFaceView.assignPerson({
      person: this.person
    })
    this.personFaceView.setSize(200);
    this.personFaceView.setPosition(20,70)
  },
  createButtoner: function() {
    this.socialButton = Crafty.e('Button');
    this.socialButton.set({
      color: '#6666CC',
      text: "Social",
      y: 550,
      onClick: function() {
        Crafty.trigger('SocialSelected')
      }
    }),
    this.projectsButton = Crafty.e('Button');
    this.projectsButton.set({
      color: '#6666CC',
      text: "Projects",
      x: 120,
      y: 550,
      onClick: function() {
        Crafty.trigger('PersonProjectsSelected')
      }
    }),
    this.createPositionButtons()
  },
  createPositionButtons: function() {
    var self = this;
    var positions = this.positions;
    var i= 0;

    this.businessButton = Crafty.e('BusinessButton, raiseFunds');
    this.businessButton.setPerson(this.person);
    this.buttons.push(this.businessButton)
    this.businessButton.bind('toggle', this.render.bind(this));
    for(var n in positions) {
      var pos = positions[n].name;
      this[pos+'Button'] = Crafty.e('PositionButton');
      this.buttons.push(this[pos+'Button']);
      this[pos+'Button'].setOptions({
        person: this.person,
        text: this.positions[n].text,
        position: pos,
        x: 150+(110*i),
        y: 500
      })
      this[pos+'Button'].render();
      this[pos+'Button'].bind('toggle', this.render.bind(this));
      i++;
    }
  },
  renderPersonalData: function() {
    this.personalData = Crafty.e('2D, DOM, HTML');
    var happiness = this.happinessArray[Math.floor(this.person.happiness / 20)];
    this.personalData.attr({
      x: 250,
      y: 70,
      w: 600,
      h: 300
    }).append(
      this.personalDataHTML
      .replace(/%NAME%/g, this.person.name)
      .replace(/%HAPPINESS%/g, happiness)
      .replace(/%INTEREST%/g, this.person.mainInterest)
      .replace(/%EXPERIENCE%/g, this.person.experience)
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
      var perkView = Crafty.e('2D, DOM, HTML');
      perkView.attr({
        x: 250 + (i * 110),
        y: 180,
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
  renderHobbieViews: function() {
    this.hobbiesTitle = Crafty.e('2D, DOM, HTML');
    this.hobbiesTitle.attr({
      x: 250,
      y: 230
    }).append("<div class='hobbiesTitle'>Hobbies</div>");
    this.hobbieViews = [];
    var i = 0;
    for(var n in this.person.hobbies) {
      var hobbieView = Crafty.e('2D, DOM, HTML');
      hobbieView.attr({
        x: 250 + (i * 110),
        y: 255,
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
  renderStats: function() {
    this.statsView = Crafty.e('2D, DOM, HTML');
    this.statsView.attr({
      x: 50,
      y: 310,
      h: 400,
      w: 500
    }).append(
      this.completeText(this.statsHTML)
    )
  },
  renderPersonalStats: function() {
    this.personalStatsView = Crafty.e('2D, DOM, HTML');
    this.personalStatsView.attr({
      x: 600,
      y: 310,
      h: 400,
      w: 500
    }).append(
      this.completeText(this.personalStatsHTML)
    )
  },

  completeText: function(param) {
    var text = param;
    for(var n in this.person) {
      text = text.replace(new RegExp('%'+n.toUpperCase()+'%','g'), this.person[n])
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
