export default function validateUrl(url: string): boolean {
  const urlRegex =
    /^(ftp|http|https):\/\/[^ "]+(\.[a-zA-Z]{2,})+(\.[a-zA-Z]{2,})?(\/[^ "]+)*$/;
  return urlRegex.test(url);
}
