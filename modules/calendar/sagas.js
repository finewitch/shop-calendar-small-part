import { take, call, put, takeLatest, select } from 'redux-saga/effects'
import api from '../../services/api'
import actions from "./actions";
import types from "./types";

import { orderActions } from "./../order"

// https://github.com/fridays/next-routes
import { Router } from '../../routes'


const apiInstance = api.create()


/**
 * pobieranie dat do kalendarza
 * @param {*} action 
 */
function* loadCalendar(action) {
  try {
    const { resourceGroupId, zipCode, dateStart } = action
    const apiUrl = `/api/calendar/${resourceGroupId}/${zipCode}/${dateStart}`
    const dates = yield call([apiInstance, apiInstance.get], apiUrl)
    const { Calendar, ResourceTypeId } = dates

    yield put(actions.getCalendarSuccess(Calendar, ResourceTypeId))
  } catch (err) {
    // console.log(err)
    yield put(actions.getCalendarError(err))
  }
}


/**
 * wstepne bookowanie terminu kalendarza
 * @param {*} action 
 */
function* bookCalendar(action) {
  const state = yield select()

  try {
    const { resourceTypeId, timeSlotId, date, time } = action
    let apiUrl = `/api/calendar/lock/${resourceTypeId}/${timeSlotId}/${date}`
    const data = JSON.stringify({})
    
    if (state.order.currentOption > 0) {
      apiUrl += '/' + state.order.optionLocks[0].lockId
    }

    const resp = yield call([apiInstance, apiInstance.post], apiUrl, data)

    const {LockGuid} = resp
    
    yield put(actions.bookCalendarSuccess(LockGuid))
  } catch (err) {
    // console.log(err)
    yield put(actions.bookCalendarError(err))
  }
}

/**
 * przejście do następnego kroku po zabookowaniu terminu w kalendarzu
 * @param {*} action 
 */
function* succeededCalendar(action) {
  yield put(orderActions.chooseDate())
}


/**
 * zamiawianie uslugi
 * @param {*} action 
 */
function* orderCalendar(action) {
  try {
    const state = yield select()
    const { lockGuid, isDoubleReservation, data } = action
    const apiUrl = `/api/calendar/book/${lockGuid}/${isDoubleReservation}`
    const jsonData = JSON.stringify(data)
    
    const resp = yield call([apiInstance, apiInstance.post], apiUrl, data)
    
    const {PaymentUrl, PaymentSessionId} = resp
    
    yield put(actions.orderCalendarSuccess(PaymentUrl, PaymentSessionId))
    yield put(orderActions.setPayment(PaymentUrl, PaymentSessionId, data.Email))

    // !!! odkomentować po właśćiwym skonfigurowaniu strony zwrotnej płatności
    yield put(Router.pushRoute(PaymentUrl))
    // Router.pushRoute('https://www.wikipedia.org/')

  } catch (err) {
    // console.log(err)
    yield put(actions.orderCalendarError(err))
  }
}

/**
 * czyszczenie timeoutu sesji
 * @param {*} action 
 */
function* clearCalendar(action) {
  sessionStorage.removeItem('sessionTimeout')
}


export default [
  takeLatest(types.CALENDAR_DATES_REQUESTED, loadCalendar),
  takeLatest(types.CALENDAR_BOOK_REQUESTED, bookCalendar),
  takeLatest(types.CALENDAR_BOOK_SUCCEEDED, succeededCalendar),
  takeLatest(types.CALENDAR_ORDER_REQUESTED, orderCalendar),
  takeLatest(types.CALENDAR_CLEAR, clearCalendar)
]
