window.tr = window.tr || {};
window.tr.app = window.tr.app || {};

window.onload = function() {
  window.tr.app.director = new window.tr.directors.MainDirector();
  window.tr.app.director.company = new window.tr.models.Company({})
  window.tr.app.director.company.initProduct({name: "The social network"});
  window.tr.app.director.company.initProject({name: "Basic site"});

  window.comp = window.tr.app.director.company;
  window.a =  new window.tr.models.Person({});
  window.a.randomize();
  window.comp.addPerson(a);
  window.comp.project.addPerson(a);
  window.b =  new window.tr.models.Person({})
  window.b.randomize();
  window.comp.addPerson(b);
  window.comp.project.addPerson(b);
  window.c =  new window.tr.models.Person({});
  window.c.randomize();
  window.comp.addPerson(c);
  window.comp.project.addPerson(c);
  window.d =  new window.tr.models.Person({});
  window.d.randomize();
  window.comp.addPerson(d);
  window.comp.project.addPerson(d);




  window.tr.app.director.start();

}
