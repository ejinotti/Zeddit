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

  def subzeddit_must_exist
    if !Sub.find_by(id: sub_id)
      errors.add(:sub_id, ": no such Subzeddit exists")
    end
  end

end
