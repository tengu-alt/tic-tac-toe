function arraySet() {
  let array = [];
  if (localStorage.getItem('kinds')) {
    array = localStorage.getItem('kinds').split(',');
  }
  return array;
}
export default arraySet;
