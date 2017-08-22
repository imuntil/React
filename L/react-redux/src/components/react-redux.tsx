import * as React from 'react';
import * as PropTypes from 'prop-types';

export let mapStateToProps: (state: {}) => {};
mapStateToProps = function (state: {themeColor: string, fontSize: string}) {
    return {
        themeColor: state.themeColor,
        fontSize: state.fontSize
    };
};

export let mapDispatchToProps: (dispatch: any) => any;
mapDispatchToProps = function(dispatch: (payload: {}) => any) {
    return {
        onSwitchColor: (color: string) => {
            dispatch({type: 'CHANGE_COLOR', themeColor: color});
        },
        onChangeFontSize: (size: string) => {
            dispatch({type: 'CHANGE_FONTSIZE', fontSize: size});
        }
    };
};

interface MSI {
    (state: {}): {};
}
interface MDI {
    (dispatch: any): any;
}
export const connect = (statetoProps?: MSI, dispatchToProps?: MDI) =>  (WrappedComponent: any) => {
    class Connect extends React.Component<{[props: string]: any}, {allProps: {}}> {
        static contextTypes = {
            store: PropTypes.object
        };
        constructor (props: {[props: string]: any}) {
            super(props);
            this.state = { allProps: {} };
        }
        componentWillMount () {
            const { store } = this.context;
            this.updateProps();
            store.subscribe(() => this.updateProps());
        }
        render () {
            return <WrappedComponent {...this.state.allProps} />;
        }
        private updateProps () {
            const { store } = this.context;
            let state = store.getState();
            let stateProps = statetoProps 
                ? statetoProps({...state, ...this.props})
                : {};
            let dispatchProps = dispatchToProps
                ? dispatchToProps(store.dispatch)
                : {};
            this.setState({
                allProps: {
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            });
        }
    }
    return Connect;
};

interface ProviderProps {
    [propName: string]: any;
}
export class Provider extends React.Component<ProviderProps, null> {
    static childContextTypes = {
        store: PropTypes.object
    };

    getChildContext () {
        return {
            store: this.props.store
        };
    }

    render () {
        return (
            <div>{this.props.children}</div>
        );
    }
}