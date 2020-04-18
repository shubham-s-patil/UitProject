import React,{Component} from 'react';
import {graphql} from 'react-apollo'
import {getStudentQuery} from '../queries/queries'

class StudentDetailsComponent extends Component{
    displayStudentInfo(){
        const {student}=this.props.data;
        //console.log(student);
        if(student){
            return(
                <div>
                    <p>Student Details</p>
                    <h3>GR Number : {student.gr_number}</h3>
                    <p>Name : {student.first_name} {student.last_name}</p>
                    <p>Email address : {student.email_address}</p>
                    <p>Phone : {student.mobile_number}</p>
                </div>
            )
        }else{
            return <div>Select a Student</div>
        }
    }
    render(){
        return (
            <div>
                {this.displayStudentInfo()}
            </div>
        )
    }
}
export default graphql(getStudentQuery,{
    options:(props)=>{
        return{
            variables:{
                student_id:props.student_id
            }
        }
    }
})(StudentDetailsComponent);