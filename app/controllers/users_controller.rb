class UsersController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def index
    @users = User.all
    render :index
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

end
