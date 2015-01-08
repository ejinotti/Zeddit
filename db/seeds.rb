# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

NUM_USERS = 50

NUM_USERS.times do
  name = Faker::Name.first_name
  user = User.new(username: name)
  user.password = name
  user.save
end

subs = %w( Dawgs Cats Sheep Giraffes Lions Tigers Bears Apples Oranges News
  Sports Art Walking Running
)

subs.each do |sub|
  Sub.create(
    title: sub,
    description: Faker::Lorem.paragraph,
    owner_id: rand(1..NUM_USERS)
  )
end
