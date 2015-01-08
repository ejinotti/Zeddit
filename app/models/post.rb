class Post < ActiveRecord::Base

  validates :title, :sub_id, :author_id, presence: true
  validate :subzeddit_must_exist

  belongs_to(
    :author,
    class_name: 'User',
    foreign_key: :author_id,
    primary_key: :id
  )

  belongs_to :sub

  has_many :comments, dependent: :destroy

  def comments_by_parent_id
    comment_hash = Hash.new([])

    all_comments = self.comments.includes(:author)

    all_comments.each do |comment|
      comment_hash[comment.parent_id] += [comment]
    end

    comment_hash
  end

  private

  def subzeddit_must_exist
    if !Sub.find_by(id: sub_id)
      errors.add(:sub_id, ": no such Subzeddit exists")
    end
  end

end
