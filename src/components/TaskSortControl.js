import React, { Component } from 'react';

class TaskSortControl extends Component {
    constructor(props) {
        super(props);
        this.state= {
            sort:{
                by: 'name',
                value: 1
            }
        }
    }
    
    onClick = async(sortBy,sortValue) => {
        await this.setState({
            sort:{
                by:sortBy,
                value:sortValue
            }
        });
        this.props.onSort(this.state.sort);
    }

  render() {
    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sắp Xếp <span className="far fa-caret-square-down ml-5"/>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li onClick ={ () => this.onClick('name', 1) }>
                        <a role="button">
                            <span>
                                <i className="fas fa-sort-alpha-down pr-5"/>
                                Tên A-Z
                            </span>
                            <i className={(this.state.sort.by==='name' && this.state.sort.value === 1)?'fas fa-check ml-5':''}/>
                        </a>
                    </li>
                    <li onClick ={ () => this.onClick('name', -1) }>
                        <a  role="button">
                            <span>
                                <i className="fas fa-sort-alpha-up-alt pr-5"/>
                                Tên Z-A
                            </span>
                            <i className={(this.state.sort.by==='name' && this.state.sort.value === -1)?'fas fa-check ml-5':''}/>
                        </a>
                    </li>
                    <li role="separator" className="divider" />
                    <li onClick ={ () => this.onClick('status', 1) }>
                        <a role="button"> Trạng Thái Kích Hoạt
                            <i className={(this.state.sort.by==='status' && this.state.sort.value === 1)?'fas fa-check ml-5':''}/>
                        </a>
                    </li>
                    <li onClick ={ () => this.onClick('status', -1) }>
                        <a role="button"> Trạng Thái Ẩn
                            <i className={(this.state.sort.by==='status' && this.state.sort.value === -1)?'fas fa-check ml-5':''}/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
  }
}

export default TaskSortControl;