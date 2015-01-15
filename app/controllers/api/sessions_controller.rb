class Api::SessionsController < Api::ApiController

  def show
    @user = current_user
    if @user
      render json: { id: @user.id, username: @user.username }
    else
      render json: { message: "No current user." }
    end
  end

  def create
    @user = User.find_by_creds(user_params)

    if @user
      login!(@user)
      render json: { id: @user.id, username: @user.username }
    else
      render json: { errors: ["Invalid username and/or password"] }, status: 401
    end
  end

  def destroy
    logout!
    render json: { message: "logged-out!" }
  end

end
