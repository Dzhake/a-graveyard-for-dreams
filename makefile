# If the first argument is "run"...
ifeq (test,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

.PHONY: compile
compile:
	./tools/compile.sh

.PHONY: pack
pack:
	./tools/pack.sh

.PHONY: dist
dist: compile pack

.PHONY: test
test:
	./test.sh $(RUN_ARGS)

linecount:
	(cd src; find . -name '*.js' | xargs wc -l)

