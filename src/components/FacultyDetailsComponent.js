import React,{Component} from 'react'
import {graphql} from 'react-apollo'
import {getFacultyQuery} from '../queries/queries'
import '../styles/facultyDetails.css';

class FacultyDetailsComponent extends Component{
    displayFacultyDetails(){
        const {faculty}=this.props.data;
        console.log(faculty);
        if(faculty){
            return(
                <div>
                    <h2>ID: {faculty.id}</h2>
                    <p>Name : {faculty.first_name} {faculty.last_name}</p>
                    <p>Email : {faculty.email_address}</p>
                    <p>Mobile Number : {faculty.mobile_number}</p>
                    <p>Domain Preferences</p>
                    <ul>
                        {
                            faculty.domain_mappings.map(item=>{
                                return (
                                    <li key={item.preference_num}>
                                        {item.preference_num} {item.domain.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            )
        }else{
            return <div>No Faculty Selected</div>
        }
    }
    render(){
        return(
            <div>
                <p>Output Faculty Details Here</p>
                {this.displayFacultyDetails()}
            </div>
        );
    }
}
export default graphql(getFacultyQuery,{
    options:(props)=>{
        return{
            variables:{
                id:props.facultyID
            }
        }
    }
})(FacultyDetailsComponent);
