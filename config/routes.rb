Rails.application.routes.draw do

  devise_for :users

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'store#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  get '/category/:category_id'      => 'store#show_category', as: :show_category
  get '/product/:product_id'        => 'store#show_product', as: :show_product
  get '/cart'                       => 'store#show_cart', as: :show_cart
  post '/product/:product_id/order' => 'store#order_product', as: :order_product

  resources :orders do
    resources :order_items, shallow: true
  end

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  namespace :admin do
    resources :brands do
      resources :images, shallow: true
    end
    resources :categories do
      resources :images, shallow: true
      post :reorder, on: :collection
    end
    resources :products do
      resources :images, shallow: true
      post :reorder, on: :collection
    end
    resources :orders

    post '/images/reorder' => 'images#reorder', as: :reorder_images
  end


  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
