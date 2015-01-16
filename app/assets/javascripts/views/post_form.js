Zeddit.Views.PostForm = Backbone.View.extend({
  template: JST["post_form"],

  events: {
    "submit": "submitForm"
  },

  initialize: function (options) {
    window.viewCount++;
    this.render();
  },

  render: function () {
    var content = this.template({
      post: this.model
    });
    this.$el.html(content);
    return this;
  },

  submitForm: function (event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var attrs = $form.serializeJSON();
    var $errors = $form.find("ul");

    var errorCb = function (response) {
      $errors.empty();
      response.responseJSON.errors.forEach(function (error) {
        $errors.append($("<li>").text(error));
      });
    };

    var successCb = function (post) {
      Backbone.history.navigate("z/" + sub.get("title"), { trigger: true });
    };

    if (this.model) {
      this.model.set(attrs.post);
      this.model.save({}, {
        success: successCb,
        error: errorCb
      });
    } else {
      var newPost = new Zeddit.Models.Post();
      newPost.set(attrs.post);
      newPost.save({}, {
        success: successCb,
        error: errorCb
      });
    }
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    window.viewCount--;
  }
});
