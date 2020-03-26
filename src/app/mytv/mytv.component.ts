import { Component, OnInit, PipeTransform, Pipe } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";


@Pipe({ name: "safe" })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
declare let $ : any;
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
    else this.names = ["NDTV", "AajTak", "ABVP", "IndiaTV", "NDTV24X7","News18","RepublicTV","News18CNN","IndiaToday","AJ","EU","DW","SKY","ABC","CNA","SAMA","GEO","DD","LSTV","Sig","Tanix","XT"];

    if (this.storage.getItem("chnlurls"))
      this.urls = JSON.parse(this.storage.getItem("chnlurls"));
    else
      this.urls = {
       NDTV: "https://www.youtube.com/embed/l9ViEIip9q4",
AajTak: "https://www.youtube.com/embed/_QNJA_wFn-o",
ABVP: "https://www.youtube.com/embed/NgyPCCa2_qE",
IndiaTV: "https://www.youtube.com/embed/GWOfBZZvCUM",
NDTV24X7: "https://www.youtube.com/embed/AFNUeUed8Ro",
News18: "https://www.youtube.com/embed/r7r8zrbOOlk",
RepublicTV: "https://www.youtube.com/embed/EFtWrvPV4u8",
News18CNN: "https://www.youtube.com/embed/uDPCMhNfJMY",
IndiaToday: "https://www.youtube.com/embed/l_NIgnb9J2g",
AJ: "https://www.youtube.com/embed/WisZM9CMlTo",
EU: "https://www.youtube.com/embed/6xrJy-1_qS4",
DW: "https://www.youtube.com/embed/NvqKZHpKs-g",
SKY: "https://www.youtube.com/embed/9Auq9mYxFEE",
ABC: "https://www.youtube.com/embed/G-sCNxj2M2M",
CNA: "https://www.youtube.com/embed/U_XsRZXL2Ic",
SAMA: "https://www.youtube.com/embed/KRISUV5Z5RE",
GEO: "https://www.youtube.com/embed/QpoSuyXQKOs",
DD: "https://www.youtube.com/embed/EaOsJRru-YQ",
LSTV: "https://www.youtube.com/embed/WT5Q5d4VI3w",
Sig: "https://www.youtube.com/embed/lDQI9EUGlIA",
Tanix: "https://www.youtube.com/embed/NeZgQe4-knk",
XT: "https://www.youtube.com/embed/jM9weYRUOZM"
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
