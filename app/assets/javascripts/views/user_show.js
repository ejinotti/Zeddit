Zeddit.Views.UserShow = Backbone.View.extend({
  template: JST["user_show"],

  initialize: function (options) {
    window.viewCount++;
    this.postsListView = new Zeddit.Views.PostsList({
      collection: this.model.posts
    });
    this.header = options.header;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(window.currentUser, "login logout", this.refresh);
  },

  render: function () {
    this.header.setTitle(this.model.get("username"));
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.$el.append(this.postsListView.$el);
    return this;
  },

  refresh: function () {
    this.model.fetch();
  },

  remove: function () {
    this.postsListView.remove();
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
