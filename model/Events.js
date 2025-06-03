const dataEvents =[
    {
        id: 1,
        title: 'Event 1',
        description: 'Description for Event 1',
        date: '2023-10-01',
        location: 'Location 1'
    },
]

class Events {
    constructor() {
        // Initialization if needed
    }

    all() {
        return dataEvents;
    }

    save(newEvent) {
        dataEvents.push(newEvent);
    }
}

module.exports = Events;