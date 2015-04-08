Crafty.c('HeaderText', {
  headerHTML: '<div class="Header">'+
  '<div class="title">%NAME%</div>'+
  '<div class="description">%DESCRIPTION%</div>'+
  '</div>',
  name: '',
  description: '',
  init: function() {
    this.requires('HTMLStructure');
    this.set({
      w:1000,
      h: 200,
      x: 20,
      y: 70,
      html: this.headerHTML
    })
  },
  setName: function(name, description) {
    this.name = name;
    this.description = description;
  },
  render: function() {
    this.renderData({name: this.name, description: this.description})
  }

});
