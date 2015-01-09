class CommentsController < ApplicationController

  before_action :ensure_logged_in, only: [:new, :create]
  before_action :verify_owner, only: [:edit, :update, :destroy]

  def new
    @comment = Comment.new

    # TODO: might want to check for erroneous post_id param here.
    @comment.post_id = params[:post_id]
    @comment.parent_id = params[:parent_id]

    render :new
  end

  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save
      redirect_to sub_post_url(@comment.post.sub_id, @comment.post_id)
    else
      flash.now[:errors] = @comment.errors.full_messages
      render :new
    end
  end

  def edit
    render :edit
  end

  def update
    if @comment.update(comment_params)
      redirect_to sub_post_url(@comment.post.sub_id, @comment.post_id)
    else
      flash.now[:errors] = @comment.errors.full_messages
      @comment = Post.new(comment_params)
      render :edit
    end
  end

  def destroy
    rd_url = sub_post_url(@comment.post.sub_id, @comment.post_id)
    @comment.destroy!
    redirect_to rd_url
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :post_id, :parent_id)
  end

  def verify_owner
    @comment = Comment.find(params[:id])

    if !(current_user && current_user.id == @comment.author_id)
      flash[:errors] = ["You do not own that Comment"]
      redirect_to railsroot_url
    end
  end

end
