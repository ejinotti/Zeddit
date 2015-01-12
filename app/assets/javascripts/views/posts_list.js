Zeddit.Views.PostsList = Backbone.View.extend({
  template: JST['posts_list'],
  tagName: 'ul',

  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render);
    this.router = options.router;
  },

  render: function () {
    var content = this.template({
      posts: this.collection,
      showSub: false
    });
    this.$el.html(content);
    debugger;
    return this;
  }
});
