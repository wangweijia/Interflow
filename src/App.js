import React, { Component } from 'react';
import './App.css';    
import Websocket from 'react-websocket';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageList: [],
            inputText: ''
        }

        this.isConnented = false;
    }

  render() {
    return (
      <div className="App">
        <Websocket ref={(view)=>{
            this.ws = view;
        }} url='ws://127.0.0.1:8080/'
              onMessage={(data)=>{
                // let result = JSON.parse(data);
                console.log(data);
                // this.setState({count: this.state.count + result.movement});
                let newList = this.state.messageList;
                newList.push(data);
                this.setState({
                  messageList: newList
                });
              }} onOpen={()=>{
                  this.isConnented = true;
              }} />

          <div style={{
            flexDirection: 'column'
          }} >  
              input view
              <input type={'text'} value={this.state.inputText} onChange={(event)=>{
                this.setState({
                  inputText: event.target.value
                })
              }} />
              <button onClick={()=>{
                if (this.ws) {
                  this.ws.sendMessage(this.state.inputText);
                  this.setState({
                    inputText: ''
                  })
                }
              }} >send</button>
          </div>
          <div>
            {this.state.messageList.map((item, index)=>{
              return <div key={index} >{item}</div>
            })}
          </div>
      </div>
    );
  }
}

export default App;
