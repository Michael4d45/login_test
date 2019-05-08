defmodule LoginTest.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :password_hash, :string
      add :is_active, :boolean, default: true, null: false

      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
