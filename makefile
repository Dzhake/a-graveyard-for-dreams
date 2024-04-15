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
	./test.sh

linecount:
	(cd src; find . -name '*.js' | xargs wc -l)

