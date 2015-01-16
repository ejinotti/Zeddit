Zeddit.Views.Sub = Backbone.View.extend({
  template: JST["sub"],
  className: "subzeddit",

  events: {

  },

  initialize: function () {
    window.viewCount++;

  },

  render: function () {
    var content = this.template({ sub: this.model });
    this.$el.html(content);
    return this;
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }

});
