Crafty.c('MarketingView', {
  POPViewHTML: "<div class='POP'>"+
    "<div class='agegroup'>%AGEGROUP%</div>"+
    "<div class='size'>%SIZE%</div>"+
    "<div class='hobbies'>%HOBBIES%</div>"+
    "<div class='hasAccount'>%HASACCOUNT%</div>"+
    "</div>",
  init: function() {
    this.requires('DOM, Text, Color');
    this.attr({w:1200, h:700, x: 0, y: 0})
    this.color('rgba(104,155,155,.85)');
    this.company = tr.app.director.company;
    this.world = tr.app.director.world;
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.renderPOPs();
  },
  renderPOPs: function() {
    var x = 20;
    var y = 80;
    var i = 0;
    for(var n in this.world.POPs) {
        var popView = Crafty.e('2D, HTML, DOM');
        popView.append(this.POPViewHTML
          .replace(/%AGEGROUP%/g, this.world.POPs[n].ageGroup)
          .replace(/%SIZE%/g, this.world.POPs[n].size)
          .replace(/%HASACCOUNT%/g, this.world.POPs[n].useTheProduct)
          .replace(/%HOBBIES%/g, this.world.POPs[n].hobbies.join(', '))
        )
        popView.attr({
          x: x,
          y: y,
          h: 120,
          w: 120
        })
        x += 120;
        if(x > 1100) {
            x = 20;
            y += 130;
        }
    }
  }

})
