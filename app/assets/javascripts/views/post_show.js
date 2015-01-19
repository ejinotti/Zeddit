Zeddit.Views.PostShow = Backbone.View.extend({

  initialize: function () {
    window.viewCount++;
    this.postView = new Zeddit.Views.Post({
      model: this.model,
      isShowPage: true
    });
    this.$el.append(this.postView.$el);
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    if (!this.model.allComments) return;

    this.commentsView && this.commentsView.remove();

    this.commentsView = new Zeddit.Views.CommentsList({
      allComments: this.model.allComments,
      parentId: ""
    });
    this.$el.append(this.commentsView.render().$el);
  },

  remove: function () {
    this.postView.remove();
    this.commentsView && this.commentsView.remove();
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }

});
