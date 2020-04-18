import React,{Component} from 'react'
import {graphql} from 'react-apollo'
import {addStudentGroupMutation} from '../queries/queries'
import compose from 'lodash.flowright'

//components
import StudentDetailsComponent from './StudentDetailsComponent'

class AddStudentGroupComponent extends Component{
    constructor(props){
        super(props);
        this.state={

            
            email_address:'',
            gr_number:'',
            first_name:'',
            last_name:'',
            mobile_num:'',
            selected_student:null,
            inserted_student:null,
            addStudentResult:null
        };
    }
    displayMutationResult(){
        const {addStudentResult}=this.state;
        const {addStudentError}=this.state
        console.log(this.state.addStudentError)
        if(addStudentError!=null){
            console.log('inside if addStudentError');
            var errors=JSON.parse(addStudentError.__proto__.graphQLErrors["0"].message);
            console.log(errors);
            console.log(errors);
            return(
                <ul>
                    {
                        errors.map(item=>{
                            return <li>{item.message} {item.type} {item.path}</li>
                        })
                    }
                </ul>
            )
        }
        else if(addStudentResult!=null){
            return(
                <p>{addStudentResult.gr_number}</p>
            )
        }else{
            return <div>New Mutation Results will be displayed here</div>
        }
    }
    processResponse(addStudentResponse){
        if(addStudentResponse){
            return(
                <div>
                    <p>{addStudentResponse.first_name} {addStudentResponse.last_name}</p>
                    <p>{addStudentResponse.gr_number}</p>
                </div>
            )
        }else{
            return (<div>No Response Received</div>)
        }
    }
    submitForm(event){
        //console.log(this.state);
        event.preventDefault();
        //if not found
        this.props.AddStudentGroupMutation({
            variables:{
                gr_number:this.state.gr_number,
                first_name:this.state.first_name,
                last_name:this.state.last_name,
                mobile_num:this.state.mobile_num,
                email_address:this.state.email_address
            }
        }).then((res)=>{
            console.log("response")
            console.log(res.data.addStudent);            
            window.alert(this.processResponse(res.data.addStudent));
            //document.getElementById('responseBody').innerHTML="Entry Inserted Successfully";              
            //document.getElementById("submitResponseModal").showModal(); 
            this.setState({addStudentResult:Object.create(res.data.addStudent),addStudentError:null});
            document.getElementById("openModalBtn").click();  
            //this.setState({inserted_student:res.data.addStudent.gr_number});
        }).catch((err)=>{
            console.log(Object.create(err));
            //$("#submitResponseModal").modal();   
            this.setState({addStudentError:Object.create(err),addStudentResult:null});
            //document.getElementById("responseBody").innerHTML=err;              
            document.getElementById("openModalBtn").click();         
            window.alert(err);       
            //this.setState({addStudentError:Object.create(err)});
        });
        //console.log(this.props);
    }
    validateID(event){
        event.preventDefault();
        console.log(this.state);
        this.setState({selected_student:this.state.gr_number});
    }
    render(){
        console.log(this.state);
        return(
            <div>
                <button style={{display:"none"}}id="openModalBtn" type="button" className="btn btn-primary" data-toggle="modal" data-target="#submitResponseModal">
                    Open modal
                </button>
                <div className="modal fade" id="submitResponseModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Response from Server</h4> 
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body"> 
                                <div id="responseBody">
                                {this.displayMutationResult()}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            <div id='add-student-component' className='row'>
                <div id='add-student-form' className='container col-sm-7'>
                    <div className='jumbotron'>
                        <h1 className="text-center">Student Group Registration</h1>
                        <hr/>
                        <form name='studentRegistrationForm' onSubmit={this.submitForm.bind(this)} className='was-validated'>
                            <div className="form-group">
                                <label for="gr_number">Student ID</label>
                                <input type="text" style={{textTransform:"uppercase"}} onChange={(e)=>{this.setState({gr_number:e.target.value.toUpperCase()})}} className="form-control" name="gr_number" id="gr_number" required/>
                                <div className="valid-feedback">Valid</div>
                                <div className="invalid-feedback">Enter Student ID</div>
                                <button className='btn btn-primary' id='validateIDButton' onClick={this.validateID.bind(this)}>Validate Student ID</button>
                            </div>
                             <div className="form-group">
                                <label for="gr_number">Student ID</label>
                                <input type="text" style={{textTransform:"uppercase"}} onChange={(e)=>{this.setState({gr_number:e.target.value.toUpperCase()})}} className="form-control" name="gr_number" id="gr_number" required/>
                                <div className="valid-feedback">Valid</div>
                                <div className="invalid-feedback">Enter Student ID</div>
                                <button className='btn btn-primary' id='validateIDButton' onClick={this.validateID.bind(this)}>Validate Student ID</button>
                            </div>
                            <div className="form-group">
                                <label for="gr_number">Student ID</label>
                                <input type="text" style={{textTransform:"uppercase"}} onChange={(e)=>{this.setState({gr_number:e.target.value.toUpperCase()})}} className="form-control" name="gr_number" id="gr_number" required/>
                                <div className="valid-feedback">Valid</div>
                                <div className="invalid-feedback">Enter Student ID</div>
                                <button className='btn btn-primary' id='validateIDButton' onClick={this.validateID.bind(this)}>Validate Student ID</button>
                            </div>
                            <div className="form-group">
                                <label for="gr_number">Student ID</label>
                                <input type="text" style={{textTransform:"uppercase"}} onChange={(e)=>{this.setState({gr_number:e.target.value.toUpperCase()})}} className="form-control" name="gr_number" id="gr_number" required/>
                                <div className="valid-feedback">Valid</div>
                                <div className="invalid-feedback">Enter Student ID</div>
                                <button className='btn btn-primary' id='validateIDButton' onClick={this.validateID.bind(this)}>Validate student ID</button>
                            </div>
                            <input type="submit" className="btn btn-primary" id="submitFormBtn" value="Submit"></input>
                        </form>
                        <div>{this.displayMutationResult()}</div>
                    </div>
                </div>
                <div id='student-info' className='col-sm-5'>                    
                    <StudentDetailsComponent student_id={this.state.selected_student}/>                    
                </div>
            </div>
            </div>
        )
    }
}

export default compose(
    graphql(addStudentGroupMutation,{name:"addStudentGroupMutation"})
)(AddStudentGroupComponent);