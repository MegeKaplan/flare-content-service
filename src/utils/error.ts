export const generateErrorResponse = (error: Error) => {
  return {
    error: 'Internal Server Error',
    message: error instanceof Error ? error.message : 'Unknown Error',
  }
}