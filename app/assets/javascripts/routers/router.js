Zeddit.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "root",
    "subzeddits": "subsIndex",
    "user/:username": "userShow",
    "z/:subtitle": "subShow",
    "z/:subtitle/posts/:id/:posttitle": "postShow",
    "subzeddits/create": "newSub",
    "submit": "newPost",
    "z/:subtitle/submit": "newPost"
  },

  initialize: function () {
    this.$main = $("#main");
    this.$sidebar = $("#sidebar");

    this.authView = new Zeddit.Views.UserAuth({ $el: $("#auth") });
    this.headerView = new Zeddit.Views.Header({ $el: $("header") });
  },

  root: function () {
    console.log("ROUTE => root");

    var rootPosts = new Zeddit.Collections.Posts();
    rootPosts.fetch();

    this.headerView.setTitle("");

    var rootView = new Zeddit.Views.Root({
      collection: rootPosts
    });

    this._swapMainView(rootView);
  },

  subsIndex: function () {
    console.log("ROUTE => subsIndex");

    Zeddit.allSubs.fetch();

    this.headerView.setTitle("SUBZEDDITS");

    var subIndexView = new Zeddit.Views.SubsIndex({
      collection: Zeddit.allSubs
    });

    this._swapMainView(subIndexView);
  },

  userShow: function (username) {
    console.log("ROUTE => userShow / " + username);

    var user = new Zeddit.Models.User({ username: username });
    user.fetch({
      error: function () {
        alert("User does not exist");
        Backbone.history.navigate("", { trigger: true });
      }
    });

    var userView = new Zeddit.Views.UserShow({
      model: user,
      header: this.headerView
    });

    this._swapMainView(userView);
  },

  subShow: function (subtitle) {
    console.log("ROUTE => subShow / " + subtitle);

    var subzeddit = new Zeddit.Models.Sub({ title: subtitle });
    subzeddit.fetch({
      error: function () {
        alert("Subzeddit does not exist");
        Backbone.history.navigate("", { trigger: true });
      }
    });

    var subzedditView = new Zeddit.Views.SubShow({
      model: subzeddit,
      header: this.headerView
    });

    this._swapMainView(subzedditView);
  },

  postShow: function (subtitle, id, posttitle) {
    console.log("ROUTE => postShow / " + subtitle + " / " + id + " / " + posttitle);

    var post = new Zeddit.Models.Post({ id: id });
    post.fetch();

    var postView = new Zeddit.Views.PostShow({
      model: post,
      header: this.headerView
    });

    this._swapMainView(postView);
  },

  newSub: function () {
    console.log("ROUTE => newSub");

    if (!window.currentUser.initCheckDone) {
      this.listenToOnce(window.currentUser, "checked", this.newSub);
      return;
    }

    if (!window.currentUser.isLoggedIn()) {
      alert("You must be logged-in to create a Subzeddit!");
      Backbone.history.navigate("", { trigger: true });
      return;
    }

    this.headerView.setTitle("create a subzeddit");

    var newSubView = new Zeddit.Views.SubForm();

    this._swapMainView(newSubView);
  },

  newPost: function (subtitle) {
    console.log("ROUTE => newPost / " + subtitle);

    if (!window.currentUser.initCheckDone) {
      this.listenToOnce(
        window.currentUser, "checked", this.newPost.bind(this, subtitle)
      );
      return;
    }

    if (!window.currentUser.isLoggedIn()) {
      alert("You must be logged-in to create a Post!");
      Backbone.history.navigate("", { trigger: true });
      return;
    }

    var newPostView, sub;

    if (subtitle && !Zeddit.allSubsFetched) {
      this.listenToOnce(
        Zeddit.allSubs, "sync", this.newPost.bind(this, subtitle)
      );
      return;
    } else if (subtitle) {
      sub = Zeddit.allSubs.findWhere({ title: subtitle });

      // debugger;

      if (!sub) {
        alert("Subzeddit not found!");
        Backbone.history.navigate("", { trigger: true });
        return;
      }

      this.headerView.setTitle(subtitle + ": submit");
    } else {
      this.headerView.setTitle("submit");
    }

    newPostView = new Zeddit.Views.PostNew({ subzeddit: sub });

    this._swapMainView(newPostView);
  },


  _swapMainView: function (newView) {
    this.mainView && this.mainView.remove();
    console.log("Living views: " + window.viewCount);
    this.mainView = newView;
    this.$main.html(newView.$el);
  }
});
