export const maskNumber = (number: string) => {
  return number
    .replace(/(\d{2})(?=\d{1})/g, '$1-') // hyphen after every 2 chars
    .replace(/-+/g, '-') // consecutive hyphens replaced with a single one
    .replace(/-$/, '') // remove end hyphen
    .replace(/[^\d-]/g, ''); // remove non-digits and non-hyphens
}
