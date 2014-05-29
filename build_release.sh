cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore release-key.keystore platforms/android/ant-build/MyFavoriteMuni-release-unsigned.apk release_key
zipalign -v 4 platforms/android/ant-build/MyFavoriteMuni-release-unsigned.apk MyFavoriteMuni.apk
