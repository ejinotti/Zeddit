class Api::VotesController < Api::ApiController

  before_action :ensure_logged_in, only: [:create]
  before_action :verify_owner, only: [:destroy]

  def create
    @vote = current_user.votes.new(vote_params)

    if @vote.save
      render json: @vote
    else
      render json: @vote.errors.full_messages, status: 422
    end
  end

  def destroy
    @vote.destroy!
    render json: { message: 'destroyed!' }
  end

  private

  def vote_params
    params.require(:vote).permit(:value, :votable_id, :votable_type)
  end

  def verify_owner
    @vote = Vote.find(params[:id])

    if !(current_user && current_user.id == @vote.voter_id)
      render json: { message: "You do not own that Vote" }, status: 401
    end
  end

end
