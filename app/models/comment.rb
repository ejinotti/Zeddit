class Comment < ActiveRecord::Base

  validates :content, :author_id, :post_id, presence: true

  belongs_to :post

  belongs_to(
    :author,
    class_name: 'User',
    foreign_key: :author_id,
    primary_key: :id
  )

  belongs_to(
    :parent,
    class_name: 'Comment',
    foreign_key: :parent_id,
    primary_key: :id
  )

  has_many(
    :child_comments,
    class_name: 'Comment',
    foreign_key: :parent_id,
    primary_key: :id,
    dependent: :destroy
  )

  has_many :votes, as: :votable, dependent: :destroy

  # assume votes are pre-loaded and use inject to sum w/out query
  def points
    self.votes.inject(0) { |points, vote| points + vote.value }
  end

end
