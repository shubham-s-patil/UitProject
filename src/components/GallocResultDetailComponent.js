import React,{Component} from 'react'
import {graphql} from 'react-apollo'
import {getSingleGallocResultQuery} from '../queries/queries'
import '../styles/gallocResultDetail.css'

//components
import StudentDetailsComponent from './StudentDetailsComponent'

class GallocResultDetailComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            selected_student:null
        }
    }
    displayGallocResultDetails(){
        const sgdgMapping=this.props.data.student_group_domain_guide_mapping;
        if(sgdgMapping){
            return(
                <div>
                    <p>Guide ID : {sgdgMapping.guide_id}</p>
                    <p>Student Group ID : {sgdgMapping.student_group_id}</p>
                    <p>Allocated Domain : {sgdgMapping.allocated_domain.name}</p>
                    <p>Student IDs</p>
                    <ul className="sg-student-mappings">
                        {
                            sgdgMapping.student_group.student_mappings.map(sgMapping=>{
                                return(
                                    <li key={sgMapping.student_id} onClick={(e)=>{this.setState({selected_student:sgMapping.student_id})}}>
                                        {sgMapping.student_id}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <p>Domain Preferences</p>
                    <ul>
                        {
                            sgdgMapping.student_group.domain_mappings.map(item=>{
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
            return <div>Select a Group</div>
        }
    }
    render(){
        console.log(this.props.data);
        return (
            <div>
                <div id="galloc-data">
                    <h2>Display Allocation Result Details</h2>
                    {this.displayGallocResultDetails()}
                </div>
                <div id="student-info">
                    <StudentDetailsComponent student_id={this.state.selected_student} />
                </div>
            </div>
        );
    }
}
export default graphql(getSingleGallocResultQuery,{
    options:(props)=>{
        return{
            variables:{
                id:props.gallocResultID
            }
        }
    }
})(GallocResultDetailComponent);