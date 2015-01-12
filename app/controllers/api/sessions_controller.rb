class Api::SessionsController < Api::ApiController

  def create
    @user = User.find_by_creds(user_params)

    if @user
      login!(@user)
      render json: @user
    else
      render json: { message: "Invalid username and/or password" }, status: 401
    end
  end

  def destroy
    logout!
    render json: { message: "logged-out!" }
  end

end
