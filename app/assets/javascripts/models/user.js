Zeddit.Models.User = Backbone.Model.extend({
  url: function () {
    return '/api/users/' + this.get('username');
  },

  initialize: function () {
    this.posts = new Zeddit.Collections.Posts();
  },

  parse: function (response) {
    // console.log('User model parse..');

    if (response.posts) {
      this.posts.reset(response.posts);
      delete response.posts;
    }

    return response;
  }
});
