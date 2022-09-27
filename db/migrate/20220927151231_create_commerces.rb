class CreateCommerces < ActiveRecord::Migration[6.1]
  def change
    create_table :commerces do |t|
      t.string :product
      t.string :description
      t.integer :price
      t.string :image
      t.string :department
      t.string :color

      t.timestamps
    end
  end
end
