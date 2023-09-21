echo "put dashboards v1"

echo "creating/updating test dashboard"
aws cloudwatch put-dashboard --profile main \
  --dashboard-name "test-cli-1" \
  --dashboard-body file://dashboard.json
