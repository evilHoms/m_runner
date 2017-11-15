class Playlist {
  constructor(tracksCollection, json) {    
    this.htmlList = tracksCollection;
    this.list = JSON.parse(json);
    this.jsonList = json;
  }
  
  add(name, src) {
    this.list[name] = src;
    this.jsonList = JSON.stringify(this.list);
    console.log(this.jsonList);
  }
  
  remove(name) {
    delete this.list[name];
    this.jsonList = JSON.stringify(this.list);
    console.log(this.jsonList);
  }
}