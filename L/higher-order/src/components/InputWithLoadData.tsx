import wrapWithLoadData from './wrapWithLoadData';
import * as React from 'react';

class InputWithLoadData extends React.Component<{data: string}, null> {
    render () {
        return <input value={this.props.data}/>;
    }
}

export const WrapInputWithLoadData = wrapWithLoadData(InputWithLoadData, 'username');
