Zeddit.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',
  
  initialize: function () {
    this.posts = new Zeddit.Collections.Posts();
  },

  parse: function (response) {
    if (response.posts) {
      this.posts.reset(response.posts);
      delete response.posts;
    }

    return response;
  },

  fetch: function (options) {
    Backbone.Model.prototype.fetch.call(this, $.extend(options, {
      url: this.urlRoot + "/" + this.get('username')
    }));
  }
});
