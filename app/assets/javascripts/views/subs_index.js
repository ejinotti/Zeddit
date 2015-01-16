Zeddit.Views.SubsIndex = Backbone.View.extend({
  tagName: "ul",

  initialize: function () {
    window.viewCount++;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(window.currentUser, "checked", this.render);
    this.subzViews = [];
  },

  render: function () {
    var that = this;

    if (!window.currentUser.initCheckDone) return this;

    this.collection.each(function (sub) {
      var subzView = new Zeddit.Views.Sub({ model: sub });
      that.subzViews.push(subzView);
      $("<li>").html(subzView.render().$el).appendTo(that.$el);
    });

    return this;
  },

  remove: function () {
    this.subzViews.forEach(function (subzView) {
      subzView.remove();
    });
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
  
});
