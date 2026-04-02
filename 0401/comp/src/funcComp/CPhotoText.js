import React, { Component } from 'react'
export default class CPhotoText extends Component {
    getImageURL() {
        const id = this.props.image
        const url = "img/" + id + ".png"
        return url;
    }
    render() {
        const label = this.props.label
        const url = this.getImageURL()
        const boxStyle = {
            border: "1px solid silver",
            margin: "8px",
            padding: "4px"
        }
        return (
            <div style={boxStyle}>
                <img src={url} width="128" alt="computer" />
                <span> {label} </span>
            </div>
        );
    }
}