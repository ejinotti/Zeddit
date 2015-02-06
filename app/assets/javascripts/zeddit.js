window.Zeddit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    window.currentUser = new Zeddit.Models.CurrentUser();
    window.currentUser.fetch();
    window.viewCount = 0;

    Zeddit.allSubsFetched = false;
    Zeddit.allSubs = new Zeddit.Collections.Subs();
    Zeddit.allSubs.fetch({
      success: function () {
        Zeddit.allSubsFetched = true;
      }
    });

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
