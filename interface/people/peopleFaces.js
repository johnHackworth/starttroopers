Crafty.c('PersonFace', {
  size: 100,
  showNameFlag: true,
  _NOTIFICATION_DURATION: 120,
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
    this.bind('Remove', this.delete.bind(this));
    this.clearTimeouts();
  },
  delete: function() {
    this.unbind('MouseOver');
    this.unbind('MouseOut');
    this.unbind('Click');
    this.unbind('EnterFrame');
    this.person.off('conversation')
    this.clearTimeouts();
    for(var n in this.components) {
      this[this.components[n].toLowerCase()].destroy();
    }
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
      w: size,
      h: size
    });
    for(var n in this.components) {
      this.size = size;
      this[this.components[n].toLowerCase()].setSize(this.size);
    }
    this.name.attr({w: size, h: 15,
      x: this.x, y:this.y + 2+ this.size})
  },
  setPosition: function(x, y) {
    this.attr({x: x, y: y});
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
      w: this.size,
      h: 15,
      alpha: 0.0
    }).css({
      textAlign: 'center',
      "border-radius": "3px"
    }).color('#333333')
    .textColor('#FEFEFE')
    this.attachLayers();
    this.render();
    this.person.on('conversation', this.addNotification.bind(this));

  },
  attachLayers: function() {
    for(var n in this.components) {
      this.attach(this[this.components[n].toLowerCase()]);
    }
    this.attach(this.name);
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  },
  selectPerson: function() {
    if(!this.dragging) {
      Crafty.trigger("PersonSelected", this.person);
    }
  },
  addNotification: function(notification) {
    for(var i in this.notifications) {
      if(!this.notifications ||
        (this.notifications[i] &&
        this.notifications[i].text === notification &&
        this.notifications[i].turn === this.currentTurn
        )
      ) {
        return;
      }
    }
    this.notifications.unshift({text:notification, turn: this.currentTurn});
  },
  clearTimeouts: function() {
    if(!this.notifTimeouts) this.notifTimeouts = [];
    var timeout = this.notifTimeouts.pop();
    while(timeout) {
      clearTimeout(timeout);
      timeout = this.notifTimeouts.pop();
    }
  },
  turn: function() {
    var self = this;
    this.currentTurn++;
    var toBeRemoved = [];
    var notif = this.notifications.pop();
    var notifDelay = 0;
    while(notif) {
      notifDelay += tr.randInt(2000)
      var timeout = setTimeout(
        (function(notif) {
          return function() {
            self.trigger('newNotif');
            notif.view = Crafty.e('2D, DOM, HTML, Tween');
            notif.view.attr({
              x: self.attr('x') + (self.size / 3),
              y: self.attr('y') + self.size - 20 ,
              w: self.attr('w'),
              h: 15,
              alpha: 0.6
            }).css({textAlign: "center"})
            .replace('<div class="conversationText">'+notif.text+'</div>')
            .tween({alpha: 1, y: self.attr('y')}, self._NOTIFICATION_DURATION);
            notif.destroyExt = self.destroyNotif(notif);
            self.bind('newNotif', notif.destroyExt)
            self.talk();
            setTimeout(self.destroyNotif(notif), self._NOTIFICATION_DURATION * 30)
          }
        })(notif),
        notifDelay
      )
      this.notifTimeouts.push(timeout);
      notifDelay += self._NOTIFICATION_DURATION * 30;
      notifDelay += tr.randInt(2000)

      notif = this.notifications.pop()
    }
    // for(var n in toBeRemoved) {
    //   if(this.notifications[toBeRemoved[n]]) {
    //     if(this.notifications[toBeRemoved[n]].view) {
    //       this.notifications[toBeRemoved[n]].view.destroy();
    //     }
    //     this.notifications.splice(toBeRemoved[n],1);
    //   }
    // }
  },
  destroyNotif: function(notifParam) {
    var self = this;
    var notif = notifParam;
    return function() {
      self.unbind('newNotif', notif.destroyExt)
      self.shutUp();
      notif.view.destroy();
    }
  },
  talk: function() {
    this.mouth.talking = true;
  },
  shutUp: function() {
    this.mouth.talking = false;
  }
});
