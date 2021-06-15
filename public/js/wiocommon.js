// Importatnt Please subscribe should be placed inside componentdidmount or useEffect
// Please do not make any chnages in this function.
// eslint-disable-next-line no-var
var wioEventBus = {
  subscribers: {},
  subscribe(subscriptionKey, listener) {
    if (!this.subscribers[subscriptionKey]) {
      this.subscribers[subscriptionKey] = [];
    }
    const index = this.subscribers[subscriptionKey].push(listener) - 1;
    return {
      unSubscribe() {
        delete this.subscribers[subscriptionKey][index];
      }
    };
  },
  publish(subscriptionKey, data) {
    if (!this.subscribers[subscriptionKey] || this.subscribers[subscriptionKey].length < 1) return;
    this.subscribers[subscriptionKey].forEach((listener) => {
      listener(data || {});
    });
  }
};
