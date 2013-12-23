  Crafty.c('PersonProjectsSheet', {
  personalDataHTML: "<div class='socialData'>"+
  "<div class='name'>%NAME%'s current projects</div>"+
  "</div>",
  moduleHTML: '<div class="module released_%RELEASED%"><div class="title">%NAME%</div> <div class="currentPhase">%PHASENAME%</div></div>',
  init: function() {
    this.requires('2D, DOM, Color, Faces, PersonProfileButtoner');
    this.attr({w:1200, h: 800, x: 0, y: 0});
    this.color('rgb(104,154,104)');
    this.person = tr.app.director.selectedPerson;
    this.render();
    this.buttons = [];
    this.otherFaces = [];

    this.statusBar = Crafty.e('StatusBar, PersonProfileButtoner');
    this.statusBar.createOfficeButton();
    this.createPersonFace();
    this.createButtoner();
    this.renderPersonData();
    this.renderPersonProjects();
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  },
  renderPersonData: function() {
    this.personalData = Crafty.e('2D, DOM, HTML');
    this.personalData.attr({
      x: 250,
      y: 90,
      w: 600,
      h: 300
    }).append(
      this.personalDataHTML
      .replace(/%NAME%/g, this.person.name)
    );
  },
  renderPersonProjects: function() {
    var i = 0;
    for(var n in this.person.currentProjects) {
      var module = Crafty.e('2D, DOM, HTML')
        module.attr({
        x:240,
        y:150 + i * 60,
        w:1000,
        h:200,
        z: 999999
      })
      module.append(
        this.moduleHTML
        .replace(/%NAME%/g, this.person.currentProjects[n].name)
        .replace(/%PHASENAME%/g, this.person.currentProjects[n].phase.name)
      );
      var project = this.person.currentProjects[n];
      var name = project.name
      var progressBar = Crafty.e('ProgressBar');
      var knowledge = this.person.projectKnowledge[project.id];
      if(!knowledge) {
        knowledge = 0;
      }
      progressBar.setOptions({
        w: 150,
        h: 12,
        y: 162 + 60*i,
        x: 515,
        color: '#000000',
        progressColor: "rgb(70, "+(100+Math.floor(155 * knowledge / 100))+", 20)",
        text: 'knowledge'
      });

      progressBar.setValue(knowledge);
      i++;
    }
  },

  render: function() {
    for(var n in this.buttons) {
      this.buttons[n].render();
    }
  }

})
