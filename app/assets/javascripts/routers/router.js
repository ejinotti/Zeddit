Zeddit.Routers.Router = Backbone.Router.extend({

  routes: {
    '': 'root',
    'user/:username': 'userShow',
    'z/:subtitle': 'subShow'
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
    console.log("Living views: " + window.viewCount);

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
    console.log("Living views: " + window.viewCount);

    if (!this.loginChecked) {
      console.log('Login check not done yet..');
      this.$auth.one('checked', this.userShow.bind(this, username));
      return;
    }

    var user = new Zeddit.Models.User({ username: username });
    user.fetch();

    var userView = new Zeddit.Views.PostsList({
      collection: user.posts,
      router: this
    });

    this._swapMainView(userView);
  },

  subShow: function (subtitle) {
    console.log("ROUTE => subShow / " + subtitle);
    console.log("Living views: " + window.viewCount);

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
    // console.log('Swapping #main view. Current viewCount: ' + window.viewCount);
    this.mainView && this.mainView.remove();
    this.mainView = newView;
    this.$main.html(newView.$el);
    // console.log('Swap complete. Remaining views: ' + window.viewCount);
  }
});
