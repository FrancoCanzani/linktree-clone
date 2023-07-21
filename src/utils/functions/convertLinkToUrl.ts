export default function convertLinkToUrl(link: string): string | undefined {
  try {
    if (!/^https?:\/\//i.test(link)) {
      // If the link does not start with http:// or https://, prepend http://
      link = 'http://' + link;
    }
    const url = new URL(link);
    return url.hostname;
  } catch (error) {
    console.error(`Error parsing URL "${link}":`, error);
    return undefined;
  }
}
