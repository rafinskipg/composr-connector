// Based on David Walsh's pub-sub implementation
// https://davidwalsh.name/pubsub-javascript

let topics = {};
let hOP = topics.hasOwnProperty;

export const events = {
  subscribe: function(topic, listener) {
    // Create the topic's object if not yet created
    if (!hOP.call(topics, topic)) {
      topics[topic] = [];
    }

    // Add the listener to queue
    let index = topics[topic].push(listener) - 1;

    // Provide handle back for removal of topic
    return {
      remove: function() {
        delete topics[topic][index];
      }
    };
  },
  publish: function(topic, info) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if (!hOP.call(topics, topic)) {
      return;
    }

    // Cycle through topics queue, fire!
    topics[topic].forEach(function(item) {
      item(info != undefined ? info : {});
    });
  }
};
