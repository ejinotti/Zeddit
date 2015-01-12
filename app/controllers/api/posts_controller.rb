class Api::PostsController < ApplicationController

  # before_action :ensure_logged_in, only: [:new, :create]
  before_action :verify_owner, only: [:update, :destroy]

  # TODO: change to get posts for root display
  def index
    @posts = Post.all
    render json: @posts
  end

  def create
    @post = current_user.posts.new(post_params)

    if @post.save
      render json: @post
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def show
    @post = Post.find(params[:id])
    # @all_comments = @post.comments_by_parent_id
    render json: @post
  end

  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def destroy
    @post.destroy!
    render json: { message: 'destroyed!' }
  end

  private

  def post_params
    params.require(:post).permit(:title, :url, :content, :sub_id)
  end

  def verify_owner
    @post = Post.find(params[:id])

    if !(current_user && current_user.id == @post.author_id)
      render json: { message: "You do not own that Post" }, status: 403
    end
  end

end
