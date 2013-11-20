window.tr = window.tr || {};
window.tr.app = window.tr.app || {};

window.onload = function() {
  window.tr.app.director = new window.tr.directors.MainDirector();
  window.tr.app.director.company = new window.tr.models.Company({})
  window.tr.app.director.company.initProduct({name: "The social network"});
  window.tr.app.director.company.product.defineSocialNetwork();
  window.tr.app.director.company.initProject("basicSite");

  window.comp = window.tr.app.director.company;
  window.a =  new window.tr.models.Person({});
  window.a.randomize();
  window.comp.addPerson(a);
  window.comp.projects[0].addPerson(a);
  window.b =  new window.tr.models.Person({})
  window.b.randomize();
  window.comp.addPerson(b);
  window.comp.projects[0].addPerson(b);
  window.c =  new window.tr.models.Person({});
  window.c.randomize();
  window.comp.addPerson(c);
  window.comp.projects[0].addPerson(c);
  window.d =  new window.tr.models.Person({});
  window.d.randomize();
  window.comp.addPerson(d);
  window.comp.projects[0].addPerson(d);
  window.e =  new window.tr.models.Person({});
  window.e.randomize();
  window.comp.addPerson(e);



  window.tr.app.director.start();

}
