Crafty.c('ProductProfile', {
  productHTML: '<div class="productInfo">'+
  '<div class="title">%NAME%</div>'+
  '</div><div class="productModules"><div class="title">Modules:</div><div class="Modules"></div></div>',
  moduleHTML: '<div class="module released_%RELEASED%"><div class="title">%NAME%</div> <div class="currentPhase">%PHASENAME%</div></div>',
  availableModuleHTML: '<div class="module available"><div class="title">%NAME%</div> <div class="description">%DESCRIPTION%</div></div>',
  init: function() {
    this.requires('2D, DOM, Color');
    this.attr({w:1190, h:790, x: 5, y: 5});
    this.color('rgb(104,154,104)');
    this.company = tr.app.director.company;
    this.product = this.company.product;
    this.renderProduct();
    this.render();
    this.buttons = [];
    this.createButtoner();
    this.product.on('change', function() {Crafty.scene('Product')})
  },
  createButtoner: function() {
    this.backToOfficeButton = Crafty.e('Button');
    this.backToOfficeButton.set({
      color: '#CCAA00',
      text: "Back",
      y: 450,
      onClick: function() {
        Crafty.trigger('OfficeSelected');
      }
    });
  },
  renderProduct: function() {
    this.productInfo = Crafty.e('2D, DOM, HTML');
    this.productInfo.attr({
      x:20,
      y:20,
      w:1000,
      h:200
    })
    this.productInfo.append(
      this.productHTML.replace(/%NAME%/g, this.company.product.name)
    )
    this.renderModules();
    this.renderAvailableModules();
  },
  renderModules: function() {
    var i = 0;
    for(var n in this.product.modules) {
      var module = Crafty.e('2D, DOM, HTML')
        module.attr({
        x:20,
        y:150 + i * 60,
        w:1000,
        h:200
      })
      module.append(
        this.moduleHTML
        .replace(/%NAME%/g, this.product.modules[n].name)
        .replace(/%RELEASED%/g, this.product.modules[n].released)
        .replace(/%PHASENAME%/g, this.product.modules[n].project.phase.name)
      );
      var progressBar = Crafty.e('ProgressBar');
      progressBar.setOptions({
        w: 50,
        h: 12,
        y: 162 + 60*i,
        x: 300
      });
      progressBar.setValue(this.product.modules[n].project.phaseCompletedness());
      this.createModuleButtons(this.product.modules[n], i)
      i++;
    }
  },
  createModuleButtons: function(module, i) {
    var launchButton = '';
    if(module.released) {
      launchButton = Crafty.e('2D, DOM, HTML');
      launchButton.append('<div class="launched">Shipped</div>')
      launchButton.attr({
        x:930,
        y: 155 + i*60
      })
    } else {
      this.createOnGoingProjectButtons(module, i)
    }

  },
  createOnGoingProjectButtons: function(module, i) {
    var project = module.project;
    var launchButton = null;
    var nextPhaseButton = null;
    var x = 930;
    if(project.phase.name == 'Testing') {
      launchButton = Crafty.e('Button');
      launchButton.set({
        color: '#CCAA00',
        text: "Ship it",
        x: x,
        y: 155 + i*60,
        onClick: function() {
          module.project.launchProduct();
          module.trigger('change')
        }
      });
      x += 100;
    }
    if(project.phase.name != 'Testing') {
      var color = '#999999';
      var textColor = '#666666'
      var click = function() {}
      if(project.phaseCompletedness() >=99) {
        color = '#DDDD66';
        textColor = '#FFFFFF';
        click = function() {
          console.log('a')
          module.project.nextPhase();

        }
      }
      nextPhaseButton = Crafty.e('Button');
      nextPhaseButton.set({
        color: color,
        textColor:  textColor,
        text: "Next phase",
        x: x,
        y: 155 + i*60,
        onClick: click
      });
    }
  },
  renderAvailableModules: function() {
    var i = this.product.modules.length;
    for(var n in this.product.availableModules) {
      if(!this.product.availableModules[n].started) {
        var module = Crafty.e('2D, DOM, HTML')
          module.attr({
          x:20,
          y:170 + i * 50,
          w:1000,
          h:200
        })
        module.append(
          this.availableModuleHTML
          .replace(/%NAME%/g, this.product.availableModules[n].name)
          .replace(/%DESCRIPTION%/g, this.product.availableModules[n].description)
        )
        this.createAvailableModuleButtons(n, i);

        i++;
      }
    }
  },
  createAvailableModuleButtons: function(moduleName, i) {
    var initButton = '';
    var self = this;
    initButton = Crafty.e('Button');
    initButton.set({
      color: '#00CC66',
      text: "Init Project",
      x:930,
      h:20,
      y: 170 + i*54,
      onClick: function() {
        self.company.initProject(moduleName);

      }
    });

  },
  render: function() {
    for(var n in this.buttons) {
      this.buttons[n].render();
    }
  }

})
