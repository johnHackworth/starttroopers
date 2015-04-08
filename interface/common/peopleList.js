Crafty.c("PeopleList", {
  offerDataHTML: '<div class="offerData">' +
    '<div class="type">%TYPE%</div>' +
    '<div class="published">%PUBLISHED%</div>' +
    '<div class="maxWage">%MAXWAGE%</div>' +
    '<div class="minExperience">%MINEXPERIENCE%</div>' +
    '</div>',
  maxPerPage: 8,
  firstElement: 0,
  init: function() {
    this.requires('DOM, Text, Faces');
    this.otherData = [];
    this.timeouts = [];
    this.bind('Remove', this.clearTimeouts.bind(this));
  },
  set: function(options) {
    this.originX = options.x || 20;
    this.originY = options.y || 90;
    this.stepX = options.stepX || 100;
    this.stepY = options.stepY || 100;
    this.people = options.people || [];
    this.maxPerPage = options.maxPerPage || 8;
    this.additionalInfoX = options.additionalInfoX || 60;
    this.additionalInfoY = options.additionalInfoY || -10;
    this.additionalInfoW = options.additionalInfoW || 100;
    this.additionalInfoH = options.additionalInfoH || 80
    this.additionalInfo = options.additionalInfo || null;
    this.faceSize = options.faceSize || 50;
  },
  clearTimeouts: function() {
    var timeout = this.timeouts.pop();
    while(timeout) {
      clearTimeout(timeout);
      timeout = this.timeouts.pop();
    }
  },
  renderPeople: function(firstElement) {
    this.clearTimeouts();
    var self = this;
    if(firstElement) {
      this.firstElement = firstElement;
    }
    var i = 0;
    var x = this.originX;
    var y = this.originY;
    var firstElement = this.firstElement;
    var lastElement = firstElement + this.maxPerPage;
    if(lastElement > this.people.length) {
      lastElement = this.people.length
    }
    for(var n = firstElement; n < lastElement; n++) {
      var other = this.people[n];
      this.timeouts.push(setTimeout((function(x,y,other) {
        return function() {
          var face = self.createOtherFace(other, x, y);
          face.setSize(self.faceSize);
        }
      })(x,y, other),1))


      if(this.additionalInfo) {

        var otherData = this[this.additionalInfo](other)
        otherData.attr({
          x: x + this.additionalInfoX,
          y: y + this.additionalInfoY,
          w: this.additionalInfoW,
          h: this.additionalInfoH
        })
        this.otherData.push(otherData);
      }

      x += this.stepX;
      if(x > 900) {
        x = this.originX;
        y += this.stepY;
      }
      i++;
    }
    this.renderPaginator();
  },
  renderPaginator: function() {
    var nElements = this.people.length;
    var nPages = Math.floor(nElements / this.maxPerPage) +1
    nPages = nPages > 15 ? 15: nPages;
    var currentPage = Math.floor(this.firstElement / this.maxPerPage);
    for(var n = 0; n < nPages; n++) {
      var page = Crafty.e('2D, DOM, HTML, Mouse');
      page.append('<div class="pagebutton">'+(n+1)+'</div>');
      page.attr({x: 200 + n*30, y: 650, w:30, h: 50, z:999999})
      page.bind('Click', this.createPaginatorResponse(n))
    }
  },
  createPaginatorResponse: function(nParam) {
    var self = this;
    return function() {
      var n = nParam;
      var face = self.otherFaces.pop()
      while(face) {
        face.destroy();
        face = self.otherFaces.pop();
      }
      var otherData = self.otherData.pop();
      while(otherData) {
        otherData.destroy();
        otherData = self.otherData.pop();
      }
      console.log(nParam, n, self.maxPerPage)
      self.renderPeople(n * self.maxPerPage);
    }
  }
})
