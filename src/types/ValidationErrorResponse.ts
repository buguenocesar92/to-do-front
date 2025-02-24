export interface ValidationErrorResponse {
  message: string
  errors: { [key: string]: string[] }
}
