#encoding: utf-8

class Category < ActiveRecord::Base

  resourcify
  include Authority::Abilities
  include Imageable
  include Pageable
  include FriendlyId
  friendly_id :slugger, use: [:slugged, :history]
  acts_as_nested_set scope: :store,
                     dependent: :destroy,
                     counter_cache: :children_count,
                     touch: true

  #---
  belongs_to :store
  has_and_belongs_to_many :products

  # Categories may appear at any number of portal departments.
  has_and_belongs_to_many :departments

  scope :live, -> { where(live: true) }

  #---
  validates :name, presence: true
  validates :product_scope, presence: true

  #---
  # Category is inside another category if it's the category itself,
  # or one of its descendants.
  def inside?(category)
    category == self || is_descendant_of?(category)
  end

  def self_and_maybe_descendants
    products.visible.any? ? Category.where(id: self) : self_and_descendants
  end

  def slugger
    [:name, [:name, -> { store.name }]]
  end

  def should_generate_new_friendly_id?
    name_changed? || super
  end

  def description
    name
  end

  def to_option
    self_and_ancestors.join " \u23f5 "
  end

  def to_s
    name
  end
end
