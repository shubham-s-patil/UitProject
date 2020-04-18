import React,{Component} from 'react'
import {graphql} from 'react-apollo'
import {addStudentMutation} from '../queries/queries'
import compose from 'lodash.flowright'

//components
import StudentDetailsComponent from './StudentDetailsComponent'

class AddStudentComponent extends Component{
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
        this.props.addStudentMutation({
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
                        <h1 className="text-center">Student Registration</h1>
                        <hr/>
                        <form name='studentRegistrationForm' onSubmit={this.submitForm.bind(this)} className='was-validated'>
                            <div className="form-group">
                                <label for="gr_number">GR Number</label>
                                <input type="text" style={{textTransform:"uppercase"}} onChange={(e)=>{this.setState({gr_number:e.target.value.toUpperCase()})}} className="form-control" name="gr_number" id="gr_number" required/>
                                <div className="valid-feedback">Valid</div>
                                <div className="invalid-feedback">Enter GR Number</div>
                                <button className='btn btn-primary' id='validateIDButton' onClick={this.validateID.bind(this)}>Validate GR Number</button>
                            </div>
                            <div className="form-group">
                                <label for="email_address">Email Address</label>
                                <input maxLength="100" type="email" onChange={(e)=>{this.setState({email_address:e.target.value})}} className="form-control" name="email_address" id="email_address" placeholder="name.grnum@viit.ac.in" required/>
                                <div className="valid-feedback">Valid</div>
                                <div className="invalid-feedback">Enter Email Address</div>
                            </div>
                            <div className="form-group">
                                <label for="first_name">First Name:</label>
                                <input maxLength="30" style={{textTransform:"uppercase"}} type="text" onChange={(e)=>{this.setState({first_name:e.target.value.toUpperCase()})}} className="form-control" name="first_name" id="first_name" placeholder="First Name" required/>
                                <div className="valid-feedback">Valid</div>
                                <div className="invalid-feedback">Enter First Name</div>
                            </div>
                            <div className="form-group">
                                <label for="last_name">Last Name:</label>
                                <input maxLength="30" type="text" style={{textTransform:"uppercase"}} onChange={(e)=>{this.setState({last_name:e.target.value.toUpperCase()})}} className="form-control" name="last_name" id="last_name" placeholder="Last Name" required/>
                                <div className="valid-feedback">Valid</div>
                                <div className="invalid-feedback">Enter Last Name</div>
                            </div>
                            <div className="form-group">
                                <label for="mobile_num">Mobile Number</label>
                                <input maxLength="10" type="tel"  onChange={(e)=>{this.setState({mobile_num:e.target.value})}} className="form-control" name="mobile_num" id="mobile_num" pattern="[0-9]{10}" placeholder="0123456789" required/>
                                <div className="valid-feedback">Valid</div>
                                <div className="invalid-feedback">Enter Mobile Number</div>                        
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
    graphql(addStudentMutation,{name:"addStudentMutation"})
)(AddStudentComponent);