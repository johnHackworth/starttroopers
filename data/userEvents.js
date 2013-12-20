window.tr = window.tr || {};
window.tr.data = window.tr.data || {};

window.tr.data.userEvents = [
{
  "title": "BadNight",
  "text": function() { return "I didn't sleep at all last night... "},
  "notification": 0,
  "conversation": true,
  "effects": function() {
    this.happiness -= 1;
    this.stress += 1;
    this.turnModificator = 0.5;
  }
},
{
  "title": "JavascriptBadParts",
  "text": function(){return "I've just completed to read 'Javascript:The worst parts'... now I'm quite better in frontend!"},
  "unique": true,
  "precondition": function() {
    return this.mainInterest === 'engineering';
  },
  "notification": 1,
  "conversation": true,
  "effects": function() {
    this.happiness += 1;
    this.increaseStat('frontend', 10);
  }
},
{
  "title": "Rework",
  "text": function() {
    return "I've just completed to read 'Rework'... now I'm quite better in scouting!"
  },
  "unique": true,
  "notification": 1,
  "conversation": true,
  "effects": function() {
    this.happiness += 1;
    this.increaseStat('scouting', 10);
  }
},
{
  "title": "Illness",
  "text": function(){ return "I'm not feeling well today... I think I'm staying at home, sorry"},
  "notification": 2,
  "conversation": true,
  "effects": function() {
    this.stayAtHome = true;
  }
},
{
  "title": "viralBlogPost",
  "text": function(){ return this.name +" has written a very popular post in "+this.pronoum()+" own blog, receiving a ton of new followers"},
  "notification": 1,
  "conversation": false,
  "effects": function() {
    this.followers += tr.randInt(1000) + 50;
  }
},
{
  "title": "hackerNewsBlogPost",
  "text": function(){ return "The blog of " + this.name +" has appeared on hacker news! The server is near exploding! " + this.pronoum() + ' is now a star of the business'},
  "notification": 1,
  "conversation": false,
  "effects": function() {
    this.followers += tr.randInt(2000) + 50;
  }
},
{
  "title": "projectConfusion",
  "text": function(){ return "I've realized a lot of assupmtions I've made about "+this.eventProject.name+" are plain wrong. I need to rethink everything I know about the project"},
  "precondition": function() {
    return this.getRandomProjectKnowledge() != false;
  },
  "notification": 1,
  "conversation": true,
  "effects": function() {
    var projectId = this.getRandomProjectKnowledge()
    this.projectKnowledge[projectId] -= 10;
    this.eventProject = projectId;
  }
},
{
  "title": "helpWithProject",
  "text": function(){ return this.eventPerson.name + " and me have been talking about " + this.eventProject.name + ". Our mutual understanding of the project have grown!"},
  "precondition": function() {
    if(this.currentProjects.length === 0) {
      return false;
    }
    this.eventProject = this.currentProjects[tr.randInt(this.currentProjects.length)]
    this.eventPerson = this.eventProject.getRandomPerson(this);
    return this.eventPerson != null;
  },
  "notification": 1,
  "conversation": true,
  "effects": function() {
    var projectId = this.eventProject.id;
    var combinedLearningFactor = (this.learning + this.eventPerson.learning) / 200;
    this.projectKnowledge[projectId] += 10 * combinedLearningFactor;
    this.eventPerson.projectKnowledge[projectId] += 10 * combinedLearningFactor;
    this.socialCircle[this.eventPerson.id] += tr.randInt(5);
    this.eventPerson.socialCircle[this.id] += tr.randInt(5);
  }
},
{
  "title": "pairProgamming",
  "text": function(){ return this.eventPerson.name + " and me have been making some pair programming on " + this.eventProject.name + ". "},
  "precondition": function() {
    if(this.currentProjects.length === 0) {
      return false;
    }
    this.eventProject = this.currentProjects[tr.randInt(this.currentProjects.length)]
    this.eventPerson = this.eventProject.getRandomPerson(this);
    return this.eventPerson != null;
  },
  "notification": 1,
  "conversation": true,
  "effects": function() {
    var projectId = this.eventProject.id;
    this.turnModificator = 2;
    this.eventPerson.turnModificator = 2;
    this.projectKnowledge[projectId] += 3;
    this.eventPerson.projectKnowledge[projectId] += 3;
    this.socialCircle[this.eventPerson.id] += tr.randInt(5);
    this.eventPerson.socialCircle[this.id] += tr.randInt(5);
  }
},
{
  "title": "differencesOnTheProject",
  "text": function(){ return this.eventPerson.name + " and me had a fight about " + this.eventProject.name + ". "+this.eventPerson.pronoum() + "'s such a jerk."},
  "precondition": function() {
    if(this.currentProjects.length === 0) {
      return false;
    }
    this.eventProject = this.currentProjects[tr.randInt(this.currentProjects.length)]
    this.eventPerson = this.eventProject.getRandomPerson(this);
    return this.eventPerson != null;
  },
  "notification": 2,
  "conversation": true,
  "effects": function() {
    var projectId = this.eventProject.id;
    this.projectKnowledge[projectId] += 1;
    this.eventPerson.projectKnowledge[projectId] += 1;
    this.socialCircle[this.eventPerson.id] -= tr.randInt(10);
    this.eventPerson.socialCircle[this.id] -= tr.randInt(10);
  }
},
{
  "title": "bigMeeting",
  "text": function(){ return " I've a big meeting about " + this.eventProject.name + " today. I know more about the project, but today I couldn't work very much "},
  "precondition": function() {
    if(this.currentProjects.length === 0) {
      return false;
    }
    this.eventProject = this.currentProjects[tr.randInt(this.currentProjects.length)]
    return true;
  },
  "notification": 0,
  "conversation": true,
  "effects": function() {
    var projectId = this.eventProject.id;
    this.projectKnowledge[projectId] += 5;
    this.turnModificator = 0;
    this.happiness -= 1;
  }
},
]
