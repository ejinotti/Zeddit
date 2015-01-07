class Sub < ActiveRecord::Base

  validates :title, :description, :owner_id, presence: true

  belongs_to(
    :owner,
    class_name: 'User',
    foreign_key: :owner_id,
    primary_key: :id
  )

end
