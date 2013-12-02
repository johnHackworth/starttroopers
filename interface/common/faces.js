Crafty.c('Faces', {
  otherDataHTML: '<div class="projectOtherData">%NAME%</div>',
  createOtherFace: function(other, x, y) {
    if(!this.otherFaces) {
      this.otherFaces = [];
    }
    var otherFace = Crafty.e('PersonFace');
    otherFace.assignPerson({
      person: other
    });
    otherFace.showNameFlag = false;
    otherFace.setSize(50);
    otherFace.setPosition(x,y);
    this.otherFaces.push(otherFace);
    return otherFace;
  },
  renderMarketingPeople: function(x, y) {
    var self = this;
    var i = 0;
    var title = Crafty.e('HTMLText');
    title.set({x:x-10, y:y-40, w: 300, h:50,z:9999, text: 'Marketing Staff:', class: ''})
    for(var n in this.company.people) {
      if(this.company.people[n].marketingStaff) {
        var other = this.company.people[n];
        var otherFace = this.createOtherFace(other, x, y);
        var otherName = Crafty.e('2D, HTML, DOM');
        otherName.attr({
          x: x-25,
          y: y - 10,
          w: 100,
          h: 30
        })
        var name = other.name;
        otherName.append(this.otherDataHTML.replace(/%NAME%/g, name));

        x += 60;
        if(x > 600) {
          x = 50;
          y += 60;
        }
        i++;
      }
      this.companyPeopleY = y+130;

      }
  },
})
