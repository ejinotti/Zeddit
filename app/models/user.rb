class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  after_initialize :ensure_session_token

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

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

end
