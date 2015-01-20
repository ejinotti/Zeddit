Zeddit.Views.UserShow = Backbone.View.extend({
  template: JST["user_show"],

  initialize: function () {
    window.viewCount++;
    this.postsListView = new Zeddit.Views.PostsList({
      collection: this.model.posts
    });
    // this.render();
    this.listenTo(this.model, "sync", this.render);
  },

  render: function (){
    console.log("UserShow render..");
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.$el.append(this.postsListView.$el);
    return this;
  },

  remove: function () {
    this.postsListView.remove();
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
