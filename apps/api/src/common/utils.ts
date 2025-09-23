export const getMessageFromUnknownError = (error: unknown) =>
    error instanceof Error && error.message.length > 0 ? error.message : JSON.stringify(error);
