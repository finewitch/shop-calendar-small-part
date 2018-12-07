import types from "./types"

const initCalendarState = {
    loading: false,
    error: false,
    lockId: '',
    resourceTypeId: '',
    dates: []
}

export default (state = initCalendarState, action) => {
    switch (action.type) {
        case types.CALENDAR_DATES_REQUESTED:
            return {
                ...state,
                loading: true,
                error: false
            }
        case types.CALENDAR_DATES_FAILED:
            return {
                ...state,
                error: true
            }
        case types.CALENDAR_DATES_SUCCEEDED:
            return {
                ...state,
                loading: false,
                error: false,
                resourceTypeId: action.resourceTypeId,
                dates: action.dates
            }
        case types.CALENDAR_BOOK_REQUESTED:
            return {
                ...state,
                resourceTypeId: action.resourceTypeId,
                timeSlotId: action.timeSlotId,
                date: action.date,
                time: action.time
            }
        case types.CALENDAR_BOOK_SUCCEEDED:
            return {
                ...state,
                lockId: action.lockId
            }
        case types.CALENDAR_ORDER_SUCCEEDED:
            return {
                ...state,
                PaymentUrl: action.PaymentUrl,
                PaymentSessionId: action.PaymentSessionId
            }
        case types.CALENDAR_CLEAR:
            return {
                ...state,
                loading: false,
                lockId: '',
                resourceTypeId: '',
                dates: []
            }
        default:
            return state
    }
}

