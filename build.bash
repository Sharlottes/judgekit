
rm -rf dist;
tsc;

for file in package.json LICENSE assets
do 
  if [ -d $file ]; then
    cp -r $file dist
  else
    cp $file dist
  fi
done