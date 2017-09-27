class GeneralStorage {

  constructor() {
    console.log('constructor');
    this.storage = {
      git : 'Its git'
    };
  }

  get( key ) {
    return this.storage[key];
  }

  put( key, val ) {
    return this.storage[key] = val;
  }

}

const storage = new GeneralStorage();

module.exports = storage;