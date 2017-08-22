import * as React from 'react';

export default (WrappedComponent: any, name: string) => {
    class NewComponent extends React.Component<{}, {data: string | null}> {
        constructor (props: {}) {
            super(props);
            this.state = {
                data: null
            };
        }
        componentWillMount () {
            let data = localStorage.getItem(name);
            this.setState({data});
        }
        render () {
            return <WrappedComponent data={this.state.data} />;
        }
    }
    return NewComponent;
};