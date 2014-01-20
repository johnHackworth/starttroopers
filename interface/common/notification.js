Crafty.c('Notification', {
  prevButtonHTML: '<div class="historyButton prevButton"><img src="./assets/ui/prev.png"></div>',
  nextButtonHTML: '<div class="historyButton nextButton"><img src="./assets/ui/next.png"></div>',
  totalNotificationsHTML: '<div class="totalNotifications">%POSITION% of %TOTAL%</div>',
  responseButtonHTML: '<div class="responseButton %CLASS%">%TEXT%</div>',
  number: [0],
  image: './assets/ui/no_photo.png',
  notificationHTML: '<div class="notificationInner">'+
  '<div class="subject">%SUBJECT%</div>' +
  '<div class="image"><img src="%IMAGE%"></img></div>' +
  '<div class="textContainer">' +
  '<div class="from"><strong>%FROM%</strong> %CODEDFROM% </div>' +
  '<div class="to">to me</div>' +
  '<div class="text">%TEXT%</div>' +
  '</div>' +
  '</div>',
  init: function() {
    var self = this;
    this.requires('2D, DOM, HTML, Mouse, Faces, Keyboard, Draggable');
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
    this.enableDrag();

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
    this.setOptions(notification.options);
    this.setNavigationButtons();
    this.setOptionButtons();
    if(this.notification.type === 'person') {
      this.setPersonButton(this.notification.id);
      this.setPersonFace(this.notification.person);
    } else if (this.notification.type === 'project') {
      this.setProjectButton(this.notification.id);
    }

    this.triggerTimeCounter();
    this.firstPlane();

  },
  triggerTimeCounter: function() {
    var self = this;
    this.timeRead = setTimeout(function() {
      if(self.notification) {
        self.notification.read = true;
        self.notification.company.trigger('notificationClose');
      }
    }, 3000);

  },
  render: function() {
    var subject = '';
    var from = '';
    if(this.notification.getSubject) {
      subject = this.notification.getSubject();
      from = this.notification.getFrom();
    }
    this.replace(this.notificationHTML
      .replace(/%TEXT%/g, this.notification.text)
      .replace(/%SUBJECT%/g, subject)
      .replace(/%FROM%/g, from)
      .replace(/%CODEDFROM%/g, ('&lt;' + from.split(' ').join('.')).toLowerCase() + '@&pi;mail.com&gt;')
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
    this.closeButton && this.closeButton.attr({'z': 9999999});
    this.closeButton && this.attach(this.closeButton);
    this.actionButton && this.actionButton.attr({'z': 9999999});
    this.actionButton && this.attach(this.actionButton)
    this.personFace && this.personFace.setZ(9999999999)
    this.prevButton && this.attach(this.prevButton);
    this.nextButton && this.attach(this.nextButton);
    this.personFace && this.attach(this.personFace)
    this.notificationInfo && this.attach(this.notificationInfo);
        window.aaa = this.personFace
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
        var person = self.world.getPersonById(personId);
        if(person) {
          Crafty.trigger('PersonSelected',person);
        }
      }
    });
  },
  setPersonFace: function(person) {
    this.personFace && this.personFace.destroy();
    this.personFace = this.createOtherFace(person, 348, 248);
    this.personFace.setSquareBackground();
    this.personFace.setBlackAndWhite();
    this.personFace.setSize(55)
    this.personFace._attr({z:9999999999})
    this.personFace.overrideClick(function(){})
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
    this.responseTitle && this.responseTitle.destroy();
    this.notificationInfo && this.notificationInfo.destroy();
    this.closeButton && this.closeButton.unbind('Click');
    this.closeButton && this.closeButton.destroy();
    this.actionButton && this.actionButton.unbind('Click');
    this.actionButton && this.actionButton.destroy();
    this.prevButton && this.prevButton.unbind('Click');
    this.prevButton && this.prevButton.destroy();
    this.nextButton && this.nextButton.unbind('Click');
    this.nextButton && this.nextButton.destroy();
    this.personFace && this.personFace.destroy();
    for(var i in this.responseButtons) {
      this.responseButtons[i].unbind('Click');
      this.responseButtons[i].destroy();
    }
    clearTimeout(this.timeRead);
  },
  getNotificationNumber: function() {
    for(var i =0, l = this.notifications.length; i < l; i++) {
      if(this.notifications[i] === this.notification) {
        return i + 1;
      }
    }
    return 0;
  },
  notificationsInfo: function() {
    if(this.notifications) {
      var totalNotifications = this.notifications.length;
      var notifNumber = this.getNotificationNumber();
      return [totalNotifications, notifNumber]
    }
    return [0, 0]
  },
  setOptions: function(options) {
    this.responseOptions = options;
    this.response = null;
  },
  setOptionButtons: function() {
    window.not = this;
    this.responseButtons = [];
    if(this.responseOptions) {
      this.attr({
        h: 440 + this.responseOptions.length * 40
      })
      var titleText = 'Choose a response:';
      if(this.notification.response) {
        titleText = 'Your response:';
      }
      this.responseTitle = Crafty.e('2D, DOM, HTML');
      this.responseTitle.replace(
        '<div class="responseTitle">'+titleText+'</div>'
      ).attr({
          x: this.x + 30,
          y: this.y + 415 ,
          w: 550,
          h: 30,
          z: 99999999
        })
      for(var i in this.responseOptions) {
        var responseButton = Crafty.e('2D, DOM, HTML, Mouse');
        var classOption = '';
        if(this.notification.response) {
          classOption = 'notSelected'
        }
        if(this.notification.response === this.responseOptions[i]) {
          classOption = 'selected'
        }
        responseButton.replace(
          this.responseButtonHTML
            .replace(/%TEXT%/g, this.responseOptions[i].text)
            .replace(/%CLASS%/g, classOption)
        )
        responseButton.attr({
          x: this.x + 30,
          y: this.y + 445 + 35 * i,
          w: 550,
          h: 30,
          z: 99999999
        })
        if(!this.notification.response) {
          responseButton.bind('Click', this.createNotificationOptionResponse(this.responseOptions[i]));
        }
        this.responseButtons.push(responseButton);
      }
    } else {
      this.attr({
        h: 400
      })
    }
  },
  createNotificationOptionResponse: function(opt) {
    var self = this;
    var option = opt;
    return function() {
      self.notification.response = option;
      option.action.call(self.notification);
      self.set(self.notification);
    }
  }
})
