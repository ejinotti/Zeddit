Zeddit.Views.PostsList = Backbone.View.extend({
  tagName: "ul",

  initialize: function () {
    window.viewCount++;
    this.listenTo(this.collection, "sync reset", this.render);
    this.postViews = [];
  },

  render: function () {
    var that = this;

    console.log("PostsList render..");

    if (this.postViews.length) {
      this.removeSubs();
      this.$el.empty();
    }

    this.collection.each(function (post) {
      var postView = new Zeddit.Views.Post({
        model: post,
        isShowPage: false
      });
      that.postViews.push(postView);
      // var $li = $("<li>");
      // $li.append(postView.render().$el);
      // that.$el.append($li);
      $("<li>").html(postView.render().$el).appendTo(that.$el);
      // debugger;
    });

    return this;
  },

  remove: function () {
    this.removeSubs();
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  },

  removeSubs: function () {
    this.postViews.forEach(function (postView) {
      postView.remove();
    });
    this.postViews = [];
  }

});
