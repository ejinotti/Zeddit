Zeddit.Views.SubsList = Backbone.View.extend({
  template: JST['./subs_list'],
  tagName: 'ul',

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.$el.css('color', 'red');
  },

  render: function () {
    var content = this.template({ subs: this.collection });
    this.$el.html(content);
    return this;
  }
});
