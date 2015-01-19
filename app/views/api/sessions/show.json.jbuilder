json.id @user.id
json.username @user.username

json.subscriptions @user.subscriptions do |subscrip|
  json.sub_id subscrip.sub_id
  json.sub_title subscrip.sub.title
end

json.votes @user.votes, :id, :value, :votable_id, :votable_type
