import React, { Component } from 'react';

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state={
        id : '',
        name : '',
        status : true
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
      if((nextProps && nextProps.task) &&(nextProps.task.id !== prevState.id)){
        return { 
                  id: nextProps.task.id,
                  name: nextProps.task.name,
                  status: nextProps.task.status
        };
      }
      else if(!nextProps.task) {
          if(prevState.id === ""){
          return {
            id: prevState.id,
            name: prevState.name,
            status: prevState.status
          }
        }
        else{  
          return{
            id: "",
            name: "",
            status: false
          };
        }
      }
      else{
        return null;
      }
  }
  
  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onChange =(event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if(name === 'status'){
      value = target.value === 'true'? true : false;
    }
    this.setState({
      [name] : value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCloseForm();
  }

  onClear  = () => {
    this.setState({
      name : '',
      status : false
    });
    this.onCloseForm();
  }

  render() {
    var { id, name, status } = this.state;
    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title"> { id === '' ? 'Thêm Công Việc' : 'Cập Nhật Công Việc'}
                  <span className="fa fa-times-circle text-right"
                        onClick={ this.onCloseForm }
                  ></span>
                </h3>
            </div>
            <div className="panel-body">
                <form onSubmit={ this.onSubmit }>
                  <div className="form-group">
                    <label>Tên :</label>
                    <input type="text" 
                           className="form-control" 
                           name='name'
                           value={ name }
                           onChange={ this.onChange }
                    />
                  </div>
                  <label>Trạng Thái :</label>
                  <select className="form-control" 
                          required="required"
                          name='status'
                          value={ status }
                          onChange={ this.onChange }
                  >
                      <option value={true}>Kích Hoạt</option>
                      <option value={false}>Ẩn</option>
                  </select>
                  <br />
                  <div className="text-center">
                     <button type="submit" className="btn btn-warning">
                       <span className="fa fa-plus mr-5"></span>Lưu Lại
                     </button>&nbsp;
                     <button type="button" 
                             className="btn btn-danger"
                             onClick={this.onClear}
                     >
                        <span className="fa fa-times mr-5"></span>Hủy Bỏ
                    </button>
                  </div>
                </form>
            </div>
        </div>
    );
  }
}

export default TaskForm;