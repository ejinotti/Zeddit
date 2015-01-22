Zeddit.Views.Root = Backbone.View.extend({
  template: JST["root"],

  events: {
    "click #new-subz": "newSub",
    "click #new-post": "newPost"
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
    this.collection.fetch();
  },

  newSub: function () {

    // TODO might also want to change to wait for initCheck
    if (window.currentUser.isLoggedIn()) {
      Backbone.history.navigate("subzeddits/create", { trigger: true });
    } else {
      // TODO pop-up login/signup modal
      alert("You must be logged-in to create a subzeddit!");
    }
  },

  newPost: function () {
    if (window.currentUser.isLoggedIn()) {
      Backbone.history.navigate("submit", { trigger: true });
    } else {
      // TODO pop-up login/signup modal
      alert("You must be logged-in to submit a new post!");
    }
  },

  remove: function () {
    console.log("removing Root View");
    this.postsListView.remove();
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
