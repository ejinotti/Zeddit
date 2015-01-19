json.id @user.id
json.username @user.username

json.subzeddits @user.subzeddits do |sub|
  json.extract! sub, *sub.attributes.keys
end
