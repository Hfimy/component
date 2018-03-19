import React, { PureComponent } from 'react';
import { SketchPicker } from 'react-color';

export default class ColorPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayColorPicker: false,
        }
    }

    handleColorClick = (e) => {
        e.stopPropagation();

        //在父元素里阻止事件冒泡
        if (this.fontTarget === undefined) {
            this.fontTarget = e.target;
            this.setState({ displayColorPicker: !this.state.displayColorPicker });
            return;
        } else {
            if (this.fontTarget !== e.target) {
                return;
            }
        }
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    };

    handleColorClose = (e) => {
        e.stopPropagation();
        this.setState({ displayColorPicker: false });
    };

    handleColorChange = (color) => {
        this.props.onChange && this.props.onChange(color.hex);
    };
    render() {
        return <div className='color-show' style={{ backgroundColor: this.props.value }} onClick={(e) => this.handleColorClick(e)}>
            {this.state.displayColorPicker
                ? <div className='popover'>
                    <div className='cover' onClick={(e) => this.handleColorClose(e)}></div>
                    <SketchPicker color={this.props.value} onChange={(color) => this.handleColorChange(color)} />
                </div>
                : null}
        </div>
    }
}

//样式
/* .color-show{
    padding:0;
    margin:0;
    width:40px;
    height:40px;
    border-radius:2px;
    position: relative;
    display:inline-block;
    vertical-align: top;
    .popover{
        position: absolute;
        top:40px;
        left:-204px;
        display:inline-block;
        .cover{
            position: fixed;
            top:0;
            left:0;
            right:0;
            bottom:0;
        }
        .sketch-picker{
            width: 220px!important;
        }
    }
  } */
  