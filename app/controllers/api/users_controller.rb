class Api::UsersController < Api::ApiController

  # TODO fix excessive queries!
  def show
    @user = User.friendly.find(params[:id])
    @user = User.where(id: @user.id).includes(posts: [:sub, :votes, :comments]).first
    render :show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render json: { id: @user.id, username: @user.username }
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

end
