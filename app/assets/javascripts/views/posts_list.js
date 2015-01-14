Zeddit.Views.PostsList = Backbone.View.extend({
  template: JST['posts_list'],
  tagName: 'ul',

  initialize: function (options) {
    window.viewCount++;
    this.listenTo(this.collection, 'sync reset', this.render);
    this.router = options.router;
    this.postViews = [];
  },

  render: function () {
    var that = this;

    this.collection.each(function (post) {
      var postView = new Zeddit.Views.Post({
        model: post,
        router: this.router
      });
      that.postViews.push(postView);
      $('<li>').html(postView.render().$el).appendTo(that.$el);
    });

    return this;
  },

  remove: function () {
    this.postViews.forEach(function (postView) {
      postView.remove();
    });
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
