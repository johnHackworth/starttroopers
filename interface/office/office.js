Crafty.c('OfficeFloor', {
  init: function() {
    this.requires('DOM, Text, Color');
    this.attr({w:1190, h:790, x: 5, y: 5})
    this.color('rgb(104,104,204)');
    this.company = tr.app.director.company;
    this.render();
    this.createPersons();
  },
  render: function() {
    this.ready = true;
    this.text('hello ' + this.company.name)
        .textColor('#FFF0FF');
    Crafty.trigger("Change");
  },
  createPersons: function() {
    this.personViews = [];
    var i = 0;
    console.log(this.company)
    for(var n in this.company.people) {
      console.log('a');
      var personView = Crafty.e('Person');
      personView.assignPerson({
        person: this.company.people[n],
        x: i * 110,
        y: 30
      })
      i++
      this.personViews.push(personView);
    }
  }
})
