json.array! @posts do |post|
  json.extract! post, *post.attributes.keys
  json.author_name post.author.username
  json.sub_title post.sub.title
  json.points post.points
  json.comment_count post.comments.count
end
