#encoding: utf-8

class Product < ActiveRecord::Base

  include Imageable
  include Reorderable

  belongs_to :brand
  belongs_to :category
  has_many :inventory_items

  validates :brand_id, presence: true
  validates :category_id, presence: true
  validates :name, presence: true


  def to_s
    new_record? ? 'New product' : name
  end
end
