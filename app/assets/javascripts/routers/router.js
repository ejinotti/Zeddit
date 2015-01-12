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

    console.log('Login check completed..');
    console.log(this.authView.loggedIn);
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
  }
});
