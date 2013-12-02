Crafty.c('PersonFace', {
  size: 100,
  showNameFlag: true,
  _NOTIFICATION_DURATION: 60,
  init: function() {
    this.currentTurn = 0;
    this.lastNotificationInserted = 0;
    this.notifications = [];
    this.requires('2D, DOM, Text, Sprite, Tween, Mouse');
    this.attr({w:100, h:100, x: 5, y: 5, z:999999999});
    this.bind('MouseOver', this.showName.bind(this));
    this.bind('MouseOut', this.hideName.bind(this));
    this.bind('Click', this.selectPerson.bind(this));
    this.bind('EnterFrame', this.turn.bind(this));
  },
  delete: function() {
    this.unbind('MouseOver');
    this.unbind('MouseOut');
    this.unbind('Click');
    this.unbind('EnterFrame');
    this.person.off('conversation')
    this.destroy();
  },
  components: [
    "Background", "Face","Facialfeatures", "Beard", "Eyes", "Nose",  "Mouth", "Hair", "Glasses", "Clothes"
  ],
  overrideClick: function(f) {
    this.unbind('Click');
    this.bind('Click', f);
  },
  showName: function() {
    if(this.showNameFlag) {
      this.name.tween({alpha: 0.9}, 30);
    }
  },
  hideName: function() {
    if(this.showNameFlag) {
      this.name.tween({alpha: 0.0}, 30);
    }
  },
  setSize: function(size) {
    this.attr({
      x:size,
      y:size,
      w: size,
      h: size
    });
    for(var n in this.components) {
      this.size = size;
      this[this.components[n].toLowerCase()].setSize(this.size);
    }
    this.name.attr({w: size})
  },
  setPosition: function(x, y) {
    this.attr({x: x, y: y});
    for(var n in this.components) {
      this[this.components[n].toLowerCase()].attr({x:x, y: y})
    }
    this.name.attr({x: x, y:y + 2+ this.size})
  },
  assignPerson: function(options) {
    if(options.x && options.y) {
      this.attr({x: options.x, y: options.y})
      this.x = options.x;
      this.y = options.y + this.size;
    }
    this.person = options.person;
    for(var n in this.components) {
      this[this.components[n].toLowerCase()] = Crafty.e(this.components[n]);
      this[this.components[n].toLowerCase()].assignPerson(this.person);
    }
    this.name = Crafty.e('2D, DOM, Color, Text, Tween');
    this.name.text(this.person.name).attr({
      x: this.x,
      y: this.y,
      w: this.size,
      h: 15,
      alpha: 0.0
    }).css({
      textAlign: 'center',
      "border-radius": "3px"
    }).color('#333333')
    .textColor('#FEFEFE')
    this.render();
    this.person.on('conversation', this.addNotification.bind(this));
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  },
  selectPerson: function() {
    tr.app.director.selectedPerson = this.person;
    Crafty.trigger("PersonSelected");
  },
  addNotification: function(notification) {
    this.notifications.push({text:notification, turn: this.currentTurn});
  },
  turn: function() {
    this.currentTurn++;
    var toBeRemoved = [];
    if(this.notifications.length > 0) {
      for(var i = 0, l = this.notifications.length; i < l; i++) {
        if(this.currentTurn - this.notifications[i].turn > this._NOTIFICATION_DURATION) {
          toBeRemoved.push(i);
        } else {
          if(!this.notifications[i].view && this.currentTurn - this.lastNotificationInserted > this._NOTIFICATION_DURATION/4 ) {
            this.lastNotificationInserted = this.currentTurn;
            this.notifications[i].turn = this.currentTurn;
            this.notifications[i].view = Crafty.e('2D, DOM, Text, Tween');
            this.notifications[i].view.attr({
              x: this.attr('x'),
              y: this.attr('y') + this.size ,
              w: this.attr('w'),
              h: 15
            }).css({textAlign: "center"})
            .text(this.notifications[i].text)
            .textColor('#333333')
            .tween({y: this.attr('y')}, this._NOTIFICATION_DURATION);
          }
        }
      }
      this.talk();
      setTimeout(this.shutUp.bind(this), this._NOTIFICATION_DURATION * this.notifications.length)
    }
    toBeRemoved.reverse();
    for(var n in toBeRemoved) {
      if(this.notifications[toBeRemoved[n]]) {
        if(this.notifications[toBeRemoved[n]].view) {
          this.notifications[toBeRemoved[n]].view.destroy();
        }
        this.notifications.splice(toBeRemoved[n],1);
      }
    }
  },
  talk: function() {
    this.mouth.talking = true;
  },
  shutUp: function() {
    this.mouth.talking = false;
  }
});
