window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.GameController = function(options) {
  var self = this;
  this.options = options;

  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);

  this.initialize();
}

window.tr.models.GameController.prototype = {
  currentPlayer: 0,
  currentTurn: 0,
  initialize: function() {
    var self = this;
    this.players = [];
    this.companies = [];
    this.on('newTurn', function(opts) {});
  },
  createPlayer: function(options) {
    var player = new tr.models.Player(options);
    this.on('newTurn', player.turn.bind(player));
    this.players.push(player)
  },
  createCompany: function(options) {
    var company = new tr.models.Company(options);
    company.player = options.player;
    this.on('newTurn', company.turn.bind(company));
    this.companies.push(company)
  },
  nextTurn: function() {
    this.currentPlayer = 0;
    this.currentTurn++;
    this.trigger('newTurn', this.currentTurn);
  }
}
