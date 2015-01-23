Zeddit.Views.Header = Backbone.View.extend({
  template: JST.header,
  templateMySubs: JST.header_mysubs,

  events: {
    "click #my-subzeddits": "toggleMySubzeddits",
    "click li": "navToSub"
  },

  initialize: function (options) {
    this.$el = options.$el;
    this.render();
    this.listenTo(window.currentUser.subscriptions, "add remove", this.renderMySubs);
    this.listenTo(window.currentUser, "login logout checked", this.renderMySubs);
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  renderMySubs: function () {
    this.$("nav").html(this.templateMySubs());
    return this;
  },

  setTitle: function (title) {
    this.$("h1").text(title);
  },

  toggleMySubzeddits: function () {
    console.log("toggle mysubzeddits");
    this.$("ul").toggleClass("hidden");
  },

  navToSub: function (event) {
    this.toggleMySubzeddits();
    Backbone.history.navigate(
      "#z/" + $(event.currentTarget).text(), { trigger: true }
    );
  }

});
