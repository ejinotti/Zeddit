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

*(design choices)*

###TODO
+ Add custom logo upload to subzeddit create.
+ Improve user show to interleave the user's posts and comments.
+ User Karma: post and comment
+ Other orderings for main page (*hot, rising, top, etc*)
+ Extend other orderings to SubZ's and comments
+ Moderators
+ Search: full-site and SubZ's
