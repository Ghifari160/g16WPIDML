PHONY += prepare-build
prepare-build:
	mkdir -p g16WPIDML/WebContent/pako g16WPIDML/WebContent/tests g16WPIDML/WebContent/zlib-asm

g16WPIDML/%.txt: wordpress/wp-content/plugins/g16WPIDML/%.txt prepare-build
	cp $< $@

g16WPIDML/g16WPIDML.min.js: wordpress/wp-content/plugins/g16WPIDML/g16WPIDML.dev.js prepare-build
	uglifyjs $< -c -o $@
	echo "// g16WPIDML | (c) 2018 GHIFARI160, all rights reserved | https://github.com/Ghifari160/g16WPIDML/blob/master/LICENSE.md\n`cat $@`" > $@

g16WPIDML/g16WPIDML.dev.js: wordpress/wp-content/plugins/g16WPIDML/g16WPIDML.dev.js prepare-build
	cp $< $@

g16WPIDML/g16WPIDML.php: wordpress/wp-content/plugins/g16WPIDML/g16WPIDML.php prepare-build
	cp $< $@

g16WPIDML/WebContent/%.js: wordpress/wp-content/plugins/g16WPIDML/WebContent/%.js prepare-build
	cp $< $@

WEBCONTENT_FILES_PREQ = $(shell find wordpress/wp-content/plugins/g16WPIDML -type f -name "*.js")
WEBCONTENT_FILES_PREQ += $(shell find wordpress/wp-content/plugins/g16WPIDML -type f -name "*.php")
WEBCONTENT_FILES_PREQ += $(shell find wordpress/wp-content/plugins/g16WPIDML -type f -name "*.txt")
WEBCONTENT_FILES1 = ${subst wordpress/wp-content/plugins/g16WPIDML,g16WPIDML,$(WEBCONTENT_FILES_PREQ)}
WEBCONTENT_FILES = ${subst .dev.,.min.,$(WEBCONTENT_FILES1)}

g16WPIDML.zip: $(WEBCONTENT_FILES)
	zip -r -X $@ g16WPIDML
	rm -rf g16WPIDML

.PHONY: $(PHONY)
