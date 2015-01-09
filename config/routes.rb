Rails.application.routes.draw do

  root to: 'subs#root'

  resources :users, only: [:index, :show, :new, :create]

  resource :session, only: [:new, :create, :destroy]

  resources :subs do
    resources :posts, only: [:new, :show]
  end

  resources :posts, except: [:index, :new, :show] do
    resources :comments, only: [:new]
    # member do
    #   post 'upvote', to: 'votes#upvote'
    #   post 'downvote', to: 'votes#downvote'
    # end
  end

  resources :comments, except: [:index, :new, :show]

  post 'subscribe/:sub_id', to: 'subscriptions#create', as: :subscribe
  delete 'unsubscribe/:sub_id', to: 'subscriptions#destroy', as: :unsubscribe

  post 'upvote/:votable_type/:votable_id', to: 'votes#upvote', as: :upvote
  post 'downvote/:votable_type/:votable_id', to: 'votes#downvote', as: :downvote

end
