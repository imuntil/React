import * as React from 'react';
import './Pane.css';

let Contacts: () => JSX.Element;
Contacts = function (): JSX.Element {
    return <div className="contacts" />;
};
let Chat: () => JSX.Element;
Chat = function (): JSX.Element {
    return <div className="chat" />;
};

interface SPProps {
    left: JSX.Element;
    right: JSX.Element;
}
function SplitPane (props: SPProps): JSX.Element {
    return (
        <div className="split-pane">
            <div className="split-pane-left">
                {props.left}
            </div>
            <div className="split-pane-right">
                {props.right}
            </div>
        </div>
    );
}
export function Pane (): JSX.Element {
    return (
        <SplitPane 
            left={
                <Contacts />
            }
            right={
                <Chat />
            }
        />
    );
}