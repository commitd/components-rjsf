export interface Option {
  label: string
  value: string
}

export function isOptions(enumOptions: unknown): enumOptions is Option[] {
  return Array.isArray(enumOptions)
}
