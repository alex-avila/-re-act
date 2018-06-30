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
    color: #E4C7FF;
    &:hover {
        color: #F4D7FF;
    }
`

const GhostButton = BaseButton.extend`
    background: #2F2E39;
    border: 1px solid #E4C7FF;
    color: #E4C7FF;
    padding: 0.414em 0.828em;
    box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
    &:hover {
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.33);
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