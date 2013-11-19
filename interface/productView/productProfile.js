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
      i++;
      i++;
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
        i++;
      }
    }
  },
  render: function() {
    for(var n in this.buttons) {
      this.buttons[n].render();
    }
  }

})
