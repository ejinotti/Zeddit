json.(@sub, :title, :description)
json.subbed_count @sub.subscriptions.count

json.posts @sub.posts do |post|
  json.extract! post, *post.attributes.keys
  json.author_name post.author.username
  json.sub_title @sub.title
  json.points post.points
  json.comment_count post.comments.count
end
