export function transformURL(linkURL: string): string {
  const isValidURL = /^https?:\/\//i.test(linkURL);
  return isValidURL ? linkURL : 'http://' + linkURL;
}
