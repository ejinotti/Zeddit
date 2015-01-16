Zeddit.Views.PostsList = Backbone.View.extend({
  tagName: "ul",

  initialize: function () {
    window.viewCount++;
    this.listenTo(this.collection, "sync reset", this.render);
    // this.listenTo(window.currentUser, "checked", this.render);
    this.listenTo(window.currentUser, "login logout", this.refresh);
    this.postViews = [];
  },

  render: function () {
    var that = this;

    console.log("PostsList render..");

    // if (!window.currentUser.initCheckDone) return this;

    if (this.postViews.length) {
      console.log("PostsList render removing subviews..");
      this.removeSubs();
      this.$el.empty();
    }

    console.log("PostsList render createing subviews..");

    this.collection.each(function (post) {
      var postView = new Zeddit.Views.Post({ model: post });
      that.postViews.push(postView);
      $("<li>").html(postView.render().$el).appendTo(that.$el);
    });

    return this;
  },

  refresh: function () {
    this.collection.fetch();
  },

  remove: function () {
    console.log("Removing PostsList View");
    this.removeSubs();
    // debugger;
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  },

  removeSubs: function () {
    this.postViews.forEach(function (postView) {
      postView.remove();
    });
    // debugger;
    this.postViews = [];
  }

});
