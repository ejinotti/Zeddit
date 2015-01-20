Zeddit.Views.Post = Backbone.View.extend({
  template: JST.post,
  className: "post",

  events: {
    "click .delete": "delete",
    "click .edit": "showEdit",
    "click .edit-cancel": "clearEdit",
    "submit .edit-form": "submitEdit",
    "submit .new-comment-form": "newComment",
    "click .vote-up": "upvote",
    "click .vote-down": "downvote"
  },

  initialize: function (options) {
    window.viewCount++;
    this.isShowPage = options.isShowPage;

    if (this.isShowPage) {
      this.listenTo(this.model, "sync", this.initialSetup);
    } else {
      this.initialSetup();
    }

    // this.render();
    // this.listenTo(this.model, "sync", this.render);
  },

  initialSetup: function () {
    this.setInitVote();
    this.render();
  },

  setInitVote: function () {
    this.voteValue = 0;
    this.vote = window.currentUser.votes.findWhere({
      votable_id: this.model.id,
      votable_type: "Post"
    });
    if (this.vote) this.voteValue = this.vote.get("value");
  },

  render: function () {
    console.log("Post render..");

    var content = this.template({
      post: this.model,
      isShowPage: this.isShowPage,
      voteValue: this.voteValue
    });
    this.$el.html(content);

    return this;
  },

  upvote: function (event) {
    this.castVote(1);
  },

  downvote: function (event) {
    this.castVote(-1);
  },

  castVote: function (val) {
    console.log("voting, val = " + val);
    var that = this;

    if (this.vote) {
      this.vote.destroy();
      this.vote = null;
    }

    if (this.voteValue === val) {
      this.voteValue = 0;
      this.model.set("points", this.model.get("points") - val);
      this.render();
      return;
    }

    var newVote = new Zeddit.Models.Vote({
      value: val,
      votable_id: this.model.id,
      votable_type: "Post"
    });

    newVote.save({}, {
      success: function () {
        window.currentUser.votes.add(newVote);
        var delta = (that.voteValue * -1) + val;
        that.model.set("points", that.model.get("points") + delta);
        that.voteValue = val;
        that.vote = newVote;
        that.render();
      }
    });
  },

  showEdit: function () {
    $("#post-content").toggleClass("hidden");
    $("#post-edit").toggleClass("hidden");
    this.$("a.edit").toggleClass("hidden");
  },

  clearEdit: function () {
    this.$("form")[0].reset();
    this.showEdit();
  },

  submitEdit: function (event) {
    event.preventDefault();

    var attrs = $(event.target).serializeJSON().post;
    var that = this;

    this.model.save(attrs, { success: function () { that.render(); } });
  },

  delete: function (event) {
    console.log("a.delete clicked!");
    // this.model.destroy();
    // if (this.isShowPage) {
    //   window.history.back();
    // } else {
    //   this.remove();
    // }
  },

  newComment: function (event) {
    event.preventDefault();
    var attrs = $(event.target).serializeJSON().comment;
    var newComment = new Zeddit.Models.Comment({
      post_id: this.model.id,
      parent_id: null
    });
    var that = this;

    newComment.save(attrs, {
      success: function () {
        if (!that.model.allComments) {
          that.model.allComments = {};
          that.model.allComments[""] = new Zeddit.Collections.Comments();
        }
        that.model.allComments[""].add(newComment);
        that.model.trigger("sync");
      }
    });
  },

  remove: function () {
    console.log("removing a Post View.");
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
