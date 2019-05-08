defmodule LoginTestWeb.Router do
  use LoginTestWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :users_api do
    plug CORSPlug, origin: "*"
    plug :accepts, ["json"]
  end

  scope "/", LoginTestWeb do
    pipe_through :browser
    get "/", PageController, :index
  end

  scope "/api/users", LoginTestWeb do
    pipe_through :users_api
    options "/", UserController, :options 
    resources "/", UserController, except: [:new, :edit] 
    sign_in "/sign_in", UserController, :sign_in 
  end
end
