export const dateTime = {
  getLocaleDate: (locale: string = 'default', options?: Intl.DateTimeFormatOptions) =>
    new Date().toLocaleDateString(locale, options),
  getLocaleTime: (locale: string = 'default', options?: Intl.DateTimeFormatOptions) =>
    new Date().toLocaleTimeString(locale, options),
  now: () => Date.now(),
  toISOString: () => new Date().toISOString(),
  format: (date: Date, locale: string = 'default', options?: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, options).format(date),
}
