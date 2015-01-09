class VotesController < ApplicationController

  before_action :ensure_logged_in

  def upvote
    c_user = current_user
    v_id = params[:id]
    v_type = (request.path == upvote_post_path(v_id)) ? "Post" : "Comment"

    case c_user.get_vote_value(v_id, v_type)
    when 0
      c_user.votes.create!(
        votable_id: v_id,
        votable_type: v_type,
        value: 1
      )
    when -1
      c_user.votes.where(votable_id: v_id, votable_type: v_type).destroy_all
      c_user.votes.create!(
        votable_id: v_id,
        votable_type: v_type,
        value: 1
      )
    else
      c_user.votes.where(votable_id: v_id, votable_type: v_type).destroy_all
    end

    redirect_to :back
  end

  def downvote
    c_user = current_user
    v_id = params[:id]
    v_type = (request.path == downvote_post_path(v_id)) ? "Post" : "Comment"

    case c_user.get_vote_value(v_id, v_type)
    when 0
      c_user.votes.create!(
        votable_id: v_id,
        votable_type: v_type,
        value: -1
      )
    when 1
      c_user.votes.where(votable_id: v_id, votable_type: v_type).destroy_all
      c_user.votes.create!(
        votable_id: v_id,
        votable_type: v_type,
        value: -1
      )
    else
      c_user.votes.where(votable_id: v_id, votable_type: v_type).destroy_all
    end

    redirect_to :back
  end

end
