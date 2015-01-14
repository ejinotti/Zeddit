# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

NUM_USERS = 10
NUM_SUBS = rand(12..18)
USER_POSTS = rand(7..15)
USER_TOPCOMMS = rand(7..12)
USER_NESTCOMMS = rand(8..13)
USER_SUBZS = rand(3..8)
USER_POSTVOTES = rand(40..60)
USER_COMMVOTES = rand(90..120)


# USERS
users = []
user = User.new(username: "test")
user.password = "test"
user.save!
users << user
(NUM_USERS-1).times do
  name = Faker::Name.first_name.downcase
  user = User.new(username: name)
  user.password = name
  user.save!
  users << user
end


# SUBS
subs = []
titles = %w( Dawgs Cats Sheep Giraffes Lions Tigers Bears Snakes Frogs Baboons
  Orangutans Horses Camels Pumas Beavers Gophers Rats Mice Kangaroos Bats Fish
  Sharks Whales Crabs Lobsters Turtles
)
titles.sample(NUM_SUBS).each do |title|
  subs << Sub.create!(
    title: title,
    description: Faker::Lorem.paragraph,
    owner_id: rand(1..NUM_USERS)
  )
end


# POSTS
posts = []
titles = [
  Faker::Commerce.method(:product_name),
  Faker::Company.method(:catch_phrase),
  Faker::Lorem.method(:sentence),
  Faker::Hacker.method(:noun),
  Faker::App.method(:name)
]
users.each do |user|
  USER_POSTS.times do
    post = subs.sample.posts.create!(
      title: titles.sample.call,
      content: Faker::Lorem.sentences(2).join("  "),
      author_id: user.id
    )
    post.created_at = Faker::Time.between(2.years.ago, Time.now)
    post.save!
    posts << post
  end
end


# COMMENTS
comments = []
contents = [
  Faker::Company.method(:bs),
  Faker::Hacker.method(:say_something_smart),
  Faker::Lorem.method(:sentence),
  Faker::Address.method(:street_address),
  Faker::Name.method(:title)
]
users.each do |user|
  USER_TOPCOMMS.times do
    post = posts.sample
    comment = post.comments.create!(
      content: contents.sample.call,
      author_id: user.id,
      parent_id: nil
    )
    comment.created_at = Faker::Time.between(post.created_at, Time.now)
    comment.save!
    comments << comment
  end
end
users.each do |user|
  USER_NESTCOMMS.times do
    comment = comments.sample
    new_comment = comment.child_comments.create!(
      content: contents.sample.call,
      author_id: user.id,
      post_id: comment.post_id
    )
    new_comment.created_at = Faker::Time.between(comment.created_at, Time.now)
    new_comment.save!
    comments << new_comment
  end
end


# SUBSCRIPTIONS
users.each { |user| user.subzeddit_ids = Sub.all.ids.sample(USER_SUBZS) }


# VOTES
users.each do |user|
  posts.sample(USER_POSTVOTES).each do |post|
    post.votes.create!(
      voter_id: user.id,
      value: [-1, 1].sample
    )
  end
  comments.sample(USER_COMMVOTES).each do |comment|
    comment.votes.create!(
      voter_id: user.id,
      value: [-1, 1].sample
    )
  end
end
