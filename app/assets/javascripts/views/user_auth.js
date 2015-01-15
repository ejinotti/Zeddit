Zeddit.Views.UserAuth = Backbone.View.extend({
  templateLoggedIn: JST["user_loggedin"],
  templateLoggedOut: JST["user_loggedout"],
  templateForm: JST["user_form"],

  events: {
    "click #signup": "renderSignupForm",
    "click #login": "renderLoginForm",
    "click #logout": "logout",
    "submit #signup-form": "signup",
    "submit #login-form" : "login"
  },

  initialize: function (options) {
    window.viewCount++;
    this.$el = options.$el;
    this.listenTo(window.currentUser, "checked login logout", this.render);
  },

  render: function () {
    if (window.currentUser.isLoggedIn()) {
      this.$el.html(this.templateLoggedIn({ user: window.currentUser }));
    } else {
      this.$el.html(this.templateLoggedOut());
    }

    return this;
  },

  renderSignupForm: function () {
    this.$el.html(this.templateForm({ formId: "signup-form" }));
  },

  renderLoginForm: function () {
    this.$el.html(this.templateForm({ formId: "login-form" }));
  },

  login: function () {
    event.preventDefault();

    var $form = this.$("#login-form");
    var attrs = $form.serializeJSON();
    var $errors = $form.find("ul");

    window.currentUser.login(attrs, {
      error: function (model, response) {
        $errors.empty();
        response.responseJSON.errors.forEach(function (error) {
          $errors.append($("<li>").text(error));
        });
      }
    });
  },

  logout: function () {
    window.currentUser.logout();
  },


  signup: function () {
    event.preventDefault();

    var $form = this.$("#signup-form");
    var attrs = $form.serializeJSON();
    var $errors = $form.find("ul");

    var user = new Zeddit.Models.User();

    user.save(attrs, {
      error: function (model, response) {
        $errors.empty();
        response.responseJSON.errors.forEach(function (error) {
          $errors.append($("<li>").text(error));
        });
      }
    });
  }

});
