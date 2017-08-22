import * as React from 'react';
import loadAndRefresh from './loadAndRefresh';

interface AListProps {
    content: string;
    refresh (): void;
}
class AList extends React.Component<AListProps, null> {
    render () {
        return (
            <div>
                {this.props.content}
                <a href="javascript:;" onClick={this.props.refresh}>refresh</a>
            </div>
        );
    }
}

const xLoadAndRefresh = loadAndRefresh('ccx');
const WrappedAList = xLoadAndRefresh(AList);
export default WrappedAList;
