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
    this.increaseStat('happiness', 0.5);
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
    this.increaseStat('happiness', 0.5);
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
    if(this.company)
      this.company.hype += tr.randInt(100) / 100;
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

    this.increaseStat('happiness', -1*(tr.randInt(5)));
    this.eventPerson.increaseStat('happiness', -1*(tr.randInt(5)));
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
{
  "title": "fightAtLunch",
  "text": function(){ return this.eventPerson.name + " and me had a discussion at lunch. "+this.eventPerson.pronoum() + "'s such a jerk."},
  "precondition": function() {
    if(!this.company) {
      return false;
    }
    this.eventPerson = this.company.getRandomPerson(this);
    return this.conflictive > tr.randInt();
  },
  "notification": 1,
  "conversation": true,
  "effects": function() {

    this.increaseStat('happiness', -1*(tr.randInt(2)));
    this.eventPerson.increaseStat('happiness', -1*(tr.randInt(5)));
    this.socialCircle[this.eventPerson.id] -= tr.randInt(10);
    this.eventPerson.socialCircle[this.id] -= tr.randInt(10);
  }
},
{
  "title": "badTweet",
  "text": function(){ return "Some comments I made on social networks are giving us bad press"},
  "precondition": function() {
    return this.conflictive > tr.randInt();
  },
  "notification": 1,
  "conversation": true,
  "effects": function() {
    var effect = this.followers / 500;
    this.increaseStat('hype', -1 * tr.randInt(3));
    this.increaseStat('followers', -50);
  }
},
{
  "title": "badBlogPost",
  "text": function(){ return "A entry in my personal blog has backfired and is giving us bad press"},
  "precondition": function() {
    return this.conflictive > tr.randInt();
  },
  "notification": 1,
  "conversation": true,
  "effects": function() {
    this.increaseStat('hype', -1 * tr.randInt(5));
    this.increaseStat('followers', -50);
  }
},
{
  "title": "greatEngReadPost",
  "text": function(){ return "I've read a very nice blog post that have teached me a lot about "+ this.eventLearning },
  "precondition": function() {
    var posibilities = ['backend', 'frontend', 'architecture', 'devops', 'visualDesign', 'productDesign', 'marketing']
    this.eventLearning = posibilities[tr.randInt(posibilities.length)]
    return this.mainInterest === 'engineering'
  },
  "notification": 1,
  "conversation": true,
  "effects": function() {
    this.increaseStat(this.eventLearning, 5);
  }
},
{
  "title": "greatDesReadPost",
  "text": function(){ return "I've read a very nice blog post that have teached me a lot about "+ this.eventLearning },
  "precondition": function() {
    var posibilities = ['frontend', 'visualDesign', 'productDesign', 'marketing']
    this.eventLearning = posibilities[tr.randInt(posibilities.length)]
    return this.mainInterest === 'design'
  },
  "notification": 1,
  "conversation": true,
  "effects": function() {
    this.increaseStat(this.eventLearning, 5);
  }
},
{
  "title": "greatBusReadPost",
  "text": function(){ return "I've read a very nice blog post that have teached me a lot about "+ this.eventLearning },
  "precondition": function() {
    var posibilities = ['architecture', 'productDesign', 'marketing', 'scouting']
    this.eventLearning = posibilities[tr.randInt(posibilities.length)]
    return this.mainInterest === 'business'
  },
  "notification": 1,
  "conversation": true,
  "effects": function() {
    this.increaseStat(this.eventLearning, 5);
  }
},
{
  "title": "disactualized",
  "text": function(){ return "I've realized that the industry is changing fast and my knowledge about "+ this.eventLearning + " is not up to state of art at all"},
  "precondition": function() {
    var posibilities = ['backend', 'frontend', 'architecture', 'devops', 'visualDesign', 'productDesign', 'marketing']
    this.eventLearning = posibilities[tr.randInt(posibilities.length)]
  },
  "notification": 1,
  "conversation": true,
  "effects": function() {
    this.increaseStat(this.eventLearning, -1 * (tr.randInt(5)));
  }
},
{
  "title": "failingComputer",
  "text": function(){ return "My computer is broken!! I need you to buy me a new one"},
  "notification": 1,
  "conversation": true,
  "effects": function() {
    if(this.company) {
      this.company.cash -= 800;
    } else {
      this.money -= 800;
    }
    this.stayAtHome = true;
  }
},
]
