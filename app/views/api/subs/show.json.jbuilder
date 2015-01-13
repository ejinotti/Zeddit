json.(@sub, :title, :description)

json.posts @sub.posts do |post|
  json.extract! post, *post.attributes.keys
  json.author_name post.author.username
  json.sub_title @sub.title
  json.points post.points
end
