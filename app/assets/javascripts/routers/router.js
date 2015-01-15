Zeddit.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "root",
    "user/:username": "userShow",
    "z/:subtitle": "subShow",
    "z/:subtitle/posts/:id/:posttitle": "postShow"
  },

  initialize: function () {
    this.$auth = $("#auth");
    this.$main = $("#main");
    this.$sidebar = $("#sidebar");

    this.authView = new Zeddit.Views.UserAuth({ $el: this.$auth });
  },

  root: function () {
    console.log("ROUTE => root");

    var rootPosts = new Zeddit.Collections.Posts();
    rootPosts.fetch();
    var rootView = new Zeddit.Views.PostsList({
      collection: rootPosts
    });

    this._swapMainView(rootView);
  },

  userShow: function (username) {
    console.log("ROUTE => userShow / " + username);

    var user = new Zeddit.Models.User({ username: username });
    user.fetch();

    var userView = new Zeddit.Views.UserShow({
      model: user
    });

    this._swapMainView(userView);
  },

  subShow: function (subtitle) {
    console.log("ROUTE => subShow / " + subtitle);

    var subzeddit = new Zeddit.Models.Sub({ title: subtitle });
    subzeddit.fetch();

    var subzedditView = new Zeddit.Views.SubShow({
      model: subzeddit
    });

    this._swapMainView(subzedditView);
  },

  postShow: function(subtitle, id, posttitle) {
    console.log("ROUTE => postShow / " + subtitle + " / " + id + " / " + posttitle);

    var post = new Zeddit.Models.Post({ id: id });
    post.fetch();

    var postView = new Zeddit.Views.PostShow({
      model: post
    });

    this._swapMainView(postView);
  },

  _swapMainView: function (newView) {
    this.mainView && this.mainView.remove();
    console.log("Living views: " + window.viewCount);
    this.mainView = newView;
    this.$main.html(newView.$el);
  }
});
