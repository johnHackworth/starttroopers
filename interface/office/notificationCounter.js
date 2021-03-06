Crafty.c('NotificationCounter', {
  notificationCounterHTML: '<div class="counter empty_%EMPTY%">%NOTIFICATIONS%</div>',
  hintText: 'Unread notifications',
  init: function(options) {
    this.requires('2D, DOM, HTML, Mouse, Hint');
    this.attr({w: 35, h:35})
    this.bind('Click', this.openNotification.bind(this));
    this.window = null;
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
        this.createPopUp(n);
        return;
      }
    }
    var lastNotification = this.company.notifications.length - 1;
    this.createPopUp(lastNotification);
  },
  createPopUp: function(n) {

    this.window && this.window.destroy();
    this.window = Crafty.e('Notification');
    this.window.setNotifications(this.company.notifications, n);
    this.window.set(this.company.notifications[n]);
  }
})
