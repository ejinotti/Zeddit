Zeddit.Views.Comment = Backbone.View.extend({
  template: JST.comment,
  tagName: "li",
  className: "comment",

  events: {
    "click .edit": "showEdit",
    "click .edit-cancel": "clearEdit",
    "submit .edit-form": "submitEdit",
    "submit .reply-form": "submitReply",
    "click .delete": "delete",
    "click .reply": "showReply",
    "click .reply-cancel": "clearReply"
  },

  initialize: function (options) {
    window.viewCount++;
    this.allComments = options.allComments;
    this.render();

    this.$body = this.$(".comment-body");
    this.$editBox = this.$(".edit-box");
    this.$editLink = this.$(".edit");
    this.$editForm = this.$(".edit-form");

    this.$replyBox = this.$(".reply-box");
    this.$replyLink = this.$(".reply");
    this.$replyForm = this.$(".reply-form");

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
    console.log("rendering subComments..");
    this.subCommentsView = new Zeddit.Views.CommentsList({
      allComments: this.allComments,
      parentId: this.model.id
    });
    this.$el.append(this.subCommentsView.render().$el);
  },

  showEdit: function (event) {
    event.stopPropagation();

    this.$body.toggleClass("hidden");
    this.$editBox.toggleClass("hidden");
    this.$editLink.toggleClass("hidden");
  },

  clearEdit: function (event) {
    this.$editForm[0].reset();
    this.showEdit(event);
  },

  showReply: function (event) {
    event.stopPropagation();

    this.$replyBox.toggleClass("hidden");
    this.$replyLink.toggleClass("hidden");
  },

  clearReply: function (event) {
    this.$replyForm[0].reset();
    this.showReply(event);
  },

  submitEdit: function (event) {
    event.preventDefault();
    event.stopPropagation();

    var attrs = this.$editForm.serializeJSON().comment;
    var that = this;
    this.model.save(attrs, { success: function () { that.render(); } });
  },

  submitReply: function (event) {
    event.preventDefault();
    event.stopPropagation();

    var attrs = this.$replyForm.serializeJSON().comment;
    var newComment = new Zeddit.Models.Comment({
      parent_id: this.model.id,
      post_id: this.model.get("post_id")
    });
    var that = this;

    newComment.save(attrs, {
      success: function () {
        if (!that.subCommentsView) {
          that.allComments[that.model.id] = new Zeddit.Collections.Comments();
        } else {
          that.subCommentsView.remove();
        }
        that.allComments[that.model.id].add(newComment);
        that.renderSubComments();
        that.$replyBox.toggleClass("hidden");
        that.$replyLink.toggleClass("hidden");
      }
    });
  },

  delete: function (event) {
    event.stopPropagation();
    this.model.destroy();
    this.remove();
  },

  remove: function () {
    this.subCommentsView && this.subCommentsView.remove();
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
