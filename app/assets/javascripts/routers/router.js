Zeddit.Routers.Router = Backbone.Router.extend({

  routes: {
    '': 'root'
  },

  initialize: function () {
    this.$main = $('#main');
    this.$sidebar = $('#sidebar');
    this.subs = new Zeddit.Collections.Subs();
  },

  root: function () {
    console.log('ROOT');
    this.subs.fetch();
    var subsListView = new Zeddit.Views.SubsList({
      collection: this.subs
    });
    this.$main.html(subsListView.render().$el);
  },
});
