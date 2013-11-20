Crafty.c('OfficeButton', {
  init: function() {
    this.backToOfficeButton = Crafty.e('Button');
    this.backToOfficeButton.set({
      color: '#CCAA00',
      text: "Back",
      y: 450,
      onClick: function() {
        Crafty.trigger('OfficeSelected');
      }
    });
  }
})
