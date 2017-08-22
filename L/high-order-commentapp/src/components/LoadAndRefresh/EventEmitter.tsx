interface Handle {
    (...args: any[]): any;
}
class EventEmitter {
    public events: {};
    constructor () {
        this.events = {};
    }
    on (type: string, handle: Handle) {
        const handles = this.events[type] || [];
        handles.push(handle);
        this.events[type] = handles;
    }
    emit (type: string, ...args: any[]) {
        let handles: Handle[] | null;
        handles = this.events[type];
        if (handles) {
            handles.forEach(handle => {
                handle(...args);
            });
        }
    }
    off (type: string, handle: Handle) {
        let handles: Handle[] | null;
        handles = this.events[type];
        if (handles) {
            let index = handles.indexOf(handle);
            if (index > -1) {
                handles.splice(index, -1);
            }
        }
    }
}

const emitter = new EventEmitter();
const sayHi = (name: string) => console.log(`Hello ${name}`);
const sayHi2 = (name: string) => console.log(`Good night, ${name}`);

emitter.on('hi', sayHi);
emitter.on('hi', sayHi2);
emitter.emit('hi', 'ScriptOJ');

emitter.off('hi', sayHi);
emitter.emit('hi', 'ScriptOJ');

const emitter2 = new EventEmitter();
emitter2.on('hi', (name: string, age: number) => {
  console.log(`I am ${name}, and I am ${age} years old`);
});
emitter2.on('hi', () => {
    console.log('hiiiiiiiiiiiii');
});
emitter2.emit('hi', 'Jerry', 12);