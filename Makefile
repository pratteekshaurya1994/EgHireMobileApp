install:
	yarn install
	bundle install
	cd ios && pod install
start:
	npx react-native start --reset-cache
andr:
	npx react-native run-android
ios:
	npx react-native run-ios

open-android:
	@open -a /Applications/Android\ Studio.app ./android

open-ios:
	@open ios/vitawerks.xcworkspace
