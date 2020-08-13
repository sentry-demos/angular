# Must have `sentry-cli` installed globally
# Following variable must be passed in
#  SENTRY_AUTH_TOKEN

SENTRY_ORG=testorg-az
SENTRY_PROJECT=ng-demo
VERSION=`sentry-cli releases propose-version`
PREFIX=dist






setup_release: create_release associate_commits upload_sourcemaps
#setup_release: create_release upload_sourcemaps


create_release:
	sentry-cli releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(VERSION)
	rm -f .env
	@echo "version=${VERSION}" >> .env
	#$($(VERSION) > .env )
	#sed -i -e "s/release: .*/\release: \"${VERSION}\"/g" src/environments/environment.ts
	#sed -i -e "s/release: .*/\release: \"${VERSION}\"/g" src/environments/environment.prod.ts
	


#local commits 
associate_commits:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --local $(VERSION) 

upload_sourcemaps:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files \
		$(VERSION) upload-sourcemaps --url-prefix "~/" --rewrite --validate $(PREFIX)

