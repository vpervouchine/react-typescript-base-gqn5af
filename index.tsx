import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

interface Task {
  name: string;
  desc: string;
}

interface TaskListProps {
  title: string;
  tasks: Task[];
}

class TaskList extends PureComponent<TaskListProps> {
  render() {
    const { title, tasks } = this.props;
    return (
      <div>
        <p>{title}</p>
        <ul>
          {tasks.map(task => (<li>{task.name}: {task.desc}</li>))}
        </ul>
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

class App extends PureComponent<{}> {

  render() {
    return (
      <div>
        <TaskList {...props.taskList} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
