import * as actionTypes from './types';

export function setUser(user)
{
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    };
}

export function clearUser()
{
    return {
        type: actionTypes.CLEAR_USER
    };
}

export function setCurrentChannel(channel)
{
    return {
        type: actionTypes.SET_CURRENT_CHANNEL,
        payload: {
            currentChannel: channel
        }
    }
}