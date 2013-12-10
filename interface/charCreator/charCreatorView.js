Crafty.c('CharCreatorView', {
  nameHTML: '<div class="nameContainer"><input id="name" value="%NAME%"></input></div>',
  init: function() {
    this.requires('2D, DOM, HTML, Faces')
    this.attr({w:1200, h: 800, x: 0, y: 0});
    this.person = new tr.models.Person({});
    this.otherFaces = [];
    this.showPersonFace();
    this.renderButtoner();
    this.renderName();
    this.renderChecks();
    window.creator = this;
  },
  personSet: function(gene, value) {
    var pos = this.person.DNA.map[gene];
    this.person.DNA.chromosomes[pos] += value;
    if(this.person.DNA.chromosomes[pos] >= this.person.DNA.maxs[pos]) {
      this.person.DNA.chromosomes[pos] = 0;
    }
    if(this.person.DNA.chromosomes[pos] < 0) {
      this.person.DNA.chromosomes[pos] = this.person.DNA.maxs[pos] -1;
    }
    this.showPersonFace();
  },
  showPersonFace: function() {
    this.personFace && this.personFace.destroy();
    this.personFace = this.createOtherFace(this.person, 475, 160);
    this.personFace.setSize(250)
    this.personFace.overrideClick(function(){})
  },
  renderButtoner: function() {
    var buttons = ['sex','background','haircolor',
      'face','eyes','nose','mouth','hair','clothes',
      'facialfeatures','beard','glasses']
    var self = this;
    var i = 0;
    for(var b in buttons) {
      this['button'+buttons[b]] = Crafty.e('Button');
      this['button'+buttons[b]].set({
        color: '#333333',
        text: "next " + buttons[b],
        y: 200 + 30 * Math.floor(i/2),
        x: 300 + (i%2) * 500,
        z: 99999999999,
        onClick: this.createButtonResponse(buttons[b])
      })
      i++;
    }
  },
  createButtonResponse: function(button) {
    var self = this;
    return function() {
      self.personSet(button, 1)
    }
  },
  renderName: function() {
    var self = this;
    this.nameInput = Crafty.e('2D, DOM, HTML, Keyboard')
      .attr({x: 300, y: 50, w:600, h:40})
      .append(
        this.nameHTML
          .replace(/%NAME%/g, this.person.name)
      )
    document.getElementById('name').addEventListener('keyup', function() {
      self.person.name = this.value;
    })
  },
  renderChecks: function() {
    var self = this;
    this.designCheck = Crafty.e('PropertyCheckbox, creatorProp')
    this.designCheck.assignFreeText('Design');
    this.designCheck.assignValue('design')
    this.designCheck.attr({x: 350, y: 120, w: 150, h: 30});
    this.designCheck.assignGroup('mainInterest');
    this.designCheck.render();
    this.designCheck.bind('change', function() {self.person.mainInterest = 'design'});
    this.designCheck.select()
    this.designCheck.trigger('change')

    this.engineeringCheck = Crafty.e('PropertyCheckbox, creatorProp')
    this.engineeringCheck.assignFreeText('Engineer');
    this.engineeringCheck.assignValue('engineering')
    this.engineeringCheck.attr({x: 550, y:120, w: 150, h: 30});
    this.engineeringCheck.assignGroup('mainInterest');
    this.engineeringCheck.render();
    this.engineeringCheck.bind('change', function() {self.person.mainInterest = 'engineering'});

    this.businessCheck = Crafty.e('PropertyCheckbox, creatorProp')
    this.businessCheck.assignFreeText('Business');
    this.businessCheck.assignValue('business')
    this.businessCheck.attr({x: 750, y: 120, w: 150, h: 30});
    this.businessCheck.assignGroup('mainInterest');
    this.businessCheck.render();
    this.businessCheck.bind('change', function() {self.person.mainInterest = 'business'});


  }

})
