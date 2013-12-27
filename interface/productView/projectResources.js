Crafty.c('ProjectResources', {
  productHTML: '<div class="projectInfo">'+
  '<div class="title">%NAME%</div>'+
  '<div class="description">%DESCRIPTION%</div>'+
  // '<div class="quality">Product Quality: %QUALITY%</div>'+
  '</div>',
  'otherDataHTML': '<div class="projectOtherData">%NAME%</div>',
  init: function() {
    this.requires('2D, DOM, Color, Faces');
    this.attr({w:1190, h:790, x: 5, y: 5});
    this.color('rgba(104,154,104, 0.85)');
    this.company = tr.app.director.company;
    this.product = this.company.product;
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.project = tr.app.director.selectedId;
    this.renderProject();
    this.renderProjectPeople();
    this.renderCompanyPeople();
    this.renderPhase();
    this.renderQuality();
    this.renderAutoAdd();
    this.render();
    this.buttons = [];
    this.bindProjectChange = this.project.on('change', function() {Crafty.trigger('ProjectSelected')})
    this.bind('Remove', this.delete.bind(this));
  },
  delete: function() {
    this.project.off('change', this.bindProjectChange);
  },
  renderProject: function() {
    this.productInfo = Crafty.e('2D, DOM, HTML');
    this.productInfo.attr({
      x:20,
      y:70,
      w:1000,
      h:200
    })
    this.productInfo.append(
      this.productHTML
      .replace(/%NAME%/g, this.project.name)
      .replace(/%DESCRIPTION%/g, this.project.module.description)
      .replace(/%QUALITY%/g, this.project.quality)
    )
  },
  render: function() {
    for(var n in this.buttons) {
      this.buttons[n].render();
    }
  },
  renderProjectPeople: function() {
    var self = this;
    var i = 0;
    var x = 30;
    var y = 405;
    var title = Crafty.e('HTMLText');
    title.set({x:20, y:360, w: 300, h:50, text: 'People on project:', class: 'projectTitle'})
    for(var n in this.project.people) {
      var other = this.project.people[n];
      this.createOtherFace(other, x, y);
      var otherName = Crafty.e('2D, HTML, DOM');
      otherName.attr({
        x: x-25,
        y: y - 10,
        w: 100,
        h: 30
      })
      var name = other.name;
      otherName.append(this.otherDataHTML.replace(/%NAME%/g, name));

      var otherButton = Crafty.e('Button, smallButton');
      otherButton.set({
        x: x + 0,
        y: y+52,
        w: 50,
        color: '#660000',
        h: 10,
        text: 'remove',
        onClick: self.clickRemoveGenerator(other).bind(this)
      })

      x += 80;
      if(x > 900) {
        x = 50;
        y += 60;
      }
      i++;
    }
    this.companyPeopleY = y+130;
  },
  clickRemoveGenerator: function(personParam) {
    var person = personParam;
    return (function() {
      this.project.removePerson(person);
      Crafty.scene('Project')
    }).bind(this)
  },
  renderCompanyPeople: function() {
    var i = 0;
    var self = this;
    var x = 30;
    var y = this.companyPeopleY;
    var title = Crafty.e('HTMLText');
    title.set({x:20, y:y - 40, w: 300, h:50, text: 'Available People:', class: 'projectAvailableTitle'})


    for(var n in this.company.people) {
      var other = this.company.people[n];
      if(this.project.people.indexOf(other) === -1) {
        this.createOtherFace(other, x, y);
        var otherName = Crafty.e('2D, HTML, DOM');
        otherName.attr({
          x: x - 25,
          y: y - 10,
          w: 100,
          h: 30
        })
        var name = other.name;
        otherName.append(this.otherDataHTML.replace(/%NAME%/g, name));

        var otherButton = Crafty.e('Button, smallButton');
        otherButton.set({
          x: x + 5,
          y: y+52,
          color: '#006600',
          w: 40,
          h: 10,
          text: 'add',
          onClick: self.clickAddGenerator(other)
        })
        x += 80;
        if(x > 900) {
          x = 50;
          y += 60;
        }
      }
      i++;
    }
  },
  clickAddGenerator: function(personParam) {
    var person = personParam;
    return (function() {
      this.project.addPerson(person);
      Crafty.scene('Project')
    }).bind(this)
  },
  renderPhase: function() {
    var areas = ['definition', 'design', 'back', 'front', 'architecture', 'operations'];
    var x = 50;
    var y = 250;
    for(var n in areas) {
      var area = areas[n];
      var text = Crafty.e('2D, DOM, HTML');
      text.append('<div class="areaTitle">'+areas[n]+'</div>')
      text.attr({x:x, y:y})
      var percentage = 100 * this.project.phase[area] / this.project.phase[area + 'Goal'];
      var progressBar = Crafty.e('ProgressBar');
      progressBar.setOptions({
        w: 180,
        h: 12,
        y: y,
        x: x + 100
      });
      progressBar.setValue(percentage);

      x += 300;
      if(x > 900) {
        x = 50;
        y += 50;
      }
    }
  },
  renderQuality: function() {
    var x = 50;
    var y = 200;
    var text = Crafty.e('2D, DOM, HTML');
    text.append('<div class="areaTitle">Quality</div>')
    text.attr({x:x, y:y})
    var progressBar = Crafty.e('ProgressBar');
    progressBar.setOptions({
      w: 180,
      h: 12,
      y: y,
      x: x + 100
    });
    progressBar.setValue(this.project.quality);
    var bugText = Crafty.e('2D, DOM, HTML');
    bugText.append('<div class="knowBugs">Known bugs: <span>'+this.project.knowBugs+'</span></div>')
    bugText.attr({x:x + 300, y:y, w:200, h:30})
  },
  renderAutoAdd: function() {
    this.autoAddCheck = Crafty.e('PropertyCheckbox')
    this.autoAddCheck.bindWithProperty(this.project, "autoAdd", "Auto-add new hires");
    this.autoAddCheck.attr({x: 20, y: 700, w: 400, h: 30});
    this.autoAddCheck.render();
  }

})
