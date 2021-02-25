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
}

class App extends React.PureComponent<{}, AppState> {

  private dateTimer = 0;

  constructor(props: {}) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.updateTime();
  }

  componentWillUnmount() {
    if (this.dateTimer > 0) {
      clearTimeout(this.dateTimer);
      this.dateTimer = 0;
    }
  }

  render() {
    return (
      <div>
        <TaskList {...props.taskList} date={this.state.date}/>
      </div>
    );
  }

  private updateTime() {
    this.dateTimer = setTimeout(this.updateTime.bind(this), 1000);
    this.setState({date: new Date()});
  }
}

render(<App />, document.getElementById('root'));
