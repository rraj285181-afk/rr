import { FirestorePermissionError } from './errors';

type Listener = (error: FirestorePermissionError) => void;

/**
 * Custom lightweight ErrorEmitter to replace Node.js 'events' dependency.
 */
class ErrorEmitter {
  private listeners: Set<Listener> = new Set();

  emit(event: 'permission-error', error: FirestorePermissionError): void {
    if (event === 'permission-error') {
      this.listeners.forEach(listener => listener(error));
    }
  }

  on(event: 'permission-error', listener: Listener): void {
    if (event === 'permission-error') {
      this.listeners.add(listener);
    }
  }

  off(event: 'permission-error', listener: Listener): void {
    if (event === 'permission-error') {
      this.listeners.add(listener);
    }
  }

  // Support for legacy 'events' API
  removeListener(event: 'permission-error', listener: Listener): void {
    this.off(event, listener);
  }
}

export const errorEmitter = new ErrorEmitter();
