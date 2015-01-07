Rails.application.routes.draw do

  root to: redirect('/subs')

  resources :users, only: [:new, :index, :create]

  resource :session, only: [:new, :create, :destroy]

  resources :subs do
    resources :posts, only: [:index, :new, :show]
  end

  resources :posts, except: [:index, :new, :show]

end
