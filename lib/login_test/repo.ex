defmodule LoginTest.Repo do
  use Ecto.Repo,
    otp_app: :login_test,
    adapter: Ecto.Adapters.Postgres
end
