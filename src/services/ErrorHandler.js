/**
 * Created by Ibrahim on 11/09/2017.
 */
function handleError(error) {
  if (error['detail'] === 'Signature has expired') {
    localStorage.removeItem()
  }
}
