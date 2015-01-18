Zeddit.Views.Post = Backbone.View.extend({
  template: JST.post,
  className: "post",

  events: {
    "click #edit": "editToggle",
    "click button": "clearAndToggle",
    "submit": "submit",
    "click #delete": "delete"
  },

  initialize: function (options) {
    window.viewCount++;
    this.isShowPage = options.isShowPage;
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      post: this.model,
      isShowPage: this.isShowPage
    });
    this.$el.html(content);
    return this;
  },

  editToggle: function () {
    $("#post-content").toggleClass("hidden");
    $("#post-edit").toggleClass("hidden");
    $("#edit").toggleClass("hidden");
  },

  clearAndToggle: function () {
    this.$("form")[0].reset();
    this.editToggle();
  },

  submit: function (event) {
    event.preventDefault();

    var attrs = $(event.target).serializeJSON().post;
    var that = this;

    this.model.save(attrs, {
      success: function () {
        that.render();
      }
    });
  },

  delete: function () {
    this.model.destroy();
    if (this.isShowPage) {
      window.history.back();
    } else {
      this.remove();
    }
  },

  remove: function () {
    console.log("removing a Post View.");
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
