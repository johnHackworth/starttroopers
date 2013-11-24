Crafty.c('OfferView', {
  offerHTML: '<div class="offer">They want a <span>%PERCENTAGE%%</span> of our company, and they offer <span>%MONEY%$</span> for it.</div></div>',
  acceptButtonHTML: '<div class="acceptButton Button">Accept offer</div>',
  rejectButtonHTML: '<div class="rejectButton Button">Reject offer</div>',
  init: function() {
    this.requires('2D, DOM, HTML');
    this.acceptButton = Crafty.e('2D, DOM, HTML, Mouse');
    this.rejectButton = Crafty.e('2D, DOM, HTML, Mouse');
  },
  setOffer: function(offer, company) {
    var self = this;
    this.offer= offer,
    this.company = company;
    this.investor = offer.investor;
    this.acceptButton.unbind('Click').bind('Click', function() {
      self.company.acceptOffer(self.offer);
      Crafty.trigger('OfficeSelected');
    });
    this.rejectButton.unbind('Click').bind('Click', function() {
      self.investor.retireOffer();
      Crafty.trigger('OfficeSelected');
    });
  },
  renderOffer: function() {
    this.replace(this.offerHTML
      .replace("%PERCENTAGE%", this.offer.share)
      .replace("%MONEY%", this.offer.price)
    )
    this.acceptButton.replace(this.acceptButtonHTML);
    this.acceptButton.attr({x: this.attr('x'), y: this.attr('y') + 50, w:160, h:50})
    this.rejectButton.replace(this.rejectButtonHTML);
    this.rejectButton.attr({x: this.attr('x') + 180, y: this.attr('y') + 50, w:160, h:50})
  },
  createInvestorClickResponse: function(investor) {
    var localInvestor = investor;
    return (function() {
      tr.app.director.selectedInvestor = localInvestor;
      Crafty.trigger('InvestorSelected');
    }).bind(this);
  },

})
