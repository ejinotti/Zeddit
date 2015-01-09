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
  Zeddit.initialize();
});
