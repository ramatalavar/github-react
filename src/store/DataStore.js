let appData = {};

module.exports = {
  saveLocalData(key, val) {
    appData[key] = val;
  },

  getLocalData(key) {
    return appData[key];
  },

  removeData(key) {
    delete appData[key];
  }
}
