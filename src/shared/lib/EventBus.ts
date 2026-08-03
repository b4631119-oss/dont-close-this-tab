type EventCallback<T = any> = (payload: T) => void;

export enum AppEvent {
  SHOW_NOTIFICATION = 'SHOW_NOTIFICATION',
  USER_SELECTED = 'USER_SELECTED',
  INTRO_COMPLETED = 'INTRO_COMPLETED',
  MUTE_TOGGLED = 'MUTE_TOGGLED'
}

class EventBus {
  private listeners: Record<string, EventCallback[]> = {};

  on<T = any>(event: string, callback: EventCallback<T>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback as any);
  }

  off<T = any>(event: string, callback: EventCallback<T>): void {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback as any);
  }

  emit<T = any>(event: string, payload?: T): void {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => {
      try {
        callback(payload as T);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
  }
}

export const eventBus = new EventBus();
