Crafty.c('FaceLayer', {
  size: 250,
  layerClass: '',
  init: function() {
    this.requires('2D, DOM, Mouse');
    this.attr({w:this.size, h:this.size})
  },
  assignPerson: function(person) {
    this.person = person;
    this.props();
    this.render();
  },
  setSize: function(size) {
    this.size = size;
    if(this.person) {
      this.props();
    }
  },
  setLayer: function(name) {
    this.layerClass = name;
    if(this.person) {
      this.props();
    }
  },
  props: function() {
    if(this.person) {
      var type = this.person.DNA.get(this.layerClass);
      if(!type) {
        type = 0;
      }
      this.type = type;
      this.basicType = type;
      this.css({
        "width": this.size + "px",
        "height": this.size + "px",
        "background-image": 'url(assets/people/'+this.layerClass+'/'+type+'.png) ',
        "background-size": this.size+'px',
        "background-repeat": "no-repeat"
      })
    }
  },
  refresh: function() {
      this.css({
        "width": this.size + "px",
        "height": this.size + "px",
        "background-image": 'url(assets/people/'+this.layerClass+'/'+this.type+'.png) ',
        "background-size": this.size+'px',
        "background-repeat": "no-repeat"
      })
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  }
});
