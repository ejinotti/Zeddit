window.Zeddit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Zeddit.Routers.Router();
    Backbone.history.start();
  }
};

$(document).ready(function(){

  // only load backbone if not rails
  if (!window.location.pathname.match(/\/railsroot/)) {
    Zeddit.initialize();
  }
});
