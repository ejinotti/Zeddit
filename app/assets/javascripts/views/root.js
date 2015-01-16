Zeddit.Views.Root = Backbone.View.extend({
  template: JST["root"],

  events: {
    "click #new-subz": "newSub"
  },

  initialize: function () {
    window.viewCount++;
    this.postsListView = new Zeddit.Views.PostsList({
      collection: this.collection
    });
    this.render();
    this.listenTo(window.currentUser, "login logout", this.refresh);
  },

  render: function () {
    this.$el.html(this.template());
    this.$el.append(this.postsListView.$el);
    return this;
  },

  refresh: function () {
    console.log("Root REFRESH triggered!");
    this.collection.fetch();
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
    console.log("removing Root View");
    this.postsListView.remove();
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
