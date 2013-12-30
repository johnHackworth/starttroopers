window.tr = window.tr || {};
window.tr.utils = window.tr.utils || {};

window.tr.utils.PersonEvent = function(options) {

}

window.tr.utils.PersonEvent.prototype = {
  getRandomEvent: function() {
    var n = tr.randInt(tr.data.userEvents.length)
    return tr.data.userEvents[n];
  },
  eventChance: function() {
    if(tr.randInt() >= 95) {
      var ev = this.getRandomEvent();
      this.applyEvent(ev);
    }
  },
  eventNeverHappened: function(event) {
    var flagName = 'flag_' + event.title;
    if(this[flagName]) {
      return false;
    } else {
      this[flagName] = true;
      return true;
    }
  },
  applyEvent: function(event) {
    if(!event.precondition || event.precondition.apply(this)) {
      if(!event.unique || this.eventNeverHappened(event)) {
        event.effects.apply(this);
        if(event.notification && this.company && this.company.human) {
          this.company.addNotification({
            text: this.name+": "+ event.text.apply(this),
            type: "person",
            id: this.id,
            open: event.notification === 2,
            options: event.options,
            entity: this
          })
        }
        if(event.conversation) {
          this.trigger('conversation', event.text.apply(this))
        }
      }
    }
  }
}
