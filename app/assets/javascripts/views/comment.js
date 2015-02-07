Zeddit.Views.Comment = Backbone.View.extend({
  template: JST.comment,
  tagName: "li",
  className: "comment group",

  events: {
    "click .edit": "showEdit",
    "click .edit-cancel": "clearEdit",
    "submit .edit-form": "submitEdit",
    "submit .reply-form": "submitReply",
    "click .delete": "delete",
    "click .reply": "showReply",
    "click .reply-cancel": "clearReply",
    "click .vote-up": "upvote",
    "click .vote-down": "downvote"
  },

  initialize: function (options) {
    window.viewCount++;
    this.allComments = options.allComments;

    this.voteValue = 0;
    this.vote = window.currentUser.votes.findWhere({
      votable_id: this.model.id,
      votable_type: "Comment"
    });
    if (this.vote) this.voteValue = this.vote.get("value");

    this.render();

    this.$body = this.$(".comment-body");
    this.$editBox = this.$(".edit-box");
    this.$editLink = this.$(".edit");
    this.$editForm = this.$(".edit-form");

    this.$replyBox = this.$(".reply-box");
    this.$replyLink = this.$(".reply");
    this.$replyForm = this.$(".reply-form");

    this.$points = this.$(".points");
    this.$upArrow = this.$(".vote-up");
    this.$downArrow = this.$(".vote-down");

    if (this.allComments[this.model.id]) {
      this.renderSubComments();
    }
  },

  render: function () {
    var content = this.template({
      comment: this.model,
      voteValue: this.voteValue
    });
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

  upvote: function (event) {
    event.stopPropagation();
    this.castVote(1, this.$upArrow);
  },

  downvote: function (event) {
    event.stopPropagation();
    this.castVote(-1, this.$downArrow);
  },

  castVote: function (val, $arrow) {
    var that = this;
    var newPts;

    this.$upArrow.removeClass("vote-on");
    this.$downArrow.removeClass("vote-on");

    // destroy
    if (this.voteValue === val) {
      this.vote.destroy();
      this.vote = null;
      this.voteValue = 0;
      newPts = this.model.get("points") - val;
      this.model.set("points", newPts);
      this.$points.text(newPts + " points");

    // create
    } else if (this.voteValue === 0) {
      var newVote = new Zeddit.Models.Vote({
        value: val,
        votable_id: this.model.id,
        votable_type: "Comment"
      });
      newVote.save({}, {
        success: function () {
          window.currentUser.votes.add(newVote);
          newPts = that.model.get("points") + val;
          that.model.set("points", newPts);
          that.voteValue = val;
          that.vote = newVote;
          $arrow.addClass("vote-on");
          that.$points.text(newPts + " points");
        }
      });

    // update
    } else {
      this.vote.save({ value: val }, {
        success: function () {
          newPts = that.model.get("points") + (val * 2);
          that.model.set("points", newPts);
          that.voteValue = val;
          $arrow.addClass("vote-on");
          that.$points.text(newPts + " points");
        }
      });
    }
  },

  showEdit: function (event) {
    event.stopPropagation();

    this.$body.toggle();
    this.$editBox.toggle();
    this.$editLink.toggle();
  },

  clearEdit: function (event) {
    this.$editForm[0].reset();
    this.showEdit(event);
  },

  showReply: function (event) {
    event.stopPropagation();

    this.$replyBox.toggle();
    this.$replyLink.toggle();
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

        newComment.set("points", 0);
        newComment.set("author_name", window.currentUser.get("username"));

        that.allComments[that.model.id].add(newComment);
        that.renderSubComments();
        that.$replyBox.toggle();
        that.$replyLink.toggle();
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
