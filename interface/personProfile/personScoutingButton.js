Crafty.c('RecruitingButton', {
  init: function(){
    this.requires('Button');
    this.company = tr.app.director.company;
  },
  setPerson: function(person) {
    this.person = person;
    this.set({
        onClick: this.toggleRecruiting.bind(this)
    })

    this.render();
  },
  render: function() {
    var recruitingColor = '#666666';
    var recruitingColorText = '#66FF66';
    if(this.person.beingScouted) {
      recruitingColor = '#FFFF66';
      recruitingColorText = '#005500';
    }
    this.set({
        // person: this.person,
        text: 'Interview',
        // position: 'funds',
        color: recruitingColor,
        textColor: recruitingColorText,
        x: 10,
        y: 700,
        w: 120
      })
  },
  toggleRecruiting: function() {
    this.person.beingScouted = !this.person.beingScouted;
    if(this.person.beingScouted) {
      if(!this.company.beingScouted.indexOf(this) >= 0) {
        this.company.beingScouted.push(this.person);
      }
    } else {
      var pos = this.company.beingScouted.indexOf(this.person);
      if(pos >= 0) {
        this.company.beingScouted.splice(pos, 1);
      }
    }
    this.trigger('toggle');
    this.render();
  }
})
