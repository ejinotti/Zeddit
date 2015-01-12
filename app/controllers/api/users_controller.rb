class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user
    else
      render json: { message: @user.errors.full_messages }, status: 422
    end
  end

  def current
    @user = current_user
    if @user
      render json: @user
    else
      render json: { message: "Logged-out!" }
    end
  end

end
