Zeddit.Views.Comment = Backbone.View.extend({
  template: JST['comment'],
  tagName: 'li',
  className: 'comment',

  events: {

  },

  initialize: function (options) {
    window.viewCount++;
    this.router = options.router;
    this.allComments = options.allComments;
    this.render();

    if (this.allComments[this.model.id]) {
      this.renderSubComments();
    }
  },

  render: function () {
    var content = this.template({ comment: this.model });
    this.$el.html(content);
    return this;
  },

  renderSubComments: function () {
    this.subCommentsView = new Zeddit.Views.CommentsList({
      allComments: this.allComments,
      parentId: this.model.id,
      router: this.router
    });
    this.$el.append(this.subCommentsView.render().$el);
  },

  remove: function () {
    this.subCommentsView && this.subCommentsView.remove();
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
