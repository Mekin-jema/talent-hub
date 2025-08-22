import { AxiosError } from 'axios';
import { toast } from 'sonner';

// Type guard for Axios errors
export function isAxiosError<T = any>(error: unknown): error is AxiosError<T> {
  return (error as AxiosError).isAxiosError !== undefined;
}

/**
 * Centralized error handler
 * @param error - Unknown error
 * @param defaultMessage - Fallback error message
 */
export function handleError(error: unknown, defaultMessage: string = 'Something went wrong') {
  let message: string;

  if (isAxiosError(error)) {
    message = error.response?.data?.message || defaultMessage;
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = defaultMessage;
  }

  toast.error(message);
  throw new Error(message);
}
