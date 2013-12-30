Crafty.c('InteractionView', {
  personalDataHTML: "<div class='socialData'>"+
  "<div class='name'>Interact with %NAME%</div>"+
  "</div>",
  init: function() {
    this.conversationOptionViews = [];
    this.requires('2D, DOM, Color, Faces, PersonProfileButtoner');
    this.attr({w:1200, h: 800, x: 0, y: 0});
    this.color('rgb(104,154,104)');
    this.person = tr.app.director.selectedId;
    this.company = tr.app.director.company;
    this.statusBar = Crafty.e('StatusBar, PersonProfileButtoner');
    this.statusBar.createOfficeButton();
    this.renderPersonData();
    this.render();
    this.buttons = [];
    this.createPersonFace();
    this.createButtoner();
    this.createFireButton();
    if(!this.person.response) {
      this.createInteractionButtons();
    } else {
      this.createResponseView();
    }
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  },

  renderPersonData: function() {
    this.personalData = Crafty.e('2D, DOM, HTML');
    this.personalData.attr({
      x: 250,
      y: 70,
      w: 600,
      h: 300
    }).append(
      this.personalDataHTML
      .replace(/%NAME%/g, this.person.name)
    );
  },
  render: function() {
    for(var n in this.buttons) {
      this.buttons[n].render();
    }
  },
  createFireButton: function() {
    var self = this;
    if(this.person.company.human) {
      this.fireButton = Crafty.e('Button');
      this.fireButton.set({
        color: '#ff6655',
        text: "FIRE PERSON",
        x: 1050,
        y: 80,
        onClick: function() {
          self.person.fire();
        }
      })
    }
  },
  clearInteractionOptions: function() {
    for(var n in this.conversationOptionViews) {
      this.conversationOptionViews[n].destroy();
    }
    this.interactionOptionsTitle && this.interactionOptionsTitle.destroy();
  },
  createInteractionButtons: function() {
    var self = this;
    this.clearInteractionOptions();
    this.interactionOptionsTitle = Crafty.e('2D, DOM, HTML');
    this.interactionOptionsTitle.attr({
      x: 250,
      y: 130,
      w: 600,
      h: 30,
      z: 99999999
    }).replace('<div class="conversationTitle">Conversation options</div>')
    var conversationOptions = this.person.getTalkOptions();
    for(var i = 0, l = conversationOptions.length; i <l; i++) {
      var convOptionView = Crafty.e('2D, DOM, HTML, Mouse');
      convOptionView.attr({
        x:250,
        y: 180 + i * 35,
        h: 30,
        w: 600
      }).replace('<div class="conversationOption">'+conversationOptions[i].text+'</div>')
        .bind('Click', (function(n) {
          var option = n;
          return function() {
            var resp = self.person.talk(option.id);
            resp.interactionText = option.text;
            self.createResponseView();
          }
        })(conversationOptions[i]));
      this.conversationOptionViews.push(convOptionView);
    }
  },
  createResponseView: function() {
    this.clearInteractionOptions();
    this.interactionOptionsTitle = Crafty.e('2D, DOM, HTML');
    this.interactionOptionsTitle.attr({
      x: 250,
      y: 130,
      w: 600,
      h: 30,
      z: 99999999
    }).replace('<div class="conversationTitle">Recent conversation</div>')


    this.interactionTextView = Crafty.e('2D, DOM, HTML');
    this.interactionTextView.attr({
      x: 250,
      y: 200,
      w: 600,
      h: 30,
      z: 99999999
    }).replace('<div class="responseInteractionView"><span>You:</span> '+this.person.response.interactionText+'</div>')

    this.responseView = Crafty.e('2D, DOM, HTML');
    this.responseView.attr({
      x: 250,
      y: 250,
      w: 600,
      h: 30,
      z: 99999999
    }).replace('<div class="responseView"><span>'+this.person.pronoum()+':</span> '+this.person.response.text+'</div>')

  }
})

