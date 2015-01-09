class PostsController < ApplicationController

  before_action :ensure_logged_in, only: [:new, :create]
  before_action :verify_owner, only: [:edit, :update, :destroy]

  def new
    @post = Post.new

    # TODO: might want to check for erroneous sub_id param here.
    @post.sub_id = params[:sub_id]
    render :new
  end

  def create
    @post = current_user.posts.new(post_params)

    if @post.save
      redirect_to sub_post_url(@post.sub_id, @post.id)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
    end
  end

  def show
    @post = Post.find(params[:id])
    @all_comments = @post.comments_by_parent_id
    render :show
  end

  def edit
    render :edit
  end

  def update
    if @post.update(post_params)
      redirect_to sub_post_url(@post.sub_id, @post.id)
    else
      flash.now[:errors] = @post.errors.full_messages
      @post = Post.new(post_params)
      render :edit
    end
  end

  def destroy
    rd_url = sub_url(@post.sub_id)
    @post.destroy!
    redirect_to rd_url
  end

  private

  def post_params
    params.require(:post).permit(:title, :url, :content, :sub_id)
  end

  def verify_owner
    @post = Post.find(params[:id])

    if !(current_user && current_user.id == @post.author_id)
      flash[:errors] = ["You do not own that Post"]
      redirect_to railsroot_url
    end
  end

end
