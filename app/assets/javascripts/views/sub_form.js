Zeddit.Views.SubForm = Backbone.View.extend({
  template: JST["sub_form"],

  events: {
    "submit": "submitForm"
  },

  initialize: function () {
    window.viewCount++;
    this.render();
  },

  render: function () {
    // debugger;
    var content = this.template({
      sub: this.model
    });
    this.$el.html(content);
    return this;
  },

  submitForm: function (event) {
    event.preventDefault();

    // TODO user event.currentTarget? or target?
    var $form = this.$("form");
    var attrs = $form.serializeJSON();
    var $errors = $form.find("ul");

    var errorCb = function (response) {
      $errors.empty();
      response.responseJSON.errors.forEach(function (error) {
        $errors.append($("<li>").text(error));
      });
    };

    var successCb = function (sub) {
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
