import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { connect, Provider } from "react-redux";
import * as actions from "./actions";
import { Task } from "./state";
import "./style.css";

import { initialStoreState, StoreState } from "./state";
import { reduce } from "./reducers";

const store = createStore(reduce, initialStoreState);
const dispatch = store.dispatch;

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
          {tasks.map(task => (
            <li>
              {this.renderTask(task.name, task.desc)}
            </li>
          ))}
        </ul>
        <div>Number of tasks: {tasks.length}</div>
        <div>Date: {date.toString()}</div>
      </div>
    );
  }

  private renderTask(name: string, desc?: string) {
    let str = name;
    if (desc) {
      str = str + ': ' + desc;
    }
    return str;
  }
}

interface TaskEntryState {
  task: string | null;
  desc: string | null;
}

class TaskEntry extends React.PureComponent<{}, TaskEntryState> {
  constructor() {
    super();
    // this.onClick = this.onClick.bind(this);
    this.onTaskInput = this.onTaskInput.bind(this);
    this.onDescInput = this.onDescInput.bind(this);
    this.state = {task: null, desc: null};
  }

  render() {
    return (
      <div>
        <div>
          <label>New task:</label>
          <input type='text' onInput={this.onTaskInput} />                                                         
        </div>
        <div>
          <label>Description:</label>
          <input type='text' onInput={this.onDescInput}/>
        </div>
        <div>
          <button onClick={this.onClick}>Submit</button>
        </div>
      </div>
    );
  }

  private onClick() {
    const { task, desc } = this.state;
    console.info('Task', task, 'desc', desc);
    if (task) {
      dispatch(actions.addTask(task, desc));
    }
    this.setState({task: null, desc: null});
  }

  private onTaskInput(e: React.SyntheticEvent<HTMLInputElement>) {
    this.setState({task: e.currentTarget.value});
  }

  private onDescInput(e: React.SyntheticEvent<HTMLInputElement>) {
    this.setState({desc: e.currentTarget.value});
  }
}

interface AppProps {
  date: Date;
  count: number;
  tasks: Array<Task>;
}

class App extends React.PureComponent<AppProps> {
  private dateTimer = 0;
  private countTimer = 0;

  componentDidMount() {
    this.dateTimer = setInterval(this.updateTime.bind(this), 1000);
    // this.countTimer = setInterval(this.updateCount.bind(this), 1500);
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
        <TaskList tasks={tasks} date={date} title="TODO" />
        <TaskEntry />
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
    date: state.date || new Date(),
    count: state.count,
    tasks: state.taskList
  };
};

const AppContainer = connect(mapToStateProps)(App);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);
