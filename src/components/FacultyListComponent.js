import React,{Component} from 'react'; 
import {graphql} from 'react-apollo'
import {getFacultiesQuery} from '../queries/queries'
import FacultyDetailsComponent from './FacultyDetailsComponent';
import '../styles/FacultyList.css';

class FacultyListComponent extends Component {
    constructor(props){
      super(props);
      this.state={
        selected:null
      }
    }
    displayFaculties(){
      var data=this.props.data;
      if(data.loading){
        return (<div>Loading Faculties...</div>);
      }else{
        console.log(data.faculties);
        return data.faculties.map(faculty=>{
          return(
            <li key={faculty.id} onClick={(e)=>{this.setState({selected:faculty.id})}}>{faculty.id}</li>
          );
        });
      }
    }
    render(){
      console.log(this.props);
      return (
        <div id="faculty-list-component">                    
            <div className='row'>
              <div id="faculty-list" className='col-sm-7'>
                <h1>Faculty List</h1>
                <ul>
                  {this.displayFaculties()}
                </ul>
              </div>
              <div id="faculty-details" className='col-sm-5'>                
                <FacultyDetailsComponent facultyID={this.state.selected}/>
              </div>
            </div>            
        </div>
      );
    }
  }
  
  export default graphql(getFacultiesQuery)(FacultyListComponent);
  