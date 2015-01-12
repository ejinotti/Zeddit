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

  console.log(window.location.pathname);

  // only load backbone if not rails
  if (window.location.pathname === "/") {
    Zeddit.initialize();
  }
});
