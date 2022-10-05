class AddStockToCommerces < ActiveRecord::Migration[6.1]
  def change
    add_column :commerces, :stockAvailable, :integer
    add_column :commerces, :stockRemaining, :integer
  end
end
