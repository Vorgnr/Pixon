
# Build dist
npm run build

# Deploy to AWS s3
aws --region=$REGION s3 sync dist s3://${S3_WEB_APP} --delete --exclude "*.DS_Store*" --exclude index.html
aws --region=$REGION s3 cp dist/index.html s3://${S3_WEB_APP}/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,must-revalidate --content-type text/html