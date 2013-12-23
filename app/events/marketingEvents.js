window.tr = window.tr || {};
window.tr.utils = window.tr.utils || {};

window.tr.utils.MarketingEvents = function(options) {

}

window.tr.utils.MarketingEvents.prototype = {
  getRandomMarketingEvent: function() {
    var n = tr.randInt(tr.data.marketingEvents.length)
    return tr.data.marketingEvents[n];
  },
  getMarketingChance: function(person) {
    if(tr.randInt() > 90) {
      var ev = this.getRandomMarketingEvent();
      this.applyMarketingEvent(ev, person);
      return ev;
    }
  },
  marketingEventNeverHappened: function(event) {
    var flagName = 'flag_' + event.title;
    if(this[flagName]) {
      return false;
    } else {
      this[flagName] = true;
      return true;
    }
  },
  applyMarketingEvent: function(event, person) {
    if(!event.precondition || event.precondition.apply(this)) {
      if(!event.unique || this.marketingEventNeverHappened(event)) {
        event.effects.apply(this);
        this.log(event.text.apply(this))
        if(event.notification && this.human) {
          this.addNotification({
            text: event.text.apply(this),
            type: "marketing",
            open: event.notification === 2
          })
        }
        if(person && event.conversation) {
          person.trigger('conversation', event.text.apply(this))
        }
      }
    }
  }
}
