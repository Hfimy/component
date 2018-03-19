import React, { Component } from 'react'

import Modal from 'antd/lib/modal'
import './antd-modal.less'
import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl';

import './uploadFile.less'

class UploadFile extends Component {

    handleCancel = () => {
        this.props.hideUploadFile();
    }

    render() {
        const footer = <button type='button' className='ant-btn ant-btn-primary upload-close-btn' onClick={this.props.hideUploadFile}><FormattedMessage id='button.close' /></button>;
        const uploadFileList = this.props.uploadFileList;
        return (
            <Modal title={this.props.intl.formatMessage({ id: 'mediaPublish.uploading' })} visible={this.props.showUploadFile} footer={footer} maskClosable={false} onCancel={this.handleCancel}>
                <ul className='upload-file-ul'>
                    <li><span className='upload-filename upload-filename-title'><FormattedMessage id='mediaPublish.materialName' /></span><span className='upload-progress upload-progress-title'><FormattedMessage id='mediaPublish.uploadProgress' /></span></li>
                    {uploadFileList.map((item, index) => {
                        if (item !== undefined) {
                            return (
                                <li key={index}>
                                    <span className='upload-filename'>{item.name}</span>
                                    <span className='upload-progress'>{item.progress}</span>
                                    <span className='upload-close-x' onClick={() => this.props.cancelUploadFile(index)}></span>
                                </li>)
                        }
                    })}
                </ul>
            </Modal>
        )
    }
}

export default injectIntl(UploadFile)