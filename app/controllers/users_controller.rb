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

  def subscribe
    current_user.subscriptions.create!(sub_id: params[:sub_id])
    redirect_to sub_url(params[:sub_id])
  end

  def unsubscribe
    current_user.subscriptions.where(sub_id: params[:sub_id]).first.destroy
    redirect_to sub_url(params[:sub_id])
  end

  def upvote
    current_user.votes.create!(
      votable_id: params[:votable_id],
      votable_type: params[:votable_type],
      value: 1
    )

    redirect_to :back
  end

  def downvote
    current_user.votes.create!(
      votable_id: params[:votable_id],
      votable_type: params[:votable_type],
      value: -1
    )

    redirect_to :back
  end

end
