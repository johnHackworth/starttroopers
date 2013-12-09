Crafty.c('WarningChecks', {
  init: function() {
  },
  set: function(options) {
    this.company = options.company;
  },
  checkOngoingProjectsPeople: function() {
    var turn = this.company.currentTurn;
    if(!this.lastCheckProjectPeople ||
      turn - this.lastCheckProjectPeople > 5
    ) {
      this.lastCheckProjectPeople = turn;
      var modules = this.company.product.modules;
      for(var n in modules) {
        if(modules[n].project.people.length === 0 &&
          !modules[n].project.released
        ) {
          this.company.addNotification({
            text: "Nobody in your company is working on " + modules[n].name + "! you need to assign people to your projects to make them advance!",
            type: 'product',
            id: modules[n].project.id,
            open: true
          })
        }
      }
    }
  },
  checkOngoingProjectsPeopleActive: function() {
    var turn = this.company.currentTurn;
    if(!this.lastCheckProjectPeopleActive ||
      turn - this.lastCheckProjectPeopleActive > 5
    ) {
      this.lastCheckProjectPeopleActive = turn;
      var modules = this.company.product.modules;
      for(var n in modules) {
        if(modules[n].project.people.length &&
          !modules[n].project.released
        ) {
          var people = modules[n].project.people;

          for(var p in people) {
            if(people[p].positions.length <= 0) {
                this.company.addNotification({
                  text: people[p].name + " is supposed to be working on " + modules[n].name + " but " +
                    people[p].pronoum() + " you haven't defined about what " + people[p].pronoum() + "'s suppose to do",
                  type: 'people',
                  id: people[p].id,
                  open: false
                })
            }
          }
        }
      }
    }
  }
})
