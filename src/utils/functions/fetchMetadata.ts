export default async function fetchMetadata(url: string) {
  const response = await fetch(
    `https://jsonlink.io/api/extract?url=${encodeURIComponent(url)}`
  );
  if (!response.ok) {
    console.error('Error');
  }
  const metadata = await response.json();
  return metadata;
}
