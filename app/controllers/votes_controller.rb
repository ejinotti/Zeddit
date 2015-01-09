class VotesController < ApplicationController

  before_action :ensure_logged_in

  def upvote
    c_user = current_user
    v_id = params[:id]
    v_type = (request.path == upvote_post_path(v_id)) ? "Post" : "Comment"

    votable = eval(v_type).find(v_id)

    case c_user.get_vote_value(v_id, v_type)
    when 0
      votable.votes.create!(voter_id: c_user.id, value: 1)
    when -1
      votable.votes.where(voter_id: c_user.id).destroy_all
      votable.votes.create!(voter_id: c_user.id, value: 1)
    else
      votable.votes.where(voter_id: c_user.id).destroy_all
    end

    redirect_to :back
  end

  def downvote
    c_user = current_user
    v_id = params[:id]
    v_type = (request.path == downvote_post_path(v_id)) ? "Post" : "Comment"

    votable = eval(v_type).find(v_id)

    case c_user.get_vote_value(v_id, v_type)
    when 0
      votable.votes.create!(voter_id: c_user.id, value: -1)
    when 1
      votable.votes.where(voter_id: c_user.id).destroy_all
      votable.votes.create!(voter_id: c_user.id, value: -1)
    else
      votable.votes.where(voter_id: c_user.id).destroy_all
    end

    redirect_to :back
  end

end
