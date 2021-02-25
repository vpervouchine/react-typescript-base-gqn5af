import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import * as actions from './actions';
import './style.css';

import { initialStoreState, StoreState } from './state';
import { reduce } from './reducers';

const store = createStore(reduce, initialStoreState);
const dispatch = store.dispatch;

interface Task {
  name: string;
  desc: string; // TODO make it optional
}

interface TaskListProps {
  title: string;
  tasks: Task[];
  date: Date;
}

class TaskList extends React.PureComponent<TaskListProps> {
  render() {
    const { title, tasks, date } = this.props;
    return (
      <div>
        <p>{title}</p>
        <ul>
          {tasks.map(task => (<li>{task.name}: {task.desc}</li>))}
        </ul>
        <div>Number of tasks: {tasks.length}</div>
        <div>Date: {date.toString()}</div>
      </div>
    );
  }
};

const taskList = {
  title: 'Learning Web UI Development',
  tasks: [
    {
      name: 'Typescript',
      desc: 'Learn typescript'
    }
  ]
};

interface AppProps {
  date: Date;
  count: number;
  tasks: TaskListProps;
}

class App extends React.PureComponent<AppProps> {

  private dateTimer = 0;
  private countTimer = 0;

  componentDidMount() {
    this.dateTimer = setInterval(this.updateTime.bind(this), 1000);
    this.countTimer = setInterval(this.updateCount.bind(this), 1500);
  }

  componentWillUnmount() {
    if (this.dateTimer > 0) {
      clearInterval(this.dateTimer);
      this.dateTimer = 0;
    }
    if (this.countTimer > 0) {
      clearInterval(this.countTimer);
      this.countTimer = 0;
    }
  }

  render() {
    const { tasks, date, count } = this.props;
    return (
      <div>
        <TaskList {...tasks} date={date}/>
        <p>Count: {count}</p>
      </div>
    );
  }

  private updateTime() {
    // TODO
  }

  private updateCount() {
    dispatch(actions.incrementCounter(Math.floor(Math.random() * 10)));
  }
}

const mapToStateProps = (state: StoreState) => {
  return {
    date: state.date,
    count: state.count,
    tasks: taskList
  };
};

const AppContainer = connect(mapToStateProps)(App);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
