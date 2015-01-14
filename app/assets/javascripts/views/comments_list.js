Zeddit.Views.CommentsList = Backbone.View.extend({
  tagName: 'ul',

  initialize: function (options) {
    window.viewCount++;
    this.router = options.router;
  },

  render: function () {

  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
