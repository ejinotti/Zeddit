class Sub < ActiveRecord::Base

  validates :title, :description, :owner_id, presence: true
  validates :title, uniqueness: true

  belongs_to(
    :owner,
    class_name: 'User',
    foreign_key: :owner_id,
    primary_key: :id
  )

  has_many :posts
  has_many :subscriptions
  has_many :subbed_users, through: :subscriptions, source: :user

  def self.get_root_posts
    subs = Sub.joins(:posts).group('subs.id')
              .order('COUNT(posts.id) DESC').limit(5)
    posts = []
    subs.each { |sub| posts += sub.posts }
    posts.sort { |x,y| y.created_at <=> x.created_at }
  end

end
