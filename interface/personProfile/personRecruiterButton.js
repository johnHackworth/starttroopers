Crafty.c('RecruiterButton', {
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
    if(this.person.isRecruiter) {
      recruitingColor = '#FFFF66';
      recruitingColorText = '#005500';
    }
    this.set({
        // person: this.person,
        text: 'Recruiter',
        // position: 'funds',
        color: recruitingColor,
        textColor: recruitingColorText,
        x: 1070,
        y: 600,
        w: 120
      })
  },
  toggleRecruiting: function() {
    this.person.isRecruiter = !this.person.isRecruiter;
    this.trigger('toggle');
    this.render();
  }
})
