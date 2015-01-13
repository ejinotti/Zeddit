class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :username

  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  after_initialize :ensure_session_token

  has_many(
    :owned_subs,
    class_name: 'Sub',
    foreign_key: :owner_id,
    primary_key: :id
  )

  has_many(
    :posts,
    class_name: 'Post',
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many :subscriptions
  has_many :subzeddits, through: :subscriptions, source: :sub
  has_many :subzeddit_posts, through: :subzeddits, source: :posts

  has_many(
    :comments,
    class_name: 'Comment',
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many(
    :votes,
    class_name: 'Vote',
    foreign_key: :voter_id,
    primary_key: :id
  )

  attr_reader :password

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_creds(creds)
    user = User.find_by(username: creds[:username])
    return nil if user.nil?
    return user if user.is_password?(creds[:password])
    nil
  end

  def password=(new_pass)
    @password = new_pass
    self.password_digest = BCrypt::Password.create(new_pass)
  end

  def reset_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  def is_subbed_to?(sub_id)
    !!self.subzeddits.find_by(id: sub_id)
  end

  def get_vote_value(v_id, v_type)
    my_vote = self.votes.where(votable_id: v_id, votable_type: v_type).first
    return my_vote.value if my_vote
    0
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

end
