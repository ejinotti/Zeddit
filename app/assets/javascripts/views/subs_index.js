Zeddit.Views.SubsIndex = Backbone.View.extend({
  template: JST.subs_index,

  events: {
    "click #new-subz": "newSub"
  },

  initialize: function () {
    window.viewCount++;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(window.currentUser, "checked login logout", this.render);
    this.subzViews = [];
  },

  render: function () {
    var that = this;

    if (!window.currentUser.initCheckDone) return this;

    this.$el.html(this.template());

    this.collection.each(function (sub) {
      var subzView = new Zeddit.Views.Sub({ model: sub });
      that.subzViews.push(subzView);
      $("<li>").html(subzView.render().$el).appendTo(that.$("ul"));
    });

    return this;
  },

  newSub: function () {

    // TODO might also want to change to wait for initCheck
    if (window.currentUser.isLoggedIn()) {
      Backbone.history.navigate("subzeddits/create", { trigger: true });
    } else {
      // TODO pop-up login/signup modal
      alert("You must be logged-in to do that!");
    }
  },

  remove: function () {
    this.subzViews.forEach(function (subzView) {
      subzView.remove();
    });
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }

});
