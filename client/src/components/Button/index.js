import React, { Component } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    background: none;
    border: 1px solid #aa9fff;
    color: #aa9fff;
    font-size: inherit;
    padding: 0.4em 0.8em;
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
        background: #aa9fff;
        color: white;
    }
`

class Button extends Component {
    render() {
        return (
            <StyledButton>
                {this.props.children}
            </StyledButton>
        )
    }
}

export default Button