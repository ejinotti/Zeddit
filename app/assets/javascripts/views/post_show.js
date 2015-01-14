Zeddit.Views.PostShow = Backbone.View.extend({
  initialize: function (options) {
    window.viewCount++;
    this.router = options.router;
    this.postView = new Zeddit.Views.Post({
      model: this.model,
      router: this.router
    });
    this.commentsView = new Zeddit.Views.CommentsList({
      collection: this.comments,
      router: this.router
    });
    this.$el.append(this.postView.$el).append(this.commentsView.$el);
  },

  remove: function () {
    this.postView.remove();
    this.commentsView.remove();
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
