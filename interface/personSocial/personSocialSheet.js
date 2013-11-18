Crafty.c('PersonSocialSheet', {
  personalDataHTML: "<div class='socialData'>"+
  "<div class='name'>%NAME%'s social circle</div>"+
  "<div class='sociability'>Sociability: %SOCIABILITY%</div>"+
  "</div>",
  otherDataHTML: "<div class='otherRelation'> "+
  "%NAME%" +
  "</div>",
  init: function() {
    this.requires('2D, DOM, Color');
    this.attr({w:1190, h:790, x: 5, y: 5});
    this.color('rgb(104,154,104)');
    this.person = tr.app.director.selectedPerson;
    this.render();
    this.buttons = [];
    this.otherFaces = [];
    this.createPersonFace();
    this.createButtoner();
    this.renderPersonData();
    this.renderPersonRelations();
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
  createOtherFace: function(other, x, y) {
    var otherFace = Crafty.e('PersonFace');
    otherFace.assignPerson({
      person: other
    });
    otherFace.showNameFlag = false;
    otherFace.setSize(50);
    otherFace.setPosition(x,y);
    this.otherFaces.push(otherFace);
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
      .replace(/%SOCIABILITY%/g, this.person.sociability)
    );
  },
  renderPersonRelations: function() {
    var i = 0;
    for(var n in this.person.socialCircle) {
      var other = tr.app.persons[n];
      this.createOtherFace(other, 300, 100 + 55*i);
      var otherName = Crafty.e('2D, HTML, DOM');
      otherName.attr({
        x: 370,
        y: 125 + 55*i,
        w: 200,
        h: 30
      })
      otherName.append(this.otherDataHTML.replace(/%NAME%/g, other.name));
      var progressBar = Crafty.e('ProgressBar');
      progressBar.setOptions({
        w: 50,
        h: 15,
        y: 125 + 55*i,
        x: 600
      });
      progressBar.setValue(this.person.socialCircle[n]);
      i++;
    }
  },

  completeText: function(param) {
    var text = param;
    for(var n in this.person) {
      text = text.replace(new RegExp('%'+n.toUpperCase()+'%','g'), this.person[n])
    }
    return text;
  },

  render: function() {
    for(var n in this.buttons) {
      this.buttons[n].render();
    }
  }

})
