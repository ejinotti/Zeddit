class Api::SubscriptionsController < Api::ApiController

  before_action :ensure_logged_in

  def create
    @subscription = current_user.subscriptions.create!(sub_id: params[:sub_id])
    render json: @subscription
  end

  def destroy
    @subscription = Subscription.find(params[:id])
    @subscription.destroy!
    render json: { message: 'destroyed!' }
  end

end
