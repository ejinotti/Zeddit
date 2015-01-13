json.array! @posts do |post|
  json.extract! post, *post.attributes.keys
  json.set! :author_name, post.author.username
  json.set! :sub_title, post.sub.title
  json.set! :points, post.points
end
