class SubsController < ApplicationController

  before_action :ensure_logged_in, only: [:new, :create]
  before_action :verify_owner, only: [:edit, :update, :destroy]

  def root
    if logged_in?
      @posts = current_user.subzeddit_posts.order(created_at: :desc)
    else
      @posts = Sub.get_root_posts
    end

    render :root
  end

  def index
    @subs = Sub.all
    render :index
  end

  def new
    @sub = Sub.new
    render :new
  end

  def create
    # @sub = Sub.new(sub_params)
    # @sub.owner_id = current_user.id
    
    @sub = current_user.owned_subs.new(sub_params)

    if @sub.save
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :new
    end
  end

  def show
    @sub = Sub.find_by(id: params[:id])

    if (!@sub)
      flash[:errors] = ["Subzeddit does not exist"]
      redirect_to root_url
    end

    render :show
  end

  def edit
    render :edit
  end

  def update
    if @sub.update(sub_params)
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      @sub = Sub.new(sub_params)
      render :edit
    end
  end

  def destroy
    @sub.destroy!
    redirect_to subs_url
  end

  private

  def sub_params
    params.require(:sub).permit(:title, :description)
  end

  def verify_owner
    @sub = Sub.find_by(id: params[:id])

    if !@sub
      flash[:errors] = ["Subzeddit does not exist"]
      redirect_to root_url
    elsif !(current_user && current_user.id == @sub.owner_id)
      flash[:errors] = ["You do not own that Subzeddit"]
      redirect_to root_url
    end
  end

end
