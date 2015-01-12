Zeddit.Views.UserAuth = Backbone.View.extend({
  templateLoggedIn: JST['user_loggedin'],
  templateLoggedOut: JST['user_loggedout'],
  templateForm: JST['user_form'],

  events: {
    'click #logout': 'logout',
    'click #login': 'login',
    'click #signup': 'signup'
  },

  initialize: function (options) {
    this.$el = options.$el;
    this.$el.one('checked', this.render.bind(this));
  },

  render: function () {
    if (this.currentUser) {
      this.$el.html(this.templateLoggedIn({ user: this.currentUser }));
    } else {
      this.$el.html(this.templateLoggedOut());
    }

    return this;
  },

  logout: function () {
    var that = this;
    console.log('Attempting logout..');

    $.ajax('/api/session', {
      type: 'DELETE',
      success: function (response) {
        console.log('Logout successful..');
        that.currentUser = null;
        that.render();
      }
    });
  },

  login: function () {
    var that = this;
    this.$el.html(this.templateForm());

    this.$('form').on('submit', function (event) {
      event.preventDefault();

      var attrs = $(this).serializeJSON();
      var sess = new Zeddit.Models.Session();

      sess.save(attrs, {
        success: function (user) {
          that.currentUser = user;
          that.render();
        },
        error: function (model, response) {
          console.log('Log-in error..');
          console.log(response);
        }
      });
    });
  },

  signup: function () {
    var that = this;
    this.$el.html(this.templateForm());

    this.$('form').on('submit', function (event) {
      event.preventDefault();

      var attrs = $(this).serializeJSON();
      var user = new Zeddit.Models.User();

      user.save(attrs, {
        success: function (user) {
          that.currentUser = user;
          that.render();
        },
        error: function (model, response) {
          console.log('Sign-up error..');
          console.log(response);
        }
      });
    });
  },

});
