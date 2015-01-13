json.(@user, :username)

json.posts @user.posts do |post|
  json.extract! post, *post.attributes.keys
  json.set! :author_name, @user.username
  json.set! :sub_title, post.sub.title
  json.set! :points, post.points
end
