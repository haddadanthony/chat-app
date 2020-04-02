import React from 'react'
import classes from './StatusBar.module.css';
import styled from 'styled-components';

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${props => props.connected ? '#50c878' : 'red'};
    padding: 10px;
    color: #fff;
    border-radius: 3px;
    font-size: 1.5rem;
    font-weight: 600;
    height: 5%;
`;

const StatusBar = (props) => {
    const {connected, change, name} = props;

    return (
        <Div connected>
            <div>{connected ? 'Connected' : 'Disconnected'}</div>
            <form>
                <label htmlFor="name">Display Name</label>
                <input name="name" onChange={e => change(e)} type="text" value={name} />
            </form>
        </Div>
    )
}

export default StatusBar;
