class Api::SubscriptionsController < Api::ApiController

  before_action :ensure_logged_in

  def create
    @subscription = current_user.subscriptions.create!(sub_id: params[:id])
    render json: @subscription
  end

  def destroy
    current_user.subscriptions.where(sub_id: params[:id]).first.destroy
    render json: { message: 'destroyed!' }
  end

end
