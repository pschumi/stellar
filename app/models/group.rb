class Group < ApplicationRecord

  resourcify
  include Authority::Abilities
  include Trackable
  include Reorderable

  # This group purchases products at price base plus price modifier.
  enum price_base: {retail: 1, trade: 2, cost: 3}

  APPEARANCES = [
    :default, :success, :info, :warning, :danger
  ].freeze

  #---
  belongs_to :store
  has_and_belongs_to_many :users

  # Orders created by users in this group.
  has_many :user_orders, through: :users, source: :orders, class_name: 'Order'

  has_many :outgoing_order_types, class_name: 'OrderType', foreign_key: :source_id, inverse_of: :source
  has_many :incoming_order_types, class_name: 'OrderType', foreign_key: :destination_id, inverse_of: :destination

  # Customer groups are sources of order types for this group's incoming orders.
  has_many :customer_groups, class_name: 'Group', through: :incoming_order_types, source: :source

  # Group-specific prices for products.
  has_many :alternate_prices

  # Categories the group members are limited to, if any.
  has_and_belongs_to_many :categories

  # Promotions targeting this group.
  has_many :promotions

  # Reference to another group with premium features and/or better prices.
  belongs_to :premium_group, class_name: 'Group', optional: true

  has_one :letterhead, class_name: 'Page', as: :resource, dependent: :destroy

  default_scope { sorted }
  scope :at, -> (store) { where(store: store) }
  scope :not_including, -> (this) { where.not(id: this) }

  #---
  validates :name, presence: true
  validates :price_modifier, numericality: {greater_than: -100}

  #---
  def self.appearance_options
    APPEARANCES.map { |a| [human_attribute_value(:appearance, a), a, data: {appearance: a}.to_json] }
  end

  def self.price_base_options
    price_bases.keys.map { |p| [human_attribute_value(:price_base, p), p] }
  end

  #---
  def guest?
    store.default_group == self
  end

  def price_method
    "#{price_base}_price".to_sym
  end

  def ordering_allowed?
    outgoing_order_types.any?
  end

  # TODO: this could use some business logic.
  def available_inventories
    store.inventories
  end

  # Categories available to this group when creating and editing products.
  def available_categories
    limited_categories? ? categories.order(:lft) : store.categories.order(:lft)
  end

  # Category selection is limited if any are set.
  def limited_categories?
    categories.any?
  end

  def notified_users
    users.with_role(:order_notify, store)
  end

  def to_s
    name
  end
end
