Crafty.c('PersonProjectsSheet', {
  personalDataHTML: "<div class='socialData'>"+
  "<div class='name'>%NAME%'s current projects</div>"+
  "</div>",
  moduleHTML: '<div class="module released_%RELEASED%"><div class="title">%NAME%</div> <div class="currentPhase">%PHASENAME%</div></div>',
  init: function() {
    this.requires('2D, DOM, Color, Faces');
    this.attr({w:1190, h:790, x: 5, y: 5});
    this.color('rgb(104,154,104)');
    this.person = tr.app.director.selectedPerson;
    this.render();
    this.buttons = [];
    this.otherFaces = [];
    this.createPersonFace();
    this.createButtoner();
    this.renderPersonData();
    this.renderPersonProjects();
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  },
  createPersonFace: function() {
    this.personFaceView = Crafty.e('PersonFace');
    this.personFaceView.assignPerson({
      person: this.person
    });
    this.personFaceView.setSize(200);
    this.personFaceView.setPosition(20,20);
  },

  createButtoner: function() {
    this.backToOfficeButton = Crafty.e('Button');
    this.backToOfficeButton.set({
      color: '#CCAA00',
      text: "Back",
      y: 450,
      onClick: function() {
        Crafty.trigger('OfficeSelected');
      }
    });
    this.profileButton = Crafty.e('Button');
    this.profileButton.set({
      color: '#AAAA00',
      text: "Profile",
      y: 500,
      onClick: function() {
        Crafty.trigger('PersonSelected');
      }
    });
  },
  renderPersonData: function() {
    this.personalData = Crafty.e('2D, DOM, HTML');
    this.personalData.attr({
      x: 250,
      y: 20,
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
        y:100 + i * 60,
        w:1000,
        h:200,
        z: 999999
      })
      module.append(
        this.moduleHTML
        .replace(/%NAME%/g, this.person.currentProjects[n].name)
        .replace(/%PHASENAME%/g, this.person.currentProjects[n].phase.name)
      );
      var name = this.person.currentProjects[n].name
      var progressBar = Crafty.e('ProgressBar');
      progressBar.setOptions({
        w: 150,
        h: 12,
        y: 102 + 60*i,
        x: 500
      });
      progressBar.setValue(this.product.modules[n].project.phaseCompletedness());
      i++;
    }
  },

  render: function() {
    for(var n in this.buttons) {
      this.buttons[n].render();
    }
  }

})