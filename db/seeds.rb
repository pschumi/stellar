# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Role.create(name: 'site_manager')
Role.create(name: 'site_monitor')
Role.create(name: 'store_manager')
Role.create(name: 'sales_rep')
Role.create(name: 'customer')
Role.create(name: 'guest')

ImageType.create(purpose: 'presentational', name: 'Presentational')
ImageType.create(purpose: 'technical', name: 'Technical')
ImageType.create(purpose: 'document', name: 'Document', bitmap: false)

Store.create(
  contact_person_id: 2,
  erp_number: 1545,
  name: 'Tikkurila',
  theme: 'cards'
)
Category.create(store_id: 1, name: 'Color Display')
Category.create(store_id: 1, name: 'Product Placement')
Category.create(store_id: 1, name: 'Shop Event Material')
Category.create(store_id: 1, name: 'Visio')
Category.create(store_id: 1, name: 'Duett')
Category.create(store_id: 1, name: 'Tinting Area')

User.create(
  store_id: 1,
  name: 'Sami Rosenblad',
  email: 'rosenblad@gmail.com',
  password: 'rush2112',
  roles: [Role.first],
)
User.create(
  store_id: 1,
  name: 'Mikko Kaukojärvi',
  email: 'mikko.kaukojarvi@tjt-kaluste.fi',
  password: 'powerrangers',
  roles: [Role.first],
)

Store.create(
  contact_person_id: 2,
  erp_number: 110007,
  name: 'Intersport Finland',
  theme: 'default'
)

Category.create(store_id: 2, name: 'Sokkelit')
Category.create(store_id: 2, name: 'Korit')
Category.create(store_id: 2, name: 'Modifiointiosat')
Category.create(store_id: 2, name: 'Keskilattiakalusteet')
Category.create(store_id: 2, name: 'Palvelupisteet')
Category.create(store_id: 2, name: 'Jalkine')
Category.create(store_id: 2, name: 'Sovituskopit')
Category.create(store_id: 2, name: 'Kassat')
Category.create(store_id: 2, name: 'Paneeliseinä')
Category.create(store_id: 2, name: 'Muut kalusteet')

Inventory.create(purpose: 'manufacturing', name: 'Manufacturing')
Inventory.create(purpose: 'shipping', name: 'Shipping')

OrderType.create(
  inventory_id: 1,
  adjustment_multiplier: 1,
  name: 'Manufacturing'
)
OrderType.create(
  inventory_id: 2,
  adjustment_multiplier: -1,
  name: 'Shipping'
)
