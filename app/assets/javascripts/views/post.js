Zeddit.Views.Post = Backbone.View.extend({
  template: JST['post'],
  className: 'post',

  events: {

  },

  initialize: function () {
    window.viewCount++;
  },

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
