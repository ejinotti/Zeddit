Zeddit.Views.PostsList = Backbone.View.extend({
  tagName: "ul",

  initialize: function () {
    window.viewCount++;
    this.listenTo(this.collection, "sync reset", this.render);
    this.postViews = [];
  },

  render: function () {
    var that = this;

    if (this.postViews.length) {
      this.removeSubs();
      this.$el.empty();
    }

    this.collection.each(function (post) {
      var postView = new Zeddit.Views.Post({
        model: post,
        isShowPage: false,
        $el: $("<li>")
      });

      that.postViews.push(postView);
      that.$el.append(postView.$el);
      // $("<li>").html(postView.$el).appendTo(that.$el);
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
