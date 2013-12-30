window.tr = window.tr || {};
window.tr.models = window.tr.models || {};
(function() {
var talkOptions = {
  "praise": {
    "precondition": function(){
      return (this.company && this.company.human)
    },
    "text": "You're making such a great job lately",
    "result": function() {
      if(this.conversationFlags.greatJob &&
        this.currentTurn - this.conversationFlags.greatJob < 3 &&
        tr.randInt() > 50) {
        this.conversationFlags.greatJob =  this.currentTurn;
        var newHappines = -1 * tr.randInt(5);
        var newStress = 1 * tr.randInt(5);
        this.increaseStat('happiness',newHappines);
        this.indreaseStat('stress', newStress);
        return {
          text: "Please, don't try to buy my happiness with lies"
        }
      } else {
        this.conversationFlags.greatJob =  this.currentTurn;
        var newHappines = 1 * tr.randInt(3);
        var newStress = -1 * tr.randInt(3);
        this.increaseStat('happiness', newHappines);
        this.increaseStat('stress', newStress);
        return {
          text: "It's so nice that you recognize my work"
        }
      }


    }
  },
  "accelerate": {
    "precondition": function(){
      return (this.company && this.company.human)
    },
    "text": "We need to go faster!",
    "result": function() {
      if(this.conversationFlags.faster &&
        this.currentTurn - this.conversationFlags.faster < 10 &&
        tr.randInt() > 50) {
        this.conversationFlags.faster = this.currentTurn;
        var newHappines = -1 * tr.randInt(2);
        var newStress = 1 * tr.randInt(5);
        this.increaseStat('happiness',newHappines);
        this.increaseStat('stress', newStress);
        return {
          text: "Yes yes yes... I know, it's crunch time"
        }
      } else if(this.conversationFlags.faster &&
        this.currentTurn - this.conversationFlags.faster < 10) {
        this.conversationFlags.faster = this.currentTurn;
        var newHappines = -1 * tr.randInt(6);
        var newStress = 1 * tr.randInt(5);
        this.increaseStat('happiness',newHappines);
        this.increaseStat('stress', newStress);
        return {
          text: "I'm afraid you're pushing to hard"
        }
      } else {
        this.conversationFlags.faster = this.currentTurn;
        var newHappines = -1 * tr.randInt(3);
        var newStress = 1 * tr.randInt(3);
        this.increaseStat('happiness',newHappines);
        this.increaseStat('stress', newStress);
        return {
          text: "We'll meet that deadline!"
        }

      }

    }
  },
  "stop": {
    "precondition": function(){
      return (this.company && this.company.human)
    },
    "text": "You're pushing too hard. You need to chill out a little",
    "result": function() {
      if(

        !this.conversationFlags.slower || (
        this.currentTurn - this.conversationFlags.slower > 10 &&
        tr.randInt() > 50)
      ) {
        this.conversationFlags.slower = this.currentTurn;
        var newHappines = 5 * tr.randInt(2);
        var newStress = -1 * tr.randInt(20);
        this.increaseStat('happiness',newHappines);
        this.increaseStat('stress', newStress);
        return {
          text: "Thank you... I think I'm going to faint if I don't work a little slower"
        }
      } else if(!this.conversationFlags.slower || (
        this.currentTurn - this.conversationFlags.slower > 10)
      ) {
        this.conversationFlags.slower = this.currentTurn;
        var newHappines = 5 + tr.randInt(10);
        var newStress = -1 * tr.randInt(10);
        this.increaseStat('happiness',newHappines);
        this.increaseStat('stress', newStress);
        return {
          text: "But ... the project... "
        }
      } else {
        this.conversationFlags.slower = this.currentTurn;
        var newHappines = -1 * tr.randInt(5);
        var newStress = 1 * tr.randInt(3);
        this.increaseStat('happiness',newHappines);
        this.increaseStat('stress', newStress);
        return {
          text: "I know, I know... I trying to relax"
        }

      }

    }
  },
  "smallBonus": {
    "precondition": function(){
      return (this.company && this.company.human)
    },
    "text": "I want to reward your hard work with a 1% salary bonus",
    "result": function() {
      this.money += this.currentWage * 0.01;
      this.company.cash -= this.currentWage * 0.01;
      if(this.conversationFlags.smallBonus &&
        this.currentTurn - this.conversationFlags.smallBonus < 4) {
        this.conversationFlags.smallBonus = this.currentTurn;

        return {
          text: "Mmm, thanks again, I guess"
        }
      } else  {
        this.conversationFlags.smallBonus = this.currentTurn;
        var newHappines = 1 * tr.randInt(3);
        this.increaseStat('happiness',newHappines);
        return {
          text: "Woah! Thank you a lot!"
        }
      }

    }
  },

  "conflictive": {
    "precondition": function(){
      return (this.company && this.company.human)
    },
    "text": "You're making your coworkers uneasy. We need you to be less conflictive",
    "result": function() {
      if(this.conversationFlags.conflictive &&
        this.currentTurn - this.conversationFlags.conflictive < 20) {
        this.conversationFlags.conflictive = this.currentTurn;
        this.increaseStat('happiness', -3);
        this.increaseStat('stress', 1);
        return {
          text: "I'm on it, you don't need to repeat it"
        }
      } else  {
        this.conversationFlags.conflictive = this.currentTurn;
        if(this.conflictive < 50) {
          this.increaseStat('happiness', -5);
          return {text: "What are you talking about? I'm not conflictive at all!"}
        } else {
          var diceRoll = tr.randInt();
          if(diceRoll > this.conflictive) {
            this.increaseStat('conflictive', -1 * tr.randInt(20));
            return {"text": "You're right... I'll try to get along better with everyone"}
          } else if(diceRoll > this.conflictive / 2) {
            this.increaseStat('happiness', -2 * this.conflictive / 10);
            return {"text": "Me? Tell them to stop being assfaces"}
          } else {
            this.increaseStat('conflictive', tr.randInt(20));
            this.increaseStat('happiness', -10);
            return {"text": "WHAT???? FUCK OFF"}
          }
        }
      }

    }
  }

}
window.tr.utils.Conversation = function(options) {

}

window.tr.utils.Conversation.prototype = {
  resolveConversations: function() {
    this.response = null;
  },
  talk: function(optionName) {
    var action = talkOptions[optionName];
    if(action) {
      this.response = action.result.apply(this);
      this.trigger('conversation', this.response.text);
      return this.response;
    }
  },
  getTalkOptions: function() {
    var options = [];
    for(var n in talkOptions) {
      if(talkOptions[n].precondition.apply(this)) {
        options.push({id: n, text: talkOptions[n].text})
      }
    }
    return options;
  }
}

})()
