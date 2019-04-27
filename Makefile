PROJ = apitest
DB?=TRUE
PORT?=4000

SERVER = 134.209.55.215
PWD_ = Projects/$(PROJ)
PWD = Projects/$(PROJ)/*

USER = root
EXCLUDE = .git/ _build/ cover/ deps/ doc/ .fetch erl_crash.dump *.ez apitest-*.tar npm-debug.log assets/node_modules/ priv/static/ config/*.secret.exs *.swp
EXCLUDE_FLAGS = $(addprefix --exclude=, $(EXCLUDE))
RSYNC_OPTIONS = $(EXCLUDE_FLAGS) --delete --no-p --omit-dir-times $(DRYFLAG)


init:
ifeq ("$(DB)","TRUE")
	mix phx.new $(PROJ)
	cp Makefile $(PROJ)/
	cd $(PROJ); make install;
	cd $(PROJ); mix ecto.create
else
	mix phx.new $(PROJ) -y --no-ecto
	cp Makefile $(PROJ)/
	cd $(PROJ); make install;
endif

seed:
	mix run priv/repo/seeds.exs

db:
	mix ecto.setup

install:
	mix deps.get
	cd assets && npm install
	mix ecto.setup

serve:
	mix phx.server

#this may work
deploy:
	cd assets && webpack --mode production
	mix phx.digest
	MIX_ENV=prod PORT=4001 elixir --detached -S mix do compile, phx.server

take_:
	rsync -aivz --exclude=*~ $(RSYNC_OPTIONS) $(USER)@$(SERVER):$(PWD_) .

take:
	rsync -aivz --exclude=*~ $(RSYNC_OPTIONS) $(USER)@$(SERVER):$(PWD) .

give:
	rsync -aivz --exclude=*~ . $(RSYNC_OPTIONS) $(USER)@$(SERVER):$(PWD_)

