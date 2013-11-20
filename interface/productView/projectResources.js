Crafty.c('ProjectResources', {
  productHTML: '<div class="projectInfo">'+
  '<div class="title">%NAME%</div>'+
  '<div class="description">%DESCRIPTION%</div>'+
  '</div>',
  'otherDataHTML': '<div class="otherData">%NAME%</div>',
  init: function() {
    this.requires('2D, DOM, Color, Faces, OfficeButton');
    this.attr({w:1190, h:790, x: 5, y: 5});
    this.color('rgb(104,154,104)');
    this.company = tr.app.director.company;
    this.product = this.company.product;
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
      y:20,
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
    var x = 50;
    var y = 125;
    for(var n in this.project.people) {
      var other = this.project.people[n];
      this.createOtherFace(other, x, y);
      var otherName = Crafty.e('2D, HTML, DOM');
      otherName.attr({
        x: x,
        y: y+25,
        w: 100,
        h: 30
      })
      var name = other.name;
      if(other.currentProjects.indexOf(this.project) >= 0) {
        name += ' -- in'
      }
      otherName.append(this.otherDataHTML.replace(/%NAME%/g, name));

      var otherButton = Crafty.e('Button');
      otherButton.set({
        x: x,
        y: y+60,
        w: 60,
        h: 10,
        text: 'remove',
        onClick: self.clickRemoveGenerator(other).bind(this)
      })

      x += 100;
      if(x > 900) {
        x = 50;
        y += 60;
      }
      i++;
    }
    this.companyPeopleY = y+100;
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
    var x = 50;
    var y = this.companyPeopleY;
    for(var n in this.company.people) {
      var other = this.company.people[n];
      if(this.project.people.indexOf(other) === -1) {
        this.createOtherFace(other, x, y);
        var otherName = Crafty.e('2D, HTML, DOM');
        otherName.attr({
          x: x,
          y: y+25,
          w: 100,
          h: 30
        })
        var name = other.name;
        if(other.currentProjects.indexOf(this.project) >= 0) {
          name += ' -- in'
        }
        otherName.append(this.otherDataHTML.replace(/%NAME%/g, name));

        var otherButton = Crafty.e('Button');
        otherButton.set({
          x: x,
          y: y+60,
          w: 60,
          h: 10,
          text: 'add to project',
          onClick: self.clickAddGenerator(other)
        })
        x += 100;
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
