import {takeEvery, put, call, fork, all, race, spawn} from '@redux-saga/core/effects';
import {GET_NEWS} from "../constants";
import {getLatestNews, getPopularNews} from "../../api";
import {
  setLatestNewsAction,
  setLatestNewsErrorAction,
  setPopularNewsAction,
  setPopularNewsErrorAction
} from "../actions/actionCreator";

// worker - это непосредтвенно сага или процесс, который будет запускаться,
// в зависимости от выполненого экшена.
// именно в воркерах и описывается вся бизнес логика приложения
// т.е. работа с асинхронным кодом
// описывается логика запросов, работа с браузерным апи

export function* handleLatestNewsWorker() {
  try {
    const {hits} = yield call(getLatestNews, 'react');
    yield put(setLatestNewsAction(hits));
  } catch {
    yield put(setLatestNewsErrorAction())
  }
}

export function* handlePopularNewsWorker() {
  try {
    const {hits} = yield call(getPopularNews);
    yield put(setPopularNewsAction(hits));
  } catch {
    yield put(setPopularNewsErrorAction())
  }


}

// сага объединяющая другие саги
export function* handleNewsWorker() {
  yield spawn(handleLatestNewsWorker);
  yield spawn(handlePopularNewsWorker);

  // yield all([
  //   call(handlePopularNewsWorker),
  //   call(handleLatestNewsWorker)
  // ])

}

// watcher cледит за эшенами. Когда выполняется экшен,
// вотчер производит какое-то определенное действие
// слежение за экшенами, которые работают в приложении
export function* watchClickSaga() {
  yield takeEvery(GET_NEWS, handleNewsWorker);

}

// эффекты - это вспомогательные функции, которые создают объекты,
// внутри которых описываются инструкции выполнения каких-то действий
// и эти дейтсвия будут выполнятся непосредтвенно внутри саги
// take('action') - side эффект выполняется один раз
// takeEvery('action', worker) - side эффект выполняется каждый раз
// takeLatest('action', worker) - выполняет вызов только последней переданной ф-ции
// takeLeading('action', worker) - выполняет вызов первой саги отменив все остальные
// select() - позволяет удобно работать со стором и получать из него нужные нам данные прямо в саге
// put() - аналог диспатча
// call - блокирующий эффект (блокирует, пока запрос не зарезолвится)
// fork - неблокирующий эффект (позволяет выполнить несколько саг параллельно не блокируя их)
// и дает полную независимость параллельным запросам. Чаще используется на реальных проектах!
// all([])  - используются типа как форк но для call и возвращает результат,
// когда выполняются все запросы в массиве. Если хоть один запрос упадет, не вернет ничего
// используется для обработки тяжелых запросов связанных с обработкой полученных данных
// race - тоже самое что и all, но возвращает только тот запрос, который выполнился быстрее
// иногда используется для отмены фоновой задачи, которая выполняется пока что-то не произойдет
// spawn - создает параллельную задачу в корне саги и ее использование не привязано к родителю
// как и форк является неблокирующей задачей

export function* rootSaga() {
  yield watchClickSaga();
}