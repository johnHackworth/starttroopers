Crafty.c('ProjectCompletion', {
  init: function() {
    this.progressBar = Crafty.e('ProgressBar');
    this.progressBar.setOptions({
      w: 100,
      h: 25,
      y: 5,
      x: 300
    });
    this.title = Crafty.e('2D, DOM, Text');
    this.title.attr({
      w: 150,
      h: 2,
      y: 5,
      x: 150
    }).css({textAlign: "center"})
    this.title.text('current project status')
    this.title.textColor('#FFFFFF')
    this.title2 = Crafty.e('2D, DOM, Text');
    this.title2.attr({
      w: 150,
      h: 20,
      y: 20,
      x: 150
    }).css({textAlign: "center"})
  },
  setCompany: function(options) {
    this.company = options.company;
    this.progressBar.company = options.company;
    this.title2.text(this.company.projects[0].name + ' - ' + this.company.projects[0].phase.name);
    this.title2.textColor('#FFAAAA')
    this.render();
  },
  render: function() {
    var completedness = this.company.projects[0].phaseCompletedness()
    this.progressBar.setValue(completedness)
  }
})
