#encoding: utf-8

class OrdersController < ApplicationController

  # This controller is aware of unauthenticated guests.
  def current_user
    super || guest_user
  end

  def current_group
    delegate_group || super
  end

  # Unauthenticated guests may browse their orders.
  before_action :authenticate_user_or_skip!
  authority_actions duplicate: 'read'

  before_action :set_header_and_footer
  before_action :set_categories, only: [:index, :show, :edit]
  before_action :set_order, only: [:show, :edit, :update, :destroy, :duplicate]

  # GET /orders
  def index
    @query = saved_search_query('order', 'order_search')
    @search = OrderSearch.new(search_params)
    results = @search.results
    @orders = results.page(params[:page])
    @timeline_orders = results.has_shipping.topical
  end

  # GET /orders/1
  # GET /orders/1.json
  def show
    authorize_action_for @order, at: current_store
  end

  # GET /orders/1/edit
  def edit
    authorize_action_for @order, at: current_store
  end

  # PATCH/PUT /orders/1
  # The checkout process calls this via AJAX any time the order status changes.
  # Completes an order if it's ready for completion. Responses are in JSON.
  # Returns an error if the order itself does not validate, or it has become
  # uncheckoutable until completed.
  # HTML responses are sent when the user edits her own completed orders.
  def update
    authorize_action_for @order, at: current_store

    respond_to do |format|
      if @order.update(order_params) && (@order.checkoutable?(current_inventory) || @order.complete?)
        @order.complete! if @order.should_complete?

        format.json { render json: @order }
        format.html { redirect_to order_path(@order), notice: t('.notice', order: @order) }
      else
        format.json { render json: @order.errors, status: :unprocessable_entity }
        format.html { render :edit }
      end
    end
  end

  # DELETE /orders/1
  def destroy
    authorize_action_for @order, at: current_store

    @order.update(cancelled_at: Time.current)
    @order.email(:cancellation, @order.customer_string).deliver_later

    respond_to do |format|
      format.html { redirect_to orders_path,
        notice: t('.notice', order: @order) }
    end
  end

  # GET /orders/1/duplicate
  def duplicate
    authorize_action_for @order, at: current_store

    @order.copy_items_to(shopping_cart)
    shopping_cart.recalculate!

    redirect_to cart_path, notice: t('.notice', order: @order)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = current_user.orders.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def order_params
      params.require(:order).permit(
        :order_type_id, :completed_at, :shipping_at, :installation_at,
        :vat_number, :your_reference, :our_reference, :message,
        :customer_name, :customer_email, :customer_phone,
        :company_name, :contact_person, :contact_email, :contact_phone,
        :has_billing_address,
        :billing_address, :billing_postalcode,
        :billing_city, :billing_country_code,
        :shipping_address, :shipping_postalcode,
        :shipping_city, :shipping_country_code,
        :notes
      )
    end

    # The search is limited to the current user's personal history.
    def search_params
      @query.merge(user_id: current_user.id)
    end
end
