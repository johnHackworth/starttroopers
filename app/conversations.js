window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.utils.Conversation = function(options) {

}

window.tr.utils.Conversation.prototype = {
  options: {
    "encourage": {
      "precondition": function(){
        return (this.company && this.company.human)
      },
      "text": "You're making such a great job lately",
      "result": function() {
        if(this.conversationFlags.greatJob &&
          this.turn - this.conversationFlags.greatJob < 3 &&
          tr.randInt() > 50) {
          this.conversationFlags.greatJob =  this.currentTurn;
          var newHappines = -1 * tr.randomInt(5);
          var newStress = 1 * tr.randomInt(5);
          this.happiness += newHappines;
          this.stress += newStress;
          return {
            text: "Please, don't try to buy my happiness with lies"
          }
        } else {
          this.conversationFlags.greatJob =  this.currentTurn;
          var newHappines = 1 * tr.randomInt(3);
          var newStress = -1 * tr.randomInt(3);
          this.happiness += newHappines;
          this.stress += newStress;
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
          this.turn - this.conversationFlags.faster < 3 &&
          tr.randInt() > 50) {
          this.conversationFlags.faster = this.currentTurn;
          var newHappines = -1 * tr.randomInt(2);
          var newStress = 1 * tr.randomInt(5);
          this.increaseStat('happiness',newHappines);
          this.increaseStat('stress', newStress);
          return {
            text: "Yes yes yes... I know, it's crunch time"
          }
        } else if(this.conversationFlags.faster &&
          this.turn - this.conversationFlags.faster < 3) {
          this.conversationFlags.faster = this.currentTurn;
          var newHappines = -1 * tr.randomInt(6);
          var newStress = 1 * tr.randomInt(5);
          this.increaseStat('happiness',newHappines);
          this.increaseStat('stress', newStress);
          return {
            text: "I'm afraid you're pushing to hard"
          }
        } else {
          this.conversationFlags.faster = this.currentTurn;
          var newHappines = -1 * tr.randomInt(3);
          var newStress = 1 * tr.randomInt(3);
          this.increaseStat('happiness',newHappines);
          this.increaseStat('stress', newStress);
          return {
            text: "We'll meet that deadline!"
          }

        }

      }
    }

  }
}
