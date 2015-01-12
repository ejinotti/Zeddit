class Api::ApiController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def login!(user)
    session[:session_token] = user.reset_token!
    @current_user = user
  end

  def logout!
    current_user.reset_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def logged_in?
    !!current_user
  end

  def current_user
    return nil if session[:session_token].nil?
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

  def ensure_logged_in
    if !logged_in?
      render json: { message: "Must be logged-in to do that" }, status: 401
    end
  end

end
