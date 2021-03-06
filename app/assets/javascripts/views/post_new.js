Zeddit.Views.PostNew = Backbone.View.extend({
  template: JST.post_new,
  className: "post-new",

  events: {
    "submit": "submitForm",
    "keyup #sub-title": "handleSubTitleInput",
    "click li.dropdown-item": "setDropdown"
  },

  initialize: function (options) {
    window.viewCount++;
    this.subzeddit = options.subzeddit;
    this.render();
    this.$("#new-post-form").validate();
    this.listenTo(window.currentUser, "logout", this.kickEmOut);
    $(document).on("keyup", this.cancelDropdown);
  },

  render: function () {
    var content = this.template({
      sub: this.subzeddit
    });
    this.$el.html(content);
    return this;
  },

  kickEmOut: function () {
    alert("You must be logged-in to post");
    Backbone.history.navigate("", { trigger: true });
  },

  submitForm: function (event) {
    event.preventDefault();

    var $form = $(event.target);
    var attrs = $form.serializeJSON().post;

    var errorCb = function () {
      alert("Something unexpected has occurred!");
    };

    var successCb = function (post) {
      var sub = Zeddit.allSubs.get(post.get("sub_id"));
      Backbone.history.navigate("z/" + sub.get("title"), { trigger: true });
    };

    var newPost = new Zeddit.Models.Post();

    var sub = Zeddit.allSubs.findWhere({ title: attrs.sub_title });

    if (!sub) {
      alert("That subzeddit does not exist!");
      $("#sub-title").val("").focus();
      return;
    }

    attrs.sub_id = sub.id;
    delete attrs.sub_title;

    newPost.set(attrs);
    newPost.save({}, { success: successCb, error: errorCb });
  },

  handleSubTitleInput: function (event) {
    var $dropdown = $("#dropdown");
    var input = $(event.currentTarget).val();

    $dropdown.empty().hide();

    if (input === "") return;

    var results = Zeddit.allSubs.filter(function (sub) {
      return sub.get("title").match(new RegExp("^" + input));
    });

    results.forEach(function (result) {
      var $li = $("<li class='dropdown-item'>");
      $li.text(result.get("title")).appendTo($dropdown);
    });
    $dropdown.show();
  },

  setDropdown: function (event) {
    var $targ = $(event.currentTarget);
    $("#sub-title").val($targ.text());
    $("#dropdown").empty().hide();
  },

  cancelDropdown: function (e) {
    if (e.keyCode === 27) {
      $("#dropdown").empty().hide();
    }
  },

  remove: function () {
    $(document).off("keyup");
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
