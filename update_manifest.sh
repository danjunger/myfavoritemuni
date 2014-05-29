function fix-android-manifest { 
local versionCode=$(sed -n '/versionCode/s/.*versionCode[^"]*"\([0-9]*\).*/\1/p' platforms/android/assets/www/config.xml); 
sed -i '' -e 's/versionCode="[0-9]*"/versionCode="'$versionCode'"/' platforms/android/AndroidManifest.xml; 
} 