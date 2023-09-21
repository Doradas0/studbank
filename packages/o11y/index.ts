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
