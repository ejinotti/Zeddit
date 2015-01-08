Rails.application.routes.draw do

  root to: 'subs#root'

  resources :users, only: [:new, :index, :create]

  resource :session, only: [:new, :create, :destroy]

  resources :subs do
    resources :posts, only: [:index, :new, :show]
  end

  resources :posts, except: [:index, :new, :show]

  post 'subscribe/:sub_id', to: 'users#subscribe', as: :subscribe
  post 'unsubscribe/:sub_id', to: 'users#unsubscribe', as: :unsubscribe

end
