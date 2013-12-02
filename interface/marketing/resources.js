Crafty.c('MarketingView', {
  POPViewHTML: "<div class='MarketingViewPOP'>"+
    "<div class='agegroup'>Age: <span>%AGEGROUP%</span></div>"+
    "<div class='size'>People: <span>%SIZE%</span></div>"+
    "<div class='hobbies'>Interests: <span>%HOBBIES%</span></div>"+
    "<div class='hasAccount'>Use us: <span>%HASACCOUNT%</span></div>"+
    "</div>",
  otherDataHTML: '<div class="projectOtherData">%NAME%</div>',
  ageGroups: {
    16: "16-24",
    25: "25-44",
    45: "45-59",
    60: "60+"
  },
  init: function() {
    this.requires('DOM, Text, Color, Faces');
    this.attr({w:1200, h:700, x: 0, y: 0})
    this.color('rgba(104,155,155,.85)');
    this.company = tr.app.director.company;
    this.world = tr.app.director.world;
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.renderPOPs();
    this.renderMarketingPeople(30, 560);
  },
  renderPOPs: function() {
    var x = 20;
    var y = 80;
    var i = 0;
    for(var n in this.world.POPs) {
        var popView = Crafty.e('2D, HTML, DOM');
        popView.append(this.POPViewHTML
          .replace(/%AGEGROUP%/g, this.ageGroups[this.world.POPs[n].ageGroup])
          .replace(/%SIZE%/g, this.world.POPs[n].size)
          .replace(/%HASACCOUNT%/g, this.world.POPs[n].useTheProduct)
          .replace(/%HOBBIES%/g, this.world.POPs[n].hobbies.join(', '))
        )
        popView.attr({
          x: x,
          y: y,
          h: 120,
          w: 140
        })
        x += 150;
        if(x > 1100) {
            x = 20;
            y += 130;
        }
    }
  }

})
