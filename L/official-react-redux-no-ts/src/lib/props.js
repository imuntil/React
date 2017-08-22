export function mapStateToProps(state) {
    return {
        themeColor: state.themeColor,
        fontSize: state.fontSize
    }
}
export function mapDispatchToProps(dispatch) {
    return {
        onSwitchColor: color => {
            dispatch({ type: 'CHANGE_COLOR', themeColor: color })
        },
        onSwitchFontSize: size => {
            dispatch({ type: 'CHANGE_FONTSIZE', fontSize: size })
        }
    }
}