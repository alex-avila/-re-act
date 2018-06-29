import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

const BaseButton = styled.button`
    background: none;
    border: none;
    outline: none;
    font-size: inherit;
    cursor: pointer;
    transition: all 0.5s;
`

const BasicButton = BaseButton.extend`
    color: #aa9fff;
    &:hover {
        filter: contrast(0.5);
    }
`

const GhostButton = BaseButton.extend`
    border: 1px solid #aa9fff;
    color: #aa9fff;
    padding: 0.4em 0.8em;
    border-radius: 7px;
    &:hover {
        background: #aa9fff;
        color: white;
    }
`

class Button extends Component {
    render() {
        return (
            <Fragment>
                {
                    this.props.basic ?
                        <BasicButton border="none">
                            {this.props.children}
                        </BasicButton> :
                        <GhostButton border="none">
                            {this.props.children}
                        </GhostButton>
                }
            </Fragment>
        )
    }
}

export default Button