Crafty.c('ProjectResources', {
  productHTML: '<div class="projectInfo">'+
  '<div class="title">%NAME%</div>'+
  '<div class="description">%DESCRIPTION%</div>'+
  '</div>',
  'otherDataHTML': '<div class="projectOtherData">%NAME%</div>',
  init: function() {
    this.requires('2D, DOM, Color, Faces');
    this.attr({w:1190, h:790, x: 5, y: 5});
    this.color('rgb(104,154,104)');
    this.company = tr.app.director.company;
    this.product = this.company.product;
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.project = tr.app.director.selectedProject;
    this.renderProject();
    this.renderProjectPeople();
    this.renderCompanyPeople();
    this.render();
    this.buttons = [];
    this.project.on('change', function() {Crafty.trigger('ProjectSelected')})
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
    var y = 205;
    var title = Crafty.e('HTMLText');
    title.set({x:20, y:160, w: 300, h:50, text: 'People on project:', class: 'projectTitle'})
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
        x: x + 10,
        y: y+52,
        w: 30,
        color: '#660000',
        h: 10,
        text: '-',
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
          x: x + 10,
          y: y+52,
          color: '#006600',
          w: 30,
          h: 10,
          text: '+',
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

})
