Crafty.c('PropertyCheckbox', {

  obj: {},
  property: 'none',
  text: '',
  init: function() {
    this.requires('2D, DOM, HTML, Mouse');
    this.bind('Click', this.click.bind(this));
  },
  bindWithProperty: function(obj, property, text) {
    this.obj = obj;
    this.property = property;
    this.text = text;
  },
  render: function() {
    var selected = '';
    if(this.obj[this.property]) {
      selected = 'selected'
    }
    this.replace('<div class="box '+selected+'"></div><div class="text">'+this.text+'</div>');
  },
  click: function() {
    if(this.obj[this.property]) {
      this.obj[this.property] = false
    } else {
      this.obj[this.property] = true
    }
    this.render();
  }
})
