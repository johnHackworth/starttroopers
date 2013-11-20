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
    this.renderCompanyPeople();
    this.render();
    this.buttons = [];
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
  renderCompanyPeople: function() {
    var i = 0;
    var x = 50;
    var y = 125;
    for(var n in this.company.people) {
      var other = this.company.people[n];
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

      x += 100;
      if(x > 900) {
        x = 50;
        y += 60;
      }

      i++;
    }
  }

})
