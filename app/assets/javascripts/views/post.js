Zeddit.Views.Post = Backbone.View.extend({
  template: JST['post'],
  className: 'post',

  events: {

  },

  initialize: function () {
    console.log('Post view create.');
    window.viewCount++;
  },

  render: function () {
    console.log('Post render..');
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  },

  remove: function () {
    console.log('Post remove..');
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
