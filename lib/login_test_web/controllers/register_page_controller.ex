defmodule LoginTestWeb.RegisterPageController do
  use LoginTestWeb, :controller
  def index(conn, _params) do
    render(conn, "index.html")
  end
end
