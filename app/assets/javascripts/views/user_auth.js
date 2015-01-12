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

    $.ajax('/api/session', {
      type: 'DELETE',
      success: function (response) {
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
        success: function (response) {
          if (!response.message) {
            that.currentUser = response;
            that.render();
          } else {
            // login failed stuff
          }
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
        success: function (response) {
          if (!response.message) {
            that.currentUser = response;
            that.render();
          } else {
            // create acct failed stuff
          }
        }
      });
    });
  },

});
