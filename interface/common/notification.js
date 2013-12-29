Crafty.c('Notification', {
  prevButtonHTML: '<div class="historyButton prevButton"><img src="/assets/ui/prev.png"></div>',
  nextButtonHTML: '<div class="historyButton nextButton"><img src="/assets/ui/next.png"></div>',
  totalNotificationsHTML: '<div class="totalNotifications">%POSITION% of %TOTAL%</div>',
  number: [0],
  image: './assets/notifications/basic.png',
  notificationHTML: '<div class="notificationInner">'+
  '<div class="image"><img src="%IMAGE%"></img></div>' +
  '<div class="text">%TEXT%</div>' +
  '</div>',
  init: function() {
    var self = this;
    this.requires('2D, DOM, HTML, Mouse, Keyboard');
    this.world = tr.app.director.world;
    this.number[0]++;
    this.id = this.number[0];
    this.x = 300 + 20*this.id;
    this.y = 150 + 20*this.id;
    this.attr({x: this.x, y: this.y, w: 600, h:400, z:99998})
    this.bind('Click', this.select.bind(this))
    this.bind('Remove', function(){
      self.number[0]--;
      self.removeButtons();
    })
    this.bind('KeyDown', function() {
      if(self.isDown('ENTER') || self.isDown('ESC')) {
        self.close();
      }
    })

  },
  set: function(notification) {
    var self = this;
    this.notification = notification;
    this.removeButtons();
    this.render();
    this.closeButton = Crafty.e('Button');
    this.closeButton.set({
      color: '#333333',
      text: "Close",
      y: this.y + 370,
      x: this.x + 500,
      z: 9999999,
      onClick: this.close.bind(this)
    })
    this.setNavigationButtons();
    if(this.notification.type === 'person') {
      this.setPersonButton(this.notification.id);
    } else if (this.notification.type === 'project') {
      this.setProjectButton(this.notification.id);
    }

    this.firstPlane();
    this.timeRead = setTimeout(function() {
      if(self.notification) {
        self.notification.read = true;
        self.notification.company.trigger('notificationClose');
      }
    }, 3000)
  },
  render: function() {
    this.replace(this.notificationHTML
      .replace(/%TEXT%/g, this.notification.text)
      .replace(/%IMAGE%/g, this.image)
    );
  },
  select: function() {
    var notifications = Crafty('Notification');
    for(var n = 0, l = notifications.length; n <l; n++) {
      Crafty(notifications[n]).secondPlane();
    }
    this.firstPlane();
  },

  close: function() {
    if(this.notification) {
      this.notification.read = true;
      this.notification.company.trigger('notificationClose');
    }
    this.removeButtons();
    this.destroy();
  },
  secondPlane: function() {
    this.attr({'z': 9999998});
    this.closeButton.attr({'z': 9999998});
    this.actionButton && this.actionButton.attr({'z': 9999998});
  },
  firstPlane: function() {
    this.attr({'z': 9999999});
    this.closeButton && this.closeButton.attr({'z': 9999999})
    this.actionButton && this.actionButton.attr({'z': 9999999});
  },
  setPersonButton: function(personId) {
    var self = this;
    this.actionButton = Crafty.e('Button');
    this.actionButton.set({
      color: '#333333',
      text: "Profile",
      y: this.y + 370,
      x: this.x + this.w - 210,
      z: 9999999,
      onClick:function() {
        if(self.notification) {
          self.notification.read = true;
          self.notification.company.trigger('notificationClose');
        }
        var person = null;
        for(var n in self.world.people) {
          if(self.world.people[n].id === personId) {
            Crafty.trigger('PersonSelected',self.world.people[n]);
            return;
          }
        }
      }
    })
  },
  setProjectButton: function(project) {
    var self = this;
    this.actionButton = Crafty.e('Button');
    this.actionButton.set({
      color: '#333333',
      text: "Project",
      y: this.y + 370,
      x: this.x + 20,
      z: 9999999,
      onClick:function() {
        if(self.notification) {
          self.notification.read = true;
          self.notification.company.trigger('notificationClose');
        }
        Crafty.trigger('ProjectSelected', project)
      }
    })
  },
  setNavigationButtons: function() {
    var self = this;
    this.prevButton = Crafty.e('2D, DOM, HTML, Mouse');
    this.prevButton.replace(this.prevButtonHTML);
    this.prevButton.attr({
      y: this.y + 370,
      x: this.x + 20,
      z: 9999999,
      w: 40,
      h: 30
    });
    this.prevButton.bind('Click', this.prevNotification.bind(this))
    this.nextButton = Crafty.e('2D, DOM, HTML, Mouse');
    this.nextButton.replace(this.nextButtonHTML);
    this.nextButton.attr({
      y: this.y + 370,
      x: this.x + 65,
      z: 9999999,
      w: 40,
      h: 30
    });
    this.nextButton.bind('Click', this.nextNotification.bind(this))
    this.setNotificationsInfo();
  },
  setNotificationsInfo: function(){
    var info = this.notificationsInfo();
    this.notificationInfo = Crafty.e('2D, DOM, HTML');
    this.notificationInfo.attr({
      y: this.y + 372,
      x: this.x + 120,
      z: 9999999,
      w: 80,
      h: 30
    });
    this.notificationInfo.replace(
      this.totalNotificationsHTML
        .replace(/%POSITION%/g, info[1])
        .replace(/%TOTAL%/g, info[0])
    );
  },
  setNotifications: function(notifications, pointer) {
    this.notifications = notifications;
    this.pointer = pointer;
  },
  setNotificationByNumber: function() {
    var self = this;
    if(self.notification) {
      self.notification.read = true;
      self.notification.company.trigger('notificationClose');
    }
    var lastNotification = this.notifications.length - 1;
    var notificationPosition = lastNotification - this.pointer;
    notificationPosition = notificationPosition > lastNotification? lastNotification : notificationPosition;
    notificationPosition = notificationPosition < 0? 0 : notificationPosition;
    var newNotification = this.notifications[notificationPosition];
    this.set(newNotification);
  },
  prevNotification: function() {
    this.pointer++;
    if(this.pointer > this.notifications.length -1) {
      this.pointer = this.notifications.length - 1;
    };
    this.setNotificationByNumber();
  },
  nextNotification: function() {
    this.pointer--;
    if(this.pointer < 0) {
      this.pointer = 0
    };
    this.setNotificationByNumber();
  },
  removeButtons: function() {
    this.notificationInfo && this.notificationInfo.destroy();
    this.closeButton && this.closeButton.unbind('Click');
    this.closeButton && this.closeButton.destroy();
    this.actionButton && this.actionButton.unbind('Click');
    this.actionButton && this.actionButton.destroy();
    this.prevButton && this.prevButton.unbind('Click');
    this.prevButton && this.prevButton.destroy();
    this.nextButton && this.nextButton.unbind('Click');
    this.nextButton && this.nextButton.destroy();
    clearTimeout(this.timeRead);
  },
  notificationsInfo: function() {
    if(this.notifications) {
      var totalNotifications = this.notifications.length;
      var notifNumber = totalNotifications - this.pointer;
      return [totalNotifications, notifNumber]
    }
    return [0, 0]
  }
})
