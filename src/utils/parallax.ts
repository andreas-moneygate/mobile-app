export const HEADER_HEIGHT = 45
export const ACCOUNT_CARD_HEIGHT = 55
export const ACCOUNT_ACTION_BUTTONS_HEIGHT = 105
export const MIN_HEIGHT_ACCOUNT_CONTAINER = 190
export const MAX_HEIGHT_ACCOUNT_CONTAINER = 350
export const SNAP_START_THRESHOLD = 50
export const SNAP_STOP_THRESHOLD_ACCOUNT_CONTAINER = 330
export const SNAP_STOP_THRESHOLD_ACCOUNT_DETAILS = 300
export const PARALLAX_HEIGHT_DETAILS = 305

export const parallaxHeightHomeScreen = (item: any, visible: boolean) => {
  if (item.length === 0) {
    return MIN_HEIGHT_ACCOUNT_CONTAINER
  }
  if (item.length === 1) {
    return MIN_HEIGHT_ACCOUNT_CONTAINER + ACCOUNT_ACTION_BUTTONS_HEIGHT
  }

  const numberLastItem = item.length
  const nextHeight = numberLastItem * ACCOUNT_CARD_HEIGHT + MIN_HEIGHT_ACCOUNT_CONTAINER
  if (item.length <= 3) {
    return nextHeight + ACCOUNT_ACTION_BUTTONS_HEIGHT / 2
  } else {
    if (item.length > 3 && visible) {
      return nextHeight + ACCOUNT_ACTION_BUTTONS_HEIGHT
    } else {
      return MAX_HEIGHT_ACCOUNT_CONTAINER + ACCOUNT_ACTION_BUTTONS_HEIGHT
    }
  }
}
