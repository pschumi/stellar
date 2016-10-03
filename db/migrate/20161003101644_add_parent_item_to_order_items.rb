class AddParentItemToOrderItems < ActiveRecord::Migration
  def change
    add_reference :order_items, :parent_item, index: true, after: :id
  end
end
