export const useSessionStore = () => {
  class SessionStore {
    findSession(id) {}
    saveSession(id, session) {}
    findAllSessions() {}
  }

  class InMemorySessionStore extends SessionStore {
    sessions: any;
    constructor() {
      super();
      this.sessions = new Map();
    }
  
    findSession(id) {
      return this.sessions.get(id);
    }
  
    saveSession(id, session) {
      this.sessions.set(id, session);
    }
  
    findAllSessions() {
      return [...this.sessions.values()];
    }
  }
  
  return {
    InMemorySessionStore
  } as const
}