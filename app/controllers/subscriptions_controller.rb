class SubscriptionsController < ApplicationController

  def create
    current_user.subscriptions.create!(sub_id: params[:sub_id])
    redirect_to :back
  end

  def destroy
    current_user.subscriptions.where(sub_id: params[:sub_id]).first.destroy
    redirect_to :back
  end

end
