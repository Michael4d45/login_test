defmodule LoginTestWeb.PageControllerTest do
  use LoginTestWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Login"
  end
end
