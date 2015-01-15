Zeddit.Views.SubShow = Backbone.View.extend({
  template: JST["sub_show"],

  initialize: function () {
    window.viewCount++;
    this.postsListView = new Zeddit.Views.PostsList({
      collection: this.model.posts
    });
    this.render();
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ sub: this.model });
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
