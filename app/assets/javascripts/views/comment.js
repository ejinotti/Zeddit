Zeddit.Views.Comment = Backbone.View.extend({
  template: JST['comment'],
  tagName: 'li',
  className: 'comment',

  events: {

  },

  initialize: function (options) {
    window.viewCount++;
    this.router = options.router;
  },

  render: function () {
    var content = this.template({ comment: this.model });
    this.$el.html(content);
    return this;
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
