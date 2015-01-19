Zeddit.Views.Header = Backbone.View.extend({
  template: JST.header,
  templateMySubs: JST.header_mysubs,

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
  }

  // clearMySubs: function () {
  //   this.$("nav").empty();
  // }

});
