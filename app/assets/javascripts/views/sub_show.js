Zeddit.Views.SubShow = Backbone.View.extend({
  template: JST['sub_show'],

  initialize: function (options) {
    window.viewCount++;
    console.log('SubShow view create.');
    this.router = options.router;
    this.postsListView = new Zeddit.Views.PostsList({
      collection: this.model.posts,
      router: this.router
    });
    this.listenTo(this.model.posts, 'reset', this.render);
  },

  render: function () {
    console.log('SubShow render..');

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
