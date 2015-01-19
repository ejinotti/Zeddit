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

    // this.render();
    this.listenTo(this.model, "sync", this.render);
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
    // debugger;
    console.log("Post render..");

    var content = this.template({
      post: this.model,
      isShowPage: this.isShowPage,
      voteValue: this.voteValue
    });
    this.$el.html(content);

    // debugger;

    // if (window.currentUser.id === this.model.get("author_id")) {
    //   this.$(".delete").on("click", this.delete.bind(this));
    // }

    // this.delegateEvents();

    return this;
  },

  upvote: function (event) {
    console.log("upvote!");
    console.log(this.vote);
    console.log(this.voteValue);
    // debugger;

    var that = this;

    if (this.vote) {
      console.log("this.vote exists, destroying.. " + this.vote.id);
      this.$(".vote").removeClass("vote-on");
      // debugger;
      this.vote.destroy();
      // debugger;
    }

    if (this.voteVal === 1) {
      this.voteVal = 0;
      return;
    }

    var newVote = new Zeddit.Models.Vote({
      value: 1,
      votable_id: this.model.id,
      votable_type: "Post"
    });

    newVote.save({}, {
      success: function () {
        window.currentUser.votes.add(newVote);
        console.log("created new vote.. " + newVote.id);
        that.voteVal = 1;
        that.vote = newVote;
        that.$(".vote-up").addClass("vote-on");
      }
    });
  },

  downvote: function (event) {
    console.log("downvote!");
    var that = this;

    if (this.vote) {
      this.$(".vote").removeClass("vote-on");
      this.vote.destroy();
    }

    if (this.voteVal === -1) {
      this.voteVal = 0;
      return;
    }

    var newVote = new Zeddit.Models.Vote({
      value: -1,
      votable_id: this.model.id,
      votable_type: "Post"
    });

    newVote.save({}, {
      success: function () {
        window.currentUser.votes.add(newVote);
        that.voteVal = -1;
        that.vote = newVote;
        that.$(".vote-up").addClass("vote-on");
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

  // wtf: function () {
  //   console.log("wtfffff");
  // },

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
