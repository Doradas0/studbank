const releaseFileDestination = "./releases.json";
const releasesFile = Bun.file(releaseFileDestination);
const releases = await releasesFile.json();
const releasesCount = releases.length;
const newRelease = {
  name: `test${releasesCount + 1}`,
  date: new Date().toISOString(),
};
const newReleases = [...releases, newRelease];
await Bun.write(releaseFileDestination, JSON.stringify(newReleases));

const dashboardAnnotations = newReleases.map((release) => {
  return {
    label: release.name,
    value: release.date,
    visible: true,
  }
});

const dashboardConfig = {
  widgets: [
    {
      type: "metric",
      x: 0,
      y: 0,
      width: 6,
      height: 6,
      properties: {
        view: "timeSeries",
        stacked: false,
        metrics: [
          [
            "AWS/Usage",
            "ResourceCount",
            "Type",
            "Resource",
            "Resource",
            "TableCount",
            "Service",
            "DynamoDB",
            "Class",
            "None"
          ]
        ],
        region: "eu-west-1",
        annotations: {
          vertical: [
            ...dashboardAnnotations
          ]
        }
      }
    }
  ]
}

await Bun.write("./dashboard.json", JSON.stringify(dashboardConfig));
