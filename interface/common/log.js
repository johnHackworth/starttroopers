Crafty.c('LogView', {
  logLineHTML: '<div class="logLine">%TEXT%</div>',
  init: function() {
    this.requires('2D, DOM, HTML, Color');
  },
  setOptions: function(options) {
    this.options = options;
    this.logTitle = options.title || "log";
    this.logged = options.logged;
    this.attr({
      x: options.x || 10,
      y: options.y || 10,
      w: options.w || 100,
      h: options.h  || 300
    })
    this.css({
      "text-align": "right",
      "height": options.h || 20,
    })
  },
  render: function() {
    var html = '<div class="log">';
    html += '<div class="logTitle">' + this.logTitle + '</div>'
    var logs = this.logged.getTurnLogEntries(this.logged.currentTurn);
    for(var i = 0, l = logs.length; i<l; i++) {
      var lineHTML = this.logLineHTML;
      lineHTML = lineHTML.replace(/%TEXT%/g, logs[i].text);
      html += lineHTML;
    }
    if(logs.length === 0) {
      html += '<div class="logLine">Nothing yet!</div>';
    }
    html += '</div>';
    this.replace(html);
  }
});
