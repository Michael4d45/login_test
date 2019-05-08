defmodule LoginTest.Auth.User do
  use Ecto.Schema 
  alias LoginTest.Repo
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  schema "users" do
    field :email, :string
    field :is_active, :boolean, default: true
    field :password_hash, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :is_active, :password])
    |> validate_required([:email, :is_active, :password])
    |> unique_constraint(:email)
    |> put_password_hash()
  end 


  defp put_password_hash(
      %Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset
      )  do  
    change(changeset, password_hash: Bcrypt.hash_pwd_salt(password))
  end

  defp put_password_hash(changeset) do
    changeset
  end 

  def authenticate_user(email, password) do 
    query = from(u in "users", where: u.email == ^email)
    query |> Repo.one() |> verify_password(password)
  end

  defp verify_password(nil, _) do 

    Bcrypt.no_user_verify()
    {:error, "wrong email"}
  end 

  defp verify_password(user, password) do 
    if Bcrypt.verify_pass(password, user.password_hash) do
      {:ok, user}
    else 
      {:error, "wrong password"}
    end
  end 

end
