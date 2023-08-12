export default function extractRepositoryInfo(url: string) {
  const pattern = /https:\/\/github\.com\/([\w-]+)\/([\w-]+)/;
  const match = url.match(pattern);

  if (match) {
    const [_, repositoryOwner, repositoryName] = match;
    return {
      repositoryOwner,
      repositoryName,
    };
  } else {
    return null;
  }
}
