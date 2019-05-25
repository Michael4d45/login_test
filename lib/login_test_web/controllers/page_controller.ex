defmodule LoginTestWeb.PageController do
  use LoginTestWeb, :controller
 
 def index(conn, _params) do
    render(conn, "index.html")
 end

 def login(conn, _params) do
    render(conn, "login.html")
  end

  def register(conn, _params) do
    render(conn, "register.html")
  end
end
