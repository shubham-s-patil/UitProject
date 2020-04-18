import React,{Component} from 'react';
import {NavLink} from 'react-router-dom'

class NavBarComponent extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark row">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/faculty-list">Faculty List</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/galloc-list">Guide Allocation List</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/student-registration">New Student</NavLink>
                    </li>
                     <li className="nav-item">
                        <NavLink className="nav-link" to="/studentGroup-registration">Student Group Registration</NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}
export default NavBarComponent;
