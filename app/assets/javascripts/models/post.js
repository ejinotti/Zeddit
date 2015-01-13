Zeddit.Models.Post = Backbone.Model.extend({
  urlRoot: '/api/posts',

  parse: function (response) {
    console.log('post model parse..');
    console.log(response);
    return response;
  }
});
