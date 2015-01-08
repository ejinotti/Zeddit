class VotesController < ApplicationController

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
