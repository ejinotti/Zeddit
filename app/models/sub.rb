# aka Subzeddit

class Sub < ActiveRecord::Base

  validates :title, :description, :owner_id, presence: true
  validates :title, uniqueness: true

  belongs_to(
    :owner,
    class_name: 'User',
    foreign_key: :owner_id,
    primary_key: :id
  )

  has_many :posts, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_many :subbed_users, through: :subscriptions, source: :user

end
