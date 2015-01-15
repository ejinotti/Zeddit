Rails.application.routes.draw do

  root to: 'root#root'

  resources :users, only: [:index, :show, :new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :subs, except: [:new, :edit]
    resources :posts, except: [:new, :edit] do
      member do
        post 'upvote', to: 'votes#upvote'
        post 'downvote', to: 'votes#downvote'
      end
    end
    resources :comments, except: [:new, :edit] do
      member do
        post 'upvote', to: 'votes#upvote'
        post 'downvote', to: 'votes#downvote'
      end
    end
    resources :subscriptions, only: [:create, :destroy]
    resources :users, only: [:index, :show, :create]
    resource :session, only: [:show, :create, :destroy]
  end

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

  get '/railsroot', to: 'subs#root'

end
