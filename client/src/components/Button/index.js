import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

const BaseButton = styled.button`
    background: none;
    border: none;
    outline: none;
    font-size: inherit;
    cursor: pointer;
    transition: all 0.25s;
`

const BasicButton = BaseButton.extend`
    color: #FDACFD;
    &:hover {
        color: #F4D7FF;
    }
`

const GhostButton = BaseButton.extend`
    background: #2E204A;
    border: 1px solid #FDACFD;
    color: #FDACFD;
    padding: 0.414em 0.828em;
    box-shadow: 0 3px 6px #362555;
    &:hover {
        background: #FDACFD;
        color: #2E204A;
    }
`

class Button extends Component {
    render() {
        return (
            <Fragment>
                {
                    this.props.basic ?
                        <BasicButton onClick={this.props.onClick} border="none">
                            {this.props.children}
                        </BasicButton> :
                        <GhostButton onClick={this.props.onClick} border="none">
                            {this.props.children}
                        </GhostButton>
                }
            </Fragment>
        )
    }
}

export default Button