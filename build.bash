
rm -rf dist;
tsc;

for file in package.json LICENSE assets
do 
  if [ -d $file ]; then
    cp -r $file dist
  else
    xcopy $file dist
  fi
done