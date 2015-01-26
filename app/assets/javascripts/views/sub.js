Zeddit.Views.Sub = Backbone.View.extend({
  template: JST.sub,
  className: "subzeddit group",

  events: {
    "click .subscribe": "toggleSubscription"
  },

  initialize: function () {
    window.viewCount++;

  },

  render: function () {
    var content = this.template({ sub: this.model });
    this.$el.html(content);
    return this;
  },

  toggleSubscription: function (event) {
    var $button = $(event.currentTarget);
    var that = this;

    if (!window.currentUser.isLoggedIn()) {
      alert("You must be logged-in to subscribe!");
      return;
    }

    if ($button.text() === "subscribe") {
      var newSubscrip = new Zeddit.Models.Subscription({
        sub_id: this.model.id
      });
      newSubscrip.save({}, {
        success: function () {
          newSubscrip.set("sub_title", that.model.get("title"));
          window.currentUser.subscriptions.add(newSubscrip);
        }
      });
      $button.addClass("subbed");
      $button.text("unsubscribe");
    } else {
      var subscrip = window.currentUser.subscriptions.findWhere({
        sub_id: this.model.id
      });
      subscrip.destroy();
      $button.removeClass("subbed");
      $button.text("subscribe");
    }
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }

});
