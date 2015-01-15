Zeddit.Views.CommentsList = Backbone.View.extend({
  tagName: 'ul',

  initialize: function (options) {
    window.viewCount++;
    this.allComments = options.allComments;
    this.parentId = options.parentId;
    this.router = options.router;
    this.commentViews = [];
  },

  render: function () {
    var that = this;

    this.allComments[this.parentId].forEach(function (comment) {
      var commentView = new Zeddit.Views.Comment({
        model: comment,
        allComments: that.allComments,
        router: that.router
      });
      that.commentViews.push(commentView);
      that.$el.append(commentView.$el);
    });
    return this;
  },

  remove: function () {
    this.commentViews.forEach(function (commentView) {
      commentView.remove();
    });
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
