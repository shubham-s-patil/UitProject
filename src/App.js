import React,{Component} from 'react'; 
import './styles/App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

//components
import FacultyListComponent from './components/FacultyListComponent'
import GallocResultsComponent from './components/GallocResultsComponent'
import NavBarComponent from './components/NavbarComponent'
import AddStudentComponent from './components/AddStudentComponent'
import AddStudentGroupComponent from './components/AddStudentGroupComponent'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div id="App">          
          <NavBarComponent/>
          <Switch>
            <Route path='/faculty-list' component={FacultyListComponent}/>
            <Route path='/galloc-list' component={GallocResultsComponent}/> 
            <Route path='/student-registration' component={AddStudentComponent}/>
            <Route path='/studentgroup-registration' component={AddStudentGroupComponent}/>
          </Switch>   
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
