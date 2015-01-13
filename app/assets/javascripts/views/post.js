Zeddit.Views.Post = Backbone.View.extend({
  template: JST['post'],
  className: 'post',
  
  events: {

  },

  initialize: function () {

  },

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  }
});
