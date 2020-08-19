# Must have `sentry-cli` installed globally
# Following variable must be passed in
#  SENTRY_AUTH_TOKEN

SENTRY_ORG=testorg-az
SENTRY_PROJECT=ng-demo
PREFIX=dist
SENTRY_CLI=./node_modules/.bin/sentry-cli
VERSION=`$(SENTRY_CLI) releases propose-version`

setup_release: create_release associate_commits upload_sourcemaps

create_release:
	$(SENTRY_CLI) releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(VERSION)

associate_commits:
	-$(SENTRY_CLI) releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --local $(VERSION) 

upload_sourcemaps:
	$(SENTRY_CLI) releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files \
		$(VERSION) upload-sourcemaps --url-prefix "~/" --rewrite --validate $(PREFIX)

reference_release:
	sed -i -e "s/release: .*/\release: \"${VERSION}\"/g" src/app/app.module.ts
