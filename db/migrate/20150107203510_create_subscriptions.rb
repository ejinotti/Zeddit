class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.integer :user_id, null: false
      t.integer :sub_id, null: false

      t.timestamps null: false
    end

    add_index :subscriptions, :user_id
    add_index :subscriptions, :sub_id
  end
end
