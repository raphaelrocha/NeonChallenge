.PHONY: android build build-no-cache ios ios-device pod-install up

android:
	react-native run-android

build:
	npm install

build-no-cache:
	watchman watch-del-all && rm -rf node_modules/ && npm cache verify && npm install && npm start -- --reset-cache

ios:
	make pod-install && react-native run-ios --simulator 'iPhone 6'

ios-device:
	make pod-install && react-native run-ios --device

pod-install:
	cd ios && pod install && cd ..

up:
	react-native start