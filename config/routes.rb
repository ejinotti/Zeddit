Rails.application.routes.draw do

  root to: 'sessions#dummy'

  resources :users, only: [:new, :index, :create]

  resource :session, only: [:new, :create, :destroy]

end
