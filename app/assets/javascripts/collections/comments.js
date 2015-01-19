Zeddit.Collections.Comments = Backbone.Collection.extend({
  url: '/api/comments',
  model: Zeddit.Models.Comment,

  comparator: function (comment1, comment2) {
    var time1 = comment1.get("created_at");
    var time2 = comment2.get("created_at");

    if (time1 > time2) {
      return -1;
    } else if (time1 < time2) {
      return 1;
    } else {
      return 0;
    }
  }

});
