import React, { Component } from 'react'

import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl';

import './uploadFile.less'

class UploadNotify extends Component {
    handleClick = (e) => {
        e.stopPropagation();
        this.props.showUploadFile()
    }
    render() {
        return (
            <div className='upload-show' style={{ display: `${this.props.showUploadNotify ? 'block' : 'none'}` }} onClick={this.handleClick}>
                <span><FormattedMessage id='mediaPublish.uploading' /></span>
                <span className='icon icon_file'></span>
            </div>
        )
    }
}

export default injectIntl(UploadNotify);