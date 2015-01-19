json.id @user.id
json.username @user.username

json.subscriptions @user.subscriptions do |subscrip|
  json.extract! subscrip, *subscrip.attributes.keys
  json.sub_title subscrip.sub.title
end
