Zeddit.Views.UserAuth = Backbone.View.extend({
  templateLoggedIn: JST['user_loggedin'],
  templateLoggedOut: JST['user_loggedout'],
  templateForm: JST['user_form'],

  events: {
    'click #logout': 'logout',
    'click #login': 'login',
    'click #signup': 'signup'
  },

  initialize: function (options) {
    this.$el = options.$el;
    this.$el.one('checked', this.render.bind(this));
  },

  render: function () {
    if (this.currentUser) {
      this.$el.html(this.templateLoggedIn({ user: this.currentUser }));
    } else {
      this.$el.html(this.templateLoggedOut());
    }

    return this;
  },

  renderForm: function (model, errors, callback) {
    var content = this.templateForm({

    });

    this.$el.html(content);
  },

  logout: function () {
    var that = this;

    $.ajax('/api/session', {
      type: 'DELETE',
      success: function (response) {
        console.log('Logout successful..');
        that.currentUser = null;
        that.render();
      }
    });
  },

  login: function () {
    var that = this;
    this.$el.html(this.templateForm());
    var $form = this.$('form');
    var $errors = this.$('ul');

    $form.on('submit', function (event) {
      event.preventDefault();

      var attrs = $form.serializeJSON();
      var sess = new Zeddit.Models.Session();

      sess.save(attrs, {
        success: function (user) {
          that.currentUser = user;
          $form.off('submit');
          that.render();
        },
        error: function (model, response) {
          $errors.empty();
          response.responseJSON.errors.forEach(function (error) {
            $errors.append($('<li>').text(error));
          });
        }
      });
    });
  },

  signup: function () {
    var that = this;
    this.$el.html(this.templateForm());
    var $form = this.$('form');
    var $errors = this.$('ul');

    $form.on('submit', function (event) {
      event.preventDefault();

      var attrs = $form.serializeJSON();
      var user = new Zeddit.Models.User();

      user.save(attrs, {
        success: function (user) {
          that.currentUser = user;
          $form.off('submit');
          that.render();
        },
        error: function (model, response) {
          $errors.empty();
          response.responseJSON.errors.forEach(function (error) {
            $errors.append($('<li>').text(error));
          });
        }
      });
    });
  }

});
