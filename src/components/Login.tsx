import { Component, SyntheticEvent } from 'react'
import { AuthService } from './../services/AuthService';

interface LoginProps{
authService:AuthService
}

interface LoginState{
  userName:string,
  password:string,
  loginAttempted:boolean,
  loginSuccessful:boolean
}

interface CustomEvent {
  target:HTMLInputElement
}

export default class Login extends Component<LoginProps,LoginState> {
  state:LoginState = {
  userName:'',
  password:'',
  loginAttempted:false,
  loginSuccessful:false
  }

  private setUserName(event: CustomEvent){
    this.setState({userName:event.target.value})
  }

  private setPassword(event: CustomEvent){
    this.setState({password:event.target.value})
  }

  private async handleSubmit(event:SyntheticEvent){
    event.preventDefault();
    this.setState({loginAttempted:true})

    const result = await this.props.authService.login(this.state.userName, this.state.password)
    if(result){
      this.setState({loginSuccessful:true})
    }else{
            this.setState({loginSuccessful:false})

          }
  }

  render() {
    let loginMessage: any;
    if(this.state.loginAttempted){
      if(this.state.loginSuccessful){
        loginMessage =  <label>Login Successful!</label>
      }else{
        loginMessage =  <label>Login Failed!</label>
      }
    }

    return (
      <div>
        <h2>Please login</h2>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input type="text" value={this.state.userName} onChange={(e)=> this.setUserName(e)}/><br/>
          <input type="password" value={this.state.password} onChange={(e)=> this.setPassword(e)}/><br/>
          <input type="submit" value='Login'/>
        </form>
       {loginMessage}
      </div>
    )
  }
}
