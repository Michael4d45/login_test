defmodule LoginTestWeb.RegisterPageView do
  use LoginTestWeb, :view

  def render("scripts.html", _assigns) do
    ~s{<script>require("web/static/js/register").Post.run()</script>}
    |> raw
  end
end
