Crafty.c("MainMenuView", {
  companyHTML: '<div class="companyButton">%NAME%</div>',
  init: function() {
    this.requires('DOM, 2D, HTML');
    this.attr({w:1200, h: 800, x: 0, y: 0})
    // this.color('rgba(200,200,200,.85)');
    this.createTitle();
    this.whiteArea = Crafty.e('2D, DOM, Color')
      .attr({
        w: 1200,
        h: 100,
        x:0,
        y:700
      })
      .color('rgba(255,255,255,0.8)')
    this.createQuickStartButton();
    this.createCreateCompanyButton();
    this.createResumeCompanyButton();
    this.createConfigButton();
    this.createExitButton();
    this.createFooter();

    setTimeout(function() {
      tr.app.director.createWorld()
      Crafty.trigger('OfficeSelected');
    },500);
  },
  createTitle: function() {
    this.mainMenuTitle = Crafty.e('2D, DOM, HTML')
      .attr({
        x: 300,
        y: 150,
        w: 600,
        h: 300
      })
      .replace('<div class="mainMenuTitle">'+
        '<div class="title">StartTroopers</div>'+
        '<div class="subtitle">A game about tears, caffeine and pizza</div>'+
        '</div>'
      )
  },
  createQuickStartButton: function() {
    this.quickStartButton = Crafty.e('2D, DOM, HTML, Mouse')
      .attr({
        w: 200,
        h: 40,
        x: 100,
        y: 600
      })
      .replace('<div class="menuLink quickstart">Quick start!</div>')
      .bind('Click', function() {
        tr.app.director.createWorld()
        Crafty.trigger('OfficeSelected');
      })
  },
  createCreateCompanyButton: function() {
    this.createCompanyButton = Crafty.e('2D, DOM, HTML, Mouse')
      .attr({
        w: 200,
        h: 40,
        x: 310,
        y: 600
      })
      .replace('<div class="menuLink createCompany">Create company</div>')
      .bind('Click', function() {
        Crafty.trigger('PersonCreatorSelected');
      })
  },
  createResumeCompanyButton: function() {
    var disabledClass = '';
    if(!tr.app.director.world) {
      disabledClass = ' disabled'
    }
    this.ResumeCompanyButton = Crafty.e('2D, DOM, HTML, Mouse')
      .attr({
        w: 200,
        h: 40,
        x: 520,
        y: 600
      })
      .replace('<div class="menuLink resume ' + disabledClass +'">Resume game</div>')
      .bind('Click', function() {
        if(tr.app.director.world) {
          Crafty.trigger('OfficeSelected');
        }
      })
  },
  createConfigButton: function() {
    this.ConfigButton = Crafty.e('2D, DOM, HTML, Mouse')
      .attr({
        w: 200,
        h: 40,
        x: 730,
        y: 600
      })
      .replace('<div class="menuLink config">Config</div>')
      .bind('Click', function() {
        // Crafty.trigger('PersonCreatorSelected');
      })
  },
  createExitButton: function() {
    this.ExitButton = Crafty.e('2D, DOM, HTML, Mouse')
      .attr({
        w: 200,
        h: 40,
        x: 940,
        y: 600
      })
      .replace('<div class="menuLink exit">Exit</div>')
      .bind('Click', function() {
        var gui = require('nw.gui');
        gui.App.quit();
      })
  },
  createFooter: function() {
    this.footer = Crafty.e('2D, DOM, HTML')
      .attr({
        x:50,
        y: 740,
        w:1100,
        h: 50,
        z: 9999999999
      })
      .replace('<div class="footer">Hello world! - A game by @[PUT-YOUR-NAME-HERE] and @johnhackworth - 2014 </div> ' )
  }


})
