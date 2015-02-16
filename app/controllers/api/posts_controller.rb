class Api::PostsController < Api::ApiController

  before_action :ensure_logged_in, only: [:create]
  before_action :verify_owner, only: [:update, :destroy]

  def index
    @posts = Post.get_root_posts(current_user)
    render :index
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
    @all_comments = @post.comments_by_parent_id
    render :show
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
      render json: { message: "You do not own that Post" }, status: 401
    end
  end

end
