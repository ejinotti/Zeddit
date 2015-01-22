Zeddit.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  initialize: function () {
    this.posts = new Zeddit.Collections.Posts();
  },

  createUser: function (attrs, errorCallback) {
    var that = this;

    var creds = attrs;

    return $.ajax({
      url: this.urlRoot,
      type: "POST",
      data: creds,
      dataType: "json",
      success: function (data){
        that.set(data);
        window.currentUser.loginNewUser(that);
      },
      error: function (jqXHR) {
        errorCallback(jqXHR);
      }
    });
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
    this.initCheckDone = false;
    this.subscriptions = new Zeddit.Collections.Subscriptions();
    this.votes = new Zeddit.Collections.Votes();
  },

  parse: function (response) {
    if (response.subscriptions) {
      this.subscriptions.reset(response.subscriptions);
      delete response.subscriptions;
    }

    if (response.votes) {
      this.votes.reset(response.votes);
      delete response.votes;
    }

    return response;
  },

  fetch: function() {
    var that = this;
    return Backbone.Model.prototype.fetch.call(this, {
      success: function () {
        that.initCheckDone = true;
        that.trigger("checked");
      }
    });
  },

  isLoggedIn: function () {
    return !this.isNew();
  },

  login: function (creds, errorCallback) {
    var that = this;
    this.clear();

    return $.ajax({
      url: this.url,
      type: "POST",
      data: creds,
      dataType: "json",
      success: function (data) {
        if (data.subscriptions) {
          that.subscriptions.reset(data.subscriptions);
          delete data.subscriptions;
        }
        if (data.votes) {
          that.votes.reset(data.votes);
          delete data.votes;
        }
        that.set(data);
        that.trigger("login");
      },
      error: function (jqXHR) {
        errorCallback(jqXHR);
      }
    });
  },

  loginNewUser: function (newUser) {
    this.clear();
    this.set(newUser.attributes);
    this.trigger("login");
  },

  logout: function () {
    var that = this;

    return $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function () {
        that.clear();
        that.subscriptions.reset();
        that.votes.reset();
        that.trigger("logout");
      }
    });
  }

});
