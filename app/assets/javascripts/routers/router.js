Zeddit.Routers.Router = Backbone.Router.extend({

  routes: {
    '': 'root'
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
    console.log('ROOT');

    if (!this.loginChecked) {
      console.log('Login check not done yet..');
      this.$auth.one('checked', this.root.bind(this));
      return;
    }

    var rootPosts = new Zeddit.Collections.Posts();
    rootPosts.fetch({
      success: function () {
        console.log('rootPosts fetch success..');
        console.log(rootPosts);
        // debugger;
      }
    });
    var rootView = new Zeddit.Views.PostsList({
      collection: rootPosts,
      router: this
    });

    this._swapView(this.mainView, this.$main, rootView);
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

  _swapView: function (currView, $el, newView) {
    currView && currView.remove();
    currView = newView;
    $el.html(newView.render().$el);
  }
});
