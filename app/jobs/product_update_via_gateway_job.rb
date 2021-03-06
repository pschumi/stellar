class ProductUpdateViaGatewayJob < ApplicationJob
  queue_as :default

  # Performs a mass product update through the stock gateway
  # the given store uses. Optionally specify a start date param
  # for the products query.
  def perform(store, start_date = nil)
    gateway = store.stock_gateway_singleton
    tax_category = store.tax_categories.first
    category = store.categories.friendly.find('stock-gateway')
    t = Product.arel_table
    gateway.products(start_date).each do |item|
      next if item[:code].blank?
      product = store.products.find_by(
        t[:customer_code].eq(item[:customer_code]).or(
          t[:code].eq(item[:code])
        )
      )
      if product.nil? && item[:online]
        product = store.products.create!(
          code: item[:code],
          customer_code: item[:customer_code],
          title: item[:title],
          tax_category: tax_category,
          categories: [category]
        )
      end
      next if product.nil?
      product.update!(
        customer_code: item[:customer_code],
        available_at: item[:online] ? item[:updated_at] : nil
      )
    end
  end

  def max_attempts
    1
  end
end
