aws --profile mine s3 cp --acl public-read index.html s3://webc-pdf/
aws --profile mine s3 cp --acl public-read pdf.svg s3://webc-pdf/
aws --profile mine cloudfront create-invalidation --distribution-id E23X77OCT994XR --invalidation-batch "{ \"Paths\": { \"Quantity\": 1, \"Items\": [ \"/*\" ] }, \"CallerReference\": \"$(date +%s)\" }"
