import types from "./types"

function getCalendar(resourceGroupId, zipCode, dateStart) {
    return {
        type: types.CALENDAR_DATES_REQUESTED,
        resourceGroupId,
        zipCode,
        dateStart
    }
}
function getCalendarSuccess(dates, resourceTypeId) {
    return {
        type: types.CALENDAR_DATES_SUCCEEDED,
        resourceTypeId,
        dates
    }
}

function getCalendarError(error) {
    return {
        type: types.CALENDAR_DATES_FAILED,
        error   
    }
}



function bookCalendar(resourceTypeId, timeSlotId, date, time) {
    return {
        type: types.CALENDAR_BOOK_REQUESTED,
        resourceTypeId,
        timeSlotId,
        date,
        time
    }
}
function bookCalendarSuccess(lockId) {
    return {
        type: types.CALENDAR_BOOK_SUCCEEDED,
        lockId
    }
}

function bookCalendarError(error) {
    return {
        type: types.CALENDAR_BOOK_FAILED,
        error   
    }
}



function orderCalendar(lockGuid, isDoubleReservation, data) {
    return {
        type: types.CALENDAR_ORDER_REQUESTED,
        lockGuid,
        isDoubleReservation,
        data
    }
}

function orderCalendarSuccess(PaymentUrl, PaymentSessionId) {
    return {
        type: types.CALENDAR_ORDER_SUCCEEDED,
        PaymentUrl,
        PaymentSessionId
    }
}

function orderCalendarError(error) {
    return {
        type: types.CALENDAR_ORDER_FAILED,
        error   
    }
}



function clearCalendar() {
    return {
        type: types.CALENDAR_CLEAR
    }
}

export default {
    getCalendar,
    getCalendarSuccess,
    getCalendarError,
    bookCalendar,
    bookCalendarSuccess,
    bookCalendarError,
    orderCalendar,
    orderCalendarSuccess,
    orderCalendarError,
    clearCalendar
};