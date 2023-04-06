export default {
  asideWidth(state) {
    if (state.layoutInfo.asideCollapsed) {
      return state.layoutInfo.miniAsideWidth
    } else {
      return state.layoutInfo.fullAsideWidth
    }
  }
}
