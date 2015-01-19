Zeddit.Views.Header = Backbone.View.extend({
  template: JST.header,
  templateMySubs: JST.header_mysubs,

  events: {
    "click #my-subzeddits": "toggleMySubzeddits"
  },

  initialize: function (options) {
    this.$el = options.$el;
    this.render();
    // this.listenTo(window.currentUser, "login logout checked", this.renderMySubs);
    this.listenTo(window.currentUser.subscriptions, "add remove", this.renderMySubs);
    this.listenTo(window.currentUser, "login logout checked", this.renderMySubs);
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  renderMySubs: function () {
    console.log("rendering MySubs..");
    if (window.currentUser.isLoggedIn()) {
      this.$("nav").html(this.templateMySubs());
    } else {
      this.$("nav").empty();
      window.currentUser.subscriptions.reset();
    }
  },

  toggleMySubzeddits: function () {
    this.$("ul").toggleClass("hidden");
  }

});
