Crafty.c('MarketingButton', {
  init: function(){
    this.requires('Button');
  },
  setPerson: function(person) {
    this.person = person;
    this.set({
        onClick: this.toggleMarketing.bind(this)
    })

    this.render();
  },
  render: function() {
    var businessColor = '#666666';
    var businessColorText = '#FFFF66';
    if(this.person.marketingStaff) {
      businessColor = '#FFFF66';
      businessColorText = '#000055';
    }
    this.set({
        // person: this.person,
        text: 'Marketing',
        // position: 'funds',
        color: businessColor,
        textColor: businessColorText,
        x: 140,
        y: 500,
        w: 120
      })
  },
  toggleMarketing: function() {
    if(this.person.marketingStaff) {
      this.person.removePosition('marketing');
    } else {
      this.person.assignMarketing();
    }
    this.trigger('toggle');
    this.render();
  }
})
