Crafty.c('PropertyCheckbox', {

  obj: {},
  property: 'state',
  text: '',
  state: false,
  init: function() {
    this.obj = {};
    this.requires('2D, DOM, HTML, Mouse');
    this.bind('Click', this.click.bind(this));
  },
  assignGroup: function(group) {
    this.group = group;
  },
  bindWithProperty: function(obj, property, text) {
    this.obj = obj;
    this.property = property;
    this.text = text;
  },
  assignFreeText: function(text) {
    this.text = text;
    if(!this.value) {
      this.value = this.text;
    }
  },
  assignValue: function(value) {
    this.value = value;
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
      this.unselect()
    } else {
      this.select();
      if(this.group) {
        this.unselectGroup();
      }
    }
    this.trigger('change', this)
  },
  unselect: function() {
    this.obj[this.property] = false
    this.state = false;
    this.render();
  },
  select: function() {
    this.obj[this.property] = true
    this.state = true;
    this.render();
  },
  unselectGroup: function() {
    var checkboxes = Crafty('PropertyCheckbox');
    for(var n in checkboxes) {
      var check = Crafty(checkboxes[n]);
      if(check.group && check.group === this.group && check != this) {
        check.unselect();
      }

    }
  },
  getState: function() {
    return this.state;
  }
})
