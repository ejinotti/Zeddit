Rails.application.routes.draw do

  root to: 'subs#root'

  resources :users, only: [:index, :show, :new, :create]

  resource :session, only: [:new, :create, :destroy]

  resources :subs do
    resources :posts, only: [:new, :show]
    member do
      post 'subscribe', to: 'subscriptions#create'
      delete 'unsubscribe', to: 'subscription#destroy'
    end
  end

  resources :posts, except: [:index, :new, :show] do
    resources :comments, only: [:new]
    member do
      post 'upvote', to: 'votes#upvote'
      post 'downvote', to: 'votes#downvote'
    end
  end

  resources :comments, except: [:index, :new, :show] do
    member do
      post 'upvote', to: 'votes#upvote'
      post 'downvote', to: 'votes#downvote'
    end
  end

end
