Zeddit.Models.Post = Backbone.Model.extend({
  urlRoot: '/api/posts',

  parse: function (response) {
    if (response.all_comments) {
      this.allComments = {};
      for (var key in response.all_comments) {
        this.allComments[key] = new Zeddit.Collections.Comments();
        this.allComments[key].reset(response.all_comments[key]);
      }
      delete response.all_comments;
    }

    return response;
  }
});
