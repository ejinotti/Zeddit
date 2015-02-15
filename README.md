#Zeddit
A humble clone of [Reddit](http://www.reddit.com)..

**Zeddit** is a social link and article aggregation app.  It is *basically* a
collection of forums.  It allows users to collaborate in their own forums,
posting and commenting for news and entertainment.  Users may subscribe to the
forums they prefer, creating their own customized front page feed of links and
articles.

**Zeddit** is a single-page app written with Backbone.JS plus jQuery on the
front-end, and a Ruby on Rails back-end API serving JSON.  It also makes use of
various gems and plug-ins, including:
+ [FriendlyId](https://github.com/norman/friendly_id)
+ [Validates URL](https://github.com/perfectline/validates_url)
+ [Faker](https://github.com/stympy/faker)
+ [jQuery.serializeJSON](https://github.com/marioizquierdo/jquery.serializeJSON)
+ [jQuery.timeago](https://github.com/rmm5t/jquery-timeago)
+ [jQuery.validate](http://jqueryvalidation.org/)

######Design Challenges, Choices, Etc..
This project was first implemented entirely in Rails with no JS or styling.  I
then converted it to a JSON API with a front-end in Backbone..
1. The only challenge of the initial Rails version was deciding how to implement
subscribe/unsubscribe and upvote/downvote.  I originally had them as custom
routes to actions on the users controller, but later refactored to give them
their own controllers.
2. The first challenge of the port to Backbone was authentication.  My original
implementation provided a #auth html id where event handlers were attached with
jQuery to watch for auth events.  I eventually realized that this was terrible
and did a complete refactor to create a top-level Backbone model of the
CurrentUser attached to the window.  This allowed for the monitoring of auth
events with Backbone listenTo and also for storing data such as subscriptions
on the CurrentUser model.
3. Had a minor issue with votes.  After porting vote behavior, had changed it to
using only create and delete calls to the API.  This created some erratic
behavior when clicking to change from an upvote to a downvote or vice-versa as I
would first delete the existing vote, then create a new vote.  This was
obviously a synch issue which I resolved upon realizing that I could simply do
a single update of the vote's value from 1 to -1 or vice-versa.
4. Had a longstanding bug with click events on delete button of posts in a list
not registering.  Solved this when I found that I was accidentally rendering
twice, thus calling .html() (and thus .empty())twice and zonking out my event
handlers.
5. Styling was a *nightmare*..

###TODO
+ Add custom logo upload to subzeddit create.
+ Improve user show to interleave the user's posts and comments.
+ User Karma: post and comment
+ Other orderings for main page (*hot, rising, top, etc*)
+ Extend other orderings to SubZ's and comments
+ Moderators
+ Search: full-site and SubZ's
