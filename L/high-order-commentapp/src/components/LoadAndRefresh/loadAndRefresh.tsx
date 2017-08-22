import * as React from 'react';

interface LoadAndRefeshState {
    content: string;
}
let getData: (url: string) => Promise<string>;
getData = function (url: string) {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve('sinkikusai');
      }, 1000);
    });
};
export default (url: string) => {
    return (Component: any) => {
        class LoadAndRefresh extends React.Component<{}, LoadAndRefeshState> {
            constructor(props: {}) {
                super(props);
                this.refresh = this.refresh.bind(this);
                this.updateState = this.updateState.bind(this);
                this.getState = this.getState.bind(this);
            }
            componentWillMount () {
                this.getState();
            }
            render () {
                return (
                    <Component 
                        content={this.state.content}
                        refresh={this.refresh} 
                        {...this.props}
                    />
                );
            }
            public refresh () {
                this.getState();
            }
            private updateState (content: string) {
                this.setState({content});
            }
            private async getState () {
                this.updateState('数据加载重．．．');
                const content = await getData('xxx');
                this.updateState(content);
            }
        }
        return LoadAndRefresh;
    };
};