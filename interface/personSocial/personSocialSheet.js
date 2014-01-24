Crafty.c('PersonSocialSheet', {
  _PEOPLE_PER_PAGE: 16,
  _PEOPLE_HEIGHT: 50,
  _PAGINATION_Y: 700,
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
    this.clearPersonRelations();
    var i = 0;
    var first = this.page * this._PEOPLE_PER_PAGE;
    var last = first + this._PEOPLE_PER_PAGE;
    console.log(first,last);
    for(var n in this.person.socialCircle) {
      if(i >= first && i < last) {
        var xPosition = 300;
        var yPosition = 175 + 55*(i%this._PEOPLE_PER_PAGE);
        console.log(i%this._PEOPLE_PER_PAGE, this._PEOPLE_PER_PAGE/2)
        if((i%this._PEOPLE_PER_PAGE) >= ((this._PEOPLE_PER_PAGE / 2))) {
          xPosition = 600;
          yPosition = 175 + 55*((i%this._PEOPLE_PER_PAGE) - this._PEOPLE_PER_PAGE / 2)
        }
        var other = tr.app.persons[n];
        var face = this.createOtherFace(other, xPosition, yPosition - 15);
        this.facesArray.push(face);
        window.aaa = this;
        var otherName = Crafty.e('2D, HTML, DOM');
        console.log('mmmm', xPosition)
        otherName.attr({
          x: xPosition + 70,
          y: yPosition,
          w: 200,
          h: 30
        })
        otherName.append(this.otherDataHTML.replace(/%NAME%/g, other.name));
        this.otherNameArray.push(otherName);
        var progressBar = Crafty.e('ProgressBar');

        progressBar.setOptions({
          progressColor: 'rgb(85,255,225)',
          color: 'rgba(50,50,50,0.5)',
          w: 50,
          h: 15,
          y: yPosition,
          x: xPosition + 200
        });
        progressBar.setValue(this.person.socialCircle[n]);
        this.progressBarArray.push(progressBar);
      }
      i++;
    }

    this.pagination();
  },
  clearPersonRelations: function() {
    for(var o in this.facesArray) {
      this.facesArray[o].destroy();
    }
    this.facesArray = [];
    for(var i in this.progressBarArray) {
      this.progressBarArray[i].destroy();
    }
    this.progressBarArray = [];
    for(var j in this.otherNameArray) {
      this.otherNameArray[j].destroy();
    }
    this.otherNameArray = [];
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
  },
  pagination: function() {
    var page = this.page;
    var pages = [];
    var total = 0;
    for(var n in this.person.socialCircle) {
      if(!isNaN(this.person.socialCircle[n])) {
        total++;
      }
    }
    var nPages = Math.ceil(total / this._PEOPLE_PER_PAGE);
    for(var i = 0; i < nPages; i++) {
      var pageButton = Crafty.e('2D, DOM, HTML, Mouse, paginationButton');
      if(i == page) {
        pageButton.addComponent('actualPage')
      }
      pageButton.attr({
        x: 300+ 35 *i,
        y: this._PAGINATION_Y,
        h: 30,
        w: 30,
        z: 12
      }).replace('<span>'+i+'</span>');
      pageButton.bind('Click', this.generatePaginationResponse(i))
    }
  },
  generatePaginationResponse: function(n) {
    var pageNumber = n;
    var self = this;
    return function() {
      self.page = pageNumber;
      self.renderPersonRelations();
    }
  },
})
