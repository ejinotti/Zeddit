class Vote < ActiveRecord::Base

  validates :voter_id, :value, :votable_id, :votable_type, presence: true
  validates :value, inclusion: { in: [-1, 1] }
  validates :voter_id, uniqueness: { scope: [:votable_id, :votable_type] }
  validates :votable_type, inclusion: { in: ["Post", "Comment"] }

  belongs_to :votable, polymorphic: true
  belongs_to(
    :voter,
    class_name: 'User',
    foreign_key: :voter_id,
    primary_key: :id
  )

end
