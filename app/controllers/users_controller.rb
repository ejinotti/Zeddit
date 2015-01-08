class UsersController < ApplicationController

  before_action :ensure_logged_in, only: [:subscribe, :unsubscribe]

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find_by(id: params[:id])

    if !@user
      flash[:errors] = ["User does not exist"]
      redirect_to root_url
    end

    render :show
  end

  def new
    @user = User.new
    render :new
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
