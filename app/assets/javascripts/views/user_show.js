Zeddit.Views.UserShow = Backbone.View.extend({
  template: JST['user_show'],

  initialize: function (options) {
    window.viewCount++;
    this.router = options.router;
    this.postsListView = new Zeddit.Views.PostsList({
      collection: this.model.posts,
      router: this.router
    });
    this.render();
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function (){
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.$el.append(this.postsListView.$el);
    return this;
  },

  remove: function () {
    this.postsListView.remove();
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
