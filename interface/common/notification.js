Crafty.c('Notification', {
  number: [0],
  image: './assets/notifications/basic.png',
  notificationHTML: '<div class="notificationInner">'+
  '<div class="image"><img src="%IMAGE%"></img></div>' +
  '<div class="text">%TEXT%</div>' +
  '</div>',
  init: function() {
    var self = this;
    this.requires('2D, DOM, HTML, Mouse, Keyboard');
    this.number[0]++;
    this.id = this.number[0];
    this.x = 300 + 20*this.id;
    this.y = 150 + 20*this.id;
    this.attr({x: this.x, y: this.y, w: 600, h:400, z:99998})
    this.closeButton = Crafty.e('Button');
    this.closeButton.set({
      color: '#333333',
      text: "Close",
      y: this.y + 370,
      x: this.x + 500,
      z: 9999999,
      onClick: this.close.bind(this)
    })
    this.firstPlane();
    this.bind('Click', this.select.bind(this))
    this.bind('Remove', function(){self.number[0]--})
    this.bind('KeyDown', function() {
      if(self.isDown('ENTER') || self.isDown('ESC')) {
        self.close();
      }
    })

  },
  set: function(notification) {
    this.notification = notification;
    this.render();
    if(this.notification.type === 'person') {
      this.setPersonButton(this.notification.id);
    } else if (this.notification.type === 'project') {
      this.setProjectButton(this.notification.id);
    }
  },
  render: function() {
    this.append(this.notificationHTML
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
    this.notification.read = true;
    this.notification.company.trigger('notificationClose');
    this.closeButton.unbind('Click');
    this.closeButton.destroy();
    this.actionButton && this.actionButton.unbind('Click');
    this.actionButton && this.actionButton.destroy();
    this.destroy();
  },
  secondPlane: function() {
    this.attr({'z': 9999998});
    this.closeButton.attr({'z': 9999998});
    this.actionButton && this.actionButton.attr({'z': 9999998});
  },
  firstPlane: function() {
    this.attr({'z': 9999999});
    this.closeButton.attr({'z': 9999999})
    this.actionButton && this.actionButton.attr({'z': 9999999});
  },
  setPersonButton: function(personId) {
    var self = this;
    this.actionButton = Crafty.e('Button');
    this.actionButton.set({
      color: '#333333',
      text: "Profile",
      y: this.y + 370,
      x: this.x + 20,
      z: 9999999,
      onClick:function() {
        self.notification.read = true;
        self.notification.company.trigger('notificationClose');
        Crafty.trigger('PersonSelected', personId)
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
        self.notification.read = true;
        self.notification.company.trigger('notificationClose');
        Crafty.trigger('ProjectSelected', project)
      }
    })
  }
})
