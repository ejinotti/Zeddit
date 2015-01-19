Zeddit.Collections.Subscriptions = Backbone.Collection.extend({
  url: "/api/subscriptions",
  model: Zeddit.Models.Subscription,
  comparator: "sub_title"
});
