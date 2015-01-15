Zeddit.Routers.Router = Backbone.Router.extend({

  routes: {
    '': 'root',
    'user/:username': 'userShow',
    'z/:subtitle': 'subShow',
    'z/:subtitle/posts/:id/:posttitle': 'postShow'
  },

  initialize: function () {
    this.$auth = $('#auth');
    this.$main = $('#main');
    this.$sidebar = $('#sidebar');
    this.loginChecked = false;

    this.authView = new Zeddit.Views.UserAuth({ $el: this.$auth });

    this.checkLoggedIn();
  },

  root: function () {
    console.log('ROUTE => root');

    // TODO these login checks prob not needed since server already knows..

    if (!this.loginChecked) {
      console.log('Login check not done yet..');
      this.$auth.one('checked', this.root.bind(this));
      return;
    }

    var rootPosts = new Zeddit.Collections.Posts();
    rootPosts.fetch();
    var rootView = new Zeddit.Views.PostsList({
      collection: rootPosts,
      router: this
    });

    this._swapMainView(rootView);
  },

  userShow: function (username) {
    console.log('ROUTE => userShow / ' + username);

    if (!this.loginChecked) {
      console.log('Login check not done yet..');
      this.$auth.one('checked', this.userShow.bind(this, username));
      return;
    }

    var user = new Zeddit.Models.User({ username: username });
    user.fetch();

    var userView = new Zeddit.Views.UserShow({
      model: user,
      router: this
    });

    this._swapMainView(userView);
  },

  subShow: function (subtitle) {
    console.log("ROUTE => subShow / " + subtitle);

    if (!this.loginChecked) {
      console.log('Login check not done yet..');
      this.$auth.one('checked', this.subShow.bind(this, subtitle));
      return;
    }

    var subzeddit = new Zeddit.Models.Sub({ title: subtitle });
    subzeddit.fetch();

    var subzedditView = new Zeddit.Views.SubShow({
      model: subzeddit,
      router: this
    });

    this._swapMainView(subzedditView);
  },

  postShow: function(subtitle, id, posttitle) {
    console.log("ROUTE => postShow / " + subtitle + " / " + id + " / " + posttitle);

    if (!this.loginChecked) {
      console.log('Login check not done yet..');
      this.$auth.one('checked',
        this.postShow.bind(this, subtitle, id, posttitle)
      );
      return;
    }

    var post = new Zeddit.Models.Post({ id: id });
    post.fetch();

    var postView = new Zeddit.Views.PostShow({
      model: post,
      router: this
    });

    this._swapMainView(postView);
  },

  checkLoggedIn: function () {
    console.log("Checking current user..");
    var that = this;
    $.ajax('api/user/current', {
      success: function (response) {
        console.log(response);
        if (response.message) {
          that.authView.currentUser = null;
        } else {
          that.authView.currentUser = new Zeddit.Models.User(response);
        }
        that.loginChecked = true;
        that.$auth.trigger('checked');
      }
    });
  },

  _swapMainView: function (newView) {
    this.mainView && this.mainView.remove();
    console.log("Living views: " + window.viewCount);
    this.mainView = newView;
    this.$main.html(newView.$el);
  }
});
