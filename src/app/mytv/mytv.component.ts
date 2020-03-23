import { Component, OnInit, PipeTransform, Pipe } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: "safe" })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: "app-mytv",
  templateUrl: "./mytv.component.html",
  styleUrls: ["./mytv.component.css"]
})
export class MytvComponent implements OnInit {
  names: any;
  urls: any;
  private storage: any;
  selectedChannel: any;
  chnName: any;
  chnUrl: any;
  constructor() {
    this.storage = localStorage;
  }

  setUrl(name) {
    this.selectedChannel = this.urls[name];
  }
  ngOnInit() {
    $('.collapse').collapse();
    if (this.storage.getItem("chnlnames"))
      this.names = JSON.parse(this.storage.getItem("chnlnames"));
    else this.names = ["NDTV", "AajTak", "ABVP", "IndiaTV", "NDTV24X7"];

    if (this.storage.getItem("chnlurls"))
      this.urls = JSON.parse(this.storage.getItem("chnlurls"));
    else
      this.urls = {
        NDTV: "https://www.youtube.com/embed/l9ViEIip9q4",
        AajTak: "https://www.youtube.com/embed/_QNJA_wFn-o",
        ABVP: "https://www.youtube.com/embed/NgyPCCa2_qE",
        IndiaTV: "https://www.youtube.com/embed/GWOfBZZvCUM",
        NDTV24X7: "https://www.youtube.com/embed/AFNUeUed8Ro"
      };

    this.selectedChannel = this.urls.NDTV;
  }

  addChannel() {
   
    if (this.names.find(o => o == this.chnName)) {
      this.urls[this.chnName] = this.chnUrl;
     
    } else {
      
      this.names.push(this.chnName);
      this.urls[this.chnName] = this.chnUrl;
    }
    this.storage.setItem("chnlnames", JSON.stringify(this.names));
    this.storage.setItem("chnlurls", JSON.stringify(this.urls));
    this.selectedChannel = this.urls.NDTV;
    this.chnName = "";
    this.chnUrl = "";
  }
}
