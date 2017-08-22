import * as React from 'react';

interface LocalStorageActionsProps {
    onSubmit? (arg: any): void;
}
export default (WrappedComponent: any, name: string) => {
    class LocalStorageActions extends React.Component<LocalStorageActionsProps, {data: string | null | {}}> {
        constructor (props: LocalStorageActionsProps) {
            super(props);
            this.state = {
                data: null
            };
            this.saveData = this.saveData.bind(this);
        }
        componentWillMount () {
            let data = localStorage.getItem(name) || '';
            try {
                this.setState({data: JSON.parse(data)});
            } catch (e) {
                this.setState({ data });
            }
        }
        saveData (data: any) {
            try {
                localStorage.setItem(name, JSON.stringify(data));
            } catch (e) {
                localStorage.setItem(name, '${data}');
            }
        }
        render () {
            return (
                <WrappedComponent 
                    data={this.state.data} 
                    saveData={this.saveData}
                    {...this.props}
                />
            );
        }
    }
    return LocalStorageActions;
};