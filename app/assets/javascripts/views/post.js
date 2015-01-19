Zeddit.Views.Post = Backbone.View.extend({
  template: JST.post,
  className: "post",

  events: {
    "click .delete": "delete",
    "click .edit": "showEdit",
    "click .edit-cancel": "clearEdit",
    "submit .edit-form": "submitEdit",
    "submit .new-comment-form": "newComment"
  },

  initialize: function (options) {
    window.viewCount++;
    this.isShowPage = options.isShowPage;
    // this.render();
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    // debugger;
    console.log("Post render..");
    var content = this.template({
      post: this.model,
      isShowPage: this.isShowPage
    });
    this.$el.html(content);

    // debugger;

    // if (window.currentUser.id === this.model.get("author_id")) {
    //   this.$(".delete").on("click", this.delete.bind(this));
    // }

    return this;
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
