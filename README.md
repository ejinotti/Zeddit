#Zeddit
A humble clone of [Reddit.](http://www.reddit.com)

###Minimum Features *(M.V.P.)*

Initial objectives, in intended order of completion..

1. Users / Auth
2. Sub-Zeddits
3. Posts
4. Comments with nesting
5. Users subscribing to SubZ's
6. Main page sub/post mix by creation date (aka *new*)
7. User profile pages with user image upload
8. Up/Down-voting of posts and comments
9. User friend'ing

###Additional Features

Some other things that'd be nice to have..
+ Other orderings for main page (*hot, rising, top, etc*)
+ Extend other orderings to SubZ's and comments
+ User Karma: post and comment
+ User-to-user direct messaging
+ Moderators
+ Search: full-site and SubZ's

###Models / Schema

All have id primary key and timestamps.


|Users     |  |Subscriptions|  |Subzeddits |
|----------|  |-------------|  |-----------|
|user_name |  |user_id      |  |owner_id   |
|email     |  |sub_id       |  |name       |
|sess_token|  |             |  |title      |
|pw_digest |  |             |  |description|
|          |  |             |  |sidebar    |

|Comments |  |Posts    |  |Votes        |
|---------|  |---------|  |-------------|
|author_id|  |author_id|  |voter_id     |
|body     |  |title    |  |value (+1/-1)|
|post_id  |  |url      |  |votable_id   |
|parent_id|  |body     |  |votable_type |
|         |  |type     |  |             |
|         |  |sub_id   |  |             |
