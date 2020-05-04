const test =
  process.env.NODE_ENV === 'test'
    ? require('../components/home.vue')
    : /* istanbul ignore next */ () => import(/* webpackChunkName: "home" */ '../components/home.vue')
const classView =
  process.env.NODE_ENV === 'test'
    ? require('../components/creator.vue')
    : /* istanbul ignore next */ () => import(/* webpackChunkName: "creator" */ '../components/creator.vue')
export {
  test,
  classView
}
