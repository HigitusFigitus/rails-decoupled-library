class AddReadCountToBooks < ActiveRecord::Migration
  def change
    add_column :books, :read_count, :integer, default: 0
  end
end
