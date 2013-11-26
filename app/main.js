window.tr = window.tr || {};
window.tr.app = window.tr.app || {};

window.onload = function() {
  window.tr.app.director = new window.tr.directors.MainDirector();
  window.tr.app.director.world = new window.tr.models.World({});
  window.world = tr.app.director.world;
  window.tr.app.director.company = new window.tr.models.Company({})
  window.tr.app.director.company.initProduct({
    name: "The social network",
    world: tr.app.director.world
  });
  window.tr.app.director.company.product.defineSocialNetwork();
  window.tr.app.director.company.initProject("basicSite");
  window.tr.app.director.world.setPlayer(window.tr.app.director.company);


  window.comp = window.tr.app.director.company;
  var p = []
  for(var i = 0; i < 5; i++) {
    var a = new window.tr.models.Person({});
    a.randomize();
    p.push(a);
    comp.addPerson(a);
    comp.projects[0].addPerson(a);
  }
  window.tr.app.director.start();

}
