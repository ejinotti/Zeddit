Zeddit.Views.SubForm = Backbone.View.extend({
  template: JST.sub_form,
  className: "sub-form",

  events: {
    "submit": "submitForm"
  },

  initialize: function () {
    window.viewCount++;
    this.render();
    this.listenTo(window.currentUser, "logout", this.kickEmOut);
  },

  render: function () {
    console.log("rendering SubForm..");
    var content = this.template({
      sub: this.model
    });
    this.$el.html(content);
    return this;
  },

  kickEmOut: function () {
    alert("You must be logged-in to create a subzeddit");
    Backbone.history.navigate("", { trigger: true });
  },

  submitForm: function (event) {
    event.preventDefault();

    var $form = $(event.target);
    var attrs = $form.serializeJSON();
    var $errors = $form.find("ul");

    var errorCb = function (response) {
      $errors.empty();
      response.responseJSON.errors.forEach(function (error) {
        $errors.append($("<li>").text(error));
      });
    };

    var successCb = function (sub) {
      Zeddit.allSubs.add(sub, { merge: true });
      Backbone.history.navigate("z/" + sub.get("title"), { trigger: true });
    };

    if (this.model) {
      this.model.set(attrs.sub);
      this.model.save({}, {
        success: successCb,
        error: errorCb
      });
    } else {
      var newSub = new Zeddit.Models.Sub();
      newSub.set(attrs.sub);
      newSub.save({}, {
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
