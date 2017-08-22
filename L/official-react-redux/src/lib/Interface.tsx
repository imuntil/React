export interface Stores {
    themeColor: string;
    fontSize: string;
}

export let mapStateToProps: (state: {}) => {};
mapStateToProps = function (state: Stores) {
    return {
        themeColor: state.themeColor,
        fontSize: state.fontSize
    };
};

export let mapDispatchToProps: (dispatch: any) => {};
mapDispatchToProps = function (dispatch: (payload: {}) => {}) {
    return {
        onSwitchColor: (color: string) => {
            dispatch({type: 'CHANGE_COLOR', themeColor: color});
        },
        onChangeFontSize: (size: string) => {
            dispatch({type: 'CHANGE_FONTSIZE', fontSize: size});
        }
    };
};