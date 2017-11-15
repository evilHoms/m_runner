class Playlist {
  constructor(trackArray) {    
    this.list = trackArray;
    this.htmlList = this.convertToHtml();
  }
  
  convertToHtml() {
    const htmlList = [];
    let hasCurrent = false;
    
    for (let i in this.list) {
      if (this.list.hasOwnProperty(i))
        if (hasCurrent)
          htmlList.push(`<div class="playlist__track" data-url="${this.list[i]}" data-name="${i}">
                          ${i}
                        </div>`);
        else {
          hasCurrent = true;
          htmlList.push(`<div class="playlist__track current" data-url="${this.list[i]}" data-name="${i}">
                          ${i}
                        </div>`);
        }
    }
    
    return htmlList;
  }
  
  add() {
    
  }
  
  remove() {
    
  }
}