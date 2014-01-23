Crafty.c('PersonSocialSheet', {
  _PEOPLE_PER_PAGE: 18,
  _PEOPLE_HEIGHT: 50,
  page: 0,
  personalDataHTML: "<div class='socialData'>"+
  "<div class='name'>%NAME%'s social circle</div>"+
  "<div class='sociability'>Sociability: %SOCIABILITY%</div>"+
  "</div>",
  otherDataHTML: "<div class='otherRelation'> "+
  "%NAME%" +
  "</div>",
  init: function() {
    this.requires('2D, DOM, Color, Faces, PersonProfileButtoner');
    this.attr({w:1200, h: 800, x: 0, y: 0})
    this.color('rgba(55,85,105, 0.90)');
    this.person = tr.app.director.selectedId;

    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
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

  renderPersonData: function() {
    this.personalData = Crafty.e('2D, DOM, HTML');
    this.personalData.attr({
      x: 250,
      y: 70,
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
    var first = this.page * this._PEOPLE_PER_PAGE;
    var last = first + this._PEOPLE_PER_PAGE;
    for(var n in this.person.socialCircle) {
      if(i >= first && i < last) {
        var xPosition = 300;
        var yPosition = 175 + 55*i;
        if(i >= first + (this._PEOPLE_PER_PAGE / 2)) {
          xPosition = 600;
          yPosition = 175 + 55*(i - this._PEOPLE_PER_PAGE / 2)
        }
        var other = tr.app.persons[n];
        this.createOtherFace(other, xPosition, yPosition - 15);
        var otherName = Crafty.e('2D, HTML, DOM');
        otherName.attr({
          x: xPosition + 70,
          y: yPosition,
          w: 200,
          h: 30
        })
        otherName.append(this.otherDataHTML.replace(/%NAME%/g, other.name));
        var progressBar = Crafty.e('ProgressBar');

        progressBar.setOptions({
          w: 50,
          h: 15,
          y: yPosition,
          x: xPosition + 200
        });
        progressBar.setValue(this.person.socialCircle[n]);
      }
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
