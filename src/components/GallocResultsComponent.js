import React,{Component} from 'react'
import {graphql} from 'react-apollo'
import {getGallocResultsQuery} from '../queries/queries'
import '../styles/gallocResults.css'

//components
import GallocResultDetailComponent from './GallocResultDetailComponent';

class GallocResultsComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            selected:null
        }
    }
    displayGallocList(){
        var data=this.props.data;
        if(data.loading){
            return (<div>Loading Guide Allotment Results</div>)
        }else{
            console.log(data.student_group_domain_guide_mappings);
            return data.student_group_domain_guide_mappings.map(gallocItem=>{
                return (
                    <li key={gallocItem.id} onClick={(e)=>{this.setState({selected:gallocItem.id})}}>{gallocItem.student_group_id}</li>
                )
            });
        }
    }
    render(){
        console.log(this.props.data);
        return(
            <div id="galloc-list-component" className='row'>
                <div id="galloc-list" className="col-sm-7">
                    <h1>Guide Allotment List</h1>
                    <ul>
                        {this.displayGallocList()}
                    </ul>
                </div>
                <div id="galloc-details" className="col-sm-5">
                    <GallocResultDetailComponent gallocResultID={this.state.selected}/>
                </div>
            </div>
        );
    }
}

export default graphql(getGallocResultsQuery)(GallocResultsComponent)