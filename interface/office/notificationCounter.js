Crafty.c('NotificationCounter', {
  notificationCounterHTML: '<div class="counter empty_%EMPTY%">%NOTIFICATIONS%</div>',
  hintText: 'Unread notifications',
  init: function(options) {
    this.requires('2D, DOM, HTML, Mouse, Hint');
    this.attr({w: 35, h:35})
    this.bind('Click', this.openNotification.bind(this));
  },
  assignCompany: function(company) {
    this.company = company;
  },
  render: function() {
    var unread = this.company.getUnreadNotifications();
    this.replace(this.notificationCounterHTML
      .replace(/%NOTIFICATIONS%/g, unread)
      .replace(/%EMPTY%/g, unread === 0)
    )
  },
  openNotification: function() {
    for(var n in this.company.notifications) {
      if(this.company.notifications[n].read === false) {
        this.createPopUp(this.company.notifications[n]);
        return;
      }
    }
  },
  createPopUp: function(notif) {
    var pop = Crafty.e('Notification');
    pop.set(notif)
  }
})
