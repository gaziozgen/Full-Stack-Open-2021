const notificationReducer = (state = ["", 0], action) => {

    // console.log('state now: ', state)
    // console.log('action', action)

    switch (action.type) {
        case 'SET_NOTIFICATON':
            return [action.data.message, action.data.time]

        case 'REMOVE_NOTIFICATON':
            console.log(action.data.time, state[1])
            if (action.data.time == state[1]) {
                return ["", 0]
            }
            else {
                return state
            }

        default:
            return state
    }
}

export const notification = (message, second) => {
    const now = new Date().getTime()
    const time = second * 1000 + now
    return async dispatch => {
        await dispatch(setNotification(message, time))
        setTimeout(async () => await dispatch(removeNotification(time)),
            second * 1000)
    }
}

const setNotification = (message, time) => {
    return {
        type: 'SET_NOTIFICATON',
        data: {
            message, 
            time
        }
    }
}

const removeNotification = (time) => {
    return {
        type: 'REMOVE_NOTIFICATON',
        data: {time}
    }
}

export default notificationReducer