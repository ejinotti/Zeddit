Zeddit.Models.Sub = Backbone.Model.extend({
  url: function () {
    return '/api/subs/' + this.get('title');
  },

  initialize: function () {
    this.posts = new Zeddit.Collections.Posts();
  },

  parse: function (response) {
    // console.log('Sub model parse..');

    if (response.posts) {
      this.posts.reset(response.posts);
      delete response.posts;
    }

    return response;
  }
});
