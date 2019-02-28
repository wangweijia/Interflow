import React, { Component } from 'react';
import Websocket from 'react-websocket';
import { Cookies } from 'react-cookie';

const MessageType = {
  // 新消息
  Message: 1,
  // 用户列表
  UserList: 2,
  // 登录状态检测
  LoginState: 3,
  // 系统消息
  SysMessage: 4,
}

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
          messageList: [],
          inputText: '',
          rootIp: Cookies.get('rootIp') || undefined,
          userName: Cookies.get('userName') || undefined,
      }

      this.userName = undefined;
      this.rootIp = undefined;

      this.isConnented = false;
  }

  onMessage = (message)=>{
    // eslint-disable-next-line default-case
    switch (message.type) {
      case MessageType.Message: {
        let {value} = message;
        let newList = this.state.messageList;
        newList.push(value);
        this.setState({
          messageList: newList
        });
      }
        break;
      case MessageType.UserList: {

      }
        break;
      case MessageType.LoginState: {

      }
        break;
      case MessageType.SysMessage: {

      }
        break;
    }
  }

  renderWebsocket() {
    return (
      this.state.rootIp && <Websocket ref={(view)=>{
        this.ws = view;
      }} url={`ws://${this.state.rootIp}/`}
        onMessage={(data)=>{
          console.log(JSON.parse(data));
          this.onMessage(JSON.parse(data));
        }} onOpen={(e)=>{
          this.isConnented = true;
        }} />
    )
  }

  renderMessageView() {
    return (
      <div style={{
        flex: 1,
      }} >
        {this.state.messageList.map((item, index)=>{
          return (
            <div key={index} style={{
              marginTop: 10
            }} >
              {item}
            </div>
          )
        })}
      </div>
    )
  }

  renderInputView() {
      return (
        <div style={{
          flexDirection: 'row',
          marginTop: 10,
          marginBottom: 10,
          height: 100,
          backgroundColor: 'red'
        }} >
          <textarea value={this.setState.inputText} onChange={(e)=>{
            this.setState({
              inputText: e.target.value
            })
          }} style={{
            flex: 1,
            resize: 'none'
          }} />
          <button onClick={()=>{
            if (this.ws) {
              let message = {
                type: MessageType.Message,
                value: this.state.inputText
              }
              this.ws.sendMessage(JSON.stringify(message));
              this.setState({
                inputText: ''
              })
            }
          }} >
            发送
          </button>
        </div>
      )
  }

  renderUserInfo() {
    return (
      <div styl={{
        flex: 1
      }} >
        <div style={{
          flexDirection: 'row',
          margin: 3
        }} >
          地址--
          <input ref={(view)=>{
            this.ipInput = view;
          }} />
        </div>
        <div style={{
          flexDirection: 'row',
          margin: 3
        }} >
          昵称--
          <input ref={(view)=>{
            this.nameInput = view;
          }} />
        </div>
        <button onClick={()=>{
          this.rootIp = this.ipInput.value;
          this.userName = this.nameInput.value;
          this.setState({
            rootIp: this.rootIp,
            userName: this.userName,
          });

          Cookies.set('rootIp', this.rootIp);
          Cookies.set('userName', this.userName);
        }} >
          更新/连接
        </button>
      </div>
    )
  }

  renderUserList() {
    return (
      <div style={{
        flex: 1,
        margin: 8,
        backgroundColor: '#ffffff'
      }} >

      </div>
    )
  }

  render() {
    return (
      <div style={{
        width: window.innerWidth,
        height: window.innerHeight,
        flexDirection: 'row'
      }} >
        {this.renderWebsocket()}
        <div style={{
          width: 200,
          height: window.innerHeight,
          backgroundColor: 'blue'
        }} >
          {this.renderUserInfo()}
          {this.renderUserList()}
        </div>
        <div style={{
          flex: 1,
          backgroundColor: 'yellow'
        }} >    
          {this.renderMessageView()}
          {this.renderInputView()}
        </div>
      </div>
    );
  }
}

export default App;
