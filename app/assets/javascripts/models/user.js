Zeddit.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  initialize: function () {
    this.posts = new Zeddit.Collections.Posts();
  },

  save: function (attrs, options) {
    return Backbone.Model.prototype.save.call(this, attrs, $.extend(options, {
      success: function (newUser) {
        window.currentUser.loginNewUser(newUser);
      }
    }));
  },

  parse: function (response) {
    if (response.posts) {
      this.posts.reset(response.posts);
      delete response.posts;
    }

    return response;
  },

  fetch: function (options) {
    return Backbone.Model.prototype.fetch.call(this, $.extend(options, {
      url: this.urlRoot + "/" + this.get("username")
    }));
  }
});

Zeddit.Models.CurrentUser = Zeddit.Models.User.extend({
  url: "/api/session",

  initialize: function () {
    this.isChecked = false;
  },

  parse: function (response) { return response; },

  fetch: function() {
    var that = this;
    return Backbone.Model.prototype.fetch.call(this, {
      success: function () {
        that.isChecked = true;
        that.trigger("checked");
      }
    });
  },

  isLoggedIn: function () {
    return !this.isNew();
  },

  login: function (attrs, options) {
    var that = this;
    this.clear();
    this.save(attrs, $.extend(options, {
      success: function () {
        that.trigger("login");
      }
    }));
  },

  loginNewUser: function (newUser) {
    this.set("id", newUser.id);
    this.set("username", newUser.get("username"));
    this.trigger("login");
  },

  logout: function () {
    var that = this;
    this.destroy({
      success: function () {
        that.clear();
        that.trigger("logout");
      }
    });
  }

});
