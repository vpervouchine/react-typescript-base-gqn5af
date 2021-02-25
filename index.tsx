import React from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

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

const props = {
  taskList: {
    title: 'Learning Web UI Development',
    tasks: [
      {
        name: 'Typescript',
        desc: 'Learn typescript'
      }
    ]
  }
};

interface AppState {
  date: Date;
  count: number;
}

class App extends React.PureComponent<{}, AppState> {

  private dateTimer = 0;
  private counterTimer = 0;

  constructor(props: {}) {
    super(props);
    this.state = { date: new Date(), count: 0 };
  }

  componentDidMount() {
    this.updateTime();
    this.dateTimer = setInterval(this.updateTime.bind(this), 1000);
    // this.countTimer = setInterval(this.updateCount.bind(this), 10);
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
    return (
      <div>
        <TaskList {...props.taskList} date={this.state.date}/>
        <p>Count: {this.state.count}</p>
      </div>
    );
  }

  private updateTime() {
    this.setState({date: new Date()});
  }

  private updateCount() {
    this.setState({count: this.state.count + 1});
  }
}

render(<App />, document.getElementById('root'));
