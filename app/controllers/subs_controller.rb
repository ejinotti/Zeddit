class SubsController < ApplicationController

  before_action :ensure_logged_in, except: [:index, :show]

  def index
    @subs = Sub.all
    render :index
  end

  def new
    @sub = Sub.new
    render :new
  end

  def create
    @sub = Sub.new(sub_params)
    @sub.owner_id = current_user.id

    if @sub.save
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :new
    end
  end

  def show
    @sub = Sub.find(params[:id])
    #@posts = @sub.posts
    render :show
  end

  def edit
    @sub = Sub.find(params[:id])
    render :edit
  end

  def update
    @sub = Sub.find(params[:id])

    # TODO: make this prettier
    if @sub.nil?
      flash.now[:errors] = ["Sub not found"]
      @sub = Sub.new(sub_params)
      render :edit
    elsif @sub.update(sub_params)
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      @sub = Sub.new(sub_params)
      render :edit
    end
  end

  def destroy
    @sub = Sub.find(params[:id])
    @sub.destroy!
    redirect_to subs_url
  end

  private

  def sub_params
    params.require(:sub).permit(:title, :description)
  end

end
