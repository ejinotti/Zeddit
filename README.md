#Zeddit
A humble clone of [Reddit.](http://www.reddit.com)

###TODO
+ Add custom logo upload to subzeddit create.
+ Improve user show to interleave the user's posts and comments.
+ User Karma: post and comment
+ Other orderings for main page (*hot, rising, top, etc*)
+ Extend other orderings to SubZ's and comments
+ Moderators
+ Search: full-site and SubZ's

###Models / Schema

All have id primary key and timestamps.


|Users     |Subscriptions|Subzeddits |
|----------|-------------|-----------|
|user_name |user_id      |owner_id   |
|email     |sub_id       |name       |
|sess_token|             |title      |
|pw_digest |             |description|
|          |             |sidebar    |

|Comments |Posts    |Votes        |
|---------|---------|-------------|
|author_id|author_id|voter_id     |
|body     |title    |value (+1/-1)|
|post_id  |url      |votable_id   |
|parent_id|body     |votable_type |
|         |type     |             |
|         |sub_id   |             |
