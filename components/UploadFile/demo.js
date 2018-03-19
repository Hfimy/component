import React from 'react';

import UploadFile from '../component/uploadFile';
import UploadNotify from '../component/uploadNotify';
import PreviewFile from '../component/previewFile';

export default class Demo extends React.Component {
    state = {
        //上传文件模块字段
        showModal: false,
        showUploadNotify: false,
        showUploadFile: false,
        uploadFileList: [],
        usefulListLength: 0,
        currentXhr: null,
        isUpload: false,
        afterFirstUpload: false,
    }

    showModal = () => {
        this.setState({ showModal: true });
    }
    hideModal = () => {
        this.setState({ showModal: false });
    }
    showUploadNotify = () => {
        this.setState({ showUploadNotify: true });
    }
    hideUploadNotify = () => {
        this.setState({ showUploadNotify: false });
    }
    showUploadFile = () => {
        this.setState({ showUploadFile: true });
    }
    hideUploadFile = () => {
        this.setState({ showUploadFile: false });
    }
    uploadProgress = (e) => {
        if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            const list = this.state.uploadFileList, key = e.target.key;
            list[key].progress = progress + '%';
            this.setState({ uploadFileList: list });
        }
    }
    uploadComplete = (e) => {
        const { key, status } = e.target;
        const list = this.state.uploadFileList;
        if (status === 200) {
            list[key].progress = this.formatIntl('mediaPublish.completed');
            // this.requestAssetList();
            // this.requestSearchAssetList();
        } else {
            list[key].progress = this.formatIntl('mediaPublish.failed');
        }
        this.setState({ uploadFileList: list });
        const nextKey = key + 1;
        for (let i = nextKey; i < list.length; i++) {
            if (list[i] !== undefined && (list[i].progress === '待上传' || list[i].progress === 'Waiting')) {
                const currentXhr = list[i].xhr;
                uploadMaterialFile(list, i);
                this.setState({ currentXhr });
                return;
            }
        }
        this.setState({ isUpload: false, currentXhr: null });//无待上传文件时
    }
    uploadFailed = (e) => {
        const { key } = e.target;
        const list = this.state.uploadFileList;
        list[key].progress = this.formatIntl('mediaPublish.failed');
        this.setState({ uploadFileList: list });
        const nextKey = key + 1;
        for (let i = nextKey; i < list.length; i++) {
            if (list[i] !== undefined && (list[i].progress === '待上传' || list[i].progress === 'Waiting')) {
                const currentXhr = list[i].xhr;
                uploadMaterialFile(list, i);
                this.setState({ currentXhr });
                return;
            }
        }
        this.setState({ isUpload: false, currentXhr: null });//无待上传文件时
    }
    uploadCanceled = (e) => {
        console.log('取消上传');
    }
    createUploadXHR = (file, cb) => {
        const { name, key, type } = file;
        const form = new FormData();
        form.append('file', file.data);
        form.append('name', name);
        form.append('type', type);
        const xhr = new XMLHttpRequest();
        xhr.key = key, xhr.upload.key = key;
        xhr.upload.addEventListener('progress', this.uploadProgress);
        xhr.addEventListener('load', this.uploadComplete);
        xhr.addEventListener('error', this.uploadFailed);
        xhr.addEventListener('abort', this.uploadCanceled);
        const { uploadFileList, usefulListLength } = this.state;
        uploadFileList.push({ name: file.name, progress: file.progress, xhr: xhr, form: form });
        this.setState({ uploadFileList, usefulListLength: usefulListLength + 1 }, cb);
    }
    addUploadFile = (file) => {
        this.createUploadXHR(file, () => {
            this.showUploadNotify();
            const { uploadFileList, afterFirstUpload, isUpload } = this.state;
            //第一次上传文件
            if (!afterFirstUpload) {
                const currentXhr = uploadFileList[0].xhr;
                uploadMaterialFile(uploadFileList, 0);
                this.setState({ currentXhr, afterFirstUpload: true, isUpload: true });
                return;
            }
            if (isUpload) {
                return;
            }
            //已上传过文件，所有已完成，下次继续上传触发最新的文件
            const currentXhr = uploadFileList[uploadFileList.length - 1].xhr;
            uploadMaterialFile(uploadFileList, uploadFileList.length - 1);
            this.setState({ currentXhr, isUpload: true });
        });
    }
    cancelXhr = (xhr) => {
        xhr.abort();
        xhr.upload.removeEventListener('progress', this.uploadProgress);
        xhr.removeEventListener('load', this.uploadComplete);
        xhr.removeEventListener('error', this.uploadFailed);
        xhr.removeEventListener('abort', this.uploadCanceled);
    }
    cancelCurrentXhr = (list, index, usefulListLength) => {
        const nextKey = index + 1;
        //后面还有待上传文件时
        for (let i = nextKey; i < list.length; i++) {
            if (list[i] !== undefined && (list[i].progress === '待上传' || list[i].progress === 'Waiting')) {
                const currentXhr = list[i].xhr;
                uploadMaterialFile(list, i);
                this.setState({
                    uploadFileList: list,
                    usefulListLength,
                    currentXhr,
                }, () => {
                    if (this.state.usefulListLength === 0) {
                        this.hideUploadNotify();
                    }
                });
                return;
            }
        }
        //没有待上传文件时
        this.setState({
            uploadFileList: list,
            usefulListLength,
            currentXhr: null,
            isUpload: false,
        }, () => {
            if (this.state.usefulListLength === 0) {
                this.hideUploadNotify();
            }
        });
    }
    cancelUploadFile = (index) => {
        const list = this.state.uploadFileList, xhr = list[index].xhr;
        this.cancelXhr(xhr);
        list[index] = undefined;
        const usefulListLength = this.state.usefulListLength - 1;
        if (xhr === this.state.currentXhr) {
            //取消当前正在上传的文件
            this.cancelCurrentXhr(list, index, usefulListLength);
            return;
        }
        //取消已上传或未上传的文件
        this.setState({
            uploadFileList: list,
            usefulListLength,
        }, () => {
            if (this.state.usefulListLength === 0) {
                this.hideUploadNotify();
            }
        });
    }
    render() {
        return (
            <div>
                <UploadNotify showUploadNotify={this.state.showUploadNotify} hideUploadNotify={this.hideUploadNotify} showUploadFile={this.showUploadFile} />
                {this.state.showUploadFile ? <UploadFile showUploadFile={this.state.showUploadFile} hideUploadFile={this.hideUploadFile} uploadFileList={this.state.uploadFileList} cancelUploadFile={this.cancelUploadFile} /> : null}
                <PreviewFile showModal={this.state.showModal} hideModal={this.hideModal} addUploadFile={this.addUploadFile} />
            </div>
        )
    }
}