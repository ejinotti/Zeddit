Zeddit.Views.Comment = Backbone.View.extend({
  template: JST.comment,
  tagName: "li",
  className: "comment",

  events: {
    "click .edit": "editToggle",
    "click button": "clearAndToggle",
    "submit": "submit",
    "click .delete": "delete",
    "click .reply": "reply"
  },

  initialize: function (options) {
    window.viewCount++;
    this.allComments = options.allComments;
    this.render();
    this.$body = this.$(".comment-body");
    this.$editBox = this.$(".hidden");
    this.$editLink = this.$(".edit");
    this.$form = this.$("form");
    // debugger;

    if (this.allComments[this.model.id]) {
      this.renderSubComments();
    }
  },

  render: function () {
    var content = this.template({ comment: this.model });
    this.$el.html(content);
    return this;
  },

  renderSubComments: function () {
    this.subCommentsView = new Zeddit.Views.CommentsList({
      allComments: this.allComments,
      parentId: this.model.id
    });
    this.$el.append(this.subCommentsView.render().$el);
  },

  editToggle: function (event) {
    event.stopPropagation();
    // debugger;
    this.$body.toggleClass("hidden");
    this.$editBox.toggleClass("hidden");
    this.$editLink.toggleClass("hidden");
  },

  clearAndToggle: function (event) {
    this.$form[0].reset();
    this.editToggle(event);
  },

  submit: function (event) {
    event.preventDefault();
    event.stopPropagation();

    var attrs = this.$form.serializeJSON().comment;
    var that = this;

    this.model.save(attrs, { success: function () { that.render(); } });
  },

  delete: function (event) {
    event.stopPropagation();
    this.model.destroy();
    this.remove();
  },

  reply: function (event) {
    event.stopPropagation();
    console.log("reply clicked..");
  },

  remove: function () {
    this.subCommentsView && this.subCommentsView.remove();
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
