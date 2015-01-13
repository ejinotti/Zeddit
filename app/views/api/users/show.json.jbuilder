json.(@user, :username)

json.posts @user.posts do |post|
  json.extract! post, *post.attributes.keys
  json.author_name @user.username
  json.sub_title post.sub.title
  json.points post.points
end
