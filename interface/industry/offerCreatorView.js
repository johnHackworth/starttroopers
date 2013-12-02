Crafty.c("JobOfferCreatorView", {
  init: function() {
    this.requires('DOM, Text, Color, IndustryButtoner');
    this.attr({w:1200, h:700, x: 0, y: 0})
    this.color('rgba(200,50,50,.85)');
    this.company = tr.app.director.company;
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.createIndustryButtoner()
    this.renderHeader();
    this.renderOfferCreator();
    this.renderMinExperienceSelector();
    this.renderMaxWageSelector();
    this.renderSaveButton();
  },
  renderHeader: function() {
    this.header = Crafty.e('HeaderText');
    this.header.setName('New employee search', 'Create a new job offer');
    this.header.attr({x: 200})
    this.header.render();
  },
  renderOfferCreator: function() {
    this.typeTitle = Crafty.e('2D, DOM, HTML');
    this.typeTitle.append('<div class="typeTitle createOfferSection">Type of job</div>');
    this.typeTitle.attr({x:200, y:180, w:300, h:30});
    this.searchDesignCheck = Crafty.e('PropertyCheckbox')
    this.searchDesignCheck.assignFreeText('Design');
    this.searchDesignCheck.assignValue('design')
    this.searchDesignCheck.attr({x: 200, y: 230, w: 150, h: 30});
    this.searchDesignCheck.assignGroup('jobType');
    this.searchDesignCheck.select()
    this.searchDesignCheck.render();
    this.searchDesignCheck.bind('change', this.checkChanges.bind(this));
    this.searchEngineerCheck = Crafty.e('PropertyCheckbox')
    this.searchEngineerCheck.assignFreeText('Engineer');
    this.searchEngineerCheck.assignValue('engineering')
    this.searchEngineerCheck.attr({x: 350, y: 230, w: 150, h: 30});
    this.searchEngineerCheck.assignGroup('jobType');
    this.searchEngineerCheck.render();
    this.searchEngineerCheck.bind('change', this.checkChanges.bind(this));
    this.searchBusinessCheck = Crafty.e('PropertyCheckbox')
    this.searchBusinessCheck.assignFreeText('Business');
    this.searchBusinessCheck.assignValue('business')
    this.searchBusinessCheck.attr({x: 500, y: 230, w: 150, h: 30});
    this.searchBusinessCheck.assignGroup('jobType');
    this.searchBusinessCheck.render();
    this.searchBusinessCheck.bind('change', this.checkChanges.bind(this));

  },
  checkChanges: function(button) {
  },
  renderMinExperienceSelector: function() {
    this.expTitle = Crafty.e('2D, DOM, HTML');
    this.expTitle.append('<div class="expTitle createOfferSection">Minimal years of experience</div>');
    this.expTitle.attr({x:200, y:300, w:300, h:30});
    var minExperienceGroup = [0,1,2,3,4,5,6,7,8]
    for(var n in minExperienceGroup) {
      var exp = Crafty.e('PropertyCheckbox')
      exp.assignFreeText(n);
      exp.attr({x: 200 + n * 50, y: 350, w: 50, h: 30});
      exp.assignGroup('minExperience');
      if(n == 0) {
        exp.select();
      }
      exp.render();
      exp.bind('change', this.checkChanges.bind(this));
    }
  },
  renderMaxWageSelector: function() {
    this.expTitle = Crafty.e('2D, DOM, HTML');
    this.expTitle.append('<div class="wageTitle createOfferSection">Maximum desired wage</div>');
    this.expTitle.attr({x:200, y:400, w:300, h:30});
    var maxWagesGroup = ['none', 30000, 50000, 70000]
    for(var n in maxWagesGroup) {
      var wages = Crafty.e('PropertyCheckbox')
      wages.assignFreeText(maxWagesGroup[n]);
      wages.assignValue(maxWagesGroup[n])
      wages.attr({x: 200 + n * 100, y: 450, w: 100, h: 30});
      wages.assignGroup('maxWages');
      if(n == 0) {
        wages.select();
      }
      wages.render();
    }
  },
  renderSaveButton: function() {
    this.offerCreatorButton = Crafty.e('Button');
    this.offerCreatorButton.set({
      color: '#0077FF',
      text: "Post new offer",
      x: 200,
      y: 570,
      onClick: this.createNewOffer.bind(this)
    });
  },
  createNewOffer: function() {
    var minExperience = 0;
    var maxWage = 'none';
    var type = 'design';
    var checks = Crafty('PropertyCheckbox');
    for(var n in checks) {
      var check = Crafty(checks[n]);
      if(check.group === 'maxWages' && check.getState()) {
        maxWage = check.value;
      }
      if(check.group === 'minExperience' && check.getState()) {
        minExperience = check.value;
      }
      if(check.group === 'jobType' && check.getState()) {
        type = check.value;
      }
    }
    this.company.publishWorkOffer({
      type: type,
      maxWage: maxWage,
      minExperience: minExperience
    })

    Crafty.trigger('JobOffersSelected');
  }
})
