Crafty.c('ProductProfile', {
  _MODULE_HEIGHT: 110,
  _DEVELOPING_X: 775,
  _SOON_AVAILABLE_X: 275,
  _BACKLOG_X: 25,
  _AVAILABLE_X: 525,
  _MODULE_LIST_SIZE: 4,
  _PAGINATION_Y: 715,
  availablePage: 0,
  soonAvailablePage: 0,
  developingPage: 0,
  backlogPage: 0,
  productHTML: '<div class="productInfo">'+
  '<div class="title">%NAME%</div>'+
  '</div>',
  moduleHTML: '<div class="module released_%RELEASED%"><div class="title">%NAME%</div> <div class="currentPhase">%PHASENAME%</div><div class="knowBugsSection">%KNOWBUGS% bugs</div></div>',
  availableModuleHTML: '<div class="module available"><div class="title">%NAME%</div> <div class="description">%DESCRIPTION%</div></div>',
  init: function() {
    this.requires('2D, DOM, Color');
    this.attr({w:1190, h:790, x: 5, y: 5});
    this.color('rgba(35, 113, 159, 0.9)');
    this.company = tr.app.director.company;
    this.product = this.company.product;
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.renderProduct();
    this.render();
    this.buttons = [];
    this.createButtoner();
    this.bindProductChange = this.product.on('change', function() {Crafty.scene('Product');});
    this.bind('Remove', this.delete.bind(this));
  },
  delete: function() {
    this.product.off('change', this.bindProductChange);
  },
  createButtoner: function() {

  },
  renderProduct: function() {
    this.productInfo = Crafty.e('2D, DOM, HTML');
    this.productInfo.attr({
      x:20,
      y:70,
      w:1000,
      h:200
    })
    this.productInfo.append(
      this.productHTML.replace(/%NAME%/g, this.company.product.name)
    )
    this.renderModules();
    this.renderAvailableModules();
    this.renderSoonAvailableModules();
    this.renderBacklog();
  },
  renderModules: function() {
    this.clearModules('developingModules')
    var i = 0;
    var nAvailable = this.product.modules.length;
    var n = this.developingPage * this._MODULE_LIST_SIZE;
    var limit = n + this._MODULE_LIST_SIZE;
    limit = limit > nAvailable? nAvailable: limit;
    while(n < limit) {
      var module = Crafty.e('2D, DOM, HTML, Mouse, Hint');
      module.attr({
        x: this._DEVELOPING_X,
        y:200 + Math.floor(i/2) * 60,
        w:200,
        h: this._MODULE_HEIGHT,
        z: 11
      });
      module.hintWidth = 400;
      module.hintMargin = 5;
      module.hintText = this.product.modules[n].project.module.description;
      module.append(
        this.moduleHTML
        .replace(/%NAME%/g, this.product.modules[n].name)
        .replace(/%RELEASED%/g, this.product.modules[n].released)
        .replace(/%PHASENAME%/g, this.product.modules[n].project.phase.name)
        .replace(/%KNOWBUGS%/g, this.product.modules[n].project.knowBugs)

      );
      var name = this.product.modules[n].name
      module.bind('Click', this.createModuleClickResponse(this.product.modules[n]));
      if(this.product.modules[n].project.phase.name != 'test') {
        var progressBar = Crafty.e('ProgressBar');
        progressBar.setOptions({
          w: 180,
          h: 12,
          x: this._DEVELOPING_X + 8,
          y: 240 + Math.floor(i/2) * 60,
          z: 12
        });
        progressBar.setValue(this.product.modules[n].project.phaseCompletedness());
      }
      this.createModuleButtons(this.product.modules[n], i)
      this['developingModules'].push(module);
      i++;
      n++;
    }
    this.createModulesContainer('modulesBackground', this._DEVELOPING_X - 10, this.product.modules.length, 'Developing');
    this.pagination('developingPage', nAvailable, this._DEVELOPING_X - 10, this.renderModules.bind(this));
  },
  createModulesContainer: function(name, x, nModules, text) {
    var containerHeight = this._MODULE_HEIGHT * this._MODULE_LIST_SIZE + 80;
    this['name'] = Crafty.e('2D, DOM, HTML, moduleContainer');
    this['name'].attr({
      h: containerHeight,
      w: 220,
      x: x,
      y: 165,
      z: 10
    }).replace(text)
  },
  createModuleClickResponse: function(module) {
    var localModule = module;
    return (function() {
      tr.app.director.selectedId = module.project;
      Crafty.trigger('ProjectSelected');
    }).bind(this);
  },
  createModuleButtons: function(module, i) {
    var launchButton = '';
    if(module.released && !module.project.isRefactor) {
      launchButton = Crafty.e('2D, DOM, HTML');
      launchButton.append('<div class="launched">Shipped</div>')
      launchButton.attr({
        x: 300 + (i%2)*500,
        y: 200 + Math.floor(i/2)* 50,
        color: '#FCFCFC',
        textColor: '#008833'
      })
      this.createRefactorButton(module.project, i);
    } else {
      this.createOnGoingProjectButtons(module, i)
    }

  },
  createOnGoingProjectButtons: function(module, i) {
    var project = module.project;
    var launchButton = null;
    var nextPhaseButton = null;
    var refactorButton = null;
    if(project.phase.name == 'test') {
      launchButton = Crafty.e('Button');
      launchButton.set({
        color: '#CCAA00',
        text: "Ship it",
        x: 254 + (i%2)*500,
        y: 203 + Math.floor(i/2)* 50,
        hintText: "Open to public! Remember, if you don't test it enough you won't find all the possible bugs and the product will fail on the wild!",
        onClick: function() {
          module.project.launchProduct();
          module.trigger('change')
        }
      });
    }
    if(project.phase.name != 'test') {
      this.createNextPhaseButton(project, i);
    } else {

    }
  },
  createNextPhaseButton: function(project, i) {
    var color = '#999999';
    var textColor = '#666666'
    var click = function() {}
    if(project.phaseCompletedness() >=99) {
      color = '#DDDD66';
      textColor = '#333333';
      click = function() {
        project.nextPhase();
      }
    }
    var nextPhaseButton = Crafty.e('Button');
    nextPhaseButton.set({
      color: 'transparent',
      textColor:  textColor,
      hintText: 'Proceed to the next phase of the project. Only avaible when all the areas are completed.',
      text: "Next phase",
      x: this._DEVELOPING_X,
      y: 270 + Math.floor(i/2)* 110,
      onClick: click
    });
  },
  createRefactorButton: function(project, i) {
    var color = '#FF9999';
    var textColor = '#222222'
    var click = function() {
      project.beginRefactor();
    }
    var refactorButton = Crafty.e('Button');
    refactorButton.set({
      color: color,
      textColor:  textColor,
      hintText: 'Redo the project from scratch. Best way to improve quality overall',
      text: "Begin refactor",
      x: 490 + (i%2)* 600,
      y: 202 + Math.floor(i/2)* 50,
      onClick: click
    });
  },
  renderAvailableModules: function() {
    this.clearModules('availableModules');
    var self = this;
    var available = this.product.getAvailableModules();
    var i = 0;
    var nAvailable = available.length;
    var n = this.availablePage * this._MODULE_LIST_SIZE;
    var limit = n + this._MODULE_LIST_SIZE;
    limit = limit > nAvailable? nAvailable: limit;
    while(n < limit) {
      if(!available[n].started) {
        var module = Crafty.e('2D, DOM, HTML, Mouse, Hint')
          module.attr({
          x: this._AVAILABLE_X,
          y:200 + i * 115,
          w:200,
          h: this._MODULE_HEIGHT,
          z: 11
        })
        module.hintWidth = 400;
        module.hintMargin = 2;
        module.hintText = available[n].description;
        module.append(
          this.availableModuleHTML
          .replace(/%NAME%/g, available[n].name)
          .replace(/%DESCRIPTION%/g, available[n].description)
        )
        module.bind('Click', this.createAvailableClickResponse(this.product.availableModules[n]))
        this.createAvailableModuleButtons(available[n].id, i);
        this['availableModules'].push(module);
        i++;
      }
      n++;
    }
    this.createModulesContainer('availableModulesBackground', this._AVAILABLE_X - 10, available.length, 'Available')
    this.pagination('availablePage', nAvailable, this._AVAILABLE_X - 10, this.renderAvailableModules.bind(this));

  },
  createAvailableClickResponse: function(module) {
    var localModule = module;
    return (function() {

    }).bind(this);
  },
  createAvailableModuleButtons: function(moduleName, i) {
    var initButton = '';
    var self = this;
    initButton = Crafty.e('Button');
    initButton.set({
      color: '#00CC66',
      text: "Init Project",
      x:500 + ((i+1)%2) * 600,
      h:20,
      y:260 + Math.floor(i/2) * 50,
      onClick: function() {
        self.company.initProject(moduleName);
      }
    });

  },
  renderBacklog: function() {
    this.clearModules('backlog');
    var self = this;
    var i = 0;
    var available = this.product.getBacklog();
    var nAvailable = available.length;
    var n = this.backlogPage * this._MODULE_LIST_SIZE;
    var limit = n + this._MODULE_LIST_SIZE;
    limit = limit > nAvailable? nAvailable: limit;
    while(n < limit) {
      if(!available[n].started) {
        var module = Crafty.e('2D, DOM, HTML, Mouse, Hint')
          module.attr({
          x: this._BACKLOG_X,
          y:200 + i * 115,
          w:200,
          h: this._MODULE_HEIGHT,
          z: 11
        })
        module.hintWidth = 400;
        module.hintMargin = 2;
        module.hintText = available[n].description;
        module.append(
          this.availableModuleHTML
          .replace(/%NAME%/g, available[n].name)
          .replace(/%DESCRIPTION%/g, available[n].description)
        )
        i++;
        this['backlog'].push(module);
      }
      n++;
    }
    this.createModulesContainer('backlogPage', this._BACKLOG_X - 10, available.length, 'Backlog')
    this.pagination('backlogPage', nAvailable, this._BACKLOG_X - 10, this.renderBacklog.bind(this));
  },
  renderSoonAvailableModules: function() {
    this.clearModules('soonAvailable');
    var self = this;
    var i = 0;
    var available = this.product.getSoonAvailableModules();
    var nAvailable = available.length;
    var n = this.soonAvailablePage * this._MODULE_LIST_SIZE;
    var limit = n + this._MODULE_LIST_SIZE;
    limit = limit > nAvailable? nAvailable: limit;
    while(n < limit) {
      if(!available[n].started) {
        var module = Crafty.e('2D, DOM, HTML, Mouse, Hint')
          module.attr({
          x: this._SOON_AVAILABLE_X,
          y:200 + i * 115,
          w:200,
          h: this._MODULE_HEIGHT,
          z: 11
        })
        module.hintWidth = 400;
        module.hintMargin = 2;
        module.hintText = available[n].description;
        module.append(
          this.availableModuleHTML
          .replace(/%NAME%/g, available[n].name)
          .replace(/%DESCRIPTION%/g, available[n].description)
        )
        i++;
        this['soonAvailable'].push(module);
      }
      n++;
    }
    this.createModulesContainer('soonModulesBackground', this._SOON_AVAILABLE_X - 10, available.length, 'Soon Available')
    this.pagination('soonAvailablePage', nAvailable, this._SOON_AVAILABLE_X - 10, this.renderSoonAvailableModules.bind(this));
  },
  render: function() {
    for(var n in this.buttons) {
      this.buttons[n].render();
    }
  },
  pagination: function(pageName, total, baseX, refreshMethod) {
    var page = this[pageName];
    var pages = [];
    var nPages = Math.ceil(total % this._MODULE_LIST_SIZE);
    for(var i = 0; i < nPages; i++) {
      var pageButton = Crafty.e('2D, DOM, HTML, Mouse, paginationButton');
      if(i == page) {
        pageButton.addComponent('actualPage')
      }
      pageButton.attr({
        x: baseX + 35 *i,
        y: this._PAGINATION_Y,
        h: 30,
        w: 30,
        z: 12
      }).replace('<span>'+i+'</span>');
      pageButton.bind('Click', this.generatePaginationResponse(i, pageName, refreshMethod))
    }
  },
  generatePaginationResponse: function(n, name, refreshMethod) {
    var pageNumber = n;
    var pageName = name;
    var self = this;
    return function() {
      self[pageName] = pageNumber;
      refreshMethod();
    }
  },
  clearModules: function(modulesName) {
    for(var i in this[modulesName]) {
      this[modulesName][i].destroy();
    }
    this[modulesName] = [];
  }

})
