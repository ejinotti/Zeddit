Rails.application.routes.draw do

  root to: 'subs#root'

  resources :users, only: [:index, :show, :new, :create]

  resource :session, only: [:new, :create, :destroy]

  resources :subs do
    resources :posts, only: [:new, :show]
  end

  resources :posts, except: [:index, :new, :show] do
    resources :comments, only: [:new]
  end

  resources :comments, except: [:index, :new, :show]

  post 'subscribe/:sub_id', to: 'users#subscribe', as: :subscribe
  post 'unsubscribe/:sub_id', to: 'users#unsubscribe', as: :unsubscribe

  post 'upvote/:votable_type/:votable_id', to: 'users#upvote', as: :upvote
  post 'downvote/:votable_type/:votable_id', to: 'users#downvote', as: :downvote

end
