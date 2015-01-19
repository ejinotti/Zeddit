Zeddit.Views.SubShow = Backbone.View.extend({
  template: JST.sub_show,

  events: {
    "click #edit-sub": "edit",
    "click #delete-sub": "delete",
    "click #new-post": "newPost",
    "click .subscribe": "toggleSubscription"
  },

  initialize: function () {
    window.viewCount++;
    this.postsListView = new Zeddit.Views.PostsList({
      collection: this.model.posts
    });
    this.render();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(window.currentUser, "login logout", this.render);
  },

  render: function () {
    var content = this.template({ sub: this.model });
    this.$el.html(content);
    this.$el.append(this.postsListView.$el);
    return this;
  },

  edit: function () {
    this.postsListView.remove();
    this.editView = new Zeddit.Views.SubForm({
      model: this.model
    });
    this.$el.html(this.editView.$el);
  },

  delete: function () {
    this.model.destroy();
    window.history.back();
  },

  newPost: function () {
    if (window.currentUser.isLoggedIn()) {
      Backbone.history.navigate(
        "z/" + this.model.get("title") + "/submit", { trigger: true }
      );
    } else {
      alert("You must be logged-in to submit a new post!");
    }
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
      $button.text("unsubscribe");
    } else {
      var subscrip = window.currentUser.subscriptions.findWhere({
        sub_id: this.model.id
      });
      subscrip.destroy();
      $button.text("subscribe");
    }
  },

  remove: function () {
    this.postsListView && this.postsListView.remove();
    this.editView && this.editView.remove();
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
