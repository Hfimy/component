//蒙层组件
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

export default class Overlay extends PureComponent {
    constructor(props) {
        super(props);
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
    }
    componentWillUnmount() {
        document.body.removeChild(this.container);
    }
    render() {
        return ReactDOM.createPortal(
            <div className='overlay'>
                <span className='overlay-close' onClick={this.props.onClose}>&times;</span>
                {this.props.children}
            </div>,
            this.container
        )
    }
}
//该组件对应的样式如下
/* .overlay{
    box-sizing:border-box;
    position: fixed;
    top:50%;
    left:50%;
    width:260px;
    height:200px;
    margin-left:-130px;
    margin-top:-100px;
    padding:10px;
    background-color: #fff;
    outline: rgba(0,0,0,.5) solid 9999px;
}
.overlay-close{
    position: absolute;
    top:10px;
    right:10px;
    color:red;
    cursor: pointer;
} */

//使用方式
/* class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        overlayActive: false
      }
      this.closeOverlay = this.closeOverlay.bind(this);
      this.showOverlay = this.showOverlay.bind(this);
    }
    closeOverlay() {
      this.setState({ overlayActive: false })
    }
    showOverlay() {
      this.setState({ overlayActive: true })
    }
    render() {
      return (
        <div className="App">
          <div>hello world!</div>
          {this.state.overlayActive &&
            <Overlay onClose={this.closeOverlay}>overlay content</Overlay>}
          <button onClick={this.showOverlay}>show</button>
        </div>
      );
    }
  } */