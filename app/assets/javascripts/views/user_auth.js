Zeddit.Views.UserAuth = Backbone.View.extend({
  templateLoggedIn: JST.user_loggedin,
  templateLoggedOut: JST.user_loggedout,

  events: {
    "click #signup": "showSignupModal",
    "click #login": "focusLoginForm",
    "click #logout": "logout",
    "submit #signup-form": "submitSignup",
    "submit #login-form" : "submitLogin",
    "click #make-test-user": "makeTestUser",
    "click #cancel-modal": "hideSignupModal",
    "click #user-modal": "hideSignupModal"
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

  showSignupModal: function () {
    $("#user-modal").removeClass("hidden");
    $("#user-modal-content").removeClass("hidden");
    $("body").css("overflow", "hidden");
  },

  hideSignupModal: function () {
    $("#user-modal").addClass("hidden");
    $("#user-modal-content").addClass("hidden");
    $("body").css("overflow", "auto");
  },

  focusLoginForm: function () {
    $("#login-form").find("input[type=text]").focus();
  },

  submitLogin: function (event) {
    event.preventDefault();

    var $form = this.$("#login-form");
    var creds = $form.serializeJSON();
    var $errorText = $form.find("p");

    window.currentUser.login(creds, function (response) {
      $errorText.fadeIn();
    });
  },

  logout: function () {
    window.currentUser.logout();
  },


  submitSignup: function (event) {
    event.preventDefault();

    var $form = this.$("#signup-form");
    var attrs = $form.serializeJSON();
    var $errors = $form.find("ul");

    if (attrs.user.password !== attrs.user.vpassword) {
      $errors.empty();
      $errors.append($("<li>").text("password verification error."));
      return;
    }

    delete attrs.user.vpassword;

    var user = new Zeddit.Models.User();

    user.createUser(attrs, function (response) {
      $errors.empty();
      response.responseJSON.errors.forEach(function (error) {
        $errors.append($("<li>").text(error));
      });
    });
  },

  makeTestUser: function () {
    console.log("make test user..");
    $("#login-form").find("input[type=text]").val("test");
    $("#login-form").find("input[type=password]").val("test");
    $("#login-form").trigger("submit");
  }

});
