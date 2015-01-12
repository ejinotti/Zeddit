class Api::SubsController < Api::ApiController

  # before_action :ensure_logged_in, only: [:new, :create]
  before_action :verify_owner, only: [:update, :destroy]

  def index
    @subs = Sub.all
    render json: @subs
  end

  def create
    @sub = current_user.owned_subs.new(sub_params)

    if @sub.save
      render json: @sub
    else
      render json: @sub.errors.full_messages, status: 422
    end
  end

  def show
    @sub = Sub.find(params[:id])
    render json: @sub
  end

  def update
    if @sub.update(sub_params)
      render json: @sub
    else
      render json: @sub.errors.full_messages, status: 422
    end
  end

  def destroy
    @sub.destroy!
    render json: { message: 'destroyed!' }
  end

  private

  def sub_params
    params.require(:sub).permit(:title, :description)
  end

  def verify_owner
    @sub = Sub.find(params[:id])

    if !(current_user && current_user.id == @sub.owner_id)
      render json: { message: "You do not own that Subzeddit" }, status: 401
    end
  end

end
