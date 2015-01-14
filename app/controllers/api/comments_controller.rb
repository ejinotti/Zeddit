class Api::CommentsController < Api::ApiController

  before_action :ensure_logged_in, only: [:create]
  before_action :verify_owner, only: [:update, :destroy]

  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save
      render json: @comment
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment.destroy!
    render json: { message: 'destroyed!' }
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :post_id, :parent_id)
  end

  def verify_owner
    @comment = Comment.find(params[:id])

    if !(current_user && current_user.id == @comment.author_id)
      render json: { message: "You do not own that Comment" }, status: 403
    end
  end

end
