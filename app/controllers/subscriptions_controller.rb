class SubscriptionsController < ApplicationController

  before_action :ensure_logged_in

  def create
    current_user.subscriptions.create!(sub_id: params[:id])
    redirect_to :back
  end

  def destroy
    current_user.subscriptions.where(sub_id: params[:id]).first.destroy
    redirect_to :back
  end

end
