window.tr = window.tr || {};
window.tr.data = window.tr.data || {};

window.tr.data.marketingEvents = [
{
  "title": "socialNetworkFuzz",
  "text": function() { return "We have managed to create some social networks fuzz about our product"},
  "notification": 0,
  "conversation": true,
  "effects": function() {
    this.marketingPunch += 100;
    this.hype += tr.randInt(100) / 1000;
  }
},
{
  "title": "TVMediaFuzz",
  "text": function() { return "A TV program has mentioned our company in a technology section"},
  "notification": 0,
  "conversation": true,
  "effects": function() {
    this.marketingPunch += 300;
    this.hype += tr.randInt(50) / 1000;
  }
},
{
  "title": "PressMediaFuzz",
  "text": function() { return "A old-tree kind newspaper has mentioned our company in a technology section"},
  "notification": 0,
  "conversation": true,
  "effects": function() {
    this.marketingPunch += 50;
    this.hype += tr.randInt(20) / 1000;
  }
},
{
  "title": "conventionalMediaFuzz",
  "text": function() { return "A TV program has mentioned our company in a technology section"},
  "notification": 0,
  "conversation": true,
  "effects": function() {
    this.marketingPunch += 300;
    this.hype += tr.randInt(50) / 1000;
  }
},
{
  "title": "smallBlogMediaFuzz",
  "text": function() { return "A small technology blog has mentioned our company in a technology section"},
  "notification": 0,
  "conversation": true,
  "effects": function() {
    this.marketingPunch += 100;
    this.hype += tr.randInt(150) / 1000;
  }
},
{
  "title": "companyBlog",
  "text": function() {
    return this.bloggerPerson.name + " has wrote a new post in the company blog."},
  "notification": 1,
  "conversation": true,
  "effects": function() {
    this.bloggerPerson = this.getRandomPerson();
    this.marketingPunch += 100;
    this.hype += tr.randInt(this.bloggerPerson.followers) / 1000;
    var newFollowers = tr.randInt(this.hype * 100);
    this.bloggerPerson.addFollowers(newFollowers);
    if(newFollowers > 500) {
      this.bloggerPerson.trigger('conversation',
        "The post on the company blog is making me famous!"
      )
    } else {
      this.bloggerPerson.trigger('conversation',
        "I've wrote a post on the company blog"
      )
    }
  }
},
{
  "title": "mediumBlogMediaFuzz",
  "text": function() { return "A technology blog has mentioned our company"},
  "notification": 0,
  "conversation": true,
  "effects": function() {
    this.marketingPunch += 500;
    this.hype += tr.randInt(350) / 1000;
  }
},
]
