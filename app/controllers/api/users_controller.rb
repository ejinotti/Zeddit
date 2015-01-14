class Api::UsersController < Api::ApiController

  def show
    @user = User.friendly.find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  def current
    @user = current_user
    if @user
      render json: @user
    else
      render json: { message: "No current user." }
    end
  end

end
