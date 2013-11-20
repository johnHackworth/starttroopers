Crafty.c('Faces', {
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
  }
})
