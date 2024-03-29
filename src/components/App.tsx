import { Component } from 'react'
import { User } from './../model/Model';
import { AuthService } from './../services/AuthService';
import Login from './Login';

interface AppState{
user: User | undefined
}
export default class App extends Component<{},AppState> {

  private authService:AuthService = new AuthService();

  render() {
    return (
      <div>
        <Login authService={this.authService}/>
      </div>
    )
  }
}
