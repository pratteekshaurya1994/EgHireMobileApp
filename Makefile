install:
	yarn install
	bundle install
	cd ios && pod install
s:
	npx react-native start --reset-cache
a:
	npx react-native run-android
i:
	npx react-native run-ios

open-android:
	@open -a /Applications/Android\ Studio.app ./android

open-ios:
	@open ios/vitawerks.xcworkspace
