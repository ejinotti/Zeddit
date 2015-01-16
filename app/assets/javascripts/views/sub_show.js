Zeddit.Views.SubShow = Backbone.View.extend({
  template: JST["sub_show"],

  events: {
    "click #edit-sub": "edit",
    "click #delete-sub": "delete",
    "click #new-post": "newPost"
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
    Backbone.history.navigate(
      "z/" + this.model.get("title") + "/submit", { trigger: true }
    );
  },

  remove: function () {
    this.postsListView && this.postsListView.remove();
    this.editView && this.editView.remove();
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
