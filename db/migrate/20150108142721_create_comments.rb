class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text  :content, null: false
      t.integer :author_id, null: false
      t.integer :post_id, null: false
      t.integer :parent_id

      t.timestamps null: false
    end

    add_index :comments, :author_id
    add_index :comments, :post_id
    add_index :comments, :parent_id
  end
end
