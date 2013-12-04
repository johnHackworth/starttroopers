Crafty.c('PersonProfileButtoner', {
  init: function() {

  },
  createButtoner: function() {
    this.socialButton = Crafty.e('Button');
    this.socialButton.set({
      color: '#6666CC',
      text: "Social",
      y: 650,
      onClick: function() {
        Crafty.trigger('SocialSelected')
      }
    }),
    this.projectsButton = Crafty.e('Button');
    this.projectsButton.set({
      color: '#6666CC',
      text: "Projects",
      x: 120,
      y: 650,
      onClick: function() {
        Crafty.trigger('PersonProjectsSelected')
      }
    })
    this.contractButton = Crafty.e('Button');
    this.contractButton.set({
      color: '#6666CC',
      text: "Contract",
      x: 230,
      y: 650,
      onClick: function() {
        Crafty.trigger('PersonContractSelected')
      }
    })

  },
  createPositionButtons: function() {
    var self = this;
    var positions = this.positions;
    var i= 0;

    this.businessButton = Crafty.e('BusinessButton, raiseFunds');
    this.businessButton.setPerson(this.person);
    this.buttons.push(this.businessButton)
    this.businessButton.bind('toggle', this.redrawButtons.bind(this));

    this.marketingButton = Crafty.e('MarketingButton, raiseFunds');
    this.marketingButton.setPerson(this.person);
    this.buttons.push(this.marketingButton)
    this.marketingButton.bind('toggle', this.redrawButtons.bind(this));

    this.recruiterButton = Crafty.e('RecruiterButton, raiseFunds');
    this.recruiterButton.setPerson(this.person);
    this.buttons.push(this.recruiterButton)
    this.recruiterButton.bind('toggle', this.redrawButtons.bind(this));

    for(var n in positions) {
      var pos = positions[n].name;
      this[pos+'Button'] = Crafty.e('PositionButton');
      this.buttons.push(this[pos+'Button']);
      this[pos+'Button'].setOptions({
        person: this.person,
        text: this.positions[n].text,
        position: pos,
        x: 290+(110*i),
        y: 600
      })
      this[pos+'Button'].render();
      this[pos+'Button'].bind('toggle', this.redrawButtons.bind(this));
      i++;
    }
  },
  createOtherCompanyButtons: function() {
    this.scoutingButton = Crafty.e('RecruitingButton, raiseFunds');
    this.scoutingButton.setPerson(this.person);
    this.buttons.push(this.scoutingButton)
  },
  createPersonFace: function() {
    this.personFaceView = Crafty.e('PersonFace');
    this.personFaceView.assignPerson({
      person: this.person
    });
    this.personFaceView.setSize(200);
    this.personFaceView.setPosition(20,70);
  },
})
