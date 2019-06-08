defmodule LoginTestWeb.LoginPageView do
  use LoginTestWeb, :view

  def render("scripts.html", _assigns) do
    ~s{<script src="/js/login.js"></script>}
    |> raw
  end
end
