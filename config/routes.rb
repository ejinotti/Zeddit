Rails.application.routes.draw do

  root to: 'subs#index'

  resources :users, only: [:new, :index, :create]

  resource :session, only: [:new, :create, :destroy]

  resources :subs

end
