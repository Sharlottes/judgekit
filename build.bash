
rm -rf dist;
tsc;

for file in package.json LICENSE README.md assets
do 
  if [ -d $file ]; then
    cp -r $file dist
  else
    cp $file dist
  fi
done