Crafty.c('HistoryBrowser', {
  prevButtonHTML: '<div class="historyButton prevButton %POSITION%"><img src="/assets/ui/prev.png"></div>',
  nextButtonHTML: '<div class="historyButton nextButton %POSITION%"><img src="/assets/ui/next.png"></div>',
  init: function() {
    this.director = tr.app.director;
    //.historyBack()
    this.createButtons();
  },
  createButtons: function() {
    var self = this;
    var positionClass = '';
    if(this.director.history.isAtTheBegining()) {
      positionClass += ' begining ';
    }
    if(this.director.history.isAtTheEnd()) {
      positionClass += ' end '
    }
    this.prevButton = Crafty.e('2D, DOM, HTML, Mouse');
    this.prevButton.attr({
      x: 1105,
      y: 60,
      z: 9999999999,
      w: 40,
      h: 30
    }).replace(
      this.prevButtonHTML
        .replace(/%POSITION%/g, positionClass)
    ).bind('Click', function() {
      self.director.historyBack();
    });
    this.nextButton = Crafty.e('2D, DOM, HTML, Mouse');
    this.nextButton.attr({
      x: 1150,
      y: 60,
      z: 9999999999,
      w: 40,
      h: 30
    }).replace(
      this.nextButtonHTML
        .replace(/%POSITION%/g, positionClass)
    ).bind('Click', function() {
      self.director.historyNext();
    });
  },
  render: function() {

  }
});
