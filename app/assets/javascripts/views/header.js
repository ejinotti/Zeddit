Zeddit.Views.Header = Backbone.View.extend({
  template: JST.header,
  templateMySubs: JST.header_mysubs,

  events: {
    "click #my-subzeddits": "toggleMySubzeddits"
  },

  initialize: function (options) {
    this.$el = options.$el;
    this.render();
    this.listenTo(window.currentUser, "login logout checked", this.renderMySubs);
    // this.listenTo(window.currentUser, "logout", this.clearMySubs);
  },

  render: function () {
    this.$el.html(this.template());
    // debugger;
    return this;
  },

  renderMySubs: function () {
    if (window.currentUser.isLoggedIn()) {
      this.$("nav").html(this.templateMySubs());
    } else {
      this.$("nav").empty();
    }
  },

  toggleMySubzeddits: function () {
    console.log("toggle");
    this.$("ul").toggleClass("hidden");
  }

  // clearMySubs: function () {
  //   this.$("nav").empty();
  // }

});
