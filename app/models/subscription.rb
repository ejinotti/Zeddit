class Subscription < ActiveRecord::Base

  validates :user_id, :sub_id, presence: true

  belongs_to :user
  belongs_to :sub
  
end
