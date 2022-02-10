export const useMessageStore = () => {
  class MessageStore {
    saveMessage(message) {}
    findMessagesForUser(userID) {}
  }
  
  class InMemoryMessageStore extends MessageStore {
    messages: any;
    constructor() {
      super();
      this.messages = [];
    }
  
    saveMessage(message) {
      this.messages.push(message);
    }
  
    findMessagesForUser(userID) {
      return this.messages.filter(
        ({ from, to }) => from === userID || to === userID
      );
    }
  }

  return {
    InMemoryMessageStore
  } as const
}