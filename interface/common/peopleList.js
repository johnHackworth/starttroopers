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
  },
  renderPeople: function(firstElement) {
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
      this.createOtherFace(other, x, y);

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
    var currentPage = Math.floor(this.firstElement / this.maxPerPage);
    for(var n = 0; n < nPages; n++) {
      var page = Crafty.e('2D, DOM, HTML, Mouse');
      page.append('<div class="pagebutton">'+(n+1)+'</div>');
      page.attr({x: 200 + n*30, y: 650, w:30, h: 50})
      page.bind('Click', this.createPaginatorResponse(n))
    }
  },
  createPaginatorResponse: function(nParam) {
    var self = this;
    var n = nParam;
    return function() {
      var face = self.otherFaces.pop()
      while(face) {
        face.delete();
        face = self.otherFaces.pop();
      }
      for(var n in this.otherData) {
        this.otherData[n].destroy();
      }
      self.renderPeople(n * self.maxPerPage);
    }
  }
})
