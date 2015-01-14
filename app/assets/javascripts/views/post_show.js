Zeddit.Views.PostShow = Backbone.View.extend({

  initialize: function (options) {
    window.viewCount++;
    this.router = options.router;
    this.postView = new Zeddit.Views.Post({
      model: this.model,
      router: this.router
    });
    this.$el.append(this.postView.$el);
    this.listenTo(this.model, 'sync', this.renderCommentTree);
  },

  renderCommentTree: function () {
    this.commentsView = new Zeddit.Views.CommentsList({
      allComments: this.model.allComments,
      parentId: "",
      router: this.router
    });
    this.$el.append(this.commentsView.render().$el);
  },

  remove: function () {
    this.postView.remove();
    this.commentsView.remove();
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }

});
