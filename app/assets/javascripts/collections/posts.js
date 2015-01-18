Zeddit.Collections.Posts = Backbone.Collection.extend({
  url: '/api/posts',
  model: Zeddit.Models.Post,

  comparator: function (post1, post2) {
    var time1 = post1.get("created_at");
    var time2 = post2.get("created_at");

    if (time1 > time2) {
      return -1;
    } else if (time1 < time2) {
      return 1;
    } else {
      return 0;
    }
  }
});
