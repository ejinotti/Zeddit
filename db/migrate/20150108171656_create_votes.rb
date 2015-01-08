class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :voter_id, null: false
      t.integer :value, null: false

      t.integer :votable_id, null: false
      t.string :votable_type, null: false

      t.timestamps null: false
    end

    add_index :votes, [:voter_id, :votable_id, :votable_type], unique: true
  end
end
