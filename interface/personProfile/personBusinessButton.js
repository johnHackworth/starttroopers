Crafty.c('BusinessButton', {
  init: function(){
    this.requires('Button');
  },
  setPerson: function(person) {
    this.person = person;
    this.set({
        onClick: this.toggleRaiseFunds.bind(this)
    })

    this.render();
  },
  render: function() {
    var businessColor = '#666666';
    var businessColorText = '#66FF66';
    if(this.person.raisingFunds) {
      businessColor = '#FFFF66';
      businessColorText = '#005500';
    }
    this.set({
        // person: this.person,
        text: 'Raise funds',
        // position: 'funds',
        color: businessColor,
        textColor: businessColorText,
        x: 10,
        y: 700,
        w: 120
      })
  },
  toggleRaiseFunds: function() {
    if(this.person.raisingFunds) {
      this.person.removePosition('funds');
    } else {
      this.person.assignRaiseFunds();
    }
    this.trigger('toggle');
    this.render();
  }
})
