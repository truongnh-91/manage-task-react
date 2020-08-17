import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      tasks : [],
      isDisplayForm : false,
      taskEditing : null,
      filter : {
        name: '',
        status: -1
      },
      keyword : '',
      sort :{
        by: 'name',
        value: 1
      }
    }
  }

  componentDidMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      });
    }
  }

  s4(){
    return Math.floor((1+Math.random()) * 0x10000).toString().substring(1);
  }

  generateId(){
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4()
    + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4();
  }

  onToggleForm = () => {
    if(this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
          isDisplayForm : true,
          taskEditing : null
      });
    } else {
      this.setState({
          isDisplayForm : !this.state.isDisplayForm,
          taskEditing : null
      });
    }
  }

  onCloseForm = () =>{
    this.setState({
      isDisplayForm : false
    });
  }

  onShowForm = () =>{
    this.setState({
      isDisplayForm : true
    });
  }

  onSubmit = (data) => {
    var { tasks } = this.state;
      //Add
      if (data.id === "") {
        data.id = this.generateId();
        tasks.push(data);
      } else{
        //Editting
        const index = _.findIndex(tasks, (task) =>{
            return task.id === data.id;
        });
        tasks[index] = data;
      }
    this.setState({
      tasks : tasks,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var newTasks = tasks.map(task => {
        if (task.id === id) {
          task.status = !task.status
        }
        return task;
      })
      this.setState({
        tasks: newTasks
      })
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  onDelete = (id) => {
    var {tasks} = this.state;
    const index = _.findIndex(tasks, (task) =>{
      return task.id === id;
  });
    if(index !== -1) {
        tasks.splice(index, 1);
        this.setState({
            tasks : tasks
        })
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
    this.onCloseForm();
  }

  onUpdate = (id) => {
    const {tasks} = this.state;
    const index = _.findIndex(tasks, (task) => {
        return task.id === id;
    });
    const taskEditing = tasks[index];
    this.setState({
        taskEditing : taskEditing
    })
    this.onShowForm();
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter:{
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword : keyword
    });
  }

  onSort = (sort) =>{
        this.setState({
          sort:{
              by:sort.by,
              value:sort.value
          }
      });
  }

  render() {
    var { tasks, isDisplayForm, taskEditing, filter, keyword } = this.state;
    var sortBy = this.state.sort.by;
    var sortValue = this.state.sort.value;
    if(filter){
      if(filter.name){
          tasks = tasks.filter((task) =>{
              return  task.name.toLowerCase().indexOf(filter.name) !== -1;
          })
      }

      tasks = tasks.filter((task) => {
          if(filter.status === -1){
            return tasks;
          }else{
            return task.status === (filter.status ===1 ? true : false);
          }
      })
    }

    if(keyword && keyword.trim() !==''){
      tasks = tasks.filter((task) =>{
        return task.name.toLowerCase().indexOf(keyword.toLocaleLowerCase()) !== -1;
      })
    }

    if(sortBy === 'name'){
        tasks.sort((a,b) => {
          if( a.name > b.name ) return sortValue;
          else if( a.name < b.name ) return -sortValue;
          else return 0;
        })
    }
    else{
        tasks.sort((a,b) => {
          if( a.status > b.status ) return -sortValue;
          else if( a.status < b.status ) return sortValue;
          else return 0;
        })
    }

    var elmTaskForm = isDisplayForm 
                      ? <TaskForm 
                          onSubmit={ this.onSubmit } onCloseForm={ this.onCloseForm }
                          task = { taskEditing }
                        /> 
                      : '';
    return (
        <div className="container">
            <div className="text-center">
                <h1>Quản Lý Công Việc</h1>
                <hr />
            </div>
            <div className="row">
                <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                  { elmTaskForm }
                </div>
                <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                  <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={ this.onToggleForm }>
                      <span className="fa fa-plus mr-5" />Thêm Công Việc
                  </button>
                <TaskControl onSearch = { this.onSearch }
                             onSort = { this.onSort }        
                />
                <TaskList 
                      tasks = { tasks } 
                      onUpdateStatus = { this.onUpdateStatus }
                      onDelete = { this.onDelete }
                      onUpdate = { this.onUpdate }
                      onFilter = { this.onFilter }
                />
                </div>
            </div>
        </div>
    );
  }
}

export default App