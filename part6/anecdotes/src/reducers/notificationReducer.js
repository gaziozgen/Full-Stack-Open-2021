const notificationReducer = (state = "", action) => {

    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'SET_NOTIFICATON':
            return action.data

        case 'REMOVE_NOTIFICATON':
            return ""

        default:
            return state
    }
}

export const notification = (mesage, second) => {
    return dispatch => {
        dispatch(setNotification(mesage))
        setTimeout(() => dispatch(removeNotification()), 
        second * 1000)
    }
}

const setNotification = (mesage) => {
    return {
        type: 'SET_NOTIFICATON',
        data: mesage
    }
}

const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATON'
    }
}

export default notificationReducer