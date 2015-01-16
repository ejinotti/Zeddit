Zeddit.Models.Sub = Backbone.Model.extend({
  urlRoot: "/api/subs",

  initialize: function () {
    this.posts = new Zeddit.Collections.Posts();
  },

  fetch: function (options) {
    return Backbone.Model.prototype.fetch.call(this, $.extend(options, {
      url: this.urlRoot + "/" + this.get("title")
    }));
  },

  parse: function (response) {
    if (response.posts) {
      this.posts.reset(response.posts);
      delete response.posts;
    }

    return response;
  }
});
