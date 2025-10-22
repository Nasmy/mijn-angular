webpackJsonp([1], {
    "+OYP": function(e, t) {
        e.exports = '<div class="topbar-row">\n  <div class="row">\n    <div class="col-lg-3  d-none d-sm-none d-md-none d-lg-inline listeInfo">\n      <h2>\n        <img class="logoSPF" id="logoSPF" src="assets/images/_fin_logo_{{getLang().toUpperCase()}}.gif"\n             alt="SPF Finances">\n      </h2>\n    </div>\n    <div class="col-lg-2  d-none  d-lg-inline-block title listeInfo">\n      <h1 class="title">\n        <l key="ecad.title"></l>\n      </h1>\n    </div>\n    <div class="col-lg-4 listeInfo d-lg-inline-block d-none padding-top">\n      <button class="btn btn-fin01"  (click)="goToEcad()"><l key="backToEcad"></l></button>\n    </div>\n    <div id="be-header" class="col-lg-2 d-none d-lg-inline-block listeInfo padding-top">\n      <div class="row be-header-inner">\n        <div class="container">\n          <div class="row region region-be-header">\n            <div id="block-locale-language">\n              <ul class="language-switcher-locale-url">\n                <label-lang-switch></label-lang-switch>\n              </ul>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="col-lg-1 padding-top">\n      <button type="button" class="btn btn-info" (click)="goToMyminfin()"><i\n        class="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp; myMIN<B>FIN</B></button>\n    </div>\n  </div>\n</div>\n<div class="container pat20 " *ngIf="formGroup">\n  <div [formGroup]="formGroup">\n      <table datatable [dtOptions]="dtOptions" [dtTrigger]="dtTrigger"  id="tableData" class="row-border hover" style="width: 100%">\n        <thead>\n        <tr>\n          <th><l key="cms.key"></l></th>\n          <th><l key="cms.edit"></l></th>\n          <th><l key="cms.delete"></l></th>\n        </tr>\n        </thead>\n        <tbody>\n        <ng-container *ngFor="let cmsItem of cmsItems ; let i = index">\n          <tr >\n            <td>{{cmsItem.key}}</td>\n            <td><i class="fa fa-edit" (click)="chooseKey(cmsItem.key)"></i></td>\n            <td><i class="fa fa-trash" (click)="deleteKey(cmsItem.key,i)"></i></td>\n          </tr>\n        </ng-container>\n        </tbody>\n      </table>\n  </div>\n    <div class="row pat20">\n        <div class="col-lg-2"><button class="btn btn-fin01" (click)="exportCMS()">Export</button></div>\n        <div class="col-lg-4"><input class="form-control" type="file" accept=".json" (change)="onFileChange($event)"/> </div>\n        <div class="col-lg-2"><button class="btn btn-fin01" (click)="importCMS()">Import</button></div>\n        <div class="col-lg-2"></div>\n        <div class="col-lg-2">\n        <button class="btn btn-fin01" (click)="openModal(content)"><l key="cms.addkey"></l></button>\n      </div>\n    </div>\n\n\n</div>\n\n<ng-container *ngIf="formGroup && formGroup.get(\'key\').value">\n<div class="container pat30">\n  <ul class="nav nav-tabs" id="myTab" role="tablist">\n    <li class="nav-item">\n      <a class="nav-link" [class.active]="languageSelected === \'NL\'" id="nl-tab" data-toggle="tab" role="tab" aria-controls="nl" aria-selected="true" (click)="changeLanguage(\'NL\')">NL</a>\n    </li>\n    <li class="nav-item">\n      <a class="nav-link"  [class.active]="languageSelected === \'FR\'" id="fr-tab" data-toggle="tab"  role="tab" aria-controls="fr" aria-selected="false" (click)="changeLanguage(\'FR\')">FR</a>\n    </li>\n    <li class="nav-item">\n      <a class="nav-link"   [class.active]="languageSelected === \'DE\'" id="de-tab" data-toggle="tab"  role="tab" aria-controls="de" aria-selected="false" (click)="changeLanguage(\'DE\')">DE</a>\n    </li>\n    <li class="nav-item">\n      <a class="nav-link"  [class.active]="languageSelected === \'EN\'" id="en-tab" data-toggle="tab"  role="tab" aria-controls="en" aria-selected="false" (click)="changeLanguage(\'EN\')">EN</a>\n    </li>\n  </ul>\n</div>\n<br/>\n<div  id="myTabContent">\n  <div  id="nl" role="tabpanel" aria-labelledby="nl-tab" *ngIf="languageSelected === \'NL\' ">\n    <div class="container" [formGroup]="formGroup">\n      <editor [init]="tinyMceSettings" formControlName="nl"></editor>\n    </div>\n  </div>\n  <div  id="fr" role="tabpanel" aria-labelledby="fr-tab"  *ngIf="languageSelected === \'FR\'">\n    <div class="container" [formGroup]="formGroup">\n      <editor [init]="tinyMceSettings" formControlName="fr"></editor>\n    </div>\n  </div>\n  <div id="de" role="tabpanel" aria-labelledby="de-tab" *ngIf="languageSelected === \'DE\'">\n    <div class="container" [formGroup]="formGroup">\n      <editor [init]="tinyMceSettings" formControlName="de"></editor>\n    </div>\n  </div>\n  <div id="en" role="tabpanel" aria-labelledby="en-tab" *ngIf="languageSelected === \'EN\'">\n    <div class="container" [formGroup]="formGroup">\n      <editor [init]="tinyMceSettings" formControlName="en"></editor>\n    </div>\n  </div>\n</div>\n<div class="container padding-both">\n  <div class="row">\n    <div class="col-lg-7">\n    </div>\n    <div class="col-lg-3">\n      <button class="btn btn-fin01" (click)="goToHelpPage()"><l key="cms.goto.help"></l></button>\n    </div>\n    <div class="col-lg-2">\n      <button class="btn btn-fin01" (click)="clickSaveCmsItem(formGroup.get(\'key\').value)"><l key="cms.save"></l></button>\n    </div>\n  </div>\n</div>\n</ng-container>\n<ng-template #content let-modal>\n  <div class="modal-header">\n    <h4 class="modal-title" id="modal-basic-title"><l key="cms.addkey"></l></h4>\n    <button type="button" class="close" aria-label="Close" (click)="closeModal(\'Cross click\')">\n      <span aria-hidden="true">&times;</span>\n    </button>\n  </div>\n  <div class="modal-body">\n      <div class="input-group" >\n        <input class="form-control" [(ngModel)]="tempKey" type="text"/>\n      </div>\n  </div>\n  <div class="modal-footer">\n    <button type="button" class="btn btn-outline-dark" (click)="clickSaveCmsItem(tempKey,true) && closeModal(\'add\')"><l key="add"></l></button>\n  </div>\n</ng-template>\n\n'
    },
    "+XRQ": function(e, t) {
        e.exports = '<div class="form-group pat20">\n  <p class="text-center"><l key="configuration.wizard.step2.title"></l></p>\n  <input-checkbox-boolean label="zoomButton" [formGroup]="formGroup" name="zoomButton"></input-checkbox-boolean>\n  <input-checkbox-boolean label="mapScale" [formGroup]="formGroup" name="mapScale"></input-checkbox-boolean>\n  <input-checkbox-boolean label="coordinates" [formGroup]="formGroup" name="coordinates"></input-checkbox-boolean>\n  <input-checkbox-boolean label="fullscreen" [formGroup]="formGroup" name="fullscreen"></input-checkbox-boolean>\n  <input-checkbox-boolean label="fullExtent" [formGroup]="formGroup" name="fullExtent"></input-checkbox-boolean>\n</div>\n'
    },
    "/BWe": function(e, t) {
        e.exports = '<app-input [label]="label" [name]="name" [inputControl]="formControl" [validationPath]="validationPath"\n           [exceptions]="exceptions" [showLabel]="showLabel">\n  <div class="input-group">\n    <div  *ngIf="appendIcon" class="input-group-append">\n       <button type=\'button\' class=" appendIcon btn" (click)="onAppendClicked()"><icon [code]="appendIcon"></icon></button>\n    </div>\n    <input class="form-control" appDigitOrLetterOnlyDirective [active]="shouldCheck" [drType]="type" [minlength]="minlength"  [maxlength]="maxlength"  type="text" autocomplete="off" [formControl]="formControl" placeholder="{{placeholder | label | async}}"\n         name="{{name}}" >\n     <div *ngIf="prependIcon" class="input-group-prepend">\n         <button type=\'submit\' *ngIf="!pending" class="prependIcon btn" (click)="onPrependClicked()"  ><icon [code]="prependIcon"></icon></button>\n         <span *ngIf="pending" class="prependIcon btn"><i class="fa fa-spin fa-spinner"></i></span>\n     </div>\n    <div *ngIf = "formControl.hasError(\'minlength\') " class = "alert alert-danger">\n      <span>should contain {{minlength}} characters</span>\n    </div> \n    <div class="autocomplete">\n      <div *ngFor="let suggest of suggestion; let i=index">\n        <div class=" row col-lg-12 " *ngIf="i < 5">\n          <li  [ngClass]="{\'col-lg-11\' :true, \'autocomplete-items\': true, \'active\': i === tabIndex}" *ngIf=" suggestionType === \'street\'"   (click)="onSuggestClicked(suggest)" appClickElseWhere (clickElsewhere)="closeAutoComplete()" >\n            {{(suggest.streetName || \'\').toUpperCase() + " " + (suggest.houseNumber || \'\') + " " + (suggest.city || \'\').toUpperCase()  + " " + (suggest.zipCode || \'\')  }}\n          </li>\n          <li [ngClass]="{\'col-lg-11\' :true, \'autocomplete-items\': true, \'active\': i === tabIndex}" *ngIf="suggestionType === \'capakey\'" (click)="onSuggestClicked(suggest)" appClickElseWhere (clickElsewhere)="closeAutoComplete()"  >\n            {{(suggest  || \'\' ).toUpperCase()}}\n          </li>\n          <li  [ngClass]="{\'col-lg-11\' :true, \'autocomplete-items-other\': true, \'active\': i === tabIndex}"  *ngIf="suggestionType === \'other\'" (click)="onSuggestClicked(suggest)" appClickElseWhere (clickElsewhere)="closeAutoComplete()"  >\n            {{(suggest.streetName  || \'\' ).toUpperCase()}}\n          </li>\n        </div>\n      </div>\n    </div>\n  </div>\n</app-input>\n\n'
    },
    "/fTm": function(e, t) {
        e.exports = '<form>\n  <div class="btn-group btn-group-toggle" ngbRadioGroup name="radioBasic" [formControl]="formGroup.get(\'currentSituation\')">\n    <label ngbButtonLabel class="btn-custom">\n      <input ngbButton type="radio" value="CURRENT"> <l key="situation.current"></l>\n    </label>\n    <label ngbButtonLabel class="btn-custom" placement="bottom"\n       ngbTooltip="{{strip_html_tags(situationString[lang()]) }}"  triggers="mouseenter:mouseleave">\n      <input ngbButton type="radio" value="FISCAL"> <l key="situation.fiscal"></l>\n    </label>\n  </div>\n</form>\n'
    },
    0: function(e, t, n) {
        e.exports = n("x35b")
    },
    "0CVn": function(e, t) {
        e.exports = ".margin-left{\n  margin-left: 25px;\n}\n\n.card {\n  word-wrap:normal !important;\n}\n\n.hr{\n  margin-top: 1% !important;\n  margin-bottom: 1%  !important;\n}\n\ntr{\n  width: 100% !important;\n}\n\ntd{\n  width: 100%;\n}\n\n.legendPicture {\n  max-width: 100px;\n  max-height: 100px;\n}\n\n.greyed {\n  color: rgb(185,185,185);\n}\n\n.card{\n  border:0px solid rgba(0,0,0,.125);\n}\n\n.btn-fin01 {\n  background: #fff;\n  color: rgba(3, 174, 216, 1);\n  border : 1px solid  rgba(3, 174, 216, 1);\n}\n\nhr.splitGroup.nopadding {\n  margin-top: 0px;\n}\n\ntable {\n  width: 100%;\n  max-width: 100%;\n}"
    },
    1: function(e, t) {},
    "1B/m": function(e, t) {
        e.exports = '<footer>\n  <div class="row bgfooter">\n    <div class="custom-container">\n      <div class="footer-top">\n        <div class="row">\n          <div class="col-lg-10 col-xs-6 col-md-3 nopadding">\n            <li><l key="myMinFin"></l></li>\n            <li><l key="spfFinance"></l></li>\n          </div>\n          <div class="col-lg-2 nopadding">\n            <img src="assets/images/_fin_logo_{{lang()}}.gif"/>\n          </div>\n        </div>\n      </div>\n      <div class="clearfix"></div>\n      <div class="footer-bot">\n        <div class="col-xs-12 col-md-6 left nopadding">\n          <ul>\n            <li><img src="assets/images/_fin_njr.gif"></li>\n            <span *ngIf="lang() === \'NL\'">\n              <li><a href="https://financien.belgium.be/nl/disclaimer" target="_blank"><l key="footer.disclaimer"></l></a></li>\n              <li><a href="https://www.belgium.be/nl/uw_privacy" target="_blank"><l key="footer.confidentiality"></l></a></li>\n              <li><a href="https://financien.belgium.be/nl/accessibility" target="_blank"><l key="footer.accessibility"></l></a></li>\n            </span>\n            <span *ngIf="lang() === \'FR\'">\n              <li><a href="https://finances.belgium.be/fr/disclaimer" target="_blank"><l key="footer.disclaimer"></l></a></li>\n              <li><a href="https://www.belgium.be/fr/declaration_de_confidentialite" target="_blank"><l key="footer.confidentiality"></l></a></li>\n              <li><a href="https://finances.belgium.be/fr/accessibilite" target="_blank"><l key="footer.accessibility"></l></a></li>\n            </span>\n            <span *ngIf="lang() === \'DE\'">\n              <li><a href="https://finances.belgium.be/de/disclaimer" target="_blank"><l key="footer.disclaimer"></l></a></li>\n              <li><a href="https://www.belgium.be/de/personenbezogene_daten" target="_blank"><l key="footer.confidentiality"></l></a></li>\n              <li><a href="https://finanzen.belgium.be/de/Zug%c3%a4nglichkeit" target="_blank"><l key="footer.accessibility"></l></a></li>\n            </span>\n            <span *ngIf="lang() === \'EN\'">\n              <li><a href="https://finances.belgium.be/en/disclaimer" target="_blank"><l key="footer.disclaimer"></l></a></li>\n              <li><a href="https://www.belgium.be/en/personal_data" target="_blank"><l key="footer.confidentiality"></l></a></li>\n              <li><a href="https://finance.belgium.be/en/accessibility" target="_blank"><l key="footer.accessibility"></l></a></li>\n            </span>\n          </ul>\n        </div>\n        <div class="col-xs-12 col-md-6 right nopadding">\n          \xa9 Copyright <l key="footer.spf"></l>\n          <p>Version : {{projectVersion}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</footer>\n'
    },
    "1JJ7": function(e, t) {
        e.exports = "\n.errorControlJS {\n  padding: 2px;\n  background-color: red;\n  color: white !important;\n}\n"
    },
    "1v17": function(e, t) {
        e.exports = '.topbar-row {\n  height: 10vh;\n  z-index: 1;\n}\n\n.belgium {\n  bottom: 7px;\n  text-align: right;\n}\n\n@media (max-width: 1000px) {\n  .belgium {\n    bottom: 0px;\n  }\n}\n\n.right-align{\n  text-align: right;\n}\n\n@media (max-height: 800px){\n  .lang-switch-row{\n    height: 4vh !important;\n  }\n}\n\n@media (max-height: 800px){\n  .menu-icon{\n    margin-right: 0.5vw;\n    width: 30px !important;\n    background-color: rgba(252, 255, 250, 0.76);\n  }\n\n  .login-icon{\n    width: 5vh !important;\n    height: 5vh !important;\n    padding-top: 8px !important;\n  }\n\n  .login-icon image{\n    width: 100% !important;\n    height: 100% !important;\n    padding-top: 8px !important;\n  }\n}\n\n.lang-switch-row{\n  height: 3vh;\n  border-bottom: solid;\n  border-width: 0.3px;\n  border-bottom-color: lightgray;\n}\n\n.large-title{\n  font-size: 2em;\n}\n\n.title{\n  padding-left: 3vw;\n}\n\n.listeInfo{\n  z-index: 1;\n  padding-top:1.0vh;\n}\n\n.buttonTopbar{\n  z-index: 1;\n  padding-top:0.5vh;\n}\n\n.dots-background{\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, 0))), url("data:image/gif;base64,R0lGODlhdgVaAIABAJeYmv///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjM2RDY0Mjg2ODIyMDY4MTE4QTZERkEyQjZDQjg4QzE2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ2NzA2NzMwMUFFRjExRTdCOUM3QzE0MEMwMzRENjk5IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ2NzA2NzJGMUFFRjExRTdCOUM3QzE0MEMwMzRENjk5IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNkQ2NDI4NjgyMjA2ODExOEE2REZBMkI2Q0I4OEMxNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNkQ2NDI4NjgyMjA2ODExOEE2REZBMkI2Q0I4OEMxNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAEALAAAAAB2BVoAAAL/RH6Godi5WHxy0Tuz1Y7DDXbhJ5bkWZkpio3r26ox68H1bLv4fve6LwPSfsRgcWhMIpc5ZZPJOz6nUWcVKqRmr1op97sNe8VWMnaMLqfP6jb73XXH4eD1/F6X5+nme+QPGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGys7S1tre4ubq7vL2+v7CxwsPExcbHyMnKy8zNzs/AwdLT1NXW19jZ2tvc3d7f0NHi4+Tl5ufo6err7O3u6uvYfXF08/b29Xj3+vt8+n/88PoL+ABAcalCcQYUGFB/MtdNiwH8OJEClKrIjxosaE/xk5bnz4MaLHkSBdvDuJMqXKlSxbunwJM6bMmTRr2ryJM6fOnTx7+vwJNKjQoUSLGj2KNKnSpUybOn0KNarUqVSrWs3UsaRWkVstkuQK1mvXrGHJii0b8qxas2zTtv261q1cuG/HzrVL9y7avHzx+t37d8rVwYQLGz6MOLHixYwbO34MObLkyZQrW76MObPmzZw7e/4MOrTo0aRLmw5aF7DquH1Xp2Yd+LVsvbBd057durZu3LFv+87N2zbw372HGy+OXHjX08ybO38OPbr06dSrW7+OPbv27dy7e/8OPrz48eTLmz+PPj3p4LuJK3/f/jh89vTdx09+f779+vLz+//njx+A+vUn4H/7HUhgWuotyGCDDj4IYYQSTkhhhRZeiGGGGm7IYYcefghiiCKOSGKJWCEYIIoDpphgiyy+uGKMBrooY4E2qjgjjDnWiOONNO4IpI86mkhkkUYeiWSSSi7JZJNOPglllFJOSWWVVl6JZZZabsmOkDz+6GWQPY4JJpk6hommmV+eqaaYZb7JJpxrzulmnMtxiWeeeu7JZ59+/glooIIOSmihhh6KaKKKLspoo+mkKWeddEJq56RtUmpppJhKyummnl4KqqahVtrpqGE5imqqqq7KaquuvgprrLLOSmuttt6Ka6667orhp6L+SqqvwZpaKrCZDmtsscj/Lntss8o6Kyy0xL7Ga7XWXottttpuy2233n4LbrjijktuueaeC1W0z66rbrvTvpusu/HCyyy79Eo7b771yrsvsej+C3DAAg9McMEGH4xwwgovzHDDDj8M8Uz84tuvvhRfbK/FGVfMMcYTb+zxvSCP/HHJfUSMcsoqr8xyyy6/DHPMMs9Mc80234zzUyZrvHPHJIvcc8g8A0300Eb7HPTPRwuNdA05Pw111FJPTXXVVl+NddZab811115DmHTYRTe9tNJkn8102marLXbZbaO9dtxmfU133XbfjXfeeu/Nd99+/w144IKr/DbbYxvu9uFyK1744ok/DnfjkjNOeX+DQF+Oeeaab855555/Dnrooo9OeunvTA454pFXvnrqjrcOu+qyvz476rHTrpvpuu/Oe+++/w588MIPT3zxxh+/agEAOw==");\n  background-image: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), url("data:image/gif;base64,R0lGODlhdgVaAIABAJeYmv///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjM2RDY0Mjg2ODIyMDY4MTE4QTZERkEyQjZDQjg4QzE2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ2NzA2NzMwMUFFRjExRTdCOUM3QzE0MEMwMzRENjk5IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ2NzA2NzJGMUFFRjExRTdCOUM3QzE0MEMwMzRENjk5IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNkQ2NDI4NjgyMjA2ODExOEE2REZBMkI2Q0I4OEMxNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNkQ2NDI4NjgyMjA2ODExOEE2REZBMkI2Q0I4OEMxNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAEALAAAAAB2BVoAAAL/RH6Godi5WHxy0Tuz1Y7DDXbhJ5bkWZkpio3r26ox68H1bLv4fve6LwPSfsRgcWhMIpc5ZZPJOz6nUWcVKqRmr1op97sNe8VWMnaMLqfP6jb73XXH4eD1/F6X5+nme+QPGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGys7S1tre4ubq7vL2+v7CxwsPExcbHyMnKy8zNzs/AwdLT1NXW19jZ2tvc3d7f0NHi4+Tl5ufo6err7O3u6uvYfXF08/b29Xj3+vt8+n/88PoL+ABAcalCcQYUGFB/MtdNiwH8OJEClKrIjxosaE/xk5bnz4MaLHkSBdvDuJMqXKlSxbunwJM6bMmTRr2ryJM6fOnTx7+vwJNKjQoUSLGj2KNKnSpUybOn0KNarUqVSrWs3UsaRWkVstkuQK1mvXrGHJii0b8qxas2zTtv261q1cuG/HzrVL9y7avHzx+t37d8rVwYQLGz6MOLHixYwbO34MObLkyZQrW76MObPmzZw7e/4MOrTo0aRLmw5aF7DquH1Xp2Yd+LVsvbBd057durZu3LFv+87N2zbw372HGy+OXHjX08ybO38OPbr06dSrW7+OPbv27dy7e/8OPrz48eTLmz+PPj3p4LuJK3/f/jh89vTdx09+f779+vLz+//njx+A+vUn4H/7HUhgWuotyGCDDj4IYYQSTkhhhRZeiGGGGm7IYYcefghiiCKOSGKJWCEYIIoDpphgiyy+uGKMBrooY4E2qjgjjDnWiOONNO4IpI86mkhkkUYeiWSSSi7JZJNOPglllFJOSWWVVl6JZZZabsmOkDz+6GWQPY4JJpk6hommmV+eqaaYZb7JJpxrzulmnMtxiWeeeu7JZ59+/glooIIOSmihhh6KaKKKLspoo+mkKWeddEJq56RtUmpppJhKyummnl4KqqahVtrpqGE5imqqqq7KaquuvgprrLLOSmuttt6Ka6667orhp6L+SqqvwZpaKrCZDmtsscj/Lntss8o6Kyy0xL7Ga7XWXottttpuy2233n4LbrjijktuueaeC1W0z66rbrvTvpusu/HCyyy79Eo7b771yrsvsej+C3DAAg9McMEGH4xwwgovzHDDDj8M8Uz84tuvvhRfbK/FGVfMMcYTb+zxvSCP/HHJfUSMcsoqr8xyyy6/DHPMMs9Mc80234zzUyZrvHPHJIvcc8g8A0300Eb7HPTPRwuNdA05Pw111FJPTXXVVl+NddZab811115DmHTYRTe9tNJkn8102marLXbZbaO9dtxmfU133XbfjXfeeu/Nd99+/w144IKr/DbbYxvu9uFyK1744ok/DnfjkjNOeX+DQF+Oeeaab855555/Dnrooo9OeunvTA454pFXvnrqjrcOu+qyvz476rHTrpvpuu/Oe+++/w588MIPT3zxxh+/agEAOw==");\n  background-repeat: repeat;\n}\n\n.searchbar{\n  padding-top: 0.5vh;\n}\n\n.fin-logo{\n  height: 5vw;\n  padding-top: -5vw;\n  float: left;\n}\n\n#logoSPF {\ndisplay: inline-block;\n}\n\nh1 {\n padding-left: 4vw;\n}\n\n.menu-icon{\n  margin-right: 0.5vw;\n  width: 40px;\n  background-color: rgba(252, 255, 250, 0.76);\n}\n\n.logo-be{\n  width: 28px;\n  height: 20.125px;\n}\n\n.grey-transparent{\n  background-color: rgba(252, 255, 250, 0.76);\n}\n\n.grey-transparent:hover {\n  background-color: rgba(3, 174, 216, 0.51);\n}\n\n.logoSPF {\n  width: 8vw;\n}\n\n@media screen and (max-width: 800px) {\n  .menu-icon {\n    margin-right: 1vw;\n    width: 3vw;\n  }\n}\n\n@media screen and (max-height: 800px) {\n  .listeInfo {\n    padding-top: 1px;\n  }\n}\n\n.language-switcher-locale-url li{\n  display: inline;\n}\n\n.btn-info {\n  text-transform: none !important;\n\n}\n\n.margin-left{\n  margin-left: 80px !important;\n}\n\n.info-logo{\n  font-size: 5vw;\n  color: rgba(3,174,216,1);\n  background-color: white;\n  width: 80%;\n  height: 80%;\n  border-radius: 50%;\n  text-align: center;\n  line-height: 80%;\n  vertical-align: middle;\n  padding: 0px;\n}\n\n.info-logo-grey{\n  font-size: 5vw;\n  color: grey;\n  background-color: white;\n  width: 80%;\n  height: 80%;\n  border-radius: 50%;\n  text-align: center;\n  line-height: 80%;\n  vertical-align: middle;\n  padding: 0px;\n}\n\n.infoPopup{\n  position:fixed;\n  width: 5vw;\n  height: 5vw;\n  top:20vh;\n  -webkit-animation: right 2s;\n  animation: right 2s;\n  right:0;\n  padding: 0;\n  text-align:center;\n  z-index: 2;\n}\n\n.couches{\n  position:fixed;\n  width: 5vw;\n  height: 5vw;\n  top:30vh;\n  -webkit-animation: right 2s;\n  animation: right 2s;\n  right:0;\n  padding: 0;\n  text-align:center;\n  z-index: 2;\n}\n\n.legende{\n  position:fixed;\n  width:5vw;\n  height:5vw;\n  -webkit-animation: right 2s;\n  animation: right 2s;\n  top:40vh;\n  right:0;\n  padding: 0;\n  text-align:center;\n  z-index: 2;\n}\n\n.outils{\n  position:fixed;\n  padding: 0;\n  width:5vw;\n  height:5vw;\n  -webkit-animation: right 2s;\n  animation: right 2s;\n  top:50vh;\n  right:0;\n  text-align:center;\n  z-index: 2;\n}\n\n.my-float{\n  margin-top:22px;\n}\n\n.container{\n  -webkit-box-shadow: -10px 0px 10px 0px #0000;\n          box-shadow: -10px 0px 10px 0px #0000;\n}\n\n.sidebar{\n  position:fixed;\n  overflow:auto;\n  width:0;\n  -webkit-transition: width 250ms;\n  transition: width 250ms;\n  right:0;\n  top:0%;\n  background-color: rgb(255, 255, 255);\n  z-index: 1;\n  height:100%;\n  -webkit-box-shadow: -3px 0px 11px -3px #000;\n          box-shadow: -3px 0px 11px -3px #000;\n}\n\n.downbar{\n  position:fixed;\n  overflow:hidden;\n  height:0;\n  -webkit-transition: width 250ms;\n  transition: width 250ms;\n  right:0;\n  bottom:0%;\n  background-color: rgb(255, 255, 255);\n  -webkit-box-shadow: 0px -2px 10px 0px rgba(0,0,0,0.75);\n  box-shadow: 0px -2px 10px 0px rgba(0,0,0,0.75);\n  z-index: 6;\n  width:100%;\n}\n\n.content{\n  padding-top: 15%;\n  font-size: 3vw;\n  vertical-align: top;\n  padding-bottom:25%;\n}\n\n.padding-top{\n  padding-top: 10px;\n}\n\n.title{\n  padding-top: 5px;\n}\n\n.btn.focus, .btn:focus {\n  outline: 0;\n  -webkit-box-shadow: 0 0 0 0rem rgba(0,123,255,.25);\n  box-shadow: 0 0 0 0rem rgba(0,123,255,.25);\n}\n\n.card{\n  border:0px solid rgba(0,0,0,.125);\n}\n\nhr.splitGroup {\n  border-top : solid 2px #353535;\n}\n\n.padHor{\n  padding-right:20px;\n  padding-left: 20px;\n}\n\n.dark-blue {\n  color: #0c56d8 !important;\n}\n\n.light-blue {\n  color: #41d4eb !important;\n}\n'
    },
    2: function(e, t) {},
    "4/9e": function(e, t) {
        e.exports = '<app-input [label]="name" [validationPath]="validationPath" [exceptions]="exceptions" >\n  <div class="input-group">\n  <select class="form-control" [formControl]="appState.get(name)" name="{{name}}">\n    <option hidden value="vide">-- select --</option>\n    <option class="option" *ngFor="let item of items" value="{{item}}">\n      <l key="inputsList.{{item}}"></l>\n    </option>\n  </select>\n    <div class="input-group-append">\n      <button class="btn-fin01 btn" *ngIf="icon && icon !== \'\'" (click)="callback.emit()"> <icon [code]="icon"></icon></button>\n    </div>\n  </div>\n</app-input>\n\n'
    },
    "4gyM": function(e, t) {
        e.exports = '\n.ol-popup {\n  position: absolute;\n  background-color: white;\n  -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));\n  filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));\n  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  padding: 0.938em;\n  border-radius: 0.625em;\n  border: 0.063em solid #cccccc;\n  bottom: 0.750em;\n  left: -3.125em; \n  min-width: 24em; \n  width: 25.2em;\n}\n.ol-popup:after, .ol-popup:before {\n  top: 100%;\n  /*border: solid transparent;*/\n  content: " ";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n}\n.ol-popup:after {\n  border-top-color: white;\n  border-width: 0.625em;\n  left: 3em;\n  margin-left: -0.625em;\n}\n.ol-popup:before {\n  border-top-color: #cccccc;\n  border-width: 0.688em  ;\n  left: 3em;\n  margin-left: -0.688em  ; \n}\n.ol-popup-closer {\n  text-decoration: none;\n  position: absolute;\n  right: 0.313em;\n}\n.ol-popup-closer:after {\n  content: "\u2716";\n}\na{\n  color:black;\n}\n.popup-header{\n  font-weight: bold;\n  font-size: 1em;\n  padding-top: 0.094em;\n\n}\n.scrollable {\n  max-height: 18.750em;\n  min-height:6.250em;\n  overflow:auto; \n}\n.accordion {\n  background-color: white;\n  color: black;\n  cursor: pointer;\n  width: 100%;\n  border: none;\n  text-align: left;\n  outline: none;\n  font-size: 0.781em;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n  text-indent: 0.625em;\n}\n.active, .accordion:hover {\n  background-color: #ccc;\n}\n.accordion:after {\n  font-family: \'FontAwesome\';\n  content: "\\f0d7";\n  color: black;\n  font-weight: bold;\n  float:right;\n}\n.active:after {\n  content: "\\f0d8";\n  float:right;\n}\n.panel {\n  padding: 0 0.725em; \n  background-color: white;\n  max-height: 0;\n  overflow: hidden;\n  -webkit-transition: max-height 0.2s ease-out;\n  transition: max-height 0.2s ease-out;\n}\n.hrStyle{\n  display: inline;\n\n}\nhr{\n  margin-top: 0.4rem;\n  margin-bottom: 0.4rem;\n}\ncode{\n  color: blue;\n  font-weight:bold;\n  font-size:  0.95em;\n}\n.keyLabel{\n  font-size:0.9em;\n}\n.col-lg-1, .col-1, .col-lg-2, .col-2, .col-lg-9, .col-9 ,.col-lg-11, .col-11,.col-lg-10, .col-10{\n\n     padding-right: 0px; \n     padding-left: 0px; \n}\n'
    },
    "5dgJ": function(e, t) {
        e.exports = ""
    },
    "5xMp": function(e, t) {
        e.exports = '\x3c!--The content below is only a placeholder and can be replaced.--\x3e\n<div id="wrapper">\n  <router-outlet></router-outlet>\n</div>\n<div id="warning-message">\n  this website is only viewable in landscape mode\n</div>\n<simple-notifications [options]="notificationOption"></simple-notifications>\n\n\n\n\n'
    },
    "60+X": function(e, t) {
        e.exports = '\n<table>\n  <ng-container *ngFor="let map of userLayer; let i = index">\n    <hr style="margin-top: 0rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n    <div class="row" *ngIf="!isMapEmpty(map)">\n        <div class="col-lg-1 col-1">\n            <input type="checkbox" [checked]="map.get(\'header\').active"\n              [(ngModel)]="map.get(\'header\').active"\n              (ngModelChange)="updateWMSVisibility(map)" />\n          </div>\n      <div class="col-lg-7 col-7 info-lvl-2">\n         <p> {{map.get(\'header\').title}} </p>\n      </div>\n      <div class="col-lg-2 col-2">\n        <i class="fa fa-angle-double-up pointer" (click)="moveUp(i)"></i>\n        <i class="fa fa-angle-double-down pointer" (click)="moveDown(i)"></i>\n      </div>\n      <div class="col-lg-1 col-1">\n          <i *ngIf="getUserMapPermission(map,\'deletion\')" (click)="removeWMS(map,i)" class="fa fa-remove pointer"></i>\n      </div>\n      <div class="col-lg-1 col-1">\n        <i class="fa fa-caret-up pointer" *ngIf="!map.get(\'header\').hidden"\n          (click)="hideSGroup(map)"></i>\n        <i class="fa fa-caret-down pointer" *ngIf="map.get(\'header\').hidden"\n          (click)="hideSGroup(map)"></i>\n      </div>\n  </div>\n    <ng-container *ngIf="!map.get(\'header\').hidden">    \n  <tr *ngFor="let layer of getKeys(map.get(\'layers\'))">\n    <td>\n      <div class="row" *ngIf="map.get(\'layers\').get(layer)">\n        <div class="col-lg-12 col-12 nopadding">\n          <div class="row">\n            <div class="col-lg-1 col-1">\n              <input type="checkbox" [checked]="map.get(\'layers\').get(layer).active" [(ngModel)]="map.get(\'layers\').get(layer).active"\n                     (ngModelChange)="updateUserLayer()" />\n            </div>\n            <div class="col-lg-6 col-6 info-lvl-4">\n              <p>{{map.get(\'layers\').get(layer).name}}</p>\n            </div>\n            <div class="col-lg-1 col-1">\n            </div>\n            <div class="col-lg-1 col-1">\n              <i class="fa fa-eye pointer" (click)="showOpacity(map.get(\'layers\').get(layer))"></i>\n            </div>\n            <div class="col-lg-1 col-1">\n              <i *ngIf="map.get(\'layers\').get(layer).moreInformation" class="fa fa-caret-up pointer"\n                 (click)="showMoreInformationFor(map.get(\'layers\').get(layer))"></i>\n              <i *ngIf="!map.get(\'layers\').get(layer).moreInformation" class="fa fa-caret-down pointer "\n                 (click)="showMoreInformationFor(map.get(\'layers\').get(layer))"></i>\n            </div>\n\n          </div>\n          <div class="row">\n            <div class="col-lg-12 col-12 nopadding">\n              <div class="row" *ngIf="map.get(\'layers\').get(layer).showOpacity">\n                <hr\n                  style="margin-top: 0.5rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                <div class="col-lg-1 col-1"><i class="fa fa-eye pointer"></i></div>\n                <div class="col-lg-9 col-9">\n                  <label for="myRange">\n                    <l key="layer.opacity"></l>\n                  </label>\n                  <div class="row">\n                    <label>0</label>\n                    &nbsp;\n                    <input type="range" class="slider" id="myRange" min="0" max="1" value="0"  step="0.1"\n                           [(ngModel)]="map.get(\'layers\').get(layer).opacity" (ngModelChange)="updateUserLayer()">\n                    <label>100</label>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class="row" *ngIf="map.get(\'layers\').get(layer).moreInformation">\n          <div class="col-lg-12 col-12 nopadding">\n            <l key="layer.legend"></l>\n            <img class="legendPicture" [src]="map.get(\'layers\').get(layer).legendUrl" />\n          </div>\n        </div>\n      </div>\n    </td>\n  </tr>\n  <tr *ngFor="let group of getKeys(map.get(\'groups\'))">\n    <td class="row" *ngIf="!checkIfGroupEmpty(map.get(\'groups\').get(group))">\n      <div class="col-lg-10 col-2">\n         {{group}}\n      </div>\n      <div class="col-lg-2 col-2">\n        <i class="fa fa-caret-up pointer" *ngIf="!map.get(\'groups\').get(group).hidden"\n           (click)="hideGroup(map.get(\'groups\').get(group))"></i>\n        <i class="fa fa-caret-down pointer" *ngIf="map.get(\'groups\').get(group).hidden"\n           (click)="hideGroup(map.get(\'groups\').get(group))"></i>\n      </div>\n      <div class="col-lg-12" *ngFor="let subGroup of getKeys(map.get(\'groups\').get(group).get(\'groups\'))">\n        <div class="col-lg-10 col-2">\n          {{subGroup}}\n        </div>\n        <div class="col-lg-2 col-2">\n          <i class="fa fa-caret-up pointer" *ngIf="!map.get(\'groups\').get(group).get(\'groups\').get(subGroup).hidden"\n             (click)="hideGroup(map.get(\'groups\').get(group).get(\'groups\').get(subGroup))"></i>\n          <i class="fa fa-caret-down pointer" *ngIf="map.get(\'groups\').get(group).get(\'groups\').get(subGroup).hidden"\n             (click)="hideGroup(map.get(\'groups\').get(group).get(\'groups\').get(subGroup))"></i>\n        </div>\n        <div class="col-lg-12" *ngFor="let layer of getKeys(map.get(\'groups\').get(group).get(\'groups\').get(subGroup)); let i = index">\n          <div class="row" *ngIf="!map.get(\'groups\').get(group).get(\'groups\').get(subGroup).hidden && map.get(\'groups\').get(group).get(\'groups\').get(subGroup).get(layer) ">\n            <hr/>\n            <div class="col-lg-1 col-1">\n              <input type="checkbox" [checked]="map.get(\'groups\').get(group).get(\'groups\').get(subGroup).get(layer).active"\n                     [(ngModel)]="map.get(\'groups\').get(group).get(\'groups\').get(subGroup).get(layer).active"\n                     (ngModelChange)="updateUserLayer()" />\n            </div>\n            <div class="col-lg-8 col-8 info-lvl-4">\n              <p style="margin-bottom: 0px">{{layer}}</p>\n            </div>\n            <div class="col-lg-1 col-1">\n              <i *ngIf="map.get(\'groups\').get(group).get(\'groups\').get(subGroup).get(layer).moreInformation"\n                 class="fa fa-caret-up pointer"\n                 (click)="showMoreInformationFor(map.get(\'groups\').get(group).get(\'groups\').get(subGroup).get(layer))"></i>\n              <i *ngIf="!map.get(\'groups\').get(group).get(\'groups\').get(subGroup).get(layer).moreInformation"\n                 class="fa fa-caret-down pointer"\n                 (click)="showMoreInformationFor(map.get(\'groups\').get(group).get(\'groups\').get(subGroup).get(layer))"></i>\n            </div>\n            <div class="col-lg-1 col-1">\n              <i class="fa fa-eye pointer" (click)="showOpacity(map.get(\'groups\').get(group).get(\'groups\').get(subGroup).get(layer))"></i>\n            </div>\n\n          </div>\n          <div class="row col-lg-12 col-12" *ngIf="map.get(\'groups\').get(group).get(\'groups\').get(subGroup).get(layer).moreInformation">\n            <hr style="margin-top: 0rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n            <div class="col-lg-1 col-1"></div>\n            <div class="col-lg-8 col-8">\n              <l key="layer.legend"></l>\n              <p style="margin-bottom: 5px"></p>\n              <img [src]="map.get(\'groups\').get(group).get(\'groups\').get(subGroup).get(layer).legendUrl" />\n            </div>\n          </div>\n          <div class="row col-lg-12 col-12" *ngIf="map.get(\'groups\').get(group).get(\'groups\').get(subGroup).get(layer).showOpacity">\n            <hr style="margin-top: 0.5rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n            <div class="col-lg-1 col-1"></div>\n            <div class="col-lg-8 col-8">\n              <label for="myRange">\n                <l key="layer.opacity"></l>\n              </label>\n              <div class="row">\n                <label>0</label>\n                &nbsp;\n                blabla: {{map.get(\'groups\').get(group).get(\'groups\').get(subGroup).get(layer).layer.opacity}}\n                <input type="range" class="slider" id="myRange" min="0" max="1"  step="0.1"\n                       [(ngModel)]="map.get(\'groups\').get(group).get(\'groups\').get(subGroup).get(layer).opacity"\n                       (ngModelChange)="updateUserLayer()">\n                <label>100</label>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-12" *ngFor="let layer of getKeys(map.get(\'groups\').get(group).get(\'layers\')); let i = index">\n        <div class="row" *ngIf="!map.get(\'groups\').get(group).hidden && map.get(\'groups\').get(group).get(\'layers\').get(layer)">\n          <hr/>\n          <div class="col-lg-1 col-1">\n            <input type="checkbox" [checked]="map.get(\'groups\').get(group).get(\'layers\').get(layer).active"\n                   [(ngModel)]="map.get(\'groups\').get(group).get(\'layers\').get(layer).active"\n                   (ngModelChange)="updateUserLayer()" />\n          </div>\n          <div class="col-lg-8 col-8 info-lvl-4">\n            <p style="margin-bottom: 0px">{{layer}}</p>\n          </div>\n          <div class="col-lg-1 col-1">\n            <i *ngIf="map.get(\'groups\').get(group).get(\'layers\').get(layer).moreInformation"\n               class="fa fa-caret-up pointer"\n               (click)="showMoreInformationFor(map.get(\'groups\').get(group).get(\'layers\').get(layer))"></i>\n            <i *ngIf="!map.get(\'groups\').get(group).get(\'layers\').get(layer).moreInformation"\n               class="fa fa-caret-down pointer"\n               (click)="showMoreInformationFor(map.get(\'groups\').get(group).get(\'layers\').get(layer))"></i>\n          </div>\n          <div class="col-lg-1 col-1">\n            <i class="fa fa-eye pointer" (click)="showOpacity(map.get(\'groups\').get(group).get(\'layers\').get(layer))"></i>\n          </div>\n\n          <div class="row col-lg-12 col-12" *ngIf="map.get(\'groups\').get(group).get(\'layers\').get(layer).moreInformation">\n            <hr style="margin-top: 0rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n            <div class="col-lg-1 col-1"></div>\n            <div class="col-lg-8 col-8">\n              <l key="layer.legend"></l>\n              <p style="margin-bottom: 5px"></p>\n              <img [src]="map.get(\'groups\').get(group).get(\'layers\').get(layer).legendUrl" />\n            </div>\n          </div>\n          <div class="row col-lg-12 col-12" *ngIf="map.get(\'groups\').get(group).get(\'layers\').get(layer).showOpacity">\n            <hr style="margin-top: 0.5rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n            <div class="col-lg-1 col-1"></div>\n            <div class="col-lg-8 col-8">\n              <label for="myRange">\n                <l key="layer.opacity"></l>\n              </label>\n              <div class="row">\n                <label>0</label>\n                &nbsp;\n                <input type="range" class="slider" id="myRange" min="0" max="1" value="1" step="0.1"\n                       [(ngModel)]="map.get(\'groups\').get(group).get(\'layers\').get(layer).opacity"\n                       (ngModelChange)="updateUserLayer()">\n                <label>100</label>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </td>\n  </tr>\n</ng-container>\n</ng-container>\n</table>\n'
    },
    "6IWf": function(e, t) {
        e.exports = '<div class="form-group">\n  <div class="row">\n    <div [ngClass]="{\'col-lg-5\': showLabel , \'col-lg-1\': !showLabel}" *ngIf="showLabel">\n      <l *ngIf="label" [key]="label"></l>\n    </div>\n    <div [ngClass]="{\'col-lg-7\': showLabel , \'col-lg-12\': !showLabel}">\n      <ng-content></ng-content>\n \n\n      <div *ngIf="this.inputControl">\n        <div *ngIf="this.getExceptions()">\n        <div *ngFor="let exception of this.getExceptions()">\n          <div *ngIf="exception.type === \'VALIDATION\'" class="infobulle-danger">\n          <l key="ERROR.{{exception[\'errorCode\']}}"></l>\n          </div>\n        </div>\n        </div>\n      </div>\n\n\n\n    </div>\n  </div>\n</div>\n'
    },
    "6YaK": function(e, t) {
        e.exports = ".dual-list {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n  }\n  \n  .dual-list .list {\n    width: 40%;\n    border: 1px solid #ddd;\n    border-radius: 8px;\n  }\n  \n  .dual-list .list .panel-heading {\n    border-top-left-radius: 8px;\n    border-top-right-radius: 8px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -ms-flex-item-align: center;\n        align-self: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n  }\n  \n  .dual-list .list ul {\n    overflow-x: hidden;\n    overflow-y: auto;\n    position: relative;\n    max-height: 265px;\n    min-height: 265px;\n  }\n  \n  .dual-list .list ul li:last-child {\n    border-bottom-left-radius: 8px;\n    border-bottom-right-radius: 8px;\n  }\n  \n  .dual-list .list ul li label, .list ul li {\n    cursor: pointer;\n  }\n  \n  .dual-list .btn-group-vertical {\n    padding: 0 25px;\n  }\n  \n  .dual-list .btn-group-vertical .add {\n    border-top-right-radius: 40px;\n    border-top-left-radius: 40px;\n  }\n  \n  .dual-list .btn-group-vertical .remove {\n    border-bottom-right-radius: 40px;\n    border-bottom-left-radius: 40px;\n  }\n  \n  "
    },
    "6oju": function(e, t) {
        e.exports = '<input *ngIf="!value" class="form-control" type="file" name="{{name}}" (change)="fileChange($event)" accept="application/xml">\n<p *ngIf="progress && pending">\n  <ngb-progressbar [striped]="true" type="info" [value]="progress" [max]="105"></ngb-progressbar>\n</p>\n<div *ngIf="value">\n  <a href="{{url()}}">{{fileName}}</a>\n  <button (click)="reset()">X</button>\n</div>\n<div *ngIf="value && value.error">\n  <error [value]="value.error"></error>\n</div>\n'
    },
    "97RH": function(e, t) {
        e.exports = '<div class="form-group pat20">\n  <p class="text-center"><l key="configuration.wizard.step3.title"></l></p>\n  <input-checkbox-boolean label="backdropMenu" [formGroup]="formGroup" name="backdropMenu"></input-checkbox-boolean>\n  <input-checkbox-boolean label="layerMenu" [formGroup]="formGroup" name="layerMenu"></input-checkbox-boolean>\n  <input-checkbox-boolean label="configMenu" [formGroup]="formGroup" name="configMenu"></input-checkbox-boolean>\n  <input-checkbox-boolean label="visibility" [formGroup]="formGroup.get(\'topbar\')" name="visibility"></input-checkbox-boolean>\n  <div class="form-group padding-left" *ngIf="formGroup.get(\'topbar\').get(\'visibility\').value">\n    <input-checkbox-boolean label="languageMenu" [formGroup]="formGroup.get(\'topbar\')" name="languageMenu"></input-checkbox-boolean>\n    <input-checkbox-boolean label="search" [formGroup]="formGroup.get(\'topbar\')" name="search"></input-checkbox-boolean>\n    <input-checkbox-boolean label="infoMenu" [formGroup]="formGroup.get(\'topbar\')" name="infoMenu"></input-checkbox-boolean>\n    <input-checkbox-boolean label="userMenu" [formGroup]="formGroup.get(\'topbar\')" name="userMenu"></input-checkbox-boolean>\n    <input-checkbox-boolean label="shareMenu" [formGroup]="formGroup.get(\'topbar\')" name="shareMenu"></input-checkbox-boolean>\n  </div>\n</div>\n'
    },
    "97SK": function(e, t) {
        e.exports = ".select-style {\n    border: 1px solid #ccc;\n    width: 120px;\n    border-radius: 3px;\n    overflow: hidden;\n  }\n\n.labelRadio{\n  font-weight: bold;\n}\n\n.table{\n  font-size: 14px;\n}\n\n.table td, .table th {\n  padding: .25rem .25rem .25rem .33rem;\n  vertical-align: top;\n  border-top: 1px solid #dee2e6;\n}\n\n.fa-arrow-circle-o-right{\n  color: #03aed8;\n}\n\n.grey-transparent{\n  background-color: transparent;\n  outline: none !important;\n}\n\n.padding{\n  padding-top: 10px;\n  padding-left: 25px;\n}"
    },
    "9Th9": function(e, t) {
        e.exports = '<div\n  *ngIf="(this.appState.get(\'cadex\').get(\'action\').value === \'select\' || this.appState.get(\'cadex\').get(\'action\').value === \'print\') && this.appState.get(\'cadex\').get(\'uid\').value != null && this.appState.get(\'cadex\').get(\'returnUrl\').value != null">\n  <button type="button"\n          class="btn button_export_to_cadex"\n          container="body" triggers="mouseenter:mouseleave"\n          placement="right" ngbPopover="{{strip_html_tags(cancelReturnMyMinfin[lang()]) }}" (click)="exportToCadex()">\n  </button>\n</div>\n<div\n  *ngIf="this.appState.get(\'cadex\').get(\'active\').value === true">\n  <button type="button"\n          class = "btn button_help_cadex"\n          container="body" triggers="mouseenter:mouseleave"\n          placement="right" ngbPopover="{{ strip_html_tags(helpCadex[lang()]) }}" (click)="goToHelpCadex()">\n  </button>  \n</div>\n'
    },
    Cnq1: function(e, t) {
        e.exports = '<div>\n\n  <app-dual-list (updateLists)="leftList=$event.leftList; rightList=$event.rightList" [leftList]="leftList"\n                 [rightList]="rightList"></app-dual-list>\n  <div style="margin-left:6em;">\n    <div class="row" style="width: 500px; margin-top:2em;">\n      <div class="col-lg-6">\n        <button class="btn btn-fin01" (click)="sendToVp()">\n          <l key="vp.send"></l>\n        </button>\n      </div>\n      <div class="col-lg-6">\n        <button class="btn btn-fin01" (click)="refresh()">\n          <l key="vp.refresh"></l>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n'
    },
    CvZ1: function(e, t) {
        e.exports = ".printLoading{\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  /*background-color: rgba(255,255,255,0.7);*/\n}\n\n.padding-9{\n  padding-top: 9px;\n  padding-right: 2px;\n}\n\n.bold-title{\n  font-weight: bold;\n}\n"
    },
    Dp02: function(e, t) {
        e.exports = '<div class="card">\n  <div class="card-title">\n\n  </div>\n  <div class="card-body">\n    <div class="row">\n      <div class="col-lg-12">\n        <div class="form-group">\n        <label for="divisionSearch"><l key="divisionSearch"></l></label>\n        <div class="input-group" [formGroup]="formGroup">\n          <input class="form-control" id="divisionSearch" formControlName="division" />\n        </div>\n        </div>\n      </div>\n    </div>\n  <table class="table" *ngIf="divisionResults && divisionResults.length > 0 && formGroup.get(\'division\').value !== \'\' ">\n    <tr>\n      <th><l key="divisionNumber"></l></th>\n      <th><l key="divisionNameFr"></l></th>\n      <th><l key="divisionNameNl"></l></th>\n      <th><l key="divisionNameDe"></l></th>\n    </tr>\n    <tr *ngFor="let division of divisionResults; let i=index" (click)="closeModalWithCadikey(division.cadikey)" class="divisionRow">\n      <ng-container *ngIf="i < 10">\n        <td>{{division.cadikey}}</td>\n        <td>{{division.namefre}}</td>\n        <td>{{division.namedut}}</td>\n        <td>{{division.nameger}}</td>\n      </ng-container>\n    </tr>\n  </table>\n  </div>\n</div>\n'
    },
    DxUx: function(e, t) {
        e.exports = ".button_export_to_cdms {\n    background-color: white;\n    background-image: url('fin-bt-cancel-myminfin.879111557fbc1256d82c.svg')  !important;\n    position: fixed;\n    top: 8px !important;\n    left: 75px !important;\n    border-style: solid;\n    border-color: black;\n    border-width: 1px;\n    height: 40px !important;\n    width:40px !important;\n  }\n  \n  .button_export_to_cdms:hover {\n    cursor: pointer;\n    background-color: white !important;\n    border-radius: 0 !important;\n  }\n  \n  .button_help_cdms {\n    background-color: white;\n    background-image: url('fin-bt-quickhelp-blue.3c39f7dfbe3ad9ef4dfe.svg')  !important;\n    position: fixed;\n    top: 95px !important;\n    left: 23px !important;\n    border-style: solid;\n    border-color: black;\n    border-width: 1px;\n    height: 40px !important;\n    width:40px !important;\n  }\n  \n  .button_help_cdms:hover {\n    cursor: pointer;\n    background-color: white !important;\n    border-radius: 0 !important;\n  }\n  "
    },
    EDZV: function(e, t) {
        e.exports = '<div class="modal-header">\n  <h4 class="modal-title" id="modal-basic-title">\n    <l key="confirm.edit.modal.title"></l>\n  </h4>\n  <button type="button" class="close" aria-label="Close" (click)="modal.dismiss(false)">\n    <span aria-hidden="true">&times;</span>\n  </button>\n</div>\n<div class="modal-body">\n  <l key="confirm.edit.modal.text"></l>\n</div>\n<div class="modal-footer">\n  <button type="button" class="btn btn-outline-dark" (click)="modal.close(true)">\n    <l key="confirm.edit.modal.confirm"></l>\n  </button>\n  <button type="button" class="btn btn-outline-dark" (click)="modal.close(false)">\n    <l key="confirm.edit.modal.decline"></l>\n  </button>\n</div>\n'
    },
    EVgJ: function(e, t) {
        e.exports = '<div>\n  <div>\n    <div class="row">\n      <div class="col-lg-12 pab20">\n        <app-switch-situation [formGroup]="appState"></app-switch-situation>\n      </div>\n    </div>\n    <div class="row">\n      <div class="col-lg-12">\n        <h3 class="card-title bold-title">\n          <l key="layer.menu.print"></l>\n        </h3>\n      </div>\n    </div>\n    <hr/>\n    <div class="row">\n      <div class="col-lg-4">\n        <label for="format">\n          <l key="print.pageSize"></l>\n        </label>\n      </div>\n      <div class="col-lg-8">\n        <select id="format" [formControl]="appState.get(\'print\').get(\'printPageSize\')" name="format"\n                class="form-control" [compareWith]="compareFn">\n         \x3c!-- <option value="A0">A0</option>\n          <option value="A1">A1</option>\n          <option value="A2">A2</option>--\x3e\n          <option value="A3">A3</option>\n          <option value="A4" selected>A4</option>\n        </select>\n      </div>\n    </div>\n    <br/>\n    <div class="row">\n      <div class="col-lg-4">\n        <label for="echelle">\n          <l key="print.scale"></l>\n        </label>\n      </div>\n      <div class="col-lg-8">\n        <select  id="echelle" [formControl]="appState.get(\'print\').get(\'printScale\')" class="form-control" name="echelle"\n                [compareWith]="compareFn">\n          <option *ngFor="let scale of scales" [ngValue]="scale">\n            1:{{scale}}\n          </option>\n        </select>\n      </div>\n    </div>\n    <br/>\n    <div class="row" *ngIf="appState.get(\'print\').get(\'printOfficial\').value === true">\n      <div class="col-lg-4">\n        <label for="resolutionOfficial">\n          <l key="print.resolution"></l>\n        </label>\n      </div>\n      <div class="col-lg-8">\n        <select id="resolutionOfficial" [formControl]="appState.get(\'print\').get(\'printResolution\')" class="form-control"\n                name="resolution" [compareWith]="compareFn">\n          <option value="72">72 dpi</option>\n          <option value="150">150 dpi</option>\n          <option value="300">300 dpi</option>\n        </select>\n      </div>\n    </div>\n    <div class="row" *ngIf="appState.get(\'print\').get(\'printOfficial\').value === false">\n      <div class="col-lg-4">\n        <label for="resolutionNonOffi">\n          <l key="print.resolution"></l>\n        </label>\n      </div>\n      <div class="col-lg-8">\n        <select id="resolutionNonOffi" [formControl]="appState.get(\'print\').get(\'printResolution\')" class="form-control"\n                name="resolution" [compareWith]="compareFn">\n          <option value="150">150 dpi</option>\n        </select>\n      </div>\n    </div>\n    <br/>\n    <div class="row">\n      <div class="col-lg-4">\n        <label for="orientation">\n          <l key="print.orientation"></l>\n        </label>\n      </div>\n      <div class="col-lg-8">\n        <select id="orientation" [formControl]="appState.get(\'print\').get(\'printOrientation\')" class="form-control"\n                [compareWith]="compareFn">\n          <option value="portrait" selected>\n            <l key="print.portrait"></l>\n          </option>\n          <option value="paysage">\n            <l key="print.landscape"></l>\n          </option>\n        </select>\n      </div>\n    </div>\n    <br/>\n    <div class="row">\n      <div class="col-lg-4">\n        <l key="print.division"></l>\n      </div>\n      <div class="col-lg-8">\n        {{ appState.get(\'print\').get(\'printDivision\').value }}\n      </div>\n    </div>\n    <br/>\n    <hr/>\n    <div class="row">\n      <div class="col-lg-1 padding-9" >\n        <input id="officiel" type="checkbox" [formControl]="appState.get(\'print\').get(\'printOfficial\')"\n               class="form-control">\n      </div>\n      <div class="col-lg-6 nopadding">\n        <l key="print.officiel"></l>\n      </div>\n    </div>\n    <br/>\n    <div>\n      <button class="btn btn-fin01" id="export-pdf" (click)="giveXML()">\n        <l key="export"></l>\n      </button>\n    </div>\n  </div>\n</div>\n\n'
    },
    EhFC: function(e, t) {
        e.exports = '<div class="padding">\n  <div >\n    <div>\n      <input type="radio" id="street" name="search" value="street" [(ngModel)]="searchToggle"\n             (ngModelChange)="setSearchValue($event)">\n      <label for="street" class="labelRadio">\n        <l key="advanced.search.street"></l>\n      </label>\n    </div>\n    <div *ngIf="searchToggle === \'street\'">\n      <div class="row">\n        <div class="col-lg-12">\n          <input-text [globalAppState]="appState" [appState]="streetSearch" name="localiteCP" label="localiteCP" (keyup.enter)="search()">\n          </input-text>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-lg-12">\n          <input-text [globalAppState]="appState" [appState]="streetSearch" name="rue" label="rue" (keyup.enter)="search()"></input-text>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-lg-12">\n          <input-text [globalAppState]="appState" [appState]="streetSearch" name="numero" label="numero" (keyup.enter)="search()"></input-text>\n        </div>\n      </div>\n    </div>\n    <hr/>\n    <div>\n      <input type="radio" id="capakey" name="search" value="capakey" [(ngModel)]="searchToggle">\n      <label for="capakey" class="labelRadio">\n        <l key="advanced.search.capakey"></l>\n      </label>\n    </div>\n    <div *ngIf="searchToggle === \'capakey\'">\n      <div class="row">\n        <div class="col-lg-12">\n          <input-text prependIcon="search" [globalAppState]="appState" [appState]="capakeySearch"\n                      (prependOnClick)="openDivisionModal()" shouldCheck="true" type="Number" minlength="5"\n                      maxlength="5"\n                      name="division" label="division" (keyup.enter)="search()"></input-text>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-lg-12">\n          <input-text [globalAppState]="appState" [appState]="capakeySearch" shouldCheck="true" type="Char"\n                      minlength="1" maxlength="1" name="section" label="section"\n                      [suggestion]="autoCompleteMap.get(\'section\')"\n                      suggestionType="other" (keyup.enter)="search()"></input-text>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-lg-12">\n          <input-text [globalAppState]="appState" [appState]="capakeySearch" shouldCheck="true" type="Number"\n                      minlength="1" maxlength="4" name="radical" label="radical"\n                      [suggestion]="autoCompleteMap.get(\'radical\')"\n                      suggestionType="other" (keyup.enter)="search()"></input-text>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-lg-12">\n          <input-text [globalAppState]="appState" [appState]="capakeySearch" shouldCheck="true" type="Number"\n                      maxlength="2" name="numBis" label="numBis" [suggestion]="autoCompleteMap.get(\'numBis\')"\n                      suggestionType="other" (keyup.enter)="search()"></input-text>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-lg-12">\n          <input-text [globalAppState]="appState" [appState]="capakeySearch" shouldCheck="true" type="Char"\n                      maxlength="1" name="exposant_alpha" label="exposant_alpha"\n                      [suggestion]="autoCompleteMap.get(\'exposant_alpha\')" suggestionType="other" (keyup.enter)="search()"></input-text>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-lg-12">\n          <input-text [globalAppState]="appState" [appState]="capakeySearch" shouldCheck="true" type="Number"\n                      maxlength="3" name="exposant_num" label="exposant_num"\n                      [suggestion]="autoCompleteMap.get(\'exposant_num\')"\n                      suggestionType="other" (keyup.enter)="search()"></input-text>\n        </div>\n      </div>\n    </div>\n    <hr/>\n    <div>\n      <input type="radio" id="coordinates" name="search" value="coordinates" [(ngModel)]="searchToggle"\n             (ngModelChange)="setSearchValue($event)">\n      <label for="coordinates" class="labelRadio">\n        <l key="advanced.search.coordinates"></l>\n      </label>\n    </div>\n    <div *ngIf="searchToggle === \'coordinates\'">\n      <form [formGroup]="coordinateSystemSearchForm" novalidate>\n        <div class="row">\n          <div class="col-lg-6">\n            <label>\n              <l key="advanced.search.coordinates.system"></l>\n            </label>\n          </div>\n          <div class="col-lg-6">\n            <select formControlName="coordSystem" [(ngModel)]="coordSystem" class="select-style"\n                    (change)="selectInput($event)">\n              <option value="LB2008" selected>LB2008</option>\n              <option value="LB72">LB72</option>\n              <option value="WGS84">WGS84</option>\n              <option value="ETRS89">ETRS89</option>\n            </select>\n          </div>\n        </div>\n      </form>\n      <div *ngIf="isLambertSelected">\n        <form [formGroup]="coordinateXYSearchForm" novalidate>\n          <div class="form-group col-xs-12 col-lg-12">\n            <label>X:\n              <input type="text" placeholder="X" formControlName="coordPointX"\n                     [(ngModel)]="coordPointX" (keyup.enter)="search()"/>\n            </label>\n\n            <div *ngIf="coordinateXYSearchForm.controls[\'coordPointX\'].invalid && (coordinateXYSearchForm.controls[\'coordPointX\'].dirty\n                || coordinateXYSearchForm.controls[\'coordPointX\'].touched)">\n              <div *ngIf="coordinateXYSearchForm.controls[\'coordPointX\'].hasError(\'required\')" class="text-danger">\n                <label class="description">\n                  <l key="advanced.search.coordinates.required"></l>\n                </label>\n              </div>\n\n              <div *ngIf="coordinateXYSearchForm.controls[\'coordPointX\'].hasError(\'pattern\')" class="text-danger">\n                <label class="description">\n                  <l key="advanced.search.coordinates.lambert"></l>\n                </label>\n              </div>\n            </div>\n          </div>\n          <div class="form-group col-xs-12 col-lg-12">\n            <label>Y:\n              <input type="text" placeholder="Y" formControlName="coordPointY"\n                     [(ngModel)]="coordPointY"  (keyup.enter)="search()"/>\n            </label>\n\n            <div *ngIf="coordinateXYSearchForm.controls[\'coordPointY\'].invalid && (coordinateXYSearchForm.controls[\'coordPointY\'].dirty\n            || coordinateXYSearchForm.controls[\'coordPointY\'].touched)">\n              <div *ngIf="coordinateXYSearchForm.controls[\'coordPointY\'].hasError(\'required\')" class="text-danger">\n                <label class="description">\n                  <l key="advanced.search.coordinates.required"></l>\n                </label>\n              </div>\n\n              <div *ngIf="coordinateXYSearchForm.controls[\'coordPointY\'].hasError(\'pattern\')" class="text-danger">\n                <label class="description">\n                  <l key="advanced.search.coordinates.lambert"></l>\n                </label>\n              </div>\n            </div>\n          </div>\n        </form>\n        <div\n          *ngIf="coordinateXYSearchForm.invalid && !coordinateXYSearchForm.controls[\'coordPointX\'].hasError(\'required\') && !coordinateXYSearchForm.controls[\'coordPointY\'].hasError(\'required\') && (coordinateXYSearchForm.dirty || coordinateXYSearchForm.touched)"\n          class="text-danger">\n          <div>\n            <label class="description">\n              <l key="advanced.search.coordinates.format.error"></l>\n            </label>\n          </div>\n        </div>\n      </div>\n\n      <div class="form-group" *ngIf="!isLambertSelected">\n        <div class="col-xs-3 col-lg-3 nopadding">\n          <label>\n            <l key="advanced.search.coordinates.format"></l>\n          </label>\n        </div>\n        <div class="col-xs-9 col-lg-9 nopadding">\n          <div class="form-group">\n            <label class="radio-inline"><input type="radio" name="format" value="DD" checked\n                                               (ngModelChange)="setSearchFormat($event)" [(ngModel)]="formatToggle">\n              <l key="advanced.search.coordinates.dd"></l>\n            </label>\n            &nbsp;\n            <label class="radio-inline"><input type="radio" name="format" value="DMS" checked\n                                               (ngModelChange)="setSearchFormat($event)" [(ngModel)]="formatToggle">\n              <l key="advanced.search.coordinates.dms"></l>\n            </label>\n          </div>\n        </div>\n        <div *ngIf="formatToggle === \'DD\'">\n          <form [formGroup]="coordinateLatLonSearchForm" novalidate>\n            <div class="form-group col-xs-12 col-lg-12">\n              <label>\n                <l key="advanced.search.coordinates.latitude"></l>\n              </label>\n              <input type="text" class="form-control" value="" formControlName="latitude"\n                     [ngClass]="{ \'is-invalid\': coordinateLatLonSearchForm.controls.latitude.errors }"\n                     [(ngModel)]="latitude"  (keyup.enter)="search()"/>\n\n              <div *ngIf="coordinateLatLonSearchForm.controls[\'latitude\'].invalid  && (coordinateLatLonSearchForm.controls[\'latitude\'].dirty\n               || coordinateLatLonSearchForm.controls[\'latitude\'].touched)">\n                <div *ngIf="coordinateLatLonSearchForm.controls[\'latitude\'].hasError(\'required\')" class="text-danger">\n                  <label>\n                    <l key="advanced.search.coordinates.required"></l>\n                  </label>\n                </div>\n\n                <div *ngIf="coordinateLatLonSearchForm.controls[\'latitude\'].hasError(\'pattern\')" class="text-danger">\n                  <label>\n                    <l key="advanced.search.coordinates.formatdecimal"></l>\n                  </label>\n                </div>\n              </div>\n            </div>\n\n            <div class="form-group col-xs-12 col-lg-12">\n              <label>\n                <l key="advanced.search.coordinates.longitude"></l>\n              </label>\n              <input type="text" class="form-control" formControlName="longitude"\n                     [ngClass]="{ \'is-invalid\': coordinateLatLonSearchForm.controls.longitude.errors }"\n                     [(ngModel)]="longitude"  (keyup.enter)="search()"/>\n\n              <div *ngIf="coordinateLatLonSearchForm.controls[\'longitude\'].invalid  && (coordinateLatLonSearchForm.controls[\'longitude\'].dirty\n                || coordinateLatLonSearchForm.controls[\'longitude\'].touched)" class="text-danger">\n                <div *ngIf="coordinateLatLonSearchForm.controls[\'longitude\'].hasError(\'required\')">\n                  <label>\n                    <l key="advanced.search.coordinates.required"></l>\n                  </label>\n                </div>\n\n                <div *ngIf="coordinateLatLonSearchForm.controls[\'longitude\'].hasError(\'pattern\')">\n                  <label>\n                    <l key="advanced.search.coordinates.formatdecimal"></l>\n                  </label>\n                </div>\n              </div>\n            </div>\n          </form>\n          <div\n            *ngIf="coordinateLatLonSearchForm.invalid && !coordinateLatLonSearchForm.controls[\'latitude\'].hasError(\'required\') && !coordinateLatLonSearchForm.controls[\'longitude\'].hasError(\'required\') && (coordinateLatLonSearchForm.dirty || coordinateLatLonSearchForm.touched)"\n            class="text-danger">\n            <div>\n              <label class="description">\n                <l key="advanced.search.coordinates.format.error"></l>\n              </label>\n            </div>\n          </div>\n        </div>\n        <div *ngIf="formatToggle === \'DMS\'">\n          <form [formGroup]="coordinateLatLonDMSSearchForm" novalidate>\n            <div class="row form-group col-xs-12 col-lg-12">\n              <label>\n                <l key="advanced.search.coordinates.latitude"></l>\n              </label>\n              &nbsp;\n              <input type="text" style="width: 15%" class="form-control" formControlName="degreeLat" maxlength="2"\n                     [ngClass]="{ \'is-invalid\': coordinateLatLonDMSSearchForm.controls.degreeLat.errors }"\n                     [(ngModel)]="degreeLat"  (keyup.enter)="search()">&nbsp;<label>\xb0</label>&nbsp;\n              <input type="text" style="width: 15%" class="form-control" formControlName="minutesLat" maxlength="2"\n                     [ngClass]="{ \'is-invalid\': coordinateLatLonDMSSearchForm.controls.minutesLat.errors }"\n                     [(ngModel)]="minutesLat"  (keyup.enter)="search()">&nbsp;<label>\'</label>&nbsp;\n              <input type="text" style="width: 25%" class="form-control" formControlName="secondesLat"\n                     [ngClass]="{ \'is-invalid\': coordinateLatLonDMSSearchForm.controls.secondesLat.errors }"\n                     [(ngModel)]="secondesLat"  (keyup.enter)="search()">&nbsp;<label>"</label>\n\n              <div *ngIf="( coordinateLatLonDMSSearchForm.controls[\'degreeLat\'].invalid  && (coordinateLatLonDMSSearchForm.controls[\'degreeLat\'].dirty\n              || coordinateLatLonDMSSearchForm.controls[\'degreeLat\'].touched) ) ||\n              ( coordinateLatLonDMSSearchForm.controls[\'minutesLat\'].invalid  && (coordinateLatLonDMSSearchForm.controls[\'minutesLat\'].dirty\n              || coordinateLatLonDMSSearchForm.controls[\'minutesLat\'].touched) ) ||\n              ( coordinateLatLonDMSSearchForm.controls[\'secondesLat\'].invalid  && (coordinateLatLonDMSSearchForm.controls[\'secondesLat\'].dirty\n              || coordinateLatLonDMSSearchForm.controls[\'secondesLat\'].touched) )" class="text-danger">\n\n                <div *ngIf="( coordinateLatLonDMSSearchForm.controls[\'degreeLat\'].hasError(\'required\') )\n                            || ( coordinateLatLonDMSSearchForm.controls[\'minutesLat\'].hasError(\'required\') )\n                            || ( coordinateLatLonDMSSearchForm.controls[\'secondesLat\'].hasError(\'required\') )">\n                  <label>\n                    <l key="advanced.search.coordinates.required"></l>\n                  </label>\n                </div>\n\n                <div *ngIf="( coordinateLatLonDMSSearchForm.controls[\'degreeLat\'].hasError(\'pattern\') )\n                            || (coordinateLatLonDMSSearchForm.controls[\'minutesLat\'].hasError(\'pattern\') )">\n                  <label>\n                    <l key="advanced.search.coordinates.patterndegreeminute"></l>\n                  </label>\n                </div>\n\n                <div *ngIf="coordinateLatLonDMSSearchForm.controls[\'secondesLat\'].hasError(\'pattern\')">\n                  <label>\n                    <l key="advanced.search.coordinates.patternseconde"></l>\n                  </label>\n                </div>\n              </div>\n            </div>\n\n            <div class="row form-group col-xs-12 col-lg-12">\n              <label>\n                <l key="advanced.search.coordinates.longitude"></l>\n              </label>\n              &nbsp;\n              <input type="text" style="width: 15%" class="form-control" formControlName="degreeLong" maxlength="2"\n                     [ngClass]="{ \'is-invalid\': coordinateLatLonDMSSearchForm.controls.degreeLong.errors }"\n                     [(ngModel)]="degreeLong" (keyup.enter)="search()">&nbsp;<label>\xb0</label>&nbsp;\n              <input type="text" style="width: 15%" class="form-control" formControlName="minutesLong" maxlength="2"\n                     [ngClass]="{ \'is-invalid\': coordinateLatLonDMSSearchForm.controls.minutesLong.errors }"\n                     [(ngModel)]="minutesLong" (keyup.enter)="search()">&nbsp;<label>\'</label>&nbsp;\n              <input type="text" style="width: 25%" class="form-control" formControlName="secondesLong"\n                     [ngClass]="{ \'is-invalid\': coordinateLatLonDMSSearchForm.controls.secondesLong.errors }"\n                     [(ngModel)]="secondesLong" (keyup.enter)="search()">&nbsp;<label>"</label>\n\n              <div *ngIf="( coordinateLatLonDMSSearchForm.controls[\'degreeLong\'].invalid  && (coordinateLatLonDMSSearchForm.controls[\'degreeLong\'].dirty\n                || coordinateLatLonDMSSearchForm.controls[\'degreeLong\'].touched) ) ||\n                ( coordinateLatLonDMSSearchForm.controls[\'minutesLong\'].invalid  && (coordinateLatLonDMSSearchForm.controls[\'minutesLong\'].dirty\n                || coordinateLatLonDMSSearchForm.controls[\'minutesLong\'].touched) ) ||\n                ( coordinateLatLonDMSSearchForm.controls[\'secondesLong\'].invalid  && (coordinateLatLonDMSSearchForm.controls[\'secondesLong\'].dirty\n                || coordinateLatLonDMSSearchForm.controls[\'secondesLong\'].touched) )" class="text-danger">\n\n                <div *ngIf="( coordinateLatLonDMSSearchForm.controls[\'degreeLong\'].hasError(\'required\') )\n                              || ( coordinateLatLonDMSSearchForm.controls[\'minutesLong\'].hasError(\'required\') )\n                              || ( coordinateLatLonDMSSearchForm.controls[\'secondesLong\'].hasError(\'required\') )">\n                  <label>\n                    <l key="advanced.search.coordinates.required"></l>\n                  </label>\n                </div>\n\n                <div *ngIf="( coordinateLatLonDMSSearchForm.controls[\'degreeLong\'].hasError(\'pattern\') )\n                              || (coordinateLatLonDMSSearchForm.controls[\'minutesLong\'].hasError(\'pattern\') )">\n                  <label>\n                    <l key="advanced.search.coordinates.patterndegreeminute"></l>\n                  </label>\n                </div>\n\n                <div *ngIf="coordinateLatLonDMSSearchForm.controls[\'secondesLong\'].hasError(\'pattern\')">\n                  <label>\n                    <l key="advanced.search.coordinates.patternseconde"></l>\n                  </label>\n                </div>\n              </div>\n              <div *ngIf="coordinateLatLonDMSSearchForm.invalid\n              && !coordinateLatLonDMSSearchForm.controls[\'degreeLat\'].hasError(\'required\')\n              && !coordinateLatLonDMSSearchForm.controls[\'minutesLat\'].hasError(\'required\')\n              && !coordinateLatLonDMSSearchForm.controls[\'secondesLat\'].hasError(\'required\')\n              && !coordinateLatLonDMSSearchForm.controls[\'degreeLong\'].hasError(\'required\')\n              && !coordinateLatLonDMSSearchForm.controls[\'minutesLong\'].hasError(\'required\')\n              && !coordinateLatLonDMSSearchForm.controls[\'secondesLong\'].hasError(\'required\')\n              && (coordinateLatLonDMSSearchForm.dirty || coordinateLatLonDMSSearchForm.touched)"\n                   class="text-danger">\n                <div>\n                  <label class="description">\n                    <l key="advanced.search.coordinates.format.error"></l>\n                  </label>\n                </div>\n              </div>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n    <hr/>\n    <div class="row">\n      <div class="col-lg-6">\n        <button class="btn btn-fin01" [disabled]="pendingSearch" (click)="search()">\n          <l key="advanced.search.searchButton"></l>\n            <i *ngIf="!pendingSearch" class="fa fa-search"></i>\n            <i *ngIf="pendingSearch" class="fa fa-spin fa-spinner"></i>\n        </button>\n      </div>\n      <div class="col-lg-6">\n        <button (click)="resetSearchFields()" class="btn">\n          <l key="advance.search.delete.selection"></l>\n        </button>\n      </div>\n    </div>\n    <div *ngIf="coordinatesResult !== null && coordinatesResult.length !== 0 && searchToggle === \'coordinates\'">\n      <table class="table table-striped w-auto">\n        <tr>\n          <th>\n            <l key="advanced.search.result.coordSystem"></l>\n          </th>\n          <th>\n            <l key="advanced.search.result.positionX"></l>\n          </th>\n          <th>\n            <l key="advanced.search.result.positionY"></l>\n          </th>\n          <th></th>\n        </tr>\n        <tr *ngFor="let result of coordinatesResult | slice:0:10 | paginate: {itemsPerPage:10,currentPage:p} ">\n          <td>{{result.coordSystem}}</td>\n          <td>{{result.valueX}}</td>\n          <td>{{result.valueY}}</td>\n          <td>\n            <button class="btn grey-transparent" (click)="goToCoordinatesResult(result)"><i\n              class="fa fa-arrow-circle-o-right"></i></button>\n          </td>\n        </tr>\n      </table>\n      <pagination-controls (pageChange)="p = $event"></pagination-controls>\n    </div>\n    <div *ngIf="streetsResult !== null && streetsResult.length !== 0 && searchToggle === \'street\'">\n      <table class="table table-striped w-auto">\n        <tr>\n          <th>\n            <l key="advanced.search.result.name"></l>\n          </th>\n          <th>\n            <l key="advanced.search.result.houseNumber"></l>\n          </th>\n          <th>\n            <l key="advanced.search.zipCode"></l>\n          </th>\n          <th>\n            <l key="advanced.search.city"></l>\n          </th>\n          <th></th>\n        </tr>\n        <tr *ngFor="let result of streetsResult | slice:0:10 | paginate: {itemsPerPage:10,currentPage:p} ">\n          <td>{{result.streetName | uppercase}}</td>\n          <td>{{result.houseNumber}}</td>\n          <td>{{result.zipCode}}</td>\n          <td>{{result.city | uppercase}}</td>\n          <td>\n            <button class="btn grey-transparent" (click)="goToStreetResult(result)"><i\n              class="fa fa-arrow-circle-o-right"></i></button>\n          </td>\n        </tr>\n      </table>\n      <pagination-controls (pageChange)="p = $event"></pagination-controls>\n    </div>\n    <div *ngIf="capakeyResult !== null && capakeyResult.length !== 0 && searchToggle === \'capakey\' ">\n      <table class="table table-striped w-auto">\n        <tr>\n          <th>\n            <l key="advanced.search.result.capakey"></l>\n          </th>\n          <th>\n            <l key="advanced.search.result.situation"></l>\n          </th>\n          <th></th>\n        </tr>\n        <tr *ngFor="let result of capakeyResult | paginate: { itemsPerPage:10,currentPage:p }">\n          <td>{{result}}</td>\n          <td>\n            <l key="situation.{{situation}}"></l>\n          </td>\n          <td>\n            <button class="btn grey-transparent" (click)="goToCapakeyResult(result)"><i\n              class="fa fa-arrow-circle-o-right"></i></button>\n          </td>\n        </tr>\n      </table>\n      <pagination-controls (pageChange)="p = $event"></pagination-controls>\n    </div>\n    <div *ngIf="footerActive">\n      <div class="card-footer">\n        <button (click)="showAdvancedSearchMenu()" class="btn btn-outline-danger">\n          <l key="advanced.search.closeButton"></l>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n'
    },
    F66t: function(e, t) {
        e.exports = ".margin-left{\n  margin-left: 25px;\n}\n\n.card {\n  word-wrap:normal !important;\n}\n\n.hr{\n  margin-top: 1% !important;\n  margin-bottom: 1%  !important;\n}\n\n.legendPicture {\n  max-width: 100px;\n  max-height: 100px;\n}\n\n.greyed {\n  color: rgb(185,185,185);\n}\n\n.card{\n  border:0px solid rgba(0,0,0,.125);\n}\n\n.btn-fin01 {\n  background: #fff; \n  color: rgba(3, 174, 216, 1);\n  border : 1px solid  rgba(3, 174, 216, 1);\n}\n\nhr.splitGroup {\n  border-top : solid 2px #353535;\n}\n\nhr.splitGroup.nopadding {\n  margin-top: 0px;\n}\n\ntbody{\n  width: 100%;\n  display: table;\n}"
    },
    FJFN: function(e, t) {
        e.exports = ".description {\n  font-size: 13px;\n  text-indent: 20px;\n  display: block;\n}\n.select-style {\n  border: 1px solid #ccc;\n  width: 120px;\n  border-radius: 3px;\n  overflow: hidden;\n}\n.custom-title {\n  font-size: 1em;\n  font-weight: bold;\n  display: inline-block;\n  width: 140px;\n}\n.leftBlock1 {\n  margin-left: 2em;\n  float:left;\n}\n.leftBlock2 {\n   margin-left: 4em;\n   float:left;\n }\n.leftBlock3 {\n  margin-left: 6em;\n  float:left;\n}\n.alert-no-validation{\n  color:#721c24;\n  background-color:#f8d7da;\n}\n"
    },
    FTYI: function(e, t) {
        e.exports = ".divisionRow:hover{\n  background-color: blue;\n  color:white;\n}\n"
    },
    FdoJ: function(e, t) {
        e.exports = '<div class="topbar-row">\n  <div class="row" class="lang-switch-row">\n    <div id="be-header" class="col-lg-2 d-none d-lg-inline-block">\n      <div class="be-header-inner">\n        <div>\n          <div class="region region-be-header">\n            <div id="block-locale-language">\n              <ul class="language-switcher-locale-url">\n                <label-lang-switch></label-lang-switch>\n              </ul>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="col-lg-4 d-none d-lg-inline-block"></div>\n    <div class="col-lg-1 d-none d-lg-inline-block belgium">\n\n    </div>\n    <div class="col-lg-4 d-none d-lg-inline-block belgium">\n      <p><l key="spf.other.information"></l><img class="logo-be" src="assets/images/be-logo.gif"/> </p>\n    </div>\n  </div>\n  <div class="row dots-background">\n    <div class="col-lg-10  d-none d-sm-none d-md-none d-lg-inline title listeInfo">\n      <h1 class="large-title"><span class="dark-blue">CAD</span><span class="light-blue">GIS</span></h1>\n    </div>\n    <div class="col-lg-1  listeInfo right-align">\n      <i class="svg-icon menu-icon back-icon pointer" placement="bottom"  ngbPopover="{{getLabelForKey(\'header.goToCadgis\') | async}}" triggers="mouseenter:mouseleave" (click)="goToEcad()"></i>\n      <i class="menu-icon svg-icon login-icon pointer" *ngIf="!userIsLogged" placement="bottom" ngbPopover="{{getLabelForKey(\'header.login\') | async}}" triggers="mouseenter:mouseleave" (click)="login()"></i>\n      <i class="menu-icon svg-icon pointer" *ngIf="userIsLogged" placement="bottom" ngbPopover="{{getLabelForKey(\'header.logout\') | async}}" triggers="mouseenter:mouseleave" (click)="logout()">\n        <object data="assets/images/fin_ico/fin-pict-logout-blue.svg"></object>\n      </i>\n    </div>\n    <div class="col-lg-1 padding-top">\n      <button type="button" class="btn grey-transparent" (click)="goToMyminfin()"><i\n        class="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp; myMIN<B>FIN</B></button>\n    </div>\n  </div>\n</div>\n\n  <div class="container padding-both helpPage">\n    <div class="card">\n      <div class="margin" *ngIf="jsonObservable !== null">\n        <div [innerHtml]="sanitizeStyle((jsonObservable | async)[getLang()])">\n\n        </div>\n        <div class="row" *ngIf="inDevMode()">\n          <button class="btn" (click)="editPage()"><i class="fa fa-pencil"></i></button>\n        </div>\n      </div>\n    </div>\n  </div>\n<footer>\n  <div class="row bgfooter">\n    <div class="custom-container">\n      <div class="footer-top">\n        <div class="row">\n          <div class="col-lg-10 col-xs-6 col-md-3 nopadding">\n            <li><l key="myMinFin"></l></li>\n            <li><l key="spfFinance"></l></li>\n          </div>\n          <div class="col-lg-2 nopadding">\n            <img src="assets/images/_fin_logo_{{lang()}}.gif"/>\n          </div>\n        </div>\n      </div>\n      <div class="clearfix"></div>\n      <div class="footer-bot">\n        <div class="col-xs-12 col-md-6 left nopadding">\n          <ul>\n            <li><img src="assets/images/_fin_njr.gif"></li>\n            <span *ngIf="lang() === \'NL\'">\n              <li><a href="https://financien.belgium.be/nl/disclaimer" target="_blank"><l key="footer.disclaimer"></l></a></li>\n              <li><a href="https://www.belgium.be/nl/uw_privacy" target="_blank"><l key="footer.confidentiality"></l></a></li>\n              <li><a href="https://financien.belgium.be/nl/accessibility" target="_blank"><l key="footer.accessibility"></l></a></li>\n            </span>\n            <span *ngIf="lang() === \'FR\'">\n              <li><a href="https://finances.belgium.be/fr/disclaimer" target="_blank"><l key="footer.disclaimer"></l></a></li>\n              <li><a href="https://www.belgium.be/fr/declaration_de_confidentialite" target="_blank"><l key="footer.confidentiality"></l></a></li>\n              <li><a href="https://finances.belgium.be/fr/accessibilite" target="_blank"><l key="footer.accessibility"></l></a></li>\n            </span>\n            <span *ngIf="lang() === \'DE\'">\n              <li><a href="https://finances.belgium.be/de/disclaimer" target="_blank"><l key="footer.disclaimer"></l></a></li>\n              <li><a href="https://www.belgium.be/de/personenbezogene_daten" target="_blank"><l key="footer.confidentiality"></l></a></li>\n              <li><a href="https://finanzen.belgium.be/de/Zug%c3%a4nglichkeit" target="_blank"><l key="footer.accessibility"></l></a></li>\n            </span>\n            <span *ngIf="lang() === \'EN\'">\n              <li><a href="https://finances.belgium.be/en/disclaimer" target="_blank"><l key="footer.disclaimer"></l></a></li>\n              <li><a href="https://www.belgium.be/en/personal_data" target="_blank"><l key="footer.confidentiality"></l></a></li>\n              <li><a href="https://finance.belgium.be/en/accessibility" target="_blank"><l key="footer.accessibility"></l></a></li>\n            </span>\n          </ul>\n        </div>\n        <div class="col-xs-12 col-md-6 right nopadding">\n          \xa9 Copyright <l key="footer.spf"></l>\n          <p>Version : {{projectVersion}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</footer>\n'
    },
    FoPT: function(e, t) {
        e.exports = '<div class="row">\n  <div class="col-lg-12 col-12 nopadding">\n    <input class="form-control" *ngIf="criteria.attribute === \'\'" disabled type="text" (keyup.enter)="search()"/>\n    <div *ngIf="criteria.attribute !== \'\' && !isSpecialValue(criteria.attribute)">\n    <input *ngIf="criteria.attribute !== null && mapping[tableName][criteria.attribute.toUpperCase()] === \'TEXT\'"\n           class="form-control" type="text" name="valeurText{{index}}" [(ngModel)]="criteria.stringValue" (keyup.enter)="search()"/>\n    <input *ngIf="criteria.attribute !== null && mapping[tableName][criteria.attribute.toUpperCase()] === \'NUMERIC\'" type="text"\n           (ngModelChange)="onValueChange(index,\'NUMBER\',$event)"\n           class="form-control" name="valeurNumeric{{index}}" [(ngModel)]="criteria.numericValue" (keyup.enter)="search()"/>\n    <input *ngIf="criteria.attribute !== null && mapping[tableName][criteria.attribute.toUpperCase()] === \'DATE\'"\n           (ngModelChange)="onValueChange(index,\'DATE\',$event)"\n           class="form-control" type="text" placeholder="dd-mm-yyyy" name="valeurDate{{index}}" [(ngModel)]="criteria.dateValue" (keyup.enter)="search()"/>\n    <input *ngIf="criteria.attribute === \'RECID\' && ( tableName === \'WPT_INCO\' || tableName === \'WPN_INCO\' || tableName === \'WLI_INCO\' )" class="form-control" type="text" name="valeurText{{index}}" [(ngModel)]="criteria.stringValue" (keyup.enter)="search()"/>\n    </div>\n      <select *ngIf="tableName === \'ALI_ADCO\' && criteria.attribute === \'ROLE\'" [(ngModel)]="criteria.stringValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADCO\').get(\'ROLE\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADCO\',\'ROLE\',keys)}}"></l></option>\n      </select>\n\n      <select *ngIf="tableName === \'ALI_ADCO\' && criteria.attribute === \'ORIGIN\'" [(ngModel)]="criteria.numericValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADCO\').get(\'ORIGIN\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADCO\',\'ORIGIN\',keys)}}"></l></option>\n      </select>\n\n      <select *ngIf="tableName === \'ALI_ADCO\' && criteria.attribute === \'QUALITY\'" [(ngModel)]="criteria.numericValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADCO\').get(\'QUALITY\'))" value="{{keys}}">{{keys}}</option>\n      </select>\n\n      <select *ngIf="tableName === \'ALI_ADCO\' && criteria.attribute === \'TECHSTATUS\'" [(ngModel)]="criteria.stringValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADCO\').get(\'TECHSTATUS\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADCO\',\'TECHSTATUS\',keys)}}"></l></option>\n      </select>\n\n      <select *ngIf="tableName === \'ALI_ADCO\' && criteria.attribute === \'LEGSTATUS\'" [(ngModel)]="criteria.stringValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADCO\').get(\'LEGSTATUS\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADCO\',\'LEGSTATUS\',keys)}}"></l></option>\n      </select>\n\n      \x3c!--      --\x3e\n\n    <select *ngIf="tableName === \'ALI_ADRE\' && criteria.attribute === \'ROLE\'" [(ngModel)]="criteria.stringValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADRE\').get(\'ROLE\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADRE\',\'ROLE\',keys)}}"></l></option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADRE\' && criteria.attribute === \'ORIGIN\'" [(ngModel)]="criteria.numericValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADRE\').get(\'ORIGIN\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADRE\',\'ORIGIN\',keys)}}"></l></option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADRE\' && criteria.attribute === \'QUALITY\'" [(ngModel)]="criteria.numericValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADRE\').get(\'QUALITY\'))" value="{{keys}}">{{keys}}</option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADRE\' && criteria.attribute === \'TECHSTATUS\'" [(ngModel)]="criteria.stringValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADRE\').get(\'TECHSTATUS\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADRE\',\'TECHSTATUS\',keys)}}"></l></option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADRE\' && criteria.attribute === \'LEGSTATUS\'" [(ngModel)]="criteria.stringValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADRE\').get(\'LEGSTATUS\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADRE\',\'LEGSTATUS\',keys)}}"></l></option>\n    </select>\n\n    \x3c!--    --\x3e\n\n    <select *ngIf="tableName === \'ALI_ADPR\' && criteria.attribute === \'ROLE\'" [(ngModel)]="criteria.stringValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADPR\').get(\'ROLE\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADPR\',\'ROLE\',keys)}}"></l></option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADPR\' && criteria.attribute === \'ORIGIN\'" [(ngModel)]="criteria.numericValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADPR\').get(\'ORIGIN\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADPR\',\'ORIGIN\',keys)}}"></l></option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADPR\' && criteria.attribute === \'QUALITY\'" [(ngModel)]="criteria.numericValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADPR\').get(\'QUALITY\'))" value="{{keys}}">{{keys}}</option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADPR\' && criteria.attribute === \'TECHSTATUS\'" [(ngModel)]="criteria.stringValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADPR\').get(\'TECHSTATUS\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADPR\',\'TECHSTATUS\',keys)}}"></l></option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADPR\' && criteria.attribute === \'LEGSTATUS\'" [(ngModel)]="criteria.stringValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADPR\').get(\'LEGSTATUS\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADPR\',\'LEGSTATUS\',keys)}}"></l></option>\n    </select>\n\n    \x3c!--    --\x3e\n\n    <select *ngIf="tableName === \'ALI_ADAR\' && criteria.attribute === \'ROLE\'" [(ngModel)]="criteria.stringValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADAR\').get(\'ROLE\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADAR\',\'ROLE\',keys)}}"></l></option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADAR\' && criteria.attribute === \'ORIGIN\'" [(ngModel)]="criteria.numericValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADAR\').get(\'ORIGIN\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADAR\',\'ORIGIN\',keys)}}"></l></option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADAR\' && criteria.attribute === \'QUALITY\'" [(ngModel)]="criteria.numericValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADAR\').get(\'QUALITY\'))" value="{{keys}}">{{keys}}</option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADAR\' && criteria.attribute === \'TECHSTATUS\'" [(ngModel)]="criteria.stringValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADAR\').get(\'TECHSTATUS\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADAR\',\'TECHSTATUS\',keys)}}"></l></option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADAR\' && criteria.attribute === \'LEGSTATUS\'" [(ngModel)]="criteria.stringValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADAR\').get(\'LEGSTATUS\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADAR\',\'LEGSTATUS\',keys)}}"></l></option>\n    </select>\n\n    \x3c!--    --\x3e\n\n    <select *ngIf="tableName === \'ALI_ADMU\' && criteria.attribute === \'ROLE\'" [(ngModel)]="criteria.stringValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADMU\').get(\'ROLE\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADMU\',\'ROLE\',keys)}}"></l></option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADMU\' && criteria.attribute === \'ORIGIN\'" [(ngModel)]="criteria.numericValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADMU\').get(\'ORIGIN\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADMU\',\'ORIGIN\',keys)}}"></l></option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADMU\' && criteria.attribute === \'QUALITY\'" [(ngModel)]="criteria.numericValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADMU\').get(\'QUALITY\'))" value="{{keys}}">{{keys}}</option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADMU\' && criteria.attribute === \'TECHSTATUS\'" [(ngModel)]="criteria.stringValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADMU\').get(\'TECHSTATUS\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADMU\',\'TECHSTATUS\',keys)}}"></l></option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_ADMU\' && criteria.attribute === \'LEGSTATUS\'" [(ngModel)]="criteria.stringValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_ADMU\').get(\'LEGSTATUS\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_ADMU\',\'LEGSTATUS\',keys)}}"></l></option>\n    </select>\n\n\n    <select *ngIf="tableName === \'ALI_CASE\' && criteria.attribute === \'ORIGIN\'" [(ngModel)]="criteria.numericValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_CASE\').get(\'ORIGIN\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_CASE\',\'ORIGIN\',keys)}}"></l></option>\n    </select>\n\n    <select *ngIf="tableName === \'ALI_CADI\' && criteria.attribute === \'ORIGIN\'" [(ngModel)]="criteria.numericValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'ALI_CADI\').get(\'ORIGIN\'))" value="{{keys}}"><l key="{{getConvertedValue(\'ALI_CADI\',\'ORIGIN\',keys)}}"></l></option>\n    </select>\n\n    <select *ngIf="tableName === \'APT_ADST\' && criteria.attribute === \'TYPE\'" [(ngModel)]="criteria.stringValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'APT_ADST\').get(\'TYPE\'))" value="{{keys}}"><l key="{{getConvertedValue(\'APT_ADST\',\'TYPE\',keys)}}"></l></option>\n      </select>\n    <select *ngIf="tableName === \'BPT_PRST\' && criteria.attribute === \'TYPE\'" [(ngModel)]="criteria.stringValue" class="form-control">\n      <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'BPT_PRST\').get(\'TYPE\'))" value="{{keys}}"><l key="{{getConvertedValue(\'BPT_PRST\',\'TYPE\',keys)}}"></l></option>\n    </select>\n      <select *ngIf="tableName === \'BPN_CABU\' && criteria.attribute === \'TYPE\'" [(ngModel)]="criteria.stringValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'BPN_CABU\').get(\'TYPE\'))" value="{{keys}}"><l key="{{getConvertedValue(\'BPN_CABU\',\'TYPE\',keys)}}"></l></option>\n      </select>\n      <select *ngIf="tableName === \'BPN_REBU\' && criteria.attribute === \'TYPE\'" [(ngModel)]="criteria.stringValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'BPN_REBU\').get(\'TYPE\'))" value="{{keys}}"><l key="{{getConvertedValue(\'BPN_REBU\',\'TYPE\',keys)}}"></l></option>\n      </select>\n      <select *ngIf="tableName === \'WPT_INCO\' && criteria.attribute === \'TYPE\'" [(ngModel)]="criteria.stringValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'WPT_INCO\').get(\'TYPE\'))" value="{{keys}}"><l key="{{getConvertedValue(\'WPT_INCO\',\'TYPE\',keys)}}"></l></option>\n      </select>\n      <select *ngIf="tableName === \'BPN_PWZO\' && criteria.attribute === \'TYPE\'" [(ngModel)]="criteria.stringValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'BPN_PWZO\').get(\'TYPE\'))" value="{{keys}}"><l key="{{getConvertedValue(\'BPN_PWZO\',\'TYPE\',keys)}}"></l></option>\n      </select>\n      <select *ngIf="tableName === \'BPN_RAZO\' && criteria.attribute === \'STATUS\'" [(ngModel)]="criteria.numericValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'BPN_RAZO\').get(\'STATUS\'))" value="{{keys}}"><l key="{{getConvertedValue(\'BPN_RAZO\',\'STATUS\',keys)}}"></l></option>\n      </select>\n      <select *ngIf="tableName === \'WPT_INCO\' && criteria.attribute === \'STATUS\'" [(ngModel)]="criteria.stringValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'WPT_INCO\').get(\'STATUS\'))" value="{{keys}}"><l key="{{getConvertedValue(\'WPT_INCO\',\'STATUS\',keys)}}"></l></option>\n      </select>\n      <select *ngIf="criteria.attribute === \'FISCSITID\'" [(ngModel)]="criteria.stringValue"\n       onfocus=\'if (this.options.length > 5){this.size = 5}\' onmousedown=\'if (this.options.length > 5){this.size = 5}\' onchange="this.size=1" onblur="this.size=1"  class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'BPN_CABU\').get(\'FISCSITID\')) | slice:0:this.end" value="{{keys}}"><l key="{{getConvertedValue(\'BPN_CABU\',\'FISCSITID\',keys)}}"></l></option>\n      </select>\n      <select *ngIf="criteria.attribute === \'REQUESTTYPE\'" [(ngModel)]="criteria.numericValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'WPT_INCO\').get(\'REQUESTTYPE\'))" value="{{keys}}"><l key="{{getConvertedValue(\'WPT_INCO\',\'REQUESTTYPE\',keys)}}"></l></option>\n      </select>\n      <select *ngIf="criteria.attribute === \'SUVACNTYPE\'" [(ngModel)]="criteria.stringValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'BPN_CAPA\').get(\'SUVACNTYPE\'))" value="{{keys}}"><l key="{{getConvertedValue(\'BPN_CAPA\',\'SUVACNTYPE\',keys)}}"></l></option>\n      </select>\n\n      <select *ngIf="tableName === \'GPN_SUDO\' && criteria.attribute === \'COORDSYS\'" [(ngModel)]="criteria.stringValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'GPN_SUDO\').get(\'COORDSYS\'))" value="{{keys}}"><l key="{{getConvertedValue(\'GPN_SUDO\',\'COORDSYS\',keys)}}"></l></option>\n      </select>\n\n      <select *ngIf="tableName === \'BPN_CABL\' && criteria.attribute === \'TYPE\'" [(ngModel)]="criteria.stringValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'BPN_CABL\').get(\'TYPE\'))" value="{{keys}}"><l key="{{getConvertedValue(\'BPN_CABL\',\'TYPE\',keys)}}"></l></option>\n      </select>\n\n      <select *ngIf="tableName === \'BPN_CABL\' && criteria.attribute === \'QUALITY\'" [(ngModel)]="criteria.numericValue" class="form-control">\n        <option *ngFor="let keys of getKeys(getAttributeConverterMap().get(\'BPN_CABL\').get(\'QUALITY\'))" value="{{keys}}">{{keys}}</option>\n      </select>\n\n\n    <div class="errorControlJS" *ngIf="valueIncorrect[index] && mapping[tableName][criteria.attribute.toUpperCase()] === \'NUMERIC\'">\n      <l key="search.bad.value.number.attribute"></l>\n    </div>\n    <div class="errorControlJS" *ngIf="valueIncorrect[index] && mapping[tableName][criteria.attribute.toUpperCase()] === \'DATE\'">\n      <l key="search.bad.value.date.attribute"></l>\n    </div>\n  </div>\n</div>\n'
    },
    GSgy: function(e, t) {
        e.exports = '<div *ngIf="value" class="alert alert-danger">\n  <l key="error.{{value.code}}"></l>\n</div>\n'
    },
    GbEp: function(e, t) {
        e.exports = '<div class="card">\n  <div>\n    <div style="padding-top: 0rem" class="row">\n      <div style="padding-top: 1rem" class="col-sm-11 col-md-11 col-lg-11 info-lvl-1">\n        <b>\n          <p>\n            <l key="layerList.add.layer.title"></l>\n          </p>\n        </b>\n      </div>\n      <button style="margin-left: 25px" type="button" class="close" aria-label="Close" (click)="closeModal()">\n        <span aria-hidden="true">&times;</span>\n      </button>\n    </div>\n    <hr style="margin-top: 0rem" class="splitGroup"/>\n    <div class="row card-body">\n      <div class="col-sm-12 col-md-12 col-lg-12">\n        <ng-container *ngIf="inspire.size !== 0 ">\n          \x3c!--&& !isInspireSectionEmpty()--\x3e\n          <div class="row" (click)="switchStateMenu(\'inspire\')">\n            <div class="col-lg-10">\n              <p>\n                <l key="layerList.add.layer.inspire"></l>\n              </p>\n            </div>\n            <div class="col-lg-2 col-2">\n              <i class="fa fa-caret-up" *ngIf="menuStatus.get(\'inspire\').value"></i>\n              <i class="fa fa-caret-down" *ngIf="!menuStatus.get(\'inspire\').value"></i>\n            </div>\n          </div>\n          <ng-container *ngIf="menuStatus.get(\'inspire\').value">\n            <div *ngFor="let group of getKeys(inspire)">\n              <ng-container *ngIf="!isInspireGroupEmpty(group,\'addition\')">\n                <div class="row" [id]="group">\n                  <div class="col-lg-12 col-sm-12 col-md-12 info-lvl-2">\n                    <div *ngIf="isEmpty(translations.get(group))" class="col-lg-12 col-sm-12 col-md-12">\n                      <hr style="margin-top: 0rem"/>\n                      <p>{{group}}</p>\n                    </div>\n                    <div *ngIf="!isEmpty(translations.get(group))" class="col-lg-12 col-sm-12 col-md-12">\n                      <hr style="margin-top: 0rem"/>\n                      <span [innerHtml]="getCurrentTranslations(translations.get(group))">{{group}}</span>\n                    </div>\n                  </div>\n                </div>\n                <div class="row">\n                  <div class="col-sm-12 col-md-12 col-lg-12 margin-left"\n                       *ngFor="let layer of getKeys(inspire.get(group).get(\'layers\'))" [id]="layer">\n                    <div\n                      *ngIf="!inspire.get(group).get(\'layers\').get(layer).addedToMap && getPermissionFromInspireLayer(layer,group,\'addition\')">\n                      <div class="row">\n                        <div class="col-sm-11 col-md-11 col-lg-11 margin-left">\n                          <hr style="margin-top: 0rem"/>\n                        </div>\n                      </div>\n                      <div class="row info-lvl-4">\n\n                        <div *ngIf="isEmpty(translations.get(layer))" class="col-sm-10 col-md-10 col-lg-10 margin-left">\n                          <p>{{layer}}</p>\n                        </div>\n                        <div *ngIf="!isEmpty(translations.get(layer))"\n                             class="col-sm-10 col-md-10 col-lg-10 margin-left">\n                          <span [innerHtml]="getCurrentTranslations(translations.get(layer))"></span>\n                        </div>\n                        <div class="col-sm-1 col-md-1 col-lg-1">\n                          <button id="button" class="fa fa-plus btn btn-fin01"\n                                  (click)="addInspireLayer(\'addition\', inspire.get(group).get(\'layers\').get(layer))"></button>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n                <div>\n                  <div class="col-sm-12 col-md-12 col-lg-12 margin-left"\n                       *ngFor="let subGroup of getKeys(inspire.get(group).get(\'subGroup\'))" [id]="subGroup">\n                    <ng-container *ngIf="!isInspireSubGroupEmpty(group,\'addition\',subGroup)">\n                      <div class="row info-lvl-3">\n                        <div *ngIf="isEmpty(translations.get(subGroup))" class="col-lg-12 col-sm-12 col-md-12">\n                          <hr style="margin-top: 0rem"/>\n                          <p>{{subGroup}}</p>\n                        </div>\n                        <div *ngIf="!isEmpty(translations.get(subGroup))" class="col-lg-12 col-sm-12 col-md-12">\n                          <hr style="margin-top: 0rem"/>\n                          <span [innerHtml]="getCurrentTranslations(translations.get(subGroup))"></span>\n                        </div>\n                      </div>\n                      <div *ngFor="let layerOfSubGroup of getKeys(inspire.get(group).get(\'subGroup\').get(subGroup))"\n                           [id]="layerOfSubGroup">\n                        <div\n                          *ngIf="!inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).addedToMap && getPermissionFromInspireLayer(layerOfSubGroup,group,\'addition\',subGroup)">\n                          <div class="row">\n                            <div class="col-sm-11 col-md-11 col-lg-11 margin-left">\n                              <hr style="margin-top: 0rem"/>\n                            </div>\n                          </div>\n                          <div class="row info-lvl-4">\n\n                            <div *ngIf="isEmpty(translations.get(layerOfSubGroup))"\n                                 class="col-sm-10 col-md-10 col-lg-10 margin-left">\n                              <p>{{layerOfSubGroup}}</p>\n                            </div>\n                            <div *ngIf="!isEmpty(translations.get(layerOfSubGroup))"\n                                 class="col-sm-10 col-md-10 col-lg-10 margin-left">\n                              <span [innerHtml]="getCurrentTranslations(translations.get(layerOfSubGroup))"></span>\n                            </div>\n                            <div class="col-sm-1 col-md-1 col-lg-1">\n                              <button id="buttonInspire" class="fa fa-plus btn btn-fin01"\n                                      (click)="addInspireLayer(\'addition\',inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup))"></button>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </ng-container>\n                  </div>\n\n                </div>\n              </ng-container>\n            </div>\n          </ng-container>\n          <hr style="margin-top: 0rem"/>\n        </ng-container>\n        <ng-container *ngIf="layers.size !== 0 && !isSectionEmpty(\'addition\')">\n          <div class="row" (click)="switchStateMenu(\'toc\')">\n            <div class="col-lg-10">\n              <p>\n                <l key="layerList.add.layer.layer"></l>\n              </p>\n            </div>\n            <div class="col-lg-2 col-2">\n              <i class="fa fa-caret-up" *ngIf="menuStatus.get(\'toc\').value"></i>\n              <i class="fa fa-caret-down" *ngIf="!menuStatus.get(\'toc\').value"></i>\n            </div>\n          </div>\n          <ng-container *ngIf="menuStatus.get(\'toc\').value">\n            <div *ngFor="let group of getKeys(layers)">\n              <ng-container *ngIf="!isGroupEmpty(group,\'addition\')">\n                <div class="row info-lvl-2" [id]="group">\n                  <div class="col-lg-9 col-sm-12 col-md-12">\n                    <hr style="margin-top: 0rem"/>\n                    <div *ngIf="isEmpty(translations.get(group))" class="col-lg-12 col-sm-12 col-md-12">\n                      <p>{{group}}</p>\n                    </div>\n                    <div *ngIf="!isEmpty(translations.get(group))" class="col-lg-12 col-sm-12 col-md-12">\n                      <span [innerHtml]="getCurrentTranslations(translations.get(group))"></span>\n                    </div>\n                  </div>\n                </div>\n                <div class="col-lg-12 margin-left" *ngFor="let layer of getKeys(layers.get(group).get(\'layers\'))"\n                     [id]="layer">\n                  <div\n                    *ngIf="!layers.get(group).get(\'layers\').get(layer).addedToMap && !isVector(layer) && getPermissionFromLayer(layer,group,\'addition\')">\n                    <div class="row">\n                      <div class="col-sm-11 col-md-11 col-lg-11 margin-left">\n                        <hr style="margin-top: 0rem"/>\n                      </div>\n                    </div>\n                    <div class="row info-lvl-4">\n                      <div *ngIf="isEmpty(translations.get(layer))" class="col-sm-10 col-md-10 col-lg-10">\n                        <p>{{layer}}</p>\n                      </div>\n                      <div *ngIf="!isEmpty(translations.get(layer))" class="col-sm-10 col-md-10 col-lg-10">\n                        <span [innerHtml]="getCurrentTranslations(translations.get(layer))"></span>\n                      </div>\n                      <div class="col-sm-1 col-md-1 col-lg-1">\n                        <button id="buttonLayer" class="fa fa-plus btn btn-fin01"\n                                (click)="addTocLayer(\'addition\',layers.get(group).get(\'layers\').get(layer))"></button>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n                <div class="col-sm-12 col-md-12 col-lg-12 margin-left"\n                     *ngFor="let subGroup of getKeys(layers.get(group).get(\'subGroup\'))" [id]="subGroup">\n                  <ng-container *ngIf="!isSubGroupEmpty(group,\'addition\',subGroup)">\n                    <div class="row info-lvl-3">\n                      <div *ngIf="isEmpty(translations.get(subGroup))" class="col-lg-12 col-sm-12 col-md-12">\n                        <hr style="margin-top: 0rem"/>\n                        <p>{{subGroup}}</p>\n                      </div>\n                      <div *ngIf="!isEmpty(translations.get(subGroup))" class="col-lg-12 col-sm-12 col-md-12">\n                        <hr style="margin-top: 0rem"/>\n                        <span [innerHtml]="getCurrentTranslations(translations.get(subGroup))"></span>\n                      </div>\n                    </div>\n                    <div *ngFor="let layerOfSubGroup of getKeys(layers.get(group).get(\'subGroup\').get(subGroup))"\n                         [id]="layerOfSubGroup">\n                      <div\n                        *ngIf="!layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).addedToMap && !isVector(layerOfSubGroup) && getPermissionFromLayer(layerOfSubGroup,group,\'addition\',subGroup)">\n                        <div class="row">\n                          <div class="col-sm-11 col-md-11 col-lg-11 margin-left">\n                            <hr style="margin-top: 0rem"/>\n                          </div>\n                        </div>\n\n                        <div class="row info-lvl-4">\n                          <div *ngIf="isEmpty(translations.get(layerOfSubGroup))"\n                               class="col-sm-10 col-md-10 col-lg-10 margin-left">\n                            <p>{{layerOfSubGroup}}</p>\n                          </div>\n                          <div *ngIf="!isEmpty(translations.get(layerOfSubGroup))"\n                               class="col-sm-10 col-md-10 col-lg-10 margin-left">\n                            <span [innerHtml]="getCurrentTranslations(translations.get(layerOfSubGroup))"></span>\n                          </div>\n                          <div class="col-sm-1 col-md-1 col-lg-1">\n                            <button id="buttonSubGroup" class="fa fa-plus btn btn-fin01"\n                                    (click)="addTocLayer(\'addition\',layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup))"></button>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </ng-container>\n                </div>\n              </ng-container>\n            </div>\n          </ng-container>\n          <hr style="margin-top: 0rem"/>\n        </ng-container>\n        <div class="row" (click)="switchStateMenu(\'userlayer\')">\n          <div class="col-lg-10">\n            <p>\n              <l key="layerList.add.layer.user"></l>\n            </p>\n          </div>\n          <div class="col-lg-2">\n            <i class="fa fa-caret-up" *ngIf="menuStatus.get(\'userlayer\').value"></i>\n            <i class="fa fa-caret-down" *ngIf="!menuStatus.get(\'userlayer\').value"></i>\n          </div>\n        </div>\n        <ng-container *ngIf="menuStatus.get(\'userlayer\').value">\n\n          <ng-container *ngIf="userLayers.size !== 0 && !isUserLayersSectionEmpty(\'addition\')">\n\n                <div *ngFor="let group of getKeys(userLayers)">\n                  <ng-container *ngIf="!isUserLayersGroupEmpty(group,\'addition\')">\n                    <div class="row" [id]="group">\n                      <div class="col-lg-12 col-sm-12 col-md-12 info-lvl-2">\n                        <div class="col-lg-12 col-sm-12 col-md-12">\n                          <hr style="margin-top: 0rem"/>\n                          <p>\n                            <l key="layerList.add.layer.{{group}}"></l>\n                          </p>\n                        </div>\n                    </div>\n                    </div>\n                    <div class="row">\n                      <div class="col-sm-12 col-md-12 col-lg-12 margin-left"\n                          *ngFor="let layer of getKeys(userLayers.get(group))" [id]="layer">\n                        <div\n                          *ngIf="!userLayers.get(group).get(layer).addedToMap && getPermissionFromUserLayer(layer,group,\'addition\')">\n                          <div class="row">\n                            <div class="col-sm-11 col-md-11 col-lg-11 margin-left">\n                              <hr style="margin-top: 0rem"/>\n                            </div>\n                          </div>\n                          <div class="row info-lvl-4">\n  \n                            <div   class="col-sm-10 col-md-10 col-lg-10 margin-left">\n                              <p>\n                                  {{layer}}\n                                  <i class="fa fa-info-circle" title="{{userLayers.get(group).get(layer).url}}"></i>\n                              </p>\n                              \n                            </div>\n\n\n                            <div class="col-sm-1 col-md-1 col-lg-1">\n                              <button id="button" class="fa fa-plus btn btn-fin01"\n                                      (click)="addUserLayers(userLayers.get(group).get(layer))"></button>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n  \n                  </ng-container>\n                </div>\n              <hr style="margin-top: 0rem"/>\n            </ng-container>\n\n\n          <div class="form-group">\n            <label for="inputUrl">\n              <l key="layerList.add.layer.user.url"></l>\n            </label>\n            <div class="input-group  mb-3">\n              <div class="input-group-prepend">\n                <select class="form-control" [(ngModel)]="userLayerService">\n                  <option> WMS</option>\n                  <option> WMTS</option>\n                </select>\n              </div>\n              <input *ngIf="userLayerService === \'WMS\'" class="form-control" id="inputUrl" [(ngModel)]="userLayerUrl"\n                     placeholder="WMS Capabilities">\n              <input *ngIf="userLayerService === \'WMTS\'" class="form-control" id="inputWMSUrl"\n                     [(ngModel)]="userLayerUrl"\n                     placeholder="WMTS Capabilities">\n              <div class="input-group-append">\n                <button class="btn btn-outline-secondary" type="button">\n                  <l *ngIf="!pending" key="layerList.add" (click)="addUserLayer(null)"></l>\n                  <i *ngIf="pending" class="fa fa-spin fa-spinner"></i>\n                </button>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n        <hr style="margin-top: 0rem"/>\n        <ng-container *ngIf="!isHistoricEmpty()">\n          <div class="row" (click)="switchStateMenu(\'historic\')">\n            <div class="col-lg-10">\n              <p>\n                <l key="layerList.add.layer.historic"></l>\n              </p>\n            </div>\n            <div class="col-lg-2">\n              <i class="fa fa-caret-up" *ngIf="menuStatus.get(\'historic\').value"></i>\n              <i class="fa fa-caret-down" *ngIf="!menuStatus.get(\'historic\').value"></i>\n            </div>\n          </div>\n          <ng-container *ngIf="menuStatus.get(\'historic\').value">\n            <div *ngFor="let historicLayer of getKeys(historic)">\n              <div *ngIf="!historic.get(historicLayer).addedToMap">\n                <div class="row">\n                  <div class="col-sm-11 col-md-11 col-lg-11 margin-left">\n                    <hr style="margin-top: 0.5rem"/>\n                  </div>\n                </div>\n                <div class="row">\n\n                  <div class="col-sm-10 col-md-10 col-lg-10 margin-left">\n                    <p>{{historicLayer}}</p>\n                  </div>\n                  <div class="col-sm-1 col-md-1 col-lg-1">\n                    <button id="buttonHistoric" class="fa fa-plus btn btn-fin01"\n                            (click)="addHistoricLayer(historic.get(historicLayer))"></button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </ng-container>\n        </ng-container>\n      </div>\n    </div>\n    <div class="card-footer">\n      <button type="button" class="btn btn-primary" (click)="closeModal()">\n        <l key="close"></l>\n      </button>\n    </div>\n  </div>\n</div>\n'
    },
    GriW: function(e, t) {
        e.exports = ".padding{\n  padding-top: 10px;\n  padding-left: 25px;\n}\n\n.custom-title {\n  padding-bottom: 10px;\n  font-size: 1em;\n  font-weight: bold;\n  display: inline-block;\n}\n"
    },
    HCeK: function(e, t) {
        e.exports = '<div class="container">\n<div class="infobulle-danger text-center">\n  <h1>404 : CONFIGURATION NOT FOUND</h1>\n</div>\n</div>\n'
    },
    Hwq4: function(e, t) {
        e.exports = ".margin-left{\n    margin-left: 20px;\n  }\n  \n  .card {\n    word-wrap: normal !important;\n  }\n  \n  #button {\n    position: relative;\n    margin-bottom: 5px;\n  \n  }\n  \n  .row {\n    margin-right: 0 !important;\n    margin-left: 0 !important\n  }"
    },
    Jnfr: function(e, t) {
        function n(e) {
            return Promise.resolve().then(function() {
                throw new Error("Cannot find module '" + e + "'.")
            })
        }
        n.keys = function() {
            return []
        }
        ,
        n.resolve = n,
        e.exports = n,
        n.id = "Jnfr"
    },
    Jp34: function(e, t) {
        e.exports = '<div class="dual-list">\n\n  <div class="list panel panel-default pull-left">\n    <div class="col-lg-6">\n      <label>\n        <l key="vp.share.file.list"></l>\n      </label>\n    </div>\n    <div class="panel-heading">\n      <div class="btn-group">\n        <button class="btn btn-default" (click)="_leftList.selectAll()" [disabled]="_leftList.isSelectedAll()">All\n        </button>\n        <button class="btn btn-default" (click)="_leftList.selectNone()" [disabled]="_leftList.isSelectedNone()">None\n        </button>\n      </div>\n    </div>\n\n    <ul class="list-group">\n      <li class="list-group-item" *ngFor="let item of _leftList.base" (click)="selectItem(_leftList.selected, item)"\n          [ngClass]="{ active: isSelected(_leftList.selected, item) }" [value]="item">\n        <span>{{ item }}</span>\n      </li>\n    </ul>\n\n  </div>\n\n  <div class="btn-group-vertical">\n    <button type="button" class="btn btn-primary add" (click)="moveSelectedItems(_leftList, _rightList)"\n            [disabled]="!_leftList.selected.length"> > </button>\n    <button type="button" class="btn btn-primary remove" (click)="moveSelectedItems(_rightList, _leftList)"\n            [disabled]="!_rightList.selected.length"> < </button>\n  </div>\n\n  <div class="list panel panel-default pull-left">\n    <div class="col-lg-6">\n      <label>\n        <l key="vp.file.list.to.send"></l>\n      </label>\n    </div>\n    <div class="panel-heading">\n      <div class="btn-group">\n        <button class="btn btn-default" (click)="_rightList.selectAll()" [disabled]="_rightList.isSelectedAll()">All\n        </button>\n        <button class="btn btn-default" (click)="_rightList.selectNone()" [disabled]="_rightList.isSelectedNone()">\n          None\n        </button>\n      </div>\n    </div>\n    <ul class="list-group">\n      <li class="list-group-item" *ngFor="let item of _rightList.base" (click)="selectItem(_rightList.selected, item)"\n          [ngClass]="{ active: isSelected(_rightList.selected, item) }">\n        <span>{{ item }}</span>\n      </li>\n    </ul>\n  </div>\n</div>\n'
    },
    Ld5k: function(e, t) {
        e.exports = '<div class="topbar-row" *ngIf="showTopbar()">\n  <div class="row" class="lang-switch-row">\n    <div id="be-header" class="col-lg-2 col-md-12 col-12 d-lg-inline-block" *ngIf="showLanguageMenu()">\n      <div class="be-header-inner">\n        <div>\n          <div class="region region-be-header">\n            <div id="block-locale-language">\n              <ul class="language-switcher-locale-url">\n                <label-lang-switch></label-lang-switch>\n              </ul>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="col-lg-2 d-none d-lg-inline-block"></div>\n    <div class="col-lg-1 d-none d-lg-inline-block belgium">\n\n    </div>\n    <div class="col-lg-6 col-sm-10 d-none d-lg-inline-block belgium">\n      <p><l key="spf.other.information"></l><img class="logo-be" src="assets/images/be-logo.gif"/> </p>\n    </div>\n  </div>\n  <div class="row dots-background">\n    <div class="col-lg-3  d-none d-sm-none d-md-none d-lg-inline title listeInfo">\n      <h1 class="large-title nopadding"><span class="dark-blue">CAD</span><span class="light-blue">GIS</span></h1>\n    </div>\n    <div class="col-lg-5 col-8 listeInfo right-align" *ngIf="showSearchBar()">\n      <form>\n        <input-text [globalAppState]="appState" prependIcon="search" appendIcon="bars" [pending]="pendingSearch" [showLabel]="false"\n                    [suggestionType]="suggestionType" [suggestion]="suggestion" [appState]="appState" name="search" searchType="quickSearch"\n                    (prependOnClick)="suggestResult()" (appendOnClick)="showAdvancedSearchMenu()"\n                    (suggestOnClick)="search($event)">\n        </input-text>\n      </form>\n    </div>\n    <div class="col-lg-2 col-4   buttonTopbar right-align">\n      <i id="help" class="svg-icon menu-icon help-icon pointer" *ngIf="showInfoMenu()" placement="bottom"  ngbPopover="{{getLabelForKey(\'header.help\') | async}}" triggers="mouseenter:mouseleave" (click)="goToHelp()"></i>\n      <i id="login" class="svg-icon menu-icon login-icon pointer" *ngIf="showUserMenu() && !userIsLogged" placement="bottom" ngbPopover="{{getLabelForKey(\'header.login\') | async}}" triggers="mouseenter:mouseleave" (click)="login()"></i>\n      <i id="logout" class="menu-icon svg-icon pointer" *ngIf="showUserMenu() && userIsLogged" placement="bottom" ngbPopover="{{getLabelForKey(\'header.logout\') | async}}" triggers="mouseenter:mouseleave" (click)="logout()">\n        <object data="assets/images/fin_ico/fin-pict-logout_1.svg"></object>\n      </i>\n    </div>\n    <div class="col-lg-1 col-2 padding-top">\n      <button type="button" class="btn grey-transparent" (click)="goToMyminfin()"><i\n          class="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp; myMIN<B>FIN</B></button>\n    </div>\n  </div>\n</div>\n\n\n<button id="infoPopup" class="btn btn-fin01 infoPopup" [ngStyle]="{\'background\':this.appState.get(\'chosenTools\').value === \'POPUP\' ? \'#03aed8\' : \'#81d6eb\' }" (click)="switchPopup()" [style.right.vw]="rightPositionInfoPopup" href="#"  *ngIf="showIdentifyButton()">\n  <i *ngIf="this.appState.get(\'chosenTools\').value === \'POPUP\' && this.appState.get(\'featureLoading\').value === false"  class="content svg-icon popup-icon fa-2x pointer"></i>\n  <i *ngIf="this.appState.get(\'chosenTools\').value !== \'POPUP\' && this.appState.get(\'featureLoading\').value === false"  class="content svg-icon popup-icon fa-2x pointer"></i>\n  <i *ngIf="this.appState.get(\'featureLoading\').value === true" class="svg-icon fa fa-spinner fa-4x fa-spin pointer"></i>\n</button>\n\n<button id="couches" class="btn btn-fin01 couches" [ngStyle]="{\'background\':this.appState.get(\'showMenuLayer\').value === true ? \'#03aed8\' : \'#81d6eb\' }" [style.right.vw]="rightPositionLayer" href="#" *ngIf="showLayerMenuButton()"\n  (click)="showLayerMenu()">\n  <i class="content svg-icon layers-icon fa-2x " aria-hidden="true"></i>\n\n</button>\n<button id="legende" class="btn btn-fin01 legende" [ngStyle]="{\'background\':this.appState.get(\'showMenuTools\').value === true ? \'#03aed8\' : \'#81d6eb\' }" [style.right.vw]="rightPositionTools" href="#" *ngIf="showToolsMenuButton()"\n  (click)="showToolsMenu()">\n  <i *ngIf="this.appState.get(\'pendingLoading\').value === false"  class="content svg-icon tools-icon fa-2x  " aria-hidden="true"></i>\n  <i *ngIf="this.appState.get(\'pendingLoading\').value === true"  class="svg-icon fa fa-spinner fa-4x fa-spin pointer"></i>\n</button>\n\n<button id="outils" class="btn btn-fin01 outils" [ngStyle]="{\'background\':this.appState.get(\'showPrintSelection\').value === true ? \'#03aed8\' : \'#81d6eb\' }" [style.right.vw]="rightPositionPrint" href="#" *ngIf="showPrintSelectionButton()" (click)="showPrintSelectionMenu()">\n  <i class="content svg-icon print-icon fa-2x  " aria-hidden="true"></i>\n</button>\n<div class="sidebar" [style.width.vw]="checkIfSidebarOpen()">\n  <div >\n    <div class="pat20 padHor">\n      <div *ngIf="appState.get(\'showMenuLayer\').value">\n        <app-backdrop-selection [appState]="appState"></app-backdrop-selection>\n        <hr class="splitGroup nopadding" />\n        <app-layer-list [appState]="appState"></app-layer-list>\n        <hr class="splitGroup"/>\n        <app-interaction-selection [appState]="appState"></app-interaction-selection>\n\n      </div>\n      <div *ngIf="appState.get(\'showMenuTools\').value">\n        <app-tools-selection [appState]="appState"></app-tools-selection>\n      </div>\n      <div *ngIf="appState.get(\'showPrintSelection\').value">\n        <app-print-selection [appState]="appState"></app-print-selection>\n      </div>\n    </div>\n  </div>\n</div>\n<div class="downbar buttons" [style.height.vh]="checkIfDownbarOpen()">\n  <div class="pat20">\n    <app-result-list (onClose)="closeDownBar()" (onHide)="hideDownBar()"  [appState]="appState"\n                     *ngIf="appState.get(\'resultListReady\').value"></app-result-list>\n  </div>\n</div>\n'
    },
    MaTU: function(e, t) {
        e.exports = '<div class="padding-top-left">\n  <i class="menu-icon svg-icon login-icon " (click)="login()"></i>\n</div>\n<div>\n  <div class="container">\n  <div class="card mgt20">\n    <div class="card-header">\n      <h4 class="card-title"><l key="ecad.configuration.upload.title"></l></h4>\n    </div>\n    <div class="card-body">\n      <form>\n        <input-file name="configurationFile" (onSubmit)="reloadConfigurations()" [formGroup]="configurationForm" ></input-file>\n      </form>\n    </div>\n  </div>\n  </div>\n\n\x3c!--  <div class="card mgt20">--\x3e\n\x3c!--    <div class="card-header">--\x3e\n\x3c!--      <h4 class="card-title">--\x3e\n\x3c!--        <l key="ecad.configuration.wizard.title"></l>--\x3e\n\x3c!--      </h4>--\x3e\n\x3c!--    </div>--\x3e\n\x3c!--    <app-configuration-wizard [configuration]="inputConfiguration" (onSubmitted)="reloadConfigurations()"></app-configuration-wizard>--\x3e\n\x3c!--  </div>--\x3e\n\n\n  <div class="card mgt20">\n    <div class="card-header">\n      <h4 class="card-title"><l key="ecad.configuration.list"></l></h4>\n    </div>\n    <table class="table">\n      <tr>\n        <th><l key="ecad.configuration.list.name"></l></th>\n        <th><l key="ecad.configuration.list.mail"></l></th>\n        <th><l key="ecad.configuration.list.modifiedOn"></l></th>\n        <th></th>\n        <th></th>\n      </tr>\n      <tr *ngFor="let config of configurations">\n        <td>{{config.name}}</td>\n        <td>{{config.mail}}</td>\n        <td>{{config.modifiedOn}}</td>\n        <td><icon code="edit" (click)="editConfiguration(config.name)"></icon></td>\n        <td><a href="{{getConfigurationUrlByName(config.name)}}"> <icon code="download"></icon></a> </td>\n        <td><icon code="trash" (click)="deleteConfiguration(config.name)"></icon></td>\n        <td></td>\n      </tr>\n    </table>\n  </div>\n</div>\n'
    },
    Mcoy: function(e, t) {
        e.exports = ""
    },
    NYDE: function(e, t) {
        e.exports = '<div [style.width.%]="[widthVal]" ngDraggable [handle]="DemoHandle">\n    <div *ngIf="alertPopupIsVisible" id="myAlert" class="alert alert-danger fade show" role="alert">\n        <a href="#" class="close" data-dismiss="alert" (click)="closeAlert()" aria-label="close">&times;</a>\n\n        <a href="#" class="close expand" *ngIf="bodyIsNotVisible" data-expand="alert" (click)="expandAlert()"\n            aria-label="expand">+</a>\n\n        <a href="#" class="close minimize" *ngIf="bodyIsVisible" data-minimize="alert" (click)="reduceAlert()"\n            aria-label="minimize">-</a>\n\n        <div #DemoHandle style="padding-left:5px;padding-top:1px;padding-bottom:5px;padding-right:200px;" id="header"\n            class="modal-header">\n            <div [style.font-size.%]="[fontSizeVal]" class="modal-title"><strong>Warning</strong></div>\n        </div>\n        <div *ngIf="bodyIsVisible" id="body" style="padding-bottom:1px" class="modal-body">\n            <div [innerHtml]="sanitizeStyle(htmlContent[getLang()])"></div>\n        </div>\n    </div>\n</div>'
    },
    O500: function(e, t) {
        e.exports = ".button_export_to_cadex {\n  background-color: white;\n  background-image: url('fin-bt-cancel-myminfin.879111557fbc1256d82c.svg')  !important;\n  position: fixed;\n  top: 8px !important ;\n  left: 75px !important;\n  border-style: solid;\n  border-color: black;\n  border-width: 1px;\n  height: 40px !important;\n  width:40px !important; \n}\n\n.button_export_to_cadex:hover {\n  cursor: pointer;\n  background-color: white !important;\n  border-radius: 0 !important;\n}\n\n.button_help_cadex {\n  background-color: white;\n  background-image: url('fin-bt-quickhelp-blue.3c39f7dfbe3ad9ef4dfe.svg')  !important;\n  position: fixed;\n  top: 95px !important;\n  left: 23px !important;\n  border-style: solid;\n  border-color: black;\n  border-width: 1px;\n  height: 40px !important;\n  width:40px !important;\n}\n\n.button_help_cadex:hover {\n  cursor: pointer;\n  background-color: white !important;\n  border-radius: 0 !important;\n}"
    },
    PXLJ: function(e, t) {
        e.exports = '<div>\n  <div>\n    <div class="row col-lg-12 nopadding">\n      <select class="form-control" name="LayerName" [(ngModel)]="tempChoice"\n        (ngModelChange)="chooseTableName(tempChoice)">\n        <ng-container *ngFor="let keys of getKeys(layerNameLayerTable)">\n          <option *ngIf="layerPermissionMapping.get(keys) && layerNameLayerTable.get(keys)!=\'APN_ADCO\'" value="{{keys}}"\n            [innerHtml]="getCurrentTranslation(keys)"></option>\n        </ng-container>\n      </select>\n    </div>\n\n    <div *ngIf="criterias.tableName !==\'\'">\n      <hr />\n      <div class="row logo-row">\n        <div class="col-lg-4 col-4">\n          <ng-container>\n            <label placement="top" ngbTooltip="{{ strip_html_tags(searchByPointString[lang()]) }}"\n              triggers="mouseenter:mouseleave">\n              <button class="btn .btn-fin-default" (click)="chooseSpatialSearchOption(\'Point\')">\n                <i class="icon-fin-pict-locate icon-2-2x"></i>\n              </button>\n            </label>\n          </ng-container>\n        </div>\n        <div class="col-lg-4 col-4">\n          <ng-container>\n            <label placement="top" ngbTooltip=" {{strip_html_tags(searchByPolygonString[lang()]) }} "\n              triggers="mouseenter:mouseleave">\n              <button class="btn .btn-fin-default" (click)="chooseSpatialSearchOption(\'Polygon\')">\n                <i class="icon-fin-pict-drawpoly icon-2-2x"></i>\n              </button>\n            </label>\n          </ng-container>\n        </div>\n      </div>\n      <br />\n      <div class="row">\n        <div class="col-lg-5" style="z-index: 1">\n          <ng-container>\n            <button class="btn btn-fin01" [disabled]="pendingSearch" (click)="searchResults()">\n              <l key="spatial.search.searchButton"></l>\n                <i *ngIf="!pendingSearch" class="fa fa-search"></i>\n                <i *ngIf="pendingSearch" class="fa fa-spin fa-spinner"></i>\n            </button>\n          </ng-container>\n        </div>\n        <div class="col-lg-7">\n        </div>\n      </div>\n    </div>\n  </div>\n</div>'
    },
    Qc7x: function(e, t) {
        e.exports = '<div [hidden]="!isActive">\n  <ng-content></ng-content>\n</div>\n'
    },
    QpKf: function(e, t) {
        e.exports = '.select-style {\n  border: 1px solid #ccc;\n  width: 120px;\n  border-radius: 3px;\n  overflow: hidden;\n}\n\n.specific-view-style {\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 0;\n  width: 0;\n  z-index: -1;\n}\n\n.specific-view-style {\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 0;\n  width: 0;\n  z-index: -1\n}\n\n.disabled-style {\n  background-color: #f0f0f0;\n  border-radius: 6px;\n  border: 1px solid #f0f0f0;\n}\n\n.btn-mmf {\n  font-size: 13px;\n  font-family: "Titillium Web", Helvetica, Arial, sans-serif;\n  text-align: left;\n  text-indent: -5px;\n  background: transparent;\n  color: blue;\n  border : 1px solid  transparent;\n}\n\n.description-btn-mmf {\n  font-size: 13px;\n  font-family: "Titillium Web", Helvetica, Arial, sans-serif;\n  text-align: left;\n  text-indent: -5px;\n  background: transparent;\n  border : 1px solid  transparent;\n}\n\n.description {\n  font-size: 13px;\n  font-family: "Titillium Web", Helvetica, Arial, sans-serif;\n  display: block;\n}\n\n.alert-no-validation{\n  color:#721c24;\n  font-size: 13px;\n  font-family: "Titillium Web", Helvetica, Arial, sans-serif;\n  font-style: italic;\n  background-color:#f8d7da;\n}\n'
    },
    QyrM: function(e, t) {
        e.exports = '<app-input [inputControl]="formGroup.get(name)" [validationPath]="validationPath" [exceptions]="exceptions">\n  <div><l key="{{label}}" *ngIf="label"></l><span *ngIf="needed"> * </span></div>\n  <div class="radio" *ngFor="let button of buttons">\n    <label>\n      <input [formControl]="formGroup.get(name)" type="radio" name="{{formControlName}}" value="{{button.value}}">\n      <l *ngIf="button.label" key="{{button.label}}"></l>\n      <l *ngIf="!button.label" key="{{label}}.{{button.value}}"></l>\n    </label>\n  </div>\n</app-input>\n'
    },
    R5aC: function(e, t) {
        e.exports = '<div>\n  <div class="row">\n    <form id="spatialAnalysisForm">\n      <div class="modal-body" *ngIf="isSpatialAnalysis()">\n        <p class="custom-title">\n          <l key="spatialAnalysis.type"></l>\n        </p>\n        <br/>\n        <div class="leftBlock1">\n          <form [formGroup]="selectRoundSizeForm">\n            <input type="radio" id="round" formControlName="round" value="round" [(ngModel)]="spatialAnalysisToggle"\n                   (ngModelChange)="chooseSpatialAnalysisType($event)">\n            <label for="round">\n              <l key="spatialAnalysis.round"></l>\n            </label>\n\n            <select formControlName="roundSizeControl" [(ngModel)]="roundSizeControl">\n              <option *ngFor="let roundSize of sizes" [selected]="roundSize === roundSizeControl">\n                {{roundSize}}\n              </option>\n            </select>\n            <br/>\n            <i class="description">\n              <l key="spatialAnalysis.round.description"></l>\n            </i>\n          </form>\n        </div>\n        <div *ngIf="spatialAnalysisToggle === \'round\'">\n          <div class="leftBlock2">\n            <label class="custom-title">\n              <l key="spatialAnalysis.round.options.title"></l>\n            </label>\n          </div>\n\n          <div class="leftBlock2">\n            <input type="radio" id="roundParcelClic" name="roundOptions" value="roundParcelClic"\n                   [(ngModel)]="roundOptionsToggle" (ngModelChange)="chooseSpatialAnalysisRoundOption($event)">\n            <label for="roundParcelClic">\n              <l key="spatialAnalysis.round.options.roundParcelClic"></l>\n            </label>\n          </div>\n          <div *ngIf="roundOptionsToggle === \'roundParcelClic\'">\n            <div>\n              <div class="leftBlock2">\n                <i class="description">\n                  <l key="spatialAnalysis.round.options.roundParcelClic.description"></l>\n                </i>\n              </div>\n            </div>\n          </div>\n          <div class="leftBlock2">\n            <input type="radio" id="roundParcelCapakey" name="roundOptions" value="roundParcelCapakey"\n                   [(ngModel)]="roundOptionsToggle" (ngModelChange)="chooseSpatialAnalysisRoundOption($event)">\n            <label for="roundParcelCapakey">\n              <l key="spatialAnalysis.tenants.options.roundParcelCapakey"></l>\n            </label>\n          </div>\n          <div *ngIf="roundOptionsToggle === \'roundParcelCapakey\'">\n            <form [formGroup]="roundCapakeyForm" novalidate>\n              <div>\n                <div class="leftBlock2">\n                  <label>1.\n                    <input type="text" placeholder="capakey" formControlName="roundCapakey1"\n                           [(ngModel)]="roundCapakey1" (keyup.enter)="submitForms()">\n                  </label>\n                </div>\n                <div class="leftBlock3"\n                     *ngIf="roundCapakeyForm.controls[\'roundCapakey1\'].invalid && (roundCapakeyForm.controls[\'roundCapakey1\'].dirty || roundCapakeyForm.controls[\'roundCapakey1\'].touched)">\n                  <div *ngIf="roundCapakeyForm.controls[\'roundCapakey1\'].hasError(\'required\')"\n                       class="alert-no-validation">\n                    <label class="description">\n                      <l key="spatialAnalysis.options.requiredCapakey.error"></l>\n                    </label>\n                  </div>\n                  <div *ngIf="roundCapakeyForm.controls[\'roundCapakey1\'].hasError(\'pattern\')"\n                       class="alert-no-validation">\n                    <label class="description">\n                      <l key="spatialAnalysis.options.capakey.format.error"></l>\n                    </label>\n                  </div>\n                </div>\n                <div class="leftBlock2">\n                  <label>2.\n                    <input type="text" placeholder="capakey" formControlName="roundCapakey2"\n                           [(ngModel)]="roundCapakey2" (keyup.enter)="submitForms()">\n                  </label>\n                </div>\n                <div class="leftBlock3" *ngIf="roundCapakeyForm.controls[\'roundCapakey2\'].invalid">\n                  <div *ngIf="roundCapakeyForm.controls[\'roundCapakey2\'].hasError(\'pattern\')"\n                       class="alert-no-validation">\n                    <label class="description">\n                      <l key="spatialAnalysis.options.capakey.format.error"></l>\n                    </label>\n                  </div>\n                </div>\n                <div class="leftBlock2">\n                  <label>3.\n                    <input type="text" placeholder="capakey" formControlName="roundCapakey3"\n                           [(ngModel)]="roundCapakey3" (keyup.enter)="submitForms()">\n                  </label>\n                </div>\n                <div class="leftBlock3" *ngIf="roundCapakeyForm.controls[\'roundCapakey3\'].invalid">\n                  <div *ngIf="roundCapakeyForm.controls[\'roundCapakey3\'].hasError(\'pattern\')"\n                       class="alert-no-validation">\n                    <label class="description">\n                      <l key="spatialAnalysis.options.capakey.format.error"></l>\n                    </label>\n                  </div>\n                </div>\n                <div class="leftBlock2">\n                  <label>4.\n                    <input type="text" placeholder="capakey" formControlName="roundCapakey4"\n                           [(ngModel)]="roundCapakey4" (keyup.enter)="submitForms()">\n                  </label>\n                </div>\n                <div class="leftBlock3" *ngIf="roundCapakeyForm.controls[\'roundCapakey4\'].invalid">\n                  <div *ngIf="roundCapakeyForm.controls[\'roundCapakey4\'].hasError(\'pattern\')"\n                       class="alert-no-validation">\n                    <label class="description">\n                      <l key="spatialAnalysis.options.capakey.format.error"></l>\n                    </label>\n                  </div>\n                </div>\n                <div class="leftBlock2">\n                  <label>5.\n                    <input type="text" placeholder="capakey" formControlName="roundCapakey5"\n                           [(ngModel)]="roundCapakey5" (keyup.enter)="submitForms()">\n                  </label>\n                </div>\n                <div class="leftBlock3" *ngIf="roundCapakeyForm.controls[\'roundCapakey5\'].invalid">\n                  <div *ngIf="roundCapakeyForm.controls[\'roundCapakey5\'].hasError(\'pattern\')"\n                       class="alert-no-validation">\n                    <label class="description">\n                      <l key="spatialAnalysis.options.capakey.format.error"></l>\n                    </label>\n                  </div>\n                </div>\n              </div>\n            </form>\n          </div>\n          <div class="leftBlock2" *ngIf="!configService.cadexBundle.active && !configService.cdmsBundle.active">\n            <input type="radio" id="roundPointClic" name="roundOptions" value="roundPointClic"\n                   (ngModelChange)="chooseSpatialAnalysisRoundOption($event)"\n                   [(ngModel)]="roundOptionsToggle">\n            <label for="roundPointClic">\n              <l key="spatialAnalysis.round.options.roundPointClic"></l>\n            </label>\n          </div>\n          <div *ngIf="roundOptionsToggle === \'roundPointClic\'">\n\n            <div class="leftBlock2">\n              <div class="row col-lg-12">\n                <select class="form-control" name="LayerName" [(ngModel)]="tempChoice"\n                        (ngModelChange)="chooseTableName(tempChoice)">\n                  <ng-container *ngFor="let keys of getKeys(layerNameLayerTable)">\n                    <option *ngIf="layerPermissionMapping.get(keys) && layerNameLayerTable.get(keys)!=\'APN_ADCO\'"\n                            value="{{keys}}" [innerHtml]="getCurrentTranslation(keys)"></option>\n                  </ng-container>\n                </select>\n              </div>\n              <div *ngIf="criterias.tableName !==\'\'">\n                <div>\n                  <i class="description">\n                    <l key="spatialAnalysis.round.options.roundPointClic.description"></l>\n                  </i>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class="leftBlock2" *ngIf="!configService.cadexBundle.active && !configService.cdmsBundle.active">\n            <input type="radio" id="roundPointCoord" name="roundPointCoord" value="roundPointCoord"\n                   (ngModelChange)="chooseSpatialAnalysisRoundOption($event)"\n                   [(ngModel)]="roundOptionsToggle">\n            <label for="roundPointCoord">\n              <l key="spatialAnalysis.round.options.roundPointCoord"></l>\n            </label>\n          </div>\n          <div *ngIf="roundOptionsToggle === \'roundPointCoord\'">\n\n            <div class="leftBlock2">\n              <div class="row col-lg-12">\n                <select class="form-control" name="LayerName" [(ngModel)]="tempChoice"\n                        (ngModelChange)="chooseTableName(tempChoice)">\n                  <ng-container *ngFor="let keys of getKeys(layerNameLayerTable)">\n                    <option *ngIf="layerPermissionMapping.get(keys) && layerNameLayerTable.get(keys)!=\'APN_ADCO\'"\n                            value="{{keys}}" [innerHtml]="getCurrentTranslation(keys)"></option>\n                  </ng-container>\n                </select>\n              </div>\n              <div *ngIf="criterias.tableName !==\'\'">\n                <br/>\n                <div class="row col-lg-12">\n                  <label>\n                    <l key="spatialAnalysis.round.options.roundPointCoord.Input"></l>\n                  </label>\n                  &nbsp;\n\n                  <select class="select-style" id=\'projectionSelector\' (change)="selectCoordSystem($event)">\n                    <option value=\'EPSG:3812\'>Lambert 2008</option>\n                    <option value=\'EPSG:31370\'>Lambert 1972</option>\n                  </select>\n                </div>\n                <br/>\n                <div>\n                  <form [formGroup]="roundPointCoordForm" novalidate>\n                    <div class="row col-lg-12">\n                      <label>X:&nbsp;\n                        <input type="text" placeholder="X" formControlName="roundPointX"\n                               [(ngModel)]="roundPointX" (keyup.enter)="submitForms()">\n                      </label>\n                    </div>\n                    <div class="leftBlock3"\n                         *ngIf="roundPointCoordForm.controls[\'roundPointX\'].invalid && (roundPointCoordForm.controls[\'roundPointX\'].dirty || roundPointCoordForm.controls[\'roundPointX\'].touched)">\n                      <div *ngIf="roundPointCoordForm.controls[\'roundPointX\'].hasError(\'required\')"\n                           class="alert-no-validation">\n                        <label class="description">\n                          <l key="spatialAnalysis.options.requiredCapakey.error"></l>\n                        </label>\n                      </div>\n                      <div *ngIf="roundPointCoordForm.controls[\'roundPointX\'].hasError(\'pattern\')"\n                           class="alert-no-validation">\n                        <label class="description">\n                          <l key="spatialAnalysis.options.coordinates.pattern.error"></l>\n                        </label>\n                      </div>\n                    </div>\n                    <div class="row col-lg-12"><label>Y:&nbsp;\n                      <input type="text" placeholder="Y" formControlName="roundPointY"\n                             [(ngModel)]="roundPointY" (keyup.enter)="submitForms()">\n                    </label>\n                    </div>\n                    <div class="leftBlock3"\n                         *ngIf="roundPointCoordForm.controls[\'roundPointY\'].invalid && (roundPointCoordForm.controls[\'roundPointY\'].dirty || roundPointCoordForm.controls[\'roundPointY\'].touched)">\n                      <div *ngIf="roundPointCoordForm.controls[\'roundPointY\'].hasError(\'required\')"\n                           class="alert-no-validation">\n                        <label class="description">\n                          <l key="spatialAnalysis.options.requiredCapakey.error"></l>\n                        </label>\n                      </div>\n                      <div *ngIf="roundPointCoordForm.controls[\'roundPointY\'].hasError(\'pattern\')"\n                           class="alert-no-validation">\n                        <label class="description">\n                          <l key="spatialAnalysis.options.coordinates.pattern.error"></l>\n                        </label>\n                      </div>\n                    </div>\n                  </form>\n                  <div class="leftBlock3"\n                       *ngIf="roundPointCoordForm.invalid && !roundPointCoordForm.controls[\'roundPointX\'].hasError(\'required\') && !roundPointCoordForm.controls[\'roundPointY\'].hasError(\'required\') && (roundPointCoordForm.dirty || roundPointCoordForm.touched)"\n                       class="alert-no-validation">\n                    <div>\n                      <label class="description">\n                        <l key="spatialAnalysis.options.coordinates.format.error"></l>\n                      </label></div>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n          </div>\n        </div>\n        <form [formGroup]="selectTenantsForm" novalidate>\n          <div class="leftBlock1">\n\n            <input type="radio" id="tenants" formControlName="tenants" value="tenants"\n                   (ngModelChange)="chooseSpatialAnalysisType($event)" [(ngModel)]="spatialAnalysisToggle">\n            <label for="tenants">\n              <l key="spatialAnalysis.tenants"></l>\n            </label>\n            <br/>\n            <i class="description">\n              <l key="spatialAnalysis.tenants.description"></l>\n            </i>\n\n          </div>\n        </form>\n        <div *ngIf="spatialAnalysisToggle === \'tenants\'">\n          <div class="leftBlock2">\n            <label class="custom-title">\n              <l key="spatialAnalysis.tenants.options.title"></l>\n            </label>\n          </div>\n          <div class="leftBlock2">\n            <input type="radio" id="tenantsClic" name="tenantsOptions" value="tenantsClic"\n                   [(ngModel)]="tenantsOptionsToggle" (ngModelChange)="chooseSpatialAnalysisTenantsOption($event)">\n            <label for="tenantsClic">\n              <l key="spatialAnalysis.tenants.options.tenantsClic"></l>\n            </label>\n          </div>\n          <div *ngIf="tenantsOptionsToggle === \'tenantsClic\'">\n            <div>\n              <div class="leftBlock2">\n                <i class="description">\n                  <l key="spatialAnalysis.tenants.options.tenantsClic.description"></l>\n                </i>\n              </div>\n            </div>\n          </div>\n          <div class="leftBlock2">\n            <input type="radio" id="tenantsCapakey" name="tenantsOptions" value="tenantsCapakey"\n                   [(ngModel)]="tenantsOptionsToggle" (ngModelChange)="chooseSpatialAnalysisTenantsOption($event)">\n            <label for="tenantsCapakey">\n              <l key="spatialAnalysis.tenants.options.tenantsCapakey"></l>\n            </label>\n          </div>\n          <div *ngIf="tenantsOptionsToggle === \'tenantsCapakey\'">\n            <form [formGroup]="tenantsCapakeyForm" novalidate>\n              <div>\n                <div class="leftBlock2">\n                  <label>1.\n                    <input type="text" placeholder="capakey" formControlName="tenantsCapakey1"\n                           [(ngModel)]="tenantsCapakey1" (keyup.enter)="submitForms()">\n                  </label>\n                </div>\n                <div class="leftBlock3"\n                     *ngIf="tenantsCapakeyForm.controls[\'tenantsCapakey1\'].invalid && (tenantsCapakeyForm.controls[\'tenantsCapakey1\'].dirty || tenantsCapakeyForm.controls[\'tenantsCapakey1\'].touched)">\n                  <div *ngIf="tenantsCapakeyForm.controls[\'tenantsCapakey1\'].hasError(\'required\')"\n                       class="alert-no-validation">\n                    <label class="description">\n                      <l key="spatialAnalysis.options.requiredCapakey.error"></l>\n                    </label>\n                  </div>\n                  <div *ngIf="tenantsCapakeyForm.controls[\'tenantsCapakey1\'].hasError(\'pattern\')"\n                       class="alert-no-validation">\n                    <label class="description">\n                      <l key="spatialAnalysis.options.capakey.format.error"></l>\n                    </label>\n                  </div>\n                </div>\n                <div class="leftBlock2">\n                  <label>2.\n                    <input type="text" placeholder="capakey" formControlName="tenantsCapakey2"\n                           [(ngModel)]="tenantsCapakey2" (keyup.enter)="submitForms()">\n                  </label>\n                </div>\n                <div class="leftBlock3" *ngIf="tenantsCapakeyForm.controls[\'tenantsCapakey2\'].invalid">\n                  <div *ngIf="tenantsCapakeyForm.controls[\'tenantsCapakey2\'].hasError(\'pattern\')"\n                       class="alert-no-validation">\n                    <label class="description">\n                      <l key="spatialAnalysis.options.capakey.format.error"></l>\n                    </label>\n                  </div>\n                </div>\n                <div class="leftBlock2">\n                  <label>3.\n                    <input type="text" placeholder="capakey" formControlName="tenantsCapakey3"\n                           [(ngModel)]="tenantsCapakey3" (keyup.enter)="submitForms()">\n                  </label>\n                </div>\n                <div class="leftBlock3" *ngIf="tenantsCapakeyForm.controls[\'tenantsCapakey3\'].invalid">\n                  <div *ngIf="tenantsCapakeyForm.controls[\'tenantsCapakey3\'].hasError(\'pattern\')"\n                       class="alert-no-validation">\n                    <label class="description">\n                      <l key="spatialAnalysis.options.capakey.format.error"></l>\n                    </label>\n                  </div>\n                </div>\n                <div class="leftBlock2">\n                  <label>4.\n                    <input type="text" placeholder="capakey" formControlName="tenantsCapakey4"\n                           [(ngModel)]="tenantsCapakey4" (keyup.enter)="submitForms()">\n                  </label>\n                </div>\n                <div class="leftBlock3" *ngIf="tenantsCapakeyForm.controls[\'tenantsCapakey4\'].invalid">\n                  <div *ngIf="tenantsCapakeyForm.controls[\'tenantsCapakey4\'].hasError(\'pattern\')"\n                       class="alert-no-validation">\n                    <label class="description">\n                      <l key="spatialAnalysis.options.capakey.format.error"></l>\n                    </label>\n                  </div>\n                </div>\n                <div class="leftBlock2">\n                  <label>5.\n                    <input type="text" placeholder="capakey" formControlName="tenantsCapakey5"\n                           [(ngModel)]="tenantsCapakey5" (keyup.enter)="submitForms()">\n                  </label>\n                </div>\n                <div class="leftBlock3" *ngIf="tenantsCapakeyForm.controls[\'tenantsCapakey5\'].invalid">\n                  <div *ngIf="tenantsCapakeyForm.controls[\'tenantsCapakey5\'].hasError(\'pattern\')"\n                       class="alert-no-validation">\n                    <label class="description">\n                      <l key="spatialAnalysis.options.capakey.format.error"></l>\n                    </label>\n                  </div>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n  <div class="row pat30">\n    <div class="col-lg-12">\n      <div>\n        <button class="btn btn-fin01" style="margin-right: 10px" (click)="submitForms()">\n          <l key="spatialAnalysis.confirm"></l>\n            <i *ngIf="pendingSearch" class="fa fa-spin fa-spinner"></i>\n        </button>\n        <button class="btn" style="margin-right: 10px" (click)="resetForms()">\n          <l key="spatialAnalysis.delete"></l>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n'
    },
    RcJK: function(e, t) {
        e.exports = '.margin{\n  padding : 15px;\n}\n\n.menu-icon{\n  margin-right: 1vw;\n  width: 2vw;\n}\n\n.fin-logo{\n  height: 5vw;\n  padding-top: -5vw;\n  float: left;\n}\n\n#logoSPF {\n  display: inline-block;\n}\n\n.title{\n  padding-top: 10px;\n}\n\n.padding-top{\n  padding-top: 15px;\n}\n\n.padding-both{\n  padding: 40px 0 40px 0\n}\n\n.padding-top{\n  padding-top: 10px;\n}\n\n.title{\n  padding-top: 5px;\n}\n\n.btn.focus, .btn:focus {\n  outline: 0;\n  -webkit-box-shadow: 0 0 0 0rem rgba(0,123,255,.25);\n  box-shadow: 0 0 0 0rem rgba(0,123,255,.25);\n}\n\n.menu-icon{\n  margin-right: 0.5vw;\n  width: 2vw;\n  background-color: rgba(252, 255, 250, 0.76);\n}\n\n.logo-be{\n  width: 28px;\n  height: 20.125px;\n}\n\n.grey-transparent{\n  background-color: rgba(252, 255, 250, 0.76);\n}\n\n.grey-transparent:hover {\n  background-color: rgba(3, 174, 216, 0.51);\n}\n\n.card{\n  border:0px solid rgba(0,0,0,.125);\n}\n\n.dark-blue {\n  color: #0c56d8 !important;\n}\n\n.light-blue {\n  color: #41d4eb !important;\n}\n\n.topbar-row {\n  height: 10vh;\n  z-index: 1;\n}\n\n.title{\n  padding-left: 3vw;\n}\n\n.belgium {\n  bottom: 7px;\n  text-align: right;\n}\n\n.right-align{\n  text-align: right;\n}\n\n.lang-switch-row{\n  height: 3vh;\n  border-bottom: solid;\n  border-width: 0.3px;\n  border-bottom-color: lightgray;\n}\n\n.large-title{\n  font-size: 2em;\n}\n\n.listeInfo{\n  z-index: 1;\n  padding-top:1.0vh;\n}\n\n.dots-background{\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, 0))), url("data:image/gif;base64,R0lGODlhdgVaAIABAJeYmv///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjM2RDY0Mjg2ODIyMDY4MTE4QTZERkEyQjZDQjg4QzE2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ2NzA2NzMwMUFFRjExRTdCOUM3QzE0MEMwMzRENjk5IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ2NzA2NzJGMUFFRjExRTdCOUM3QzE0MEMwMzRENjk5IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNkQ2NDI4NjgyMjA2ODExOEE2REZBMkI2Q0I4OEMxNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNkQ2NDI4NjgyMjA2ODExOEE2REZBMkI2Q0I4OEMxNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAEALAAAAAB2BVoAAAL/RH6Godi5WHxy0Tuz1Y7DDXbhJ5bkWZkpio3r26ox68H1bLv4fve6LwPSfsRgcWhMIpc5ZZPJOz6nUWcVKqRmr1op97sNe8VWMnaMLqfP6jb73XXH4eD1/F6X5+nme+QPGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGys7S1tre4ubq7vL2+v7CxwsPExcbHyMnKy8zNzs/AwdLT1NXW19jZ2tvc3d7f0NHi4+Tl5ufo6err7O3u6uvYfXF08/b29Xj3+vt8+n/88PoL+ABAcalCcQYUGFB/MtdNiwH8OJEClKrIjxosaE/xk5bnz4MaLHkSBdvDuJMqXKlSxbunwJM6bMmTRr2ryJM6fOnTx7+vwJNKjQoUSLGj2KNKnSpUybOn0KNarUqVSrWs3UsaRWkVstkuQK1mvXrGHJii0b8qxas2zTtv261q1cuG/HzrVL9y7avHzx+t37d8rVwYQLGz6MOLHixYwbO34MObLkyZQrW76MObPmzZw7e/4MOrTo0aRLmw5aF7DquH1Xp2Yd+LVsvbBd057durZu3LFv+87N2zbw372HGy+OXHjX08ybO38OPbr06dSrW7+OPbv27dy7e/8OPrz48eTLmz+PPj3p4LuJK3/f/jh89vTdx09+f779+vLz+//njx+A+vUn4H/7HUhgWuotyGCDDj4IYYQSTkhhhRZeiGGGGm7IYYcefghiiCKOSGKJWCEYIIoDpphgiyy+uGKMBrooY4E2qjgjjDnWiOONNO4IpI86mkhkkUYeiWSSSi7JZJNOPglllFJOSWWVVl6JZZZabsmOkDz+6GWQPY4JJpk6hommmV+eqaaYZb7JJpxrzulmnMtxiWeeeu7JZ59+/glooIIOSmihhh6KaKKKLspoo+mkKWeddEJq56RtUmpppJhKyummnl4KqqahVtrpqGE5imqqqq7KaquuvgprrLLOSmuttt6Ka6667orhp6L+SqqvwZpaKrCZDmtsscj/Lntss8o6Kyy0xL7Ga7XWXottttpuy2233n4LbrjijktuueaeC1W0z66rbrvTvpusu/HCyyy79Eo7b771yrsvsej+C3DAAg9McMEGH4xwwgovzHDDDj8M8Uz84tuvvhRfbK/FGVfMMcYTb+zxvSCP/HHJfUSMcsoqr8xyyy6/DHPMMs9Mc80234zzUyZrvHPHJIvcc8g8A0300Eb7HPTPRwuNdA05Pw111FJPTXXVVl+NddZab811115DmHTYRTe9tNJkn8102marLXbZbaO9dtxmfU133XbfjXfeeu/Nd99+/w144IKr/DbbYxvu9uFyK1744ok/DnfjkjNOeX+DQF+Oeeaab855555/Dnrooo9OeunvTA454pFXvnrqjrcOu+qyvz476rHTrpvpuu/Oe+++/w588MIPT3zxxh+/agEAOw==");\n  background-image: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), url("data:image/gif;base64,R0lGODlhdgVaAIABAJeYmv///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjM2RDY0Mjg2ODIyMDY4MTE4QTZERkEyQjZDQjg4QzE2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ2NzA2NzMwMUFFRjExRTdCOUM3QzE0MEMwMzRENjk5IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ2NzA2NzJGMUFFRjExRTdCOUM3QzE0MEMwMzRENjk5IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNkQ2NDI4NjgyMjA2ODExOEE2REZBMkI2Q0I4OEMxNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNkQ2NDI4NjgyMjA2ODExOEE2REZBMkI2Q0I4OEMxNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAEALAAAAAB2BVoAAAL/RH6Godi5WHxy0Tuz1Y7DDXbhJ5bkWZkpio3r26ox68H1bLv4fve6LwPSfsRgcWhMIpc5ZZPJOz6nUWcVKqRmr1op97sNe8VWMnaMLqfP6jb73XXH4eD1/F6X5+nme+QPGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGys7S1tre4ubq7vL2+v7CxwsPExcbHyMnKy8zNzs/AwdLT1NXW19jZ2tvc3d7f0NHi4+Tl5ufo6err7O3u6uvYfXF08/b29Xj3+vt8+n/88PoL+ABAcalCcQYUGFB/MtdNiwH8OJEClKrIjxosaE/xk5bnz4MaLHkSBdvDuJMqXKlSxbunwJM6bMmTRr2ryJM6fOnTx7+vwJNKjQoUSLGj2KNKnSpUybOn0KNarUqVSrWs3UsaRWkVstkuQK1mvXrGHJii0b8qxas2zTtv261q1cuG/HzrVL9y7avHzx+t37d8rVwYQLGz6MOLHixYwbO34MObLkyZQrW76MObPmzZw7e/4MOrTo0aRLmw5aF7DquH1Xp2Yd+LVsvbBd057durZu3LFv+87N2zbw372HGy+OXHjX08ybO38OPbr06dSrW7+OPbv27dy7e/8OPrz48eTLmz+PPj3p4LuJK3/f/jh89vTdx09+f779+vLz+//njx+A+vUn4H/7HUhgWuotyGCDDj4IYYQSTkhhhRZeiGGGGm7IYYcefghiiCKOSGKJWCEYIIoDpphgiyy+uGKMBrooY4E2qjgjjDnWiOONNO4IpI86mkhkkUYeiWSSSi7JZJNOPglllFJOSWWVVl6JZZZabsmOkDz+6GWQPY4JJpk6hommmV+eqaaYZb7JJpxrzulmnMtxiWeeeu7JZ59+/glooIIOSmihhh6KaKKKLspoo+mkKWeddEJq56RtUmpppJhKyummnl4KqqahVtrpqGE5imqqqq7KaquuvgprrLLOSmuttt6Ka6667orhp6L+SqqvwZpaKrCZDmtsscj/Lntss8o6Kyy0xL7Ga7XWXottttpuy2233n4LbrjijktuueaeC1W0z66rbrvTvpusu/HCyyy79Eo7b771yrsvsej+C3DAAg9McMEGH4xwwgovzHDDDj8M8Uz84tuvvhRfbK/FGVfMMcYTb+zxvSCP/HHJfUSMcsoqr8xyyy6/DHPMMs9Mc80234zzUyZrvHPHJIvcc8g8A0300Eb7HPTPRwuNdA05Pw111FJPTXXVVl+NddZab811115DmHTYRTe9tNJkn8102marLXbZbaO9dtxmfU133XbfjXfeeu/Nd99+/w144IKr/DbbYxvu9uFyK1744ok/DnfjkjNOeX+DQF+Oeeaab855555/Dnrooo9OeunvTA454pFXvnrqjrcOu+qyvz476rHTrpvpuu/Oe+++/w588MIPT3zxxh+/agEAOw==");\n  background-repeat: repeat;\n  height: 7vh;\n}\n\n.searchbar{\n  padding-top: 0.5vh;\n}\n\n.fin-logo{\n  height: 5vw;\n  padding-top: -5vw;\n  float: left;\n}\n\n.back-icon{\n  color: #00acee;\n}\n\n.helpPage{\n  min-height: 70vh;\n}\n\n.custom-container{\n  margin-left: 20px;\n  margin-right: 20px;\n  margin-bottom: 10px;\n  width: 100%\n}\n'
    },
    SMwe: function(e, t) {
        e.exports = ""
    },
    SeBM: function(e, t) {
        e.exports = ".padding-left{\n  padding-left: 25px;\n}\n"
    },
    TKW2: function(e, t) {
        e.exports = '<app-input [inputControl]="formGroup.get(name)" [validationPath]="validationPath" [exceptions]="exceptions">\n  <div><l key="{{label}}" *ngIf="label"></l><span *ngIf="needed"> * </span></div>\n  <div class="checkbox" *ngFor="let button of buttons">\n    <label>\n      <input [formControl]="formGroup.get(name)" type="checkbox" name="{{formControlName}}" value="{{button.value}}">\n      <l *ngIf="button.label" key="{{button.label}}"></l>\n      <l *ngIf="!button.label" key="{{label}}.{{button.value}}"></l>\n    </label>\n  </div>\n</app-input>\n'
    },
    Upkd: function(e, t) {
        e.exports = ".card{\n    border:0px solid rgba(0,0,0,.125);\n  }"
    },
    W67Y: function(e, t) {
        e.exports = '.form-cms{\n  padding-top: 15px;\n}\n\n.margin{\n  padding : 15px;\n}\n\n.topbar-row{\n  height: 8vh;\n  background-image: url("data:image/gif;base64,R0lGODlhdgVaAIABAJeYmv///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjM2RDY0Mjg2ODIyMDY4MTE4QTZERkEyQjZDQjg4QzE2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ2NzA2NzMwMUFFRjExRTdCOUM3QzE0MEMwMzRENjk5IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ2NzA2NzJGMUFFRjExRTdCOUM3QzE0MEMwMzRENjk5IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNkQ2NDI4NjgyMjA2ODExOEE2REZBMkI2Q0I4OEMxNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNkQ2NDI4NjgyMjA2ODExOEE2REZBMkI2Q0I4OEMxNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAEALAAAAAB2BVoAAAL/RH6Godi5WHxy0Tuz1Y7DDXbhJ5bkWZkpio3r26ox68H1bLv4fve6LwPSfsRgcWhMIpc5ZZPJOz6nUWcVKqRmr1op97sNe8VWMnaMLqfP6jb73XXH4eD1/F6X5+nme+QPGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGys7S1tre4ubq7vL2+v7CxwsPExcbHyMnKy8zNzs/AwdLT1NXW19jZ2tvc3d7f0NHi4+Tl5ufo6err7O3u6uvYfXF08/b29Xj3+vt8+n/88PoL+ABAcalCcQYUGFB/MtdNiwH8OJEClKrIjxosaE/xk5bnz4MaLHkSBdvDuJMqXKlSxbunwJM6bMmTRr2ryJM6fOnTx7+vwJNKjQoUSLGj2KNKnSpUybOn0KNarUqVSrWs3UsaRWkVstkuQK1mvXrGHJii0b8qxas2zTtv261q1cuG/HzrVL9y7avHzx+t37d8rVwYQLGz6MOLHixYwbO34MObLkyZQrW76MObPmzZw7e/4MOrTo0aRLmw5aF7DquH1Xp2Yd+LVsvbBd057durZu3LFv+87N2zbw372HGy+OXHjX08ybO38OPbr06dSrW7+OPbv27dy7e/8OPrz48eTLmz+PPj3p4LuJK3/f/jh89vTdx09+f779+vLz+//njx+A+vUn4H/7HUhgWuotyGCDDj4IYYQSTkhhhRZeiGGGGm7IYYcefghiiCKOSGKJWCEYIIoDpphgiyy+uGKMBrooY4E2qjgjjDnWiOONNO4IpI86mkhkkUYeiWSSSi7JZJNOPglllFJOSWWVVl6JZZZabsmOkDz+6GWQPY4JJpk6hommmV+eqaaYZb7JJpxrzulmnMtxiWeeeu7JZ59+/glooIIOSmihhh6KaKKKLspoo+mkKWeddEJq56RtUmpppJhKyummnl4KqqahVtrpqGE5imqqqq7KaquuvgprrLLOSmuttt6Ka6667orhp6L+SqqvwZpaKrCZDmtsscj/Lntss8o6Kyy0xL7Ga7XWXottttpuy2233n4LbrjijktuueaeC1W0z66rbrvTvpusu/HCyyy79Eo7b771yrsvsej+C3DAAg9McMEGH4xwwgovzHDDDj8M8Uz84tuvvhRfbK/FGVfMMcYTb+zxvSCP/HHJfUSMcsoqr8xyyy6/DHPMMs9Mc80234zzUyZrvHPHJIvcc8g8A0300Eb7HPTPRwuNdA05Pw111FJPTXXVVl+NddZab811115DmHTYRTe9tNJkn8102marLXbZbaO9dtxmfU133XbfjXfeeu/Nd99+/w144IKr/DbbYxvu9uFyK1744ok/DnfjkjNOeX+DQF+Oeeaab855555/Dnrooo9OeunvTA454pFXvnrqjrcOu+qyvz476rHTrpvpuu/Oe+++/w588MIPT3zxxh+/agEAOw==");\n  z-index: 1;\n}\n\n.menu-icon{\n  margin-right: 1vw;\n  width: 2vw;\n}\n\n.fin-logo{\n  height: 5vw;\n  padding-top: -5vw;\n  float: left;\n}\n\n#logoSPF {\n  display: inline-block;\n}\n\n.title{\n  padding-top: 10px;\n}\n\n.padding-top{\n  padding-top: 15px;\n}\n\n.padding-both{\n  padding: 40px 0 40px 0\n}\n'
    },
    WiJU: function(e, t) {
        e.exports = '<app-input [label]="name" [inputControl]="formGroup.get(name)" [validationPath]="validationPath" [exceptions]="exceptions">\n  <custom-input-file (onSubmit)="onUpload()" [formControl]="formGroup.get(name)" ></custom-input-file>\n</app-input>\n'
    },
    YBjo: function(e, t) {
        e.exports = ".cell{\n  max-width: 200px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  user-select: auto;\n  -moz-user-select: text;\n  -webkit-user-select: all; /* Ne fonctionne pas pour Safari */\n  -ms-user-select: text;\n}\n\n.tableHeader{\n  color:black;\n}\n\n.white-table{\n  background-color: white;\n}\n\n.custom-container{\n  padding-right: 10px;\n  padding-left: 10px;\n}\n\n.buttons{\n  border-top: solid;\n  border-top-color: black;\n}\n\n.result-list{\n  overflow: auto;\n  position: fixed;\n  width: 100%;\n  height: 40vh;\n}\n\n.dataTables_wrapper .dataTables_length {\n  float: left;\n  padding-top: 5px;\n}\n\n.grey-transparent{\n  background-color: transparent;\n  color: grey;\n}\n\n.align-right{\n  text-align: right;\n}\n\n.blueIcon{\n  color: #00acee;\n}\n\n.margin-custom{\n  padding-left: 15px;\n  padding-right: 15px;\n}\n\n.bold{\n  font-weight: bold;\n}\n"
    },
    "Yjj+": function(e, t) {
        e.exports = ".button_export_to_precad {\n  background-color: white;\n  background-image: url('fin-bt-cancel-myminfin.879111557fbc1256d82c.svg')  !important;\n  position: fixed;\n  top: 8px !important;\n  left: 75px !important;\n  border-style: solid;\n  border-color: black;\n  border-width: 1px;\n  height: 40px !important;\n  width:40px !important;\n}\n\n.button_export_to_precad:hover {\n  cursor: pointer;\n  background-color: white !important;\n  border-radius: 0 !important;\n}\n\n.button_help_precad {\n  background-color: white;\n  background-image: url('fin-bt-quickhelp-blue.3c39f7dfbe3ad9ef4dfe.svg')  !important;\n  position: fixed;\n  top: 95px !important;\n  left: 23px !important;\n  border-style: solid;\n  border-color: black;\n  border-width: 1px;\n  height: 40px !important;\n  width:40px !important;\n}\n\n.button_help_precad:hover {\n  cursor: pointer;\n  background-color: white !important;\n  border-radius: 0 !important;\n}\n"
    },
    Z7SL: function(e, t) {
        e.exports = '<div class="row mgt20">\n  <div class="col-lg-12">\n    <input-text [appState]="stateFormGroup" name="wmsUrl" (appendOnClick)="clickLoadLayer()" label="configuration.wizard.layer.addLayer" appendIcon="plus"></input-text>\n  </div>\n</div>\n<div class="row mgt20">\n  <div class="col-lg-12">\n    <l key="configuration.wizard.layer.availableLayers"></l>\n    <table class="table">\n      <tr>\n        <th><l key="configuration.wizard.layer.addedLayer.name"></l></th>\n        <th><l key="configuration.wizard.layer.addedLayer.title"></l></th>\n        <th><l key="configuration.wizard.layer.addedLayer.description"></l></th>\n      </tr>\n      <tr *ngFor="let layer of addedLayer" [ngClass]="{chosen: selectedLayer !== null && selectedLayer.title === layer.title}" (click)="choseLayer(layer)">\n        <td>{{layer.name}}</td>\n        <td>{{layer.title}}</td>\n        <td>{{layer.abstract}}</td>\n      </tr>\n    </table>\n  </div>\n</div>\n<div class="row mgt20">\n  <div class="col-lg-12">\n    <l key="configuration.wizard.layer.structure"></l>\n    <hr/>\n    <div class="row">\n      <div class="col-lg-8">\n        <input-text [appState]="stateFormGroup" name="tempGroupTitle" [showLabel]="false"></input-text>\n      </div>\n      <div class="col-lg-4">\n        <button class="btn btn-fin01" (click)="addGroup()"><l key="configuration.wizard.layer.addGroup"></l></button>\n      </div>\n    </div>\n    <div class="row" *ngIf="selectedGroup !== null">\n      <div class="col-lg-8">\n        <input-text [appState]="stateFormGroup" name="tempSubGroupTitle" [showLabel]="false"></input-text>\n      </div>\n      <div class="col-lg-4">\n        <button class="btn btn-fin01" (click)="addSubGroup()"><l key="configuration.wizard.layer.addSubGroup"></l></button>\n      </div>\n    </div>\n    <div class="row" *ngIf="selectedSubGroup !== null || selectedGroup !== null">\n      <div class="col-lg-8"><l key="configuration.wizard.layer.addLayerToSubGroupInfo"></l></div>\n      <div class="col-lg-4 text-center">\n        <button class="btn btn-fin01" (click)="addLayer()"><l key="configuration.wizard.layer.addLayerToGroupButton"></l></button>\n      </div>\n    </div>\n  </div>\n</div>\n<div class="row mgt20 mgb20">\n  <div class="col-lg-6">\n    <ul>\n      <li *ngFor="let layerGroup of layerGroups">\n        <div class="row">\n          <div class="col-lg-6">\n            <p [ngClass]="{chosen: selectedGroup !== null && selectedGroup.title === layerGroup.title,toChose:true}" (click)="choseGroup(layerGroup)">{{layerGroup.title}}</p>\n          </div>\n          <div class="col-lg-6">\n            <span><i class="fa fa-remove" (click)="removeFromArray(layerGroups,layerGroup)"></i> </span>\n          </div>\n        </div>\n        <l key="configuration.wizard.group.layers"></l>\n        {{layerGroup.layers.size | json}}\n        <table class="table" *ngIf="layerGroup.layers.length !== 0">\n          <tr>\n            <th><l key="configuration.wizard.layer.addedLayer.name"></l></th>\n            <th><l key="configuration.wizard.layer.addedLayer.title"></l></th>\n            <th><l key="configuration.wizard.layer.addedLayer.active"></l></th>\n            <th><l key="configuration.wizard.layer.addedLayer.opacity"></l></th>\n            <th><l key="configuration.wizard.layer.addedLayer.tiled"></l></th>\n            <th><l key="configuration.wizard.layer.addedLayer.edit"></l></th>\n            <th><l key="configuration.wizard.layer.addedLayer.delete"></l></th>\n          </tr>\n          <tr *ngFor="let layer of layerGroup.layers">\n            <td>{{layer.layerName}}</td>\n            <td>{{layer.title}}</td>\n            <td><input name="active" type="checkbox" [(ngModel)]="layer.active"></td>\n            <td><input type="range" min="0" max="1" step="0.1" [(ngModel)]="layer.opacity"></td>\n            <td><input name="tiled" type="checkbox" [(ngModel)]="layer.tiled"></td>\n            <td><button class="btn btn-fin01" (click)="editLayer(layer)"><i class="fa fa-pencil"></i></button></td>\n            <td><button class="btn btn-fin01" (click)="removeLayer(layerGroup,layer)"><i class="fa fa-remove"></i></button></td>\n          </tr>\n        </table>\n        <hr>\n        <ul>\n          <l *ngIf="layerGroup.subGroups.length !== 0" key="configuration.wizard.group.subGroup"></l>\n          <li *ngFor="let subGroup of layerGroup.subGroups">\n            <div class="row">\n              <div class="col-lg-6">\n                <p [ngClass]="{chosen: selectedSubGroup !== null && selectedSubGroup.title === subGroup.title,toChose:true}" (click)="choseSubGroup(subGroup)">{{subGroup.title}}</p>\n              </div>\n              <div class="col-lg-6">\n                <span class="margin-left"><i class="fa fa-remove" (click)="removeFromArray(layerGroup.subGroups,subGroup)"></i> </span>\n              </div>\n            </div>\n            <ul *ngIf="subGroup.layers.length !== 0">\n              <li>\n                <table class="table" >\n                  <tr>\n                    <th><l key="configuration.wizard.layer.addedLayer.name"></l></th>\n                    <th><l key="configuration.wizard.layer.addedLayer.title"></l></th>\n                    <th><l key="configuration.wizard.layer.addedLayer.active"></l></th>\n                    <th><l key="configuration.wizard.layer.addedLayer.opacity"></l></th>\n                    <th><l key="configuration.wizard.layer.addedLayer.tiled"></l></th>\n                    <th><l key="configuration.wizard.layer.addedLayer.edit"></l></th>\n                    <th><l key="configuration.wizard.layer.addedLayer.delete"</th>\n                  </tr>\n                  <tr *ngFor="let layer of subGroup.layers">\n                    <td>{{layer.layerName}}</td>\n                    <td>{{layer.title}}</td>\n                    <td><input name="active" type="checkbox" [(ngModel)]="layer.active"></td>\n                    <td><input type="range" min="0" max="1" step="0.1" [(ngModel)]="layer.opacity"></td>\n                    <td><input name="tiled" type="checkbox" [(ngModel)]="layer.tiled"></td>\n                    <td><button class="btn btn-fin01" (click)="editLayer(layer)"><i class="fa fa-pencil"></i></button></td>\n                    <td><button class="btn btn-fin01" (click)="removeLayer(subGroup,layer)"><i class="fa fa-remove"></i></button></td>\n                  </tr>\n                </table>\n              </li>\n            </ul>\n          </li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n</div>\n\n'
    },
    ZIp8: function(e, t) {
        e.exports = '<div class="card">\n  <div class="card-header">\n    <div class="nav nav-justified">\n      <div class="nav-item" *ngFor="let step of steps" [ngClass]="{\'active\': step.isActive, \'enabled\': !step.isDisabled, \'disabled\': step.isDisabled, \'completed\': isCompleted}">\n        <a (click)="goToStep(step)"><l key="{{step.title}}"></l></a>\n      </div>\n    </div>\n  </div>\n  <div class="card-block">\n    <ng-content></ng-content>\n  </div>\n  <div class="card-footer" [hidden]="isCompleted">\n    <button type="button" class="btn btn-secondary float-left" (click)="previous()" [hidden]="!hasPrevStep || !activeStep.showPrev"><l key="button.previous"></l></button>\n    <button type="button" class="btn btn-secondary float-right" (click)="next()" [disabled]="!activeStep.isValid" [hidden]="!hasNextStep || !activeStep.showNext"><l key="button.next"></l></button>\n    <button type="button" class="btn btn-secondary float-right" (click)="complete()" [disabled]="!activeStep.isValid" [hidden]="hasNextStep">Done</button>\n  </div>\n</div>\n'
    },
    bOM6: function(e, t) {
        e.exports = '<div class="card">\n  <div>\n    <div class="row pab20">\n      <div class="col-lg-12 nopadding">\n        <app-switch-situation [formGroup]="appState"></app-switch-situation>\n      </div>\n    </div>\n    <div class="row pab20">\n      <div class="col-lg-12 col-12 nopadding">\n        <p style="margin-bottom: 5px" class="card-title info-lvl-1">\n          <l key="layer.menu.layers"></l>\n        </p>\n      </div>\n    </div>\n    <table class="table" id="sectionsTable">\n      <div class="TocGroups layers" id="layersGr" >\n        <hr style="margin-top: 0rem;margin-bottom: 0.5rem;border: 0;border-top: 2px solid rgba(0, 0, 0, 0.726)" />\n          <div class="row">\n            <div class="col-lg-8 col-8">\n              <p style="margin-bottom: 5px" class="card-title info-lvl-1">\n                <l key="layer.menu.layers"></l>\n              </p>\n           </div>\n          <div class="col-lg-2 col-2">\n              <i class="fa fa-angle-double-up pointer" (click)="moveUp(\'layersGr\')"></i>\n              <i class="fa fa-angle-double-down pointer" (click)="moveDown(\'layersGr\')"></i>\n            </div>\n         </div>\n      <ng-container *ngFor="let group of getKeys(layers); let i = index">\n        <tr *ngIf="layers.get(group).get(\'layers\').size != 0 || layers.get(group).get(\'subGroup\').size != 0">\n          <td *ngIf="!isGroupEmpty(group)" [id]="group" [ngClass]="{\'collapsed\': layers.get(group).hidden}">\n            <div class="row">\n              <div *ngIf="isEmpty(translations.get(group))" class="col-lg-8 col-8 info-lvl-2"\n                (click)="hideGroup(layers.get(group))">\n                <p style="margin-bottom: 0px">{{group}}</p>\n              </div>\n              <div *ngIf="!isEmpty(translations.get(group))" class="col-lg-8 col-8 info-lvl-2"\n                (click)="hideGroup(layers.get(group))">\n                <span [innerHtml]="getCurrentTranslations(translations.get(group))"></span>\n              </div>\n              <div class="col-lg-2 col-2">\n                <i class="fa fa-angle-double-up pointer" (click)="swipeGr(\'up\',layers, i,\'LAYERS\')"></i>\n                <i class="fa fa-angle-double-down pointer" (click)="swipeGr(\'down\',layers, i,\'LAYERS\')"></i>\n              </div>\n              <div class="col-lg-2 col-2">\n                <i class="fa fa-caret-up pointer" *ngIf="!layers.get(group).hidden"\n                  (click)="hideGroup(layers.get(group))"></i>\n                <i class="fa fa-caret-down pointer" *ngIf="layers.get(group).hidden"\n                  (click)="hideGroup(layers.get(group))"></i>\n              </div>\n              <div class="col-lg-12 col-12 nopadding"\n                *ngFor="let layer of getKeys(layers.get(group).get(\'layers\'));last as isLast; let i= index">\n                <div [id]="layer"\n                  *ngIf="layers.get(group).get(\'layers\').get(layer).addedToMap && !layers.get(group).hidden && !isAVector(layer)">\n                  <hr style="margin-top: 0rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                  <div class="row">\n                  \x3c!-- [ngClass]="{\'row\': true,\'greyed\': isLayerVisibleOnMap(layers.get(group).get(\'layers\').get(layer))}">--\x3e\n                    <div class="col-lg-1 col-1">\n                      <input type="checkbox" [checked]="getPermissionsFromLayer(layer,group,\'visibleByDefault\')"\n                        [(ngModel)]="layers.get(group).get(\'layers\').get(layer).active"\n                        (ngModelChange)="updateVectorLayers(layer,group,null)" />\n                    </div>\n                    <div *ngIf="isEmpty(translations.get(layer))" class="col-lg-5 col-5 info-lvl-4">\n                      <p style="margin-bottom: 0px;">{{layer}}</p>\n                    </div>\n                    <div *ngIf="!isEmpty(translations.get(layer))" class="col-lg-5 col-5 info-lvl-4">\n                      <span style="margin-bottom: 0px;"\n                        [innerHtml]="getCurrentTranslations(translations.get(layer))"></span>\n                    </div>\n                    <div class="col-lg-2 col-2">\n                      <i class="fa fa-angle-double-up pointer" (click)="swipeLayers(\'up\',group, i,\'LAYERS\')"></i>\n                      <i class="fa fa-angle-double-down pointer" (click)="swipeLayers(\'down\',group, i,\'LAYERS\')"></i>\n                    </div>\n                    <div class="col-lg-1 col-1">\n                      <i *ngIf="layers.get(group).get(\'layers\').get(layer).moreInformation"\n                        class="fa fa-caret-up pointer"\n                        (click)="showMoreInformationFor(layers.get(group).get(\'layers\').get(layer))"></i>\n                      <i *ngIf="!layers.get(group).get(\'layers\').get(layer).moreInformation"\n                        class="fa fa-caret-down pointer"\n                        (click)="showMoreInformationFor(layers.get(group).get(\'layers\').get(layer))"></i>\n                    </div>\n                    <div class="col-lg-1 col-1">\n                      <i class="fa fa-eye pointer"\n                        (click)="showOpacity(layers.get(group).get(\'layers\').get(layer))"></i>\n                    </div>\n                    <div class="col-lg-1 col-1">\n                      <i *ngIf="getPermissionsFromLayer(layer,group,\'deletion\')"\n                        (click)="removeTocLayer(layers.get(group).get(\'layers\').get(layer))"\n                        class="fa fa-remove pointer"></i>\n                    </div>\n                  </div>\n                  <div class="row" *ngIf="layers.get(group).get(\'layers\').get(layer).moreInformation">\n                    <hr style="margin-top: 0rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                    <div class="col-lg-1 col-1"></div>\n                    <div class="col-lg-8 col-8">\n                      <l key="layer.legend"></l>\n                      <p style="margin-bottom: 5px"></p>\n                      <img [src]="layers.get(group).get(\'layers\').get(layer).legendUrl" />\n                    </div>\n                    <div class="col-lg-2 col-2"> <i class="fa fa-info-circle"\n                        (click)="openLayerDescription(layers.get(group).get(\'layers\').get(layer))"></i>\n                    </div>\n                  </div>\n                  <div class="row" *ngIf="layers.get(group).get(\'layers\').get(layer).showOpacity">\n                    <hr\n                      style="margin-top: 0.5rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                    <div class="col-lg-1 col-1"></div>\n                    <div class="col-lg-9 col-9">\n                      <label for="myRange">\n                        <l key="layer.opacity"></l>\n                      </label>\n                      <div class="row">\n                        <label>0</label>\n                        &nbsp;\n                        <input type="range" class="slider" id="myRange" min="0" max="1" value="1" step="0.1"\n                          [(ngModel)]="layers.get(group).get(\'layers\').get(layer).opacity"\n                          (ngModelChange)="updateOpacity(layer)">\n                        <label>100</label>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class="col-lg-12 col-12" *ngIf="!layers.get(group).hidden">\n                <div class="col-lg-12 col-12" *ngFor="let subGroup of getKeys(layers.get(group).get(\'subGroup\'))"\n                  [id]="subGroup" [ngClass]="{\'collapsed\': layers.get(group).get(\'subGroup\').get(subGroup).hidden}">\n                  <ng-container *ngIf="!isSubGroupEmpty(group,subGroup)">\n                    <hr style="margin-top: 0rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                    <div class="row">                       \n                      <div *ngIf="isEmpty(translations.get(subGroup))" class="col-lg-10 col-10 info-lvl-3"\n                          (click)="hideGroup(layers.get(group).get(\'subGroup\').get(subGroup))">\n                        <p style="margin-bottom: 0px">{{subGroup}}</p>\n                      </div>\n                      <div *ngIf="!isEmpty(translations.get(subGroup))" class="col-lg-10 col-10 info-lvl-3"\n                          (click)="hideGroup(layers.get(group).get(\'subGroup\').get(subGroup))">\n                        <span style="margin-bottom: 0px;"\n                          [innerHtml]="getCurrentTranslations(translations.get(subGroup))"></span>\n                      </div>\n                      <div class="col-lg-2 col-2">\n                        <i class="fa fa-caret-up pointer"\n                          *ngIf="!layers.get(group).get(\'subGroup\').get(subGroup).hidden"\n                          (click)="hideGroup(layers.get(group).get(\'subGroup\').get(subGroup))"></i>\n                        <i class="fa fa-caret-down pointer"\n                          *ngIf="layers.get(group).get(\'subGroup\').get(subGroup).hidden"\n                          (click)="hideGroup(layers.get(group).get(\'subGroup\').get(subGroup))"></i>\n                      </div>\n                    </div>\n                    <div  *ngFor="let layerOfSubGroup of getKeys(layers.get(group).get(\'subGroup\').get(subGroup));last as isLast; let i=index">\n                      <div [id]="layerOfSubGroup"\n                        *ngIf="layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).addedToMap  && !layers.get(group).get(\'subGroup\').get(subGroup).hidden && !isAVector(layerOfSubGroup)"\n                        [ngClass]="{\'row\': true,\'margin-left\': true,\'greyedDisabled\': isLayerVisibleOnMap(layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup))}">\n                        <hr\n                          style="margin-top: 0rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                        <div class="col-lg-1 col-1">\n                          <input type="checkbox"\n                            [checked]="getPermissionsFromLayer(layerOfSubGroup,group,\'visibleByDefault\',subGroup)"\n                            [(ngModel)]="layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).active"\n                            (ngModelChange)="updateVectorLayers(layerOfSubGroup,group,subGroup)" />\n                        </div>\n                        <div *ngIf="isEmpty(translations.get(layerOfSubGroup))" class="col-lg-5 col-5 info-lvl-4">\n                          <p style="margin-bottom: 0px">{{layerOfSubGroup}}</p>\n                        </div>\n                        <div *ngIf="!isEmpty(translations.get(layerOfSubGroup))" class="col-lg-5 col-5 info-lvl-4">\n                          <span style="margin-bottom: 0px;"\n                            [innerHtml]="getCurrentTranslations(translations.get(layerOfSubGroup))"></span>\n                        </div>\n                        <i class="fa fa-angle-double-up pointer" (click)="swipeSubLayers(\'up\',group,subGroup, i,\'LAYERS\')"></i>\n                        <i class="fa fa-angle-double-down pointer" (click)="swipeSubLayers(\'down\',group,subGroup, i,\'LAYERS\')"></i>\n                        <div class="col-lg-1 col-1">\n                          <i *ngIf="layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).moreInformation"\n                            class="fa fa-caret-up pointer"\n                            (click)="showMoreInformationFor(layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup))"></i>\n                          <i *ngIf="!layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).moreInformation"\n                            class="fa fa-caret-down pointer"\n                            (click)="showMoreInformationFor(layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup))"></i>\n                        </div>\n                        <div class="col-lg-1 col-1">\n                          <i class="fa fa-eye pointer"\n                            (click)="showOpacity(layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup))"></i>\n                        </div>\n                        <div class="col-lg-1 col-1">\n                          <i *ngIf="getPermissionsFromLayer(layerOfSubGroup,group,\'deletion\',subGroup)"\n                            (click)="removeTocLayer(layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup))"\n                            class="fa fa-remove pointer"></i>\n                        </div>\n                        <div class="row col-lg-12 col-12"\n                          *ngIf="layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).moreInformation">\n                          <hr\n                            style="margin-top: 0rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                          <div class="col-lg-1 col-1"></div>\n                          <div class="col-lg-8 col-8">\n                            <l key="layer.legend"></l>\n                            <p style="margin-bottom: 5px"></p>\n                            <img\n                              [src]="layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).legendUrl" />\n                          </div>\n                          <div class="col-lg-2 col-2"> <i class="fa fa-info-circle"\n                              (click)="openLayerDescription(layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup))"></i>\n                          </div>\n                        </div>\n                        <div class="row col-lg-12 col-12"\n                          *ngIf="layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).showOpacity">\n                          <hr\n                            style="margin-top: 0.5rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                          <div class="col-lg-1 col-1"></div>\n                          <div class="col-lg-9 col-9">\n                            <label for="myRange">\n                              <l key="layer.opacity"></l>\n                            </label>\n                            <div class="row">\n                              <label>0</label>\n                              &nbsp;\n                              <input type="range" class="slider" id="myRange" min="0" max="1" value="1" step="0.1"\n                                [(ngModel)]="layers.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).opacity"\n                                (ngModelChange)="updateOpacity(layerOfSubGroup)">\n                              <label>100</label>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                   </ng-container>\n                  </div>\n              </div>\n            </div>\n          </td>\n        </tr>\n      </ng-container>\n    </div>\n      <div class=" TocGroups inspire" #inspireGr id="inspireGr" *ngIf="inspire.size !== 0 && !isInspireSectionEmpty()">\n        <hr style="margin-top: 0rem;margin-bottom: 0.5rem;border: 0;border-top: 2px solid rgba(0, 0, 0, 0.726)" />\n        <div class="row" >\n          <div class="col-lg-8 col-8">\n            <p  class="card-title  info-lvl-1">\n              <l key="layer.inspire.title"></l>\n            </p>\n         </div>\n        <div class="col-lg-2 col-2">\n            <i class="fa fa-angle-double-up pointer" (click)="moveUp(\'inspireGr\')"></i>\n            <i class="fa fa-angle-double-down pointer" (click)="moveDown(\'inspireGr\')"></i>\n          </div>\n       </div>\n      <tr *ngFor="let group of getKeys(inspire); let i=index">\n        <td *ngIf="!isInspireGroupEmpty(group)">\n          <div class="row">\n            <div *ngIf="isEmpty(translations.get(group))" class="col-lg-8 col-8 info-lvl-2">\n              <p style="margin-bottom: 0px">{{group}}</p>\n            </div>\n            <div *ngIf="!isEmpty(translations.get(group))" class="col-lg-8 col-8 info-lvl-2">\n              <span [innerHtml]="getCurrentTranslations(translations.get(group))"></span>\n            </div>\n            <div class="col-lg-2 col-2">\n              <i class="fa fa-angle-double-up pointer" (click)="swipeGr(\'up\',inspire, i,\'INSPIRE\')"></i>\n              <i class="fa fa-angle-double-down pointer" (click)="swipeGr(\'down\',inspire, i,\'INSPIRE\')"></i>\n            </div>\n            <div class="col-lg-2 col-2">\n              <i class="fa fa-caret-up pointer" *ngIf="!inspire.get(group).hidden"\n                (click)="hideGroup(inspire.get(group))"></i>\n              <i class="fa fa-caret-down pointer" *ngIf="inspire.get(group).hidden"\n                (click)="hideGroup(inspire.get(group))"></i>\n            </div>\n          </div>\n            <div class="col-lg-12 col-12 nopadding" *ngFor="let layer of getKeys(inspire.get(group).get(\'layers\')); let i=index">\n              <div [id]="layer"\n                *ngIf="inspire.get(group).get(\'layers\').get(layer).addedToMap && !inspire.get(group).hidden">\n                <hr style="margin-top: 0rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                <div class="row col-lg-12 col-12 nopadding">\n                  <div class="col-lg-1 col-1">\n                    <input type="checkbox" [checked]="inspire.get(group).get(\'layers\').get(layer).active"\n                      [(ngModel)]="inspire.get(group).get(\'layers\').get(layer).active"\n                      (ngModelChange)="updateInspireLayer()" />\n                  </div>\n                  <div *ngIf="isEmpty(translations.get(layer))" class="col-lg-5 col-5 info-lvl-4">\n                    <p style="margin-bottom: 0px">{{layer}}</p>\n                  </div>\n                  <div *ngIf="!isEmpty(translations.get(layer))" class="col-lg-5 col-5 info-lvl-4">\n                    <span style="margin-bottom: 0px"\n                      [innerHtml]="getCurrentTranslations(translations.get(layer))"></span>\n                  </div>\n                  <div class="col-lg-2 col-2">\n                    <i class="fa fa-angle-double-up pointer" (click)="swipeLayers(\'up\',group, i,\'INSPIRE\')"></i>\n                    <i class="fa fa-angle-double-down pointer" (click)="swipeLayers(\'down\',group, i,\'INSPIRE\')"></i>\n                  </div>\n                  <div class="col-lg-1 col-1">\n                    <i *ngIf="inspire.get(group).get(\'layers\').get(layer).moreInformation"\n                      class="fa fa-caret-up pointer"\n                      (click)="showMoreInformationFor(inspire.get(group).get(\'layers\').get(layer))"></i>\n                    <i *ngIf="!inspire.get(group).get(\'layers\').get(layer).moreInformation"\n                      class="fa fa-caret-down pointer"\n                      (click)="showMoreInformationFor(inspire.get(group).get(\'layers\').get(layer))"></i>\n                  </div>\n                  <div class="col-lg-1 col-1">\n                    <i class="fa fa-eye pointer" (click)="showOpacity(inspire.get(group).get(\'layers\').get(layer))"></i>\n                  </div>\n                  <div class="col-lg-1 col-1">\n                    <i *ngIf="inspire.get(group).get(\'layers\').get(layer).canDelete"\n                      (click)="removeInspireLayer(inspire.get(group).get(\'layers\').get(layer))"\n                      class="fa fa-remove pointer"></i>\n                  </div>\n                </div>\n                <div class="row" *ngIf="inspire.get(group).get(\'layers\').get(layer).moreInformation">\n                  <hr style="margin-top: 0rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                  <div class="col-lg-1 col-1"></div>\n                  <div class="col-lg-8 col-8">\n                    <l key="layer.legend"></l>\n                    <p style="margin-bottom: 5px"></p>\n                    <img [src]="inspire.get(group).get(\'layers\').get(layer).legendUrl" />\n                  </div>\n                </div>\n                <div class="row" *ngIf="inspire.get(group).get(\'layers\').get(layer).showOpacity">\n                  <hr style="margin-top: 0.5rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                  <div class="col-lg-1 col-1"></div>\n                  <div class="col-lg-9 col-9">\n                    <label for="myRange">\n                      <l key="layer.opacity"></l>\n                    </label>\n                    <div class="row">\n                      <label>0</label>\n                      <input type="range" class="slider" id="myRange" min="0" max="1" value="1" step="0.1"\n                        [(ngModel)]="inspire.get(group).get(\'layers\').get(layer).opacity"\n                        (ngModelChange)="updateOpacity(layer)">\n                      <label>100</label>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div *ngIf="!inspire.get(group).hidden">\n              <div class="col-lg-12 col-12 nopadding margin-left" *ngFor="let subGroup of getKeys(inspire.get(group).get(\'subGroup\')); let i=index">\n                <ng-container *ngIf="!isInspireSubGroupEmpty(group,subGroup)">\n                  <hr style="margin-top: 0.5rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                  <div class="row col-lg-12 col-12">\n                    <div *ngIf="isEmpty(translations.get(subGroup))" class="col-lg-8 col-8 info-lvl-3">\n                      <p style="margin-bottom: 0px">{{subGroup}}</p>\n                    </div>\n                    <div *ngIf="!isEmpty(translations.get(subGroup))" class="col-lg-8 col-8 info-lvl-3">\n                      <span style="margin-bottom: 0px"\n                        [innerHtml]="getCurrentTranslations(translations.get(subGroup))"></span>\n                    </div>\n                    <div class="col-lg-2 col-2">\n                      <i class="fa fa-angle-double-up pointer" (click)="rearrangeInspireSubGroup(\'up\',group, i)"></i>\n                      <i class="fa fa-angle-double-down pointer" (click)="rearrangeInspireSubGroup(\'down\',group, i)"></i>\n                    </div>\n                    <div class="col-lg-2 col-2">\n                      <i class="fa fa-caret-up pointer" *ngIf="!inspire.get(group).get(\'subGroup\').get(subGroup).hidden"\n                        (click)="hideGroup(inspire.get(group).get(\'subGroup\').get(subGroup))"></i>\n                      <i class="fa fa-caret-down pointer"\n                        *ngIf="inspire.get(group).get(\'subGroup\').get(subGroup).hidden"\n                        (click)="hideGroup(inspire.get(group).get(\'subGroup\').get(subGroup))"></i>\n                    </div>\n                  </div>\n\n                  <div *ngFor="let layerOfSubGroup of getKeys(inspire.get(group).get(\'subGroup\').get(subGroup)); let i =index">\n                    <div [id]="layerOfSubGroup"\n                      *ngIf="inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).addedToMap && !inspire.get(group).get(\'subGroup\').get(subGroup).hidden"\n                      class="row">\n                      <hr\n                        style="margin-top: 0.5rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                      <div class="row col-lg-12 col-12">\n                        <div class="col-lg-1 col-1">\n                          <input type="checkbox"\n                            [checked]="inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).active"\n                            [(ngModel)]="inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).active"\n                            (ngModelChange)="updateInspireLayer()" />\n                        </div>\n                        <div *ngIf="isEmpty(translations.get(layerOfSubGroup))" class="col-lg-5 col-5 info-lvl-4">\n                          <p style="margin-bottom: 0px">{{layerOfSubGroup}}</p>\n                        </div>\n                        <div *ngIf="!isEmpty(translations.get(layerOfSubGroup))" class="col-lg-5 col-5 info-lvl-4">\n                          <span style="margin-bottom: 0px"\n                            [innerHtml]="getCurrentTranslations(translations.get(layerOfSubGroup))"></span>\n                        </div>\n                        <div class="col-lg-2 col-2">\n                          <i class="fa fa-angle-double-up pointer" (click)="swipeSubLayers(\'up\',group,subGroup, i,\'INSPIRE\')"></i>\n                          <i class="fa fa-angle-double-down pointer" (click)="swipeSubLayers(\'down\',group,subGroup, i,\'INSPIRE\')"></i>\n                        </div>\n                        <div class="col-lg-1 col-1">\n                          <i *ngIf="inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).moreInformation"\n                            class="fa fa-caret-up pointer"\n                            (click)="showMoreInformationFor(inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup))"></i>\n                          <i *ngIf="!inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).moreInformation"\n                            class="fa fa-caret-down pointer"\n                            (click)="showMoreInformationFor(inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup))"></i>\n                        </div>\n                        <div class="col-lg-1 col-1">\n                          <i class="fa fa-eye pointer"\n                            (click)="showOpacity(inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup))"></i>\n                        </div>\n                        <div class="col-lg-1 col-1">\n                          \x3c!-- changed from layer to layerOfSubgroup--\x3e\n                          <i *ngIf="inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).canDelete"\n                            (click)="removeInspireLayer(inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup))"\n                            class="fa fa-remove pointer"></i>\n                        </div>\n                        <div class="row col-lg-12 col-12"\n                          *ngIf="inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).moreInformation">\n                          <hr\n                            style="margin-top: 0rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                          <div class="col-lg-1 col-1"></div>\n                          <div class="col-lg-8 col-8">\n                            <l key="layer.legend"></l>\n                            <p style="margin-bottom: 5px"></p>\n                            <img\n                              [src]="inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).legendUrl" />\n                          </div>\n                        </div>\n                        <div class="row col-lg-12 col-12"\n                          *ngIf="inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).showOpacity">\n                          <hr\n                            style="margin-top: 0.5rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                          <div class="col-lg-1 col-1"></div>\n                          <div class="col-lg-8 col-8">\n                            <label for="myRange">\n                              <l key="layer.opacity"></l>\n                            </label>\n                            <div class="row">\n                              <label>0</label>\n                              &nbsp;\n                              <input type="range" class="slider" id="myRange" min="0" max="1" value="1" step="0.1"\n                                [(ngModel)]="inspire.get(group).get(\'subGroup\').get(subGroup).get(layerOfSubGroup).opacity"\n                                (ngModelChange)="updateInspireOpacity(layerOfSubGroup)">\n                              <label>100</label>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </ng-container>\n              </div>\n            </div>\n        </td>\n      </tr>\n    </div>\n\n\n    <div class=" TocGroups historic" #historicGr id="historicGr" *ngIf="!isHistoricEmpty()">\n      <div class="row">\n        <hr class="splitGroup"/>\n        <div class="col-lg-8 col-8">\n          <p class="card-title info-lvl-1" >\n            <l key="layer.historic.title"></l>\n          </p>\n       </div>\n       <div class="col-lg-2 col-2">\n        <i class="fa fa-angle-double-up pointer" (click)="moveUp(\'historicGr\')"></i>\n        <i class="fa fa-angle-double-down pointer" (click)="moveDown(\'historicGr\')"></i>\n      </div>\n    </div>\n       <div class="col-lg-2 col-2">\n         <i class="fa fa-caret-up pointer" *ngIf="!historic.hidden"\n          (click)="hideGroup(historic)"></i>\n         <i class="fa fa-caret-down pointer" *ngIf="historic.hidden"\n          (click)="hideGroup(historic)"></i>\n       </div>\n    <div  *ngIf="!historic.hidden">\n      <tr *ngFor="let layer of getKeys(historic)">\n        <td *ngIf="historic.get(layer).addedToMap">\n          <div class="row">\n            <div class="col-lg-1 col-1">\n              <input type="checkbox" [checked]="historic.get(layer).active" [(ngModel)]="historic.get(layer).active"\n                (ngModelChange)="updateHistoricLayer(layer)" />\n            </div>\n            <div class="col-lg-5 col-5 info-lvl-4">\n              {{layer}}\n            </div>\n            <div class="col-lg-1 col-1">\n              <i *ngIf="historic.get(layer).moreInformation" class="fa fa-caret-up pointer"\n                (click)="showMoreInformationFor(historic.get(layer))"></i>\n              <i *ngIf="!historic.get(layer).moreInformation" class="fa fa-caret-down pointer"\n                (click)="showMoreInformationFor(historic.get(layer))"></i>\n            </div>\n            <div class="col-lg-1 col-1">\n              <i class="fa fa-eye pointer" (click)="showOpacity(historic.get(layer))"></i>\n            </div>\n            <div class="col-lg-1 col-1">\n              <i (click)="removeHistoricLayer(historic.get(layer))" class="fa fa-remove pointer"></i>\n            </div>\n            <div class="row pat20">\n              <div class="row" *ngIf="historic.get(layer).showOpacity">\n                <hr style="margin-top: 0.5rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n                <div class="col-lg-1 col-1"></div>\n                <div class="col-lg-9 col-9">\n                  <label for="myRange">\n                    <l key="layer.opacity"></l>\n                  </label>\n                  <div class="row">\n                    <label>0</label>\n                    &nbsp;\n                    <input type="range" class="slider" id="myRange" min="0" max="1" value="1" step="0.1"\n                      [(ngModel)]="historic.get(layer).opacity" (ngModelChange)="updateHistoricOpacity(layer)">\n                    <label>100</label>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </td>\n      </tr>\n    </div>\n    </div>\n\n    <div class=" TocGroups userLayers" #userGr id="userGr" *ngIf="!isUserLayerSectionEmpty()">\n\n      <hr style="margin-top: 0rem;margin-bottom: 0.5rem;border: 0;border-top: 2px solid rgba(0, 0, 0, 0.726)" />\n      <div class="row" >\n        <div class="col-lg-8 col-8">\n          <p  class="card-title  info-lvl-1">\n            <l key="layer.userLayer.title"></l>\n          </p>\n       </div>\n      <div class="col-lg-2 col-2">\n          <i class="fa fa-angle-double-up pointer" (click)="moveUp(\'userGr\')"></i>\n          <i class="fa fa-angle-double-down pointer" (click)="moveDown(\'userGr\')"></i>\n        </div>\n      </div>\n\n      <app-user-layer-list [appState]="appState"></app-user-layer-list>\n    </div>\n    \n    </table>\n    <div class="col-lg-12 col-12 nopadding">\n      <button (click)="showAddLayerMenuToggle()" class="btn btn-fin01" [id]="addLayer">\n        <l key="layerList.add.layer"></l>\n      </button>\n    </div>\n  </div>\n</div>\n'
    },
    bPh5: function(e, t) {
        e.exports = ".modal-custom{\n  width: 850px;\n}\n"
    },
    bgOE: function(e, t) {
        e.exports = '<div class="row">\n  <div class="col-lg-12">\n    <p class="text-center"><l key="configuration.wizard.step4.title"></l></p>\n  </div>\n</div>\n<div class="row">\n  <div class="col-lg-5">\n    <l key="configuration.wizard.available.backdrops"></l>\n  </div>\n  <div class="col-lg-2">\n\n  </div>\n  <div class="col-lg-5">\n    <l key="configuration.wizard.chosen.backdrops"></l>\n  </div>\n</div>\n<div class="row">\n<div class="col-lg-5">\n  <table class="table">\n    <tr *ngFor="let backdrop of backdrops; let i = index">\n      <td [ngClass]="{chosen: selectedBackdrop !== null && selectedBackdrop.title === backdrop.title}" (click)="choseBackdrop(backdrop)">{{backdrop.title}}</td>\n    </tr>\n  </table>\n</div>\n<div class="col-lg-2">\n  <div class="row">\n    <button class="btn btn-fin01" (click)="addChosenBackdrop()"><icon code="arrow-right" size="2"></icon></button>\n  </div>\n  <br/>\n  <div class="row">\n    <button class="btn btn-fin01" (click)="removeChosenBackdrop()"><icon code="arrow-left" size="2"></icon></button>\n  </div>\n</div>\n<div class="col-lg-5">\n  <table class="table">\n    <tr *ngFor="let backdrop of chosenBackdrops; let i= index">\n      <td [ngClass]="{chosen: selectedBackdrop !== null && selectedBackdrop.title === backdrop.title}" (click)="choseBackdrop(backdrop)">{{backdrop.title}}</td>\n    </tr>\n  </table>\n</div>\n</div>\n\n\n'
    },
    btLJ: function(e, t) {
        e.exports = '<app-input [inputControl]="formGroup.get(name)" [validationPath]="validationPath" [exceptions]="exceptions">\n  <div class="form-check">\n    <input [id]="name" class="form-check-input" trueFalseValue [trueValue]="true" [falseValue]="false" [formControl]="formGroup.get(name)" type="checkbox" name="{{formControlName}}">\n    <label class="form-check-label" [for]="name">\n      <l key="{{label}}" *ngIf="label"></l><span *ngIf="needed"> * </span>\n    </label>\n  </div>\n</app-input>\n'
    },
    btZe: function(e, t) {
        e.exports = ".chosen{\n  background-color: lightgrey;\n}\n\n\n"
    },
    bva2: function(e, t) {
        e.exports = ".card{\n    border:0px solid rgba(0,0,0,.125);\n  }\n\n  hr.splitGroup {\n    border-top : solid 2px #353535;\n  }"
    },
    bwaT: function(e, t) {
        e.exports = '<div id="popup" class="ol-popup" ngDraggable #block="ngDraggable" [handle]="dragHandle" >\n  <div class="row" #dragHandle >\n    <div class="col-lg-1 col-1" >\n         <i class="info-icon fa-1x" ></i>\n    </div>\n    <div class="col-lg-9 col-9 popup-header" > <l key="popup.information"></l></div>\n    <div class="col-lg-2 col-2">\n        <a href="#" id="popup-closer" class="ol-popup-closer" (click)="block.resetPosition()"></a>\n    </div>\n  </div>\n  <hr style="height:1px;border:none;color:#333;background-color:#333;" />\n  <div class="panel" id="main_content"></div>\n  <div class="scrollable">\n    <ng-container *ngFor="let layer of layerNames">\n      <button class="accordion info-features-button" [id]="\'popup_button_\'+layer.split(\' \').join(\'_\').toLowerCase()" (click)="displayFeatures(layer)"\n              style="display:none;font-size: 0.9em;" [innerHtml]="getCurrentTranslation(layer)">\n      </button>\n\n      <div class="panel info-features" [id]="\'info_feature_\'+layer.split(\' \').join(\'_\').toLowerCase()" *ngIf="this.featuresByLayer.get(layer)" style="display:none;" >\n        <ng-container *ngFor="let feature of this.featuresByLayer.get(layer); let i = index">\n                          <hr/>\n\n          <div class="row">\n              <div class="pointercol-lg-11 col-11" (click)="selectFeature(layer,i)">\n                <ng-container *ngFor="let pairing of feature; first as isFirst; last as isLast">\n                  <ng-container *ngIf="(layer===\'Gpn_SuDo_title\' && isFirst) || (layer===\'Gpn_SkDo_title\' && isFirst) || (layer !==\'Gpn_SuDo_title\' && layer !==\'Gpn_SkDo_title\') ">\n                    <span class="keyLabel" *ngIf="isSpecialValue(pairing.key.toUpperCase(), pairing.tableName)">\n                      <l  key="{{pairing.key.toLowerCase()}}"></l> : <code> <l key="{{pairing.value}}"></l> </code>\n                    </span>\n                    <span class="keyLabel" *ngIf="!isSpecialValue(pairing.key.toUpperCase(), pairing.tableName)">\n                      <l key="{{pairing.key.toLowerCase()}}"></l> : <code> {{pairing.value}} </code>\n                    </span>\n                  </ng-container>\n                  <br/>\n              </ng-container>\n                <span class="capakeySearch" *ngIf="isBpnCapa(layer)"><button class="btn-fin01 btn" (click)="goToPow(feature)"><l key="button.moreInfo"></l></button></span>\n              </div>\n            <div class="col-lg-1 col-1" *ngIf="layer===\'Gpn_SuDo_title\'">\n                <i class="fa fa-plus-circle" (click)="searchSurveyorPlan(feature)" ></i>\n            </div>\n            <div class="col-lg-1 col-1" *ngIf="layer===\'Gpn_SkDo_title\'">\n              <i class="fa fa-plus-circle" (click)="searchSketchDocument(feature)" ></i>\n          </div>\n        </div>\n        </ng-container>\n      </div>\n      <div class="hrStyle"  [id]="\'line_\'+layer.split(\' \').join(\'_\').toLowerCase()" *ngIf="this.featuresByLayer.get(layer)">\n        <hr  />\n    </div>\n    </ng-container>\n    <button class="accordion info-features-button" id="popup_button_main" style="display:none" (click)="displayMessage()"><l key="identify.remark.title"></l></button>\n    <div class="panel" id="popup_content_main" style="display:none"><l key="identify.remark.description"></l></div>\n  </div>\n</div>\n'
    },
    "cI4+": function(e, t) {
        e.exports = '<div id="map" [ngClass]="getMapClass()"></div>\n<mapview-subscription-manager [appState]="appState" [map]="map" [select]="select" [selectedPixel]="selectedPixel"></mapview-subscription-manager>\n<app-cadex-manager [appState]="appState" [select]="select"></app-cadex-manager>\n<app-precad-manager [appState]="appState" [select]="select"></app-precad-manager>\n<app-cdms-manager [appState]="appState" [select]="select"></app-cdms-manager>\n<popup [appState]="appState" [coordinates]="popupPosition" [popup]="popup" [features]="featuresUnderClick" ></popup>\n<div class="serviceMessage" *ngIf="showServiceMessage()">\n  <app-cms-alert key="serviceMessage"></app-cms-alert>\n</div>\n<div class="copyright" *ngIf="isCartowebShown() && copyright">\n  <div [innerHtml]="sanitizeStyle(copyright[getLang()])"></div>\n</div>\n\n'
    },
    d6Vc: function(e, t) {
        e.exports = '<div class="container">\n  <form [formGroup]="extractionToolForm" novalidate>\n    <div class="row" style="margin-bottom: 0.2rem; margin-top: 0.2rem;">\n      <div class="col-lg-6">\n        <label>\n          <l key="extraction.tool.name"></l>\n          <input class="disabled-style" type="text" size="30" formControlName="namePersidf" readonly/>\n        </label>\n      </div>\n    </div>\n    <div class="row" style="margin-bottom: 0.2rem; margin-top: 0.2rem;">\n      <div class="col-lg-6">\n        <label>\n          <l key="extraction.tool.firstname"></l>\n          <input class="disabled-style" type="text" size="30" formControlName="firstNamePersidf" readonly/>\n        </label>\n      </div>\n    </div>\n\n    <div>\n      \x3c!--<div *ngIf="!extractionToolForm.controls[\'emailPersidf\'].hasError(\'required\')">--\x3e\n      \x3c!--<br/>--\x3e\n      <div class="row" style="margin-bottom: 0.2rem; margin-top: 0.2rem;">\n        <div class="col-lg-6">\n          <label>\n            <l key="extraction.tool.situation"></l>\n          </label>\n        </div>\n        <div class="col-lg-6" *ngIf="appState.get(\'currentSituation\').value === \'CURRENT\'">\n          <l key="situation.current"></l>\n        </div>\n        <div class="col-lg-6" *ngIf="appState.get(\'currentSituation\').value === \'FISCAL\'">\n          <l key="situation.fiscal"></l>\n        </div>\n      </div>\n\n      <div class="row" style="margin-bottom: 1rem">\n        <div class="col-lg-6">\n          <label>\n            <l key="extraction.tool.zone"></l>\n          </label>\n        </div>\n        <div class="col-lg-6">\n          <button class="btn btn-fin01" (click)="activateSelection()" type="button">\n            <l key="extraction.tool.zoneSelectButton"></l>\n          </button>\n        </div>\n      </div>\n\n      <div class="row" style="margin-bottom: 0.5rem">\n        <div class="col-lg-7">\n          <label>\n            <l key="extraction.tool.format"></l>\n          </label>\n        </div>\n        <div class="col-lg-5">\n          <select formControlName="format" [(ngModel)]="typeFormat" name="format" class="select-style"\n                  (change)="selectFormatInput($event)">\n            <option value="1">dxf</option>\n            <option value="0">shp</option>\n          </select>\n        </div>\n      </div>\n\n      <div class="row" style="margin-bottom: 0.2rem">\n        <div class="col-lg-7">\n          <label>\n            <l key="extraction.tool.intersect"></l>\n          </label>\n        </div>\n        <div class="col-lg-5">\n          <div>\n            <label placement="right">\n              <input type="radio" id="clip" value="1" name="typeIntersect" formControlName="typeIntersect"\n                     (change)="typeIntersectSelection($event)">\n              <span>Clip</span>\n            </label>\n          </div>\n          <div>\n            <label placement="right">\n              <input type="radio" id="intersect" value="0" name="typeIntersect" formControlName="typeIntersect"\n                     (change)="typeIntersectSelection($event)">\n              <span>Intersect</span>\n            </label>\n          </div>\n        </div>\n      </div>\n\n      <div class="row" style="margin-bottom: 0.5rem">\n        <div class="col-lg-7">\n          <label>\n            <l key="extraction.tool.coordinates.system"></l>\n          </label>\n        </div>\n        <div class="col-lg-5">\n          <select formControlName="coordSys" [(ngModel)]="coordSystem" class="select-style"\n                  (change)="selectCoordSysInput($event)">\n            <option value="0">LB2008</option>\n            <option value="1">LB72</option>\n          </select>\n        </div>\n      </div>\n\n      \x3c!--<div class="row">--\x3e\n      \x3c!--<div class="specific-view-style">--\x3e\n      \x3c!--<label></label>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--<div class="specific-view-style">--\x3e\n      \x3c!--<input type="email" placeholder="email"  formControlName="email" [(ngModel)]="email" id="email" name="email" onblur="this.setAttribute(\'readonly\', \'readonly\');"--\x3e\n      \x3c!--onfocus="this.removeAttribute(\'readonly\');" readonly>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--<div class="row">--\x3e\n      \x3c!--<div class="specific-view-style">--\x3e\n      \x3c!--<label></label>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--<div class="specific-view-style">--\x3e\n      \x3c!--<input type="email"  placeholder="email" formControlName="emailconfirm" [(ngModel)]="emailconfirm" id="emailconfirm" name="emailconfirm" onblur="this.setAttribute(\'readonly\', \'readonly\');"--\x3e\n      \x3c!--onfocus="this.removeAttribute(\'readonly\');" readonly>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--</div>--\x3e\n\n      \x3c!--<div class="row" style="margin-bottom: 1rem">--\x3e\n      \x3c!--<div class="col-lg-6">--\x3e\n      \x3c!--<label>--\x3e\n      \x3c!--<l key="extraction.tool.email"></l>--\x3e\n      \x3c!--</label>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--<div class="form-group col-xs-12 col-lg-12">--\x3e\n      \x3c!--<input type="email" onPaste="return false" formControlName="emailfghjkl" class="form-control" id="emailfghjkl" name="emailfghjkl"--\x3e\n      \x3c!--[ngClass]="{\'is-invalid\':emailValue.invalid && emailValue.touched}"--\x3e\n      \x3c!--[(ngModel)]="emailfghjkl" onblur="this.setAttribute(\'readonly\', \'readonly\');"--\x3e\n      \x3c!--onfocus="this.removeAttribute(\'readonly\');" readonly/>--\x3e\n\n      \x3c!--<div *ngIf="(emailValue.invalid && emailValue.touched) || emailValue.dirty">--\x3e\n      \x3c!--<div *ngIf="emailValue.errors?.required" class="text-danger">--\x3e\n      \x3c!--<label>--\x3e\n      \x3c!--<l key="extraction.tool.email.required"></l>--\x3e\n      \x3c!--</label>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--<div *ngIf="emailValue.errors?.pattern" class="text-danger">--\x3e\n      \x3c!--<label>--\x3e\n      \x3c!--<l key="extraction.tool.email.format.error"></l>--\x3e\n      \x3c!--</label>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--</div>--\x3e\n\n      \x3c!--<div class="row" style="margin-bottom: 1rem">--\x3e\n      \x3c!--<div class="col-lg-6">--\x3e\n      \x3c!--<label>--\x3e\n      \x3c!--<l key="extraction.tool.emailconfirm"></l>--\x3e\n      \x3c!--</label>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--<div class="form-group col-xs-12 col-lg-12">--\x3e\n      \x3c!--<input  type="email" onPaste="return false" formControlName="emailconfirmyuiop" class="form-control" id="emailconfirmyuiop" name="emailconfirmyuiop"--\x3e\n      \x3c!--[ngClass]="{\'is-invalid\':confirm.invalid && confirm.touched }"--\x3e\n      \x3c!--onblur="this.setAttribute(\'readonly\', \'readonly\');"--\x3e\n      \x3c!--onfocus="this.removeAttribute(\'readonly\');" readonly/>--\x3e\n\n      \x3c!--<div *ngIf="(confirm.invalid && confirm.touched) || confirm.dirty">--\x3e\n      \x3c!--<div *ngIf="confirm.errors?.required" class="text-danger">--\x3e\n      \x3c!--<label>--\x3e\n      \x3c!--<l key="extraction.tool.confirmemail.required"></l>--\x3e\n      \x3c!--</label>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--<div *ngIf="confirm.errors?.pattern" class="text-danger">--\x3e\n      \x3c!--<label>--\x3e\n      \x3c!--<l key="extraction.tool.email.format.error"></l>--\x3e\n      \x3c!--</label>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--<div *ngIf="confirm.errors?.emailsNoMatch" class="text-danger">--\x3e\n      \x3c!--<label>--\x3e\n      \x3c!--<l key="extraction.tool.emailconfirm.mustmatch"></l>--\x3e\n      \x3c!--</label>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--</div>--\x3e\n      \x3c!--</div>--\x3e\n\n\n      <div class="row" style="margin-bottom:1rem; margin-top: 1rem">\n        <div class="col-lg-7">\n          <button class="btn" (click)="resetFields()" type="button">\n            <l key="extraction.tool.deleteButton"></l>\n          </button>\n        </div>\n        <div class="col-lg-5">\n          <button class="btn btn-fin01" [disabled]="pendingSearch" (click)="goToExtraction()" type="button">\n            <l key="extraction.tool.confirmButton"></l>\n            <i *ngIf="pendingSearch" class="fa fa-spin fa-spinner"></i>\n          </button>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n'
    },
    e8KK: function(e, t) {
        e.exports = '<div class="result-list margin-custom">\n  <div class="row">\n    <div class="col-sm-4 col-md-4 col-lg-4">\n      <h3 class="bold">\n        <l key="structured.search"></l>\n      </h3>\n    </div>\n    <div class="col-sm-7 col-md-7 col-lg-7">\n\n    </div>\n    <div class="col-sm-1 col-md-1 col-lg-1 nopadding align-right">\n      <button *ngIf="!hidden" class="btn grey-transparent" (click)="hideResultList()"><i class="fa fa-minus"></i></button>\n      <button *ngIf="hidden" class="btn grey-transparent" (click)="hideResultList()"><i class="fa fa-plus"></i></button>\n      <button class="btn grey-transparent" (click)="closeResultList()"><i class="fa fa-close"></i></button>\n    </div>\n  </div>\n  <hr />\n  <div class="custom-container" *ngIf="!this.hidden">\n    <table datatable [dtOptions]="dtOptions" role="grid" id="tableData" class="stripe order-column row-border hover nowrap result-table" style="width:100%"\n           *ngIf="resultEntities && resultEntities.length > 0">\n      <thead>\n      <tr role="row">\n        <th class="tableHeader" *ngFor="let tableHeader of filteredKeys"><l key="{{tableHeader.toLowerCase()}}"></l></th>\n        <th *ngIf="isNotSpatialAnalysis()">\n          <l key="delete"></l>\n        </th>\n        <th *ngIf="!configService.precadBundle.active && !configService.cdmsBundle.active">\n          <l key="visualize"></l>\n        </th>\n        <th *ngIf="tableName === \'GPN_SUDO\' || tableName === \'GPN_SKDO\' " >\n          <l  key="download"></l>\n        </th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr role="row" *ngFor="let entity of resultEntities; let i = index">\n        <ng-container *ngFor="let header of filteredKeys">\n          <td class="cell" *ngIf="isSpecialValue(header.toUpperCase())">\n            <l key="{{getConvertedValue(true,header,entity[header])}}"></l>\n          </td>\n          <td class="cell" *ngIf="!isSpecialValue(header.toUpperCase())">\n            <span>{{getConvertedValue(false, header,entity[header])}}</span></td>\n        </ng-container>\n        <td *ngIf="isNotSpatialAnalysis()"><i class="fa fa-trash fa-2x pointer blueIcon" (click)="removeEntity(i)"></i></td>\n        <td *ngIf="!configService.precadBundle.active && !configService.cdmsBundle.active">\n          <i *ngIf="!isVisualizePending()" class="fa fa-eye fa-2x pointer blueIcon" (click)="visualizeFeature(i ,resultEntities.wfs)"></i>\n          <i *ngIf="isVisualizePending()" class="fa fa-spinner fa-spin fa-2x blueIcon"></i>\n        </td>\n        <td *ngIf="tableName === \'GPN_SUDO\' && entity.publicPlan === true" ><i *ngIf="!getDocumentDownloadPending()" class="fa fa-arrow-circle-down fa-2x pointer blueIcon"  (click)="getDocumentPDFById(i)" ></i>\n          <i *ngIf="getDocumentDownloadPending()" class="fa fa-spinner fa-spin fa-2x blueIcon"></i>\n        </td>\n        <td *ngIf="tableName === \'GPN_SKDO\'" ><i *ngIf="!getDocumentDownloadPending()" class="fa fa-arrow-circle-down fa-2x pointer blueIcon"  (click)="getSketchPDFById(i)" ></i>\n          <i  *ngIf="getDocumentDownloadPending()" class="fa fa-spinner fa-spin fa-2x blueIcon"></i>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n'
    },
    ff0D: function(e, t) {
        e.exports = ""
    },
    gYgX: function(e, t) {
        e.exports = '<div\n  *ngIf="this.appState.get(\'cdms\').get(\'action\').value === \'select\' && this.appState.get(\'cdms\').get(\'uid\').value != null && this.appState.get(\'cdms\').get(\'returnUrl\').value != null">\n  <button type="button"\n          class="btn button_export_to_cdms" \n          container="body" triggers="mouseenter:mouseleave"\n          placement= "right" ngbPopover="{{strip_html_tags(cancelReturnMyMinfin[lang()]) }}" (click)="exportToCdms()">\n  </button>\n</div> \n<div\n  *ngIf="this.appState.get(\'cdms\').get(\'active\').value === true">  \n  <button type="button"\n          class = "btn button_help_cdms"\n          container="body" triggers="mouseenter:mouseleave"\n          placement="right" ngbPopover="{{ strip_html_tags(helpCdms[lang()]) }}" (click)="goToHelpCdms()">\n  </button>\n</div>\n'
    },
    jLjg: function(e, t) {
        e.exports = '<app-wizard>\n  <app-wizard-step>\n    <div class="form-group pat20">\n      <p class="text-center"><l key="configuration.wizard.step1.title"></l></p>\n      <input-text  [appState]="configurationFormGroup" name="configName" label="configName"></input-text>\n    </div>\n  </app-wizard-step>\n  <app-wizard-step>\n    <app-zoom-levels-wizard></app-zoom-levels-wizard>\n  </app-wizard-step>\n  <app-wizard-step>\n   <app-map-control-wizard></app-map-control-wizard>\n  </app-wizard-step>\n  <app-wizard-step>\n    <app-menu-wizard></app-menu-wizard>\n  </app-wizard-step>\n  <app-wizard-step>\n    <app-backdrop-wizard ></app-backdrop-wizard>\n  </app-wizard-step>\n  <app-wizard-step (onComplete)="checkIfConfigExist()">\n    <app-layer-wizard ></app-layer-wizard>\n    <div *ngIf="exceptions">\n      <div *ngFor="let exception of exceptions" class="infobulle-danger">\n          <l key="exception.{{exception.errorCode}}"></l>\n          {{exception.stringPath}}\n      </div>\n    </div>\n  </app-wizard-step>\n</app-wizard>\n\n'
    },
    jZDw: function(e, t) {
        e.exports = ""
    },
    joMj: function(e, t) {
        e.exports = ".autocomplete {\n  position: absolute;\n  z-index: 99;\n  display: inline-block;\n  top: 40px;\n}\n\n.autocomplete-items {\n  min-width:400px;\n  height: 25px;\n  float: left;\n  padding-left: 10px;\n  border: 1px solid #d4d4d4;\n  border-bottom: 1px solid;\n  border-top: none;\n  list-style: none;\n  background-color: white;\n  /*position the autocomplete items to be the same width as the container:*/\n  top: 100%;\n  left: 0;\n  right: 0;\n}\n\n.autocomplete-items-other {\n  min-width:200px;\n  height: 25px;\n  float: left;\n  padding-left: 10px;\n  border: 1px solid #d4d4d4;\n  border-bottom: 1px solid;\n  border-top: none;\n  list-style: none;\n  background-color: white;\n  /*position the autocomplete items to be the same width as the container:*/\n  top: 100%;\n  left: 0;\n  right: 0;\n}\n\n.autocomplete-items:hover{\n  color: white;\n  background-color: #00acee;\n}\n\n.active {\n  color:white;\n  background-color: #00acee;\n}\n\ninput[type=text] {\n  background: transparent;\n  border: none;\n  border-bottom: 1px solid #000000;\n  border-bottom-color: lightgray;\n}\n\n.prependIcon {\n  font-size: 1.2em;\n  background-color: rgba(252, 255, 250, 0.76);\n}\n\n.appendIcon {\n  font-size: 1.2em;\n  background-color: rgba(252, 255, 250, 0.76);\n}\n"
    },
    kFon: function(e, t) {
        e.exports = ""
    },
    kHO9: function(e, t) {
        e.exports = '<div class="card">\n    <br/>\n    <div class="text-center">\n        <label>\n            <l key="extraction.alert.confirmation"></l>\n        </label>\n    </div>\n    <div class="text-center" style="color:blue">\n        {{ alertId }}\n    </div>\n    <div class="card-footer" style="text-align: center">\n        <button class="btn btn-fin01" value="Close" (click)="closeModal()">\n            <l key="extraction.alert.close"></l>\n        </button>\n    </div>\n</div>\n\n\n'
    },
    lp5g: function(e, t) {
        e.exports = ".app-container{\n  overflow: hidden ;\n  height: 100%;\n}\n\n.map-container{\n  height: 90vh;\n}\n\n.map-container-fullscreen{\n  height : 100vh;\n}\n\n#errorControlJS {\n  visibility: hidden;\n  padding: 2px;\n  position: absolute;\n  z-index: 5;\n  bottom: 15vw;\n  left: 2vw;\n  background-color: red;\n  color: white !important;\n}\n\n.spinningIcon {\n  position:fixed;\n  z-index: 1501;\n  top: 50%;\n  right: 50%;\n}\n\n.mapLoading {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  z-index: 1500;\n  background-color: white;\n  top:0;\n}\n\n.footer-container{\n  background-color: #FFFFFF;\n  z-index: 5 ;\n  width: 100%;\n  position: fixed;\n  bottom: 0px;\n  min-height: 3px;\n  -webkit-transition: max-height .2s ease-in;\n  transition: max-height .2s ease-in; /* Use transition for 'height' or all */\n\n}\n\n.footer-container:hover {\n  -webkit-box-shadow: 0px -4px 5px 0px rgba(0,0,0,0.33);\n  box-shadow: 0px -4px 5px 0px rgba(0,0,0,0.33);\n  background-color: #e0ded8;\n  max-height: 25vh !important; /* Change the height of the footer as the quarter of the screen */\n}\n"
    },
    m6rw: function(e, t) {
        e.exports = ".map{\n  height: 100%;\n  width: 100%;\n  background-color: white;\n}\n\n\n.map-fullscreen{\n  height: 100%;\n  width: 100%;\n  background-color: white;\n}\n\n\n.map:-moz-full-screen {\n  height: 100%;\n  width:100%;\n}\n\n\n.map:-webkit-full-screen {\n  height: 100%;\n  width:100%;\n}\n\n\n.map:-ms-fullscreen {\n  height: 100%;\n  width:100%;\n}\n\n\n.map:fullscreen {\n  height: 100%;\n  width:100%;\n}\n\n\n.ol-rotate {\n  top: 3em;\n}\n\n\n#customZoom {\n  z-index: 1001;\n  position: relative;\n  bottom: 60%;\n  left: 10px;\n  }\n\n\n.versionNumber{\n  position:fixed;\n  z-index: 500;\n  background-color: #00acee;\n  color: white;\n}\n\n\n.serviceMessage{\n  z-index: 500;\n  position: fixed;\n  top: 10vh;\n  left:45vw;\n}\n\n\n.copyright{\n  padding:10px;\n  z-index: 0;\n  position: fixed;\n  background-color: rgba(225, 227, 223, 0.50);\n  bottom: 10vh;\n  pointer-events: none;\n  right: 10vw;\n}\n\n\n"
    },
    mF83: function(e, t) {
        e.exports = ""
    },
    n1Fo: function(e, t) {
        e.exports = '<div class="app-container">\n  <div class="menu-container">\n    <app-toolbar [appState]="appState" ></app-toolbar>\n  </div>\n  <div [ngClass]="getMapClass()">\n    <div id="errorControlJS"><l key="error.errorControlJS"></l></div>\n    <app-map-view  [appState]="appState" ></app-map-view>\n  </div>\n  <div class="footer-container" [style.max-height.vh]="footerMaxSize">\n    <app-footer></app-footer>\n  </div>\n</div>\n<div *ngIf="appState.get(\'mapLoading\').value" class="mapLoading">\n  <icon  code="spinner" [spin]="true" size="4" class="spinningIcon"></icon>\n</div>\n'
    },
    okgc: function(e, t) {
        e.exports = ".app-container{\n  overflow: hidden ;\n  height: 100%;\n}\n\n.map-container{\n  height: 90vh;\n}\n\n.map-container-fullscreen{\n  height : 100%;\n}\n\n#warning-message { display: none; }\n\n/*@media only screen and (orientation:portrait){*/\n\n/*#wrapper { display:none; }*/\n\n/*#warning-message { display:block; }*/\n\n/*}*/\n\n/*@media only screen and (orientation:landscape){*/\n\n/*#warning-message { display:none; }*/\n\n/*}*/\n\n"
    },
    pIVB: function(e, t) {
        e.exports = '<div>\n  <div>\n    <div class="row col-lg-12 nopadding">\n      <select class="form-control" name="LayerName" [(ngModel)]="tempChoice"\n        (ngModelChange)="updateTableNameTitleKey(tempChoice)">\n        <ng-container *ngFor="let keys of getKeys(layerNameLayerTable)">\n          <option *ngIf="layerPermissionMapping.get(keys) && layerNameLayerTable.get(keys)!=\'APN_ADCO\'" value="{{keys}}"\n            [innerHtml]="getCurrentTranslation(keys)"></option>\n        </ng-container>\n      </select>\n    </div>\n    <div *ngIf="criterias.tableName !==\'\'">\n      <hr />\n      <div class="row col-lg-12 nopadding">\n        <div class="col-lg-6 col-6 nopadding">\n          <label for="base-attribute">\n            <l key="attribute"></l>\n          </label>\n          <select id="base-attribute" class="form-control" name="attribut" [(ngModel)]="criterias.criteria.attribute">\n            <option value=""></option>\n            <option *ngFor="let feature of configMapping.get(criterias.tableName).features"\n              value="{{feature.toUpperCase()}}">\n              <l key="{{feature.toLowerCase()}}"></l>\n            </option>\n          </select>\n        </div>\n        <div class="col-lg-6 col-6 padding-left">\n          <label *ngIf="criterias.criteria.attribute != \'\'">\n            <l key="operation"></l>\n          </label>\n          <select id="base-operation-text" class="form-control" name="operator"\n            [(ngModel)]="criterias.criteria.operation"\n            *ngIf="criterias.criteria.attribute != \'\' && ( mapping[criterias.tableName][criterias.criteria.attribute.toUpperCase()] === \'TEXT\' || isRecIdText(criterias.tableName, criterias.criteria) ) ">\n            <option value="EQUAL">=</option>\n            <option *ngIf="criterias.criteria.attribute !== null " value="LIKE">LIKE\n            </option>\n            <option value="DIFFERENT">\u2260</option>\n          </select>\n          \x3c!----\x3e\n          <select id="base-operation-numeric" class="form-control" name="operator"\n            [(ngModel)]="criterias.criteria.operation"\n            *ngIf="criterias.criteria.attribute != \'\' && ( mapping[criterias.tableName][criterias.criteria.attribute.toUpperCase()] === \'NUMERIC\' && !isRecIdText(criterias.tableName, criterias.criteria)) ">\n            <option value="EQUAL">=</option>\n            <option\n              *ngIf="criterias.criteria.attribute !== null && mapping[criterias.tableName][criterias.criteria.attribute.toUpperCase()] !== \'TEXT\' && mapping[criterias.tableName][criterias.criteria.attribute] != \'DATE\'"\n              value="GREATER">>\n            </option>\n            <option\n              *ngIf="criterias.criteria.attribute !== null && mapping[criterias.tableName][criterias.criteria.attribute.toUpperCase()] !== \'TEXT\'"\n              value="LESS">\n              < </option>\n            <option\n              *ngIf="criterias.criteria.attribute !== null && mapping[criterias.tableName][criterias.criteria.attribute.toUpperCase()] !== \'TEXT\'"\n              value="GREATOREQUAL">>=\n            </option>\n            <option\n              *ngIf="criterias.criteria.attribute !== null && mapping[criterias.tableName][criterias.criteria.attribute.toUpperCase()] !== \'TEXT\' && mapping[criterias.tableName][criterias.criteria.attribute] != \'DATE\' "\n              value="LESSOREQUAL">\n              <= </option>\n            <option value="DIFFERENT">\u2260</option>\n          </select>\n          \x3c!----\x3e\n          <select id="base-operation-date" class="form-control" name="operator"\n            [(ngModel)]="criterias.criteria.operation"\n            *ngIf="criterias.criteria.attribute != \'\' && mapping[criterias.tableName][criterias.criteria.attribute.toUpperCase()] === \'DATE\'">\n            <option\n              *ngIf="criterias.criteria.attribute !== null && mapping[criterias.tableName][criterias.criteria.attribute.toUpperCase()] !== \'TEXT\'"\n              value="LESS">\n              < </option>\n            <option\n              *ngIf="criterias.criteria.attribute !== null && mapping[criterias.tableName][criterias.criteria.attribute.toUpperCase()] !== \'TEXT\'"\n              value="GREATOREQUAL">>=\n            </option>\n          </select>\n        </div>\n      </div>\n      <br />\n      <app-attribute-search-attributeselection [criteria]="criterias.criteria" [tableName]="criterias.tableName"\n        [index]="-1" [mapping]="mapping" (submitSearch)="searchCriterias()"></app-attribute-search-attributeselection>\n      <br />\n      <div>\n        <ng-container *ngFor="let criteria of tempCriterias; let i = index">\n          <div class="row padding-top">\n            <div class="col-lg-9 nopadding ">\n              <div class="form-group">\n                <label class="radio-inline"><input type="radio" name="andOr{{i}}" value="AND" checked\n                    [(ngModel)]="criteria.operator">And</label>\n                <label class="radio-inline"><input type="radio" name="andOr{{i}}" value="OR"\n                    [(ngModel)]="criteria.operator">Or</label>\n              </div>\n            </div>\n            <div class="col-lg-3">\n              <button class="btn grey-transparent" (click)="removeCriteria(i)"><i\n                  class="fa fa-minus-square-o fa-2x"></i></button>\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-lg-6 col-6 nopadding">\n              <label for="multiple-attribute">\n                <l key="attribute"></l>\n              </label>\n              <select id="multiple-attribute" class="form-control" name="attribut{{i}}"\n                [(ngModel)]="criteria.attribute">\n                <option *ngFor="let feature of configMapping.get(criterias.tableName).features"\n                  value="{{feature.toUpperCase()}}">\n                  <l key="{{feature.toLowerCase()}}"></l>\n                </option>\n              </select>\n            </div>\n            <div class="col-lg-6 col-6 padding-left">\n              <label *ngIf="criteria.attribute != \'\'">\n                <l key="operation"></l>\n              </label>\n              <select id="base-operation-text-temp" class="form-control" name="operator"\n                [(ngModel)]="criteria.operation"\n                *ngIf="criteria.attribute != \'\' && ( mapping[criterias.tableName][criteria.attribute.toUpperCase()] === \'TEXT\' || isRecIdText(criterias.tableName, criteria) ) ">\n                <option value="EQUAL">=</option>\n                <option *ngIf="criteria.attribute !== null " value="LIKE">LIKE\n                </option>\n                <option value="DIFFERENT">\u2260</option>\n              </select>\n              <select id="base-operation-numeric-temp" class="form-control" name="operator"\n                [(ngModel)]="criteria.operation"\n                *ngIf="criteria.attribute != \'\' && ( mapping[criterias.tableName][criteria.attribute.toUpperCase()] === \'NUMERIC\' && !isRecIdText(criterias.tableName, criteria)) ">\n                <option value="EQUAL">=</option>\n                <option\n                  *ngIf="criteria.attribute !== null && mapping[criterias.tableName][criteria.attribute.toUpperCase()] !== \'TEXT\' && mapping[criterias.tableName][criteria.attribute] != \'DATE\'"\n                  value="GREATER">>\n                </option>\n                <option\n                  *ngIf="criteria.attribute !== null && mapping[criterias.tableName][criteria.attribute.toUpperCase()] !== \'TEXT\'"\n                  value="LESS">\n                  < </option>\n                <option\n                  *ngIf="criteria.attribute !== null && mapping[criterias.tableName][criteria.attribute.toUpperCase()] !== \'TEXT\'"\n                  value="GREATOREQUAL">>=\n                </option>\n                <option\n                  *ngIf="criteria.attribute !== null && mapping[criterias.tableName][criteria.attribute.toUpperCase()] !== \'TEXT\' && mapping[criterias.tableName][criteria.attribute] != \'DATE\' "\n                  value="LESSOREQUAL">\n                  <= </option>\n                <option value="DIFFERENT">\u2260</option>\n              </select>\n              \x3c!----\x3e\n              <select id="base-operation-date-temp" class="form-control" name="operator"\n                [(ngModel)]="criteria.operation"\n                *ngIf="criteria.attribute != \'\' && mapping[criterias.tableName][criteria.attribute.toUpperCase()] === \'DATE\'">\n                <option\n                  *ngIf="criteria.attribute !== null && mapping[criterias.tableName][criteria.attribute.toUpperCase()] !== \'TEXT\'"\n                  value="LESS">\n                  < </option>\n                <option\n                  *ngIf="criteria.attribute !== null && mapping[criterias.tableName][criteria.attribute.toUpperCase()] !== \'TEXT\'"\n                  value="GREATOREQUAL">>=\n                </option>\n              </select>\n            </div>\n          </div>\n          <br />\n          <app-attribute-search-attributeselection [criteria]="criteria" [mapping]="mapping"\n            [tableName]="criterias.tableName" [index]="i" (submitSearch)="searchCriterias()"></app-attribute-search-attributeselection>\n        </ng-container>\n        <br />\n      </div>\n      <div class="row">\n        <div class="col-lg-9 col-9">\n\n        </div>\n        <div class="col-lg-3 col-3">\n          <button class="btn grey-transparent" type="button" (click)="addCriteria()"><i\n              class="fa fa-plus-square-o fa-2x"></i></button>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-lg-5" style="z-index: 1">\n          <ng-container>\n            <button class="btn btn-fin01" [disabled]="pendingSearch" (click)="searchCriterias()">\n              <l key="attribute.search.searchButton"></l>\n              <i *ngIf="!pendingSearch" class="fa fa-search" style="pointer-events:none"></i>\n              <i *ngIf="pendingSearch" class="fa fa-spin fa-spinner"></i>\n            </button>\n          </ng-container>\n        </div>\n        <div class="col-lg-7">\n\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n'
    },
    q4gP: function(e, t) {
        e.exports = ".top-logo-tool{\n  height: 3vw;\n  width: 3vw;\n}\n.logo-tool{\n  height: 2vw;\n  width: 2vw;\n}\n.logo-row{\n  padding: 5px;\n}\n.check-icon{\n  padding-top: 5px;\n}\nobject{\n  pointer-events: none;\n}\n.logo-row:hover{\n  -webkit-box-shadow:0 0 10px rgba(0, 0, 0, 0.5);\n  box-shadow:0 0 10px rgba(0, 0, 0, 0.5);\n}\n.icon-2x{\n  color: #00acee;\n}\n.icon-fin-pict-drawtext{\n  color: #00acee;\n}\n.bold-title{\n  font-weight: bold;\n}\n\n\n"
    },
    qklU: function(e, t) {
        e.exports = '<span>\n  <i [ngClass]="class" ></i>\n</span>\n'
    },
    r3V9: function(e, t) {
        e.exports = ".card { height: 100%; }\n.card-header { background-color: #fff; padding: 0; font-size: 1.25rem; }\n.card-block { overflow-y: auto; }\n.card-footer { background-color: #fff; border-top: 0 none; }\n.nav-item { padding: 1rem 0rem; border-bottom: 0.5rem solid #ccc; }\n.active { font-weight: bold; color: black; border-bottom-color: #1976D2 !important; }\n.enabled { cursor: pointer; border-bottom-color: rgb(88, 162, 234); }\n.disabled { color: #ccc; }\n.completed { cursor: default; }\n"
    },
    rDBZ: function(e, t) {
        e.exports = '<div class="card">\n  <div class="padding-right">\n    <h6 class="card-title info-lvl-1">\n      <l key="layer.menu.backdrops"></l>\n    </h6>\n    <table class="table">\n      <tr *ngFor="let backdrop of getKeys(backdrops)">\n        <td>\n          <div class="row nopadding">\n            <div class="col-lg-1 col-1">\n              <input type="checkbox" [checked]="backdrops.get(backdrop).active"\n                [(ngModel)]="backdrops.get(backdrop).active" (ngModelChange)="updateBackdrop(backdrop)" />\n            </div>\n            <div *ngIf="isEmpty(translations.get(backdrop))" class="col-lg-6 col-6 info-lvl-2">\n              <p>{{backdrop}}</p>\n            </div>\n            <div *ngIf="!isEmpty(translations.get(backdrop))" class="col-lg-6 col-6 info-lvl-2" [innerHTML]="getCurrentTranslations(backdrop)"></div>\n            <div class="col-lg-1 col-1">\n              <i class="fa fa-eye pointer" (click)="showOpacity(backdrops.get(backdrop))"></i>\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-lg-9 col-9" *ngIf="backdrops.get(backdrop).showOpacity">\n              <hr style="margin-top: 0.5rem;margin-bottom: 0.5rem;border: 0;border-top: 1px solid rgba(0,0,0,.1)" />\n              <l key="layer.opacity"></l>\n              <p style="margin-bottom: 5px"></p>\n              <div class="row">\n                <label>0</label>\n                &nbsp;\n                <input type="range" class="slider" id="myRange" min="0" max="1" value="1" step="0.1"\n                  [(ngModel)]="backdrops.get(backdrop).opacity" (ngModelChange)="updateOpacityBackdrop()">\n                <label>100</label>\n              </div>\n            </div>\n          </div>\n        </td>\n      </tr>\n    </table>\n  </div>\n</div>\n'
    },
    rfts: function(e, t) {
        e.exports = ".padding-top-left{\n  padding-top: 10px;\n  padding-left: 25px;\n}\n"
    },
    rqBW: function(e, t) {
        e.exports = '<div class="form-group pat20">\n\n  <p class="text-center"><l key="configuration.wizard.zoomLevels"></l></p>\n\n  <div class="input-group">\n    <input-text icon="plus" label="configuration.wizard.zoomLevelToAdd" (prependOnClick)="addZoomLevel()" [appState]="this._componentState" name="zoomLevelToAdd"></input-text>\n  </div>\n\n  <table class="table">\n    <tr>\n      <th><l key="configuration.wizard.zoomLevelValueMobile"></l></th>\n      <th><l key="configuration.wizard.zoomLevelSwitchToComputer"></l></th>\n      <th></th>\n    </tr>\n    <tr *ngFor="let zoomLevel of mobileZoomLevels;let index = index;trackBy:trackByIndex;">\n      <td><input type="text" [(ngModel)]="mobileZoomLevels[index]"></td>\n      <td><icon (click)="moveToComputerLevel(index)" code="arrow-down" ></icon></td>\n      <td><icon (click)="deleteZoomLevel(index)" code="trash" ></icon> </td>\n    </tr>\n    <tr>\n      <th><l key="configuration.wizard.zoomLevelValue"></l></th>\n      <th><l key="configuration.wizard.zoomLevelSwitchToMobile"></l></th>\n      <th></th>\n    </tr>\n    <tr *ngFor="let zoomLevel of zoomLevels;let index = index;trackBy:trackByIndex;">\n      <td><input type="text" [(ngModel)]="zoomLevels[index]"></td>\n      <td><icon (click)="moveToMobileLevel(index)" code="arrow-up" ></icon></td>\n      <td><icon (click)="deleteZoomLevel(index)" code="trash" ></icon> </td>\n    </tr>\n  </table>\n\n</div>\n'
    },
    rrO8: function(e, t) {
        e.exports = ""
    },
    sYrl: function(e, t) {
        e.exports = ".infobulle-danger {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border-left-style: solid;\n  border-width: 1rem;\n  border-color: #f5384d;\n  background-color: #fbafb7;\n  color: black;\n  padding: 1rem;\n}\n"
    },
    tUmx: function(e, t) {
        e.exports = ".custom-container{\n  margin-left: 20px;\n  margin-right: 20px;\n  margin-bottom: 10px;\n  width: 100%\n}\n"
    },
    "v/Xl": function(e, t) {
        e.exports = '<div\n  *ngIf="this.appState.get(\'precad\').get(\'action\').value === \'select\' && this.appState.get(\'precad\').get(\'uid\').value != null && this.appState.get(\'precad\').get(\'returnUrl\').value != null">\n  <button type="button"\n          class="btn button_export_to_precad" \n          container="body" triggers="mouseenter:mouseleave"\n          placement= "right" ngbPopover="{{strip_html_tags(cancelReturnMyMinfin[lang()]) }}" (click)="exportToPrecad()">\n  </button>\n</div> \n<div\n  *ngIf="this.appState.get(\'precad\').get(\'active\').value === true">  \n  <button type="button"\n          class = "btn button_help_precad"\n          container="body" triggers="mouseenter:mouseleave"\n          placement="right" ngbPopover="{{ strip_html_tags(helpPrecad[lang()]) }}" (click)="goToHelpPrecad()">\n  </button>\n</div>\n'
    },
    vYbp: function(e, t) {
        e.exports = '<div class="padding">\n  <form>\n    <div>\n      <div class="custom-title">\n        <l key="structured-search.type"></l>\n      </div>\n      <div class="leftBlock">\n        <input type="radio" id="attributeSearch" name="structuredSearchOptions" value="attributeSearch"\n               [(ngModel)]="structuredSearchOptionsToggle" (click)="chooseStructuredSearchOption(\'attributeSearch\')">\n        <label for="attributeSearch">\n          <l key="structured.search.attribute"></l>\n        </label>\n      </div>\n      <div *ngIf="structuredSearchOptionsToggle === \'attributeSearch\'">\n        <app-attributary-search [appState]="appState"></app-attributary-search>\n      </div>\n      <hr/>\n      <div class="leftBlock2">\n        <input type="radio" id="spatialSearch" name="structuredSearchOptions" value="spatialSearch"\n               [(ngModel)]="structuredSearchOptionsToggle" (click)="chooseStructuredSearchOption(\'spatialSearch\')">\n        <label for="spatialSearch">\n          <l key="structured.search.spatial"></l>\n        </label>\n      </div>\n      <div *ngIf="structuredSearchOptionsToggle === \'spatialSearch\'">\n        <app-spatial-search [appState]="appState"></app-spatial-search>\n      </div>\n    </div>\n  </form>\n</div>\n'
    },
    weUI: function(e, t) {
        e.exports = ".active {\n  background-color: #00acee !important;\n  border-style: solid !important;\n  border-color: black !important;\n}\n\n.btn-custom.focus {\n  outline: none !important;\n  -webkit-box-shadow: 0 0 0 0;\n          box-shadow: 0 0 0 0;\n}\n\n.btn-custom {\n  background-color: lightgrey;\n  color: black;\n}\n\n.btn-custom.active {\n  background-color: #00acee !important;\n  color: white;\n  border-color: black !important;\n}\n\n@media (max-width: 600px) {\n  .btn-custom {\n    background-color: lightgrey;\n    color: black;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n  }\n\n}\n"
    },
    wiNN: function(e, t) {
        e.exports = "\n.errorControlJS {\n  padding: 2px;\n  background-color: red;\n  color: white !important;\n}\n\n.padding-left{\n  padding-left: 5px;\n  padding-right: 0px;\n}\n\n.grey-transparent{\n  color: #00acee;\n  background-color: transparent;\n}\n\n.padding-top{\n  padding-top: 15px;\n}\n"
    },
    x35b: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n("WT6e")
          , a = n("4PVY")
          , o = n("OE0E")
          , r = n("HCek")
          , s = n("iJo9")
          , l = (n("EN1B"),
        this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        )
          , c = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , p = function() {
            function e(e, t) {
                this.notificationsService = e,
                this.labelService = t
            }
            return e.prototype.notify = function(e, t, n) {
                var i = this;
                this.labelService.getLabel(t).map(function(e) {
                    return e.value
                }).take(1).toPromise().then(function(t) {
                    if (n)
                        switch (e) {
                        case "info":
                            return void i.notificationsService.info(t + n);
                        case "error":
                            return void i.notificationsService.error(t + n);
                        case "success":
                            return void i.notificationsService.success(t + n)
                        }
                    else
                        switch (e) {
                        case "info":
                            return void i.notificationsService.info(t);
                        case "error":
                            return void i.notificationsService.error(t);
                        case "success":
                            return void i.notificationsService.success(t)
                        }
                }).catch(function(e) {
                    return i.missingLabel()
                })
            }
            ,
            e.prototype.missingLabel = function() {
                this.notificationsService.info("Missing Label")
            }
            ,
            e = l([Object(i.Injectable)(), c("design:paramtypes", [r.NotificationsService, s.b])], e)
        }()
          , u = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , d = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , g = function() {
            function e(e) {
                this.notificationService = e,
                this.notificationOption = {
                    position: ["top", "right"],
                    timeOut: 5e3,
                    lastOnBottom: !0,
                    pauseOnHover: !0,
                    clickToClose: !1,
                    preventDuplicates: !0,
                    theClass: "notif"
                }
            }
            return e.prototype.ngOnInit = function() {}
            ,
            e = u([Object(i.Component)({
                selector: "app-root",
                template: n("5xMp"),
                styles: [n("okgc")]
            }), d("design:paramtypes", [p])], e)
        }()
          , h = n("trid")
          , f = (n("TDKa"),
        n("7DMc"))
          , y = n("yGLh")
          , m = n("7rnj")
          , v = function() {
            function e() {}
            return e.BELGIAN_PROJECTION = new m.a({
                code: "EPSG:3812",
                extent: [521989.4444999993, 521165.125599999, 795171.9135000035, 744030.4598999992],
                units: "m",
                getPointResolution: function(e) {
                    return e
                }
            }),
            e
        }()
          , b = n("Lfyu")
          , S = n("ItHS")
          , C = (n("o53x"),
        n("pDJ4"),
        function() {
            function e() {}
            return e.getPointCurrentSituation = function(e) {
                return this.POINT_CURRENT_SITUATION[e]
            }
            ,
            e.getPointLastSituation = function(e) {
                return this.POINT_LAST_SITUATION[e]
            }
            ,
            e.BASE_URL_BACKEND_ECAD = "/ecad-backend-rest",
            e.BASE_URL_LIBRARIES_ECAD = "/ecad/api",
            e.PROXY = e.BASE_URL_BACKEND_ECAD + "/proxy",
            e.ECAD_STREET_SEARCH_SERVICE = e.BASE_URL_LIBRARIES_ECAD + "/search",
            e.ECAD_STREET_SEARCH_SERVICE_LOCATION = e.ECAD_STREET_SEARCH_SERVICE + "/location",
            e.ECAD_STREET_SEARCH_ALL_SERVICE_LOCATION = e.ECAD_STREET_SEARCH_SERVICE_LOCATION + "/all",
            e.ECAD_STREET_SEARCH_ALL_SUGGESTION = e.ECAD_STREET_SEARCH_SERVICE_LOCATION + "/suggest",
            e.ECAD_STREET_CENTER_PARCEL_SERVICE = e.BASE_URL_LIBRARIES_ECAD + "/parcels/center",
            e.CONFIGURATION = e.BASE_URL_BACKEND_ECAD + "/configuration",
            e.CMS_CONTENT = e.BASE_URL_BACKEND_ECAD + "/cms",
            e.VIA_FILE_UPLOAD = e.CONFIGURATION + "/file",
            e.VIA_INTERFACE = e.CONFIGURATION + "/interface",
            e.GIS = e.BASE_URL_BACKEND_ECAD + "/gis",
            e.CCFF = e.BASE_URL_BACKEND_ECAD + "/ccff",
            e.USERS = e.BASE_URL_BACKEND_ECAD + "/users",
            e.SEARCH = e.BASE_URL_BACKEND_ECAD + "/search",
            e.DOCUMENT = e.BASE_URL_BACKEND_ECAD + "/document",
            e.SKETCH = e.DOCUMENT + "/sketch",
            e.SEARCH_MAPPING = e.SEARCH + "/tablemapping",
            e.ATTRIBUTAIRE = e.SEARCH + "/attributaire",
            e.POSITION_SEARCH = e.SEARCH + "/position",
            e.WMS = e.GIS + "/wms",
            e.LOCALISATION = e.BASE_URL_BACKEND_ECAD + "/localisation",
            e.UTILS = e.BASE_URL_BACKEND_ECAD + "/utils",
            e.CAPAKEY = e.LOCALISATION + "/capakey",
            e.FISCAL_CAPAKEY = e.LOCALISATION + "/fiscal/capakey",
            e.GET_CONSULTIMMO_POW_URL = e.LOCALISATION + "/consultimmo/url",
            e.DIVISION = e.LOCALISATION + "/division",
            e.DIVISION_NAME = e.DIVISION + "/name",
            e.DIVISION_COORDINATES = e.DIVISION + "/coordinates",
            e.OBJECTID = e.LOCALISATION + "/objectID",
            e.PARCELS = e.BASE_URL_LIBRARIES_ECAD + "/parcels",
            e.PARCELS_CURRENT_SITUATION = e.PARCELS + "/CURRENT/",
            e.PARCELS_LAST_SITUATION = e.PARCELS + "/LAST/",
            e.ECAD_ARCGIS_CAPAKEYS_SERVICE_CURRENT = e.PARCELS_CURRENT_SITUATION,
            e.ECAD_ARCGIS_CAPAKEYS_SERVICE_FISCAL = e.PARCELS_LAST_SITUATION,
            e.ECAD_IMAGE = e.BASE_URL_LIBRARIES_ECAD + "/generator/image",
            e.LAYER = e.BASE_URL_LIBRARIES_ECAD + "/layer",
            e.EXTRACTION_TOOL_CONTENT = e.BASE_URL_BACKEND_ECAD + "/extraction",
            e.VP_TOOL = e.BASE_URL_BACKEND_ECAD + "/vp",
            e.IMAGE_VP_TOOL = e.VP_TOOL + "/scripturaVP",
            e.POINT_CURRENT_SITUATION = {
                ALI_ADCO: e.LAYER + "/ALI_ADCO/CURRENT/",
                ALI_ADMU: e.LAYER + "/ALI_ADMU/CURRENT/",
                ALI_ADPR: e.LAYER + "/ALI_ADPR/CURRENT/",
                ALI_ADRE: e.LAYER + "/ALI_ADRE/CURRENT/",
                APN_ADCO: e.LAYER + "/APN_ADCO/CURRENT/",
                APN_ADMU: e.LAYER + "/APN_ADMU/CURRENT/",
                APN_ADPR: e.LAYER + "/APN_ADPR/CURRENT/",
                APN_ADRE: e.LAYER + "/APN_ADRE/CURRENT/",
                APN_CADI: e.LAYER + "/APN_CADI/CURRENT/",
                APN_CASE: e.LAYER + "/APN_CASE/CURRENT/",
                APT_ADST: e.LAYER + "/APT_ADST/CURRENT/",
                BLI_EAZO: e.LAYER + "/BLI_EAZO/CURRENT/",
                BLI_TONA: e.LAYER + "/BLI_TONA/CURRENT/",
                BPN_CABL: e.LAYER + "/BPN_CABL/CURRENT/",
                BPN_CABU: e.LAYER + "/BPN_CABU/CURRENT/",
                BPN_CAPA: e.LAYER + "/BPN_CAPA/CURRENT/",
                BPN_EQTO: e.LAYER + "/BPN_EQTO/CURRENT/",
                BPN_PWZO: e.LAYER + "/BPN_PWZO/CURRENT/",
                BPN_RAZO: e.LAYER + "/BPN_RAZO/CURRENT/",
                BPN_REBU: e.LAYER + "/BPN_REBU/CURRENT/",
                BPT_PRST: e.LAYER + "/BPT_PRST/CURRENT/",
                BPT_TONA: e.LAYER + "/BPT_TONA/CURRENT/",
                WPT_INCO: e.LAYER + "/WPT_INCO/CURRENT/",
                WPN_INCO: e.LAYER + "/WPN_INCO/CURRENT/",
                WLI_INCO: e.LAYER + "/WLI_INCO/CURRENT/",
                GPN_SUDO: e.LAYER + "/GPN_SUDO/CURRENT/",
                GPN_SKDO: e.LAYER + "/GPN_SKDO/CURRENT/",
                SPT_BEAD: e.LAYER + "/SPT_BEAD/CURRENT/",
                ALI_CADI: e.LAYER + "/ALI_CADI/CURRENT/",
                ALI_CASE: e.LAYER + "/ALI_CASE/CURRENT/",
                BPN_CAVO: e.LAYER + "/BPN_CAVO/CURRENT/"
            },
            e.POINT_LAST_SITUATION = {
                ALI_ADCO: e.LAYER + "/ALI_ADCO/LAST/",
                ALI_ADPR: e.LAYER + "/ALI_ADPR/LAST/",
                ALI_ADRE: e.LAYER + "/ALI_ADRE/LAST/",
                ALI_ADAR: e.LAYER + "/ALI_ADAR/LAST/",
                ALI_ADMU: e.LAYER + "/ALI_ADMU/LAST/",
                APN_ADCO: e.LAYER + "/APN_ADCO/LAST/",
                APN_ADMU: e.LAYER + "/APN_ADMU/LAST/",
                APN_ADPR: e.LAYER + "/APN_ADPR/LAST/",
                APN_ADRE: e.LAYER + "/APN_ADRE/LAST/",
                APN_CADI: e.LAYER + "/APN_CADI/LAST/",
                APN_CASE: e.LAYER + "/APN_CASE/LAST/",
                APT_ADST: e.LAYER + "/APT_ADST/LAST/",
                BLI_EAZO: e.LAYER + "/BLI_EAZO/LAST/",
                BLI_TONA: e.LAYER + "/BLI_TONA/LAST/",
                BPN_CABL: e.LAYER + "/BPN_CABL/LAST/",
                BPN_CABU: e.LAYER + "/BPN_CABU/LAST/",
                BPN_CAPA: e.LAYER + "/BPN_CAPA/LAST/",
                BPN_EQTO: e.LAYER + "/BPN_EQTO/LAST/",
                BPN_PWZO: e.LAYER + "/BPN_PWZO/LAST/",
                BPN_RAZO: e.LAYER + "/BPN_RAZO/LAST/",
                BPN_REBU: e.LAYER + "/BPN_REBU/LAST/",
                BPT_PRST: e.LAYER + "/BPT_PRST/LAST/",
                BPT_TONA: e.LAYER + "/BPT_TONA/LAST/",
                WPT_INCO: e.LAYER + "/WPT_INCO/LAST/",
                WPN_INCO: e.LAYER + "/WPN_INCO/LAST/",
                WLI_INCO: e.LAYER + "/WLI_INCO/LAST/",
                GPN_SUDO: e.LAYER + "/GPN_SUDO/LAST/",
                GPN_SKDO: e.LAYER + "/GPN_SKDO/LAST/",
                SPT_BEAD: e.LAYER + "/SPT_BEAD/LAST/",
                ALI_CABO: e.LAYER + "/ALI_CABO/LAST/",
                BPN_CAVO: e.LAYER + "/BPN_CAVO/LAST/"
            },
            e
        }())
          , I = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , L = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , O = function() {
            function e(e, t) {
                this.http = e,
                this.labelService = t,
                this.config = null,
                this.MMFCapakey = null,
                this.MMFUid = null,
                this.applicant = null,
                this.language = null,
                this.cadexBundle = {
                    active: !1,
                    action: null,
                    capakey: null,
                    uid: null,
                    selectType: null,
                    radius: null,
                    fiscYear: null,
                    returnUrl: null,
                    directValidation: null,
                    responseBody: null
                },
                this.precadBundle = {
                    active: !1,
                    action: null,
                    capakey: null,
                    uid: null,
                    selectType: null,
                    radius: null,
                    fiscYear: null,
                    returnUrl: null,
                    directValidation: null,
                    responseBody: null
                },
                this.cdmsBundle = {
                    active: !1,
                    action: null,
                    capakey: null,
                    uid: null,
                    selectType: null,
                    radius: null,
                    fiscYear: null,
                    returnUrl: null,
                    directValidation: null,
                    responseBody: null
                },
                this.observable = null
            }
            return e.prototype.loadCurrentConfig = function() {
                var e = this;
                if ("nl_BE" === A("local") && (this.language = "NL"),
                "fr_BE" === A("local") && (this.language = "FR"),
                "de_BE" === A("local") && (this.language = "DE"),
                A("uid") && (this.MMFUid = A("uid")),
                A("capakey") && (this.MMFCapakey = A("capakey")),
                A("applicant") && (this.applicant = A("applicant")),
                "CADEX" === A("config") && this.loadCadexParameter(),
                "PRECAD" === A("config") && this.loadPrecadParameter(),
                "CDMS" === A("config") && this.loadCDMSParameter(),
                null === this.observable && (this.observable = this.loadConfigFromDatabase(A("config"))),
                void 0 !== this.observable)
                    return this.observable.toPromise().then(function(t) {
                        return null === e.config && (e.config = t),
                        e.language && e.labelService.changeLang(e.language),
                        t
                    }).catch(function(t) {
                        console.error("Error in config ( parsing, ... )", t),
                        e.goToErrorPage()
                    });
                this.goToErrorPage()
            }
            ,
            e.prototype.loadConfigFromDatabase = function(e) {
                return null === e ? this.getConfigByName("TOC") : this.getConfigByName(e)
            }
            ,
            e.prototype.loadCadexParameter = function() {
                this.cadexBundle.active = !0,
                null !== this.MMFCapakey && (this.cadexBundle.capakey = this.MMFCapakey),
                null !== this.MMFUid && (this.cadexBundle.uid = this.MMFUid),
                this.cadexBundle.action = A("action"),
                "select" !== this.cadexBundle.action && "print" !== this.cadexBundle.action && (this.cadexBundle.action = "select"),
                this.cadexBundle.selectType = A("selectType"),
                null === this.cadexBundle.selectType && (this.cadexBundle.selectType = "capakey"),
                "round" === this.cadexBundle.selectType && (this.cadexBundle.radius = A("radius")),
                this.cadexBundle.fiscYear = A("fiscYear"),
                null === this.cadexBundle.fiscYear && (this.cadexBundle.fiscYear = "current"),
                this.cadexBundle.returnUrl = A("returnUrl"),
                this.cadexBundle.directValidation = A("directValidation"),
                null === this.cadexBundle.directValidation && (this.cadexBundle.directValidation = !1)
            }
            ,
            e.prototype.loadPrecadParameter = function() {
                this.precadBundle.active = !0,
                null !== this.MMFUid && (this.precadBundle.uid = this.MMFUid),
                this.precadBundle.action = A("action"),
                "select" !== this.precadBundle.action && (this.precadBundle.action = "select"),
                this.precadBundle.selectType = A("selectType"),
                null === this.precadBundle.fiscYear && (this.precadBundle.fiscYear = "current"),
                this.precadBundle.returnUrl = A("returnUrl"),
                this.precadBundle.directValidation = A("directValidation"),
                null === this.precadBundle.directValidation && (this.precadBundle.directValidation = !1)
            }
            ,
            e.prototype.loadCDMSParameter = function() {
                this.cdmsBundle.active = !0,
                null !== this.MMFUid && (this.cdmsBundle.uid = this.MMFUid),
                this.cdmsBundle.action = A("action"),
                "select" !== this.cdmsBundle.action && (this.cdmsBundle.action = "select"),
                this.cdmsBundle.selectType = A("selectType"),
                null === this.cdmsBundle.fiscYear && (this.cdmsBundle.fiscYear = "current"),
                this.cdmsBundle.returnUrl = A("returnUrl"),
                this.cdmsBundle.directValidation = A("directValidation"),
                null === this.cdmsBundle.directValidation && (this.cdmsBundle.directValidation = !1)
            }
            ,
            e.prototype.getConfig = function() {
                return this.config
            }
            ,
            e.prototype.setConfig = function(e) {
                this.config = e
            }
            ,
            e.prototype.getUntouchedConfig = function() {
                return this.config
            }
            ,
            e.prototype.getAllConfiguration = function() {
                return this.http.get(C.CONFIGURATION)
            }
            ,
            e.prototype.getConfigByName = function(e) {
                return this.http.get(C.CONFIGURATION + "/" + e)
            }
            ,
            e.prototype.getConfigUrlByName = function(e) {
                return C.CONFIGURATION + "/" + e
            }
            ,
            e.prototype.goToErrorPage = function() {
                window.location.replace("/ecad-web/#/404")
            }
            ,
            e.prototype.removeConfiguration = function(e) {
                return this.http.get(C.CONFIGURATION + "/" + e + "/delete")
            }
            ,
            e.prototype.validateConfiguration = function(e) {
                var t = (new S.c).set("Content-Type", "application/json");
                return this.http.post(C.CONFIGURATION + "/validate", e, {
                    headers: t
                })
            }
            ,
            e.prototype.createNewConfig = function(e) {
                var t = (new S.c).set("Content-Type", "application/json");
                return this.http.post(C.VIA_INTERFACE + "/", e, {
                    headers: t
                })
            }
            ,
            e = I([Object(i.Injectable)(), L("design:paramtypes", [S.a, s.b])], e)
        }();
        function A(e, t) {
            t || (t = window.location.href),
            e = e.replace(/[\[\]]/g, "\\$&");
            var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
            return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
        }
        var R = n("Xu+G")
          , T = function() {
            function e() {}
            return e.getResolutionFromScale = function(e) {
                var t = v.BELGIAN_PROJECTION.getUnits();
                return e / (39.37 * y.a[t] * (25.4 / .28))
            }
            ,
            e.getCenterOfExtent = function(e) {
                return [e[0] + (e[2] - e[0]) / 2, e[1] + (e[3] - e[1]) / 2]
            }
            ,
            e.printCircularJson = function(e) {
                var t = [];
                JSON.stringify(e, function(e, n) {
                    if ("object" == typeof n && null !== n) {
                        if (-1 !== t.indexOf(n))
                            try {
                                return JSON.parse(JSON.stringify(n))
                            } catch (e) {
                                return
                            }
                        t.push(n)
                    }
                    return n
                }),
                t = null
            }
            ,
            e.getProxiedUrl = function(e) {
                return C.PROXY + "?url=" + e
            }
            ,
            e
        }()
          , E = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , w = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , k = function() {
            function e(e, t) {
                this.configService = e,
                this.deviceDetector = t,
                this.OSMView = new b.a({
                    projection: "EPSG:3857",
                    center: [499785.36, 6534037.45],
                    zoom: 8,
                    enableRotation: !1
                })
            }
            return e.prototype.getMinZoom = function() {
                var e = document.getElementById("map").clientWidth;
                return Math.ceil(Math.LOG2E * Math.log(e / 512))
            }
            ,
            e.prototype.getBelgianView = function() {
                var e;
                this.deviceDetector.isMobile() || this.deviceDetector.isTablet() ? (this.scaleLines = this.configService.getConfig().mobileZoomLevels,
                e = this.scaleLines) : (this.scaleLines = this.configService.getConfig().zoomLevels,
                e = this.scaleLines);
                for (var t = 0; t < e.length; t++)
                    e[t] = T.getResolutionFromScale(e[t]);
                return new b.a({
                    projection: v.BELGIAN_PROJECTION,
                    center: this.getCenterOfExtent(v.BELGIAN_PROJECTION.getExtent()),
                    resolution: e[0],
                    resolutions: e,
                    enableRotation: !1
                })
            }
            ,
            e.prototype.getCenterOfExtent = function(e) {
                return [e[0] + (e[2] - e[0]) / 2, e[1] + (e[3] - e[1]) / 2]
            }
            ,
            e = E([Object(i.Injectable)(), w("design:paramtypes", [O, R.DeviceDetectorService])], e)
        }()
          , _ = n("eM/O")
          , x = n("pJul")
          , N = function() {
            return function(e, t, n, i, a, o, r, s, l, c, p, u, d, g, h) {
                void 0 === p && (p = 1 / 0),
                void 0 === u && (u = 0),
                void 0 === d && (d = !0),
                void 0 === g && (g = !0),
                void 0 === h && (h = 100),
                this.name = e,
                this.layer = t,
                this.fiscalLayer = n,
                this.tableName = i,
                this.features = a,
                this.active = o,
                this.opacity = r,
                this.legendUrl = s,
                this.permissions = l,
                this.descriptionKey = c,
                this.maxScale = p,
                this.minScale = u,
                this.addedToMap = d,
                this.canDelete = g,
                this.searchLimit = h
            }
        }()
          , P = n("8Rls")
          , M = n("Ka2M")
          , F = n("Mdwg")
          , V = this && this.__awaiter || function(e, t, n, i) {
            return new (n || (n = Promise))(function(a, o) {
                function r(e) {
                    try {
                        l(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        l(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function l(e) {
                    e.done ? a(e.value) : new n(function(t) {
                        t(e.value)
                    }
                    ).then(r, s)
                }
                l((i = i.apply(e, t || [])).next())
            }
            )
        }
          , D = this && this.__generator || function(e, t) {
            var n, i, a, o, r = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; r; )
                            try {
                                if (n = 1,
                                i && (a = i[2 & o[0] ? "return" : o[0] ? "throw" : "next"]) && !(a = a.call(i, o[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (o = [0, a.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    a = o;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(a = (a = r.trys).length > 0 && a[a.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!a || o[1] > a[0] && o[1] < a[3])) {
                                        r.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && r.label < a[1]) {
                                        r.label = a[1],
                                        a = o;
                                        break
                                    }
                                    if (a && r.label < a[2]) {
                                        r.label = a[2],
                                        r.ops.push(o);
                                        break
                                    }
                                    a[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                o = t.call(e, r)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                n = a = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        }
          , j = function() {
            function e(e, t, n, i, a, o) {
                void 0 === i && (i = 100),
                void 0 === a && (a = 4e6),
                void 0 === o && (o = 1),
                this.name = e,
                this.sourceUrl = t,
                this.layer = n,
                this.minScale = i,
                this.maxScale = a,
                this.opacity = o
            }
            return e.prototype.generateWMTS = function() {
                return V(this, void 0, void 0, function() {
                    return D(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return e.trys.push([0, 2, , 3]),
                            [4, this.waitForUrl()];
                        case 1:
                            return [2, e.sent()];
                        case 2:
                            throw e.sent();
                        case 3:
                            return [2]
                        }
                    })
                })
            }
            ,
            e.prototype.waitForUrl = function() {
                var e = this
                  , t = new P.a;
                return fetch(this.sourceUrl).then(function(e) {
                    return e.text()
                }).then(function(n) {
                    var i = t.read(n)
                      , a = M.b(i, {
                        format: "image/png",
                        layer: e.layer,
                        crossOrigin: "anonymous"
                    });
                    return new F.a({
                        name: e.name,
                        visible: !1,
                        opacity: e.opacity,
                        source: new M.a(a),
                        minResolution: T.getResolutionFromScale(e.minScale),
                        maxResolution: T.getResolutionFromScale(e.maxScale)
                    })
                })
            }
            ,
            e
        }()
          , G = n("YaPU")
          , B = n("WiOa")
          , U = function() {
            function e(e) {
                this.opacity = e
            }
            return e.prototype.getLayer = function() {
                return new F.a({
                    name: "OSM",
                    visible: !1,
                    source: new B.b,
                    opacity: this.opacity
                })
            }
            ,
            e
        }()
          , z = (n("2vRS"),
        n("ItK/"))
          , K = n("j0xK")
          , Y = n("DwLH")
          , Z = function() {
            function e(e, t, n, i, a, o, r) {
                void 0 === a && (a = 100),
                void 0 === o && (o = 4e6),
                void 0 === r && (r = .9),
                this.name = e,
                this.sourceUrl = t,
                this.layer = n,
                this.projection = i,
                this.minScale = a,
                this.maxScale = o,
                this.opacity = r
            }
            return e.prototype.getImageLayer = function() {
                return new z.a({
                    extent: this.projection.getExtent(),
                    source: new K.a({
                        url: this.sourceUrl,
                        crossOrigin: "anonymous",
                        params: {
                            LAYERS: this.layer,
                            TRANSPARENT: !0
                        },
                        ratio: 1
                    }),
                    opacity: this.opacity,
                    minResolution: T.getResolutionFromScale(this.minScale),
                    maxResolution: T.getResolutionFromScale(this.maxScale)
                })
            }
            ,
            e.prototype.getNonTransparentImageLayer = function() {
                return new z.a({
                    extent: this.projection.getExtent(),
                    source: new K.a({
                        url: this.sourceUrl,
                        crossOrigin: "anonymous",
                        params: {
                            LAYERS: this.layer,
                            TRANSPARENT: !1
                        },
                        ratio: 1
                    }),
                    opacity: this.opacity,
                    minResolution: T.getResolutionFromScale(this.minScale),
                    maxResolution: T.getResolutionFromScale(this.maxScale)
                })
            }
            ,
            e.prototype.getTiledLayer = function() {
                return new z.b({
                    source: new Y.a({
                        url: this.sourceUrl,
                        crossOrigin: "anonymous",
                        params: {
                            LAYERS: this.layer,
                            TILED: !0,
                            TRANSPARENT: !0
                        }
                    }),
                    opacity: this.opacity,
                    minResolution: T.getResolutionFromScale(this.minScale),
                    maxResolution: T.getResolutionFromScale(this.maxScale)
                })
            }
            ,
            e
        }()
          , W = n("WMwB")
          , H = n("CFGb")
          , X = n("f2+N")
          , J = n("7yEG")
          , q = n("beD/")
          , Q = n("uli1")
          , ee = function() {
            function e(e, t, n, i, a, o, r, s, l) {
                this.name = e,
                this.sourceUrl = t,
                this.layer = n,
                this.active = i,
                this.projection = a,
                this.identificationAtScale = o,
                this.opacity = r,
                this.smallFeature = s,
                this.tiled = l
            }
            return e.prototype.setUrl = function(e) {
                this.sourceUrl = e
            }
            ,
            e.prototype.getLayer = function() {
                var e = T.getResolutionFromScale(1e4);
                null !== this.identificationAtScale && void 0 !== this.identificationAtScale && (e = T.getResolutionFromScale(this.identificationAtScale));
                var t = this;
                return new z.c({
                    renderMode: "image",
                    source: new W.a({
                        format: new H.a,
                        projection: this.projection,
                        url: function(e) {
                            return t.sourceUrl + "&bbox=" + e.join(",") + "&srsname=epsg:3812&version=1.1.0"
                        },
                        strategy: t.getStrategy(t.tiled)
                    }),
                    opacity: this.opacity,
                    visible: this.active,
                    maxResolution: e,
                    style: function(e) {
                        return new q.d({
                            fill: new q.b({
                                color: t.smallFeature ? "rgba(0,0,0,9)" : "rgba(0,0,0,0)"
                            }),
                            stroke: new q.c({
                                color: t.smallFeature ? "rgba(0,0,0,9)" : "rgba(0,0,0,0)",
                                width: .4
                            }),
                            image: t.smallFeature ? new Q.a({
                                radius: 5,
                                stroke: new q.c({
                                    color: "rgba(255,255,255,0.1)"
                                }),
                                fill: new q.b({
                                    color: "rgba(255,255,255,0.1)"
                                })
                            }) : null
                        })
                    }
                })
            }
            ,
            e.prototype.getStrategy = function(e) {
                return e ? X.c(J.b({
                    tileSize: 512
                })) : X.b
            }
            ,
            e
        }()
          , te = n("rrbt")
          , ne = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , ie = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , ae = function() {
            function e(e, t) {
                this.http = e,
                this.cookie = t
            }
            return e.prototype.isUserLogged = function() {
                return this.http.get(C.USERS + "/is_authenticated")
            }
            ,
            e.prototype.logout = function() {
                return this.http.get(C.USERS + "/logout")
            }
            ,
            e.prototype.loadPermissions = function() {
                var e = this;
                return this.http.get(C.USERS + "/permissions").toPromise().then(function(t) {
                    e.permissions = t
                })
            }
            ,
            e.prototype.getLanguage = function(e) {
                if (this.cookie.delete("language", "/ecad-web"),
                !e) {
                    var t = navigator.language.slice(0, 2);
                    this.cookie.get("language") && this.cookie.get("language") == t || ("fr" !== t && "nl" !== t && (t = "nl"),
                    this.cookie.set("language", t, void 0, "/"))
                }
                var n = this.cookie.get("language");
                return null !== n && "" !== n ? n : "nl"
            }
            ,
            e.prototype.getUserInformation = function() {
                return this.http.get(C.USERS + "/information")
            }
            ,
            e = ne([Object(i.Injectable)(), ie("design:paramtypes", [S.a, te.a])], e)
        }()
          , oe = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , re = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , se = function() {
            function e(e) {
                this.http = e
            }
            return e.prototype.getCmsContentByKey = function(e) {
                return this.http.get(C.CMS_CONTENT + "/" + e).catch(function(t) {
                    return e
                })
            }
            ,
            e.prototype.getCmsKeys = function() {
                return this.http.get(C.CMS_CONTENT)
            }
            ,
            e.prototype.saveCmsItem = function(e, t) {
                var n = (new S.c).set("Content-Type", "application/json");
                return this.http.post(C.CMS_CONTENT + "/" + e + "/update", t, {
                    headers: n
                })
            }
            ,
            e.prototype.deleteCmsItem = function(e) {
                var t = (new S.c).set("Content-Type", "application/json");
                return this.http.post(C.CMS_CONTENT + "/delete", e, {
                    headers: t
                })
            }
            ,
            e.prototype.exportCmsItems = function() {
                var e = (new S.c).set("Content-Type", "application/json");
                return this.http.get(C.CMS_CONTENT + "/export", {
                    headers: e
                })
            }
            ,
            e.prototype.importCmsItems = function(e) {
                var t = (new S.c).set("Content-Type", "application/json");
                return this.http.post(C.CMS_CONTENT + "/import", e, {
                    headers: t
                })
            }
            ,
            e = oe([Object(i.Injectable)(), re("design:paramtypes", [S.a])], e)
        }()
          , le = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , ce = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , pe = function() {
            function e(e, t) {
                this.notificationsService = e,
                this.labelService = t
            }
            return e.prototype.raw = function(e, t) {
                this.notificationsService.html(e, t)
            }
            ,
            e.prototype.notify = function(e, t) {
                var n = this;
                this.labelService.getLabel(t).map(function(e) {
                    return e.value
                }).take(1).toPromise().then(function(t) {
                    switch (e) {
                    case "info":
                        return void n.notificationsService.info(t);
                    case "error":
                        return void n.notificationsService.error(t);
                    case "success":
                        return void n.notificationsService.success(t)
                    }
                }).catch(function(e) {
                    return n.missingLabel()
                })
            }
            ,
            e.prototype.missingLabel = function() {
                this.notificationsService.info("Missing Label")
            }
            ,
            e = le([Object(i.Injectable)(), ce("design:paramtypes", [r.NotificationsService, s.b])], e)
        }()
          , ue = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , de = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , ge = function() {
            function e(e) {
                this.http = e
            }
            return e.prototype.proxyGetAddress = function(e) {
                var t = (new S.d).set("url", e);
                return this.http.get(C.PROXY, {
                    params: t,
                    responseType: "text"
                })
            }
            ,
            e = ue([Object(i.Injectable)(), de("design:paramtypes", [S.a])], e)
        }()
          , he = n("aexF")
          , fe = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , ye = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , me = this && this.__awaiter || function(e, t, n, i) {
            return new (n || (n = Promise))(function(a, o) {
                function r(e) {
                    try {
                        l(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        l(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function l(e) {
                    e.done ? a(e.value) : new n(function(t) {
                        t(e.value)
                    }
                    ).then(r, s)
                }
                l((i = i.apply(e, t || [])).next())
            }
            )
        }
          , ve = this && this.__generator || function(e, t) {
            var n, i, a, o, r = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; r; )
                            try {
                                if (n = 1,
                                i && (a = i[2 & o[0] ? "return" : o[0] ? "throw" : "next"]) && !(a = a.call(i, o[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (o = [0, a.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    a = o;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(a = (a = r.trys).length > 0 && a[a.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!a || o[1] > a[0] && o[1] < a[3])) {
                                        r.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && r.label < a[1]) {
                                        r.label = a[1],
                                        a = o;
                                        break
                                    }
                                    if (a && r.label < a[2]) {
                                        r.label = a[2],
                                        r.ops.push(o);
                                        break
                                    }
                                    a[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                o = t.call(e, r)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                n = a = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        }
          , be = function() {
            function e(e, t, n, i, a, o, r) {
                var s = this;
                this.configService = e,
                this.viewRepository = t,
                this.proxy = n,
                this.userService = i,
                this.cmsService = a,
                this.notificationService = o,
                this.labelService = r,
                this.backdrops = new Map,
                this.layers = new Map,
                this.translations = new Map,
                this.mappingTable = new Map,
                this.inspire = new Map,
                this.userLayers = new Map,
                this.userLayer = null,
                this.historic = new Map,
                this.projectionMap = new Map,
                this.config = this.configService.getConfig(),
                this.projectionMap.set("EPSG:3812", v.BELGIAN_PROJECTION),
                this.projectionMap.set("EPSG:3857", new m.a({
                    code: "ESPG:3857",
                    units: "m"
                })),
                !0 === this.userService.permissions.accessIntraFeatures ? this.permission = "INTRA" : !0 === this.userService.permissions.accessSurveyorFeatures ? this.permission = "SURVEYOR" : !0 === this.userService.permissions.accessPartnerFeatures ? this.permission = "PARTNER" : !0 === this.userService.permissions.accessCitizenFeatures ? this.permission = "CITIZEN" : this.permission = "WEB",
                this.userService.isUserLogged().toPromise().then(function(e) {
                    s.labelService.lang.next(s.userService.getLanguage(e).toUpperCase())
                })
            }
            return e.prototype.loadAllBackdrop = function() {
                var e = this;
                this.config.backdrops.forEach(function(t) {
                    if ("WMTS" === t.type)
                        G.a.fromPromise(new j(t.titleKey,t.url,t.layerName,t.minScale,t.maxScale,t.opacity).generateWMTS()).subscribe(function(n) {
                            1 == t.active ? (n.setVisible(!0),
                            e.activeBackdrop = t) : n.setVisible(!1),
                            e.getCmsValueInTranslationMap(t.titleKey),
                            e.backdrops.set(t.titleKey, new N(t.titleKey,n,null,null,null,t.active,t.opacity,t.legendUrl,null,null))
                        });
                    else if ("OSM" === t.type) {
                        var n = (new U).getLayer();
                        !0 === t.active ? (n.setVisible(!0),
                        e.activeBackdrop = t) : n.setVisible(!1),
                        e.translations.set(t.titleKey, t.translations),
                        e.backdrops.set(t.titleKey, new N(t.titleKey,n,null,null,null,t.active,t.opacity,"",null,t.maxScale,t.minScale))
                    } else if ("WMS" === t.type) {
                        n = new Z(t.titleKey,t.url,t.layerName,e.getProjectionFromActiveBackdrop(),t.minScale,t.maxScale,t.opacity).getImageLayer();
                        t.tiled && (n = new Z(t.titleKey,t.url,t.layerName,e.getProjectionFromActiveBackdrop(),t.minScale,t.maxScale,t.opacity).getTiledLayer()),
                        !0 === t.active ? (n.setVisible(!0),
                        e.activeBackdrop = t) : n.setVisible(!1),
                        e.getCmsValueInTranslationMap(t.titleKey),
                        e.backdrops.set(t.titleKey, new N(t.title,n,null,null,null,t.active,t.opacity,t.legendUrl,null,t.maxScale,t.minScale))
                    }
                })
            }
            ,
            e.prototype.loadAllLayer = function() {
                var e = this;
                this.config.layers.forEach(function(t) {
                    var n = new Map
                      , i = new Map
                      , a = new Map;
                    e.fillMapWithWMS(t, n),
                    e.getCmsValueInTranslationMap(t.titleKey),
                    e.getCmsValueInTranslationMap(t.titleKey),
                    t.subGroups.forEach(function(t) {
                        var n = new Map;
                        e.fillMapWithWMS(t, n),
                        i.set(t.titleKey, n),
                        e.getCmsValueInTranslationMap(t.titleKey)
                    }),
                    a.set("layers", n),
                    a.set("subGroup", i),
                    e.layers.set(t.titleKey, a)
                })
            }
            ,
            e.prototype.loadAllInspire = function() {
                var e = this;
                this.config.inspire.forEach(function(t) {
                    var n = new Map
                      , i = new Map
                      , a = new Map;
                    e.fillMapWithInspireWMS(t, n),
                    e.getCmsValueInTranslationMap(t.titleKey),
                    t.subGroups.forEach(function(t) {
                        var n = new Map;
                        e.fillMapWithInspireWMS(t, n),
                        i.set(t.titleKey, n),
                        e.getCmsValueInTranslationMap(t.titleKey)
                    }),
                    a.set("layers", n),
                    a.set("subGroup", i),
                    e.inspire.set(t.titleKey, a)
                })
            }
            ,
            e.prototype.loadAllUserLayers = function() {
                var e = this;
                this.config.userLayers.forEach(function(t) {
                    var n = e.loadUserLayers(t);
                    e.userLayers.set(t.titleKey, n)
                })
            }
            ,
            e.prototype.loadUserLayers = function(e) {
                this.getCmsValueInTranslationMap(e.titleKey);
                var t = new Map;
                return e.layers.forEach(function(e) {
                    e.addedToMap = !1,
                    t.set(e.titleKey, e)
                }),
                t
            }
            ,
            e.prototype.addUserLayer = function(e) {
                return me(this, void 0, void 0, function() {
                    var t, n, i, a, o = this;
                    return ve(this, function(r) {
                        switch (r.label) {
                        case 0:
                            return e.addedToMap = !0,
                            t = e.type,
                            n = e.url,
                            i = e.titleKey,
                            a = n.trim(),
                            !0,
                            [4, this.proxy.proxyGetAddress(a).toPromise().then(function(a) {
                                return me(o, void 0, void 0, function() {
                                    var o, r, s;
                                    return ve(this, function(l) {
                                        switch (l.label) {
                                        case 0:
                                            return ("WMS" !== t || a.includes("WMS")) && ("WMTS" !== t || a.includes("WMTS")) ? (a.includes("EPSG:3812") || a.includes("3812") || (this.notificationService.notify("error", "NOTIFICATION_LAYER_NOT_LAMBERT_2008"),
                                            !1),
                                            "WMS" !== t ? [3, 2] : (r = new he.a,
                                            o = this,
                                            [4, fetch(n).then(function(e) {
                                                return e.text()
                                            }).then(function(t) {
                                                var a, s = r.read(t);
                                                a = s.Service ? s.Service.OnlineResource.replace("?", "") : n.split("?")[0];
                                                var l, c = o.getWMSFromWMSCapabilities(s, a, e);
                                                (null !== i && (c.get("header").title = i),
                                                null == o.userLayer) ? ((l = []).push(c),
                                                o.userLayer = l,
                                                o.notificationService.notify("success", "NOTIFICATION_LAYER_ADDED_CORRECTLY"),
                                                n = "",
                                                !1) : ((l = o.userLayer).push(c),
                                                o.userLayer = l,
                                                o.notificationService.notify("success", "NOTIFICATION_LAYER_ADDED_CORRECTLY"),
                                                n = "",
                                                !1)
                                            })])) : (this.notificationService.notify("error", "NOTIFICATION_LAYER_NOT_RIGHT_SERVICE"),
                                            !1,
                                            [2]);
                                        case 1:
                                            return l.sent(),
                                            [3, 3];
                                        case 2:
                                            "WMTS" === t && (r = new P.a,
                                            s = this,
                                            fetch(n).then(function(e) {
                                                return e.text()
                                            }).then(function(t) {
                                                var a = r.read(t)
                                                  , o = s.getWMTSFromWMTSCapabilities(a, n, e);
                                                null !== i && (o.get("header").title = i),
                                                null === s.userLayer ? setTimeout(function() {
                                                    var e = [];
                                                    e.push(o),
                                                    s.userLayer = e,
                                                    s.notificationService.notify("success", "NOTIFICATION_LAYER_ADDED_CORRECTLY"),
                                                    n = "",
                                                    !1
                                                }, 1e3) : setTimeout(function() {
                                                    var e = s.userLayer;
                                                    e.push(o),
                                                    s.userLayer = e,
                                                    s.notificationService.notify("success", "NOTIFICATION_LAYER_ADDED_CORRECTLY"),
                                                    n = "",
                                                    !1
                                                }, 1e3)
                                            })),
                                            l.label = 3;
                                        case 3:
                                            return [2]
                                        }
                                    })
                                })
                            }).catch(function(e) {
                                console.error(e),
                                o.notificationService.notify("error", "NOTIFICATION_LAYER_NOT_RIGHT_SERVICE")
                            })];
                        case 1:
                            return r.sent(),
                            [2]
                        }
                    })
                })
            }
            ,
            e.prototype.loadAllHistoric = function() {
                var e = this;
                this.config.historic.forEach(function(t) {
                    var n = new Z(t.title,t.wms,t.layers.join(),e.getProjectionFromActiveBackdrop(),void 0,void 0,t.opacity).getNonTransparentImageLayer()
                      , i = new N(t.title,n,n,t.title,null,!1,!0,null,null,null,1 / 0,0,!1,!0);
                    i.opacity = t.opacity,
                    e.historic.set(t.title, i)
                })
            }
            ,
            e.prototype.fillMapWithInspireWMS = function(e, t) {
                var n = this;
                e.layers.forEach(function(e) {
                    var i = n.getWMSforEachLayer(e);
                    if (i.addedToMap = n.getPermissionForLayer(e.permissions, "presentInToc"),
                    "" !== e.vector && null !== e.vector && void 0 !== e.vector) {
                        var a = n.getVectorForEachLayer(e);
                        a.addedToMap = n.getPermissionForLayer(e.permissions, "presentInToc"),
                        t.set("Vector-" + a.name, a)
                    }
                    t.set(i.name, i)
                })
            }
            ,
            e.prototype.fillMapWithWMS = function(e, t) {
                var n = this;
                e.layers.forEach(function(e) {
                    n.mappingTable.set(e.tableName, {
                        translations: e.translations,
                        features: e.features,
                        vector: e.vector
                    });
                    var i = n.getWMSforEachLayer(e);
                    if ("" !== e.current.vector && null !== e.current.vector && void 0 !== e.current.vector) {
                        var a = n.getVectorForEachLayer(e);
                        t.set("Vector-" + a.name, a)
                    }
                    t.set(i.name, i)
                })
            }
            ,
            e.prototype.getWMSforEachLayer = function(e) {
                var t, n;
                return t = !0 === e.tiled ? new Z(e.titleKey,e.current.wms,e.layerName,this.getProjectionFromActiveBackdrop(),e.minScale,e.maxScale,e.opacity).getTiledLayer() : new Z(e.titleKey,e.current.wms,e.layerName,this.getProjectionFromActiveBackdrop(),e.minScale,e.maxScale,e.opacity).getImageLayer(),
                e.fiscal && (n = !0 === e.tiled ? new Z(e.titleKey,e.fiscal.wms,e.layerName,this.getProjectionFromActiveBackdrop(),e.minScale,e.maxScale,e.opacity).getTiledLayer() : new Z(e.titleKey,e.fiscal.wms,e.layerName,this.getProjectionFromActiveBackdrop(),e.minScale,e.maxScale,e.opacity).getImageLayer()),
                t.setVisible(this.getPermissionForLayer(e.permissions, "visibleByDefault")),
                this.getCmsValueInTranslationMap(e.titleKey),
                new N(e.titleKey,t,n,e.tableName,e.features,this.getPermissionForLayer(e.permissions, "visibleByDefault"),e.opacity,e.legendUrl,e.permissions,e.descriptionKey,e.maxScale,e.minScale,this.getPermissionForLayer(e.permissions, "presentInToc"),this.getPermissionForLayer(e.permissions, "deletion"),e.searchLimit)
            }
            ,
            e.prototype.getVectorForEachLayer = function(e) {
                var t, n;
                return t = new ee(e.titleKey,e.current.vector,e.layerName,!1,this.getProjectionFromActiveBackdrop(),e.identifyAtScale,e.opacity,e.smallFeature,e.vectorTiled).getLayer(),
                n = new ee(e.titleKey,e.fiscal.vector,e.layerName,!1,this.getProjectionFromActiveBackdrop(),e.identifyAtScale,e.opacity,e.smallFeature,e.vectorTiled).getLayer(),
                t.setVisible(!1),
                n.setVisible(!1),
                new N(e.titleKey,t,n,e.tableName,e.features,this.getPermissionForLayer(e.permissions, "visibleByDefault"),e.opacity,e.legendUrl,e.permissions,e.maxScale,e.minScale)
            }
            ,
            e.prototype.getCurrentViewForActiveBackdrop = function() {
                if (void 0 !== this.activeBackdrop) {
                    if ("EPSG:3812" === this.activeBackdrop.projection)
                        return this.viewRepository.getBelgianView();
                    if ("EPSG:3857" === this.activeBackdrop.projection)
                        return this.viewRepository.OSMView
                }
            }
            ,
            e.prototype.getLayerContainerFromExternalUrl = function(e, t) {
                var n = this
                  , i = [];
                return e.forEach(function(e) {
                    if (e.length >= 0)
                        e.layer.forEach(function(a) {
                            var o = new Z(a.title,t,a.name,n.getProjectionFromActiveBackdrop(),0,4e6,1).getImageLayer();
                            i.push(new N(a.title,o,o,null,null,!0,!0,t + "?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=" + a.name,!0,e.descriptionKey,e.maxScale,e.minScale,!0,!0))
                        });
                    else {
                        var a = new Z(e.title,t,e.name,n.getProjectionFromActiveBackdrop(),0,4e6,1).getImageLayer();
                        i.push(new N(e.title,a,a,null,null,!0,!0,t + "?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=" + e.name,!0,e.descriptionKey,e.maxScale,e.minScale,!0,!0))
                    }
                }),
                i
            }
            ,
            e.prototype.getWMTSFromWMTSCapabilities = function(e, t, n) {
                var i = this
                  , a = new Map;
                return a.set("groups", new Map),
                a.set("layers", new Map),
                e.ServiceIdentification.Title && a.set("header", {
                    title: e.ServiceIdentification.Title,
                    hidden: !0,
                    active: !n || this.getPermissionForLayer(n.permissions, "visibleByDefault"),
                    url: t,
                    permissions: n ? n.permissions : this.getUserLayerByUrlPermissions()
                }),
                e.Contents.Layer.forEach(function(e) {
                    try {
                        G.a.fromPromise(new j(e.Title,t,e.Identifier,0,4e6,n ? n.opacity : 1).generateWMTS()).subscribe(function(t) {
                            t.setVisible(!n || i.getPermissionForLayer(n.permissions, "visibleByDefault"));
                            var o = "";
                            e.Style && e.Style[0] && e.Style.LegendURL && (o = e.Style[0].LegendURL[0].href || ""),
                            a.get("layers").set(e.Title, new N(e.Title,t,"WMTS",null,null,!n || t.setVisible(i.getPermissionForLayer(n.permissions, "visibleByDefault")),!0,o,n ? n.permissions : i.getUserLayerByUrlPermissions(),null,null,null,!0,!0))
                        })
                    } catch (e) {
                        console.error(e),
                        i.notificationService.notify("error", "NOTIFICATION_LAYER_NOT_LAMBERT_2008")
                    }
                }),
                a
            }
            ,
            e.prototype.getWMSFromWMSCapabilities = function(e, t, n) {
                var i = this
                  , a = new Map;
                return a.set("groups", new Map),
                a.set("layers", new Map),
                e.Service.Title && a.set("header", {
                    title: e.Service.Title,
                    hidden: !0,
                    active: !n || this.getPermissionForLayer(n.permissions, "visibleByDefault"),
                    url: t,
                    permissions: n ? n.permissions : this.getUserLayerByUrlPermissions()
                }),
                e.Capability.Layer.Layer.forEach(function(e) {
                    if (e.Name) {
                        var o = new Z(e.Title,t,e.Name,i.getProjectionFromActiveBackdrop(),0,4e6,n ? n.opacity : 1).getImageLayer();
                        o.setVisible(!n || i.getPermissionForLayer(n.permissions, "visibleByDefault"));
                        var r = void 0;
                        e.Style && e.Style[0].LegendURL && e.Style[0].LegendURL[0].OnlineResource && (r = e.Style[0].LegendURL[0].OnlineResource);
                        var s = new N(e.Title,o,"",null,null,!n || i.getPermissionForLayer(n.permissions, "visibleByDefault"),!0,r,n ? n.permissions : i.getUserLayerByUrlPermissions(),null,null,null,!0,!0);
                        s.opacity = o.getOpacity(),
                        a.get("layers").set(e.Title, s)
                    }
                    if (e.Layer) {
                        var l = new Map;
                        l.set("groups", new Map),
                        l.set("layers", new Map),
                        e.Layer.forEach(function(e) {
                            if (e.Name) {
                                var a = new Z(e.Title,t,e.Name,i.getProjectionFromActiveBackdrop(),0,4e6,n ? n.opacity : 1).getImageLayer();
                                a.setVisible(!n || i.getPermissionForLayer(n.permissions, "visibleByDefault"));
                                var o = void 0;
                                e.Style && e.Style[0].LegendURL && e.Style[0].LegendURL[0].OnlineResource && (o = e.Style[0].LegendURL[0].OnlineResource);
                                var r = new N(e.Title,a,"",null,null,!n || i.getPermissionForLayer(n.permissions, "visibleByDefault"),!0,o,n ? n.permissions : i.getUserLayerByUrlPermissions(),null,null,null,!0,!0);
                                r.opacity = a.getOpacity(),
                                l.get("layers").set(e.Title, r)
                            } else if (e.Layer) {
                                var s = new Map;
                                e.Layer.forEach(function(e) {
                                    if (e.Name) {
                                        var a = new Z(e.Title,t,e.Name,i.getProjectionFromActiveBackdrop(),0,4e6,n ? n.opacity : 1).getImageLayer();
                                        a.setVisible(!n || i.getPermissionForLayer(n.permissions, "visibleByDefault"));
                                        var o = void 0;
                                        e.Style && e.Style[0].LegendURL && e.Style[0].LegendURL[0].OnlineResource && (o = e.Style[0].LegendURL[0].OnlineResource);
                                        var r = new N(e.Title,a,"",null,null,!n || i.getPermissionForLayer(n.permissions, "visibleByDefault"),!0,o,n ? n.permissions : i.getUserLayerByUrlPermissions(),null,null,null,!0,!0);
                                        r.opacity = a.getOpacity(),
                                        s.set(e.Title, r)
                                    }
                                }),
                                l.get("groups").set(e.Title, s)
                            }
                        }),
                        a.get("groups").set(e.Title, l)
                    }
                }),
                a
            }
            ,
            e.prototype.getProjectionFromActiveBackdrop = function() {
                return void 0 !== this.activeBackdrop ? this.projectionMap.get(this.activeBackdrop.projection) : this.projectionMap.get("EPSG:3812")
            }
            ,
            e.prototype.getCmsValueInTranslationMap = function(e) {
                var t = this;
                this.cmsService.getCmsContentByKey(e).toPromise().then(function(n) {
                    t.translations.set(e, n)
                })
            }
            ,
            e.prototype.getPermissionForLayer = function(e, t) {
                var n = {
                    presentInToc: !0,
                    visibleByDefault: !0,
                    deletion: !0,
                    addition: !1
                };
                return e && e[this.permission] ? e[this.permission][t] : n[t]
            }
            ,
            e.prototype.getUserLayerByUrlPermissions = function() {
                return {
                    WEB: {
                        presentInToc: !0,
                        visibleByDefault: !0,
                        deletion: !0,
                        addition: !0
                    },
                    CITIZEN: {
                        presentInToc: !0,
                        visibleByDefault: !0,
                        deletion: !0,
                        addition: !0
                    },
                    PARTNER: {
                        presentInToc: !0,
                        visibleByDefault: !0,
                        deletion: !0,
                        addition: !0
                    },
                    SURVEYOR: {
                        presentInToc: !0,
                        visibleByDefault: !0,
                        deletion: !0,
                        addition: !0
                    },
                    INTRA: {
                        presentInToc: !0,
                        visibleByDefault: !0,
                        deletion: !0,
                        addition: !0
                    }
                }
            }
            ,
            e = fe([Object(i.Injectable)(), ye("design:paramtypes", [O, k, ge, ae, se, pe, s.b])], e)
        }();
        function Se(e, t) {
            const n = document.createElement(e);
            return t && n.classList.add.apply(n.classList, "string" == typeof t ? t.split(" ") : t),
            n
        }
        class Ce extends _.a {
            constructor(e={}) {
                const t = Ce.render
                  , n = e.target
                  , i = e.maxResolution
                  , a = Ce.createElement("div", "ol-full-extent-button");
                a.className = "ol-full-extent-button ol-unselectable ol-control",
                a.id = "fullExtentId",
                super({
                    element: a,
                    render: t,
                    target: n
                });
                let o = this
                  , r = document.createElement("button");
                r.className = "btn ol-belgium",
                r.innerHTML = '<i class="content svg-icon belgium-icon" ></i>',
                r.addEventListener("click", function() {
                    o.getMap().getView().setResolution(Ce.getResolutionFromScale(i)),
                    o.getMap().getView().setCenter(Ce.getCenterOfExtent([521989.4444999993, 521165.125599999, 795171.9135000035, 744030.4598999992]))
                }, !1),
                a.appendChild(r)
            }
            static getResolutionFromScale(e) {
                v.BELGIAN_PROJECTION.getUnits();
                return e / (25.4 / .28 * 39.37)
            }
            static render(e) {
                const t = e.frameState;
                this.viewState_ = null == t ? null : t.viewState
            }
            static get FULL_EXTENT_RATIO() {
                return 512
            }
            static createElement(e, t) {
                const n = document.createElement(e);
                return t && n.classList.add.apply(n.classList, "string" == typeof t ? t.split(" ") : t),
                n
            }
            static getMinZoom() {
                var e = document.getElementById("map").clientWidth;
                return Math.ceil(Math.LOG2E * Math.log(e / Ce.FULL_EXTENT_RATIO))
            }
            static getCenterOfExtent(e) {
                return [e[0] + (e[2] - e[0]) / 2, e[1] + (e[3] - e[1]) / 2]
            }
        }
        const Ie = 25.4 / .28
          , Le = 39.37;
        class Oe extends _.a {
            constructor(e={}, t, n) {
                const i = e.className || "ol-mapscale"
                  , a = e.scaleLineClassName || "ol-scale-line"
                  , o = e.scaleLineClassName || "ol-scale-value"
                  , r = (e.resolutions,
                Oe.render)
                  , s = e.target
                  , l = Se("div", i);
                l.id = "scaleId",
                super({
                    element: l,
                    render: r,
                    target: s
                }),
                this.units_ = e.units,
                this.digits_ = e.digits,
                this.scaleValueElement_ = Se("input", o),
                this.scaleValueElement_.setAttribute("id", "scaleValue"),
                this.scaleValueElement_.setAttribute("size", 10),
                this.scaleValueElement_.setAttribute("readonly", !0),
                l.appendChild(this.scaleValueElement_),
                this.scaleValueElement_.onclick = function() {
                    this.removeAttribute("readonly")
                }
                ,
                this.scaleValueElement_.onblur = function() {
                    this.setAttribute("readonly", !0)
                }
                ;
                let c = this;
                this.scaleValueElement_.onkeyup = function(e) {
                    let i = document.getElementById("scaleValue")
                      , a = i.value;
                    -1 !== a.indexOf(":") && (a = a.split(":")[1]),
                    a = p(a.trim()),
                    "Enter" === e.key && (i.blur(),
                    i.setAttribute("readonly", !0),
                    Number.isInteger(a) && a <= n && a >= t && c.getMap().getView().setResolution(Ce.getResolutionFromScale(a))),
                    Number.isInteger(a) && a <= n && a >= t ? (i.style.color = "black",
                    document.getElementById("errorControlJS").style.visibility = "hidden") : (document.getElementById("errorControlJS").style.visibility = "visible",
                    i.style.color = "red")
                }
                ;
                let p = function(e) {
                    return /^(\-|\+)?([0-9]+|Infinity)$/.test(e) ? Number(e) : NaN
                };
                if (this.viewState_ = void 0,
                this.scaleLine_ = void 0,
                "undefined" == typeof e.scaleLine || e.scaleLine) {
                    const e = Se("div", "ol-scale-line-target");
                    l.appendChild(e),
                    this.scaleLine_ = new _.d({
                        target: e,
                        className: a
                    }),
                    this.scaleLine_.on("change:units", this.handleUnitsChanged_)
                }
            }
            static render(e) {
                const t = e.frameState;
                this.viewState_ = null == t ? null : t.viewState,
                this.updateElement_()
            }
            setMap(e) {
                this.scaleLine_ && this.scaleLine_.setMap(e),
                super.setMap(e)
            }
            handleUnitsChanged_() {
                this.updateElement_()
            }
            updateElement_() {
                const e = this.viewState_;
                if (e) {
                    let t = document.getElementById("scaleValue");
                    t && (t.style.color = "black"),
                    document.getElementById("errorControlJS").style.visibility = "hidden";
                    const n = e.resolution
                      , i = e.projection.getMetersPerUnit() * n
                      , a = Math.round(i * Ie * Le);
                    this.scaleValueElement_.value = "1 : " + a
                }
            }
        }
        class Ae extends _.a {
            constructor(e={}) {
                const t = Ae.render
                  , n = e.target
                  , i = (e.maxResolution,
                Ae.createElement("div", "ol-my-position-button"));
                i.className = "ol-my-position ol-unselectable ol-control",
                i.id = "myPositionId",
                super({
                    element: i,
                    render: t,
                    target: n
                });
                let a = this;
                function o(e) {
                    let t = Object(y.e)([e.coords.longitude, e.coords.latitude])
                      , n = proj4("EPSG:3857", "EPSG:3812", [Math.round(t[0]), Math.round(t[1])]);
                    a.getMap().getView().setResolution(Ae.getResolutionFromScale(1e4)),
                    a.getMap().getView().setCenter(n)
                }
                let r = document.createElement("button");
                r.className = "btn btn-fin01 ol-position-icon",
                r.innerHTML = '<i class="content icon-fin-pict-position svg-icon" ></i>',
                r.addEventListener("click", function() {
                    navigator.geolocation && navigator.geolocation.getCurrentPosition(o)
                }, !1),
                i.appendChild(r)
            }
            static getResolutionFromScale(e) {
                v.BELGIAN_PROJECTION.getUnits();
                return e / (25.4 / .28 * 39.37)
            }
            static render(e) {
                const t = e.frameState;
                this.viewState_ = null == t ? null : t.viewState
            }
            static get FULL_EXTENT_RATIO() {
                return 512
            }
            static createElement(e, t) {
                const n = document.createElement(e);
                return t && n.classList.add.apply(n.classList, "string" == typeof t ? t.split(" ") : t),
                n
            }
            static getMinZoom() {
                var e = document.getElementById("map").clientWidth;
                return Math.ceil(Math.LOG2E * Math.log(e / Ae.FULL_EXTENT_RATIO))
            }
            static getCenterOfExtent(e) {
                return [e[0] + (e[2] - e[0]) / 2, e[1] + (e[3] - e[1]) / 2]
            }
        }
        var Re = n("IZoy")
          , Te = n("kZ1N")
          , Ee = n("nxYM")
          , we = n("1avf")
          , ke = n("lVyT")
          , _e = n("aUJj")
          , xe = n("8cSO")
          , Ne = function() {
            function e(e, t) {
                this.configService = e,
                this.notificationService = t,
                this.type = null,
                this.maxPoints = null,
                this.tool = null,
                this.source = new xe.a({
                    wrapX: !1
                }),
                this.mesureStyle = new q.d({
                    fill: new q.b({
                        color: "rgba(135,206,250, 0.5)"
                    }),
                    stroke: new q.c({
                        color: "rgba(0, 0, 0, 0.5)",
                        lineDash: [10, 10],
                        width: 2
                    }),
                    image: new q.a({
                        radius: 5,
                        stroke: new q.c({
                            color: "rgba(0, 0, 0, 0.7)"
                        }),
                        fill: new q.b({
                            color: "rgba(255, 255, 255, 0.2)"
                        })
                    })
                }),
                this.extractionStyle = new q.d({
                    fill: new q.b({
                        color: "rgba(135,206,250, 0.5)"
                    }),
                    stroke: new q.c({
                        color: "#3284ff",
                        lineDash: [10, 10],
                        width: 2
                    })
                })
            }
            return e.prototype.getVectorLayerForMesureTool = function() {
                return this.vector = new z.c({
                    zIndex: 1e3,
                    source: this.source,
                    style: this.mesureStyle
                }),
                this.vector.set("category", "DRAWING_LAYER"),
                this.vector
            }
            ,
            e.prototype.getDraw = function() {
                return "EXTRACTION_TOOL" === this.tool ? this.draw = new _e.a({
                    source: this.source,
                    type: this.type,
                    maxPoints: this.maxPoints,
                    style: this.extractionStyle
                }) : this.draw = new _e.a({
                    source: this.source,
                    type: this.type,
                    maxPoints: this.maxPoints,
                    style: this.mesureStyle
                }),
                this.draw
            }
            ,
            e.prototype.removeMeasureTooltip = function() {
                this.measureTooltipElement && this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement)
            }
            ,
            e.prototype.createMeasureTooltip = function() {
                return this.measureTooltipElement && this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement),
                this.measureTooltipElement = document.createElement("div"),
                this.measureTooltipElement.className = "tooltip-c tooltip-measure-c",
                this.measureTooltip = new Te.a({
                    element: this.measureTooltipElement,
                    offset: [0, -15],
                    positioning: "bottom-center"
                }),
                this.measureTooltip
            }
            ,
            e.prototype.formatLength = function(e) {
                var t = Object(we.c)(e);
                return Math.round(100 * t) / 100 + " m"
            }
            ,
            e.prototype.addInteractions = function(e) {
                var t, n = this;
                this.draw.on("drawstart", function(i) {
                    "EXTRACTION_TOOL" === n.tool && n.measureTooltip && n.source.clear(),
                    n.sketch = i.feature;
                    var a = i.coordinate;
                    t = n.sketch.getGeometry().on("change", function(t) {
                        var i, o = t.target, r = n.configService.getConfig().extractionPolygonLimit || "1000";
                        o instanceof ke.f ? (i = n.formatArea(Object(we.a)(o)),
                        "EXTRACTION_TOOL" === n.tool && Object(we.a)(o) > r && (n.notificationService.notify("error", "NOTIFICATION.EXTRACTION_LIMIT", r + " m\xb2"),
                        e.map.removeInteraction(this.draw)),
                        a = o.getInteriorPoint().getCoordinates()) : o instanceof ke.a && (i = n.formatLength(o),
                        a = o.getLastCoordinate()),
                        n.setPolygonArea(Object(we.a)(o)),
                        n.measureTooltipElement.innerHTML = i,
                        n.measureTooltip.setPosition(a)
                    })
                }, this),
                this.draw.on("drawend", function(i) {
                    n.measureTooltipElement.className = "tooltip-c tooltip-static-c",
                    n.measureTooltip.setOffset([0, -7]),
                    n.sketch = null,
                    "EXTRACTION_TOOL" != n.tool && (n.measureTooltipElement = null,
                    e.map.addOverlay(n.createMeasureTooltip())),
                    Object(Ee.b)(t);
                    var a = i.feature.getGeometry();
                    n.setGeometry(a)
                }, this)
            }
            ,
            e.prototype.formatArea = function(e) {
                return Math.round(100 * e) / 100 + " m<sup>2</sup>"
            }
            ,
            e.prototype.setType = function(e) {
                this.type = e
            }
            ,
            e.prototype.setMaxPoints = function(e) {
                this.maxPoints = e
            }
            ,
            e.prototype.setTool = function(e) {
                this.tool = e
            }
            ,
            e.prototype.setPolygonArea = function(e) {
                this.polygonArea = e
            }
            ,
            e.prototype.getPolygonArea = function() {
                return this.polygonArea
            }
            ,
            e.prototype.setGeometry = function(e) {
                this.geometry = e
            }
            ,
            e.prototype.getgeometry = function() {
                return this.geometry
            }
            ,
            e
        }()
          , Pe = function() {
            function e() {}
            return e.prototype.generateCoordinatesControl = function(e) {
                var t = !1
                  , n = document.createElement("div");
                n.className = "ol-mouse-position",
                n.id = "mouseCoordinatesId",
                document.getElementsByClassName("ol-overlaycontainer-stopevent")[0].appendChild(n),
                n.innerHTML = "<div class='row'><div class=''><select id='projectionSelector' class='ol-mouse-position-select pointer'><option value='EPSG:3812'>Lambert 2008</option><option value='EPSG:31370'>Lambert 1972</option></select></div><div class=''><span id='spanCoordinateMeter'> &nbsp : &nbsp X  <input type='text' class='ol-coordinates-input' id='coordinatesX'> &nbsp m - Y <input type='text' class='ol-coordinates-input' id='coordinatesY'> &nbsp m </span></div></div>";
                var i = document.getElementById("coordinatesX")
                  , a = document.getElementById("coordinatesY");
                document.getElementById("projectionSelector").onchange = function() {
                    document.activeElement.blur()
                }
                ,
                i.setAttribute("readonly", "true"),
                a.setAttribute("readonly", "true"),
                i.onclick = function() {
                    i.removeAttribute("readonly"),
                    a.removeAttribute("readonly"),
                    t = !0
                }
                ,
                a.onclick = function() {
                    i.removeAttribute("readonly"),
                    a.removeAttribute("readonly"),
                    t = !0
                }
                ,
                i.onkeypress = function(n) {
                    if ((document.getElementById("errorControlJS").style.visibility = "hidden",
                    "Enter" === n.key) && (i.blur(),
                    i.setAttribute("readonly", "true"),
                    a.setAttribute("readonly", "true"),
                    t = !1,
                    o.isValid()))
                        if ("EPSG:31370" === document.getElementById("projectionSelector").value) {
                            var r = transformProjectionFrom72To2008(parseInt(i.value), parseInt(a.value));
                            e.map.getView().setCenter([r[0], r[1]])
                        } else
                            e.map.getView().setCenter([parseInt(i.value), parseInt(a.value)])
                }
                ,
                a.onkeypress = function(n) {
                    if ((document.getElementById("errorControlJS").style.visibility = "hidden",
                    "Enter" === n.key) && (i.blur(),
                    i.setAttribute("readonly", "true"),
                    a.setAttribute("readonly", "true"),
                    t = !1,
                    o.isValid()))
                        if ("EPSG:31370" === document.getElementById("projectionSelector").value) {
                            var r = transformProjectionFrom72To2008(parseInt(i.value), parseInt(a.value));
                            e.map.getView().setCenter([r[0], r[1]])
                        } else
                            e.map.getView().setCenter([parseInt(i.value), parseInt(a.value)])
                }
                ,
                i.onkeyup = function(e) {
                    o.isValid() ? (document.getElementById("errorControlJS").style.visibility = "hidden",
                    i.style.color = "black",
                    a.style.color = "black") : (document.getElementById("errorControlJS").style.visibility = "visible",
                    i.style.color = "red",
                    a.style.color = "red")
                }
                ,
                a.onkeyup = function(e) {
                    o.isValid() ? (document.getElementById("errorControlJS").style.visibility = "hidden",
                    i.style.color = "black",
                    a.style.color = "black") : (document.getElementById("errorControlJS").style.visibility = "visible",
                    i.style.color = "red",
                    a.style.color = "red")
                }
                ;
                var o = this;
                e.map.on("pointermove", function(e) {
                    if (!1 === t) {
                        var n = [e.coordinate[0], e.coordinate[1]];
                        n = o.getCoordinatesForSelectedProjection(n),
                        i.style.color = "black",
                        a.style.color = "black",
                        i.value = "" + Math.trunc(n[0]),
                        a.value = "" + Math.trunc(n[1])
                    }
                })
            }
            ,
            e.prototype.getCoordinatesForSelectedProjection = function(e) {
                return "EPSG:31370" == document.getElementById("projectionSelector").value ? transformProjectionFrom2008To72(e[0], e[1]) : e
            }
            ,
            e.prototype.isValid = function() {
                var e = document.getElementById("coordinatesX")
                  , t = document.getElementById("coordinatesY")
                  , n = parseInt(e.value)
                  , i = parseInt(t.value);
                return Number.isInteger(n) && Number.isInteger(i) && this.isInProjection(n, i)
            }
            ,
            e.prototype.isInProjection = function(e, t) {
                return "EPSG:31370" === document.getElementById("projectionSelector").value ? e < 291015.29 && t < 246424.28 && e > 14637.25 && t > 22608.21 : e < 795171.9135000035 && t < 744030.4598999992 && e > 521989.4444999993 && t > 521165.125599999
            }
            ,
            e
        }()
          , Me = n("MJuv")
          , Fe = function() {
            function e() {
                this.source = new xe.a({
                    wrapX: !1
                }),
                this.drawStyle = new q.d({
                    fill: new q.b({
                        color: "rgba(135,206,250, 0.5)"
                    }),
                    stroke: new q.c({
                        color: "#3284ff",
                        lineDash: [10, 10],
                        width: 2
                    }),
                    image: new q.a({
                        radius: 5,
                        stroke: new q.c({
                            color: "#3284ff"
                        }),
                        fill: new q.b({
                            color: "#3284ff"
                        })
                    })
                })
            }
            return e.prototype.getTextStyle = function(e, t, n) {
                var i = new q.e({
                    text: e,
                    font: t,
                    scale: 1.3,
                    fill: new q.b({
                        color: n
                    })
                });
                return new q.d({
                    text: i
                })
            }
            ,
            e.prototype.getVectorLayerForDrawTool = function() {
                return this.vector = new z.c({
                    zIndex: 1e3,
                    source: this.source,
                    name: "drawLayer",
                    style: new q.d({
                        fill: new q.b({
                            color: "rgba(135,206,250, 0.5)"
                        }),
                        stroke: new q.c({
                            color: "#3284ff",
                            width: 2
                        }),
                        image: new q.a({
                            radius: 7,
                            fill: new q.b({
                                color: "#3284ff"
                            })
                        })
                    })
                }),
                this.vector.set("category", "DRAWING_LAYER"),
                this.vector
            }
            ,
            e.prototype.getDrawInteraction = function() {
                var e;
                return "None" !== (e = "Text" === this.type ? "Point" : this.type) && (this.draw = new _e.a({
                    condition: function(e) {
                        return Me.l(e) || Me.g(e)
                    },
                    source: this.source,
                    type: e,
                    style: new q.d({
                        fill: new q.b({
                            color: "rgba(135,206,250, 0.5)"
                        }),
                        stroke: new q.c({
                            color: "#3284ff",
                            lineDash: [10, 10],
                            width: 2
                        }),
                        image: new q.a({
                            radius: 5,
                            stroke: new q.c({
                                color: "#3284ff"
                            }),
                            fill: new q.b({
                                color: "#3284ff"
                            })
                        })
                    })
                })),
                this.draw
            }
            ,
            e.prototype.setType = function(e) {
                this.type = e
            }
            ,
            e
        }()
          , Ve = n("nq2H")
          , De = n("T18w")
          , je = function() {
            function e() {}
            return e.prototype.getFeatureForDisplayPoint = function(e) {
                var t = e[0]
                  , n = e[1]
                  , i = new q.d({
                    image: new q.a({
                        radius: 5,
                        fill: new q.b({
                            color: "rgba(0,0,255,0.9)"
                        }),
                        stroke: new q.c({
                            color: "rgba(0,0,255,0.9)",
                            width: 3
                        })
                    })
                });
                this.geometryPoint = new De.a([t, n]),
                this.pointFeature = new Ve.a({
                    geometry: this.geometryPoint
                }),
                this.vector = new xe.a({
                    projection: v.BELGIAN_PROJECTION
                }),
                this.pointFeature.setStyle(i),
                this.vector.addFeature(this.pointFeature)
            }
            ,
            e.prototype.getVectorLayerForDisplayPoint = function() {
                return this.vectorLayer = new z.c({
                    zIndex: 1e3,
                    source: this.vector
                }),
                this.vectorLayer.set("category", "FEATURES_RESULTS"),
                this.vectorLayer
            }
            ,
            e
        }();
        class Ge extends _.a {
            constructor(e={}) {
                const t = Ge.render
                  , n = e.target
                  , i = Ge.createElement("div", "ol-zoomin-button");
                i.className = "ol-zoomin-button ol-unselectable ol-control",
                i.id = "zoomIn",
                super({
                    element: i,
                    render: t,
                    target: n
                });
                let a = this
                  , o = document.createElement("button");
                o.className = "btn greyTransparent ol-zoomin",
                o.title = "Zoom In",
                o.innerHTML = "+",
                o.addEventListener("click", function() {
                    a.getMap().getView().setZoom(a.getMap().getView().getZoom() + 1);
                    let e = a.getMap().getView().getZoom();
                    a.getMap().getControls().forEach(function(t) {
                        if (t instanceof _.c) {
                            let a = t.getOverviewMap().getView();
                            for (var n = [1e6, 5e5, 25e4, 1e5, 5e4, 25e3, 1e4, 5e3, 2500, 1e3, 500, 250, 100, 50], i = 0; i < n.length; i++)
                                n[e] === n[i] && n[i] < 250 ? a.setZoom(9) : n[e] === n[i] && n[i] >= 25e4 ? a.setZoom(0) : n[e] === n[i] && n[i] >= 250 && n[i] < 25e4 && a.setZoom(i - 2)
                        }
                    })
                }, !1),
                i.appendChild(o)
            }
            static render(e) {
                const t = e.frameState;
                this.viewState_ = null == t ? null : t.viewState
            }
            static createElement(e, t) {
                const n = document.createElement(e);
                return t && n.classList.add.apply(n.classList, "string" == typeof t ? t.split(" ") : t),
                n
            }
            getResolutionForScale(e) {
                return parseFloat(e) / (25.4 / .28 * 39.37)
            }
        }
        class Be extends _.a {
            constructor(e={}) {
                const t = Be.render
                  , n = e.target
                  , i = Be.createElement("div", "ol-zoomout-button");
                i.className = "ol-zoomout-button ol-unselectable ol-control",
                i.id = "zoomOut",
                super({
                    element: i,
                    render: t,
                    target: n
                });
                let a = this
                  , o = document.createElement("button");
                o.className = " btn greyTransparent ol-zoomout",
                o.title = "Zoom Out",
                o.innerHTML = "-",
                o.addEventListener("click", function() {
                    a.getMap().getView().setZoom(a.getMap().getView().getZoom() - 1);
                    let e = a.getMap().getView().getZoom();
                    a.getMap().getControls().forEach(function(t) {
                        if (t instanceof _.c) {
                            let a = t.getOverviewMap().getView();
                            for (var n = [1e6, 5e5, 25e4, 1e5, 5e4, 25e3, 1e4, 5e3, 2500, 1e3, 500, 250, 100, 50], i = 0; i < n.length; i++)
                                n[e] === n[i] && n[i] < 250 ? a.setZoom(9) : n[e] === n[i] && n[i] >= 25e4 ? a.setZoom(0) : n[e] === n[i] && n[i] >= 250 && n[i] < 25e4 && a.setZoom(i - 2)
                        }
                    })
                }, !1),
                i.appendChild(o)
            }
            static render(e) {
                const t = e.frameState;
                this.viewState_ = null == t ? null : t.viewState
            }
            static createElement(e, t) {
                const n = document.createElement(e);
                return t && n.classList.add.apply(n.classList, "string" == typeof t ? t.split(" ") : t),
                n
            }
            getResolutionForScale(e) {
                return parseFloat(e) / (25.4 / .28 * 39.37)
            }
        }
        var Ue, ze = n("flWm"), Ke = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Ye = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Ze = function() {
            function e(e) {
                this.http = e
            }
            return e.prototype.getVersion = function() {
                return this.http.get(C.UTILS + "/version", {
                    responseType: "text"
                })
            }
            ,
            e = Ke([Object(i.Injectable)(), Ye("design:paramtypes", [S.a])], e)
        }(), We = n("kzcK"), He = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Xe = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Je = function() {
            function e(e) {
                this.activeModal = e,
                this.textSizes = ["4px", "6px", "8px", "10px", "12px", "14px", "16px", "18px"]
            }
            return e.prototype.ngOnInit = function() {
                var e = this.appState.get("textData");
                this.weight = e.get("weight").value,
                this.drawText = e.get("drawText").value,
                this.font = e.get("font").value,
                this.size = e.get("size").value,
                this.color = e.get("color").value
            }
            ,
            e.prototype.setTextValues = function() {
                var e = this.appState.get("textData");
                e.get("drawText").setValue(this.drawText),
                e.get("font").setValue(this.font),
                e.get("size").setValue(this.size),
                e.get("color").setValue(this.color),
                e.get("weight").setValue(this.weight)
            }
            ,
            e.prototype.saveCloseModal = function() {
                this.setTextValues();
                var e = this.appState.get("textData")
                  , t = e.get("weight").value + " " + e.get("size").value + " " + e.get("font").value
                  , n = e.get("color").value
                  , i = e.get("drawText").value;
                this.feature.setStyle(this.drawTools.getTextStyle(i, t, n)),
                this.activeModal.close()
            }
            ,
            e.prototype.closeModal = function() {
                this.activeModal.close()
            }
            ,
            e = He([Object(i.Component)({
                selector: "app-text-style-menu",
                template: n("ylO1"),
                styles: [n("Hwq4")]
            }), Xe("design:paramtypes", [We.a])], e)
        }(), qe = n("TDso"), Qe = n("sijn"), $e = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , et = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , tt = function() {
            function e(e) {
                var t = this;
                this.http = e,
                this.http.get(C.CCFF + "/ESB_CREDENTIALS").toPromise().then(function(e) {
                    t.esbCredentials = e
                }, function(e) {})
            }
            return e.prototype.getAuthentificationHeaders = function() {
                return (new S.c).append("Authorization", "Basic " + btoa(this.esbCredentials.user + ":" + this.esbCredentials.password))
            }
            ,
            e.prototype.getCoordinatesFromCapakey = function(e) {
                return this.http.post(C.CAPAKEY, e)
            }
            ,
            e.prototype.getCoordinatesFromFiscalCapakey = function(e) {
                return this.http.post(C.FISCAL_CAPAKEY, e)
            }
            ,
            e.prototype.getCoordinatesFromObjectID = function(e, t) {
                return this.http.post(C.OBJECTID, {
                    objectID: e,
                    wfs: t
                })
            }
            ,
            e.prototype.getResultFromStreetSearch = function(e) {
                return this.http.get(C.ECAD_STREET_SEARCH_SERVICE_LOCATION + "?address=" + e)
            }
            ,
            e.prototype.getLargerResultFromStreetSearch = function(e) {
                return this.http.get(C.ECAD_STREET_SEARCH_ALL_SERVICE_LOCATION + "?address=" + e)
            }
            ,
            e.prototype.getSuggestionForAdress = function(e) {
                return this.http.get(C.ECAD_STREET_SEARCH_ALL_SUGGESTION + "?address=" + e)
            }
            ,
            e.prototype.getCapakeysForPattern = function(e) {
                var t = (new S.d).set("pattern", e);
                return this.http.get(C.CAPAKEY, {
                    params: t
                })
            }
            ,
            e.prototype.getFiscalCapakeyForPattern = function(e) {
                var t = (new S.d).set("pattern", e);
                return this.http.get(C.CAPAKEY + "/fiscal", {
                    params: t
                })
            }
            ,
            e.prototype.getDivisionForID = function(e) {
                var t = (new S.d).set("pattern", e);
                return this.http.get(C.DIVISION, {
                    params: t
                })
            }
            ,
            e.prototype.getDivisionForName = function(e) {
                var t = (new S.d).set("pattern", e);
                return this.http.get(C.DIVISION_NAME, {
                    params: t
                })
            }
            ,
            e.prototype.getDivisionFromCoordinates = function(e, t) {
                return this.http.post(C.DIVISION_COORDINATES, {
                    x: e,
                    y: t
                }, {
                    responseType: "text"
                })
            }
            ,
            e.prototype.getCenterOfParcels = function(e) {
                return this.http.post(C.ECAD_STREET_CENTER_PARCEL_SERVICE, e)
            }
            ,
            e.prototype.getTenantsFromCapakeys = function(e, t) {
                return "CURRENT" === t ? this.http.get(C.ECAD_ARCGIS_CAPAKEYS_SERVICE_CURRENT + e + "?type=ATTACH") : "FISCAL" === t ? this.http.get(C.ECAD_ARCGIS_CAPAKEYS_SERVICE_FISCAL + e + "?type=ATTACH") : void 0
            }
            ,
            e.prototype.getRoundFromCapakey = function(e, t, n) {
                return "CURRENT" === n ? this.http.get(C.ECAD_ARCGIS_CAPAKEYS_SERVICE_CURRENT + e + "?type=ROUND&roundSize=" + t) : "FISCAL" === n ? this.http.get(C.ECAD_ARCGIS_CAPAKEYS_SERVICE_FISCAL + e + "?type=ROUND&roundSize=" + t) : void 0
            }
            ,
            e.prototype.getBufferAndRound4Parcels = function(e, t, n) {
                return "CURRENT" === n ? this.http.get(C.ECAD_ARCGIS_CAPAKEYS_SERVICE_CURRENT + e + "?type=BUFFERROUND&roundSize=" + t) : "FISCAL" === n ? this.http.get(C.ECAD_ARCGIS_CAPAKEYS_SERVICE_FISCAL + e + "?type=BUFFERROUND&roundSize=" + t) : void 0
            }
            ,
            e.prototype.getBufferAndRound4Point = function(e, t, n, i) {
                return "CURRENT" === n ? this.http.get(C.getPointCurrentSituation(i) + e + "?type=BUFFERROUND&roundSize=" + t) : "FISCAL" === n ? this.http.get(C.getPointLastSituation(i) + e + "?type=BUFFERROUND&roundSize=" + t) : void 0
            }
            ,
            e.prototype.getConsultimmoSearchUrl = function() {
                return this.http.get(C.GET_CONSULTIMMO_POW_URL, {
                    responseType: "text"
                })
            }
            ,
            e = $e([Object(i.Injectable)(), et("design:paramtypes", [S.a])], e)
        }(), nt = function() {
            function e(e) {
                this.configService = e,
                this.source = new xe.a({
                    wrapX: !1
                })
            }
            return e.prototype.getVectorLayerForFeaturesResults = function() {
                return this.vectorLayer = new z.c({
                    zIndex: 1e3,
                    source: this.source,
                    style: new q.d({
                        stroke: new q.c({
                            color: this.configService.getConfig().primaryColor || "#1b2ff5",
                            width: 4,
                            fill: new q.b({
                                color: this.configService.getConfig().primaryColor || "#1b2ff5"
                            })
                        }),
                        image: new q.a({
                            radius: 4,
                            fill: new q.b({
                                color: this.configService.getConfig().primaryColor || "#1b2ff5"
                            }),
                            stroke: new q.c({
                                color: this.configService.getConfig().primaryColor || "#1b2ff5",
                                width: 4
                            })
                        })
                    })
                }),
                this.vectorLayer.set("category", "FEATURES_RESULTS"),
                this.vectorLayer
            }
            ,
            e
        }(), it = n("SALZ"), at = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , ot = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , rt = function() {
            function e(e, t, n, i, a, o, r, s, l, c, p) {
                this.viewRepository = e,
                this.configService = t,
                this.setupService = n,
                this.deviceService = i,
                this.notificationService = a,
                this.utilsService = o,
                this.modalService = r,
                this.sanitizer = s,
                this.labelService = l,
                this.cmsService = c,
                this.localisationService = p,
                this.overlays = new Map,
                this.capakeys = null,
                this.capakeysA = null,
                this.capakeysB = null,
                this.mesureTools = new Ne(this.configService,this.notificationService),
                this.userLayers = new Map,
                this.featuresList = [],
                this.featuresSelected = [],
                this.idParcel = "",
                this.setupService.loadAllBackdrop()
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.appState.get("mapLoading").setValue(!0);
                this.zIndex = this.appState.get("zIndex"),
                this.cmsService.getCmsContentByKey("copyrightCartoweb").subscribe(function(t) {
                    e.copyright = t
                }),
                this.deviceService.isMobile() || this.deviceService.isTablet() ? this.resolutions = this.configService.getConfig().mobileZoomLevels : this.resolutions = this.configService.getConfig().zoomLevels,
                y.b(v.BELGIAN_PROJECTION),
                this.map = new h.a({
                    keyboardEventTarget: document,
                    target: "map",
                    layers: [],
                    overlays: [],
                    controls: []
                }),
                setTimeout(function() {
                    e.ngAfterMapInit(),
                    e.map.updateSize()
                }, 3500),
                this.addOverlays()
            }
            ,
            e.prototype.ngAfterMapInit = function() {
                var e = this;
                this.setupService.loadAllLayer(),
                this.setupService.loadAllInspire(),
                this.setupService.loadAllHistoric(),
                this.setupService.loadAllUserLayers(),
                this.addControls(),
                this.appState.get("layers").setValue(this.setupService.layers),
                this.appState.get("userLayers").setValue(this.setupService.userLayers),
                this.appState.get("backdrops").setValue(this.setupService.backdrops),
                this.appState.get("inspire").setValue(this.setupService.inspire),
                this.appState.get("historic").setValue(this.setupService.historic),
                this.appState.get("translations").setValue(this.setupService.translations),
                this.appState.get("mapping").setValue(this.setupService.mappingTable),
                this.setupService.backdrops.forEach(function(t) {
                    t.layer.set("category", "BACKDROP"),
                    e.map.addLayer(t.layer)
                });
                var t = new Map
                  , n = [];
                if (this.setupService.layers.forEach(function(i) {
                    i.get("layers").forEach(function(i) {
                        i.layer.set("permissions", i.permissions),
                        i.layer.set("features", i.features),
                        i.layer.set("tableName", i.tableName),
                        i.layer.set("maxScale", i.maxScale),
                        i.layer.set("minScale", i.minScale),
                        i.layer.set("situation", i.situation),
                        i.layer.set("searchLimit", i.searchLimit),
                        i.layer.setZIndex(e.zIndex.get("layers").value),
                        "VECTOR" === i.layer.type ? i.layer.set("category", "VECTOR") : i.layer.set("category", "LAYERS"),
                        t.set(i.tableName, i),
                        n.push(i.layer)
                    }),
                    i.get("subGroup").forEach(function(i) {
                        i.forEach(function(i) {
                            i.layer.set("permissions", i.permissions),
                            i.layer.set("features", i.features),
                            i.layer.set("tableName", i.tableName),
                            i.layer.set("maxScale", i.maxScale),
                            i.layer.set("minScale", i.minScale),
                            i.layer.set("situation", i.situation),
                            i.layer.set("searchLimit", i.searchLimit),
                            i.layer.setZIndex(e.zIndex.get("layers").value),
                            i.layer.set("category", "LAYERS"),
                            t.set(i.tableName, i),
                            n.push(i.layer)
                        })
                    })
                }),
                n.reverse().forEach(function(t) {
                    e.map.addLayer(t)
                }),
                this.setupService.inspire.forEach(function(t) {
                    t.get("layers").forEach(function(t) {
                        t.layer.set("category", "INSPIRE"),
                        t.layer.setZIndex(e.zIndex.get("inspire").value),
                        e.map.addLayer(t.layer)
                    }),
                    t.get("subGroup").forEach(function(t) {
                        t.forEach(function(t) {
                            t.layer.set("category", "INSPIRE"),
                            t.layer.setZIndex(e.zIndex.get("inspire").value),
                            e.map.addLayer(t.layer)
                        })
                    })
                }),
                this.setupService.historic.forEach(function(t) {
                    t.layer.setZIndex(e.zIndex.get("historic").value),
                    e.map.addLayer(t.layer)
                }),
                this.utilsService.getVersion().subscribe(function(t) {
                    e.projectVersion = t
                }),
                this.map.setView(this.setupService.getCurrentViewForActiveBackdrop()),
                this.appState.get("layerList").setValue(t),
                this.addMeasureInteractions(),
                this.addDrawInteractions(),
                this.addFeaturesResultsInteractions(),
                this.appState.get("userLayer").valueChanges.subscribe(function(t) {
                    var n = e.appState.get("sections").value.has("userGr") ? 100 * e.appState.get("sections").value.get("userGr") : 0;
                    t.forEach(function(t) {
                        t.get("layers").forEach(function(i) {
                            if (e.userLayers.has(i.name)) {
                                var a = e.userLayers.get(i.name);
                                a.setOpacity(i.opacity),
                                a.setZIndex(n),
                                a.getSource().changed(),
                                t.get("header").active && i.active ? a.setVisible(!0) : a.setVisible(!1)
                            } else
                                e.userLayers.set(i.name, i.layer),
                                i.opacity = i.layer.getOpacity(),
                                i.layer.set("name", i.name),
                                i.layer.set("category", "USERLAYER"),
                                i.layer.setZIndex(n),
                                i.layer.getSource().changed(),
                                e.map.addLayer(i.layer)
                        }),
                        t.get("groups").forEach(function(i) {
                            i.get("layers").forEach(function(i) {
                                if (e.userLayers.has(i.name)) {
                                    var a = e.userLayers.get(i.name);
                                    a.setOpacity(i.opacity),
                                    a.setZIndex(n),
                                    a.getSource().changed(),
                                    t.get("header").active && i.active ? a.setVisible(!0) : a.setVisible(!1)
                                } else
                                    e.userLayers.set(i.name, i.layer),
                                    i.opacity = i.layer.getOpacity(),
                                    i.layer.set("name", i.name),
                                    i.layer.set("category", "USERLAYER"),
                                    i.layer.setZIndex(n),
                                    i.layer.getSource().changed(),
                                    e.map.addLayer(i.layer)
                            }),
                            i.get("groups").forEach(function(i) {
                                i.forEach(function(i) {
                                    if (e.userLayers.has(i.name)) {
                                        var a = e.userLayers.get(i.name);
                                        a.setOpacity(i.opacity),
                                        a.setZIndex(n),
                                        a.getSource().changed(),
                                        t.get("header").active && i.active ? a.setVisible(!0) : a.setVisible(!1)
                                    } else
                                        e.userLayers.set(i.name, i.layer),
                                        i.opacity = i.layer.getOpacity(),
                                        i.layer.setVisible(!0),
                                        i.layer.setZIndex(n),
                                        i.layer.getSource().changed(),
                                        i.layer.set("name", i.name),
                                        i.layer.set("category", "USERLAYER"),
                                        e.map.addLayer(i.layer)
                                })
                            })
                        }),
                        n--
                    })
                }),
                this.map.on("moveend", function() {
                    e.appState.get("currentZoom").setValue(Math.round(e.map.getView().getResolution() * (25.4 / .28 * 39.37)))
                }),
                !0 !== this.appState.get("cadex").get("active").value && !0 !== this.appState.get("precad").get("active").value && !0 !== this.appState.get("cdms").get("active").value || this.reloadLayers(),
                this.appState.get("currentSituation").valueChanges.subscribe(function(t) {
                    e.reloadLayers()
                }),
                !1 === this.appState.get("cadex").get("active").value && null !== this.configService.MMFCapakey) {
                    var i = this.configService.MMFCapakey.replaceAll(";", ",").split(",");
                    if (1 == i.length) {
                        var a = i[0];
                        this.localisationService.getCoordinatesFromCapakey(a).subscribe(function(t) {
                            e.localisationService.getCenterOfParcels(t).subscribe(function(t) {
                                e.appState.get("searchResultCapakey").setValue({
                                    coord: [Number(t.labelPoints[0].x), Number(t.labelPoints[0].y)],
                                    capakey: a
                                })
                            })
                        })
                    } else
                        this.goToMultipleCapakey(i)
                }
                this.appState.get("mapLoading").setValue(!1)
            }
            ,
            e.prototype.goToMultipleCapakey = function(e) {
                var t, n = this, i = [];
                if (null !== e) {
                    var a = [];
                    e.forEach(function(e) {
                        a.push(n.localisationService.getCoordinatesFromCapakey(e))
                    }),
                    Object(it.a)(a).subscribe(function(a) {
                        a.forEach(function(o, r) {
                            var s = [];
                            s.push(n.localisationService.getCenterOfParcels(o)),
                            Object(it.a)(s).subscribe(function(o) {
                                t = [].concat(o),
                                i.push(t),
                                r === a.length - 1 && n.appState.get("searchResultCapakey").setValue({
                                    coord: [Number(t[0].labelPoints[0].x), Number(t[0].labelPoints[0].y)],
                                    capakeys: e,
                                    capakeysCoords: i
                                })
                            })
                        })
                    })
                }
            }
            ,
            e.prototype.reloadLayers = function() {
                this.appState.get("layers").value.forEach(function(e) {
                    e.get("layers").forEach(function(e) {
                        var t = e.layer.getSource();
                        e.fiscalLayer.getSource();
                        e.layer.setSource(e.fiscalLayer.getSource()),
                        e.fiscalLayer.setSource(t),
                        e.layer.getSource().refresh()
                    }),
                    e.get("subGroup").forEach(function(e) {
                        e.forEach(function(e) {
                            var t = e.layer.getSource();
                            e.fiscalLayer.getSource();
                            e.layer.setSource(e.fiscalLayer.getSource()),
                            e.fiscalLayer.setSource(t),
                            e.layer.getSource().refresh()
                        })
                    })
                }),
                this.select.getFeatures().clear(),
                document.getElementById("popup-closer").click()
            }
            ,
            e.prototype.displayFeatureInfoClick = function(e) {
                var t = [];
                this.map.forEachFeatureAtPixel(e, function(e) {
                    console.log(e),
                    t.push(e),
                    e.get("layer")
                })
            }
            ,
            e.prototype.getMapClass = function() {
                return this.configService.getConfig() && this.configService.getConfig().menus.topbar.visibility ? "map" : "map-fullscreen"
            }
            ,
            e.prototype.showServiceMessage = function() {
                return this.configService.getConfig().showServiceMessage
            }
            ,
            e.prototype.addFeaturePointfromSearch = function(e) {
                var t = new je;
                t.getFeatureForDisplayPoint(e),
                this.removeFeaturePoint(),
                this.pointVectorLayer = t.getVectorLayerForDisplayPoint(),
                this.map.addLayer(this.pointVectorLayer)
            }
            ,
            e.prototype.removeFeaturePoint = function() {
                this.pointVectorLayer && this.map.removeLayer(this.pointVectorLayer)
            }
            ,
            e.prototype.addMeasureInteractions = function() {
                var e, t = this, n = t.mesureTools.getVectorLayerForMesureTool();
                t.appState.get("interactions").get("mesuring").get("layer").setValue(n),
                t.map.addLayer(n),
                this.appState.get("measureToolChoice").valueChanges.subscribe(function(n) {
                    t.map.removeInteraction(e),
                    "None" !== n && function(n, i) {
                        t.mesureTools.setType(n),
                        t.mesureTools.setTool(i),
                        "Circle" === t.appState.get("drawToolChoice").value && "LineString" === n ? t.mesureTools.setMaxPoints(2) : t.mesureTools.setMaxPoints(null);
                        var a = t.mesureTools.createMeasureTooltip();
                        t.map.addOverlay(a),
                        t.appState.get("interactions").get("mesuring").get("overlay").setValue(a),
                        e = t.mesureTools.getDraw(),
                        t.map.addInteraction(e),
                        t.appState.get("interactions").get("mesuring").get("interaction").setValue(e),
                        t.mesureTools.addInteractions(t)
                    }(n, t.appState.get("chosenTools").value),
                    "None" === n && "None" === t.appState.get("drawToolChoice").value && (t.mesureTools.source.clear(),
                    t.map.getOverlays().clear(),
                    t.map.addOverlay(t.overlays.get("popup")))
                }),
                this.appState.get("polygon4Extraction").valueChanges.filter(function(e) {
                    return void 0 !== e
                }).subscribe(function(e) {
                    e && t.appState.get("geometry4Extraction").setValue(t.mesureTools.getgeometry())
                })
            }
            ,
            e.prototype.addDrawInteractions = function() {
                var e, t, n = this, i = new Fe, a = i.getVectorLayerForDrawTool();
                n.appState.get("interactions").get("drawing").get("layer").setValue(a),
                n.map.addLayer(a);
                var o = function() {
                    if (t)
                        for (var e = i.source, n = e.getFeatures(), a = !1, o = 0; o < n.length && !a; o++)
                            n[o].getId() === t.getId() && (a = !0,
                            e.removeFeature(t))
                };
                this.appState.get("drawToolChoice").valueChanges.subscribe(function(a) {
                    "structuredSearch" === n.appState.get("structuredSearchChoice").value && "spatial" === n.appState.get("spatialSearchOption").value && "None" !== n.appState.get("drawToolChoice").value && (i.source.clear(),
                    n.mesureTools.source.clear(),
                    n.map.removeInteraction(e),
                    n.map.getOverlays().clear(),
                    n.select.getFeatures().clear()),
                    n.map.removeInteraction(e),
                    "None" !== a ? function(a) {
                        if (i.setType(a),
                        e && n.map.removeInteraction(e),
                        (e = i.getDrawInteraction()).on("drawend", function(e) {
                            var t = e.feature;
                            if ("Text" === a) {
                                var o = n.modalService.open(Je, {
                                    backdrop: "static",
                                    keyboard: !1
                                });
                                o.componentInstance.appState = n.appState,
                                o.componentInstance.drawTools = i,
                                o.componentInstance.feature = t
                            }
                        }),
                        ("round" === n.appState.get("spatialAnalysisType").value && "roundPointClic" === n.appState.get("spatialAnalysisRoundOption").value && !0 === n.appState.get("isTableNameChosen").value || "structuredSearch" === n.appState.get("structuredSearchChoice").value && "spatial" === n.appState.get("spatialSearchOption").value) && "None" !== n.appState.get("drawToolChoice").value) {
                            var r = [];
                            "Point" === a ? (i.source.clear(),
                            n.select.getFeatures().clear(),
                            n.appState.get("spatialSearchPointNewRequest").setValue(!1),
                            e.on("drawend", function(e) {
                                "spatial" === n.appState.get("spatialSearchOption").value && "Point" === n.appState.get("drawToolChoice").value || (n.appState.get("spatialSearchPointNewRequest").setValue(!0),
                                o()),
                                t = e.feature,
                                r.push(e.coordinate)
                            })) : (e.on("drawend", function(e) {
                                t = e.feature;
                                var i = new Qe.io.OL3Parser;
                                i.inject(ke.e, ke.a, ze.a, ke.f, ke.c, ke.b, ke.d),
                                n.appState.get("featuresFromSpatialSelection").setValue([]),
                                n.appState.get("coordinatesFromSpatialSelection").setValue([]);
                                var a = i.read(t.getGeometry());
                                n.map.getLayers().forEach(function(t) {
                                    if (void 0 == t.get("tableName") || t.get("tableName") !== n.appState.get("searchResultTable").value || "VECTOR" !== t.type)
                                        ;
                                    else {
                                        for (var o = t.getSource().getFeatures(), s = [], l = 0; l < o.length; l++) {
                                            var c = o[l];
                                            i.read(c.getGeometry()).intersects(a) && (s.push(c),
                                            r.push(e.coordinate))
                                        }
                                        0 !== s.length && n.appState.get("featuresFromSpatialSelection").setValue(s)
                                    }
                                })
                            }),
                            e.on("drawstart", function(e) {
                                i.source.clear(),
                                n.select.getFeatures().clear()
                            }))
                        } else
                            "Circle" === a ? n.appState.get("measureToolChoice").setValue("LineString") : n.appState.get("measureToolChoice").setValue("None");
                        n.appState.get("interactions").get("drawing").get("interaction").setValue(e),
                        n.map.addInteraction(e)
                    }(a) : (i.source.clear(),
                    n.mesureTools.source.clear(),
                    n.map.getOverlays().clear(),
                    n.select.getFeatures().clear(),
                    n.map.addOverlay(n.overlays.get("popup")))
                })
            }
            ,
            e.prototype.addFeaturesResultsInteractions = function() {
                var e = new nt(this.configService).getVectorLayerForFeaturesResults();
                this.appState.get("interactions").get("featuresResults").get("layer").setValue(e),
                this.map.addLayer(e)
            }
            ,
            e.prototype.addControls = function() {
                var e = this
                  , t = new Ce({
                    maxResolution: this.resolutions[0]
                })
                  , n = new Ae
                  , i = new Oe({
                    digits: 0
                },Math.min.apply(Math, this.resolutions),Math.max.apply(Math, this.resolutions))
                  , a = this.createFullScreenControle()
                  , o = (new x.a({
                    coordinateFormat: Re.d(0),
                    projection: v.BELGIAN_PROJECTION,
                    undefinedHTML: "&nbsp;"
                }),
                this.configService.getConfig());
                o.mapControls.fullExtent && (this.map.addControl(t),
                document.getElementById("fullExtentId").addEventListener("click", function(e) {
                    return d.appState.get("autoComplete").setValue(!1)
                }));
                o.mapControls.mapScale && (this.map.addControl(i),
                document.getElementById("scaleId").addEventListener("click", function(e) {
                    return d.appState.get("autoComplete").setValue(!1)
                }));
                var r = o.overviewURL;
                if (o.mapControls.overview)
                    if ("WMTS" === r.type)
                        new j(r.title,r.url,r.layerName,r.minScale,r.maxScale,r.opacity).generateWMTS().then(function(t) {
                            var n = t
                              , i = new b.a({
                                projection: v.BELGIAN_PROJECTION
                            });
                            e.ovMap = new _.c({
                                className: "ol-overviewmap ol-custom-overviewmap",
                                view: i
                            });
                            var a = [];
                            a.push(n),
                            e.ovMap.set("layers", a),
                            e.map.addControl(e.ovMap),
                            document.getElementsByClassName("ol-overviewmap")[0].addEventListener("click", function(e) {
                                return d.appState.get("autoComplete").setValue(!1)
                            })
                        });
                    else if ("WMS" === r.type) {
                        var s = new Z(r.title,r.url,r.layerName,this.setupService.getProjectionFromActiveBackdrop(),r.minScale,r.maxScale,r.opacity).getImageLayer()
                          , l = new b.a({
                            projection: v.BELGIAN_PROJECTION
                        });
                        this.ovMap = new _.c({
                            className: "ol-overviewmap ol-custom-overviewmap",
                            view: l,
                            layers: [s]
                        });
                        var c = [];
                        c.push(s),
                        this.ovMap.set("layers", c),
                        this.map.addControl(this.ovMap),
                        document.getElementsByClassName("ol-overviewmap")[0].addEventListener("click", function(e) {
                            return d.appState.get("autoComplete").setValue(!1)
                        })
                    }
                o.mapControls.myPosition && (this.map.addControl(n),
                document.getElementById("myPositionId").addEventListener("click", function(e) {
                    return d.appState.get("autoComplete").setValue(!1)
                }));
                o.mapControls.fullscreen && (this.map.addControl(a),
                document.getElementsByClassName("ol-full-screen")[0].addEventListener("click", function(e) {
                    return d.appState.get("autoComplete").setValue(!1)
                }));
                o.mapControls.coordinates && ((new Pe).generateCoordinatesControl(this),
                document.getElementById("mouseCoordinatesId").addEventListener("click", function(e) {
                    return d.appState.get("autoComplete").setValue(!1)
                }));
                var p = new Ge
                  , u = new Be
                  , d = this;
                if (o.mapControls.zoomButton) {
                    this.map.addControl(p),
                    this.map.addControl(u);
                    var g = document.getElementById("zoomIn")
                      , h = document.getElementById("zoomOut");
                    g.addEventListener("click", function(e) {
                        d.appState.get("autoComplete").setValue(!1)
                    }),
                    h.addEventListener("click", function(e) {
                        d.appState.get("autoComplete").setValue(!1)
                    })
                }
            }
            ,
            e.prototype.setAutoComplete = function() {
                this.appState.get("autoComplete").setValue(!1)
            }
            ,
            e.prototype.sanitizeStyle = function(e) {
                return this.sanitizer.bypassSecurityTrustHtml(this.replaceLink(e))
            }
            ,
            e.prototype.replaceLink = function(e) {
                if (void 0 !== e) {
                    var t = new RegExp(/\[\[key="/,"g")
                      , n = new RegExp(/,label="/,"g");
                    e = (e = (e = e.replace(t, '<a href="/ecad-web/#/help/')).replace(n, ">")).replace(/"\]\]/g, "</a>")
                }
                return e
            }
            ,
            e.prototype.getLang = function() {
                return this.labelService.lang.value.toLowerCase()
            }
            ,
            e.prototype.createFullScreenControle = function() {
                var e = document.createElement("i");
                e.setAttribute("class", "icon-fin-pict-fullscreen pointer");
                var t = document.createElement("i");
                return t.setAttribute("class", "svg-icon fullscreen-active-icon pointer"),
                new _.b({
                    label: e,
                    labelActive: t,
                    tipLabel: "Fullscreen"
                })
            }
            ,
            e.prototype.isCartowebShown = function() {
                var e = !1;
                return !(this.appState.get("currentZoom").value < 2500) && (this.map.getLayers().forEach(function(t) {
                    "BACKDROP" === t.get("category") && t.getVisible() && (e = !0)
                }),
                e)
            }
            ,
            e.prototype.addOverlays = function() {
                var e = document.getElementById("popup-closer")
                  , t = document.getElementById("popup");
                "print" !== this.configService.cadexBundle.action ? this.select = new qe.a({
                    layers: function(e) {
                        return "BPN_CAPA" == e.get("tableName")
                    },
                    style: new q.d({
                        stroke: new q.c({
                            color: this.configService.getConfig().primaryColor || "#1b2ff5",
                            width: 4
                        })
                    }),
                    hitTolerance: 3,
                    multi: !0,
                    wrapX: !1
                }) : this.select = new qe.a({
                    condition: function(e) {
                        return Me.d(e) && Me.a(e)
                    }
                }),
                this.map.addInteraction(this.select),
                this.select.on("select", function(e) {
                    var t, n = this;
                    if (null === i.appState.get("capakeysAtPixel").value && (i.featuresSelected = [],
                    i.capakeysA = null,
                    i.capakeysB = null,
                    i.capakeys = null),
                    i.isCapaWithin) {
                        if (this.listFeatures = e.target.getFeatures(),
                        this.listFeatures.getLength() > 2)
                            this.listFeatures.getArray().forEach(function(e, t) {
                                i.getShape(e).endss_.length > 1 && n.listFeatures.removeAt(t)
                            });
                        else if (2 === this.listFeatures.getLength()) {
                            this.listFeatures.getArray().forEach(function(e, t) {
                                e.id_ != i.idParcel && n.listFeatures.removeAt(t)
                            })
                        }
                    } else if (!i.isCapaWithin && "POPUP" != i.appState.get("chosenTools").value)
                        if (1 === (t = e.selected).length)
                            i.isOneDetect = !0,
                            i.featuresSelected.push(t);
                        else if (t.length > 1) {
                            i.isOneDetect = !1;
                            for (var a = 0; a < t.length; a++)
                                i.getShape(t[a]).endss_.length >= 1 && i.featuresSelected.push(t[a])
                        }
                    var o = null
                      , r = null;
                    i.appState.get("resultOnMap").setValue(null),
                    "POPUP" != i.appState.get("chosenTools").value && (i.isCapaWithin ? this.listFeatures.forEach(function(e) {
                        o = null === o ? e.get("CaPaKey").replace("/", "%2F") : o + "," + e.get("CaPaKey").replace("/", "%2F"),
                        i.capakeysA = o
                    }) : i.featuresSelected.forEach(function(e) {
                        r = null === r ? i.isOneDetect ? e[0].values_.CaPaKey.replace("/", "%2F") : e.values_.CaPaKey.replace("/", "%2F") : i.isOneDetect ? r + "," + e[0].values_.CaPaKey.replace("/", "%2F") : r + "," + e.values_.CaPaKey.replace("/", "%2F"),
                        i.capakeysB = r
                    })),
                    "POPUP" != i.appState.get("chosenTools").value && ("tenants" === i.appState.get("spatialAnalysisType").value && "tenantsClic" === i.appState.get("spatialAnalysisTenantsOption").value && (i.isCapaWithin ? this.listFeatures.getLength() > 5 && i.notificationService.notify("error", "NOTIFICATION.ERROR.TENANTS_TOO_MANY_PARCELS") : i.featuresSelected.length > 5 && i.notificationService.notify("error", "NOTIFICATION.ERROR.TENANTS_TOO_MANY_PARCELS")),
                    "round" === i.appState.get("spatialAnalysisType").value && "roundParcelClic" === i.appState.get("spatialAnalysisRoundOption").value && (i.isCapaWithin ? this.listFeatures.getLength() > 5 && i.notificationService.notify("error", "NOTIFICATION.ERROR.ROUND_TOO_MANY_PARCELS") : i.featuresSelected.length > 5 && i.notificationService.notify("error", "NOTIFICATION.ERROR.ROUND_TOO_MANY_PARCELS")),
                    "capakey" === i.appState.get("spatialAnalysisType").value && (i.isCapaWithin ? this.listFeatures.getLength() > 1e3 && i.notificationService.notify("error", "NOTIFICATION.ERROR.SELECTION.CAPAKEY_TOO_MANY_PARCELS") : i.featuresSelected.length > 1e3 && i.notificationService.notify("error", "NOTIFICATION.ERROR.SELECTION.CAPAKEY_TOO_MANY_PARCELS"))),
                    "POPUP" != i.appState.get("chosenTools").value && (null != i.capakeysA && null === i.capakeysB ? i.appState.get("capakeysAtPixel").setValue(i.capakeysA) : null === i.capakeysA && null != i.capakeysB ? i.appState.get("capakeysAtPixel").setValue(i.capakeysB) : null != i.capakeysA && null != i.capakeysB && (i.capakeys = i.capakeysA + "," + i.capakeysB,
                    i.appState.get("capakeysAtPixel").setValue(i.capakeys)))
                });
                var n = new Te.a({
                    element: t,
                    autoPan: !0
                });
                this.overlays.set("popup", n),
                this.map.addOverlay(n);
                var i = this;
                this.map.on("singleclick", function(t) {
                    if (!t.dragging) {
                        e.onclick;
                        var n, a, o, r = [], s = [], l = [], c = [], p = 0, u = 0, d = 0, g = 0, h = !1, f = i.map.getEventPixel(t.originalEvent);
                        i.selectedPixel = f;
                        var y = [];
                        if ("None" != i.appState.get("spatialAnalysisType").value || "POPUP" === i.appState.get("chosenTools").value) {
                            i.map.getFeaturesAtPixel(f, {
                                layerFilter: function(e) {
                                    return "APN_ADRE" === e.get("tableName")
                                }
                            }, {
                                hitTolerance: 5
                            }),
                            i.map.getFeaturesAtPixel(f, {
                                layerFilter: function(e) {
                                    return "APN_ADPR" === e.get("tableName")
                                }
                            }, {
                                hitTolerance: 5
                            });
                            var m = i.map.getFeaturesAtPixel(f, {
                                layerFilter: function(e) {
                                    return "BPN_CAPA" === e.get("tableName")
                                }
                            }, {
                                hitTolerance: 5
                            })
                        } else
                            var v = i.map.getFeaturesAtPixel(f, {
                                layerFilter: function(e) {
                                    return e.get("tableName") === i.appState.get("searchResultTable").value
                                }
                            }, {
                                hitTolerance: 5
                            });
                        null != v && v.length > 1 ? i.initializeListElements(v) : null != m && m.length > 1 && i.initializeListElements(m),
                        i.map.forEachFeatureAtPixel(f, function(e, h) {
                            null !== h && ("None" != i.appState.get("spatialAnalysisType").value ? (a = t.coordinate,
                            "BPN_CAPA" === h.get("tableName") && (r.push(e),
                            p += 1)) : "POPUP" === i.appState.get("chosenTools").value ? (o = t.coordinate,
                            "APN_ADRE" === h.get("tableName") ? (c.push(e),
                            g += 1) : "APN_ADPR" === h.get("tableName") && (l.push(e),
                            d += 1),
                            "BPN_CAPA" === h.get("tableName") && (s.push(e),
                            u += 1)) : void 0 === h.get("tableName") && "Point" === e.getGeometry().getType() ? n = e.getGeometry().getCoordinates() : h.get("tableName") === i.appState.get("searchResultTable").value && (r.push(e),
                            p += 1))
                        }, {
                            hitTolerance: 10
                        }),
                        "None" != i.appState.get("spatialAnalysisType").value ? p > 1 && void 0 != a ? i.isCapaWithin = i.isPointWithinFeatures(a, r) : 1 === p && void 0 != a && (i.isCapaWithin = !1) : "POPUP" === i.appState.get("chosenTools").value ? (g > 1 && void 0 != o ? i.isRegionWithin = i.isPointWithinFeatures(o, c) : 1 === g && void 0 != o && (i.isRegionWithin = !1),
                        d > 1 && void 0 != o ? i.isProvinceWithin = i.isPointWithinFeatures(o, l) : 1 === d && void 0 != o && (i.isProvinceWithin = !1),
                        u > 1 && void 0 != o ? i.isCapaWithin = i.isPointWithinFeatures(o, s) : 1 === u && void 0 != o && (i.isCapaWithin = !1)) : 0 != p && void 0 != n && (h = i.isPointWithinFeatures(n, r)),
                        i.map.forEachFeatureAtPixel(f, function(e, t) {
                            null !== t && (e.set("layer", t.get("name")),
                            e.set("visible", t.getVisible()),
                            e.set("features", t.get("features")),
                            e.set("tableName", t.get("tableName")),
                            "None" != i.appState.get("spatialAnalysisType").value || ("POPUP" === i.appState.get("chosenTools").value ? "Polygon" === e.getGeometry().getType() || "MultiPolygon" === e.getGeometry().getType() ? "BPN_CAPA" === t.get("tableName") ? 1 === u && i.getShape(e).endss_.length >= 1 ? y.push(e) : u > 1 && !0 === i.isCapaWithin && !0 === i.allDonut && e.id_ === i.idParcel ? y.push(e) : u > 1 && !0 === i.isCapaWithin && !1 === i.allDonut && 1 === i.getShape(e).endss_.length ? y.push(e) : u > 1 && !1 === i.isCapaWithin && i.getShape(e).endss_.length >= 1 && y.push(e) : "APN_ADRE" === t.get("tableName") ? 1 === g && i.getShape(e).endss_.length >= 1 ? y.push(e) : g > 1 && !0 === i.isRegionWithin && 1 === i.getShape(e).endss_.length ? y.push(e) : g > 1 && !1 === i.isRegionWithin && i.getShape(e).endss_.length >= 1 && y.push(e) : "APN_ADPR" === t.get("tableName") ? 1 === d && i.getShape(e).endss_.length >= 1 ? y.push(e) : d > 1 && !0 === i.isProvinceWithin && 1 === i.getShape(e).endss_.length ? y.push(e) : d > 1 && !1 === i.isProvinceWithin && i.getShape(e).endss_.length >= 1 && y.push(e) : y.push(e) : y.push(e) : "Polygon" === e.getGeometry().getType() || "MultiPolygon" === e.getGeometry().getType() ? (console.log(e),
                            1 === p && i.getShape(e).endss_.length >= 1 ? y.push(e) : p > 1 && !0 === h && !1 === i.allDonut && 1 === i.getShape(e).endss_.length ? y.push(e) : p > 1 && !0 === h && !0 === i.allDonut && e.id_ === i.idParcel ? y.push(e) : p > 1 && !1 === h && i.getShape(e).endss_.length >= 1 && y.push(e)) : y.push(e)))
                        }, {
                            hitTolerance: 10
                        }),
                        i.appState.get("spatialAnalysisChoice").valueChanges.subscribe(function(e) {
                            i.select.getFeatures().clear(),
                            i.map.getOverlays().clear(),
                            "None" === e && i.map.addOverlay(i.overlays.get("popup"))
                        }),
                        i.appState.get("spatialSearchPointNewRequest").valueChanges.subscribe(function(e) {
                            i.featuresList = []
                        }),
                        i.featuresList.push(y),
                        i.appState.get("featureAtPixel").setValue(i.featuresList),
                        "tenants" === i.appState.get("spatialAnalysisType").value && "tenantsClic" === i.appState.get("spatialAnalysisTenantsOption").value || "round" === i.appState.get("spatialAnalysisType").value && "roundParcelClic" === i.appState.get("spatialAnalysisRoundOption").value || (i.popupPosition = t.coordinate,
                        i.appState.get("coordinatesAtPixel").setValue(t.coordinate),
                        i.featuresUnderClick = y,
                        i.popup = i.overlays.get("popup"),
                        displayFeatureInfoClick())
                    }
                }),
                e.onclick = function() {
                    return i.select.getFeatures().clear(),
                    n.setPosition(void 0),
                    e.blur(),
                    !1
                }
            }
            ,
            e.prototype.cadexCapakeySelection = function() {
                return this.configService.cadexBundle.active && "capakey" === this.configService.cadexBundle.selectType
            }
            ,
            e.prototype.getShape = function(e) {
                return null !== e.get("SHAPE") && void 0 !== e.get("SHAPE") ? e.get("SHAPE") : null != e.get("Shape") && void 0 != e.get("Shape") ? e.get("Shape") : void 0
            }
            ,
            e.prototype.initializeListElements = function(e) {
                this.allDonut = !1,
                this.idParcel = "";
                for (var t = [], n = 0, i = 0; i < e.length; i++) {
                    var a = this.getShape(e[i]).extent_[2] - this.getShape(e[i]).extent_[0]
                      , o = this.getShape(e[i]).extent_[3] - this.getShape(e[i]).extent_[1];
                    t[i] = a * o,
                    this.getShape(e[i]).endss_.length > 1 && (n += 1)
                }
                for (var r = t[0], s = 0; s < t.length; s++) {
                    var l = t[s];
                    r = l < r ? l : r
                }
                for (var c = 0; c < t.length; c++)
                    t[c] === r && (this.idParcel = e[c].id_);
                e.length === n && (this.allDonut = !0)
            }
            ,
            e.prototype.isPointWithinFeatures = function(e, t) {
                for (var n = !1, i = 0, a = [], o = 0; o < t.length; o++)
                    a[o] = t[o].getGeometry();
                for (var r = this.selectedPixel, s = 0; s < a.length; s++) {
                    var l = a[s].getClosestPoint(e);
                    l = this.map.getPixelFromCoordinate(l);
                    var c = r[0] - l[0]
                      , p = r[1] - l[1];
                    Math.sqrt(c * c + p * p) > 5 && (n = a[s].intersectsCoordinate(e)),
                    n && (i += 1)
                }
                return i >= 1
            }
            ,
            at([Object(i.Input)(), ot("design:type", f.d)], e.prototype, "appState", void 0),
            e = at([Object(i.Component)({
                selector: "app-map-view",
                template: n("cI4+"),
                styles: [n("m6rw")]
            }), ot("design:paramtypes", [k, O, be, R.DeviceDetectorService, p, Ze, We.b, o.DomSanitizer, s.b, se, tt])], e)
        }(), st = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , lt = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , ct = function() {
            function e(e) {
                this.http = e
            }
            return e.prototype.getMyminfinUrl = function() {
                return this.http.get(C.CCFF + "/MYMINFIN_URL", {
                    responseType: "text"
                })
            }
            ,
            e.prototype.getMyminfinProfileUrl = function() {
                return this.http.get(C.CCFF + "/MYMINFIN_PROFILE_URL", {
                    responseType: "text"
                })
            }
            ,
            e = st([Object(i.Injectable)(), lt("design:paramtypes", [S.a])], e)
        }(), pt = n("bfOx"), ut = n("l5y7"), dt = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , gt = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , ht = function() {
            function e(e, t, n, i, a, o, r, s, l) {
                var c = this;
                this.configService = e,
                this.localisationService = t,
                this.modalService = n,
                this.labelService = i,
                this.notificationService = a,
                this.userService = o,
                this.utilsService = r,
                this.ccffService = s,
                this.router = l,
                this.rightPositionInfoPopup = 0,
                this.rightPositionLayer = 0,
                this.rightPositionTools = 0,
                this.rightPositionConfig = 0,
                this.rightPositionSearch = 0,
                this.rightPositionPrint = 0,
                this.pending = !1,
                this.downPositionResultList = 0,
                this.suggestion = [],
                this.suggestionType = "street",
                this.pendingSearch = !1,
                this.showError = !1,
                this.error = "someError",
                this.handleError = function(e) {
                    return 404 === e.status ? (c.showError = !0,
                    c.error = e.message,
                    c.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                    c.pendingSearch = !1,
                    c.appState.get("pendingLoading").setValue(c.pendingSearch),
                    G.a.empty()) : (c.showError = !0,
                    c.error = e.message,
                    G.a.empty())
                }
                ,
                this.config = this.configService.getConfig()
            }
            return t = e,
            e.prototype.ngOnInit = function() {
                var e = this;
                this.innerWidth = window.innerWidth,
                this.appState.get("showMenuLayer").valueChanges.subscribe(function(n) {
                    n && (e.appState.get("search").setValue(""),
                    e.innerWidth > 1e3 ? (e.rightPositionLayer = t.TOOLBAR_SIZE,
                    e.rightPositionConfig = t.TOOLBAR_SIZE,
                    e.rightPositionTools = t.TOOLBAR_SIZE,
                    e.rightPositionPrint = t.TOOLBAR_SIZE,
                    e.rightPositionInfoPopup = t.TOOLBAR_SIZE) : (e.rightPositionLayer = t.TOOLBAR_SIZE_SMALL_SCREEN,
                    e.rightPositionConfig = t.TOOLBAR_SIZE_SMALL_SCREEN,
                    e.rightPositionTools = t.TOOLBAR_SIZE_SMALL_SCREEN,
                    e.rightPositionPrint = t.TOOLBAR_SIZE_SMALL_SCREEN,
                    e.rightPositionInfoPopup = t.TOOLBAR_SIZE_SMALL_SCREEN)),
                    e.checkIfAllMenuAreClosed() && (e.rightPositionLayer = t.ZERO,
                    e.rightPositionConfig = t.ZERO,
                    e.rightPositionTools = t.ZERO,
                    e.rightPositionPrint = t.ZERO,
                    e.rightPositionInfoPopup = t.ZERO)
                }),
                this.appState.get("showMenuTools").valueChanges.subscribe(function(n) {
                    n && (e.appState.get("search").setValue(""),
                    e.innerWidth > 1e3 ? (e.rightPositionLayer = t.TOOLBAR_SIZE,
                    e.rightPositionConfig = t.TOOLBAR_SIZE,
                    e.rightPositionTools = t.TOOLBAR_SIZE,
                    e.rightPositionPrint = t.TOOLBAR_SIZE,
                    e.rightPositionInfoPopup = t.TOOLBAR_SIZE) : (e.rightPositionLayer = t.TOOLBAR_SIZE_SMALL_SCREEN,
                    e.rightPositionConfig = t.TOOLBAR_SIZE_SMALL_SCREEN,
                    e.rightPositionTools = t.TOOLBAR_SIZE_SMALL_SCREEN,
                    e.rightPositionPrint = t.TOOLBAR_SIZE_SMALL_SCREEN,
                    e.rightPositionInfoPopup = t.TOOLBAR_SIZE_SMALL_SCREEN)),
                    e.checkIfAllMenuAreClosed() && (e.rightPositionLayer = t.ZERO,
                    e.rightPositionConfig = t.ZERO,
                    e.rightPositionTools = t.ZERO,
                    e.rightPositionPrint = t.ZERO,
                    e.rightPositionInfoPopup = t.ZERO)
                }),
                this.appState.get("showPrintSelection").valueChanges.subscribe(function(n) {
                    n && (e.appState.get("search").setValue(""),
                    e.innerWidth > 1e3 ? (e.rightPositionLayer = t.TOOLBAR_SIZE,
                    e.rightPositionConfig = t.TOOLBAR_SIZE,
                    e.rightPositionTools = t.TOOLBAR_SIZE,
                    e.rightPositionPrint = t.TOOLBAR_SIZE,
                    e.rightPositionInfoPopup = t.TOOLBAR_SIZE) : (e.rightPositionLayer = t.TOOLBAR_SIZE_SMALL_SCREEN,
                    e.rightPositionConfig = t.TOOLBAR_SIZE_SMALL_SCREEN,
                    e.rightPositionTools = t.TOOLBAR_SIZE_SMALL_SCREEN,
                    e.rightPositionPrint = t.TOOLBAR_SIZE_SMALL_SCREEN,
                    e.rightPositionInfoPopup = t.TOOLBAR_SIZE_SMALL_SCREEN)),
                    e.checkIfAllMenuAreClosed() && (e.rightPositionLayer = t.ZERO,
                    e.rightPositionConfig = t.ZERO,
                    e.rightPositionTools = t.ZERO,
                    e.rightPositionPrint = t.ZERO,
                    e.rightPositionInfoPopup = t.ZERO)
                }),
                this.appState.get("showResultList").valueChanges.subscribe(function(n) {
                    e.downPositionResultList = n ? t.SEARCH_RESULT_LIST_SIZE : t.ZERO
                }),
                this.appState.get("resultListReady").valueChanges.subscribe(function(n) {
                    n ? e.downPositionResultList == t.ZERO && (e.downPositionResultList = t.SEARCH_RESULT_LIST_SIZE) : e.downPositionResultList = t.ZERO
                }),
                this.userService.isUserLogged().subscribe(function(t) {
                    e.userIsLogged = t
                })
            }
            ,
            e.prototype.search = function(e) {
                var t = this;
                if (0 !== e.value.length) {
                    if ("street" === this.suggestionType && (this.appState.get("searchResultStreet").setValue(e.value),
                    this.suggestion = []),
                    "capakey" === this.suggestionType) {
                        if ("CURRENT" === this.appState.get("currentSituation").value) {
                            var n = e.value;
                            this.localisationService.getCoordinatesFromCapakey(n).subscribe(function(e) {
                                t.localisationService.getCenterOfParcels(e).subscribe(function(e) {
                                    t.appState.get("searchResultCapakey").setValue({
                                        coord: [Number(e.labelPoints[0].x), Number(e.labelPoints[0].y)],
                                        capakey: n
                                    })
                                })
                            })
                        } else if ("FISCAL" === this.appState.get("currentSituation").value) {
                            var i = e.value;
                            this.localisationService.getCoordinatesFromFiscalCapakey(i).subscribe(function(e) {
                                t.localisationService.getCenterOfParcels(e).subscribe(function(e) {
                                    t.appState.get("searchResultCapakey").setValue({
                                        coord: [Number(e.labelPoints[0].x), Number(e.labelPoints[0].y)],
                                        capakey: i
                                    })
                                })
                            })
                        }
                        this.suggestion = []
                    }
                } else
                    this.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT")
            }
            ,
            e.prototype.suggestResult = function() {
                var e = this;
                if ("" === this.appState.get("search").value)
                    return this.pendingSearch = !1,
                    this.appState.get("pendingLoading").setValue(this.pendingSearch),
                    void this.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT");
                var t = this.appState.get("search").value;
                this.searchValue = t.trim(),
                /^[0-9]{5}.*/g.test(this.searchValue) ? "CURRENT" === this.appState.get("currentSituation").value ? this.localisationService.getCapakeysForPattern(this.searchValue).subscribe(function(t) {
                    if (0 === t.length)
                        return e.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                        e.pendingSearch = !1,
                        void e.appState.get("pendingLoading").setValue(e.pendingSearch);
                    e.suggestion = t,
                    e.suggestionType = "capakey",
                    e.pendingSearch = !1,
                    e.appState.get("pendingLoading").setValue(e.pendingSearch),
                    e.appState.get("autoComplete").setValue(!0)
                }) : "FISCAL" === this.appState.get("currentSituation").value && this.localisationService.getFiscalCapakeyForPattern(this.searchValue).subscribe(function(t) {
                    if (0 === t.length)
                        return e.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                        e.pendingSearch = !1,
                        void e.appState.get("pendingLoading").setValue(e.pendingSearch);
                    e.suggestion = t,
                    e.suggestionType = "capakey",
                    e.pendingSearch = !1,
                    e.appState.get("pendingLoading").setValue(e.pendingSearch),
                    e.appState.get("autoComplete").setValue(!0)
                }) : (this.pendingSearch = !0,
                this.appState.get("pendingLoading").setValue(this.pendingSearch),
                this.localisationService.getSuggestionForAdress(this.searchValue).pipe(Object(ut.b)(function(t) {
                    if (e.showError = !1,
                    0 === t.length)
                        return e.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                        e.pendingSearch = !1,
                        void e.appState.get("pendingLoading").setValue(e.pendingSearch);
                    t = e.removeAddrSearchDuplicates(t),
                    e.suggestion = t,
                    e.suggestionType = "street",
                    e.pendingSearch = !1,
                    e.appState.get("pendingLoading").setValue(e.pendingSearch),
                    e.appState.get("autoComplete").setValue(!0)
                }), Object(ut.a)(this.handleError)).subscribe())
            }
            ,
            e.prototype.removeAddrSearchDuplicates = function(e) {
                var t, n, i = [];
                for (t = 0; t < e.length; t++)
                    for (n = t + 1; n < e.length; n++)
                        e[t].streetName === e[n].streetName && e[t].houseNumber === e[n].houseNumber && e[t].zipCode === e[n].zipCode && e[t].city === e[n].city && i.push(n);
                for (t = i.length - 1; t >= 0; t--)
                    e.splice(i[t], 1);
                return e
            }
            ,
            e.prototype.login = function() {
                window.location.hostname.endsWith("intra") ? window.open("/ecad-login-intra", "_self") : window.open("/ecad-login-extra", "_self")
            }
            ,
            e.prototype.logout = function() {
                var e = this;
                this.userService.logout().subscribe(function() {
                    e.userIsLogged = !1,
                    e.refresh()
                })
            }
            ,
            e.prototype.refresh = function() {
                window.location.reload()
            }
            ,
            e.prototype.getLabelForKey = function(e) {
                return this.labelService.getLabel(e).filter(function(e) {
                    return void 0 !== e
                }).map(function(e) {
                    return e.value
                })
            }
            ,
            e.prototype.onResize = function(e) {
                this.innerWidth = window.innerWidth
            }
            ,
            e.prototype.showLayerMenu = function() {
                this.appState.get("mapLoading").value || (this.appState.get("showMenuLayer").setValue(!this.appState.get("showMenuLayer").value),
                this.appState.get("showMenuTools").setValue(!1),
                this.appState.get("showPrintSelection").setValue(!1))
            }
            ,
            e.prototype.showToolsMenu = function() {
                this.appState.get("mapLoading").value || (this.appState.get("showMenuTools").setValue(!this.appState.get("showMenuTools").value),
                this.appState.get("showMenuLayer").setValue(!1),
                this.appState.get("showPrintSelection").setValue(!1))
            }
            ,
            e.prototype.showPrintSelectionMenu = function() {
                this.appState.get("mapLoading").value || (this.appState.get("showPrintSelection").setValue(!this.appState.get("showPrintSelection").value),
                this.appState.get("showMenuTools").setValue(!1),
                this.appState.get("showMenuLayer").setValue(!1))
            }
            ,
            e.prototype.showAdvancedSearchMenu = function() {
                this.appState.get("mapLoading").value || (this.appState.get("advancedSearchChoice").setValue("advancedSearch"),
                this.appState.get("showMenuLayer").setValue(!1),
                this.appState.get("showPrintSelection").setValue(!1),
                this.appState.get("showMenuTools").setValue(!0))
            }
            ,
            e.prototype.showLayerMenuButton = function() {
                if (this.config && !this.appState.get("mapLoading").value)
                    return this.configService.getConfig().menus.layerMenu
            }
            ,
            e.prototype.showIdentifyButton = function() {
                if (this.config && !this.appState.get("mapLoading").value)
                    return this.configService.getConfig().menus.identifyButton
            }
            ,
            e.prototype.showToolsMenuButton = function() {
                if (this.config && !this.appState.get("mapLoading").value)
                    return this.configService.getConfig().menus.toolsMenu.visibility
            }
            ,
            e.prototype.showPrintSelectionButton = function() {
                if (this.config && !this.appState.get("mapLoading").value)
                    return this.configService.getConfig().menus.printMenu
            }
            ,
            e.prototype.showLanguageMenu = function() {
                if (this.config)
                    return this.configService.getConfig().menus.topbar.languageMenu
            }
            ,
            e.prototype.showTopbar = function() {
                if (this.config)
                    return this.configService.getConfig().menus.topbar.visibility
            }
            ,
            e.prototype.showSearchBar = function() {
                if (this.config)
                    return this.configService.getConfig().menus.topbar.search
            }
            ,
            e.prototype.showInfoMenu = function() {
                if (this.config)
                    return this.configService.getConfig().menus.topbar.infoMenu
            }
            ,
            e.prototype.showUserMenu = function() {
                if (this.config)
                    return this.configService.getConfig().menus.topbar.userMenu
            }
            ,
            e.prototype.showShareMenu = function() {
                if (this.config)
                    return this.configService.getConfig().menus.topbar.shareMenu
            }
            ,
            e.prototype.switchPopup = function() {
                "POPUP" === this.appState.get("chosenTools").value ? (this.appState.get("chosenTools").setValue("NONE"),
                this.appState.get("vectorActivated").setValue(!1)) : (this.appState.get("chosenTools").setValue("POPUP"),
                this.appState.get("vectorActivated").setValue(!0),
                this.appState.get("showPrintSelection").setValue(!1))
            }
            ,
            e.prototype.checkIfSidebarOpen = function() {
                return this.rightPositionTools || this.rightPositionLayer || this.rightPositionPrint
            }
            ,
            e.prototype.checkIfSearchSidebarOpen = function() {
                return this.rightPositionSearch
            }
            ,
            e.prototype.checkIfAllMenuAreClosed = function() {
                return !1 === this.appState.get("showMenuLayer").value && !1 === this.appState.get("showMenuTools").value && !1 === this.appState.get("showPrintSelection").value
            }
            ,
            e.prototype.checkIfDownbarOpen = function() {
                return this.downPositionResultList
            }
            ,
            e.prototype.closeDownBar = function() {
                this.downPositionResultList = t.ZERO
            }
            ,
            e.prototype.getLang = function() {
                return this.labelService.lang.getValue()
            }
            ,
            e.prototype.hideDownBar = function() {
                this.downPositionResultList == t.SEARCH_RESULT_LIST_SIZE ? this.downPositionResultList = t.SEARCH_RESULT_LIST_SIZE_HIDDEN : this.downPositionResultList = t.SEARCH_RESULT_LIST_SIZE
            }
            ,
            e.prototype.goToHelp = function() {
                var e = this.labelService.lang.value;
                window.open(window.location + "help/" + e, "_blank")
            }
            ,
            e.prototype.goToMyminfin = function() {
                this.ccffService.getMyminfinUrl().subscribe(function(e) {
                    window.location.href = e
                })
            }
            ,
            e.TOOLBAR_SIZE = 25,
            e.TOOLBAR_SIZE_SMALL_SCREEN = 75,
            e.ADVANCED_SEARCH_TOOLBAR_SIZE = 30,
            e.ADVANCED_SEARCH_TOOLBAR_SIZE_SMALL_SCREEN = 75,
            e.ZERO = 0,
            e.SEARCH_RESULT_LIST_SIZE = 45,
            e.SEARCH_RESULT_LIST_SIZE_HIDDEN = 7,
            dt([Object(i.Input)(), gt("design:type", f.d)], e.prototype, "appState", void 0),
            dt([Object(i.HostListener)("window:resize", ["$event"]), gt("design:type", Function), gt("design:paramtypes", [Object]), gt("design:returntype", void 0)], e.prototype, "onResize", null),
            e = t = dt([Object(i.Component)({
                selector: "app-toolbar",
                template: n("Ld5k"),
                styles: [n("1v17")]
            }), gt("design:paramtypes", [O, tt, We.b, s.b, p, ae, Ze, ct, pt.b])], e);
            var t
        }(), ft = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , yt = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , mt = function() {
            function e() {
                this.validationPath = [],
                this.showLabel = !0
            }
            return e.prototype.ngOnInit = function() {}
            ,
            e.prototype.errorKeys = function() {
                return Object.keys(this.inputControl.errors)
            }
            ,
            e.prototype.getExceptions = function() {
                if (this.inputControl.touched && this.exceptions)
                    return this.exceptions[this.validationPath.join(".")]
            }
            ,
            ft([Object(i.Input)(), yt("design:type", String)], e.prototype, "label", void 0),
            ft([Object(i.Input)(), yt("design:type", String)], e.prototype, "name", void 0),
            ft([Object(i.Input)(), yt("design:type", f.a)], e.prototype, "inputControl", void 0),
            ft([Object(i.Input)(), yt("design:type", Array)], e.prototype, "validationPath", void 0),
            ft([Object(i.Input)(), yt("design:type", Map)], e.prototype, "exceptions", void 0),
            ft([Object(i.Input)(), yt("design:type", Boolean)], e.prototype, "showLabel", void 0),
            e = ft([Object(i.Component)({
                selector: "app-input",
                template: n("6IWf"),
                styles: [n("yg+K")]
            }), yt("design:paramtypes", [])], e)
        }(), vt = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , bt = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , St = function() {
            function e() {
                this.pending = !1,
                this.showLabel = !0,
                this.suggestion = [],
                this.suggestionType = "street",
                this.shouldCheck = !1,
                this.prependOnClick = new i.EventEmitter,
                this.appendOnClick = new i.EventEmitter,
                this.suggestOnClick = new i.EventEmitter,
                this.type = "Number",
                this.minlength = 0,
                this.maxlength = 1 / 0,
                this.tabIndex = 0
            }
            return e.prototype.keyEventDown = function(e) {
                var t = this.suggestion;
                "ArrowUp" === e.key ? this.tabIndex > 0 && this.tabIndex-- : "ArrowDown" === e.key ? this.tabIndex < 4 && this.tabIndex++ : "Enter" === e.key && null !== t && t.length > 0 && (e.preventDefault(),
                this.onSuggestClicked(this.suggestion[this.tabIndex]))
            }
            ,
            e.prototype.ngOnInit = function() {
                var e = this;
                !this.placeholder && this.label ? this.placeholder = this.label : this.placeholder || (this.placeholder = this.name),
                !this.formControl && this.appState && this.name && (this.formControl = this.appState.get(this.name)),
                this.globalAppState.get("autoComplete").valueChanges.subscribe(function(t) {
                    "quickSearch" === e.searchType && (t || e.closeAutoComplete())
                })
            }
            ,
            e.prototype.onPrependClicked = function() {
                this.prependOnClick.emit()
            }
            ,
            e.prototype.onAppendClicked = function() {
                this.appendOnClick.emit()
            }
            ,
            e.prototype.closeAutoComplete = function() {
                this.suggestion = null
            }
            ,
            e.prototype.onSuggestClicked = function(e) {
                "street" === this.suggestionType ? this.appState.get(this.name).setValue(((e.streetName || "") + " " + (e.houseNumber || "") + " " + (e.zipCode || "") + " " + (e.city || "")).toUpperCase()) : "other" === this.suggestionType ? this.appState.get(this.name).setValue(e.streetName.toUpperCase()) : this.appState.get(this.name).setValue((e || "").toUpperCase()),
                this.suggestion = [],
                this.globalAppState.get("autoComplete").setValue(!1),
                this.suggestOnClick.emit({
                    value: e
                })
            }
            ,
            vt([Object(i.Input)(), bt("design:type", f.d)], e.prototype, "appState", void 0),
            vt([Object(i.Input)(), bt("design:type", f.d)], e.prototype, "globalAppState", void 0),
            vt([Object(i.Input)(), bt("design:type", String)], e.prototype, "name", void 0),
            vt([Object(i.Input)(), bt("design:type", String)], e.prototype, "searchType", void 0),
            vt([Object(i.Input)(), bt("design:type", String)], e.prototype, "label", void 0),
            vt([Object(i.Input)(), bt("design:type", String)], e.prototype, "placeholder", void 0),
            vt([Object(i.Input)(), bt("design:type", f.a)], e.prototype, "formControl", void 0),
            vt([Object(i.Input)(), bt("design:type", Array)], e.prototype, "validationPath", void 0),
            vt([Object(i.Input)(), bt("design:type", Map)], e.prototype, "exceptions", void 0),
            vt([Object(i.Input)(), bt("design:type", String)], e.prototype, "prependIcon", void 0),
            vt([Object(i.Input)(), bt("design:type", String)], e.prototype, "appendIcon", void 0),
            vt([Object(i.Input)(), bt("design:type", Boolean)], e.prototype, "pending", void 0),
            vt([Object(i.Input)(), bt("design:type", Boolean)], e.prototype, "showLabel", void 0),
            vt([Object(i.Input)(), bt("design:type", Object)], e.prototype, "suggestion", void 0),
            vt([Object(i.Input)(), bt("design:type", String)], e.prototype, "suggestionType", void 0),
            vt([Object(i.Input)(), bt("design:type", Boolean)], e.prototype, "shouldCheck", void 0),
            vt([Object(i.Output)(), bt("design:type", i.EventEmitter)], e.prototype, "prependOnClick", void 0),
            vt([Object(i.Output)(), bt("design:type", i.EventEmitter)], e.prototype, "appendOnClick", void 0),
            vt([Object(i.Output)(), bt("design:type", i.EventEmitter)], e.prototype, "suggestOnClick", void 0),
            vt([Object(i.Input)(), bt("design:type", String)], e.prototype, "type", void 0),
            vt([Object(i.Input)(), bt("design:type", Number)], e.prototype, "minlength", void 0),
            vt([Object(i.Input)(), bt("design:type", Number)], e.prototype, "maxlength", void 0),
            vt([Object(i.HostListener)("window:keydown", ["$event"]), bt("design:type", Function), bt("design:paramtypes", [KeyboardEvent]), bt("design:returntype", void 0)], e.prototype, "keyEventDown", null),
            e = vt([Object(i.Component)({
                selector: "input-text",
                template: n("/BWe"),
                styles: [n("joMj")]
            }), bt("design:paramtypes", [])], e)
        }(), Ct = n("Xjw4"), It = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Lt = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Ot = function() {
            function e() {
                this.validationPath = [],
                this.exceptions = new Map,
                this.icon = "",
                this.callback = new i.EventEmitter
            }
            return e.prototype.ngOnInit = function() {}
            ,
            It([Object(i.Input)(), Lt("design:type", f.d)], e.prototype, "appState", void 0),
            It([Object(i.Input)(), Lt("design:type", String)], e.prototype, "name", void 0),
            It([Object(i.Input)(), Lt("design:type", Array)], e.prototype, "items", void 0),
            It([Object(i.Input)(), Lt("design:type", Array)], e.prototype, "validationPath", void 0),
            It([Object(i.Input)(), Lt("design:type", Map)], e.prototype, "exceptions", void 0),
            It([Object(i.Input)(), Lt("design:type", String)], e.prototype, "icon", void 0),
            It([Object(i.Output)(), Lt("design:type", i.EventEmitter)], e.prototype, "callback", void 0),
            e = It([Object(i.Component)({
                selector: "input-select",
                template: n("4/9e")
            }), Lt("design:paramtypes", [])], e)
        }(), At = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Rt = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Tt = function() {
            function e() {
                this.code = "",
                this.size = 0,
                this.spin = !1
            }
            return e.prototype.ngOnInit = function() {
                this._class = "fa fa-" + this.code,
                0 !== this.size && (this._class += " fa-" + this.size + "x"),
                this.spin && (this._class += " fa-spin ")
            }
            ,
            Object.defineProperty(e.prototype, "class", {
                get: function() {
                    return this._class
                },
                enumerable: !0,
                configurable: !0
            }),
            At([Object(i.Input)(), Rt("design:type", String)], e.prototype, "code", void 0),
            At([Object(i.Input)(), Rt("design:type", Number)], e.prototype, "size", void 0),
            At([Object(i.Input)(), Rt("design:type", Boolean)], e.prototype, "spin", void 0),
            e = At([Object(i.Component)({
                selector: "icon",
                template: n("qklU"),
                styles: [n("mF83")]
            }), Rt("design:paramtypes", [])], e)
        }(), Et = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , wt = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , kt = function() {
            function e() {
                this.validationPath = []
            }
            return e.prototype.ngOnInit = function() {
                this.buttonsValues && !this.buttons && (this.buttons = _t.buttons.apply(_t, this.buttonsValues))
            }
            ,
            Et([Object(i.Input)(), wt("design:type", Array)], e.prototype, "buttons", void 0),
            Et([Object(i.Input)(), wt("design:type", Array)], e.prototype, "buttonsValues", void 0),
            Et([Object(i.Input)(), wt("design:type", f.d)], e.prototype, "formGroup", void 0),
            Et([Object(i.Input)(), wt("design:type", String)], e.prototype, "name", void 0),
            Et([Object(i.Input)(), wt("design:type", String)], e.prototype, "label", void 0),
            Et([Object(i.Input)(), wt("design:type", Array)], e.prototype, "validationPath", void 0),
            Et([Object(i.Input)(), wt("design:type", Map)], e.prototype, "exceptions", void 0),
            e = Et([Object(i.Component)({
                selector: "input-radio-buttons",
                template: n("QyrM")
            }), wt("design:paramtypes", [])], e)
        }(), _t = function() {
            function e(e, t) {
                this.value = e,
                this.label = t
            }
            return e.buttons = function() {
                for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                return t.map(function(t) {
                    return new e(t,null)
                })
            }
            ,
            e
        }(), xt = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Nt = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Pt = function() {
            function e() {
                this.validationPath = []
            }
            return e.prototype.ngOnInit = function() {
                this.buttonsValues && !this.buttons && (this.buttons = Mt.buttons.apply(Mt, this.buttonsValues))
            }
            ,
            xt([Object(i.Input)(), Nt("design:type", Array)], e.prototype, "buttons", void 0),
            xt([Object(i.Input)(), Nt("design:type", Array)], e.prototype, "buttonsValues", void 0),
            xt([Object(i.Input)(), Nt("design:type", f.d)], e.prototype, "formGroup", void 0),
            xt([Object(i.Input)(), Nt("design:type", String)], e.prototype, "name", void 0),
            xt([Object(i.Input)(), Nt("design:type", String)], e.prototype, "label", void 0),
            xt([Object(i.Input)(), Nt("design:type", Array)], e.prototype, "validationPath", void 0),
            xt([Object(i.Input)(), Nt("design:type", Map)], e.prototype, "exceptions", void 0),
            e = xt([Object(i.Component)({
                selector: "input-checkbox",
                template: n("TKW2")
            }), Nt("design:paramtypes", [])], e)
        }(), Mt = function() {
            function e(e, t) {
                this.value = e,
                this.label = t
            }
            return e.buttons = function() {
                for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                return t.map(function(t) {
                    return new e(t,null)
                })
            }
            ,
            e
        }(), Ft = n("Gvdl"), Vt = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Dt = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , jt = function() {
            function e() {}
            return e.prototype.upload = function(e) {
                var t = new Ft.Subject;
                return {
                    progress: t,
                    result: Ft.Observable.fromPromise(new Promise(function(n, i) {
                        var a = new FormData
                          , o = new XMLHttpRequest;
                        a.append("file", e, e.name),
                        o.onreadystatechange = function() {
                            4 === o.readyState && (200 === o.status ? n(JSON.parse(o.response)) : i(JSON.parse(o.response)))
                        }
                        ,
                        setInterval(function() {}, 500),
                        o.upload.onprogress = function(e) {
                            t.next(Math.round(e.loaded / e.total * 100))
                        }
                        ,
                        o.open("POST", C.VIA_FILE_UPLOAD, !0),
                        o.setRequestHeader("accept", "application/json"),
                        o.send(a)
                    }
                    ))
                }
            }
            ,
            e = Vt([Object(i.Injectable)(), Dt("design:paramtypes", [])], e)
        }(), Gt = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Bt = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Ut = function() {
            function e() {
                this.validationPath = [],
                this.onSubmit = new i.EventEmitter
            }
            return e.prototype.ngOnInit = function() {}
            ,
            e.prototype.onUpload = function() {
                this.onSubmit.emit()
            }
            ,
            Gt([Object(i.Input)(), Bt("design:type", f.d)], e.prototype, "formGroup", void 0),
            Gt([Object(i.Input)(), Bt("design:type", String)], e.prototype, "name", void 0),
            Gt([Object(i.Input)(), Bt("design:type", Array)], e.prototype, "validationPath", void 0),
            Gt([Object(i.Input)(), Bt("design:type", Map)], e.prototype, "exceptions", void 0),
            Gt([Object(i.Input)(), Bt("design:type", Boolean)], e.prototype, "needed", void 0),
            Gt([Object(i.Output)(), Bt("design:type", i.EventEmitter)], e.prototype, "onSubmit", void 0),
            e = Gt([Object(i.Component)({
                selector: "input-file",
                template: n("WiJU")
            }), Bt("design:paramtypes", [])], e)
        }(), zt = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Kt = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Yt = function() {
            function e(e, t) {
                this.inputFileService = e,
                this.notificationsService = t,
                this.onSubmit = new i.EventEmitter,
                this._value = null,
                this.progress = null,
                this.pending = !1,
                this.error = null,
                this.fileName = null,
                this.propagateChange = function(e) {}
            }
            return t = e,
            Object.defineProperty(e.prototype, "value", {
                get: function() {
                    return this._value
                },
                set: function(e) {
                    this._value = e,
                    this.propagateChange(e)
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.ngOnInit = function() {}
            ,
            e.prototype.ngAfterViewInit = function() {}
            ,
            e.prototype.writeValue = function(e) {
                this.value = e
            }
            ,
            e.prototype.registerOnChange = function(e) {
                this.propagateChange = e
            }
            ,
            e.prototype.registerOnTouched = function(e) {}
            ,
            e.prototype.reset = function() {
                this.uploadSubs && this.uploadSubs.unsubscribe(),
                this.uploadSubs && this.progressSubs.unsubscribe(),
                this.value = null,
                this.pending = !1
            }
            ,
            e.prototype.fileChange = function(e) {
                var t = this;
                this.reset(),
                this.pending = !0;
                var n = e.target.files[0]
                  , i = this.inputFileService.upload(n);
                this.uploadSubs = i.result.catch(function(e) {
                    return t.notificationsService.notify("error", "NOTIFICATION.ERROR.ANNEX"),
                    t.pending = !1,
                    t.fileName = "",
                    t.value.error = e,
                    Ft.Observable.empty
                }).subscribe(function(e) {
                    t.value = e.name,
                    t.fileName = e.name,
                    t.pending = !1,
                    t.onSubmit.emit()
                }),
                this.progressSubs = i.progress.subscribe(function(e) {
                    return t.progress = e
                })
            }
            ,
            e.prototype.url = function() {
                return C.CONFIGURATION + "/" + this.value
            }
            ,
            zt([Object(i.Input)(), Kt("design:type", f.d)], e.prototype, "formGroup", void 0),
            zt([Object(i.Input)(), Kt("design:type", String)], e.prototype, "name", void 0),
            zt([Object(i.Output)(), Kt("design:type", i.EventEmitter)], e.prototype, "onSubmit", void 0),
            e = t = zt([Object(i.Component)({
                selector: "custom-input-file",
                template: n("6oju"),
                styles: [n("rrO8")],
                providers: [{
                    provide: f.g,
                    useExisting: Object(i.forwardRef)(function() {
                        return t
                    }),
                    multi: !0
                }]
            }), Kt("design:paramtypes", [jt, p])], e);
            var t
        }(), Zt = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Wt = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Ht = function() {
            function e() {}
            return e.prototype.ngOnInit = function() {
                console.error("error", this.value)
            }
            ,
            Zt([Object(i.Input)(), Wt("design:type", Object)], e.prototype, "value", void 0),
            e = Zt([Object(i.Component)({
                selector: "error",
                template: n("GSgy")
            }), Wt("design:paramtypes", [])], e)
        }(), Xt = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Jt = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , qt = function() {
            function e() {
                this.hidden = !1,
                this.isValid = !0,
                this.showNext = !0,
                this.showPrev = !0,
                this.navigationByTitleDisable = !1,
                this.showDownloadXml = !1,
                this.onNext = new i.EventEmitter,
                this.onPrev = new i.EventEmitter,
                this.onComplete = new i.EventEmitter,
                this.onDownloadXml = new i.EventEmitter,
                this._isActive = !1,
                this.isDisabled = !0
            }
            return Object.defineProperty(e.prototype, "isActive", {
                get: function() {
                    return this._isActive
                },
                set: function(e) {
                    this._isActive = e,
                    this.isDisabled = !1
                },
                enumerable: !0,
                configurable: !0
            }),
            Xt([Object(i.Input)(), Jt("design:type", String)], e.prototype, "title", void 0),
            Xt([Object(i.Input)(), Jt("design:type", Boolean)], e.prototype, "hidden", void 0),
            Xt([Object(i.Input)(), Jt("design:type", Boolean)], e.prototype, "isValid", void 0),
            Xt([Object(i.Input)(), Jt("design:type", Boolean)], e.prototype, "showNext", void 0),
            Xt([Object(i.Input)(), Jt("design:type", Boolean)], e.prototype, "showPrev", void 0),
            Xt([Object(i.Input)(), Jt("design:type", Boolean)], e.prototype, "navigationByTitleDisable", void 0),
            Xt([Object(i.Input)(), Jt("design:type", Boolean)], e.prototype, "showDownloadXml", void 0),
            Xt([Object(i.Output)(), Jt("design:type", i.EventEmitter)], e.prototype, "onNext", void 0),
            Xt([Object(i.Output)(), Jt("design:type", i.EventEmitter)], e.prototype, "onPrev", void 0),
            Xt([Object(i.Output)(), Jt("design:type", i.EventEmitter)], e.prototype, "onComplete", void 0),
            Xt([Object(i.Output)(), Jt("design:type", i.EventEmitter)], e.prototype, "onDownloadXml", void 0),
            Xt([Object(i.Input)("isActive"), Jt("design:type", Boolean), Jt("design:paramtypes", [Boolean])], e.prototype, "isActive", null),
            e = Xt([Object(i.Component)({
                selector: "app-wizard-step",
                template: n("Qc7x"),
                styles: [n("kFon")]
            }), Jt("design:paramtypes", [])], e)
        }(), Qt = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , $t = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , en = function() {
            function e() {
                this._steps = [],
                this._isCompleted = !1,
                this.onStepChanged = new i.EventEmitter
            }
            return e.prototype.ngAfterContentInit = function() {
                var e = this;
                this.wizardSteps.forEach(function(t) {
                    return e._steps.push(t)
                }),
                this.steps[0].isActive = !0
            }
            ,
            Object.defineProperty(e.prototype, "steps", {
                get: function() {
                    return this._steps.filter(function(e) {
                        return !e.hidden
                    })
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "isCompleted", {
                get: function() {
                    return this._isCompleted
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "activeStep", {
                get: function() {
                    return this.steps.find(function(e) {
                        return e.isActive
                    })
                },
                set: function(e) {
                    e === this.activeStep || e.isDisabled || (this.activeStep.isActive = !1,
                    e.isActive = !0,
                    this.onStepChanged.emit(e))
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "activeStepIndex", {
                get: function() {
                    return this.steps.indexOf(this.activeStep)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "hasNextStep", {
                get: function() {
                    return this.activeStepIndex < this.steps.length - 1
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "hasPrevStep", {
                get: function() {
                    return this.activeStepIndex > 0
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.goToStep = function(e) {
                e.navigationByTitleDisable || this.isCompleted || (this.activeStep = e)
            }
            ,
            e.prototype.next = function() {
                if (this.hasNextStep) {
                    var e = this.steps[this.activeStepIndex + 1];
                    this.activeStep.onNext.emit(),
                    e.isDisabled = !1,
                    this.activeStep = e
                }
            }
            ,
            e.prototype.previous = function() {
                if (this.hasPrevStep) {
                    var e = this.steps[this.activeStepIndex - 1];
                    this.activeStep.onPrev.emit(),
                    e.isDisabled = !1,
                    this.activeStep = e
                }
            }
            ,
            e.prototype.downloadXml = function() {
                this.activeStep.onDownloadXml.emit()
            }
            ,
            e.prototype.complete = function() {
                this.activeStep.onComplete.emit()
            }
            ,
            Qt([Object(i.ContentChildren)(qt), $t("design:type", i.QueryList)], e.prototype, "wizardSteps", void 0),
            Qt([Object(i.Output)(), $t("design:type", i.EventEmitter)], e.prototype, "onStepChanged", void 0),
            e = Qt([Object(i.Component)({
                selector: "app-wizard",
                template: n("ZIp8"),
                styles: [n("r3V9")]
            }), $t("design:paramtypes", [])], e)
        }(), tn = n("rDQU"), nn = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , an = function() {
            function e() {}
            return e = nn([Object(i.NgModule)({
                imports: [Ct.CommonModule, s.a, tn.a],
                declarations: [en, qt],
                exports: [en, qt],
                providers: [p, s.b]
            })], e)
        }(), on = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , rn = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , sn = function() {
            function e(e, t) {
                this.elementRef = e,
                this.renderer = t,
                this.trueValue = !0,
                this.falseValue = !1,
                this.propagateChange = function(e) {}
            }
            return t = e,
            e.prototype.writeValue = function(e) {
                e === this.trueValue ? this.renderer.setProperty(this.elementRef.nativeElement, "checked", !0) : this.renderer.setProperty(this.elementRef.nativeElement, "checked", !1)
            }
            ,
            e.prototype.onHostChange = function(e) {
                this.propagateChange(e.target.checked ? this.trueValue : this.falseValue)
            }
            ,
            e.prototype.registerOnChange = function(e) {
                this.propagateChange = e
            }
            ,
            e.prototype.registerOnTouched = function(e) {}
            ,
            on([Object(i.Input)(), rn("design:type", Object)], e.prototype, "trueValue", void 0),
            on([Object(i.Input)(), rn("design:type", Object)], e.prototype, "falseValue", void 0),
            on([Object(i.HostListener)("change", ["$event"]), rn("design:type", Function), rn("design:paramtypes", [Object]), rn("design:returntype", void 0)], e.prototype, "onHostChange", null),
            e = t = on([Object(i.Directive)({
                selector: "input[type=checkbox][trueFalseValue]",
                providers: [{
                    provide: f.g,
                    useExisting: Object(i.forwardRef)(function() {
                        return t
                    }),
                    multi: !0
                }]
            }), rn("design:paramtypes", [i.ElementRef, i.Renderer2])], e);
            var t
        }(), ln = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , cn = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , pn = function() {
            function e() {
                this.validationPath = []
            }
            return e.prototype.ngOnInit = function() {}
            ,
            ln([Object(i.Input)(), cn("design:type", f.d)], e.prototype, "formGroup", void 0),
            ln([Object(i.Input)(), cn("design:type", String)], e.prototype, "name", void 0),
            ln([Object(i.Input)(), cn("design:type", String)], e.prototype, "label", void 0),
            ln([Object(i.Input)(), cn("design:type", Array)], e.prototype, "validationPath", void 0),
            ln([Object(i.Input)(), cn("design:type", Map)], e.prototype, "exceptions", void 0),
            e = ln([Object(i.Component)({
                selector: "input-checkbox-boolean",
                template: n("btLJ")
            }), cn("design:paramtypes", [])], e)
        }(), un = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , dn = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , gn = function() {
            function e(e) {
                this.elementRef = e,
                this.clickElsewhere = new i.EventEmitter
            }
            return e.prototype.onDocumentClick = function(e) {
                var t = e.target;
                t && !this.elementRef.nativeElement.contains(t) && this.clickElsewhere.emit()
            }
            ,
            un([Object(i.Output)(), dn("design:type", Object)], e.prototype, "clickElsewhere", void 0),
            un([Object(i.HostListener)("document:click", ["$event"]), dn("design:type", Function), dn("design:paramtypes", [MouseEvent]), dn("design:returntype", void 0)], e.prototype, "onDocumentClick", null),
            e = un([Object(i.Directive)({
                selector: "[appClickElseWhere]"
            }), dn("design:paramtypes", [i.ElementRef])], e)
        }(), hn = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , fn = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , yn = function() {
            function e(e) {
                this.el = e,
                this.active = !1,
                this.regexNr = new RegExp(/^[0-9]*$/g),
                this.regexChr = new RegExp(/^[a-zA-Z]*$/g),
                this.specialKeys = ["Backspace", "Tab", "End", "Home"]
            }
            return e.prototype.onKeyDown = function(e) {
                if (this.active) {
                    if ("Number" === this.drType) {
                        if (-1 !== this.specialKeys.indexOf(e.key))
                            return;
                        (t = this.el.nativeElement.value.concat(e.key)) && !String(t).match(this.regexNr) && e.preventDefault()
                    }
                    if ("Char" === this.drType) {
                        if (-1 !== this.specialKeys.indexOf(e.key))
                            return;
                        var t;
                        (t = this.el.nativeElement.value.concat(e.key)) && !String(t).match(this.regexChr) && e.preventDefault()
                    }
                }
            }
            ,
            e.prototype.onPaste = function(e) {
                if (this.active) {
                    if ("Number" === this.drType) {
                        e.preventDefault();
                        var t = e.clipboardData.getData("text/plain").replace(/[^0-9]+/, "");
                        document.execCommand("insertText", !1, t)
                    }
                    if ("Char" === this.drType) {
                        e.preventDefault();
                        t = e.clipboardData.getData("text/plain").replace(/[^a-zA-Z]+/, "");
                        document.execCommand("insertText", !1, t)
                    }
                }
            }
            ,
            hn([Object(i.Input)(), fn("design:type", String)], e.prototype, "drType", void 0),
            hn([Object(i.Input)(), fn("design:type", Boolean)], e.prototype, "active", void 0),
            hn([Object(i.HostListener)("keydown", ["$event"]), fn("design:type", Function), fn("design:paramtypes", [KeyboardEvent]), fn("design:returntype", void 0)], e.prototype, "onKeyDown", null),
            hn([Object(i.HostListener)("paste", ["$event"]), fn("design:type", Function), fn("design:paramtypes", [ClipboardEvent]), fn("design:returntype", void 0)], e.prototype, "onPaste", null),
            e = hn([Object(i.Directive)({
                selector: "[appDigitOrLetterOnlyDirective]"
            }), fn("design:paramtypes", [i.ElementRef])], e)
        }(), mn = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , vn = function() {
            function e() {}
            return e = mn([Object(i.NgModule)({
                imports: [s.a, Ct.CommonModule, f.h, We.c.forRoot(), an],
                exports: [yn, mt, St, Ot, Tt, kt, Pt, Yt, Ut, Ht, pn],
                declarations: [yn, mt, St, Ot, Tt, kt, Pt, Yt, Ut, Ht, sn, pn, gn, yn],
                providers: [jt]
            })], e)
        }(), bn = !0, Sn = "/ecad-web/assets/", Cn = "labels", In = ".json", Ln = (n("PCB2"),
        n("NbWi"),
        this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        ), On = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , An = function() {
            function e(e) {
                this.labelService = e
            }
            return e.prototype.ngOnInit = function() {
                this.backdrops = this.appState.get("backdrops").value,
                this.translations = this.appState.get("translations").value
            }
            ,
            e.prototype.updateBackdrop = function(e) {
                this.backdrops.forEach(function(t, n) {
                    n !== e && (t.active = !1)
                }),
                this.appState.get("backdrops").setValue(this.backdrops)
            }
            ,
            e.prototype.updateOpacityBackdrop = function(e) {
                this.appState.get("backdrops").setValue(this.backdrops)
            }
            ,
            e.prototype.getKeys = function(e) {
                if (void 0 != e)
                    return Array.from(e.keys())
            }
            ,
            e.prototype.getCurrentTranslations = function(e) {
                var t = this.labelService.lang.value;
                return "FR" == t ? this.translations.get(e).fr : "NL" == t ? this.translations.get(e).nl : "DE" == t ? this.translations.get(e).de : "EN" == t ? this.translations.get(e).en : void 0
            }
            ,
            e.prototype.showOpacity = function(e) {
                e.showOpacity = !e.showOpacity
            }
            ,
            e.prototype.isEmpty = function(e) {
                for (var t in e)
                    if (e.hasOwnProperty(t))
                        return !1;
                return !0
            }
            ,
            Ln([Object(i.Input)(), On("design:type", f.d)], e.prototype, "appState", void 0),
            e = Ln([Object(i.Component)({
                selector: "app-backdrop-selection",
                template: n("rDBZ"),
                styles: [n("Upkd")]
            }), On("design:paramtypes", [s.b])], e)
        }(), Rn = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Tn = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , En = function() {
            function e(e) {
                this.http = e
            }
            return e.prototype.getLayersFromWMSCapabilities = function(e) {
                return this.http.post(C.WMS + "/layers", e)
            }
            ,
            e.prototype.getCapabilitiesFromWMS = function(e) {
                return this.http.post(C.WMS, e)
            }
            ,
            e = Rn([Object(i.Injectable)(), Tn("design:paramtypes", [S.a])], e)
        }(), wn = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , kn = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , _n = function() {
            function e(e, t, n, i, a, o, r) {
                this.labelService = e,
                this.activeModal = t,
                this.fb = n,
                this.proxy = i,
                this.notif = a,
                this.gis = o,
                this.mapService = r,
                this.translations = new Map,
                this.userLayerService = "WMS"
            }
            return e.prototype.ngOnInit = function() {
                this.layers = this.appState.get("layers").value,
                this.inspire = this.appState.get("inspire").value,
                this.userLayers = this.appState.get("userLayers").value,
                this.translations = this.appState.get("translations").value,
                this.historic = this.appState.get("historic").value,
                this.permissions = this.appState.get("permissions").value,
                this.userLayer = this.appState.get("userLayer").value,
                this.menuStatus = this.fb.group({
                    inspire: !1,
                    toc: !1,
                    userlayer: !1,
                    historic: !1
                })
            }
            ,
            e.prototype.getCurrentTranslations = function(e) {
                var t = this.labelService.lang.value;
                return "FR" == t ? e.fr : "NL" == t ? e.nl : "DE" == t ? e.de : "EN" == t ? e.en : void 0
            }
            ,
            e.prototype.getKeys = function(e) {
                if (void 0 != e)
                    return Array.from(e.keys())
            }
            ,
            e.prototype.addInspireLayer = function(e, t) {
                t.addedToMap = !0,
                t.active = !0,
                this.appState.get("inspire").setValue(this.inspire),
                this.isInspireSectionEmpty(e)
            }
            ,
            e.prototype.addHistoricLayer = function(e) {
                this.historic.forEach(function(e) {
                    e.active = !1
                }),
                e.addedToMap = !0,
                e.active = !0,
                this.appState.get("historic").setValue(this.historic)
            }
            ,
            e.prototype.addTocLayer = function(e, t) {
                t.addedToMap = !0,
                t.active = !0,
                this.appState.get("layers").setValue(this.layers),
                this.isSectionEmpty(e)
            }
            ,
            e.prototype.closeModal = function() {
                this.activeModal.close()
            }
            ,
            e.prototype.isEmpty = function(e) {
                for (var t in e)
                    if (e.hasOwnProperty(t))
                        return !1;
                return !0
            }
            ,
            e.prototype.switchStateMenu = function(e) {
                this.menuStatus.get(e).setValue(!this.menuStatus.get(e).value)
            }
            ,
            e.prototype.getPermissionFromLayer = function(e, t, n, i) {
                void 0 === i && (i = null);
                var a = {
                    presentInToc: !1,
                    visibleByDefault: !1,
                    deletion: !1,
                    addition: !1
                };
                return i ? this.layers.get(t).get("subGroup").get(i).get(e).permissions && this.layers.get(t).get("subGroup").get(i).get(e).permissions[this.permissions][n] ? this.layers.get(t).get("subGroup").get(i).get(e).permissions[this.permissions][n] : a.attributeFromPermissions : this.layers.get(t).get("layers").get(e).permissions && this.layers.get(t).get("layers").get(e).permissions[this.permissions][n] ? this.layers.get(t).get("layers").get(e).permissions[this.permissions][n] : a.attributeFromPermissions
            }
            ,
            e.prototype.getPermissionFromUserLayer = function(e, t, n) {
                var i = {
                    presentInToc: !1,
                    visibleByDefault: !1,
                    deletion: !1,
                    addition: !1
                };
                return this.userLayers.get(t).get(e).permissions && this.userLayers.get(t).get(e).permissions[this.permissions][n] ? this.userLayers.get(t).get(e).permissions[this.permissions][n] : i.attributeFromPermissions
            }
            ,
            e.prototype.getPermissionFromInspireLayer = function(e, t, n, i) {
                void 0 === i && (i = null);
                var a = {
                    presentInToc: !1,
                    visibleByDefault: !1,
                    deletion: !1,
                    addition: !1
                };
                return i ? this.inspire.get(t).get("subGroup").get(i).get(e) && this.inspire.get(t).get("subGroup").get(i).get(e).permissions[this.permissions][n] ? this.inspire.get(t).get("subGroup").get(i).get(e).permissions[this.permissions][n] : a.attributeFromPermissions : this.inspire.get(t).get("layers").get(e) && this.inspire.get(t).get("layers").get(e).permissions[this.permissions][n] ? this.inspire.get(t).get("layers").get(e).permissions[this.permissions][n] : a.attributeFromPermissions
            }
            ,
            e.prototype.isVector = function(e) {
                return ("" + e).startsWith("Vector-")
            }
            ,
            e.prototype.isUserLayersSectionEmpty = function(e) {
                var t = this
                  , n = !0;
                return this.userLayers.forEach(function(i, a) {
                    !1 === t.isUserLayersGroupEmpty(a, e) && (n = !1)
                }),
                n
            }
            ,
            e.prototype.addUserLayers = function(e) {
                e.addedToMap = !0,
                this.appState.get("userLayers").setValue(this.userLayers),
                this.userLayerUrl = e.url,
                this.userLayerService = e.type,
                this.addUserLayer(e)
            }
            ,
            e.prototype.addUserLayer = function(e) {
                var t = this
                  , n = e ? e.titleKey : null;
                this.pending = !0,
                this.userLayerUrl = this.checkUserLayerUrl();
                var i = this.userLayerUrl.trim();
                this.proxy.proxyGetAddress(i).toPromise().then(function(i) {
                    if ("WMS" === t.userLayerService && !i.includes("WMS"))
                        return t.notif.notify("error", "NOTIFICATION_LAYER_NOT_RIGHT_SERVICE"),
                        void (t.pending = !1);
                    if ("WMTS" === t.userLayerService && !i.includes("WMTS"))
                        return t.notif.notify("error", "NOTIFICATION_LAYER_NOT_RIGHT_SERVICE"),
                        void (t.pending = !1);
                    if (i.includes("EPSG:3812") || i.includes("3812") || (t.notif.notify("error", "NOTIFICATION_LAYER_NOT_LAMBERT_2008"),
                    t.pending = !1),
                    "WMS" === t.userLayerService) {
                        var a = new he.a
                          , o = t;
                        fetch(t.userLayerUrl).then(function(e) {
                            return e.text()
                        }).then(function(t) {
                            var i, r = a.read(t);
                            i = r.Service ? r.Service.OnlineResource.replace("?", "") : o.userLayerUrl.split("?")[0];
                            var s, l = o.mapService.getWMSFromWMSCapabilities(r, i, e || null);
                            (null !== n && (l.get("header").title = n),
                            null == o.appState.get("userLayer").value) ? ((s = []).push(l),
                            o.appState.get("userLayer").setValue(s),
                            o.notif.notify("success", "NOTIFICATION_LAYER_ADDED_CORRECTLY"),
                            o.userLayerUrl = "",
                            o.pending = !1) : ((s = o.appState.get("userLayer").value).push(l),
                            o.appState.get("userLayer").setValue(s),
                            o.notif.notify("success", "NOTIFICATION_LAYER_ADDED_CORRECTLY"),
                            o.userLayerUrl = "",
                            o.pending = !1)
                        })
                    } else if ("WMTS" === t.userLayerService) {
                        a = new P.a;
                        var r = t;
                        fetch(t.userLayerUrl).then(function(e) {
                            return e.text()
                        }).then(function(t) {
                            var i = a.read(t)
                              , o = r.mapService.getWMTSFromWMTSCapabilities(i, r.userLayerUrl, e || null);
                            null !== n && (o.get("header").title = n),
                            null === r.appState.get("userLayer").value ? setTimeout(function() {
                                var e = [];
                                e.push(o),
                                r.appState.get("userLayer").setValue(e),
                                r.notif.notify("success", "NOTIFICATION_LAYER_ADDED_CORRECTLY"),
                                r.userLayerUrl = "",
                                r.pending = !1
                            }, 1e3) : setTimeout(function() {
                                var e = r.appState.get("userLayer").value;
                                e.push(o),
                                r.appState.get("userLayer").setValue(e),
                                r.notif.notify("success", "NOTIFICATION_LAYER_ADDED_CORRECTLY"),
                                r.userLayerUrl = "",
                                r.pending = !1
                            }, 1e3)
                        })
                    }
                }).catch(function(e) {
                    console.error(e),
                    t.notif.notify("error", "NOTIFICATION_LAYER_NOT_RIGHT_SERVICE")
                })
            }
            ,
            e.prototype.checkUserLayerUrl = function() {
                var e = this.userLayerUrl.trim()
                  , t = e;
                return t.includes("?") ? (t.toLowerCase().includes("request=getcapabilities") || (e = e.concat("&request=GetCapabilities")),
                t.toLowerCase().includes("service=") || (e = e.concat("&service=").concat(this.userLayerService.toUpperCase()))) : e = e.concat("?request=GetCapabilities&service=").concat(this.userLayerService.toUpperCase()),
                e
            }
            ,
            e.prototype.isGroupEmpty = function(e, t) {
                var n = this
                  , i = !0;
                return this.getKeys(this.layers.get(e).get("layers")).forEach(function(a) {
                    n.layers.get(e).get("layers").get(a).permissions && (!n.layers.get(e).get("layers").get(a).permissions[n.permissions][t] || n.layers.get(e).get("layers").get(a).addedToMap || n.isVector(a) || (i = !1))
                }),
                0 !== this.layers.get(e).get("subGroup").size && this.layers.get(e).get("subGroup").forEach(function(a, o) {
                    !1 === n.isSubGroupEmpty(e, t, o) && (i = !1)
                }),
                i
            }
            ,
            e.prototype.isUserLayersGroupEmpty = function(e, t) {
                var n = this
                  , i = !0;
                return this.getKeys(this.userLayers.get(e)).forEach(function(a) {
                    n.userLayers.get(e).get(a).permissions && n.userLayers.get(e).get(a).permissions[n.permissions][t] && !n.userLayers.get(e).get(a).addedToMap && (i = !1)
                }),
                i
            }
            ,
            e.prototype.isSubGroupEmpty = function(e, t, n) {
                var i = this
                  , a = !0;
                return this.getKeys(this.layers.get(e).get("subGroup").get(n)).forEach(function(o) {
                    i.layers.get(e).get("subGroup").get(n).get(o).permissions && (!i.layers.get(e).get("subGroup").get(n).get(o).permissions[i.permissions][t] || i.layers.get(e).get("subGroup").get(n).get(o).addedToMap || i.isVector(o) || (a = !1))
                }),
                a
            }
            ,
            e.prototype.isSectionEmpty = function(e) {
                var t = this
                  , n = !0;
                return this.layers.forEach(function(i, a) {
                    !1 === t.isGroupEmpty(a, e) && (n = !1)
                }),
                n
            }
            ,
            e.prototype.isInspireGroupEmpty = function(e, t) {
                var n = this
                  , i = !0;
                return this.getKeys(this.inspire.get(e).get("layers")).forEach(function(a) {
                    n.inspire.get(e).get("layers").get(a).permissions && n.inspire.get(e).get("layers").get(a).permissions[n.permissions][t] && !n.inspire.get(e).get("layers").get(a).addedToMap && (i = !1)
                }),
                0 !== this.inspire.get(e).get("subGroup").size && this.inspire.get(e).get("subGroup").forEach(function(a, o) {
                    !1 === n.isInspireSubGroupEmpty(e, t, o) && (i = !1)
                }),
                i
            }
            ,
            e.prototype.isInspireSubGroupEmpty = function(e, t, n) {
                var i = this
                  , a = !0;
                return this.getKeys(this.inspire.get(e).get("subGroup").get(n)).forEach(function(o) {
                    i.inspire.get(e).get("subGroup").get(n).get(o).permissions && i.inspire.get(e).get("subGroup").get(n).get(o).permissions[i.permissions][t] && !i.inspire.get(e).get("subGroup").get(n).get(o).addedToMap && (a = !1)
                }),
                a
            }
            ,
            e.prototype.isInspireSectionEmpty = function(e) {
                var t = this
                  , n = !0;
                return this.inspire.forEach(function(i, a) {
                    !1 === t.isInspireGroupEmpty(a, e) && (n = !1)
                }),
                n
            }
            ,
            e.prototype.isHistoricEmpty = function() {
                var e = !0;
                return this.historic.forEach(function(t) {
                    !0 == !t.addedToMap && (e = !1)
                }),
                e
            }
            ,
            e = wn([Object(i.Component)({
                selector: "app-add-layer-menu",
                template: n("GbEp"),
                styles: [n("yc3C")]
            }), kn("design:paramtypes", [s.b, We.a, f.b, ge, pe, En, be])], e)
        }(), xn = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Nn = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Pn = function() {
            function e(e, t, n) {
                this.activeModal = e,
                this.labelService = t,
                this.cms = n,
                this.key = "",
                this.htmlContent = {
                    nl: "",
                    fr: "",
                    de: "",
                    en: ""
                }
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.cms.getCmsContentByKey(this.key).subscribe(function(t) {
                    e.htmlContent = t
                })
            }
            ,
            e.prototype.getLang = function() {
                return this.labelService.lang.value.toLowerCase()
            }
            ,
            xn([Object(i.Input)(), Nn("design:type", String)], e.prototype, "key", void 0),
            e = xn([Object(i.Component)({
                selector: "app-cms-display",
                template: n("yH2H"),
                styles: [n("ff0D")]
            }), Nn("design:paramtypes", [We.a, s.b, se])], e)
        }(), Mn = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Fn = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Vn = function() {
            function e(e, t, n) {
                this.formBuilder = e,
                this.labelService = t,
                this.modalService = n,
                this.sections = new Map,
                this.translations = new Map,
                this.isGroupCollapse = !0,
                this.showAddLayerMenu = !1,
                this.SECTIONS_NUMBER_MAX = 4
            }
            return e.prototype.sectionInit = function() {
                for (var e = this, t = document.getElementById("sectionsTable"), n = document.getElementById("sectionsTable").children, i = new Array, a = 0, o = n; a < o.length; a++) {
                    var r = o[a];
                    i.push(r)
                }
                i.sort(function(t, n) {
                    var i = e.sections.get(t.id);
                    return e.sections.get(n.id) - i
                }).forEach(function(e, n) {
                    t.appendChild(e)
                })
            }
            ,
            e.prototype.ngOnInit = function() {
                var e = this;
                this.layers = this.appState.get("layers").value,
                this.layersKeys = this.getKeys(this.layers),
                this.inspire = this.appState.get("inspire").value,
                this.historic = this.appState.get("historic").value,
                this.translations = this.appState.get("translations").value,
                this.permissions = this.appState.get("permissions").value,
                this.userLayer = this.appState.get("userLayer").value,
                this.sections = this.appState.get("sections").value,
                this.historic.hidden = !0,
                this.layers.forEach(function(e) {
                    e.hidden = !0,
                    e.get("subGroup").forEach(function(e) {
                        e.hidden = !0
                    })
                }),
                this.appState.get("userLayer").valueChanges.subscribe(function(t) {
                    e.userLayer = t
                }),
                this.appState.get("sections").valueChanges.subscribe(function(t) {
                    e.appState.get("layers").setValue(e.layers),
                    e.appState.get("sections").value.has("inspireGr") && e.appState.get("inspire").setValue(e.inspire),
                    e.appState.get("sections").value.has("historicGr") && e.appState.get("historic").setValue(e.historic),
                    e.appState.get("sections").value.has("userGr") && e.appState.get("userLayer").setValue(e.userLayer)
                })
            }




                
            ,
            e.prototype.ngAfterViewInit = function() {
                this.sectionInit()
            }
            ,
            e.prototype.ngAfterViewChecked = function() {
                this.isInspireSectionEmpty() || this.sections.has("inspireGr") || (this.sections.set("inspireGr", this.SECTIONS_NUMBER_MAX - this.sections.size),
                this.appState.get("sections").setValue(this.sections),
                this.inspireElement.nativeElement.parentNode.appendChild(this.inspireElement.nativeElement)),
                this.isHistoricEmpty() || this.sections.has("historicGr") || (this.sections.set("historicGr", this.SECTIONS_NUMBER_MAX - this.sections.size),
                this.appState.get("sections").setValue(this.sections),
                this.historicElement.nativeElement.parentNode.appendChild(this.historicElement.nativeElement)),
                this.isUserLayerSectionEmpty() || this.sections.has("userGr") || (this.sections.set("userGr", this.SECTIONS_NUMBER_MAX - this.sections.size),
                this.appState.get("sections").setValue(this.sections),
                this.userElement.nativeElement.parentNode.appendChild(this.userElement.nativeElement))
            }
            ,
            e.prototype.updateLayer = function() {
                this.appState.get("layers").setValue(this.layers)
            }
            ,
            e.prototype.updateVectorLayers = function(e, t, n) {
                n ? this.checkIfVectorLayer(this.layers.get(t).get("subGroup").get(n).get("Vector-" + e)) && (this.layers.get(t).get("subGroup").get(n).get("Vector-" + e).active = this.layers.get(t).get("subGroup").get(n).get(e).active) : this.checkIfVectorLayer(this.layers.get(t).get("layers").get("Vector-" + e)) && (this.layers.get(t).get("layers").get("Vector-" + e).active = this.layers.get(t).get("layers").get(e).active),
                this.updateLayer()
            }
            ,
            e.prototype.checkIfVectorLayer = function(e) {
                return e
            }
            ,
            e.prototype.updateOpacity = function(e) {
                this.updateLayer()
            }
            ,
            e.prototype.updateInspireOpacity = function(e) {
                this.updateInspireLayer()
            }
            ,
            e.prototype.updateHistoricOpacity = function(e) {
                this.updateHistoricLayer(e)
            }
            ,
            e.prototype.getKeys = function(e) {
                if (void 0 != e)
                    return Array.from(e.keys())
            }
            ,
            e.prototype.getCurrentTranslations = function(e) {
                var t = this.labelService.lang.value;
                return "FR" == t ? e.fr : "NL" == t ? e.nl : "DE" == t ? e.de : "EN" == t ? e.en : void 0
            }
            ,
            e.prototype.showMoreInformationFor = function(e) {
                e.moreInformation = !e.moreInformation
            }
            ,
            e.prototype.showOpacity = function(e) {
                e.showOpacity = !e.showOpacity
            }
            ,
            e.prototype.hideGroup = function(e) {
                e.hidden = !e.hidden
            }
            ,
            e.prototype.showAddLayerMenuToggle = function() {
                this.modalService.open(_n, {
                    backdrop: "static",
                    size: "lg",
                    keyboard: !1
                }).componentInstance.appState = this.appState
            }
            ,
            e.prototype.updateInspireLayer = function() {
                this.appState.get("inspire").setValue(this.inspire)
            }
            ,
            e.prototype.updateHistoricLayer = function(e) {
                this.historic.forEach(function(t, n) {
                    n !== e && (t.active = !1)
                }),
                this.appState.get("historic").setValue(this.historic)
            }
            ,
            e.prototype.removeInspireLayer = function(e) {
                e.addedToMap = !1,
                e.active = !1,
                this.appState.get("inspire").setValue(this.inspire)
            }
            ,
            e.prototype.addTocLayer = function(e) {
                e.addedToMap = !0,
                e.active = !0,
                this.appState.get("layers").setValue(this.layers)
            }
            ,
            e.prototype.removeTocLayer = function(e) {
                e.addedToMap = !1,
                e.active = !1,
                this.appState.get("layers").setValue(this.layers)
            }
            ,
            e.prototype.removeHistoricLayer = function(e) {
                e.addedToMap = !1,
                e.active = !1,
                this.appState.get("historic").setValue(this.historic)
            }
            ,
            e.prototype.isAVector = function(e) {
                return ("" + e).startsWith("Vector-")
            }
            ,
            e.prototype.isEmpty = function(e) {
                for (var t in e)
                    if (e.hasOwnProperty(t))
                        return !1;
                return !0
            }
            ,
            e.prototype.isGroupEmpty = function(e) {
                var t = this
                  , n = !0;
                return this.layers.get(e).get("layers").forEach(function(e) {
                    !0 === e.addedToMap && "VECTOR" !== e.layer.getType() && (n = !1)
                }),
                0 !== this.layers.get(e).get("subGroup").size && this.layers.get(e).get("subGroup").forEach(function(i, a) {
                    !1 === t.isSubGroupEmpty(e, a) && (n = !1)
                }),
                n
            }
            ,
            e.prototype.isSubGroupEmpty = function(e, t) {
                var n = !0;
                return this.layers.get(e).get("subGroup").get(t).forEach(function(e) {
                    !0 === e.addedToMap && "VECTOR" != e.layer.type && (n = !1)
                }),
                n
            }
            ,
            e.prototype.isInspireGroupEmpty = function(e) {
                var t = this
                  , n = !0;
                return this.inspire.get(e).get("layers").forEach(function(e) {
                    !0 === e.addedToMap && (n = !1)
                }),
                0 !== this.inspire.get(e).get("subGroup").size && this.inspire.get(e).get("subGroup").forEach(function(i, a) {
                    !1 === t.isInspireSubGroupEmpty(e, a) && (n = !1)
                }),
                n
            }
            ,
            e.prototype.isInspireSubGroupEmpty = function(e, t) {
                var n = !0;
                return this.inspire.get(e).get("subGroup").get(t).forEach(function(e) {
                    !0 === e.addedToMap && (n = !1)
                }),
                n
            }
            ,
            e.prototype.isInspireSectionEmpty = function() {
                var e = this
                  , t = !0;
                return this.inspire.forEach(function(n, i) {
                    !1 === e.isInspireGroupEmpty(i) && (t = !1)
                }),
                t && this.sections.has("inspireGr") && (this.sections.delete("inspireGr"),
                this.resetSectionValues(),
                this.appState.get("sections").setValue(this.sections)),
                t
            }
            ,
            e.prototype.resetSectionValues = function() {
                var e = 4
                  , t = this;
                t.sections.forEach(function(n, i) {
                    t.sections.set(i, e),
                    e--
                })
            }
            ,
            e.prototype.isHistoricEmpty = function() {
                var e = !0;
                return this.historic.forEach(function(t) {
                    !0 === t.addedToMap && (e = !1)
                }),
                e && this.sections.has("historicGr") && (this.sections.delete("historicGr"),
                this.resetSectionValues(),
                this.appState.get("sections").setValue(this.sections)),
                e
            }
            ,
            e.prototype.isLayerVisibleOnMap = function(e) {
                return this.appState.get("currentZoom").value > e.maxScale || this.appState.get("currentZoom").value < e.minScale
            }
            ,
            e.prototype.getPermissionsFromLayer = function(e, t, n, i) {
                void 0 === i && (i = null);
                var a = {
                    presentInToc: !1,
                    visibleByDefault: !1,
                    deletion: !1,
                    addition: !1
                };
                return i ? this.layers.get(t).get("subGroup").get(i).get(e).permissions && this.layers.get(t).get("subGroup").get(i).get(e).permissions[this.permissions][n] ? this.layers.get(t).get("subGroup").get(i).get(e).permissions[this.permissions][n] : a.attributeFromPermissions : this.layers.get(t).get("layers").get(e).permissions && this.layers.get(t).get("layers").get(e).permissions[this.permissions][n] ? this.layers.get(t).get("layers").get(e).permissions[this.permissions][n] : a.attributeFromPermissions
            }
            ,
            e.prototype.openLayerDescription = function(e) {
                this.modalService.open(Pn).componentInstance.key = e.descriptionKey
            }
            ,
            e.prototype.swipeGr = function(e, t, n, i) {
                "up" == e && n > 0 ? t = this.orderGrUp(t, n) : "down" == e && n < t.size - 1 && (t = this.orderGrDown(t, n)),
                "INSPIRE" == i ? this.inspire = t : this.layers = t,
                "INSPIRE" == i ? this.appState.get("inspire").setValue(this.inspire) : this.appState.get("layers").setValue(this.layers)
            }
            ,
            e.prototype.rearrangeInspireSubGroup = function(e, t, n) {
                var i = this.inspire.get(t).get("subGroup");
                "up" == e && n > 0 ? i = this.orderGrUp(i, n) : "down" == e && n < i.size - 1 && (i = this.orderGrDown(i, n)),
                this.inspire.get(t).set("subGroup", i),
                this.appState.get("inspire").setValue(this.inspire)
            }
            ,
            e.prototype.swipeLayers = function(e, t, n, i) {
                var a = "INSPIRE" == i ? this.inspire.get(t).get("layers") : this.layers.get(t).get("layers");
                "up" == e && n > 0 ? a = this.orderLayersUp(a, n) : "down" == e && n < a.size - 1 && (a = this.orderLayersDown(a, n)),
                "INSPIRE" == i ? this.inspire.get(t).set("layers", a) : this.layers.get(t).set("layers", a),
                "INSPIRE" == i ? this.appState.get("inspire").setValue(this.inspire) : this.appState.get("layers").setValue(this.layers)
            }
            ,
            e.prototype.orderGrDown = function(e, t) {
                var n = Array.from(e)
                  , i = n[t + 1];
                return n[t + 1] = n[t],
                n[t] = i,
                new Map(n)
            }
            ,
            e.prototype.orderGrUp = function(e, t) {
                var n = Array.from(e)
                  , i = n[t - 1];
                return n[t - 1] = n[t],
                n[t] = i,
                new Map(n)
            }
            ,
            e.prototype.orderLayersUp = function(e, t) {
                var n = Array.from(e)
                  , i = t - 1;
                if (0 != i || "VECTOR" !== n[i][1].layer.type) {
                    if (i > 0 && "VECTOR" === n[i][1].layer.type) {
                        var a = n[i - 2]
                          , o = n[i - 1];
                        n[i - 2] = n[i],
                        n[i - 1] = n[t],
                        n[i] = a,
                        n[t] = o
                    } else {
                        o = n[i];
                        n[i] = n[t],
                        n[t] = o
                    }
                    return new Map(n)
                }
            }
            ,
            e.prototype.orderLayersDown = function(e, t) {
                var n = Array.from(e)
                  , i = t + 1;
                if (i == n.length - 1 || i < n.length - 1 && "VECTOR" !== n[i][1].layer.type) {
                    var a = n[i];
                    n[i] = n[t],
                    n[t] = a
                } else {
                    if (!(i < n.length - 1 && "VECTOR" === n[i][1].layer.type))
                        return e;
                    var o = n[i];
                    a = n[i + 1];
                    n[i] = n[t - 1],
                    n[i + 1] = n[t],
                    n[t - 1] = o,
                    n[t] = a
                }
                return new Map(n)
            }
            ,
            e.prototype.swipeSubLayers = function(e, t, n, i, a) {
                var o = "LAYERS" == a ? this.layers.get(t).get("subGroup").get(n) : this.inspire.get(t).get("subGroup").get(n);
                "up" == e && i > 0 ? o = this.orderLayersUp(o, i) : "down" == e && i < o.size - 1 && (o = this.orderLayersDown(o, i)),
                "LAYERS" == a ? this.layers.get(t).get("subGroup").set(n, o) : this.inspire.get(t).get("subGroup").set(n, o),
                "INSPIRE" == a ? this.appState.get("inspire").setValue(this.inspire) : this.appState.get("layers").setValue(this.layers)
            }
            ,
            e.prototype.isUserLayerSectionEmpty = function() {
                return (null === this.userLayer || 0 === this.userLayer.length) && (this.sections.has("userGr") && (this.sections.delete("userGr"),
                this.resetSectionValues(),
                this.appState.get("sections").setValue(this.sections)),
                !0)
            }
            ,
            e.prototype.moveUp = function(e) {
                var t = document.getElementById(e);
                if (null != t.previousElementSibling) {
                    var n = t.previousElementSibling.id;
                    this.sections.set(e, this.sections.get(e) + 1),
                    this.sections.set(n, this.sections.get(n) - 1),
                    this.appState.get("sections").setValue(this.sections),
                    t.parentNode.insertBefore(t, t.previousElementSibling)
                }
            }
            ,
            e.prototype.moveDown = function(e) {
                var t = document.getElementById(e);
                if (null != t.nextElementSibling) {
                    var n = t.nextElementSibling.id;
                    this.sections.set(e, this.sections.get(e) - 1),
                    this.sections.set(n, this.sections.get(n) + 1),
                    this.appState.get("sections").setValue(this.sections),
                    t.parentNode.insertBefore(t, t.nextElementSibling.nextElementSibling)
                }
            }
            ,
            Mn([Object(i.Input)(), Fn("design:type", f.d)], e.prototype, "appState", void 0),
            Mn([Object(i.ViewChild)("inspireGr"), Fn("design:type", i.ElementRef)], e.prototype, "inspireElement", void 0),
            Mn([Object(i.ViewChild)("historicGr"), Fn("design:type", i.ElementRef)], e.prototype, "historicElement", void 0),
            Mn([Object(i.ViewChild)("userGr"), Fn("design:type", i.ElementRef)], e.prototype, "userElement", void 0),
            e = Mn([Object(i.Component)({
                selector: "app-layer-list",
                template: n("bOM6"),
                styles: [n("F66t")]
            }), Fn("design:paramtypes", [f.b, s.b, We.b])], e)
        }(), Dn = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , jn = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Gn = function() {
            function e(e, t, n) {
                this.fb = e,
                this.modalService = t,
                this.configService = n,
                this.drawText = "",
                this.menuShown = "",
                this.toolChosen = "",
                this.tooltypeChosen = "",
                this.permissions = ""
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.permissions = this.appState.get("permissions").value,
                "None" !== this.appState.get("drawToolChoice").value ? (this.toolChosen = this.appState.get("drawToolChoice").value,
                this.appState.get("chosenTools").setValue("DRAW"),
                this.tooltypeChosen = "drawTools",
                this.menuShown = "drawTools") : "None" !== this.appState.get("measureToolChoice").value && (this.toolChosen = this.appState.get("measureToolChoice").value,
                this.appState.get("chosenTools").setValue("MESURE"),
                this.tooltypeChosen = "measureTools",
                this.menuShown = "measureTool"),
                "None" !== this.appState.get("spatialAnalysisChoice").value && (this.appState.get("chosenTools").setValue("SPATIAL_ANALYSIS"),
                this.appState.get("vectorActivated").setValue(!0),
                this.toolChosen = this.appState.get("spatialAnalysisChoice").value,
                this.menuShown = "spatialAnalysis"),
                "None" !== this.appState.get("extractionToolChoice").value && (this.appState.get("chosenTools").setValue("EXTRACTION_TOOL"),
                this.appState.get("vectorActivated").setValue(!0),
                this.toolChosen = this.appState.get("extractionToolChoice").value,
                this.menuShown = "extractionTool"),
                "None" !== this.appState.get("structuredSearchChoice").value && (this.appState.get("chosenTools").setValue("STRUCTURED_SEARCH"),
                this.toolChosen = this.appState.get("structuredSearchChoice").value,
                this.menuShown = "structuredSearch"),
                "None" !== this.appState.get("advancedSearchChoice").value && (this.appState.get("chosenTools").setValue("ADVANCED_SEARCH"),
                this.toolChosen = this.appState.get("advancedSearchChoice").value,
                this.menuShown = "advancedSearch"),
                this.appState.get("chosenTools").valueChanges.subscribe(function(t) {
                    "POPUP" === t && e.clearToolChoice()
                })
            }
            ,
            e.prototype.addLabel = function() {
                this.appState.get("drawText").setValue(this.drawText)
            }
            ,
            e.prototype.showMenu = function(e) {
                this.menuShown === e ? this.menuShown = "" : (this.menuShown = e,
                this.appState.get("drawToolChoice").setValue("None"),
                "extractionTool" !== e && "structuredSearch" !== e && "spatialAnalysis" !== e && "advancedSearch" !== e && "capakeySelection" !== e || this.chooseTool(e, e))
            }
            ,
            e.prototype.showSpatialAnalysis = function() {
                return !(this.configService.cadexBundle.active || this.configService.precadBundle.active || this.configService.cdmsBundle.active) || (!(!this.configService.cadexBundle.active || "capakey" === this.configService.cadexBundle.selectType) || !this.configService.precadBundle.active && !!this.configService.cdmsBundle.active)
            }
            ,
            e.prototype.showCapakeySelection = function() {
                return !!(this.configService.cadexBundle.active || this.configService.precadBundle.active || this.configService.cdmsBundle.active) && (!!this.configService.cdmsBundle.active || (!!this.configService.precadBundle.active || !(!this.configService.cadexBundle.active || "capakey" !== this.configService.cadexBundle.selectType)))
            }
            ,
            e.prototype.cadexCapakeySelection = function() {
                return this.configService.cadexBundle.active && "capakey" === this.configService.cadexBundle.selectType
            }
            ,
            e.prototype.chooseTool = function(e, t) {
                this.appState.get("spatialAnalysisCapakeySelection").setValue(!1),
                "capakeySelection" === t && (this.appState.get("drawFeaturesResultsLayerOn").setValue(!1),
                this.appState.get("spatialAnalysisCapakeySelection").setValue(!0)),
                this.toolChosen === t && this.tooltypeChosen === e ? (this.toolChosen = "",
                this.tooltypeChosen = "",
                this.clearToolChoice(),
                this.appState.get("chosenTools").setValue("NONE")) : (this.toolChosen = t,
                this.tooltypeChosen === e ? "drawTools" === this.tooltypeChosen ? (this.appState.get("drawToolChoice").setValue(t),
                this.appState.get("vectorActivated").setValue(!1)) : "measureTools" === this.tooltypeChosen ? (this.appState.get("measureToolChoice").setValue(t),
                this.appState.get("vectorActivated").setValue(!1)) : "spatialAnalysis" === this.tooltypeChosen ? (this.appState.get("spatialAnalysisChoice").setValue(t),
                this.appState.get("vectorActivated").setValue(!0)) : "capakeySelection" === this.tooltypeChosen ? (this.appState.get("spatialAnalysisChoice").setValue(t),
                this.appState.get("vectorActivated").setValue(!0)) : "extractionTool" === this.tooltypeChosen ? (this.appState.get("extractionToolChoice").setValue(t),
                this.appState.get("vectorActivated").setValue(!0)) : "structuredSearch" === this.tooltypeChosen ? (this.appState.get("structuredSearchChoice").setValue(t),
                this.appState.get("vectorActivated").setValue(!0)) : "advancedSearch" === this.tooltypeChosen && (this.appState.get("advancedSearchChoice").setValue(t),
                this.appState.get("vectorActivated").setValue(!1)) : (this.clearToolChoice(),
                this.tooltypeChosen = e,
                "drawTools" === this.tooltypeChosen ? (this.appState.get("chosenTools").setValue("DRAW"),
                this.appState.get("drawToolChoice").setValue(t),
                this.appState.get("vectorActivated").setValue(!1)) : "measureTools" === this.tooltypeChosen ? (this.appState.get("chosenTools").setValue("MESURE"),
                this.appState.get("measureToolChoice").setValue(t),
                this.appState.get("vectorActivated").setValue(!1)) : "spatialAnalysis" === this.tooltypeChosen ? (this.appState.get("chosenTools").setValue("SPATIAL_ANALYSIS"),
                this.appState.get("vectorActivated").setValue(!0),
                this.appState.get("spatialAnalysisChoice").setValue(t)) : "capakeySelection" === this.tooltypeChosen ? (this.appState.get("chosenTools").setValue("SPATIAL_ANALYSIS"),
                this.appState.get("vectorActivated").setValue(!0),
                this.appState.get("spatialAnalysisChoice").setValue(t)) : "extractionTool" === this.tooltypeChosen ? (this.appState.get("chosenTools").setValue("EXTRACTION_TOOL"),
                this.appState.get("vectorActivated").setValue(!0),
                this.appState.get("extractionToolChoice").setValue(t)) : "structuredSearch" === this.tooltypeChosen ? (this.appState.get("chosenTools").setValue("STRUCTURED_SEARCH"),
                this.appState.get("vectorActivated").setValue(!0),
                this.appState.get("structuredSearchChoice").setValue(t)) : "advancedSearch" === this.tooltypeChosen && (this.appState.get("chosenTools").setValue("ADVANCED_SEARCH"),
                this.appState.get("advancedSearchChoice").setValue(t),
                this.appState.get("vectorActivated").setValue(!1))))
            }
            ,
            e.prototype.showTextStyleMenuToggle = function() {
                this.modalService.open(Je).componentInstance.appState = this.appState
            }
            ,
            e.prototype.clearToolChoice = function() {
                this.appState.get("measureToolChoice").setValue("None"),
                this.appState.get("drawToolChoice").setValue("None"),
                this.appState.get("spatialAnalysisChoice").setValue("None"),
                this.appState.get("extractionToolChoice").setValue("None"),
                this.appState.get("structuredSearchChoice").setValue("None"),
                this.appState.get("advancedSearchChoice").setValue("None"),
                this.appState.get("spatialSearchOption").setValue("None"),
                this.tooltypeChosen = ""
            }
            ,
            e.prototype.isDrawToolsInConfig = function() {
                return this.configService.getConfig().menus.toolsMenu.drawtools
            }
            ,
            e.prototype.isMesureToolsInConfig = function() {
                return this.configService.getConfig().menus.toolsMenu.mesuretools
            }
            ,
            e.prototype.isAdvancedSearchInConfig = function() {
                return this.configService.getConfig().menus.toolsMenu.localisation
            }
            ,
            e.prototype.isExtractionToolInConfig = function() {
                return this.configService.getConfig().menus.toolsMenu.extractionTool[this.permissions]
            }
            ,
            e.prototype.isStructuredSearchInConfig = function() {
                return this.configService.getConfig().menus.toolsMenu.structuredSearch
            }
            ,
            e.prototype.isAnalyseSpatialInConfig = function() {
                return this.configService.getConfig().menus.toolsMenu.spatialAnalysis
            }
            ,
            Dn([Object(i.Input)(), jn("design:type", f.d)], e.prototype, "appState", void 0),
            e = Dn([Object(i.Component)({
                selector: "app-tools-selection",
                template: n("zxYT"),
                styles: [n("q4gP")]
            }), jn("design:paramtypes", [f.b, We.b, O])], e)
        }(), Bn = n("M4fF"), Un = (n("aTdd"),
        this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        ), zn = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Kn = function() {
            function e(e, t, n) {
                this.fb = e,
                this.activeModal = t,
                this.localisationService = n
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.formGroup = this.fb.group({
                    division: ""
                }),
                this.formGroup.get("division").valueChanges.subscribe(function(t) {
                    /^\d+$/.test(t) ? e.localisationService.getDivisionForID(t).toPromise().then(function(t) {
                        e.divisionResults = t
                    }) : e.localisationService.getDivisionForName(t.trim()).toPromise().then(function(t) {
                        e.divisionResults = t
                    })
                })
            }
            ,
            e.prototype.closeModalWithCadikey = function(e) {
                this.activeModal.close(e)
            }
            ,
            e = Un([Object(i.Component)({
                selector: "app-division-search",
                template: n("Dp02"),
                styles: [n("FTYI")]
            }), zn("design:paramtypes", [f.b, We.a, tt])], e)
        }(), Yn = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Zn = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Wn = function() {
            function e(e, t, n, i, a) {
                var o = this;
                this.fb = e,
                this.localisationService = t,
                this.labelService = n,
                this.notificationService = i,
                this.modalService = a,
                this.footerActive = !0,
                this.menuShown = "",
                this.searchToggle = "",
                this.formatToggle = "DD",
                this.coordSystem = "LB2008",
                this.lambertCoordinatePattern = "^[0-9]*(\\,|\\.)?[0-9]{1,3}$",
                this.decimalCoordinatePattern = "^[0-9]*(\\,|\\.)?[0-9]{1,6}$",
                this.secondesCoordinatePattern = "^[0-9]*(\\,|\\.)?[0-9]{1,3}$",
                this.degreeMinutesCoordinatePattern = "^[0-9]{1,2}$",
                this.x = null,
                this.y = null,
                this.streetsResult = [],
                this.coordinatesResult = [],
                this.capakeyResult = [],
                this.p = 1,
                this.pendingSearch = !1,
                this.situation = "CURRENT",
                this.isLambertSelected = !0,
                this.autoCompleteMap = new Map,
                this.isCoordinatesValid = function(e) {
                    var t = !1;
                    if ("LB2008" == o.coordSystem || "LB72" == o.coordSystem) {
                        var n = e.get("coordPointX")
                          , i = e.get("coordPointY");
                        n && n && (o.x = parseInt(n.value),
                        o.y = parseInt(i.value)),
                        "LB2008" == o.coordSystem ? t = o.x >= 517640.0909822 && o.x <= 797745.149306 && o.y >= 520560.782836 && o.y <= 745912.873533 : "LB72" == o.coordSystem && o.x >= 17707.61138 && o.x <= 297825.220168 && o.y >= 20494.417478 && o.y <= 245838.883595 && (t = !0)
                    } else if ("WGS84" == o.coordSystem || "ETRS89" == o.coordSystem) {
                        if ("DMS" == o.formatToggle) {
                            var a = e.get("degreeLat").value
                              , r = e.get("minutesLat").value
                              , s = e.get("secondesLat").value
                              , l = e.get("degreeLong").value
                              , c = e.get("minutesLong").value
                              , p = e.get("secondesLat").value;
                            o.isUndefined(a) || o.isUndefined(r) || o.isUndefined(s) || o.isUndefined(l) || o.isUndefined(c) || o.isUndefined(p) || (o.decimalDegreeLatitude = o.convertDMSToDecimalDegrees(parseInt(a), parseInt(r), parseInt(s.replace(/,/g, "."))),
                            o.decimalDegreeLongitude = o.convertDMSToDecimalDegrees(parseInt(l), parseInt(c), parseInt(p.replace(/,/g, "."))),
                            o.x = parseInt(o.decimalDegreeLatitude.toFixed(6)),
                            o.y = parseInt(o.decimalDegreeLongitude.toFixed(6)))
                        } else {
                            n = e.get("latitude"),
                            i = e.get("longitude");
                            n && n && (o.x = parseInt(n.value),
                            o.y = parseInt(i.value))
                        }
                        "WGS84" == o.coordSystem && o.y >= 2.541339 && o.y <= 6.408098 && o.x >= 49.496883 && o.x <= 51.505114 ? t = !0 : "ETRS89" == o.coordSystem && o.y >= 2.541339 && o.y <= 6.408098 && o.x >= 49.496883 && o.x <= 51.505114 && (t = !0)
                    }
                    return Number.isInteger(o.x) && Number.isInteger(o.y) && t ? null : {
                        coordinatesValid: !0
                    }
                }
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.streetSearch = this.fb.group({
                    localiteCP: "",
                    rue: "",
                    numero: ""
                }),
                this.capakeySearch = this.fb.group({
                    division: "",
                    section: "",
                    radical: "",
                    exposant_alpha: "",
                    exposant_num: "",
                    numBis: ""
                }),
                this.coordinateSystemSearchForm = this.fb.group({
                    coordSystem: [""]
                }),
                this.coordinateXYSearchForm = this.fb.group({
                    coordSystem: [""],
                    coordPointX: ["", f.i.compose([f.i.required, f.i.pattern(this.lambertCoordinatePattern)])],
                    coordPointY: ["", f.i.compose([f.i.required, f.i.pattern(this.lambertCoordinatePattern)])]
                }, {
                    validator: this.isCoordinatesValid
                }),
                this.coordinateLatLonSearchForm = this.fb.group({
                    coordSystem: [""],
                    latitude: ["", f.i.compose([f.i.required, f.i.pattern(this.decimalCoordinatePattern)])],
                    longitude: ["", f.i.compose([f.i.required, f.i.pattern(this.decimalCoordinatePattern)])]
                }, {
                    validator: this.isCoordinatesValid
                }),
                this.coordinateLatLonDMSSearchForm = this.fb.group({
                    degreeLat: ["", f.i.compose([f.i.required, f.i.pattern(this.degreeMinutesCoordinatePattern)])],
                    minutesLat: ["", f.i.compose([f.i.required, f.i.pattern(this.degreeMinutesCoordinatePattern)])],
                    secondesLat: ["", f.i.compose([f.i.required, f.i.pattern(this.secondesCoordinatePattern)])],
                    degreeLong: ["", f.i.compose([f.i.required, f.i.pattern(this.degreeMinutesCoordinatePattern)])],
                    minutesLong: ["", f.i.compose([f.i.required, f.i.pattern(this.degreeMinutesCoordinatePattern)])],
                    secondesLong: ["", f.i.compose([f.i.required, f.i.pattern(this.secondesCoordinatePattern)])]
                }, {
                    validator: this.isCoordinatesValid
                }),
                this.capakeySearch.get("division").valueChanges.filter(function(e) {
                    return e.length >= 5
                }).subscribe(function(t) {
                    e.capakeySearch.get("exposant_num").setValue(""),
                    e.capakeySearch.get("exposant_alpha").setValue(""),
                    e.capakeySearch.get("section").setValue(""),
                    e.capakeySearch.get("radical").setValue(""),
                    e.capakeySearch.get("numBis").setValue("");
                    var n = e.generatePatternFromSearch();
                    e.localisationService.getCapakeysForPattern(n).subscribe(function(t) {
                        e.fillAutocompleteMap(t, "section", 5, 1)
                    })
                }),
                this.capakeySearch.get("division").valueChanges.subscribe(function(t) {
                    e.capakeySearch.get("exposant_num").setValue(""),
                    e.capakeySearch.get("exposant_alpha").setValue(""),
                    e.capakeySearch.get("section").setValue(""),
                    e.capakeySearch.get("radical").setValue(""),
                    e.capakeySearch.get("numBis").setValue("")
                }),
                this.capakeySearch.get("section").valueChanges.distinctUntilChanged().subscribe(function(t) {
                    var n = e.generatePatternFromSearch();
                    e.capakeySearch.get("radical").setValue(""),
                    e.capakeySearch.get("numBis").setValue(""),
                    e.capakeySearch.get("exposant_alpha").setValue(""),
                    e.capakeySearch.get("exposant_num").setValue(""),
                    0 !== t.length && (e.autoCompleteMap.set("section", []),
                    e.localisationService.getCapakeysForPattern(n).subscribe(function(t) {
                        e.fillAutocompleteMap(t, "radical", 6, 4)
                    }))
                }),
                this.capakeySearch.get("radical").valueChanges.distinctUntilChanged().filter(function(e) {
                    return 0 !== e.length && e.length < 4
                }).subscribe(function(t) {
                    var n = e.generatePatternFromSearch();
                    e.capakeySearch.get("numBis").setValue(""),
                    e.capakeySearch.get("exposant_alpha").setValue(""),
                    e.capakeySearch.get("exposant_num").setValue(""),
                    n.replace(/_/g, "").length < 5 || e.localisationService.getCapakeysForPattern(n).subscribe(function(t) {
                        e.fillAutocompleteMap(t, "radical", 6, 4)
                    })
                }),
                this.capakeySearch.get("radical").valueChanges.distinctUntilChanged().filter(function(e) {
                    return e.length >= 4
                }).subscribe(function(t) {
                    var n = e.generatePatternFromSearch();
                    e.autoCompleteMap.set("radical", []),
                    e.localisationService.getCapakeysForPattern(n).subscribe(function(t) {
                        e.fillAutocompleteMap(t, "numBis", 11, 2)
                    })
                }),
                this.capakeySearch.get("numBis").valueChanges.distinctUntilChanged().filter(function(e) {
                    return 0 !== e.length && e.length < 2
                }).subscribe(function(t) {
                    var n = e.generatePatternFromSearch()
                      , i = n.replace(/_/g, "");
                    e.capakeySearch.get("exposant_alpha").setValue(""),
                    e.capakeySearch.get("exposant_num").setValue(""),
                    i.length < 5 || e.localisationService.getCapakeysForPattern(n).subscribe(function(t) {
                        e.fillAutocompleteMap(t, "numBis", 11, 2)
                    })
                }),
                this.capakeySearch.get("numBis").valueChanges.distinctUntilChanged().filter(function(e) {
                    return 2 == e.length
                }).subscribe(function(t) {
                    var n = e.generatePatternFromSearch();
                    n.replace(/_/g, "").length < 5 || (e.autoCompleteMap.set("numBis", []),
                    e.localisationService.getCapakeysForPattern(n).subscribe(function(t) {
                        e.fillAutocompleteMap(t, "exposant_alpha", 13, 1)
                    }))
                }),
                this.capakeySearch.get("exposant_alpha").valueChanges.distinctUntilChanged().filter(function(e) {
                    return 1 == e.length
                }).subscribe(function(t) {
                    var n = e.generatePatternFromSearch();
                    e.autoCompleteMap.set("exposant_alpha", []),
                    e.capakeySearch.get("exposant_num").setValue(""),
                    e.localisationService.getCapakeysForPattern(n).subscribe(function(t) {
                        e.fillAutocompleteMap(t, "exposant_num", 14, 3)
                    })
                }),
                this.capakeySearch.get("exposant_num").valueChanges.distinctUntilChanged().filter(function(e) {
                    return 0 !== e.length && e.length < 3
                }).subscribe(function(t) {
                    var n = e.generatePatternFromSearch();
                    n.replace(/_/g, "").length < 5 || e.localisationService.getCapakeysForPattern(n).subscribe(function(t) {
                        e.fillAutocompleteMap(t, "exposant_num", 14, 3)
                    })
                }),
                this.resetAutoCompleteMap()
            }
            ,
            e.prototype.showMenu = function(e) {
                this.menuShown === e ? this.menuShown = "" : this.menuShown = e
            }
            ,
            e.prototype.resetAutoCompleteMap = function() {
                this.autoCompleteMap.set("section", []),
                this.autoCompleteMap.set("radical", []),
                this.autoCompleteMap.set("numBis", []),
                this.autoCompleteMap.set("exposant_alpha", []),
                this.autoCompleteMap.set("exposant_num", [])
            }
            ,
            e.prototype.resetSearchFields = function() {
                this.autoCompleteMap = new Map,
                this.resetAutoCompleteMap(),
                this.streetSearch.get("localiteCP").setValue(""),
                this.streetSearch.get("rue").setValue(""),
                this.streetSearch.get("numero").setValue(""),
                this.capakeySearch.get("division").setValue(""),
                this.capakeySearch.get("section").setValue(""),
                this.capakeySearch.get("radical").setValue(""),
                this.capakeySearch.get("numBis").setValue(""),
                this.capakeySearch.get("exposant_alpha").setValue(""),
                this.capakeySearch.get("exposant_num").setValue(""),
                this.formatToggle = "DD",
                this.x = null,
                this.y = null,
                this.coordinateXYSearchForm.reset(),
                this.coordinateLatLonSearchForm.reset(),
                this.coordinateLatLonDMSSearchForm.reset()
            }
            ,
            e.prototype.numberOnly = function(e) {
                var t = e.which ? e.which : e.keyCode;
                return !(t > 31 && (t < 48 || t > 57))
            }
            ,
            e.prototype.fillAutocompleteMap = function(e, t, n, i) {
                if (null !== e && 0 !== e.length) {
                    var a = [];
                    e.forEach(function(e) {
                        var t = {
                            streetName: "",
                            city: "",
                            zipCode: ""
                        };
                        t.streetName = e.substr(n, i),
                        a.push(t)
                    }),
                    a = Bn.uniqBy(a, "streetName"),
                    this.resetAutoCompleteMap(),
                    this.autoCompleteMap.set(t, a)
                }
            }
            ,
            e.prototype.search = function() {
                var e = this;
                if ("street" === this.searchToggle)
                    if ("" === this.streetSearch.get("rue").value && "" === this.streetSearch.get("numero").value && "" === this.streetSearch.get("localiteCP").value)
                        this.notificationService.notify("error", "NOTIFICATION.EMPTY_SEARCH");
                    else {
                        this.pendingSearch = !0,
                        this.appState.get("pendingLoading").setValue(this.pendingSearch);
                        var t = "";
                        this.streetSearch.get("rue").value && (t += this.streetSearch.get("rue").value + " "),
                        this.streetSearch.get("numero").value && (t += this.streetSearch.get("numero").value + " "),
                        this.streetSearch.get("localiteCP").value && (t += this.streetSearch.get("localiteCP").value),
                        this.localisationService.getSuggestionForAdress(t).subscribe(function(t) {
                            null === t ? e.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT") : (t = e.removeAddrSearchDuplicates(t),
                            e.streetsResult = t,
                            e.pendingSearch = !1,
                            e.appState.get("pendingLoading").setValue(e.pendingSearch))
                        })
                    }
                else if ("capakey" === this.searchToggle) {
                    this.pendingSearch = !0,
                    this.appState.get("pendingLoading").setValue(this.pendingSearch);
                    var n = this.generatePatternFromSearch();
                    n.replace(/_/g, "").length < 5 ? (this.notificationService.notify("error", "NOTIFICATION.CAPAKEY_PATTERN_TOO_SHORT"),
                    this.pendingSearch = !1,
                    this.appState.get("pendingLoading").setValue(this.pendingSearch)) : this.localisationService.getCapakeysForPattern(n).subscribe(function(t) {
                        null !== t && 0 !== t.length ? (e.capakeyResult = t,
                        e.situation = "CURRENT",
                        e.pendingSearch = !1,
                        e.appState.get("pendingLoading").setValue(e.pendingSearch)) : e.localisationService.getFiscalCapakeyForPattern(n).subscribe(function(t) {
                            null !== t && 0 !== t.length ? (e.capakeyResult = t,
                            e.situation = "FISCAL",
                            e.pendingSearch = !1,
                            e.appState.get("pendingLoading").setValue(e.pendingSearch)) : (e.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                            e.pendingSearch = !1,
                            e.appState.get("pendingLoading").setValue(e.pendingSearch))
                        })
                    })
                } else
                    "coordinates" === this.searchToggle ? (this.pendingSearch = !0,
                    this.appState.get("pendingLoading").setValue(this.pendingSearch),
                    this.coordinateXYSearchForm.valid ? (this.coordinatesResult = [],
                    this.coordinatesResult.push({
                        coordSystem: this.coordSystem,
                        valueX: this.x,
                        valueY: this.y
                    }),
                    this.pendingSearch = !1,
                    this.appState.get("pendingLoading").setValue(this.pendingSearch)) : (this.notificationService.notify("error", "NOTIFICATION.INVALID_INPUT_VALUES"),
                    this.pendingSearch = !1,
                    this.appState.get("pendingLoading").setValue(this.pendingSearch))) : this.notificationService.notify("error", "NOTIFICATION.MAKE_CHOICE")
            }
            ,
            e.prototype.convertDMSToDecimalDegrees = function(e, t, n) {
                return e + t / 60 + n / 3600
            }
            ,
            e.prototype.removeAddrSearchDuplicates = function(e) {
                var t, n, i = [];
                for (t = 0; t < e.length; t++)
                    for (n = t + 1; n < e.length; n++)
                        e[t].streetName === e[n].streetName && e[t].houseNumber === e[n].houseNumber && e[t].zipCode === e[n].zipCode && e[t].city === e[n].city && i.push(n);
                for (t = i.length - 1; t >= 0; t--)
                    e.splice(i[t], 1);
                return e
            }
            ,
            e.prototype.goToCoordinatesResult = function(e) {
                this.appState.get("searchResultCoordinates").setValue(e),
                this.showAdvancedSearchMenu()
            }
            ,
            e.prototype.goToStreetResult = function(e) {
                this.appState.get("searchResultStreet").setValue(e),
                this.showAdvancedSearchMenu()
            }
            ,
            e.prototype.goToCapakeyResult = function(e) {
                var t = this;
                this.localisationService.getCoordinatesFromCapakey(e).subscribe(function(n) {
                    t.localisationService.getCenterOfParcels(n).subscribe(function(n) {
                        t.appState.get("searchResultCapakey").setValue({
                            coord: [Number(n.labelPoints[0].x), Number(n.labelPoints[0].y)],
                            capakey: e
                        }),
                        t.showAdvancedSearchMenu()
                    })
                })
            }
            ,
            e.prototype.generatePatternFromSearch = function() {
                return ("" === this.capakeySearch.get("division").value ? "_____" : this.getValueAndFillSpace(this.capakeySearch.get("division").value, 5)) + ("" === this.capakeySearch.get("section").value ? "_" : this.getValueAndFillSpace(this.capakeySearch.get("section").value, 1)) + ("" === this.capakeySearch.get("radical").value ? "____" : this.getRadicalValueAndFillSpace(this.capakeySearch.get("radical").value, 4)) + "/" + ("" === this.capakeySearch.get("numBis").value ? "__" : this.getValueAndFillSpace(this.capakeySearch.get("numBis").value, 2)) + ("" === this.capakeySearch.get("exposant_alpha").value ? "_" : this.getValueAndFillSpace(this.capakeySearch.get("exposant_alpha").value, 1)) + ("" === this.capakeySearch.get("exposant_num").value ? "___" : this.getValueAndFillSpace(this.capakeySearch.get("exposant_num").value, 3))
            }
            ,
            e.prototype.setSearchValue = function(e) {
                this.searchToggle = e,
                this.isLambertSelected = !0,
                this.coordSystem = "LB2008"
            }
            ,
            e.prototype.setSearchFormat = function(e) {
                this.formatToggle = e,
                this.isLambertSelected = !1
            }
            ,
            e.prototype.getValueAndFillSpace = function(e, t) {
                return e.padEnd(t, "_")
            }
            ,
            e.prototype.getRadicalValueAndFillSpace = function(e, t) {
                return e = "%" + e + "%"
            }
            ,
            e.prototype.showAdvancedSearchMenu = function() {
                this.appState.get("mapLoading").value || this.footerActive && this.appState.get("showAdvancedSearch").setValue(!this.appState.get("showAdvancedSearch").value)
            }
            ,
            e.prototype.openDivisionModal = function() {
                var e = this;
                this.modalService.open(Kn, {
                    size: "lg"
                }).result.then(function(t) {
                    null != t && e.capakeySearch.get("division").setValue(t)
                })
            }
            ,
            e.prototype.getLang = function() {
                return this.labelService.lang.value
            }
            ,
            e.prototype.selectInput = function(e) {
                this.coordSystem = e.target.value,
                "LB2008" == this.coordSystem || "LB72" == this.coordSystem ? this.isLambertSelected = !0 : this.isLambertSelected = !1
            }
            ,
            e.prototype.isValidCoordinates = function(e, t) {
                return "LB2008" == this.coordSystem && e >= 517640.0909822 && e <= 797745.149306 && t >= 520560.782836 && t <= 745912.873533 || ("LB72" == this.coordSystem && e >= 17707.61138 && e <= 297825.220168 && t >= 20494.417478 && t <= 245838.883595 || ("WGS84" == this.coordSystem && t >= 2.541339 && t <= 6.408098 && e >= 49.496883 && e <= 51.505114 || "ETRS89" == this.coordSystem && t >= 2.541339 && t <= 6.408098 && e >= 49.496883 && e <= 51.505114))
            }
            ,
            e.prototype.isUndefined = function(e) {
                return "undefined" == typeof e || null === e
            }
            ,
            Yn([Object(i.Input)(), Zn("design:type", f.d)], e.prototype, "appState", void 0),
            Yn([Object(i.Input)(), Zn("design:type", Boolean)], e.prototype, "footerActive", void 0),
            e = Yn([Object(i.Component)({
                selector: "app-advanced-search",
                template: n("EhFC"),
                styles: [n("97SK")]
            }), Zn("design:paramtypes", [f.b, tt, s.b, p, We.b])], e)
        }(), Hn = n("Sv3W"), Xn = function() {
            function e() {
                this.ali_AdBo = new Map([["ROLE", new Map([["4", "ali_adbo.role.4"], ["3", "ali_adbo.role.3"], ["2", "ali_adbo.role.2"], ["1", "ali_adbo.role.1"], ["0", "ali_adbo.role.0"]])], ["LEGSTATUS", new Map([["AG", "ali_adbo.LegStatus.AG"], ["NA", "ali_adbo.LegStatus.NA"], ["UN", "ali_adbo.LegStatus.UN"], ["AS", "ali_adbo.LegStatus.AS"]])], ["TECHSTATUS", new Map([["EM", "ali_adbo.TechStatus.EM"], ["NE", "ali_adbo.TechStatus.NE"], ["UN", "ali_adbo.TechStatus.UN"]])], ["QUALITY", new Map([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"]])], ["ORIGIN", new Map([["0", "ali_adbo.Origin.0"], ["160", "ali_adbo.Origin.160"], ["300", "ali_adbo.Origin.300"], ["301", "ali_adbo.Origin.301"], ["302", "ali_adbo.Origin.302"], ["303", "ali_adbo.Origin.303"]])]]),
                this.apt_AdSt = new Map([["TYPE", new Map([["MB", "apt_adst.type.mb"], ["PB", "apt_adst.type.pb"], ["SB", "apt_adst.type.sb"]])]]),
                this.bpn_CaBu = new Map([["FISCSITID", new Map([["1", "fiscsitid.1"], ["2", "fiscsitid.2"], ["3", "fiscsitid.3"], ["4", "fiscsitid.4"], ["5", "fiscsitid.5"], ["6", "fiscsitid.6"], ["7", "fiscsitid.7"], ["8", "fiscsitid.8"], ["9", "fiscsitid.9"], ["10", "fiscsitid.10"], ["11", "fiscsitid.11"], ["12", "fiscsitid.12"], ["13", "fiscsitid.13"], ["14", "fiscsitid.14"], ["15", "fiscsitid.15"], ["16", "fiscsitid.16"]])], ["TYPE", new Map([["CL", "bpn_cabu.type.cl"], ["ON", "bpn_cabu.type.on"], ["OO", "bpn_cabu.type.oo"], ["UN", "bpn_cabu.type.un"]])]]),
                this.bpn_Eqto = new Map([["FISCSITID", new Map([["1", "fiscsitid.1"], ["2", "fiscsitid.2"], ["3", "fiscsitid.3"], ["4", "fiscsitid.4"], ["5", "fiscsitid.5"], ["6", "fiscsitid.6"], ["7", "fiscsitid.7"], ["8", "fiscsitid.8"], ["9", "fiscsitid.9"], ["10", "fiscsitid.10"], ["11", "fiscsitid.11"], ["12", "fiscsitid.12"], ["13", "fiscsitid.13"], ["14", "fiscsitid.14"], ["15", "fiscsitid.15"], ["16", "fiscsitid.16"]])]]),
                this.bpn_CaVo = new Map([["FISCSITID", new Map([["1", "fiscsitid.1"], ["2", "fiscsitid.2"], ["3", "fiscsitid.3"], ["4", "fiscsitid.4"], ["5", "fiscsitid.5"], ["6", "fiscsitid.6"], ["7", "fiscsitid.7"], ["8", "fiscsitid.8"], ["9", "fiscsitid.9"], ["10", "fiscsitid.10"], ["11", "fiscsitid.11"], ["12", "fiscsitid.12"], ["13", "fiscsitid.13"], ["14", "fiscsitid.14"], ["15", "fiscsitid.15"], ["16", "fiscsitid.16"]])]]),
                this.Gpn_SuDo = new Map([["COORDSYS", new Map([["LOC", "gpn_plge.coordsys.lc"], ["L50", "gpn_plge.coordsys.lb50"], ["L72", "gpn_plge.coordsys.lb72"], ["L08", "gpn_plge.coordsys.lb2008"], ["OTH", "gpn_plge.coordsys.other"], ["UNK", "gpn_plge.coordsys.unknown"]])]]),
                this.bpn_Capa = new Map([["SUVACNTYPE", new Map([["VE", "bpn_capa.suvacntype.ve"], ["ME", "bpn_capa.suvacntype.me"], ["TI", "bpn_capa.suvacntype.ti"], ["GR", "bpn_capa.suvacntype.gr"]])], ["FISCSITID", new Map([["1", "fiscsitid.1"], ["2", "fiscsitid.2"], ["3", "fiscsitid.3"], ["4", "fiscsitid.4"], ["5", "fiscsitid.5"], ["6", "fiscsitid.6"], ["7", "fiscsitid.7"], ["8", "fiscsitid.8"], ["9", "fiscsitid.9"], ["10", "fiscsitid.10"], ["11", "fiscsitid.11"], ["12", "fiscsitid.12"], ["13", "fiscsitid.13"], ["14", "fiscsitid.14"], ["15", "fiscsitid.15"], ["16", "fiscsitid.16"]])]]),
                this.bpn_Pwzo = new Map([["TYPE", new Map([["P", "bpn_pwzo.type.p"], ["W", "bpn_pwzo.type.w"]])]]),
                this.bpn_Razo = new Map([["STATUS", new Map([["1", "bpn_razo.status.1"], ["2", "bpn_razo.status.2"], ["3", "bpn_razo.status.3"], ["4", "bpn_razo.status.4"], ["5", "bpn_razo.status.5"], ["6", "bpn_razo.status.6"], ["7", "bpn_razo.status.7"], ["10", "bpn_razo.status.10"], ["11", "bpn_razo.status.11"], ["12", "bpn_razo.status.12"]])]]),
                this.bpn_Rebu = new Map([["TYPE", new Map([["BU", "bpn_rebu.type.building"], ["ST", "bpn_rebu.type.structure"], ["UN", "bpn_rebu.type.undefined"]])]]),
                this.wpt_InCo = new Map([["STATUS", new Map([["0", "wpt_inco.status.0"], ["1", "wpt_inco.status.1"], ["2", "wpt_inco.status.2"], ["3", "wpt_inco.status.3"]])], ["REQUESTTYPE", new Map([["12", "wpt_inco.requestType.1B"], ["13", "wpt_inco.requestType.1C"], ["14", "wpt_inco.requestType.1D"]])]]),
                this.bpn_PwZo = new Map([["TYPE", new Map([["PO", "bpn_pwzo.type.P"], ["WA", "bpn_pwzo.type.W"]])]]),
                this.bpn_CaBl = new Map([["TYPE", new Map([["U", "bpn_cabl.type.U"], ["R", "bpn_cabl.type.R"]])], ["QUALITY", new Map([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"]])]]),
                this.ali_CaBo = new Map([["FISCSITID", new Map([["1", "fiscsitid.1"], ["2", "fiscsitid.2"], ["3", "fiscsitid.3"], ["4", "fiscsitid.4"], ["5", "fiscsitid.5"], ["6", "fiscsitid.6"], ["7", "fiscsitid.7"], ["8", "fiscsitid.8"], ["9", "fiscsitid.9"], ["10", "fiscsitid.10"], ["11", "fiscsitid.11"], ["12", "fiscsitid.12"], ["13", "fiscsitid.13"], ["14", "fiscsitid.14"], ["15", "fiscsitid.15"], ["16", "fiscsitid.16"]])], ["ORIGIN", new Map([["0", "ali_adbo.Origin.0"], ["100", "ali_adbo.Origin.100"], ["102", "ali_adbo.Origin.102"], ["109", "ali_adbo.Origin.109"], ["110", "ali_adbo.Origin.110"], ["112", "ali_adbo.Origin.112"], ["120", "ali_adbo.Origin.120"], ["121", "ali_adbo.Origin.121"], ["130", "ali_adbo.Origin.130"], ["140", "ali_adbo.Origin.140"], ["141", "ali_adbo.Origin.141"], ["142", "ali_adbo.Origin.142"], ["143", "ali_adbo.Origin.143"], ["150", "ali_adbo.Origin.150"], ["211", "ali_adbo.Origin.211"], ["160", "ali_adbo.Origin.160"], ["300", "ali_adbo.Origin.300"], ["301", "ali_adbo.Origin.301"], ["302", "ali_adbo.Origin.302"], ["303", "ali_adbo.Origin.303"]])]]),
                this.converterMap = new Map,
                this.converterMap.set("ALI_ADCO", this.ali_AdBo),
                this.converterMap.set("ALI_ADRE", this.ali_AdBo),
                this.converterMap.set("ALI_ADPR", this.ali_AdBo),
                this.converterMap.set("ALI_ADAR", this.ali_AdBo),
                this.converterMap.set("ALI_ADMU", this.ali_AdBo),
                this.converterMap.set("APT_ADST", this.apt_AdSt),
                this.converterMap.set("BPT_PRST", this.apt_AdSt),
                this.converterMap.set("BPN_CABU", this.bpn_CaBu),
                this.converterMap.set("BPN_EQTO", this.bpn_Eqto),
                this.converterMap.set("BPN_CAPA", this.bpn_Capa),
                this.converterMap.set("BPN_PWZO", this.bpn_Pwzo),
                this.converterMap.set("BPN_RAZO", this.bpn_Razo),
                this.converterMap.set("BPN_REBU", this.bpn_Rebu),
                this.converterMap.set("WPT_INCO", this.wpt_InCo),
                this.converterMap.set("GPN_SUDO", this.Gpn_SuDo),
                this.converterMap.set("BPN_CABL", this.bpn_CaBl),
                this.converterMap.set("ALI_CADI", this.ali_CaBo),
                this.converterMap.set("ALI_CASE", this.ali_CaBo),
                this.converterMap.set("BPN_CAVO", this.bpn_CaVo)
            }
            return e.prototype.getConvertedValue = function(e, t, n) {
                return null !== t && this.converterMap.get(t).get(e).get(n) ? this.converterMap.get(t).get(e).get(n) : n
            }
            ,
            e.prototype.getConverterMap = function() {
                return this.converterMap
            }
            ,
            e
        }(), Jn = n("4QhX"), qn = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Qn = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , $n = function() {
            function e(e) {
                this.http = e
            }
            return e.prototype.goDataToCadex = function(e) {
                return this.http.get(e)
            }
            ,
            e = qn([Object(i.Injectable)(), Qn("design:paramtypes", [S.a])], e)
        }(), ei = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , ti = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , ni = function() {
            function e(e) {
                this.http = e
            }
            return e.prototype.goDataToPrecad = function(e) {
                return this.http.get(e)
            }
            ,
            e = ei([Object(i.Injectable)(), ti("design:paramtypes", [S.a])], e)
        }(), ii = n("t4zo"), ai = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , oi = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , ri = function() {
            function e(e, t) {
                this.http = e,
                this.notif = t
            }
            return e.prototype.getDocumentPDFById = function(e) {
                var t = this;
                this.pending = !0,
                this.http.post(C.DOCUMENT, e, {
                    responseType: "blob"
                }).catch(function(e) {
                    return t.notif.notify("error", "NOTIFICATION_DOCUMENT_PDF_NOT_FOUND"),
                    t.pending = !1,
                    Ft.Observable.empty()
                }).subscribe(function(n) {
                    0 === n.size ? (t.notif.notify("error", "NOTIFICATION_DOCUMENT_PDF_NOT_FOUND"),
                    t.pending = !1) : (Object(ii.saveAs)(n, e + ".pdf"),
                    t.pending = !1)
                })
            }
            ,
            e.prototype.getSketchById = function(e) {
                var t = this;
                this.pending = !0,
                this.http.post(C.SKETCH, e, {
                    responseType: "blob"
                }).catch(function(e) {
                    return t.notif.notify("error", "NOTIFICATION_DOCUMENT_PDF_NOT_FOUND"),
                    t.pending = !1,
                    Ft.Observable.empty()
                }).subscribe(function(n) {
                    0 === n.size ? (t.notif.notify("error", "NOTIFICATION_DOCUMENT_PDF_NOT_FOUND"),
                    t.pending = !1) : (Object(ii.saveAs)(n, e + ".pdf"),
                    t.pending = !1)
                })
            }
            ,
            e = ai([Object(i.Injectable)(), oi("design:paramtypes", [S.a, p])], e)
        }(), si = n("XWX1"), li = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , ci = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , pi = function() {
            function e(e) {
                this.http = e
            }
            return e.prototype.goDataToCdms = function(e) {
                return this.http.get(e)
            }
            ,
            e = li([Object(i.Injectable)(), ci("design:paramtypes", [S.a])], e)
        }(), ui = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , di = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , gi = this && this.__awaiter || function(e, t, n, i) {
            return new (n || (n = Promise))(function(a, o) {
                function r(e) {
                    try {
                        l(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        l(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function l(e) {
                    e.done ? a(e.value) : new n(function(t) {
                        t(e.value)
                    }
                    ).then(r, s)
                }
                l((i = i.apply(e, t || [])).next())
            }
            )
        }
        , hi = this && this.__generator || function(e, t) {
            var n, i, a, o, r = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; r; )
                            try {
                                if (n = 1,
                                i && (a = i[2 & o[0] ? "return" : o[0] ? "throw" : "next"]) && !(a = a.call(i, o[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (o = [0, a.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    a = o;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(a = (a = r.trys).length > 0 && a[a.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!a || o[1] > a[0] && o[1] < a[3])) {
                                        r.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && r.label < a[1]) {
                                        r.label = a[1],
                                        a = o;
                                        break
                                    }
                                    if (a && r.label < a[2]) {
                                        r.label = a[2],
                                        r.ops.push(o);
                                        break
                                    }
                                    a[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                o = t.call(e, r)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                n = a = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        }
        , fi = function() {
            function e(e, t, n, a, o, r, s, l, c) {
                this.setupService = e,
                this.labelService = t,
                this.localisationService = n,
                this.configService = a,
                this.cadexService = o,
                this.precadService = r,
                this.cdmsService = s,
                this.documentService = l,
                this.notificationService = c,
                this.onClose = new i.EventEmitter,
                this.onHide = new i.EventEmitter,
                this.isParcelLayer = !1,
                this.parcelId = [],
                this.dtOptions = {},
                this.resultEntities = [],
                this.hidden = !1,
                this.pending = !1,
                this.tableName = "",
                this.filteredKeys = [],
                this.filteredResultEntities = [],
                this.capakeysResultList = [],
                this.translatedLabel = "",
                this.translatedKeys = [],
                this.translatedResultEntities = []
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.tableName = null !== this.appState.get("searchResultTable").value ? this.appState.get("searchResultTable").value : "BPN_CAPA",
                this.resultEntities = this.appState.get("searchResultList").value,
                this.filterResult(),
                this.appState.get("searchResultList").valueChanges.subscribe(function(t) {
                    setTimeout(function() {
                        e.tableName = null !== e.appState.get("searchResultTable").value ? e.appState.get("searchResultTable").value : "BPN_CAPA",
                        e.resultEntities = t,
                        e.filterResult()
                    })
                }),
                "BPN_CAPA" === this.tableName ? this.isParcelLayer = !0 : this.isParcelLayer = !1;
                var t = this;
                "FR" === this.getLang() ? this.languageUrl = "assets/datatables/French.json" : "NL" === this.getLang() ? this.languageUrl = "assets/datatables/Dutch.json" : "DE" === this.getLang() ? this.languageUrl = "assets/datatables/German.json" : "EN" === this.getLang() && (this.languageUrl = "assets/datatables/English.json"),
                this.dtOptions = {
                    destroy: !0,
                    info: !0,
                    paging: !0,
                    pagingType: "full_numbers",
                    stateSave: !0,
                    colReorder: !0,
                    responsive: !0,
                    scrollY: "200px",
                    dom: '<"float-left"<"fa fa-search searchIconPadding">f><"float-right"B>rt<"row"<"col-sm-3 col-md-3 col-lg-3"l><"col-sm-3 col-md-3 col-lg-3"i><"col-sm-6 col-md-6 col-lg-6"p>>',
                    buttons: {
                        dom: {
                            button: {
                                className: "btn btn-fin01 smallButton"
                            }
                        },
                        buttons: [{
                            id: "myminfin",
                            className: "myminfinClass",
                            text: "Export Myminfin",
                            key: "1",
                            action: function(e, n, i, a) {
                                t.exportMyminfin()
                            }
                        }, {
                            id: "xml",
                            className: "xmlClass",
                            text: "Export XML",
                            key: "1",
                            action: function(e, n, i, a) {
                                t.exportXML()
                            }
                        }, {
                            id: "csv",
                            text: "Export CSV",
                            key: "2",
                            action: function(e, n, i, a) {
                                t.exportResultList()
                            }
                        }]
                    },
                    initComplete: function(e, n) {
                        t.appState.get("pendingLoading").setValue(!1),
                        !0 === t.appState.get("precad").get("active").value && "select" === t.appState.get("precad").get("action").value && null != t.appState.get("precad").get("uid").value && null != t.appState.get("precad").get("returnUrl").value || !0 === t.appState.get("cdms").get("active").value && "select" === t.appState.get("cdms").get("action").value && null != t.appState.get("cdms").get("uid").value && null != t.appState.get("cdms").get("returnUrl").value || !0 === t.appState.get("cadex").get("active").value && ("select" === t.appState.get("cadex").get("action").value || "print" === t.appState.get("cadex").get("action").value) && null != t.appState.get("cadex").get("uid").value && null != t.appState.get("cadex").get("returnUrl").value ? $(".myminfinClass").css("display", "initial") : $(".myminfinClass").css("display", "none"),
                        !0 === t.isParcelLayer ? $(".xmlClass").css("display", "initial") : $(".xmlClass").css("display", "none")
                    },
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        url: this.languageUrl
                    }
                }
            }
            ,
            e.prototype.closeResultList = function() {
                this.resultEntities = [],
                $("#tableData").DataTable().clear(),
                $("#tableData").DataTable().destroy(!1),
                this.hidden = !1,
                this.appState.get("vizualizeResult").setValue(null),
                this.appState.get("spatialSearchResults").setValue({
                    tableName: "",
                    feature: null,
                    zoom: null
                }),
                this.appState.get("displayFeaturesResultsOnMap").setValue(!1),
                this.onClose.emit()
            }
            ,
            e.prototype.hideResultList = function() {
                this.hidden = !this.hidden,
                this.onHide.emit()
            }
            ,
            e.prototype.exportMyminfin = function() {
                this.isPrecadActive() ? this.exportToPrecad() : this.isCadexActive() ? this.exportToCadex() : this.isCdmsActive() && this.exportToCdms()
            }
            ,
            e.prototype.exportXML = function() {
                this.filterResult();
                for (var e = {
                    Input_From_CADGIS: {
                        Vertex: {
                            XY: {}
                        },
                        Sheet: {
                            $: {
                                CaShKey: ""
                            },
                            Parcel: []
                        }
                    }
                }, t = 0; t < this.filteredKeys.length && "capakey" !== this.filteredKeys[t].toLowerCase(); t++)
                    ;
                if (t < this.filteredKeys.length) {
                    for (var n = 0; n < this.resultEntities.length; n++)
                        this.capakeysResultList[n] = this.filteredResultEntities[n][t];
                    this.alphabeticalSort(this.capakeysResultList);
                    for (var i = 0; i < this.resultEntities.length; i++)
                        this.parcelId[i] = {
                            $: {
                                CaPaKey: this.capakeysResultList[i]
                            }
                        },
                        e.Input_From_CADGIS.Sheet.Parcel.push(this.parcelId[i]);
                    this.parcelId = [],
                    this.capakeysResultList = [];
                    var a = new si.Builder({
                        xmldec: {
                            version: "1.0",
                            encoding: "UTF-8"
                        },
                        cdata: !1
                    });
                    this.xml = a.buildObject(e),
                    this.writeXMLFile(this.xml, "exportCadgis")
                }
            }
            ,
            e.prototype.writeXMLFile = function(e, t) {
                var n = new Blob([e],{
                    type: "text/xml;charset=utf8;"
                })
                  , i = document.createElement("a");
                i.href = URL.createObjectURL(n),
                i.setAttribute("visibility", "hidden"),
                i.download = t + ".xml",
                document.body.appendChild(i),
                i.click(),
                document.body.removeChild(i)
            }
            ,
            e.prototype.alphabeticalSort = function(e) {
                for (var t = "", n = 0; n < e.length - 1; n++)
                    for (var i = n + 1; i < e.length; i++)
                        e[n] > e[i] && (t = e[n],
                        e[n] = e[i],
                        e[i] = t)
            }
            ,
            e.prototype.exportResultList = function() {
                this.filterResult(),
                this.translatedResult();
                var e = {
                    fieldSeparator: ";",
                    quoteStrings: '"',
                    decimalseparator: ".",
                    showLabels: !0,
                    showTitle: !0,
                    title: "CadGIS : Export CSV",
                    headers: this.translatedKeys,
                    nullToEmptyString: !0
                };
                new Jn.Angular5Csv(this.translatedResultEntities,"Export-CSV",e)
            }
            ,
            e.prototype.removeEntity = function(e) {
                e > -1 && (this.appState.get("removeFeatureFromResults").setValue(this.resultEntities[e].id),
                this.resultEntities.splice(e, 1),
                this.appState.get("searchResultList").setValue(this.resultEntities),
                $("#tableData").DataTable().row(e).remove(),
                $("#tableData").DataTable().draw(!1)),
                0 === this.resultEntities.length && this.closeResultList()
            }
            ,
            e.prototype.getKeys = function(e) {
                if (void 0 != e)
                    return Object.keys(e)
            }
            ,
            e.prototype.isNotSpatialAnalysis = function() {
                return "None" === this.appState.get("spatialAnalysisType").value
            }
            ,
            e.prototype.isVisualizePending = function() {
                return this.pending
            }
            ,
            e.prototype.isSpecialValue = function(e) {
                return "ROLE" === e && ("ALI_ADCO" === this.tableName || "ALI_ADPR" === this.tableName || "ALI_ADAR" === this.tableName || "ALI_ADMU" === this.tableName || "ALI_ADRE" === this.tableName || "APT_ADST" === this.tableName || "ALI_CASE" === this.tableName || "ALI_CADI" === this.tableName) || "TYPE" === e && ("APT_ADST" === this.tableName || "BPN_CABU" === this.tableName || "BPN_REBU" === this.tableName || "BPN_PWZO" === this.tableName) || "FISCSITID" === e && ("BPN_CAPA" === this.tableName || "BPN_EQTO" === this.tableName || "BPN_CABU" === this.tableName || "ALI_CADI" === this.tableName || "ALI_CASE" === this.tableName || "BPN_CAVO" === this.tableName) || "STATUS" === e && ("BPN_RAZO" === this.tableName || "WPT_INCO" === this.tableName || "WPN_INCO" === this.tableName || "WLI_INCO" === this.tableName) || "REQUESTTYPE" === e || "SUVACNTYPE" === e || "COORDSYS" === e && "GPN_SUDO" === this.tableName || "ORIGIN" === e && ("ALI_ADCO" === this.tableName || "ALI_ADPR" === this.tableName || "ALI_ADAR" === this.tableName || "ALI_ADMU" === this.tableName || "ALI_ADRE" === this.tableName || "ALI_CADI" === this.tableName || "ALI_CASE" === this.tableName) || "LEGSTATUS" === e && ("ALI_ADCO" === this.tableName || "ALI_ADPR" === this.tableName || "ALI_ADAR" === this.tableName || "ALI_ADMU" === this.tableName || "ALI_ADRE" === this.tableName || "ALI_CADI" === this.tableName || "ALI_CASE" === this.tableName) || "TECHSTATUS" === e && ("ALI_ADCO" === this.tableName || "ALI_ADPR" === this.tableName || "ALI_ADAR" === this.tableName || "ALI_ADMU" === this.tableName || "ALI_ADRE" === this.tableName || "ALI_CADI" === this.tableName || "ALI_CASE" === this.tableName)
            }
            ,
            e.prototype.getLang = function() {
                return this.labelService.lang.value
            }
            ,
            e.prototype.getConvertedValue = function(e, t, n) {
                return e && null != n ? (new Xn).getConvertedValue(t.toUpperCase(), this.tableName, n.toString()) : n
            }
            ,
            e.prototype.visualizeFeature = function(e, t) {
                var n, i = this;
                "None" === this.appState.get("spatialAnalysisType").value ? (n = this.resultEntities[e].id,
                this.pending = !0,
                this.appState.get("pendingLoading").setValue(this.pending)) : (n = this.resultEntities[e].OBJECTID,
                this.pending = !0,
                this.appState.get("pendingLoading").setValue(this.pending)),
                t ? this.localisationService.getCoordinatesFromObjectID(n, t).subscribe(function(e) {
                    if (2 === e.length)
                        i.appState.get("vizualizeResult").setValue({
                            tableName: i.tableName,
                            coordinates: [Number(e[0]), Number(e[1])],
                            id: n,
                            zoom: i.getCorrectZoom(i.tableName)
                        });
                    else if (e.length < 1e3)
                        if (4 === e.length) {
                            var t = (Number(e[0]) + Number(e[2])) / 2
                              , a = (Number(e[1]) + Number(e[3])) / 2;
                            i.appState.get("vizualizeResult").setValue({
                                tableName: i.tableName,
                                coordinates: [Number(t), Number(a)],
                                id: n,
                                zoom: i.getCorrectZoom(i.tableName)
                            })
                        } else
                            i.localisationService.getCenterOfParcels(e).subscribe(function(e) {
                                var t = e.labelPoints[0];
                                i.appState.get("vizualizeResult").setValue({
                                    tableName: i.tableName,
                                    coordinates: [Number(t.x), Number(t.y)],
                                    id: n,
                                    zoom: i.getCorrectZoom(i.tableName)
                                })
                            });
                    else if (e.length > 1e3) {
                        var o = [Number(e[0]), Number(e[1]), Number(e[500]), Number(e[501]), Number(e[1e3]), Number(e[1001]), Number(e[e.length - 2]), Number(e[e.length - 1])];
                        i.localisationService.getCenterOfParcels(o).subscribe(function(e) {
                            var t = e.labelPoints[0];
                            i.appState.get("vizualizeResult").setValue({
                                tableName: i.tableName,
                                id: n,
                                coordinates: [Number(t.x), Number(t.y)],
                                zoom: i.getCorrectZoom(i.tableName)
                            })
                        })
                    }
                }) : this.appState.get("vizualizeResult").setValue({
                    tableName: this.tableName,
                    id: n,
                    coordinates: null,
                    zoom: null
                }),
                setTimeout(function() {
                    i.pending = !1,
                    i.appState.get("pendingLoading").setValue(i.pending)
                }, 500)
            }
            ,
            e.prototype.filterResult = function() {
                var e = this
                  , t = this.appState.get("layerList").value.get(this.tableName).features.map(function(e) {
                    return e.toUpperCase()
                });
                this.filteredKeys = [],
                this.filteredResultEntities = [];
                for (var n = 0; n < this.resultEntities.length; n++) {
                    for (var i = [], a = 0; a < this.getKeys(this.resultEntities[0]).length; a++)
                        t.includes(this.getKeys(this.resultEntities[0]).map(function(e) {
                            return e.toUpperCase()
                        })[a]) && (0 === n && (this.filteredKeys[t.findIndex(function(t) {
                            return t === e.getKeys(e.resultEntities[0])[a].toUpperCase()
                        })] = this.getKeys(this.resultEntities[0])[a]),
                        i[t.findIndex(function(t) {
                            return t === e.getKeys(e.resultEntities[0])[a].toUpperCase()
                        })] = this.resultEntities[n][this.getKeys(this.resultEntities[0])[a]]);
                    this.filteredResultEntities[n] = i
                }
            }
            ,
            e.prototype.getCorrectZoom = function(e) {
                return "APN_ADMU" === e ? 1e4 : "APN_ADPR" === e ? 5e5 : "APN_ADRE" === e ? 1e6 : null
            }
            ,
            e.prototype.translatedResult = function() {
                this.translatedResultEntities = [];
                for (var e = 0; e < this.filteredResultEntities.length; e++) {
                    for (var t = [], n = 0; n < this.filteredKeys.length; n++)
                        this.getLabelForKey(this.filteredKeys[n].toLowerCase()),
                        this.translatedKeys[n] = this.translatedLabel,
                        this.isSpecialValue(this.filteredKeys[n].toUpperCase()) ? (this.getLabelForKey(this.getConvertedValue(!0, this.filteredKeys[n], this.filteredResultEntities[e][n]).toLowerCase()),
                        t[n] = this.translatedLabel) : t[n] = this.filteredResultEntities[e][n];
                    this.translatedResultEntities[e] = t
                }
            }
            ,
            e.prototype.getLabelForKey = function(e) {
                return gi(this, void 0, void 0, function() {
                    var t = this;
                    return hi(this, function(n) {
                        switch (n.label) {
                        case 0:
                            return [4, this.labelService.getLabel(e).filter(function(e) {
                                return void 0 !== e
                            }).map(function(e) {
                                return e.value
                            }).subscribe(function(e) {
                                t.translatedLabel = e
                            })];
                        case 1:
                            return [2, n.sent()]
                        }
                    })
                })
            }
            ,
            e.prototype.isCadexActive = function() {
                return this.appState.get("cadex").get("active").value
            }
            ,
            e.prototype.exportToCadex = function() {
                var e = this;
                if ("tenants" === this.appState.get("cadex").get("selectType").value || "round" === this.appState.get("cadex").get("selectType").value) {
                    var t = {
                        selectionsData: [],
                        roundsData: []
                    }
                      , n = this.appState.get("cadex").get("responseBody").value;
                    if (console.log(n),
                    null === n)
                        t.selectionsData.push(this.appState.get("searchResultList").value[0]);
                    else {
                        var i = n.selectedPlot
                          , a = n.selectedPlots
                          , o = n.plotsAround;
                        if (i && i.attributes) {
                            var r = i.attributes
                              , s = this.getMMFCadexObject(r);
                            console.log(s),
                            t.selectionsData.push(s)
                        } else
                            a && a.forEach(function(n) {
                                var i = n.attributes
                                  , a = e.getMMFCadexObject(i);
                                console.log(a),
                                t.selectionsData.push(a)
                            });
                        o.forEach(function(n) {
                            var i = n.attributes
                              , a = e.getMMFCadexObject(i);
                            console.log(a),
                            t.roundsData.push(a)
                        })
                    }
                    null !== (l = this.appState.get("cadex").get("returnUrl").value) && (console.log("cadexBody : " + JSON.stringify(t)),
                    localStorage.setItem(this.appState.get("cadex").get("uid").value, JSON.stringify(t)),
                    window.location.href = l)
                } else if (this.appState.get("cadex").get("responseBody").value) {
                    var l, c = {
                        selectionsData: [],
                        roundsData: []
                    };
                    c.selectionsData.push(this.appState.get("cadex").get("responseBody").value),
                    null !== (l = this.appState.get("cadex").get("returnUrl").value) && (localStorage.setItem(this.appState.get("cadex").get("uid").value, JSON.stringify(c)),
                    window.location.href = l)
                } else
                    this.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT")
            }
            ,
            e.prototype.getMMFCadexObject = function(e) {
                return {
                    OBJECTID: "" + e.OBJECTID,
                    CaPaKey: e.CaPaKey,
                    Type: "test",
                    CaSeKey: e.CaSeKey,
                    Status: 1,
                    RecId: 1,
                    SuVaCn: 1,
                    SuVaCnType: e.SuVaCnType,
                    FiscSitId: e.FiscSitId,
                    LastUpdDTS: e.LastUpdDTS,
                    GlobalID: e.GlobalID,
                    "Shape.STArea()": e["Shape.STArea()"],
                    "Shape.STLength()": e["Shape.STLength"]
                }
            }
            ,
            e.prototype.isPrecadActive = function() {
                return this.appState.get("precad").get("active").value
            }
            ,
            e.prototype.isCdmsActive = function() {
                return this.appState.get("cdms").get("active").value
            }
            ,
            e.prototype.exportToPrecad = function() {
                if (this.appState.get("precad").get("responseBody").value) {
                    var e = {
                        selectionsData: [],
                        roundsData: []
                    };
                    e.selectionsData.push(this.appState.get("precad").get("responseBody").value);
                    var t = this.appState.get("precad").get("returnUrl").value;
                    null !== t && (localStorage.setItem(this.appState.get("precad").get("uid").value, JSON.stringify(e)),
                    window.location.href = t)
                } else
                    this.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT")
            }
            ,
            e.prototype.exportToCdms = function() {
                if (this.appState.get("cdms").get("responseBody").value) {
                    var e = {
                        selectionsData: [],
                        roundsData: []
                    };
                    e.selectionsData.push(this.appState.get("cdms").get("responseBody").value);
                    var t = this.appState.get("cdms").get("returnUrl").value;
                    null !== t && (localStorage.setItem(this.appState.get("cdms").get("uid").value, JSON.stringify(e)),
                    window.location.href = t)
                } else
                    this.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT")
            }
            ,
            e.prototype.getDocumentPDFById = function(e) {
                var t;
                t = "None" === this.appState.get("spatialAnalysisType").value ? this.resultEntities[e].docIdBusiness : this.resultEntities[e].DocIdBusiness,
                this.documentService.getDocumentPDFById(t)
            }
            ,
            e.prototype.getSketchPDFById = function(e) {
                var t;
                t = (this.appState.get("spatialAnalysisType").value,
                this.resultEntities[e].caSkID),
                this.documentService.getSketchById(t)
            }
            ,
            e.prototype.getDocumentDownloadPending = function() {
                return this.documentService.pending
            }
            ,
            e.prototype.retrieveListOfCapakeysForCDMSRounds = function() {}
            ,
            ui([Object(i.Output)(), di("design:type", i.EventEmitter)], e.prototype, "onClose", void 0),
            ui([Object(i.Output)(), di("design:type", i.EventEmitter)], e.prototype, "onHide", void 0),
            ui([Object(i.Input)(), di("design:type", f.d)], e.prototype, "appState", void 0),
            ui([Object(i.Input)(), di("design:type", h.a)], e.prototype, "map", void 0),
            e = ui([Object(i.Component)({
                selector: "app-result-list",
                template: n("e8KK"),
                styles: [n("YBjo")]
            }), di("design:paramtypes", [be, s.b, tt, O, $n, ni, pi, ri, pe])], e)
        }(), yi = n("Nkbp"), mi = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , vi = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , bi = function() {
            function e(e) {
                this.http = e
            }
            return e.prototype.getMapping = function() {
                return this.http.get(C.SEARCH_MAPPING)
            }
            ,
            e.prototype.postAttributaireSearch = function(e) {
                return this.http.post(C.ATTRIBUTAIRE, e)
            }
            ,
            e.prototype.postFiscalAttributaireSearch = function(e) {
                return this.http.post(C.ATTRIBUTAIRE + "/fiscal", e)
            }
            ,
            e.prototype.getEntityPositionById = function(e, t) {
                return this.http.post(C.POSITION_SEARCH, {
                    id: e,
                    tableName: t
                })
            }
            ,
            e = mi([Object(i.Injectable)(), vi("design:paramtypes", [S.a])], e)
        }(), Si = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Ci = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Ii = function() {
            function e(e, t, n, i, a) {
                this.searchService = e,
                this.notificationService = t,
                this.labelService = n,
                this.configService = i,
                this.cms = a,
                this.pendingSearch = !1,
                this.configMapping = new Map,
                this.layerNameTranslations = new Map,
                this.layerNameLayerTable = new Map,
                this.layerTableLayerName = new Map,
                this.layerVectorMapping = new Map,
                this.layerPermissionMapping = new Map,
                this.layerIncoherenceMapping = new Map,
                this.cmsKeys = new Map,
                this.selectTitleKey = "",
                this.andArray = [],
                this.orArray = [],
                this.tempChoice = null,
                this.criterias = {
                    tableName: "",
                    criteria: {
                        attribute: "",
                        operation: "EQUAL",
                        stringValue: "",
                        numericValue: "",
                        dateValue: "",
                        searchLimit: 100,
                        or: [],
                        and: []
                    }
                },
                this.tempCriterias = []
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.configService.loadCurrentConfig().then(function(t) {
                    var n = e.appState.get("permissions").value;
                    t.layers.forEach(function(t) {
                        t.layers.forEach(function(t) {
                            t.current.vector && "APN_ADCO" != t.tableName && "BPT_TONA" != t.tableName && "BLI_TONA" != t.tableName && (e.layerNameTranslations.set(t.titleKey, e.getCmsValueForKey(t.titleKey)),
                            e.layerNameLayerTable.set(t.titleKey, t.tableName),
                            e.layerTableLayerName.set(t.tableName, t.titleKey),
                            e.layerVectorMapping.set(t.titleKey, t),
                            e.layerPermissionMapping.set(t.titleKey, t.permissions[n].presentInToc))
                        }),
                        t.subGroups && t.subGroups.forEach(function(t) {
                            t.layers.forEach(function(t) {
                                !t.current.vector || "ALI_CADI" == t.tableName && "ALI_CASE" == t.tableName && "BPT_PRST" == t.tableName || (e.layerNameTranslations.set(t.titleKey, e.getCmsValueForKey(t.titleKey)),
                                e.layerNameLayerTable.set(t.titleKey, t.tableName),
                                e.layerTableLayerName.set(t.tableName, t.titleKey),
                                e.layerVectorMapping.set(t.titleKey, t),
                                e.layerPermissionMapping.set(t.titleKey, t.permissions[n].presentInToc))
                            })
                        })
                    })
                }),
                this.searchService.getMapping().subscribe(function(t) {
                    e.mapping = t
                }),
                setTimeout(function() {
                    e.configMapping = e.appState.get("mapping").value
                })
            }
            ,
            e.prototype.addCriteria = function() {
                this.tempCriterias.push({
                    attribute: "",
                    operation: "EQUAL",
                    stringValue: "",
                    numericValue: "",
                    dateValue: "",
                    operator: "OR"
                })
            }
            ,
            e.prototype.searchCriterias = function() {
                var e = this;
                this.pendingSearch = !0,
                this.appState.get("pendingLoading").setValue(this.pendingSearch),
                this.addStatusForInco(this.criterias.tableName, this.selectTitleKey),
                this.addTypesForInco(this.criterias.tableName),
                this.addELSVersionForLimits(this.criterias.tableName),
                this.appState.get("searchResultTable").setValue(this.criterias.tableName);
                var t = this.layerVectorMapping.get(this.selectTitleKey).searchLimit;
                if (this.criterias.criteria.searchLimit = t,
                null !== this.criterias.criteria.numericValue && "" !== this.criterias.criteria.numericValue && (this.criterias.criteria.numericValue = parseFloat(("" + this.criterias.criteria.numericValue).replace(/,/g, "."))),
                this.tempCriterias.forEach(function(t) {
                    "AND" == t.operator && e.criterias.criteria.and.push({
                        attribute: t.attribute,
                        stringValue: t.stringValue,
                        numericValue: parseFloat(("" + t.numericValue).replace(/,/g, ".")),
                        dateValue: t.dateValue,
                        operation: t.operation
                    }),
                    "OR" == t.operator && e.criterias.criteria.or.push({
                        attribute: t.attribute,
                        stringValue: t.stringValue,
                        numericValue: parseFloat(("" + t.numericValue).replace(/,/g, ".")),
                        dateValue: t.dateValue,
                        operation: t.operation
                    })
                }),
                0 !== this.andArray.length && this.andArray.forEach(function(t) {
                    e.criterias.criteria.and.push(t)
                }),
                0 !== this.orArray.length && this.orArray.forEach(function(t) {
                    e.criterias.criteria.or.push(t)
                }),
                this.appState.get("resultListReady").setValue(!1),
                this.appState.get("displayFeaturesResultsOnMap").setValue(!1),
                "LIKE" == this.criterias.criteria.operation && "" !== this.criterias.criteria.stringValue) {
                    var n = this.criterias.criteria.stringValue.length - 1;
                    "%" !== this.criterias.criteria.stringValue.charAt(n) && (this.criterias.criteria.stringValue = this.criterias.criteria.stringValue + "%")
                }
                for (var i = 0; i < this.tempCriterias.length; i++) {
                    n = this.tempCriterias[i].stringValue.length - 1;
                    null !== this.tempCriterias[i] && "LIKE" == this.tempCriterias[i].operation && ("" !== this.tempCriterias[i].stringValue && "AND" == this.tempCriterias[i].operator && "%" !== this.tempCriterias[i].stringValue.charAt(n) && (this.criterias.criteria.and[i].stringValue = this.tempCriterias[i].stringValue + "%"),
                    "" !== this.tempCriterias[i].stringValue && "OR" == this.tempCriterias[i].operator && "%" !== this.tempCriterias[i].stringValue.charAt(n) && (this.criterias.criteria.or[i].stringValue = this.tempCriterias[i].stringValue + "%"))
                }
                this.isRecIdText(this.criterias.tableName, this.criterias.criteria) && (this.criterias.criteria.attribute = "RECIDTEXT"),
                this.criterias.criteria.and.forEach(function(t) {
                    e.isRecIdText(e.criterias.tableName, t) && (t.attribute = "RECIDTEXT")
                }),
                this.criterias.criteria.or.forEach(function(t) {
                    e.isRecIdText(e.criterias.tableName, t) && (t.attribute = "RECIDTEXT")
                }),
                "CURRENT" === this.appState.get("currentSituation").value ? this.searchService.postAttributaireSearch(this.criterias).toPromise().catch(function(t) {
                    e.notificationService.notify("error", "NOTIFICATION.ERROR_CRITERIA"),
                    e.pendingSearch = !1,
                    e.appState.get("pendingLoading").setValue(e.pendingSearch),
                    e.andArray = []
                }).then(function(t) {
                    t.length > 0 ? (t.wfs = e.layerVectorMapping.get(e.selectTitleKey).current.vector,
                    e.appState.get("searchResultList").setValue(t),
                    e.appState.get("resultListReady").setValue(!0)) : (e.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                    e.pendingSearch = !1,
                    e.appState.get("pendingLoading").setValue(e.pendingSearch)),
                    e.pendingSearch = !1,
                    e.resetAttribute(),
                    e.tempCriterias = [],
                    e.andArray = []
                }) : "FISCAL" === this.appState.get("currentSituation").value && this.searchService.postFiscalAttributaireSearch(this.criterias).toPromise().catch(function(t) {
                    e.notificationService.notify("error", "NOTIFICATION.ERROR_CRITERIA"),
                    e.pendingSearch = !1,
                    e.appState.get("pendingLoading").setValue(e.pendingSearch),
                    e.andArray = []
                }).then(function(t) {
                    t.length > 0 ? (t.wfs = e.layerVectorMapping.get(e.selectTitleKey).fiscal.vector,
                    e.appState.get("searchResultList").setValue(t),
                    e.appState.get("resultListReady").setValue(!0)) : (e.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                    e.pendingSearch = !1,
                    e.appState.get("pendingLoading").setValue(e.pendingSearch)),
                    e.pendingSearch = !1,
                    e.resetAttribute(),
                    e.tempCriterias = [],
                    e.andArray = []
                })
            }
            ,
            e.prototype.removeCriteria = function(e) {
                this.tempCriterias.splice(e, 1)
            }
            ,
            e.prototype.objectKeys = function(e) {
                if (e)
                    return Object.keys(e)
            }
            ,
            e.prototype.getConvertedValue = function(e, t, n) {
                return (new Xn).getConvertedValue(t, e, n)
            }
            ,
            e.prototype.getAttributeConverterMap = function() {
                return (new Xn).getConverterMap()
            }
            ,
            e.prototype.getKeys = function(e) {
                if (void 0 != e)
                    return Array.from(e.keys())
            }
            ,
            e.prototype.getCurrentTranslation = function(e) {
                if (this.cmsKeys.get(e)) {
                    if ("FR" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).fr);
                    if ("NL" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).nl);
                    if ("DE" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).de);
                    if ("EN" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).en)
                }
            }
            ,
            e.prototype.isRecIdText = function(e, t) {
                return ("WPN_INCO" === e || "WLI_INCO" === e || "WPT_INCO" === e) && "RECID" === t.attribute
            }
            ,
            e.prototype.strip_html_tags = function(e) {
                return null !== e && "" !== e && void 0 !== e && (e = e.toString()).replace(/<[^>]*>/g, "")
            }
            ,
            e.prototype.getLang = function() {
                return this.labelService.lang.value
            }
            ,
            e.prototype.getCmsValueForKey = function(e) {
                var t = this;
                this.cms.getCmsContentByKey(e).subscribe(function(n) {
                    t.cmsKeys.set(e, n)
                })
            }
            ,
            e.prototype.addVersionningFilterForLimits = function(e, t) {
                (e.startWith("APN_AD") || e.startWith("ALI_AD")) && this.andArray.push({
                    attribute: "ELSVersion",
                    stringValue: "",
                    numericValue: "",
                    dateValue: "",
                    operation: "ISNULL"
                })
            }
            ,
            e.prototype.addStatusForInco = function(e, t) {
                "WPT_INCO" === e && t.includes("OPEN") && this.andArray.push({
                    attribute: "STATUS",
                    stringValue: "",
                    numericValue: "2",
                    dateValue: "",
                    operation: "LESS"
                })
            }
            ,
            e.prototype.addELSVersionForLimits = function(e) {
                "ALI_ADAR" !== e && "ALI_ADCO" !== e && "ALI_ADMU" !== e && "ALI_ADPR" !== e && "ALI_ADRE" !== e && "APN_ADAR" !== e && "APN_ADRE" !== e && "APN_ADMU" !== e && "APN_ADCO" !== e && "APN_ADPR" !== e || this.andArray.push({
                    attribute: "ELSVERSION",
                    stringValue: "",
                    numericValue: "",
                    dateValue: "",
                    operation: "ISNULL"
                })
            }
            ,
            e.prototype.resetAttribute = function() {
                this.criterias.criteria = {
                    attribute: "",
                    operation: "EQUAL",
                    stringValue: "",
                    numericValue: "",
                    dateValue: "",
                    searchLimit: 100,
                    or: [],
                    and: []
                }
            }
            ,
            e.prototype.updateTableNameTitleKey = function(e) {
                this.criterias.criteria = {
                    attribute: "",
                    operation: "EQUAL",
                    stringValue: "",
                    numericValue: "",
                    dateValue: "",
                    or: [],
                    and: []
                },
                this.criterias.tableName = this.layerNameLayerTable.get(e),
                this.appState.get("searchResultTable").setValue(this.criterias.tableName),
                this.selectTitleKey = e
            }
            ,
            e.prototype.addTypesForInco = function(e) {
                "WPT_INCO" === e && (this.andArray.push({
                    attribute: "REQUESTTYPE",
                    stringValue: "1A",
                    numericValue: 12,
                    dateValue: "",
                    operation: "GREATOREQUAL"
                }),
                this.andArray.push({
                    attribute: "REQUESTTYPE",
                    stringValue: "1E",
                    numericValue: 14,
                    dateValue: "",
                    operation: "LESSOREQUAL"
                }))
            }
            ,
            Si([Object(i.Input)(), Ci("design:type", f.d)], e.prototype, "appState", void 0),
            e = Si([Object(i.Component)({
                selector: "app-attributary-search",
                template: n("pIVB"),
                styles: [n("wiNN")]
            }), Ci("design:paramtypes", [bi, pe, s.b, O, se])], e)
        }(), Li = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Oi = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Ai = function() {
            function e() {}
            return e.prototype.ngOnInit = function() {}
            ,
            e.prototype.chooseStructuredSearchOption = function(e) {
                this.appState.get("drawToolChoice").setValue("None"),
                "spatialSearch" === e ? this.appState.get("spatialSearchOption").setValue("spatial") : this.appState.get("spatialSearchOption").setValue("None")
            }
            ,
            Li([Object(i.Input)(), Oi("design:type", f.d)], e.prototype, "appState", void 0),
            e = Li([Object(i.Component)({
                selector: "app-structured-search",
                template: n("vYbp"),
                styles: [n("GriW")]
            }), Oi("design:paramtypes", [])], e)
        }(), Ri = n("6ibL"), Ti = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Ei = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , wi = function() {
            function e(e) {
                this.labelService = e,
                this.submitSearch = new i.EventEmitter,
                this.valueIncorrect = [],
                this.end = (new Date).getFullYear() - 2014
            }
            return e.prototype.search = function() {
                this.submitSearch.emit()
            }
            ,
            e.prototype.ngOnInit = function() {}
            ,
            e.prototype.ngOnChanges = function(e) {}
            ,
            e.prototype.getConvertedValue = function(e, t, n) {
                return (new Xn).getConvertedValue(t, e, n)
            }
            ,
            e.prototype.getAttributeConverterMap = function() {
                return (new Xn).getConverterMap()
            }
            ,
            e.prototype.getKeys = function(e) {
                return Array.from(e.keys())
            }
            ,
            e.prototype.isSpecialValue = function(e) {
                return "ROLE" === e || "TYPE" === e || "FISCSITID" === e || "STATUS" === e || "REQUESTTYPE" === e || "SUVACNTYPE" === e || "COORDSYS" === e || "LEGSTATUS" === e || "TECHSTATUS" === e || "QUALITY" === e || "ORIGIN" === e
            }
            ,
            e.prototype.onValueChange = function(e, t, n) {
                if (this.valueIncorrect[e] = !1,
                "DATE" === t)
                    /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/.test(n) || (this.valueIncorrect[e] = !0);
                else if ("NUMBER" === t) {
                    /[+-]?([0-9]*[.,])?[0-9]+/.test(n) || (this.valueIncorrect[e] = !0)
                }
            }
            ,
            Ti([Object(i.Input)(), Ei("design:type", Object)], e.prototype, "criteria", void 0),
            Ti([Object(i.Input)(), Ei("design:type", String)], e.prototype, "tableName", void 0),
            Ti([Object(i.Input)(), Ei("design:type", Number)], e.prototype, "index", void 0),
            Ti([Object(i.Input)(), Ei("design:type", Object)], e.prototype, "mapping", void 0),
            Ti([Object(i.Output)(), Ei("design:type", Object)], e.prototype, "submitSearch", void 0),
            e = Ti([Object(i.Component)({
                selector: "app-attribute-search-attributeselection",
                template: n("FoPT"),
                styles: [n("1JJ7")]
            }), Ei("design:paramtypes", [s.b])], e)
        }(), ki = (n("u//w"),
        n("xgm2"),
        function() {
            function e() {}
            return e.ERROR_JSON_PROCESS = "Failed to get object from JSONData Object",
            e.TENANTS_TOO_MANY_PARCELS = "Only a maximum of 5 capakeys are allowed",
            e.ERROR_JSON_TENANTS_NOT_CONTIGUOUSLY = "One or more parcels are not contiguously",
            e.ROUND_TOO_MANY_PARCELS = "Only a maximum of 5 capakeys are allowed",
            e.ERROR_JSON_ROUND_NOT_CONTIGUOUSLY = "One or more parcels are not contiguously",
            e
        }()), _i = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , xi = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Ni = function() {
            function e(e, t, n, i, a, o, r) {
                var s = this;
                this.fb = e,
                this.localisationService = t,
                this.notificationService = n,
                this.labelService = i,
                this.configService = a,
                this.cms = o,
                this.searchService = r,
                this.menuShown = "",
                this.capakeyPattern = "^[0-9]{5}[a-zA-Z][0-9]{4}(-|\\+)?\\/[0-9]{2}[a-zA-Z_][0-9]{3}$",
                this.coordinatePattern = "^[0-9]*(\\,|\\.)?[0-9]{1,3}$",
                this.sizes = ["50m", "100m", "200m", "500m"],
                this.spatialAnalysisToggle = "",
                this.roundOptionsToggle = "",
                this.roundSizeControl = "50m",
                this.tenantsOptionsToggle = "",
                this.pendingSearch = !1,
                this.isLambert2008Selected = !0,
                this.spatialAnalysisRoundOptionChosen = "",
                this.configMapping = new Map,
                this.layerNameTranslations = new Map,
                this.layerNameLayerTable = new Map,
                this.tableNameChosen = null,
                this.layerPermissionMapping = new Map,
                this.cmsKeys = new Map,
                this.tempChoice = null,
                this.criterias = {
                    tableName: "",
                    criteria: {
                        attribute: "RECID",
                        operation: "EQUAL",
                        stringValue: "",
                        numericValue: -1,
                        dateValue: "",
                        or: [],
                        and: []
                    }
                },
                this.isCoordinatesValid = function(e) {
                    var t = e.get("roundPointX")
                      , n = e.get("roundPointY")
                      , i = parseInt(t.value)
                      , a = parseInt(n.value);
                    return Number.isInteger(i) && Number.isInteger(a) && s.isInProjection(i, a) ? null : {
                        coordinatesValid: !0
                    }
                }
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.tenantsCapakeyForm = this.fb.group({
                    tenantsCapakey1: ["", f.i.compose([f.i.required, f.i.pattern(this.capakeyPattern)])],
                    tenantsCapakey2: ["", f.i.pattern(this.capakeyPattern)],
                    tenantsCapakey3: ["", f.i.pattern(this.capakeyPattern)],
                    tenantsCapakey4: ["", f.i.pattern(this.capakeyPattern)],
                    tenantsCapakey5: ["", f.i.pattern(this.capakeyPattern)]
                }),
                this.roundCapakeyForm = this.fb.group({
                    roundCapakey1: ["", f.i.compose([f.i.required, f.i.pattern(this.capakeyPattern)])],
                    roundCapakey2: ["", f.i.pattern(this.capakeyPattern)],
                    roundCapakey3: ["", f.i.pattern(this.capakeyPattern)],
                    roundCapakey4: ["", f.i.pattern(this.capakeyPattern)],
                    roundCapakey5: ["", f.i.pattern(this.capakeyPattern)]
                }),
                this.roundPointCoordForm = this.fb.group({
                    roundPointX: ["", f.i.compose([f.i.required, f.i.pattern(this.coordinatePattern)])],
                    roundPointY: ["", f.i.compose([f.i.required, f.i.pattern(this.coordinatePattern)])]
                }, {
                    validator: this.isCoordinatesValid
                }),
                this.selectRoundSizeForm = this.fb.group({
                    roundSizeControl: new f.c({
                        value: this.sizes[0],
                        disabled: this.isCadexActive()
                    }),
                    round: new f.c({
                        value: "round",
                        disabled: this.isCadexActive()
                    })
                }),
                this.selectTenantsForm = this.fb.group({
                    tenants: new f.c({
                        value: "tenants",
                        disabled: this.isCadexActive()
                    })
                }),
                this.appState.get("chosenTools").valueChanges.subscribe(function(t) {
                    "SPATIAL_ANALYSIS" != e.appState.get("chosenTools").value && e.clearAll()
                }),
                !0 === this.appState.get("cadex").get("active").value && ("round" === this.appState.get("cadex").get("selectType").value && (this.spatialAnalysisToggle = "round",
                this.roundSizeControl = this.appState.get("cadex").get("radius").value + "m",
                this.selectRoundSizeForm.get("roundSizeControl").setValue(this.roundSizeControl)),
                "tenants" === this.appState.get("cadex").get("selectType").value && (this.spatialAnalysisToggle = "tenants")),
                "capakeySelection" === this.spatialAnalysisType && (this.spatialAnalysisToggle = "capakey",
                this.appState.get("spatialAnalysisType").setValue("capakey")),
                this.configService.loadCurrentConfig().then(function(t) {
                    var n = e.appState.get("permissions").value;
                    t.layers.forEach(function(t) {
                        t.layers.forEach(function(t) {
                            t.current.vector && "APN_ADCO" != t.tableName && "BPT_TONA" != t.tableName && "BLI_TONA" != t.tableName && (e.layerNameTranslations.set(t.titleKey, e.getCmsValueForKey(t.titleKey)),
                            e.layerNameLayerTable.set(t.titleKey, t.tableName),
                            e.layerPermissionMapping.set(t.titleKey, t.permissions[n].presentInToc))
                        }),
                        t.subGroups && t.subGroups.forEach(function(t) {
                            t.layers.forEach(function(t) {
                                !t.current.vector || "ALI_CADI" == t.tableName && "ALI_CASE" == t.tableName || (e.layerNameTranslations.set(t.titleKey, e.getCmsValueForKey(t.titleKey)),
                                e.layerNameLayerTable.set(t.titleKey, t.tableName),
                                e.layerPermissionMapping.set(t.titleKey, t.permissions[n].presentInToc))
                            })
                        })
                    })
                }),
                this.searchService.getMapping().subscribe(function(t) {
                    e.mapping = t
                }),
                setTimeout(function() {
                    e.configMapping = e.appState.get("mapping").value
                })
            }
            ,
            e.prototype.showMenu = function(e) {
                this.menuShown === e ? this.menuShown = "" : this.menuShown = e
            }
            ,
            e.prototype.submitForms = function() {
                this.appState.get("drawFeaturesResultsLayerOn").setValue(!1),
                "round" === this.spatialAnalysisToggle ? (this.selectRoundSizeForm.get("roundSizeControl").value || this.selectRoundSizeForm.get("roundSizeControl").setValue(this.sizes[0]),
                "roundParcelCapakey" === this.roundOptionsToggle ? this.roundParcelCapakeySubmit() : "roundParcelClic" === this.roundOptionsToggle ? this.roundParcelClicSubmit() : "roundPointCoord" === this.roundOptionsToggle ? this.roundPointCoordSubmit() : "roundPointClic" === this.roundOptionsToggle ? this.roundPointClicSubmit() : this.notificationService.notify("error", "NOTIFICATION.MAKE_CHOICE")) : "tenants" === this.spatialAnalysisToggle ? "tenantsCapakey" === this.tenantsOptionsToggle ? this.tenantsCapakeySubmit() : "tenantsClic" === this.tenantsOptionsToggle ? this.tenantsClicSubmit() : this.notificationService.notify("error", "NOTIFICATION.MAKE_CHOICE") : "capakey" === this.spatialAnalysisToggle ? this.capakeysClicSubmit() : this.notificationService.notify("error", "NOTIFICATION.MAKE_CHOICE"),
                this.resetForms()
            }
            ,
            e.prototype.reInit = function() {
                null !== this.roundCapakeyForm.get("roundCapakey1").value ? (this.roundCapakeyForm.get("roundCapakey1").setValue(null),
                this.roundCapakeyForm.get("roundCapakey2").setValue(null),
                this.roundCapakeyForm.get("roundCapakey3").setValue(null),
                this.roundCapakeyForm.get("roundCapakey4").setValue(null),
                this.roundCapakeyForm.get("roundCapakey5").setValue(null)) : null !== this.appState.get("capakeysAtPixel").value ? this.appState.get("capakeysAtPixel").setValue(null) : null !== this.tenantsCapakeyForm.get("tenantsCapakey1").value && (this.tenantsCapakeyForm.get("tenantsCapakey1").setValue(null),
                this.tenantsCapakeyForm.get("tenantsCapakey2").setValue(null),
                this.tenantsCapakeyForm.get("tenantsCapakey3").setValue(null),
                this.tenantsCapakeyForm.get("tenantsCapakey4").setValue(null),
                this.tenantsCapakeyForm.get("tenantsCapakey5").setValue(null))
            }
            ,
            e.prototype.resetForms = function() {
                this.spatialAnalysisToggle = "",
                this.resetOptions()
            }
            ,
            e.prototype.resetOptions = function() {
                "capakeySelection" === this.spatialAnalysisType ? this.spatialAnalysisToggle = "capakey" : "spatialAnalysis" === this.spatialAnalysisType && (this.tenantsCapakeyForm.reset(),
                this.roundCapakeyForm.reset(),
                document.getElementById("spatialAnalysisForm").reset()),
                this.clearAll(),
                !0 === this.appState.get("cadex").get("active").value && ("round" === this.appState.get("cadex").get("selectType").value && (this.spatialAnalysisToggle = "round",
                this.roundSizeControl = this.appState.get("cadex").get("radius").value + "m",
                this.selectRoundSizeForm.get("roundSizeControl").setValue(this.roundSizeControl),
                this.appState.get("spatialAnalysisType").setValue("round")),
                "tenants" === this.appState.get("cadex").get("selectType").value && (this.spatialAnalysisToggle = "tenants",
                this.appState.get("spatialAnalysisType").setValue("tenants"))),
                this.initOptionsToggle(this.appState.get("spatialAnalysisType").value)
            }
            ,
            e.prototype.roundParcelCapakeySubmit = function() {
                if (this.pendingSearch = !0,
                this.appState.get("pendingLoading").setValue(this.pendingSearch),
                this.roundCapakeyForm.valid) {
                    var e = void 0
                      , t = !1
                      , n = 0;
                    this.roundCapakeyForm.get("roundCapakey1").value && (e = this.roundCapakeyForm.get("roundCapakey1").value.toUpperCase().replace("/", "%2F"),
                    n += 1),
                    this.roundCapakeyForm.get("roundCapakey2").value && (e = e + "," + this.roundCapakeyForm.get("roundCapakey2").value.toUpperCase().replace("/", "%2F"),
                    n += 1),
                    this.roundCapakeyForm.get("roundCapakey3").value && (e = e + "," + this.roundCapakeyForm.get("roundCapakey3").value.toUpperCase().replace("/", "%2F"),
                    n += 1),
                    this.roundCapakeyForm.get("roundCapakey4").value && (e = e + "," + this.roundCapakeyForm.get("roundCapakey4").value.toUpperCase().replace("/", "%2F"),
                    n += 1),
                    this.roundCapakeyForm.get("roundCapakey5").value && (e = e + "," + this.roundCapakeyForm.get("roundCapakey5").value.toUpperCase().replace("/", "%2F"),
                    n += 1),
                    n > 1 && (t = !0),
                    this.getRound4Parcels(e, t)
                } else
                    this.notificationService.notify("error", "NOTIFICATION.INVALID_INPUT_VALUES"),
                    this.pendingSearch = !1,
                    this.appState.get("pendingLoading").setValue(this.pendingSearch)
            }
            ,
            e.prototype.roundParcelClicSubmit = function() {
                this.pendingSearch = !0,
                this.appState.get("pendingLoading").setValue(this.pendingSearch);
                var e = this.appState.get("capakeysAtPixel").value
                  , t = !1;
                e ? (e.includes(",") && (t = !0),
                this.getRound4Parcels(e, t)) : (this.notificationService.notify("error", "NOTIFICATION.NO_SELECTION_MAP"),
                this.pendingSearch = !1,
                this.appState.get("pendingLoading").setValue(this.pendingSearch))
            }
            ,
            e.prototype.roundPointCoordSubmit = function() {
                if (this.pendingSearch = !0,
                this.appState.get("pendingLoading").setValue(this.pendingSearch),
                this.roundPointCoordForm.valid) {
                    var e = this.roundPointCoordForm.get("roundPointX")
                      , t = this.roundPointCoordForm.get("roundPointY")
                      , n = [];
                    n = this.isLambert2008Selected ? [parseInt(e.value), parseInt(t.value)] : transformProjectionFrom72To2008(parseInt(e.value), parseInt(t.value)),
                    this.getRound4Point(n)
                } else
                    this.notificationService.notify("error", "NOTIFICATION.INVALID_INPUT_VALUES"),
                    this.pendingSearch = !1,
                    this.appState.get("pendingLoading").setValue(this.pendingSearch)
            }
            ,
            e.prototype.roundPointClicSubmit = function() {
                this.pendingSearch = !0,
                this.appState.get("pendingLoading").setValue(this.pendingSearch);
                var e = this.appState.get("coordinatesAtPixel").value;
                e ? this.getRound4Point(e) : (this.notificationService.notify("error", "NOTIFICATION.NO_SELECTION_MAP"),
                this.pendingSearch = !1,
                this.appState.get("pendingLoading").setValue(this.pendingSearch))
            }
            ,
            e.prototype.tenantsCapakeySubmit = function() {
                if (this.pendingSearch = !0,
                this.appState.get("pendingLoading").setValue(this.pendingSearch),
                this.tenantsCapakeyForm.valid) {
                    var e = void 0
                      , t = !1
                      , n = 0;
                    this.tenantsCapakeyForm.get("tenantsCapakey1").value && (e = this.tenantsCapakeyForm.get("tenantsCapakey1").value.replace("/", "%2F"),
                    n += 1),
                    this.tenantsCapakeyForm.get("tenantsCapakey2").value && (e = e + "," + this.tenantsCapakeyForm.get("tenantsCapakey2").value.replace("/", "%2F"),
                    n += 1),
                    this.tenantsCapakeyForm.get("tenantsCapakey3").value && (e = e + "," + this.tenantsCapakeyForm.get("tenantsCapakey3").value.replace("/", "%2F"),
                    n += 1),
                    this.tenantsCapakeyForm.get("tenantsCapakey4").value && (e = e + "," + this.tenantsCapakeyForm.get("tenantsCapakey4").value.replace("/", "%2F"),
                    n += 1),
                    this.tenantsCapakeyForm.get("tenantsCapakey5").value && (e = e + "," + this.tenantsCapakeyForm.get("tenantsCapakey5").value.replace("/", "%2F"),
                    n += 1),
                    n > 1 && (t = !0),
                    this.getTenants(e, t)
                } else
                    this.notificationService.notify("error", "NOTIFICATION.INVALID_INPUT_VALUES"),
                    this.pendingSearch = !1,
                    this.appState.get("pendingLoading").setValue(this.pendingSearch)
            }
            ,
            e.prototype.tenantsClicSubmit = function() {
                this.pendingSearch = !0,
                this.appState.get("pendingLoading").setValue(this.pendingSearch);
                var e = this.appState.get("capakeysAtPixel").value
                  , t = !1;
                e ? (e.includes(",") && (t = !0),
                this.getTenants(e, t)) : (this.notificationService.notify("error", "NOTIFICATION.NO_SELECTION_MAP"),
                this.pendingSearch = !1,
                this.appState.get("pendingLoading").setValue(this.pendingSearch)),
                this.appState.get("capakeysAtPixel").setValue(null)
            }
            ,
            e.prototype.getTenants = function(e, t) {
                var n = this;
                this.appState.get("searchResultTable").setValue("BPN_CAPA"),
                this.localisationService.getTenantsFromCapakeys(e, this.appState.get("currentSituation").value).catch(function(e) {
                    return e.error.message === ki.ERROR_JSON_TENANTS_NOT_CONTIGUOUSLY ? n.notificationService.notify("error", "NOTIFICATION.ERROR.TENANTS_NOT_CONTIGUOUSLY") : e.error.message === ki.TENANTS_TOO_MANY_PARCELS ? n.notificationService.notify("error", "NOTIFICATION.ERROR.TENANTS_TOO_MANY_PARCELS") : n.notificationService.notify("error", "NOTIFICATION.ERROR.CAPAKEY_JSON_PROCESS"),
                    n.pendingSearch = !1,
                    n.appState.get("pendingLoading").setValue(n.pendingSearch),
                    G.a.empty()
                }).subscribe(function(e) {
                    if (null === e)
                        n.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                        n.pendingSearch = !1,
                        n.appState.get("pendingLoading").setValue(n.pendingSearch);
                    else {
                        n.pendingSearch = !0,
                        n.appState.get("pendingLoading").setValue(n.pendingSearch),
                        n.appState.get("drawFeaturesResultsLayerOn").setValue(!0),
                        !0 === n.appState.get("cadex").get("active").value ? n.appState.get("cadex").get("responseBody").setValue(e) : !0 === n.appState.get("cdms").get("active").value && n.appState.get("cdms").get("responseBody").setValue(e);
                        for (var i = [], a = 0; a < e.plotsAround.length; a++)
                            i.push(e.plotsAround[a].attributes),
                            n.appState.get("resultOnMap").setValue({
                                geometry: e.plotsAround[a].geometry.rings[0],
                                id: e.plotsAround[a].attributes.OBJECTID
                            });
                        if (t)
                            for (a = 0; a < e.selectedPlots.length; a++)
                                i.push(e.selectedPlots[a].attributes),
                                n.appState.get("sourceOnMap").setValue({
                                    geometry: e.selectedPlots[a].geometry.rings[0],
                                    id: e.selectedPlots[a].attributes.OBJECTID
                                });
                        else
                            i.push(e.selectedPlot.attributes),
                            n.appState.get("sourceOnMap").setValue({
                                geometry: e.selectedPlot.geometry.rings[0],
                                id: e.selectedPlot.attributes.OBJECTID
                            });
                        n.appState.get("displayFeaturesResultsOnMap").setValue(!0),
                        n.appState.get("searchResultList").setValue(i),
                        n.appState.get("resultListReady").setValue(!0),
                        n.pendingSearch = !1
                    }
                })
            }
            ,
            e.prototype.getRound4Parcels = function(e, t) {
                var n = this;
                this.appState.get("searchResultTable").setValue("BPN_CAPA"),
                this.localisationService.getBufferAndRound4Parcels(e, this.selectRoundSizeForm.get("roundSizeControl").value.replace("m", ""), this.appState.get("currentSituation").value).catch(function(e) {
                    return null != e.error ? (n.pendingSearch = !1,
                    n.appState.get("pendingLoading").setValue(n.pendingSearch),
                    e.error.message === ki.ERROR_JSON_ROUND_NOT_CONTIGUOUSLY ? n.notificationService.notify("error", "NOTIFICATION.ERROR.ROUND_NOT_CONTIGUOUSLY") : e.error.message === ki.ROUND_TOO_MANY_PARCELS ? n.notificationService.notify("error", "NOTIFICATION.ERROR.ROUND_TOO_MANY_PARCELS") : n.notificationService.notify("error", "NOTIFICATION.ERROR.CAPAKEY_JSON_PROCESS")) : (n.notificationService.notify("error", "NOTIFICATION.ERROR.CAPAKEY_JSON_PROCESS"),
                    n.pendingSearch = !1,
                    n.appState.get("pendingLoading").setValue(n.pendingSearch)),
                    G.a.empty()
                }).subscribe(function(e) {
                    if (null === e)
                        n.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                        n.pendingSearch = !1,
                        n.appState.get("pendingLoading").setValue(n.pendingSearch);
                    else {
                        n.appState.get("drawFeaturesResultsLayerOn").setValue(!0),
                        !0 === n.appState.get("cadex").get("active").value ? n.appState.get("cadex").get("responseBody").setValue(e) : !0 === n.appState.get("cdms").get("active").value && n.appState.get("cdms").get("responseBody").setValue(e);
                        var i = []
                          , a = []
                          , o = !1;
                        if (t)
                            for (var r = 0; r < e.selectedPlots.length; r++)
                                i.push(e.selectedPlots[r].attributes),
                                a.push(e.selectedPlots[r].attributes.OBJECTID);
                        else
                            i.push(e.selectedPlot.attributes),
                            a.push(e.selectedPlot.attributes.OBJECTID);
                        for (r = 0; r < e.plotsAround.length; r++) {
                            for (var s = 0; s < a.length; s++)
                                a[s] === e.plotsAround[r].attributes.OBJECTID && (o = !0);
                            o || (i.push(e.plotsAround[r].attributes),
                            n.appState.get("resultOnMap").setValue({
                                geometry: e.plotsAround[r].geometry.rings[0],
                                id: e.plotsAround[r].attributes.OBJECTID
                            })),
                            o = !1
                        }
                        if (t)
                            for (r = 0; r < e.selectedPlots.length; r++)
                                n.appState.get("sourceOnMap").setValue({
                                    geometry: e.selectedPlots[r].geometry.rings[0],
                                    id: e.selectedPlots[r].attributes.OBJECTID
                                });
                        else
                            n.appState.get("sourceOnMap").setValue({
                                geometry: e.selectedPlot.geometry.rings[0],
                                id: e.selectedPlot.attributes.OBJECTID
                            });
                        n.appState.get("sourceOnMap").setValue({
                            geometry: e.geometry[0].rings[0],
                            id: 0
                        }),
                        n.appState.get("displayFeaturesResultsOnMap").setValue(!0),
                        n.appState.get("searchResultList").setValue(i),
                        n.appState.get("resultListReady").setValue(!0),
                        n.pendingSearch = !1
                    }
                })
            }
            ,
            e.prototype.capakeysClicSubmit = function() {
                this.getSelectedCapakeys(),
                this.appState.get("capakeysAtPixel").setValue(null)
            }
            ,
            e.prototype.getSelectedCapakeys = function() {
                var e = this;
                this.pendingSearch = !0,
                this.appState.get("pendingLoading").setValue(this.pendingSearch),
                this.resetCriteria();
                var t = this.appState.get("capakeysAtPixel").value;
                if (this.appState.get("drawFeaturesResultsLayerOn").setValue(!0),
                this.criterias.tableName = "BPN_CAPA",
                !t)
                    return this.notificationService.notify("error", "NOTIFICATION.NO_SELECTION_MAP"),
                    this.pendingSearch = !1,
                    void this.appState.get("pendingLoading").setValue(this.pendingSearch);
                for (var n = t.split(","), i = n.length, a = 0; a < i; a++) {
                    var o = n[a].replace("%2F", "/");
                    "" === this.criterias.criteria.stringValue ? (this.criterias.criteria.stringValue = o,
                    this.criterias.criteria.attribute = "CAPAKEY") : this.addCriteria("CAPAKEY", o, !0)
                }
                this.appState.get("resultListReady").setValue(!1),
                this.searchService.postAttributaireSearch(this.criterias).toPromise().catch(function(t) {
                    e.notificationService.notify("error", "NOTIFICATION.ERROR_CRITERIA"),
                    e.pendingSearch = !1,
                    e.appState.get("pendingLoading").setValue(e.pendingSearch)
                }).then(function(t) {
                    t.length > 0 ? (e.appState.get("searchResultList").setValue(t),
                    e.appState.get("resultListReady").setValue(!0),
                    e.setCapakeyResponseBody(t)) : e.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                    e.pendingSearch = !1
                })
            }
            ,
            e.prototype.setCapakeyResponseBody = function(e) {
                this.isPrecadActive() ? this.appState.get("precad").get("responseBody").setValue(e) : this.isCdmsActive() ? this.appState.get("cdms").get("responseBody").setValue(e) : this.isCadexActive() && this.appState.get("cadex").get("responseBody").setValue(e)
            }
            ,
            e.prototype.addCriteria = function(e, t, n) {
                void 0 === n && (n = !1),
                !1 === n ? this.criterias.criteria.or.push({
                    attribute: e,
                    operation: "EQUAL",
                    stringValue: "",
                    numericValue: parseFloat(("" + t).replace(/,/g, ".")),
                    dateValue: ""
                }) : this.criterias.criteria.or.push({
                    attribute: e,
                    operation: "EQUAL",
                    stringValue: "" + t,
                    numericValue: 0,
                    dateValue: ""
                })
            }
            ,
            e.prototype.resetCriteria = function() {
                this.criterias.criteria = {
                    attribute: "RECID",
                    operation: "EQUAL",
                    stringValue: "",
                    numericValue: -1,
                    dateValue: "",
                    searchLimit: 100,
                    or: [],
                    and: []
                }
            }
            ,
            e.prototype.getRound4Point = function(e) {
                var t = this;
                this.appState.get("searchResultTable").setValue(this.layerNameLayerTable.get(this.tableNameChosen)),
                this.appState.get("isTableNameChosen").setValue(!0),
                this.localisationService.getBufferAndRound4Point(e, this.selectRoundSizeForm.get("roundSizeControl").value.replace("m", ""), this.appState.get("currentSituation").value, this.appState.get("searchResultTable").value).catch(function(e) {
                    return t.notificationService.notify("error", "NOTIFICATION.ERROR.JSON_PROCESS"),
                    t.pendingSearch = !1,
                    t.appState.get("pendingLoading").setValue(t.pendingSearch),
                    G.a.empty()
                }).subscribe(function(n) {
                    if (null === n || 0 === n.plotsAround.length)
                        t.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                        t.pendingSearch = !1,
                        t.appState.get("pendingLoading").setValue(t.pendingSearch);
                    else {
                        t.pendingSearch = !0,
                        t.appState.get("pendingLoading").setValue(t.pendingSearch),
                        t.appState.get("drawFeaturesResultsLayerOn").setValue(!0);
                        var i = [];
                        t.appState.get("sourceOnMap").setValue({
                            geometry: n.geometry[0].rings[0],
                            id: 0
                        });
                        for (var a = 0; a < n.plotsAround.length; a++)
                            if (i.push(n.plotsAround[a].attributes),
                            "WPT_INCO" === t.appState.get("searchResultTable").value || "BPT_PRST" === t.appState.get("searchResultTable").value || "SPT_BEAD" === t.appState.get("searchResultTable").value || "APT_ADST" === t.appState.get("searchResultTable").value) {
                                var o = [n.plotsAround[a].geometry.x, n.plotsAround[a].geometry.y];
                                t.appState.get("resultOnMap").setValue({
                                    geometry: o,
                                    id: n.plotsAround[a].attributes.OBJECTID
                                })
                            } else
                                "ALI_CADI" === t.appState.get("searchResultTable").value || "ALI_CASE" === t.appState.get("searchResultTable").value || "ALI_ADCO" === t.appState.get("searchResultTable").value || "ALI_ADMU" === t.appState.get("searchResultTable").value || "ALI_ADAR" === t.appState.get("searchResultTable").value || "ALI_ADRE" === t.appState.get("searchResultTable").value || "ALI_ADPR" === t.appState.get("searchResultTable").value || "BLI_EAZO" === t.appState.get("searchResultTable").value ? t.appState.get("resultOnMap").setValue({
                                    geometry: n.plotsAround[a].geometry.paths[0],
                                    id: n.plotsAround[a].attributes.OBJECTID
                                }) : t.appState.get("resultOnMap").setValue({
                                    geometry: n.plotsAround[a].geometry.rings[0],
                                    id: n.plotsAround[a].attributes.OBJECTID
                                });
                        t.appState.get("spatialAnalysisCoordinates").setValue(!0),
                        t.appState.get("sourceOnMap").setValue({
                            geometry: e,
                            id: 1
                        }),
                        t.appState.get("displayFeaturesResultsOnMap").setValue(!0),
                        t.appState.get("spatialAnalysisCoordinates").setValue(!1),
                        t.appState.get("searchResultList").setValue(i),
                        t.appState.get("resultListReady").setValue(!0),
                        t.pendingSearch = !1
                    }
                })
            }
            ,
            e.prototype.chooseTableName = function(e) {
                this.appState.get("isTableNameChosen").setValue(!0),
                "roundPointClic" === this.appState.get("spatialAnalysisRoundOption").value ? this.appState.get("drawToolChoice").setValue("Point") : this.appState.get("drawToolChoice").setValue("None"),
                this.tableNameChosen = e,
                this.criterias.tableName = this.layerNameLayerTable.get(e)
            }
            ,
            e.prototype.chooseSpatialAnalysisType = function(e) {
                this.resetOptions(),
                this.appState.get("spatialAnalysisType").setValue(e),
                this.initOptionsToggle(this.appState.get("spatialAnalysisType").value)
            }
            ,
            e.prototype.initOptionsToggle = function(e) {
                "round" === e ? (this.roundOptionsToggle = "roundParcelClic",
                this.chooseSpatialAnalysisRoundOption(this.roundOptionsToggle)) : "tenants" === e && (this.tenantsOptionsToggle = "tenantsClic",
                this.chooseSpatialAnalysisTenantsOption(this.tenantsOptionsToggle))
            }
            ,
            e.prototype.chooseSpatialAnalysisRoundOption = function(e) {
                this.criterias.tableName = "",
                this.appState.get("isTableNameChosen").setValue(!1),
                this.appState.get("drawToolChoice").setValue("None"),
                this.tempChoice = null,
                this.spatialAnalysisRoundOptionChosen = e,
                this.appState.get("spatialAnalysisRoundOption").setValue(e)
            }
            ,
            e.prototype.chooseSpatialAnalysisTenantsOption = function(e) {
                this.appState.get("spatialAnalysisTenantsOption").setValue(e)
            }
            ,
            e.prototype.clearSpatialAnalysisType = function() {
                this.appState.get("spatialAnalysisType").setValue("None"),
                this.appState.get("drawToolChoice").setValue("None")
            }
            ,
            e.prototype.clearSpatialAnalysisRoundOption = function() {
                this.appState.get("spatialAnalysisRoundOption").setValue("None"),
                this.appState.get("drawToolChoice").setValue("None"),
                this.criterias.tableName = "",
                this.appState.get("isTableNameChosen").setValue(!1),
                this.tempChoice = null,
                this.roundPointCoordForm.reset()
            }
            ,
            e.prototype.clearSpatialAnalysisTenantsOption = function() {
                this.appState.get("spatialAnalysisTenantsOption").setValue("None")
            }
            ,
            e.prototype.clearOptions = function() {
                this.clearSpatialAnalysisRoundOption(),
                this.clearSpatialAnalysisTenantsOption()
            }
            ,
            e.prototype.clearAll = function() {
                this.appState.get("displayFeaturesResultsOnMap").setValue(!1),
                this.isPrecadActive() || this.isCdmsActive() || this.isCadexCapakeyActive() || (this.clearSpatialAnalysisType(),
                this.clearOptions(),
                this.appState.get("resultOnMap").setValue(null)),
                this.appState.get("sourceOnMap").setValue(null),
                this.appState.get("capakeysAtPixel").setValue(null)
            }
            ,
            e.prototype.isCadexActive = function() {
                return this.appState.get("cadex").get("active").value
            }
            ,
            e.prototype.isCadexCapakeyActive = function() {
                return this.appState.get("cadex").get("active").value && "capakey" === this.appState.get("cadex").get("selectType").value
            }
            ,
            e.prototype.isPrecadActive = function() {
                return this.appState.get("precad").get("active").value
            }
            ,
            e.prototype.isCdmsActive = function() {
                return this.appState.get("cdms").get("active").value
            }
            ,
            e.prototype.isSpatialAnalysis = function() {
                return "spatialAnalysis" === this.spatialAnalysisType
            }
            ,
            e.prototype.compareByRoundSelected = function(e, t) {
                return e.type == t.type
            }
            ,
            e.prototype.mapKeys = function() {
                this.bindedMappingKeys = Array.from(this.configMapping.keys())
            }
            ,
            e.prototype.getLang = function() {
                return this.labelService.lang.value
            }
            ,
            e.prototype.getTranslationForLayerName = function(e) {
                if (void 0 !== this.configMapping.get(e).translations) {
                    if ("FR" === this.getLang())
                        return this.configMapping.get(e).translations.fr;
                    if ("NL" === this.getLang())
                        return this.configMapping.get(e).translations.nl;
                    if ("DE" === this.getLang())
                        return this.configMapping.get(e).translations.de;
                    if ("EN" === this.getLang())
                        return this.configMapping.get(e).translations.en
                }
                return e
            }
            ,
            e.prototype.getKeys = function(e) {
                if (void 0 != e)
                    return Array.from(e.keys())
            }
            ,
            e.prototype.getCurrentTranslation = function(e) {
                if (this.cmsKeys.get(e)) {
                    if ("FR" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).fr);
                    if ("NL" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).nl);
                    if ("DE" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).de);
                    if ("EN" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).en)
                }
            }
            ,
            e.prototype.strip_html_tags = function(e) {
                return null !== e && "" !== e && (e = e.toString()).replace(/<[^>]*>/g, "")
            }
            ,
            e.prototype.getCmsValueForKey = function(e) {
                var t = this;
                this.cms.getCmsContentByKey(e).subscribe(function(n) {
                    t.cmsKeys.set(e, n)
                })
            }
            ,
            e.prototype.isInProjection = function(e, t) {
                return "EPSG:31370" === document.getElementById("projectionSelector").value ? e < 297825.220168 && t < 245838.883595 && e > 117707.61138 && t > 20494.417478 : e < 797745.149306 && t < 745912.873533 && e > 517640.909822 && t > 520560.782836
            }
            ,
            e.prototype.selectCoordSystem = function(e) {
                this.roundPointCoordForm.reset();
                var t = e.target.value;
                this.isLambert2008Selected = "EPSG:3812" == t
            }
            ,
            _i([Object(i.Input)(), xi("design:type", f.d)], e.prototype, "appState", void 0),
            _i([Object(i.Input)(), xi("design:type", String)], e.prototype, "spatialAnalysisType", void 0),
            e = _i([Object(i.Component)({
                selector: "spatial-analysis",
                template: n("R5aC"),
                styles: [n("FJFN")]
            }), Object(i.NgModule)({
                imports: [f.e]
            }), xi("design:paramtypes", [f.b, tt, p, s.b, O, se, bi])], e)
        }(), Pi = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Mi = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Fi = function() {
            function e(e) {
                this.http = e
            }
            return e.prototype.saveExtractionData = function(e) {
                var t = (new S.c).set("Content-Type", "application/json");
                return this.http.post(C.EXTRACTION_TOOL_CONTENT + "/insert", e, {
                    headers: t
                })
            }
            ,
            e = Pi([Object(i.Injectable)(), Mi("design:paramtypes", [S.a])], e)
        }(), Vi = n("5vcJ"), Di = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , ji = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Gi = function() {
            function e(e) {
                this.activeModal = e
            }
            return e.prototype.ngOnInit = function() {
                this.alertId = this.appState.get("extractionObjectId").value
            }
            ,
            e.prototype.closeModal = function() {
                this.activeModal.close()
            }
            ,
            e = Di([Object(i.Component)({
                selector: "app-extraction-alert",
                template: n("kHO9"),
                styles: [n("Mcoy")]
            }), ji("design:paramtypes", [We.a])], e)
        }(), Bi = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Ui = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , zi = function() {
            function e(e, t, n, i, a) {
                this.fb = e,
                this.notificationService = t,
                this.extraction = n,
                this.ccffService = i,
                this.modalService = a,
                this.name = "",
                this.firstname = "",
                this.nationalNumber = "",
                this.formatList = ["dxf", "shp"],
                this.coordSysList = ["LB72", "LB2008"],
                this.coordSystem = "0",
                this.typeFormat = "1",
                this.typeIntersect = "0",
                this.pendingSearch = !1
            }
            return e.prototype.ngOnInit = function() {
                this.appState.get("userInformation").value.surname && (this.name = this.appState.get("userInformation").value.surname),
                this.appState.get("userInformation").value.firstname && (this.firstname = this.appState.get("userInformation").value.firstname),
                this.appState.get("userInformation").value.nationalNumber && (this.nationalNumber = this.appState.get("userInformation").value.nationalNumber),
                this.extractionToolForm = this.fb.group({
                    namePersidf: this.name,
                    firstNamePersidf: this.firstname,
                    format: new f.c({
                        value: this.formatList[0]
                    }),
                    typeIntersect: [this.typeIntersect],
                    coordSys: new f.c({
                        value: this.coordSysList[0]
                    })
                }, {})
            }
            ,
            e.prototype.goToExtraction = function() {
                var e = this;
                this.pendingSearch = !0,
                this.appState.get("pendingLoading").setValue(this.pendingSearch),
                this.appState.get("polygon4Extraction").setValue(!0);
                var t = null;
                if ("Polygon" === this.appState.get("measureToolChoice").value && (t = this.appState.get("geometry4Extraction").value),
                t) {
                    var n = {
                        situation: this.getSituation(),
                        format: this.typeFormat,
                        tool: this.typeIntersect,
                        coordSys: this.coordSystem,
                        status: "0",
                        coordSysInput: "0",
                        shape: this.getCoordinatesFromPolygon(t),
                        nationalNumber: this.nationalNumber,
                        userType: "SSIN"
                    };
                    this.extraction.saveExtractionData(n).catch(function(t) {
                        return e.notificationService.notify("error", "NOTIFICATION_EXTRACTION_SAVE_ERROR"),
                        e.pendingSearch = !1,
                        e.appState.get("pendingLoading").setValue(e.pendingSearch),
                        G.a.empty()
                    }).subscribe(function(t) {
                        null === t ? (e.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                        e.pendingSearch = !1,
                        e.appState.get("pendingLoading").setValue(e.pendingSearch)) : (e.appState.get("extractionObjectId").setValue(t),
                        e.notificationService.notify("success", "NOTIFICATION_EXTRACTION_SAVE_SUCCESS"),
                        e.openConfirmationModal())
                    })
                } else
                    this.notificationService.notify("error", "NOTIFICATION.NO_ZONE_SELECTION");
                this.appState.get("polygon4Extraction").setValue(!1),
                this.clearFeatureParams(),
                this.pendingSearch = !1,
                this.appState.get("pendingLoading").setValue(this.pendingSearch)
            }
            ,
            e.prototype.activateSelection = function() {
                "Polygon" != this.appState.get("measureToolChoice").value && this.appState.get("measureToolChoice").setValue("Polygon")
            }
            ,
            e.prototype.resetFields = function() {
                this.clearFeatureParams()
            }
            ,
            e.prototype.selectFormatInput = function(e) {
                this.typeFormat = e.target.value
            }
            ,
            e.prototype.selectCoordSysInput = function(e) {
                this.coordSystem = e.target.value
            }
            ,
            e.prototype.typeIntersectSelection = function(e) {
                this.typeIntersect = e.target.value
            }
            ,
            e.prototype.getSituation = function() {
                return "CURRENT" === this.appState.get("currentSituation").value ? "0" : "FISCAL" === this.appState.get("currentSituation").value ? "1" : void 0
            }
            ,
            e.prototype.getCoordinatesFromPolygon = function(e) {
                var t = (new Vi.a).writeGeometryObject(e);
                for (var n in t)
                    if ("rings" === n) {
                        for (var i = 0; i < t[n][0].length; i++)
                            t[n][0][i] = t[n][0][i].join().replace(",", " ");
                        return t[n].join()
                    }
            }
            ,
            e.prototype.clearFeatureParams = function() {
                this.appState.get("measureToolChoice").setValue("None"),
                this.appState.get("featureAtPixel").setValue([]),
                this.appState.get("featuresFromSpatialSelection").setValue(null),
                this.appState.get("coordinatesFromSpatialSelection").setValue(null)
            }
            ,
            e.prototype.goToMyminfin = function() {
                this.ccffService.getMyminfinProfileUrl().subscribe(function(e) {
                    window.location.href = e
                })
            }
            ,
            e.prototype.openConfirmationModal = function() {
                this.modalService.open(Gi, {
                    backdrop: "static",
                    keyboard: !1
                }).componentInstance.appState = this.appState
            }
            ,
            Bi([Object(i.Input)(), Ui("design:type", f.d)], e.prototype, "appState", void 0),
            e = Bi([Object(i.Component)({
                selector: "app-extraction-tool",
                template: n("d6Vc"),
                styles: [n("QpKf")]
            }), Ui("design:paramtypes", [f.b, pe, Fi, ct, We.b])], e)
        }(), Ki = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Yi = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Zi = function() {
            function e(e, t, n, i, a) {
                this.searchService = e,
                this.notificationService = t,
                this.labelService = n,
                this.configService = i,
                this.cms = a,
                this.pendingSearch = !1,
                this.configMapping = new Map,
                this.layerNameTranslations = new Map,
                this.layerNameLayerTable = new Map,
                this.layerPermissionMapping = new Map,
                this.layerVectorMapping = new Map,
                this.cmsKeys = new Map,
                this.tempChoice = null,
                this.criterias = {
                    tableName: "",
                    criteria: {
                        attribute: "RECID",
                        operation: "EQUAL",
                        stringValue: "",
                        numericValue: -1,
                        dateValue: "",
                        searchLimit: 100,
                        or: [],
                        and: []
                    }
                },
                this.searchByPointString = {
                    nl: "...",
                    fr: "...",
                    de: "...",
                    en: "..."
                },
                this.searchByPolygonString = {
                    nl: "...",
                    fr: "...",
                    de: "...",
                    en: "..."
                }
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.configService.loadCurrentConfig().then(function(t) {
                    var n = e.appState.get("permissions").value;
                    t.layers.forEach(function(t) {
                        t.layers.forEach(function(t) {
                            t.current.vector && "APN_ADCO" != t.tableName && "BPT_TONA" != t.tableName && "BLI_TONA" != t.tableName && (e.layerNameTranslations.set(t.titleKey, e.getCmsValueForKey(t.titleKey)),
                            e.layerNameLayerTable.set(t.titleKey, t.tableName),
                            e.layerPermissionMapping.set(t.titleKey, t.permissions[n].presentInToc),
                            e.layerVectorMapping.set(t.titleKey, t))
                        }),
                        t.subGroups && t.subGroups.forEach(function(t) {
                            t.layers.forEach(function(t) {
                                !t.current.vector || "ALI_CADI" == t.tableName && "ALI_CASE" == t.tableName || (e.layerNameTranslations.set(t.titleKey, e.getCmsValueForKey(t.titleKey)),
                                e.layerNameLayerTable.set(t.titleKey, t.tableName),
                                e.layerPermissionMapping.set(t.titleKey, t.permissions[n].presentInToc),
                                e.layerVectorMapping.set(t.titleKey, t))
                            })
                        })
                    })
                }),
                this.searchService.getMapping().subscribe(function(t) {
                    e.mapping = t
                }),
                setTimeout(function() {
                    e.configMapping = e.appState.get("mapping").value
                }),
                this.cms.getCmsContentByKey("SEARCHBYPOINT_TOOLTIP").subscribe(function(t) {
                    e.searchByPointString = t
                }),
                this.cms.getCmsContentByKey("SEARCHBYPOLYGON_TOOLTIP").subscribe(function(t) {
                    e.searchByPolygonString = t
                })
            }
            ,
            e.prototype.mapKeys = function() {
                this.bindedMappingKeys = Array.from(this.configMapping.keys())
            }
            ,
            e.prototype.getLang = function() {
                return this.labelService.lang.value
            }
            ,
            e.prototype.getTranslationForLayerName = function(e) {
                if (void 0 !== this.configMapping.get(e).translations) {
                    if ("FR" === this.getLang())
                        return this.configMapping.get(e).translations.fr;
                    if ("NL" === this.getLang())
                        return this.configMapping.get(e).translations.nl;
                    if ("DE" === this.getLang())
                        return this.configMapping.get(e).translations.de;
                    if ("EN" === this.getLang())
                        return this.configMapping.get(e).translations.en
                }
                return e
            }
            ,
            e.prototype.chooseSpatialSearchOption = function(e) {
                this.appState.get("vectorActivated").setValue(!0),
                this.appState.get("drawToolChoice").setValue(e),
                this.clearFeatureParams()
            }
            ,
            e.prototype.chooseTableName = function(e) {
                this.appState.get("drawToolChoice").setValue("None"),
                this.clearFeatureParams(),
                this.criterias.tableName = this.layerNameLayerTable.get(e),
                this.appState.get("searchResultTable").setValue(this.criterias.tableName),
                this.selectTitleKey = e
            }
            ,
            e.prototype.clearFeatureParams = function() {
                this.appState.get("featureAtPixel").setValue([]),
                this.appState.get("featuresFromSpatialSelection").setValue(null),
                this.appState.get("coordinatesFromSpatialSelection").setValue(null)
            }
            ,
            e.prototype.addCriteria = function(e, t, n) {
                void 0 === n && (n = !1),
                !1 === n ? this.criterias.criteria.or.push({
                    attribute: e,
                    operation: "EQUAL",
                    stringValue: "",
                    numericValue: parseFloat(("" + t).replace(/,/g, ".")),
                    dateValue: ""
                }) : this.criterias.criteria.or.push({
                    attribute: e,
                    operation: "EQUAL",
                    stringValue: "" + t,
                    numericValue: 0,
                    dateValue: ""
                })
            }
            ,
            e.prototype.resetCriteria = function() {
                this.criterias.criteria = {
                    attribute: "OBJECTID",
                    operation: "EQUAL",
                    stringValue: "",
                    numericValue: -1,
                    dateValue: "",
                    searchLimit: 100,
                    or: [],
                    and: []
                }
            }
            ,
            e.prototype.getKeys = function(e) {
                if (void 0 != e)
                    return Array.from(e.keys())
            }
            ,
            e.prototype.addStatusForInco = function(e, t) {
                "WPT_INCO" === e && t.includes("OPEN") && this.criterias.criteria.and.push({
                    attribute: "STATUS",
                    stringValue: "",
                    numericValue: "2",
                    dateValue: "",
                    operation: "LESS"
                })
            }
            ,
            e.prototype.getCurrentTranslation = function(e) {
                if (this.cmsKeys.get(e)) {
                    if ("FR" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).fr);
                    if ("NL" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).nl);
                    if ("DE" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).de);
                    if ("EN" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).en)
                }
            }
            ,
            e.prototype.strip_html_tags = function(e) {
                return null !== e && "" !== e && (e = e.toString()).replace(/<[^>]*>/g, "")
            }
            ,
            e.prototype.lang = function() {
                return this.labelService.lang.value.toLowerCase()
            }
            ,
            e.prototype.getLabelForKey = function(e) {
                return this.labelService.getLabel(e).filter(function(e) {
                    return void 0 !== e
                }).map(function(e) {
                    return e.value
                })
            }
            ,
            e.prototype.getCmsValueForKey = function(e) {
                var t = this;
                this.cms.getCmsContentByKey(e).subscribe(function(n) {
                    t.cmsKeys.set(e, n)
                })
            }
            ,
            e.prototype.searchResults = function() {
                var e = this;
                this.appState.get("drawFeaturesResultsLayerOn").setValue(!1),
                this.pendingSearch = !0,
                this.appState.get("pendingLoading").setValue(this.pendingSearch),
                this.resetCriteria();
                for (var t = 0, n = this.appState.get("featureAtPixel").value; t < n.length; t++) {
                    var i = n[t];
                    if (!i)
                        return this.notificationService.notify("error", "NOTIFICATION.NO_GEOGRAPHY_SELECTED"),
                        this.pendingSearch = !1,
                        void this.appState.get("pendingLoading").setValue(this.pendingSearch);
                    if ("Polygon" === this.appState.get("drawToolChoice").value && !(i = this.appState.get("featuresFromSpatialSelection").value))
                        return this.notificationService.notify("error", "NOTIFICATION.NO_SPATIAL_INTERSECTION"),
                        this.pendingSearch = !1,
                        void this.appState.get("pendingLoading").setValue(this.pendingSearch);
                    this.appState.get("searchResultTable").setValue(this.criterias.tableName),
                    this.appState.get("drawFeaturesResultsLayerOn").setValue(!0);
                    var a = this.layerVectorMapping.get(this.selectTitleKey).searchLimit;
                    this.criterias.criteria.searchLimit = a;
                    for (var o = i.length > 600 ? 600 : i.length, r = 0; r < o; r++) {
                        var s = i[r];
                        if ("Point" === this.appState.get("drawToolChoice").value) {
                            var l = s.get("layer")
                              , c = s.get("features")
                              , p = s.get("tableName");
                            if (l && 1 == s.get("visible") && c && c.length > 0 && p === this.criterias.tableName) {
                                var u = s.get("OBJECTID")
                                  , d = s.get("DocIdBusiness")
                                  , g = s.get("RecID")
                                  , h = s.get("ID_ORIG")
                                  , f = s.get("CaSkID")
                                  , y = s.get("VolumeId");
                                y ? "" === this.criterias.criteria.stringValue ? (this.criterias.criteria.stringValue = y,
                                this.criterias.criteria.attribute = "VOLUMEID") : this.addCriteria("VOLUMEID", y, !0) : u ? 0 === this.criterias.criteria.numericValue ? this.criterias.criteria.numericValue = parseFloat(("" + u).replace(/,/g, ".")) : this.addCriteria("OBJECTID", u) : d ? "" === this.criterias.criteria.stringValue ? (this.criterias.criteria.stringValue = d,
                                this.criterias.criteria.attribute = "DOCIDBUSINESS") : this.addCriteria("DOCIDBUSINESS", d, !0) : g ? "" === this.criterias.criteria.stringValue ? (this.criterias.criteria.stringValue = g,
                                this.criterias.criteria.attribute = "RECIDTEXT") : this.addCriteria("RECIDTEXT", g, !0) : h ? "" === this.criterias.criteria.stringValue ? (this.criterias.criteria.stringValue = h,
                                this.criterias.criteria.attribute = "ID_ORIG") : this.addCriteria("ID_ORIG", h, !0) : f && ("" === this.criterias.criteria.stringValue ? (this.criterias.criteria.stringValue = f,
                                this.criterias.criteria.attribute = "CASKID") : this.addCriteria("CASKID", f, !0)),
                                this.appState.get("spatialSearchResults").setValue({
                                    tableName: this.criterias.tableName,
                                    feature: s,
                                    zoom: this.getCorrectZoom(this.criterias.tableName)
                                })
                            }
                        } else {
                            u = s.get("OBJECTID"),
                            d = s.get("DocIdBusiness"),
                            g = s.get("RecID"),
                            h = s.get("ID_ORIG"),
                            f = s.get("CaSkID");
                            u ? 0 === r ? this.criterias.criteria.numericValue = parseFloat(("" + u).replace(/,/g, ".")) : this.addCriteria("OBJECTID", u) : d ? 0 === r ? (this.criterias.criteria.stringValue = d,
                            this.criterias.criteria.attribute = "DOCIDBUSINESS") : this.addCriteria("DOCIDBUSINESS", d, !0) : g ? 0 === r ? (this.criterias.criteria.stringValue = g,
                            this.criterias.criteria.attribute = "RECIDTEXT") : this.addCriteria("RECIDTEXT", g, !0) : h ? 0 === r ? (this.criterias.criteria.stringValue = h,
                            this.criterias.criteria.attribute = "ID_ORIG") : this.addCriteria("ID_ORIG", h, !0) : f && (0 === r ? (this.criterias.criteria.stringValue = f,
                            this.criterias.criteria.attribute = "CASKID") : this.addCriteria("CASKID", f, !0)),
                            this.appState.get("spatialSearchResults").setValue({
                                tableName: this.criterias.tableName,
                                feature: s,
                                zoom: this.getCorrectZoom(this.criterias.tableName)
                            })
                        }
                    }
                }
                this.appState.get("resultListReady").setValue(!1),
                this.addStatusForInco(this.criterias.tableName, this.selectTitleKey),
                "CURRENT" === this.appState.get("currentSituation").value ? this.searchService.postAttributaireSearch(this.criterias).toPromise().then(function(t) {
                    t && t.length > 0 ? (e.appState.get("searchResultList").setValue(t),
                    e.appState.get("resultListReady").setValue(!0),
                    e.appState.get("displayFeaturesResultsOnMap").setValue(!0)) : e.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                    e.pendingSearch = !1
                }).catch(function(t) {
                    e.notificationService.notify("error", "NOTIFICATION.ERROR_CRITERIA"),
                    e.pendingSearch = !1,
                    e.appState.get("pendingLoading").setValue(e.pendingSearch)
                }) : "FISCAL" === this.appState.get("currentSituation").value && this.searchService.postFiscalAttributaireSearch(this.criterias).toPromise().catch(function(t) {
                    e.notificationService.notify("error", "NOTIFICATION.ERROR_CRITERIA"),
                    e.pendingSearch = !1,
                    e.appState.get("pendingLoading").setValue(e.pendingSearch)
                }).then(function(t) {
                    t && t.length > 0 ? (e.appState.get("searchResultList").setValue(t),
                    e.appState.get("resultListReady").setValue(!0),
                    e.appState.get("displayFeaturesResultsOnMap").setValue(!0)) : e.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                    e.pendingSearch = !1
                }),
                this.resetOptions()
            }
            ,
            e.prototype.resetOptions = function() {
                this.pendingSearch = !1,
                this.appState.get("pendingLoading").setValue(this.pendingSearch),
                this.appState.get("displayFeaturesResultsOnMap").setValue(!1),
                this.appState.get("spatialSearchPointNewRequest").setValue(!0),
                this.chooseSpatialSearchOption("None"),
                this.resetCriteria(),
                this.criterias.tableName = "",
                this.tempChoice = ""
            }
            ,
            e.prototype.getCorrectZoom = function(e) {
                return "APN_ADMU" === e ? 1e4 : "APN_ADPR" === e ? 5e5 : "APN_ADRE" === e ? 1e6 : null
            }
            ,
            Ki([Object(i.Input)(), Yi("design:type", f.d)], e.prototype, "appState", void 0),
            e = Ki([Object(i.Component)({
                selector: "app-spatial-search",
                template: n("PXLJ"),
                styles: [n("zKSU")]
            }), Yi("design:paramtypes", [bi, pe, s.b, O, se])], e)
        }(), Wi = n("z4i6"), Hi = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Xi = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Ji = function() {
            function e(e) {
                this.viewService = e,
                this.dims = {
                    a0: [1189, 841],
                    a1: [841, 594],
                    a2: [594, 420],
                    a3: [420, 297],
                    a4: [297, 210],
                    a5: [210, 148]
                },
                this.format = "a4",
                this.resolution = 150
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                if (document.getElementById("scaleValue")) {
                    var t = document.getElementById("scaleValue").value
                      , n = parseInt(t.substring(t.indexOf(":") + 2));
                    this.appState.get("print").get("printScale").setValue(n)
                } else
                    this.appState.get("print").get("printScale").setValue(25e4);
                this.scales = [1e6, 5e5, 25e4, 1e5, 5e4, 25e3, 1e4, 5e3, 2500, 1e3, 500, 250, 100, 50],
                this.appState.get("print").get("printOfficial").valueChanges.subscribe(function(t) {
                    !1 === t && e.appState.get("print").get("printResolution").setValue(150)
                })
            }
            ,
            e.prototype.giveXML = function() {
                this.appState.get("print").get("triggerPrint").setValue(!0)
            }
            ,
            e.prototype.compareFn = function(e, t) {
                return e === t
            }
            ,
            Hi([Object(i.Input)(), Xi("design:type", f.d)], e.prototype, "appState", void 0),
            Hi([Object(i.Input)(), Xi("design:type", Object)], e.prototype, "map", void 0),
            e = Hi([Object(i.Component)({
                selector: "app-print-selection",
                template: n("EVgJ"),
                styles: [n("CvZ1")]
            }), Xi("design:paramtypes", [k])], e)
        }(), qi = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Qi = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , $i = function() {
            function e() {}
            return e.prototype.ngOnInit = function() {
                this.drawingLayer = this.appState.get("interactions").get("drawing").get("layer").value,
                this.mesuringLayer = this.appState.get("interactions").get("mesuring").get("layer").value,
                this.drawingInteraction = this.appState.get("interactions").get("drawing").get("interaction").value,
                this.mesuringInteraction = this.appState.get("interactions").get("mesuring").get("interaction").value,
                this.mesuringOverlay = this.appState.get("interactions").get("mesuring").get("overlay").value,
                this.drawingLayerVisible = this.drawingLayer.get("visible"),
                this.mesureLayerVisible = this.mesuringLayer.get("visible"),
                this.featuresResultsLayer = this.appState.get("interactions").get("featuresResults").get("layer").value,
                this.featuresResultsLayerVisible = this.featuresResultsLayer.get("visible")
            }
            ,
            e.prototype.updateDrawing = function(e) {
                if (this.drawingLayer.setVisible(e),
                this.mesuringLayer.setVisible(e),
                null !== this.mesuringOverlay)
                    if (e) {
                        var t = document.getElementsByClassName("tooltip-c");
                        Array.from(t).forEach(function(e) {
                            e.style.display = "block"
                        })
                    } else {
                        t = document.getElementsByClassName("tooltip-c");
                        Array.from(t).forEach(function(e) {
                            e.style.display = "none"
                        })
                    }
                this.appState.get("interactions").get("drawing").get("layer").setValue(this.drawingLayer),
                this.appState.get("interactions").get("mesuring").get("layer").setValue(this.mesuringLayer)
            }
            ,
            e.prototype.updateFeaturesResults = function(e) {
                this.featuresResultsLayer.setVisible(e),
                this.appState.get("interactions").get("featuresResults").get("layer").setValue(this.featuresResultsLayer)
            }
            ,
            e.prototype.isMenuEmpty = function() {
                return 0 === this.drawingLayer.getSource().getFeatures().length && 0 === this.mesuringLayer.getSource().getFeatures().length && 0 === this.featuresResultsLayer.getSource().getFeatures().length
            }
            ,
            e.prototype.isDrawingAndMesuringEmpty = function() {
                return 0 === this.drawingLayer.getSource().getFeatures().length && 0 === this.mesuringLayer.getSource().getFeatures().length
            }
            ,
            e.prototype.isFeaturesResultsEmpty = function() {
                return 0 === this.featuresResultsLayer.getSource().getFeatures().length
            }
            ,
            qi([Object(i.Input)(), Qi("design:type", f.d)], e.prototype, "appState", void 0),
            e = qi([Object(i.Component)({
                selector: "app-interaction-selection",
                template: n("z0li"),
                styles: [n("bva2")]
            }), Qi("design:paramtypes", [])], e)
        }(), ea = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , ta = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , na = function() {
            function e(e, t) {
                this.labelService = e,
                this.cmsService = t,
                this.situationString = {
                    nl: "...",
                    fr: "...",
                    de: "...",
                    en: "..."
                }
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.cmsService.getCmsContentByKey("SITUATION_TOOLTIP").subscribe(function(t) {
                    e.situationString = t
                })
            }
            ,
            e.prototype.getLabelForKey = function(e) {
                return this.labelService.getLabel(e).filter(function(e) {
                    return void 0 !== e
                }).map(function(e) {
                    return e.value
                })
            }
            ,
            e.prototype.getCmsValueForKey = function(e) {
                return this.cmsService.getCmsContentByKey(e)
            }
            ,
            e.prototype.lang = function() {
                return this.labelService.lang.value.toLowerCase()
            }
            ,
            e.prototype.strip_html_tags = function(e) {
                return null !== e && "" !== e && (e = e.toString()).replace(/<[^>]*>/g, "")
            }
            ,
            ea([Object(i.Input)(), ta("design:type", f.d)], e.prototype, "formGroup", void 0),
            e = ea([Object(i.Component)({
                selector: "app-switch-situation",
                template: n("/fTm"),
                styles: [n("weUI")]
            }), ta("design:paramtypes", [s.b, se])], e)
        }(), ia = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , aa = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , oa = function() {
            function e(e, t) {
                this.formBuilder = e,
                this.labelService = t
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.userLayer = this.appState.get("userLayer").value,
                this.permissions = this.appState.get("permissions").value,
                this.appState.get("userLayer").valueChanges.subscribe(function(t) {
                    e.userLayer = t
                })
            }
            ,
            e.prototype.getKeys = function(e) {
                if (void 0 != e)
                    return Array.from(e.keys())
            }
            ,
            e.prototype.removeUserLayer = function(e) {
                e.active = !1,
                e.addedToMap = !1,
                this.appState.get("userLayer").setValue(this.userLayer)
            }
            ,
            e.prototype.removeSubLayer = function(e, t, n) {
                this.removeUserLayer(e.get(t)),
                this.updateUserLayer()
            }
            ,
            e.prototype.updateUserLayer = function() {
                this.appState.get("userLayer").setValue(this.userLayer)
            }
            ,
            e.prototype.hideGroup = function(e) {
                e.hidden = !e.hidden
            }
            ,
            e.prototype.hideSGroup = function(e) {
                this.hideGroup(e.get("header")),
                this.getKeys(e.get("groups").forEach(function(t) {
                    t.hidden = e.get("header").hidden
                }))
            }
            ,
            e.prototype.showOpacity = function(e) {
                e.showOpacity = !e.showOpacity
            }
            ,
            e.prototype.showMoreInformationFor = function(e) {
                e.moreInformation = !e.moreInformation
            }
            ,
            e.prototype.checkIfGroupEmpty = function(e) {
                return !(e.get("layers").size > 0) && (e.get("groups").forEach(function(e) {
                    if (e.size > 0)
                        return !1
                }),
                !0)
            }
            ,
            e.prototype.removeWMS = function(e, t) {
                e.get("header").active = !1,
                this.updateWMSVisibility(e),
                this.userLayer.splice(t, 1),
                this.updateUserLayer(),
                this.appState.get("userLayers").value.forEach(function(t) {
                    t.forEach(function(t) {
                        var n = t.url.split("?")[0];
                        (n = n.split("://")[1]).toUpperCase() !== e.get("header").url.split("://")[1].toUpperCase() || (t.addedToMap = !1)
                    })
                })
            }
            ,
            e.prototype.updateWMSVisibility = function(e) {
                e.get("layers").forEach(function(t) {
                    e.get("header").active && t.active ? t.addedToMap = !0 : t.addedToMap = !1
                }),
                e.get("groups").forEach(function(t) {
                    t.get("layers").forEach(function(t) {
                        e.get("header").active && t.active ? t.addedToMap = !0 : t.addedToMap = !1
                    }),
                    t.get("groups").forEach(function(t) {
                        t.get("layers").forEach(function(t) {
                            e.get("header").active && t.active ? t.addedToMap = !0 : t.addedToMap = !1
                        }),
                        t.get("groups").forEach(function(t) {
                            t.forEach(function(t) {
                                e.get("header").active && t.active ? t.addedToMap = !0 : t.addedToMap = !1
                            })
                        })
                    })
                }),
                this.updateUserLayer()
            }
            ,
            e.prototype.isMapEmpty = function(e) {
                var t = this
                  , n = !0;
                return e.get("layers").forEach(function(e) {
                    e && (n = !1)
                }),
                e.get("groups").forEach(function(e) {
                    !1 === t.checkIfGroupEmpty(e) && (n = !1)
                }),
                n
            }
            ,
            e.prototype.isUserLayerSectionEmpty = function() {
                return null === this.userLayer || 0 === this.userLayer.length
            }
            ,
            e.prototype.getUserMapPermission = function(e, t) {
                return e.get("header").permissions[this.permissions][t]
            }
            ,
            e.prototype.getPermissionFromUserLayer = function(e, t, n) {
                var i = {
                    presentInToc: !1,
                    visibleByDefault: !1,
                    deletion: !1,
                    addition: !1
                };
                return this.userLayer.get(t).get(e).permissions && this.userLayer.get(t).get(e).permissions[this.permissions][n] ? this.userLayer.get(t).get(e).permissions[this.permissions][n] : i.attributeFromPermissions
            }
            ,
            e.prototype.isUserLayersSectionEmpty = function(e) {
                var t = this
                  , n = !0;
                return this.userLayer.forEach(function(i, a) {
                    !1 === t.isUserLayersGroupEmpty(a, e) && (n = !1)
                }),
                n
            }
            ,
            e.prototype.isUserLayersGroupEmpty = function(e, t) {
                var n = this
                  , i = !0;
                return this.getKeys(this.userLayer.get(e)).forEach(function(a) {
                    n.userLayer.get(e).get(a).permissions && n.userLayer.get(e).get(a).permissions[n.permissions][t] && !n.userLayer.get(e).get(a).addedToMap && (i = !1)
                }),
                i
            }
            ,
            e.prototype.moveUp = function(e) {
                if (e > 0) {
                    var t = this.userLayer
                      , n = e - 1
                      , i = t[n];
                    t[n] = t[e],
                    t[e] = i,
                    this.userLayer = t,
                    this.appState.get("userLayer").setValue(this.userLayer)
                }
            }
            ,
            e.prototype.moveDown = function(e) {
                if (e < this.userLayer.length - 1) {
                    var t = this.userLayer
                      , n = e + 1
                      , i = t[n];
                    t[n] = t[e],
                    t[e] = i,
                    this.userLayer = t,
                    this.appState.get("userLayer").setValue(this.userLayer)
                }
            }
            ,
            ia([Object(i.Input)(), aa("design:type", f.d)], e.prototype, "appState", void 0),
            e = ia([Object(i.Component)({
                selector: "app-user-layer-list",
                template: n("60+X"),
                styles: [n("0CVn")]
            }), aa("design:paramtypes", [f.b, s.b])], e)
        }(), ra = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , sa = function() {
            function e() {}
            return e = ra([Object(i.NgModule)({
                imports: [Ct.CommonModule, s.a, vn, f.e, Hn.a, We.c.forRoot(), f.h, yi.a, Ri.MyDatePickerModule, Wi.a],
                declarations: [An, Vn, Gn, zi, Wn, _n, Ni, fi, Ii, wi, Ai, Zi, Je, Ji, Kn, $i, na, oa, Gi],
                exports: [An, Vn, Gn, zi, Wn, Ni, fi, Ii, wi, Ai, Zi, Ji, Kn, $i, na],
                entryComponents: [_n, Je, Pn, Kn, Gi],
                providers: [bi, pe]
            })], e)
        }(), la = n("Bj4q"), ca = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , pa = function() {
            function e() {}
            return e = ca([Object(i.NgModule)({
                imports: [Ct.CommonModule],
                declarations: [],
                exports: [],
                providers: [k]
            })], e)
        }(), ua = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , da = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , ga = function() {
            function e(e) {
                this.http = e
            }
            return e.prototype.generateImage = function(e) {
                return this.http.post(C.ECAD_IMAGE, e, {
                    responseType: "text"
                })
            }
            ,
            e = ua([Object(i.Injectable)(), da("design:paramtypes", [S.a])], e)
        }(), ha = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , fa = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , ya = function() {
            function e(e, t) {
                this.http = e,
                this.printService = t
            }
            return e.prototype.getFileList = function() {
                return this.http.get(C.VP_TOOL + "/list")
            }
            ,
            e.prototype.sendFileToVp = function(e) {
                var t = (new S.c).set("Content-Type", "application/json");
                return this.http.post(C.VP_TOOL + "/" + e + "/sendToVp", {
                    headers: t
                })
            }
            ,
            e.prototype.getScripturaDocumentFromVp = function(e, t) {
                return this.http.post(C.IMAGE_VP_TOOL + "/" + t, e, {
                    responseType: "blob"
                })
            }
            ,
            e = ha([Object(i.Injectable)(), fa("design:paramtypes", [S.a, ga])], e)
        }(), ma = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , va = function() {
            function e() {}
            return e = ma([Object(i.NgModule)({
                imports: [],
                exports: [],
                declarations: [],
                providers: [be, En, tt, p, ae, Ze, se, ge, ct, $n, ri, ga, te.a, Fi, ya]
            })], e)
        }(), ba = function() {
            function e() {
                this.subscriptions = Array()
            }
            return e.prototype.ngOnInit = function() {}
            ,
            e.prototype.ngOnDestroy = function() {
                this.subscriptions.forEach(function(e) {
                    e.unsubscribe()
                })
            }
            ,
            e.prototype.addSubscription = function(e) {
                this.subscriptions.push(e)
            }
            ,
            e.prototype.enableLoading = function(e) {
                setTimeout(function() {
                    e.enableLoading()
                })
            }
            ,
            e.prototype.disableLoading = function(e) {
                setTimeout(function() {
                    e.disableLoading()
                })
            }
            ,
            e
        }(), Sa = this && this.__extends || (Ue = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && (e[n] = t[n])
        }
        ,
        function(e, t) {
            function n() {
                this.constructor = e
            }
            Ue(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), Ca = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Ia = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , La = function(e) {
            function t(t, n, i) {
                var a = e.call(this) || this;
                return a.fb = t,
                a.configService = n,
                a.userService = i,
                a
            }
            return Sa(t, e),
            t.prototype.ngOnInit = function() {
                var e = this;
                this.configurationForm = this.fb.group({
                    configurationFile: null
                }),
                !1 === this.userService.permissions.manageConfiguration && (window.location.hostname.endsWith("intra") ? window.open("/ecad-login-intra", "_self") : window.open("/404", "_self")),
                this.addSubscription(this.configService.getAllConfiguration().subscribe(function(t) {
                    e.configurations = t
                }))
            }
            ,
            t.prototype.getConfigurationUrlByName = function(e) {
                return this.configService.getConfigUrlByName(e)
            }
            ,
            t.prototype.reloadConfigurations = function() {
                var e = this;
                this.configService.getAllConfiguration().toPromise().then(function(t) {
                    e.configurations = t
                })
            }
            ,
            t.prototype.deleteConfiguration = function(e) {
                var t = this;
                "TOC" !== e && this.configService.removeConfiguration(e).toPromise().then(function() {
                    return t.reloadConfigurations()
                })
            }
            ,
            t.prototype.editConfiguration = function(e) {
                var t = this;
                this.configService.getConfigByName(e).subscribe(function(e) {
                    t.inputConfiguration = e
                })
            }
            ,
            t.prototype.login = function() {
                window.location.hostname.endsWith("intra") && window.open("/ecad-login-intra", "_self")
            }
            ,
            t = Ca([Object(i.Component)({
                selector: "app-configuration",
                template: n("MaTU"),
                styles: [n("rfts")]
            }), Ia("design:paramtypes", [f.b, O, ae])], t)
        }(ba), Oa = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Aa = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Ra = function() {
            function e(e, t, n, i, a) {
                this.fb = e,
                this.route = t,
                this.configService = n,
                this.userService = i,
                this.documentService = a,
                this.footerMaxSize = 25
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.appState = this.fb.group({
                    mapLoading: !1,
                    permissions: "",
                    userInformation: "",
                    currentSituation: "CURRENT",
                    layers: null,
                    layerList: null,
                    backdrops: null,
                    userLayer: [],
                    mapping: null,
                    inspire: null,
                    historic: null,
                    userLayers: null,
                    translations: null,
                    featureLoading: !1,
                    pendingLoading: !1,
                    vectorActivated: !1,
                    showMenuLayer: !1,
                    showMenuTools: !1,
                    showAdvancedSearch: !1,
                    showPrintSelection: !1,
                    showResultList: !1,
                    officialImageGenerated: !1,
                    imagePlan: null,
                    search: "",
                    searchResultCapakey: null,
                    searchResultStreet: null,
                    searchResultCoordinates: null,
                    measureToolChoice: "None",
                    drawToolChoice: "None",
                    spatialAnalysisChoice: "None",
                    extractionToolChoice: "None",
                    structuredSearchChoice: "None",
                    structuredSearchOptionsToggle: "",
                    advancedSearchChoice: "None",
                    spatialAnalysisType: "None",
                    spatialAnalysisRoundOption: "None",
                    spatialAnalysisTenantsOption: "None",
                    spatialAnalysisCapakeySelection: !1,
                    spatialSearchOption: "None",
                    spatialSearchPointNewRequest: !0,
                    isTableNameChosen: !1,
                    spatialAnalysisCoordinates: !1,
                    sourceOnMap: null,
                    resultOnMap: null,
                    featureAtPixel: [],
                    interactions: this.fb.group({
                        drawing: this.fb.group({
                            layer: null,
                            interaction: null
                        }),
                        mesuring: this.fb.group({
                            layer: null,
                            interaction: null,
                            overlay: null
                        }),
                        featuresResults: this.fb.group({
                            layer: null
                        })
                    }),
                    print: this.fb.group({
                        printResult: "",
                        triggerPrint: !1,
                        printLoading: !1,
                        printBox: null,
                        printPageSize: "A4",
                        printOfficial: !0,
                        printScale: null,
                        printResolution: "150",
                        printOrientation: "portrait",
                        printDivision: "",
                        pdfGenerated: null
                    }),
                    cadex: this.fb.group({
                        active: !1,
                        action: null,
                        uid: null,
                        capakey: null,
                        selectType: null,
                        radius: null,
                        fiscYear: null,
                        returnUrl: null,
                        directValidation: !1,
                        responseBody: ""
                    }),
                    precad: this.fb.group({
                        active: !1,
                        action: null,
                        uid: null,
                        capakey: null,
                        selectType: null,
                        radius: null,
                        fiscYear: null,
                        returnUrl: null,
                        directValidation: !1,
                        responseBody: ""
                    }),
                    cdms: this.fb.group({
                        active: !1,
                        action: null,
                        uid: null,
                        capakey: null,
                        selectType: null,
                        radius: null,
                        fiscYear: null,
                        returnUrl: null,
                        directValidation: !1,
                        responseBody: ""
                    }),
                    featuresFromSpatialSelection: null,
                    coordinatesFromSpatialSelection: null,
                    selectedLayer: null,
                    searchResultList: null,
                    searchResultTable: "BPN_CAPA",
                    resultListReady: !1,
                    vizualizeResult: null,
                    capakeysAtPixel: null,
                    coordinatesAtPixel: null,
                    autoComplete: !1,
                    chosenTools: null,
                    inspireGrps: null,
                    textData: this.fb.group({
                        drawText: "default Text",
                        font: "Verdana",
                        weight: "Normal",
                        size: "12px",
                        color: "#3284ff"
                    }),
                    infoParcelleHover: this.fb.group({
                        CaPaKey: ""
                    }),
                    infoParcelleClick: this.fb.group({
                        CaPaKey: ""
                    }),
                    currentZoom: null,
                    drawFeaturesResultsLayerOn: !1,
                    displayFeaturesResultsOnMap: !1,
                    displayFeaturePointFromSearchOnMap: !1,
                    spatialSearchResults: null,
                    removeFeatureFromResults: null,
                    polygon4Extraction: null,
                    geometry4Extraction: null,
                    sections: new Map([["layersGr", 4]]),
                    zIndex: this.fb.group({
                        layers: 3,
                        inspire: 4,
                        historic: 4,
                        user: 1
                    }),
                    extractionObjectId: null
                }),
                this.getPermission(),
                setTimeout(function() {
                    e.footerMaxSize = 0
                }, 7e3),
                this.getUserInformation(),
                setTimeout(function() {
                    e.footerMaxSize = 0
                }, 7e3)
            }
            ,
            e.prototype.getMapClass = function() {
                return this.configService.getConfig() && this.configService.getConfig().menus.topbar.visibility ? "map-container" : "map-container-fullscreen"
            }
            ,
            e.prototype.getPermission = function() {
                "" === this.appState.get("permissions").value && (!0 === this.userService.permissions.accessIntraFeatures ? this.appState.get("permissions").setValue("INTRA") : !0 === this.userService.permissions.accessSurveyorFeatures ? this.appState.get("permissions").setValue("SURVEYOR") : !0 === this.userService.permissions.accessPartnerFeatures ? this.appState.get("permissions").setValue("PARTNER") : !0 === this.userService.permissions.accessCitizenFeatures ? this.appState.get("permissions").setValue("CITIZEN") : this.appState.get("permissions").setValue("WEB"))
            }
            ,
            e.prototype.getUserInformation = function() {
                var e = this;
                this.userService.getUserInformation().toPromise().then(function(t) {
                    e.appState.get("userInformation").setValue(t)
                })
            }
            ,
            e = Oa([Object(i.Component)({
                selector: "app-ecad",
                template: n("n1Fo"),
                styles: [n("lp5g")]
            }), Aa("design:paramtypes", [f.b, pt.a, O, ae, ri])], e)
        }(), Ta = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Ea = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , wa = function() {
            function e() {}
            return e.prototype.ngOnInit = function() {}
            ,
            e = Ta([Object(i.Component)({
                selector: "error404",
                template: n("HCeK")
            }), Ea("design:paramtypes", [])], e)
        }(), ka = this && this.__extends || function() {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    t.hasOwnProperty(n) && (e[n] = t[n])
            }
            ;
            return function(t, n) {
                function i() {
                    this.constructor = t
                }
                e(t, n),
                t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype,
                new i)
            }
        }(), _a = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , xa = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Na = function(e) {
            function t(t, n, i, a, o, r, s, l, c) {
                var p = e.call(this) || this;
                return p.fb = t,
                p.cms = n,
                p.route = i,
                p.router = a,
                p.notif = o,
                p.modalService = r,
                p.userService = s,
                p.ccffService = l,
                p.labelService = c,
                p.languageSelected = "NL",
                p.dtTrigger = new Ft.Subject,
                p.dtOptions = {
                    autoWidth: !1,
                    destroy: !0,
                    info: !0,
                    paging: !0,
                    pagingType: "full_numbers",
                    stateSave: !1
                },
                p.tinyMceSettings = {
                    skin_url: "assets/tinymce/skins/ui/oxide",
                    content_css: "assets/tinymce/skins/content/default/content.css",
                    inline: !1,
                    statusbar: !0,
                    invalid_elements: "script",
                    resize: !0,
                    branding: !1,
                    browser_spellcheck: !0,
                    height: 320,
                    toolbar: "formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image media | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | customInsertButton | removeformat ",
                    plugins: "fullscreen link lists media image",
                    setup: function(e) {
                        e.ui.registry.addButton("customInsertButton", {
                            text: "CMS Page Link",
                            onAction: function(t) {
                                e.insertContent('<span>[[key="",label=""]]</span>')
                            }
                        })
                    }
                },
                p
            }
            return ka(t, e),
            t.prototype.ngOnInit = function() {
                var e = this;
                "FR" === this.getLang() ? this.languageUrl = "assets/datatables/French.json" : "NL" === this.getLang() ? this.languageUrl = "assets/datatables/Dutch.json" : "DE" === this.getLang() ? this.languageUrl = "assets/datatables/German.json" : "EN" === this.getLang() && (this.languageUrl = "assets/datatables/English.json"),
                !1 === this.userService.permissions.manageConfiguration && (window.location.hostname.endsWith("intra") ? window.open("/ecad-login-intra", "_self") : window.location.hostname.endsWith("localhost") || this.router.navigate(["404"])),
                this.formGroup = this.fb.group({
                    key: "",
                    nl: "",
                    fr: "",
                    de: "",
                    en: ""
                }),
                this.cms.getCmsKeys().subscribe(function(t) {
                    e.cmsItems = t,
                    e.dtTrigger.next()
                }),
                this.addSubscription(this.formGroup.get("key").valueChanges.subscribe(function(t) {
                    e.cms.getCmsContentByKey(t).subscribe(function(t) {
                        e.formGroup.get("nl").setValue(t.nl),
                        e.formGroup.get("fr").setValue(t.fr),
                        e.formGroup.get("de").setValue(t.de),
                        e.formGroup.get("en").setValue(t.en)
                    })
                })),
                "" !== this.route.snapshot.params.key && this.formGroup.get("key").setValue(this.route.snapshot.params.key)
            }
            ,
            t.prototype.clickSaveCmsItem = function(e, t) {
                var n = this;
                if (null === e || "" === e || void 0 === e)
                    this.notif.notify("error", "NOTIFICATION_CMS_SAVE_ERROR");
                else {
                    var i = {
                        nl: this.formGroup.get("nl").value,
                        fr: this.formGroup.get("fr").value,
                        de: this.formGroup.get("de").value,
                        en: this.formGroup.get("en").value
                    };
                    this.cms.saveCmsItem(e, JSON.stringify(i)).subscribe(function(e) {
                        n.notif.notify("success", "NOTIFICATION_CMS_SAVE_SUCCESS")
                    })
                }
                t && this.cms.getCmsKeys().subscribe(function(e) {
                    n.cmsItems = e
                })
            }
            ,
            t.prototype.deleteKey = function(e, t) {
                var n = this;
                this.cms.deleteCmsItem(e).subscribe(function() {
                    n.notif.notify("success", "NOTIFICATION_CMS_SAVE_SUCCESS"),
                    t > -1 && ($("#tableData").DataTable().row(t).remove(),
                    $("#tableData").DataTable().draw(!1))
                })
            }
            ,
            t.prototype.openModal = function(e) {
                var t = this;
                this.modalRef = this.modalService.open(e),
                this.modalRef.result.then(function(e) {
                    t.closeResult = "Closed with: " + e
                }, function(e) {
                    t.closeResult = "Dismissed"
                })
            }
            ,
            t.prototype.closeModal = function(e) {
                this.modalRef.close(e)
            }
            ,
            t.prototype.chooseKey = function(e) {
                this.formGroup.get("key").setValue(e)
            }
            ,
            t.prototype.getLang = function() {
                return this.labelService.lang.value
            }
            ,
            t.prototype.goToHelpPage = function() {
                this.router.navigate(["/help", this.formGroup.get("key").value])
            }
            ,
            t.prototype.goToEcad = function() {
                this.router.navigate(["/"])
            }
            ,
            t.prototype.goToMyminfin = function() {
                this.ccffService.getMyminfinUrl().subscribe(function(e) {
                    window.location.href = e
                })
            }
            ,
            t.prototype.exportCMS = function() {
                var e = this;
                this.cms.exportCmsItems().subscribe(function(t) {
                    e.download(t, "export-cms.json", "application/json")
                })
            }
            ,
            t.prototype.importCMS = function() {
                var e = this;
                null !== this.importFile && this.cms.importCmsItems(this.importFile).subscribe(function(t) {
                    e.notif.notify("success", "NOTIFICATION_CMS_SAVE_SUCCESS")
                })
            }
            ,
            t.prototype.onFileChange = function(e) {
                var t = this;
                e.target.files[0].text().then(function(e) {
                    t.importFile = JSON.parse(e)
                })
            }
            ,
            t.prototype.download = function(e, t, n) {
                var i = document.createElement("a")
                  , a = JSON.stringify(e)
                  , o = new Blob([a],{
                    type: n
                });
                i.href = URL.createObjectURL(o),
                i.download = t,
                i.click()
            }
            ,
            t.prototype.changeLanguage = function(e) {
                this.languageSelected = e
            }
            ,
            t = _a([Object(i.Component)({
                selector: "cms-editor",
                template: n("+OYP"),
                styles: [n("W67Y")]
            }), xa("design:paramtypes", [f.b, se, pt.a, pt.b, pe, We.b, ae, ct, s.b])], t)
        }(ba), Pa = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        , Ma = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
        , Fa = function() {
            function e(e, t, n, i, a, o, r, s) {
                this.route = e,
                this.router = t,
                this.cms = n,
                this.ccffService = i,
                this.labelService = a,
                this.sanitizer = o,
                this.userService = r,
                this.utilsService = s,
                this.jsonObservable = Ft.Observable.of({
                    nl: "",
                    fr: "",
                    de: ""
                })
            }
            return e.prototype.ngOnInit = function() {
                var e, t = this;
                this.route.paramMap.subscribe(function(t) {
                    e = t.has("lang") ? t.get("lang") : "NL"
                }),
                "FR" === e ? this.labelService.changeLang("FR") : "NL" === e ? this.labelService.changeLang("NL") : "DE" === e ? this.labelService.changeLang("DE") : "EN" === e && this.labelService.changeLang("EN"),
                this.jsonObservable = this.route.paramMap.pipe(Object(ut.c)(function(e) {
                    return t.key = e.get("key"),
                    t.key ? t.cms.getCmsContentByKey(e.get("key")) : t.cms.getCmsContentByKey("home")
                })),
                this.userService.isUserLogged().subscribe(function(e) {
                    t.userIsLogged = e
                }),
                this.utilsService.getVersion().subscribe(function(e) {
                    t.projectVersion = e
                })
            }
            ,
            e.prototype.getLang = function() {
                return this.labelService.lang.value.toLowerCase()
            }
            ,
            e.prototype.sanitizeStyle = function(e) {
                return this.sanitizer.bypassSecurityTrustHtml(this.replaceLink(e))
            }
            ,
            e.prototype.replaceLink = function(e) {
                var t = "NL";
                this.route.paramMap.subscribe(function(e) {
                    t = e.get("lang")
                });
                var n = new RegExp(/\[\[key="/,"g")
                  , i = new RegExp(/,label="/,"g");
                return e = (e = (e = e.replace(n, '<a href="/ecad-web/#/help/' + t + "/")).replace(i, ">")).replace(/"\]\]/g, "</a>")
            }
            ,
            e.prototype.editPage = function() {
                this.router.navigate(["/cms", this.key])
            }
            ,
            e.prototype.inDevMode = function() {
                return Object(i.isDevMode)()
            }
            ,
            e.prototype.goToEcad = function() {
                this.router.navigate(["/"])
            }
            ,
            e.prototype.getLabelForKey = function(e) {
                return this.labelService.getLabel(e).filter(function(e) {
                    return void 0 !== e
                }).map(function(e) {
                    return e.value
                })
            }
            ,
            e.prototype.login = function() {
                window.location.hostname.endsWith("intra") && window.open("/ecad-login-intra", "_self")
            }
            ,
            e.prototype.logout = function() {
                var e = this;
                this.userService.logout().subscribe(function() {
                    e.userIsLogged = !1
                })
            }
            ,
            e.prototype.lang = function() {
                return this.labelService.lang.value
            }
            ,
            e.prototype.goToMyminfin = function() {
                this.ccffService.getMyminfinUrl().subscribe(function(e) {
                    window.location.href = e
                })
            }
            ,
            e = Pa([Object(i.Component)({
                selector: "app-cms-page",
                template: n("FdoJ"),
                styles: [n("RcJK")]
            }), Ma("design:paramtypes", [pt.a, pt.b, se, ct, s.b, o.DomSanitizer, ae, Ze])], e)
        }();
        var Va = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , Da = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , ja = function() {
            function e(e, t, n) {
                this.userService = e,
                this.notificationService = t,
                this.vpService = n,
                this.dtTrigger = new Ft.Subject,
                this.leftList = [],
                this.rightList = []
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                !1 === this.userService.permissions.manageConfiguration && (window.location.hostname.endsWith("intra") ? window.open("/ecad-login-intra", "_self") : window.open("/404", "_self")),
                this.vpService.getFileList().subscribe(function(t) {
                    e.leftList = t,
                    e.dtTrigger.next()
                })
            }
            ,
            e.prototype.sendToVp = function() {
                var e = this;
                if (0 === this.rightList.length)
                    this.notificationService.notify("error", "vp.failed");
                else {
                    for (var t = 0; t < this.rightList.length; t++)
                        this.vpService.sendFileToVp(this.rightList[t]).catch(function(t) {
                            return e.notificationService.notify("error", "vp.failed"),
                            G.a.empty()
                        }).subscribe(function(e) {});
                    this.notificationService.notify("info", "vp.files.sended")
                }
            }
            ,
            e.prototype.refresh = function() {
                window.location.reload()
            }
            ,
            e = Va([Object(i.Component)({
                selector: "app-vp-interface",
                template: n("Cnq1"),
                styles: [n("5dgJ")]
            }), Da("design:paramtypes", [ae, p, ya])], e)
        }()
          , Ga = [{
            path: "",
            component: Ra
        }, {
            path: "configuration",
            component: La
        }, {
            path: "help/:lang/:key",
            component: Fa
        }, {
            path: "help/:lang",
            redirectTo: "/help/:lang/home"
        }, {
            path: "help",
            redirectTo: "help/NL/home"
        }, {
            path: "precad_help/:lang/:key",
            component: Fa
        }, {
            path: "precad_help/:lang",
            redirectTo: "/precad_help/:lang/precad_home"
        }, {
            path: "precad_help",
            redirectTo: "precad_help/NL/precad_home"
        }, {
            path: "cadex_help/:lang/:key",
            component: Fa
        }, {
            path: "cadex_help/:lang",
            redirectTo: "/cadex_help/:lang/cadex_home"
        }, {
            path: "cadex_help",
            redirectTo: "cadex_help/NL/cadex_home"
        }, {
            path: "cdms_help/:lang/:key",
            component: Fa
        }, {
            path: "cdms_help/:lang",
            redirectTo: "/cdms_help/:lang/cdms_home"
        }, {
            path: "cdms_help",
            redirectTo: "cdms_help/NL/cdms_home"
        }, {
            path: "cms/:key",
            component: Na
        }, {
            path: "cms",
            redirectTo: "/cms/home"
        }, {
            path: "vp",
            component: ja
        }, {
            path: "login",
            component: Ra
        }, {
            path: "404",
            component: wa
        }]
          , Ba = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , Ua = function() {
            function e() {}
            return e = Ba([Object(i.NgModule)({
                imports: [],
                exports: [],
                declarations: [wa],
                providers: []
            })], e)
        }()
          , za = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , Ka = function() {
            function e() {}
            return e = za([Object(i.NgModule)({
                imports: [Ct.CommonModule, Ua, pt.c.forRoot(Ga, {
                    enableTracing: !1,
                    useHash: !0,
                    onSameUrlNavigation: "reload"
                })],
                exports: [pt.c],
                declarations: []
            })], e)
        }()
          , Ya = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , Za = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , Wa = function() {
            function e(e) {
                this.formBuilder = e
            }
            return t = e,
            e.prototype.ngOnInit = function() {
                this._formGroup = t.setupFormGroup(this.formBuilder)
            }
            ,
            Object.defineProperty(e.prototype, "formGroup", {
                get: function() {
                    return this._formGroup
                },
                enumerable: !0,
                configurable: !0
            }),
            e.setupFormGroup = function(e) {
                return e.group({
                    zoomButton: !0,
                    mapScale: !0,
                    coordinates: !0,
                    fullExtent: !0,
                    fullscreen: !0
                })
            }
            ,
            e.prototype.setFormGroup = function(e) {
                this._formGroup = e
            }
            ,
            e = t = Ya([Object(i.Component)({
                selector: "app-map-control-wizard",
                template: n("+XRQ"),
                styles: [n("jZDw")]
            }), Za("design:paramtypes", [f.b])], e);
            var t
        }()
          , Ha = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , Xa = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , Ja = function() {
            function e(e) {
                this.formBuilder = e
            }
            return t = e,
            e.prototype.ngOnInit = function() {
                this._formGroup = t.setupFormGroup(this.formBuilder)
            }
            ,
            Object.defineProperty(e.prototype, "formGroup", {
                get: function() {
                    return this._formGroup
                },
                enumerable: !0,
                configurable: !0
            }),
            e.setupFormGroup = function(e) {
                return e.group({
                    backdropMenu: !0,
                    layerMenu: !0,
                    configMenu: !0,
                    topbar: e.group({
                        visibility: !0,
                        languageMenu: !0,
                        search: !0,
                        infoMenu: !0,
                        userMenu: !0,
                        shareMenu: !0
                    })
                })
            }
            ,
            e.prototype.setFormGroup = function(e) {
                this._formGroup = e
            }
            ,
            e = t = Ha([Object(i.Component)({
                selector: "app-menu-wizard",
                template: n("97RH"),
                styles: [n("SeBM")]
            }), Xa("design:paramtypes", [f.b])], e);
            var t
        }()
          , qa = function() {
            return function() {
                this.BACKDROPS = [{
                    title: "Cartoweb",
                    url: "http://www.ngi.be/cartoweb/1.0.0/WMTSCapabilities.xml",
                    type: "WMTS",
                    layerName: "topo",
                    active: !0,
                    opacity: 1,
                    projection: "EPSG:3812",
                    minScale: 500
                }, {
                    title: "Orhtophoto",
                    url: "http://wms.ngi.be/inspire/ortho/service",
                    type: "WMS",
                    layerName: "Orthoimage coverage",
                    maxScale: 3e3,
                    minScale: 1e3,
                    active: !1,
                    opacity: 1,
                    projection: "EPSG:3812"
                }]
            }
        }()
          , Qa = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , $a = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , eo = function() {
            function e() {
                this._backdrops = [],
                this.chosenBackdrops = [],
                this._selectedBackdrop = null
            }
            return e.prototype.ngOnInit = function() {
                this.defaultBackdrops = new qa,
                this._backdrops = this.defaultBackdrops.BACKDROPS,
                this.chosenBackdrops = []
            }
            ,
            e.prototype.addChosenBackdrop = function() {
                if (this._backdrops.includes(this._selectedBackdrop)) {
                    this.chosenBackdrops.push(this._selectedBackdrop);
                    for (var e = 0; e < this._backdrops.length; e++)
                        this._backdrops[e].title === this._selectedBackdrop.title && this._backdrops.splice(e, 1)
                }
            }
            ,
            e.prototype.removeChosenBackdrop = function() {
                if (this.chosenBackdrops.includes(this._selectedBackdrop)) {
                    this._backdrops.push(this._selectedBackdrop);
                    for (var e = 0; e < this.chosenBackdrops.length; e++)
                        this.chosenBackdrops[e].title === this._selectedBackdrop.title && this.chosenBackdrops.splice(e, 1)
                }
            }
            ,
            e.prototype.choseBackdrop = function(e) {
                this._selectedBackdrop = e
            }
            ,
            Object.defineProperty(e.prototype, "backdrops", {
                get: function() {
                    return this._backdrops
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "selectedBackdrop", {
                get: function() {
                    return this._selectedBackdrop
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.setBackdrops = function(e) {
                null == e ? (this.chosenBackdrops = [],
                this._backdrops = this.defaultBackdrops.BACKDROPS) : (this._backdrops = Bn.pullAllWith(this._backdrops, e, function(e, t) {
                    return e.title === t.title
                }),
                this.chosenBackdrops = e)
            }
            ,
            Qa([Object(i.Input)(), $a("design:type", Object)], e.prototype, "configuration", void 0),
            e = Qa([Object(i.Component)({
                selector: "app-backdrop-wizard",
                template: n("bgOE"),
                styles: [n("btZe")]
            }), $a("design:paramtypes", [])], e)
        }()
          , to = function() {
            function e(e, t) {
                void 0 === t && (t = {}),
                this.subGroups = [],
                this.layers = [],
                this.title = e,
                this.translations = t
            }
            return e.prototype.withSubGroup = function(e) {
                return this.subGroups.push(e),
                this
            }
            ,
            e.prototype.withLayer = function(e) {
                return this.layers.push(e),
                this
            }
            ,
            e
        }()
          , no = function() {
            function e(e) {
                this.layers = [],
                this.title = e
            }
            return e.prototype.withLayer = function(e) {
                return this.layers.push(e),
                this
            }
            ,
            e
        }()
          , io = function() {
            return function(e, t, n, i, a, o, r, s, l, c, p) {
                void 0 === s && (s = !0),
                this.title = e,
                this.layerName = t,
                this.description = n,
                this.active = i,
                this.opacity = a,
                this.wms = o,
                this.canDelete = s,
                this.tiled = r,
                this.legendUrl = l,
                this.searchLimit = p
            }
        }()
          , ao = function() {
            function e() {}
            return e.basicLayers = [new to("Documents"), new to("Incoh\xe9rences"), new to("Limites Administratives").withLayer(new io("Apn_AdRe","4","",!0,1,"http://finvmcgisd03.finbel.intra:6080/arcgis/services/Limites/MapServer/WMSServer",!1,!0)).withLayer(new io("Apn_AdPr","2","",!0,1,"http://finvmcgisd03.finbel.intra:6080/arcgis/services/Limites/MapServer/WMSServer",!1,!0)).withLayer(new io("Apn_AdMu","0","",!0,1,"http://finvmcgisd03.finbel.intra:6080/arcgis/services/Limites/MapServer/WMSServer",!1,!0)), new to("Construction").withLayer(new io("Cadastral building","2","Layer representing cadastral buildings",!0,1,"http://finvmcgisd03.finbel.intra:6080/arcgis/services/CadastralLayers/MapServer/WMSServer",!1,!0)).withLayer(new io("Regional building","1","Regional building",!0,1,"http://finvmcgisd03.finbel.intra:6080/arcgis/services/CadastralLayers/MapServer/WMSServer",!1,!0)).withLayer(new io("Equipement and tools","0","Layer representing the equipment & tools",!0,1,"http://finvmcgisd03.finbel.intra:6080/arcgis/services/CadastralLayers/MapServer/WMSServer",!1,!0)), new to("Parcellaire").withLayer(new io("Cadastral parcel","3","",!0,1,"http://finvmcgisd03.finbel.intra:6080/arcgis/services/CadastralLayers/MapServer/WMSServer",!1,!0)).withLayer(new io("Property stone","6","Layer representing the property stones",!0,1,"http://finvmcgisd03.finbel.intra:6080/arcgis/services/CadastralLayers/MapServer/WMSServer",!1,!0)).withLayer(new io("Easement zone","4","",!0,1,"http://finvmcgisd03.finbel.intra:6080/arcgis/services/CadastralLayers/MapServer/WMSServer",!1,!0)).withSubGroup(new no("Limites Cadastrales")), new to("Adresses"), new to("Zones Particuli\xe8res")],
            e
        }()
          , oo = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , ro = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , so = function() {
            function e(e) {
                this.activeModal = e
            }
            return e.prototype.ngOnInit = function() {}
            ,
            e.prototype.closeModal = function() {
                this.activeModal.close()
            }
            ,
            e = oo([Object(i.Component)({
                selector: "app-layer-wizard-info-modal",
                template: n("zSdt"),
                styles: [n("bPh5")]
            }), ro("design:paramtypes", [We.a])], e)
        }()
          , lo = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , co = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , po = function() {
            function e(e, t, n) {
                this.gisServer = e,
                this.formBuilder = t,
                this.modalService = n,
                this.addedLayer = [],
                this.selectedLayer = null,
                this.selectedGroup = null,
                this.selectedSubGroup = null
            }
            return e.prototype.ngOnInit = function() {
                this.stateFormGroup = this.formBuilder.group({
                    tempGroupTitle: null,
                    tempSubGroupTitle: null,
                    wmsUrl: null
                }),
                this._layerGroups = ao.basicLayers
            }
            ,
            e.prototype.addGroup = function() {
                this._layerGroups.push(new to(this.stateFormGroup.get("tempGroupTitle").value)),
                this.stateFormGroup.get("tempGroupTitle").reset()
            }
            ,
            e.prototype.choseGroup = function(e) {
                this.selectedGroup = e,
                this.selectedSubGroup = null,
                this.selectedLayer = null
            }
            ,
            e.prototype.addSubGroup = function() {
                for (var e = 0, t = this._layerGroups; e < t.length; e++) {
                    var n = t[e];
                    n.title === this.selectedGroup.title && n.subGroups.push(new no(this.stateFormGroup.get("tempSubGroupTitle").value))
                }
                this.selectedGroup = null,
                this.stateFormGroup.get("tempSubGroupTitle").reset()
            }
            ,
            e.prototype.choseSubGroup = function(e) {
                this.selectedSubGroup = e,
                this.selectedGroup = null
            }
            ,
            e.prototype.choseLayer = function(e) {
                null === this.selectedSubGroup && null == this.selectedGroup || (this.selectedLayer = e)
            }
            ,
            e.prototype.addLayer = function() {
                null !== this.selectedGroup && this.addLayerToGroup(),
                null !== this.selectedSubGroup && this.addLayerToSubGroup()
            }
            ,
            e.prototype.addLayerToSubGroup = function() {
                for (var e = 0, t = this._layerGroups; e < t.length; e++)
                    for (var n = 0, i = t[e].subGroups; n < i.length; n++) {
                        var a = i[n];
                        a.title === this.selectedSubGroup.title && a.layers.push(new io(this.selectedLayer.title,this.selectedLayer.name,this.selectedLayer.abstract,!0,1,this.selectedLayer.layerUrl,!0,!0,this.selectedLayer.style[0].legendURL[0].onlineResource.href))
                    }
            }
            ,
            e.prototype.addLayerToGroup = function() {
                for (var e = 0, t = this._layerGroups; e < t.length; e++) {
                    var n = t[e];
                    n.title === this.selectedGroup.title && n.layers.push(new io(this.selectedLayer.title,this.selectedLayer.name,this.selectedLayer.abstract,!0,1,this.selectedLayer.layerUrl,!0,!0,this.selectedLayer.style[0].legendURL[0].onlineResource.href))
                }
            }
            ,
            e.prototype.loadLayersFromUrl = function(e) {
                var t = this;
                this.gisServer.getLayersFromWMSCapabilities(e).subscribe(function(e) {
                    for (var n = e.layers, i = 0, a = n; i < a.length; i++) {
                        a[i].layerUrl = e.layerUrl
                    }
                    t.addedLayer = n
                })
            }
            ,
            e.prototype.clickLoadLayer = function() {
                null !== this.stateFormGroup.get("wmsUrl").value && this.loadLayersFromUrl(this.stateFormGroup.get("wmsUrl").value)
            }
            ,
            e.prototype.removeLayer = function(e, t) {
                this.removeFromArray(e.layers, t)
            }
            ,
            e.prototype.editLayer = function(e) {
                this.modalService.open(so, {
                    size: "lg"
                }).componentInstance.layer = e
            }
            ,
            e.prototype.removeFromArray = function(e, t) {
                for (var n = 0; n < e.length; n++)
                    e[n].title === t.title && e.splice(n, 1)
            }
            ,
            Object.defineProperty(e.prototype, "layerGroups", {
                get: function() {
                    return this._layerGroups
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.setLayers = function(e) {
                this._layerGroups = e
            }
            ,
            lo([Object(i.Input)(), co("design:type", f.d)], e.prototype, "configuration", void 0),
            e = lo([Object(i.Component)({
                selector: "app-layer-wizard",
                template: n("Z7SL"),
                styles: [n("x3QM")]
            }), co("design:paramtypes", [En, f.b, We.b])], e)
        }()
          , uo = function() {
            return function(e, t) {
                this.name = e,
                this.configuration = t
            }
        }()
          , go = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , ho = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , fo = function() {
            function e(e) {
                this.formBuilder = e,
                this.mobileZoomLevels = [],
                this.zoomLevels = []
            }
            return t = e,
            e.prototype.ngOnInit = function() {
                this.zoomLevels = [1e6, 5e5, 25e4, 1e5, 5e4, 25e3, 1e4, 5e3, 2500, 1e3, 500, 250, 100, 50],
                this.mobileZoomLevels = [4e6, 2e6],
                this._formGroup = t.setupFormGroup(this.formBuilder),
                this._componentState = this.formBuilder.group({
                    zoomLevelToAdd: null
                })
            }
            ,
            e.prototype.addZoomLevel = function() {
                this.zoomLevels.push(this._componentState.get("zoomLevelToAdd").value),
                this.zoomLevels = Bn.uniq(this.zoomLevels.sort(function(e, t) {
                    return t - e
                }))
            }
            ,
            e.prototype.moveToMobileLevel = function(e) {
                var t = Bn.pullAt(this.zoomLevels, e);
                this.mobileZoomLevels.push(t[0]),
                this.mobileZoomLevels = Bn.uniq(this.mobileZoomLevels.sort(function(e, t) {
                    return t - e
                }))
            }
            ,
            e.prototype.moveToComputerLevel = function(e) {
                var t = Bn.pullAt(this.mobileZoomLevels, e);
                this.zoomLevels.push(t[0]),
                this.zoomLevels = Bn.uniq(this.zoomLevels.sort(function(e, t) {
                    return t - e
                }))
            }
            ,
            e.prototype.deleteZoomLevel = function(e) {
                Bn.pullAt(this.zoomLevels, e)
            }
            ,
            e.prototype.setZoomLevel = function(e, t) {
                this.mobileZoomLevels = Bn.pullAll(t, e),
                this.zoomLevels = e
            }
            ,
            e.prototype.trackByIndex = function(e, t) {
                return e
            }
            ,
            e.setupFormGroup = function(e) {
                return e.group({})
            }
            ,
            e = t = go([Object(i.Component)({
                selector: "app-zoom-levels-wizard",
                template: n("rqBW"),
                styles: [n("SMwe")]
            }), ho("design:paramtypes", [f.b])], e);
            var t
        }()
          , yo = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , mo = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , vo = function() {
            function e(e) {
                this.modal = e
            }
            return e.prototype.ngOnInit = function() {}
            ,
            e = yo([Object(i.Component)({
                selector: "edit-confirmation-modal-component",
                template: n("EDZV")
            }), mo("design:paramtypes", [We.a])], e)
        }()
          , bo = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , So = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , Co = function() {
            function e(e, t, n) {
                this.formBuilder = e,
                this.configService = t,
                this.modalService = n,
                this.onSubmitted = new i.EventEmitter,
                this.configuration = null,
                this.mapControlConfiguration = Wa.setupFormGroup(this.formBuilder),
                this.menuConfiguration = Ja.setupFormGroup(this.formBuilder),
                this.backdropConfiguration = [],
                this.layerConfiguration = [],
                this.zoomLevel = [],
                this.mobileZoomLevel = []
            }
            return e.prototype.ngOnInit = function() {
                this.configurationFormGroup = this.formBuilder.group({
                    configName: ["", [f.i.required, f.i.minLength(1)]]
                })
            }
            ,
            e.prototype.ngOnChanges = function() {
                null != this.configuration && (this.mapControlConfiguration.patchValue(this.configuration.mapControls),
                this.menuConfiguration.patchValue(this.configuration.menus),
                this.backdropConfiguration = this.configuration.backdrops,
                this.layerConfiguration = this.configuration.layers,
                this.configurationFormGroup.get("configName").setValue(this.configuration.configName),
                this.mapControl.setFormGroup(this.mapControlConfiguration),
                this.menuWizard.setFormGroup(this.menuConfiguration),
                this.backdropWizard.setBackdrops(this.backdropConfiguration),
                this.layerWizard.setLayers(this.layerConfiguration),
                this.zoomWizard.setZoomLevel(this.configuration.zoomLevels, this.configuration.mobileZoomLevels))
            }
            ,
            e.prototype.checkIfConfigExist = function() {
                var e = this;
                this.configService.getConfigByName(this.configurationFormGroup.get("configName").value).toPromise().then(function(t) {
                    e.modalService.open(vo, {
                        size: "lg"
                    }).result.then(function(t) {
                        !0 === t && e.sendNewConfig()
                    })
                }).catch(function(t) {
                    e.sendNewConfig()
                })
            }
            ,
            e.prototype.sendNewConfig = function() {
                var e = this;
                this.configurationFormGroup.addControl("mapControls", this.mapControl.formGroup),
                this.configurationFormGroup.addControl("menus", this.menuWizard.formGroup),
                this.configurationFormGroup.addControl("backdrops", new f.c(this.backdropWizard.chosenBackdrops)),
                this.configurationFormGroup.addControl("layers", new f.c(this.layerWizard.layerGroups)),
                this.configurationFormGroup.addControl("zoomLevels", new f.c(this.zoomWizard.zoomLevels)),
                this.configurationFormGroup.addControl("mobileZoomLevels", new f.c(Bn.concat(this.zoomWizard.mobileZoomLevels, this.zoomWizard.zoomLevels))),
                this.configService.validateConfiguration(JSON.stringify(this.configurationFormGroup.value)).toPromise().then(function(t) {
                    0 !== t.length ? e.exceptions = t : e.configService.createNewConfig(new uo(e.configurationFormGroup.get("configName").value,JSON.stringify(e.configurationFormGroup.value))).toPromise().then(function(t) {
                        e.resetForm(),
                        e.layerWizard.ngOnInit(),
                        e.backdropWizard.ngOnInit(),
                        e.mapControl.ngOnInit(),
                        e.menuWizard.ngOnInit(),
                        e.wizard.goToStep(e.wizard.steps[0]),
                        e.onSubmitted.emit()
                    }).catch(function(e) {})
                })
            }
            ,
            e.prototype.resetForm = function() {
                this.configurationFormGroup.reset(),
                this.configurationFormGroup.removeControl("backdrops"),
                this.configurationFormGroup.removeControl("layers"),
                this.configurationFormGroup.removeControl("menus"),
                this.configurationFormGroup.removeControl("mapControls"),
                this.configurationFormGroup.removeControl("zoomLevels"),
                this.configurationFormGroup.removeControl("mobileZoomLevels")
            }
            ,
            bo([Object(i.Output)(), So("design:type", i.EventEmitter)], e.prototype, "onSubmitted", void 0),
            bo([Object(i.Input)(), So("design:type", Object)], e.prototype, "configuration", void 0),
            bo([Object(i.ViewChild)(Wa), So("design:type", Wa)], e.prototype, "mapControl", void 0),
            bo([Object(i.ViewChild)(Ja), So("design:type", Ja)], e.prototype, "menuWizard", void 0),
            bo([Object(i.ViewChild)(eo), So("design:type", eo)], e.prototype, "backdropWizard", void 0),
            bo([Object(i.ViewChild)(po), So("design:type", po)], e.prototype, "layerWizard", void 0),
            bo([Object(i.ViewChild)(fo), So("design:type", fo)], e.prototype, "zoomWizard", void 0),
            bo([Object(i.ViewChild)(en), So("design:type", en)], e.prototype, "wizard", void 0),
            e = bo([Object(i.Component)({
                selector: "app-configuration-wizard",
                template: n("jLjg"),
                styles: [n("sYrl")]
            }), So("design:paramtypes", [f.b, O, We.b])], e)
        }()
          , Io = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , Lo = function() {
            function e() {}
            return e = Io([Object(i.NgModule)({
                imports: [Ct.CommonModule, s.a, vn, f.h, f.e, an],
                declarations: [La, Co, Wa, Ja, eo, po, fo, so, vo],
                entryComponents: [so, vo]
            })], e)
        }()
          , Oo = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , Ao = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , Ro = function() {
            function e(e, t, n, i, a, o, r) {
                this.searchService = e,
                this.localisationService = t,
                this.notificationService = n,
                this.configService = i,
                this.labelService = a,
                this.sanitizer = o,
                this.cms = r,
                this.layerNames = [],
                this.pendingSearch = !1,
                this.cmsKeys = new Map,
                this.featuresByLayer = new Map,
                this.layerNameTranslations = new Map,
                this.layerNameLayerTable = new Map,
                this.layerVectorMapping = new Map,
                this.config = this.configService.getConfig()
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.appState.get("chosenTools").valueChanges.subscribe(function(e) {
                    "POPUP" !== e && document.getElementById("popup-closer") && document.getElementById("popup-closer").click()
                }),
                this.configService.loadCurrentConfig().then(function(t) {
                    t.layers.forEach(function(t) {
                        t.layers.forEach(function(t) {
                            t.current.vector && (e.layerNames.push(t.titleKey),
                            e.getCmsValueForKey(t.titleKey),
                            e.layerNameTranslations.set(t.titleKey, e.getCmsValueForKey(t.titleKey)),
                            e.layerNameLayerTable.set(t.titleKey, t.tableName),
                            e.layerVectorMapping.set(t.tableName, t))
                        }),
                        t.subGroups && t.subGroups.forEach(function(t) {
                            t.layers.forEach(function(t) {
                                t.current.vector && e.layerNames.push(t.titleKey),
                                e.layerNameTranslations.set(t.titleKey, e.getCmsValueForKey(t.titleKey)),
                                e.layerNameLayerTable.set(t.titleKey, t.tableName),
                                e.layerVectorMapping.set(t.tableName, t)
                            })
                        })
                    })
                })
            }
            ,
            e.prototype.ngOnChanges = function(e) {
                var t = document.getElementsByClassName("info-features");
                Array.from(t).forEach(function(e) {
                    e.style.display = "none"
                });
                var n = document.getElementsByClassName("info-features-button");
                Array.from(n).forEach(function(e) {
                    e.style.display = "none",
                    e.classList.contains("active") && e.classList.remove("active")
                });
                var i = document.getElementsByClassName("hrStyle");
                if (Array.from(i).forEach(function(e) {
                    e.style.display = "none"
                }),
                "POPUP" === this.appState.get("chosenTools").value && !1 === this.appState.get("cadex").get("active").value)
                    if (this.block.resetPosition(),
                    this.coordinates && (this.popup.setPosition(this.coordinates),
                    this.popup.changed()),
                    this.features && this.features.length > 0) {
                        var a = 0;
                        this.featuresByLayer = new Map;
                        for (var o = 0, r = this.features; o < r.length; o++) {
                            var s = r[o]
                              , l = s.get("layer")
                              , c = s.get("features")
                              , p = l.split(" ").join("_").toLowerCase();
                            if (l && 1 == s.get("visible") && c && c.length > 0) {
                                for (var u = [], d = 0, g = c; d < g.length; d++) {
                                    var h = g[d];
                                    void 0 != s.get(h) && (this.isSpecialValue(h.toUpperCase(), this.layerNameLayerTable.get(l)) ? u.push({
                                        key: h,
                                        value: this.getConvertedValue(h.toUpperCase(), s.get(h).toString(), l),
                                        tableName: this.layerNameLayerTable.get(l)
                                    }) : "string" != typeof s.get(h) ? u.push({
                                        key: h,
                                        value: "-",
                                        tableName: this.layerNameLayerTable.get(l)
                                    }) : u.push({
                                        key: h,
                                        value: s.get(h).toString(),
                                        tableName: this.layerNameLayerTable.get(l)
                                    }))
                                }
                                0 == u.length ? (document.getElementById("popup_button_" + p).style.display = "none",
                                document.getElementById("info_feature_" + p).style.display = "none",
                                document.getElementById("line_" + p).style.display = "none") : (a += 1,
                                document.getElementById("popup_button_" + p).style.display = "inline",
                                document.getElementById("line_" + p) && (document.getElementById("line_" + p).style.display = "inline"),
                                document.getElementById("popup_button_main").style.display = "none",
                                document.getElementById("popup_content_main").style.display = "none",
                                this.featuresByLayer.set(l, this.featuresByLayer.get(l) || []),
                                this.featuresByLayer.get(l).push(u))
                            }
                        }
                        0 == a && (document.getElementById("popup").hidden = !0)
                    } else {
                        n = document.getElementsByClassName("info-features-button");
                        Array.from(n).forEach(function(e) {
                            e.style.display = "none",
                            e.classList.contains("active") && e.classList.remove("active")
                        });
                        t = document.getElementsByClassName("info-features");
                        Array.from(t).forEach(function(e) {
                            e.style.display = "none"
                        });
                        i = document.getElementsByClassName("hrStyle");
                        Array.from(i).forEach(function(e) {
                            e.style.display = "none"
                        }),
                        document.getElementById("popup_button_main").style.display = "inline"
                    }
            }
            ,
            e.prototype.displayMessage = function() {
                "inline" === document.getElementById("popup_content_main").style.display ? document.getElementById("popup_content_main").style.display = "none" : document.getElementById("popup_content_main").style.display = "inline"
            }
            ,
            e.prototype.displayFeatures = function(e) {
                "inline" === document.getElementById("info_feature_" + e.split(" ").join("_").toLowerCase()).style.display ? document.getElementById("info_feature_" + e.split(" ").join("_").toLowerCase()).style.display = "none" : document.getElementById("info_feature_" + e.split(" ").join("_").toLowerCase()).style.display = "inline"
            }
            ,
            e.prototype.getLang = function() {
                return this.labelService.lang.getValue()
            }
            ,
            e.prototype.getTranslationsForLayer = function(e) {
                if (this.layerNameTranslations.get(e))
                    return this.layerNameTranslations.get(e)[this.getLang().toLowerCase()]
            }
            ,
            e.prototype.selectFeature = function(e, t) {
                this.selectedFeature = e,
                this.appState.get("selectedLayer").setValue({
                    name: e,
                    index: t
                })
            }
            ,
            e.prototype.getConvertedValue = function(e, t, n) {
                return this.isSpecialValue(e.toUpperCase(), this.layerNameLayerTable.get(n)) ? (new Xn).getConvertedValue(e.toUpperCase(), this.layerNameLayerTable.get(n), t) : t
            }
            ,
            e.prototype.getCmsValueForKey = function(e) {
                var t = this;
                this.cms.getCmsContentByKey(e).subscribe(function(n) {
                    t.cmsKeys.set(e, n)
                })
            }
            ,
            e.prototype.getCurrentTranslation = function(e) {
                if (this.cmsKeys.get(e)) {
                    if ("FR" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).fr);
                    if ("NL" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).nl);
                    if ("DE" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).de);
                    if ("EN" === this.getLang())
                        return this.strip_html_tags(this.cmsKeys.get(e).en)
                }
            }
            ,
            e.prototype.strip_html_tags = function(e) {
                return null === e || "" === e || void 0 === e ? "Name not found" : (e = e.toString()).replace(/<[^>]*>/g, "")
            }
            ,
            e.prototype.isSpecialValue = function(e, t) {
                return "ROLE" === e && ("ALI_ADCO" === t || "ALI_ADRE" === t || "ALI_ADPR" === t || "ALI_ADAR" === t || "ALI_ADMU" === t) || "TYPE" === e && ("APT_ADST" === t || "BPN_CABU" === t || "BPN_REBU" === t) || "FISCSITID" === e && ("BPN_CAPA" === t || "BPN_EQTO" === t || "BPN_CABU" === t || "BPN_CAVO" === t) || "STATUS" === e && ("BPN_RAZO" === t || "WPT_INCO" === t) || "REQUESTTYPE" === e || "SUVACNTYPE" === e
            }
            ,
            e.prototype.isBpnCapa = function(e) {
                var t = this.appState.get("permissions").value;
                return "Bpn_CaPa_title" === e && "INTRA" === t
            }
            ,
            e.prototype.goToPow = function(e) {
                for (var t = "", n = 0, i = e; n < i.length; n++) {
                    var a = i[n];
                    "CaPaKey" === a.key && (t = a.value)
                }
                var o = this.formatCapakey(t);
                this.localisationService.getConsultimmoSearchUrl().subscribe(function(e) {
                    window.open(e + "/" + o, "_blank").focus()
                })
            }
            ,
            e.prototype.formatCapakey = function(e) {
                var t = parseInt(e.slice(0, 5))
                  , n = e.slice(5, 6)
                  , i = parseInt(e.slice(6, 10))
                  , a = parseInt(e.slice(12, 13))
                  , o = e.slice(13, 14)
                  , r = parseInt(e.slice(15, 16))
                  , s = t + "_" + n + "_" + i + "_";
                return s += 0 !== a ? a + "_" : "_",
                s += "_" !== o ? o + "_" : "_",
                s += 0 !== r ? r + "_" : "_"
            }
            ,
            e.prototype.searchSurveyorPlan = function(e) {
                var t = this;
                this.pendingSearch = !0,
                this.appState.get("searchResultTable").setValue(e[0].tableName);
                var n = {
                    tableName: "GPN_SUDO",
                    criteria: {
                        attribute: "DOCIDBUSINESS",
                        stringValue: e[0].value,
                        operation: "EQUAL",
                        numericValue: null,
                        dateValue: "",
                        or: [],
                        and: []
                    }
                };
                this.searchService.postAttributaireSearch(n).toPromise().catch(function(e) {
                    t.notificationService.notify("error", "NOTIFICATION.ERROR_CRITERIA"),
                    t.pendingSearch = !1
                }).then(function(e) {
                    e.length > 0 ? (e.wfs = t.layerVectorMapping.get(n.tableName).current.vector,
                    t.appState.get("searchResultList").setValue(e),
                    t.appState.get("resultListReady").setValue(!0)) : t.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                    t.pendingSearch = !1
                })
            }
            ,
            e.prototype.searchSketchDocument = function(e) {
                var t = this;
                this.pendingSearch = !0,
                this.appState.get("searchResultTable").setValue(e[0].tableName);
                var n = {
                    tableName: "GPN_SKDO",
                    criteria: {
                        attribute: "CASKID",
                        stringValue: e[0].value,
                        operation: "EQUAL",
                        numericValue: null,
                        dateValue: "",
                        or: [],
                        and: []
                    }
                };
                this.searchService.postAttributaireSearch(n).toPromise().catch(function(e) {
                    t.notificationService.notify("error", "NOTIFICATION.ERROR_CRITERIA"),
                    t.pendingSearch = !1
                }).then(function(e) {
                    e.length > 0 ? (e.wfs = t.layerVectorMapping.get(n.tableName).current.vector,
                    t.appState.get("searchResultList").setValue(e),
                    t.appState.get("resultListReady").setValue(!0)) : t.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT"),
                    t.pendingSearch = !1
                })
            }
            ,
            Oo([Object(i.Input)(), Ao("design:type", f.d)], e.prototype, "appState", void 0),
            Oo([Object(i.ViewChild)("block"), Ao("design:type", Object)], e.prototype, "block", void 0),
            Oo([Object(i.Input)(), Ao("design:type", Object)], e.prototype, "coordinates", void 0),
            Oo([Object(i.Input)(), Ao("design:type", Object)], e.prototype, "popup", void 0),
            Oo([Object(i.Input)(), Ao("design:type", Object)], e.prototype, "features", void 0),
            e = Oo([Object(i.Component)({
                selector: "popup",
                template: n("bwaT"),
                styles: [n("4gyM")]
            }), Ao("design:paramtypes", [bi, tt, pe, O, s.b, o.DomSanitizer, se])], e)
        }()
          , To = n("gsgi")
          , Eo = function() {
            function e() {}
            return e.getPageDimensionInPixelForResolution = function(e, t) {
                return [this.pageSizeInMM[e][0] * t / 25.4, this.pageSizeInMM[e][1] * t / 25.4]
            }
            ,
            e.getPageDimensionInPixelForResolutionLandscape = function(e, t) {
                return [this.pageSizeLandscapeInMM[e][0] * t / 25.4, this.pageSizeLandscapeInMM[e][1] * t / 25.4]
            }
            ,
            e.getPageDimension = function(e) {
                return [this.pageSizeInPixelAtOpenlayersDpi[e][0], this.pageSizeInPixelAtOpenlayersDpi[e][1]]
            }
            ,
            e.getPageDimensionLandscape = function(e) {
                return [this.pageSizeLandscapeAtOpenlayersDpi[e][0], this.pageSizeLandscapeAtOpenlayersDpi[e][1]]
            }
            ,
            e.pageSizeInMM = {
                A4: ["180", "230"],
                A3: ["254", "325"],
                A2: ["360", "460"],
                A1: ["509", "651"],
                A0: ["721", "921"]
            },
            e.pageSizeInPixelAtOpenlayersDpi = {
                A4: ["643", "821"],
                A3: ["907", "1161"],
                A2: ["1286", "1643"],
                A1: ["1818", "2325"],
                A0: ["2575", "3289"]
            },
            e.pageSizeLandscapeInMM = {
                A4: ["144", "268"],
                A3: ["204", "377"],
                A2: ["289", "534"],
                A1: ["408", "726"],
                A0: ["579", "1069"]
            },
            e.pageSizeLandscapeAtOpenlayersDpi = {
                A4: ["514", "924"],
                A3: ["728", "1346"],
                A2: ["1032", "1907"],
                A1: ["1457", "2592"],
                A0: ["2068", "3817"]
            },
            e
        }()
          , wo = function() {
            function e() {
                this.resolution = 150
            }
            return e.prototype.getRectangleForExtent = function(e, t, n, i, a, o, r) {
                "portrait" === i ? (this.width = Math.round(Eo.getPageDimension(n)[0] * (r / 90.7) * T.getResolutionFromScale(a * (90.7 / r))),
                this.height = Math.round(Eo.getPageDimension(n)[1] * (r / 90.7) * T.getResolutionFromScale(a * (90.7 / r)))) : "paysage" === i && (this.height = Math.round(Eo.getPageDimensionLandscape(n)[0] * (r / 90.7) * T.getResolutionFromScale(a * (90.7 / r))),
                this.width = Math.round(Eo.getPageDimensionLandscape(n)[1] * (r / 90.7) * T.getResolutionFromScale(a * (90.7 / r))));
                var s = T.getCenterOfExtent(e);
                this._xmin = s[0] - this.width / 2,
                this._xmax = s[0] + this.width / 2,
                this._ymin = s[1] - this.height / 2,
                this._ymax = s[1] + this.height / 2;
                var l = [this._xmin, this._ymax]
                  , c = [this._xmax, this._ymax]
                  , p = [this._xmax, this._ymin]
                  , u = [this._xmin, this._ymin]
                  , d = [this._xmin, this._ymax]
                  , g = t.getPixelFromCoordinate([l[0], l[1]])
                  , h = t.getPixelFromCoordinate([c[0], c[1]])
                  , f = t.getPixelFromCoordinate([u[0], u[1]]);
                this._offSetX = g[0],
                this._offSetY = g[1],
                this._pixelHeight = f[1] - g[1],
                this._pixelWidth = h[0] - g[0];
                var y = [];
                y.push(l, c, p, u, d);
                var m = new ke.f([y]);
                this.vector = new xe.a({
                    projection: v.BELGIAN_PROJECTION
                });
                var b = new Ve.a({
                    geometry: m
                });
                this.vector.addFeature(b)
            }
            ,
            e.prototype.getVectorLayerForDisplayPrintZone = function() {
                return this.vectorLayer = new z.c({
                    zIndex: 1e3,
                    source: this.vector,
                    updateWhileInteracting: !0,
                    style: function(e) {
                        return new q.d({
                            fill: new q.b({
                                color: "rgba(0,0,0,0)"
                            }),
                            stroke: new q.c({
                                color: "rgba(3,174,216,1)",
                                width: 5
                            })
                        })
                    }
                }),
                this.vectorLayer
            }
            ,
            e.prototype.getExtentOfZone = function() {
                return this.vector.getExtent()
            }
            ,
            Object.defineProperty(e.prototype, "offSetX", {
                get: function() {
                    return this._offSetX
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "offSetY", {
                get: function() {
                    return this._offSetY
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "pixelHeight", {
                get: function() {
                    return this._pixelHeight
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "pixelWidth", {
                get: function() {
                    return this._pixelWidth
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "xmax", {
                get: function() {
                    return this._xmax
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "xmin", {
                get: function() {
                    return this._xmin
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "ymax", {
                get: function() {
                    return this._ymax
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "ymin", {
                get: function() {
                    return this._ymin
                },
                enumerable: !0,
                configurable: !0
            }),
            e
        }()
          , ko = function() {
            return function(e, t, n, i, a, o, r, s, l, c, p) {
                this.format = e,
                this.orientation = t,
                this.title = n,
                this.centered = i,
                this.division = a,
                this.copyright = o,
                this.official = r,
                this.situation = s,
                this.dateCreation = l,
                this.scale = c,
                this.image = p
            }
        }()
          , _o = function() {
            function e() {}
            return e.PRINT_OFFICIAL_TITLE = {
                fr: "",
                nl: ""
            },
            e.PRINT_UNOFFICIAL_TITLE = {
                fr: "",
                nl: ""
            },
            e.PRINT_OFFICIAL_COPYRIGHT = {
                fr: "L\u2019AGDP est l\u2019auteur du plan parcellaire cadastral et le producteur de la base de donn\xe9es de laquelle les donn\xe9es sont reprises et jouit de la propri\xe9t\xe9 intellectuelle comme repris dans la loi sur les droits d\u2019auteurs et les droits des bases de donn\xe9es. Depuis le 01/01/2018 les b\xe2timents du plan parcellaire cadastral seront repris progressivement remplac\xe9 par un set de donn\xe9es (= Bpn_Rebu autrement dit B\xe2timent (R\xe9gion)) g\xe9r\xe9 par les r\xe9gions. L\u2019AGDP ne sera d\xe8s lors plus responsable pour la repr\xe9sentation des b\xe2timents sur le plan parcellaire cadastral.",
                nl: "De AAPD is de auteur van het kadastraal percelenplan en de producent van de databank waarin deze gegevens zijn opgenomen en geniet de intellectuele eigendomsrechten opgenomen in de Auteurswet en de Databankenwet. Vanaf 01/01/2018 worden de gebouwen op het kadastraal percelenplan geleidelijk vervangen door een dataset (= Bpn_Rebu oftewel Gebouwen(gewesten)) beheerd door de gewesten. De AAPD zal dan niet langer verantwoordelijk zijn voor de voorstelling van de gebouwen op het kadastraal percelenplan"
            },
            e.PRINT_UNOFFICIAL_COPYRIGHT = {
                fr: "L\u2019AGDP est l\u2019auteur du plan parcellaire cadastral et le producteur de la base de donn\xe9es de laquelle les donn\xe9es sont reprises et jouit de la propri\xe9t\xe9 intellectuelle comme repris dans la loi sur les droits d\u2019auteurs et les droits des bases de donn\xe9es. Depuis le 01/01/2018 les b\xe2timents du plan parcellaire cadastral seront repris progressivement remplac\xe9 par un set de donn\xe9es (= Bpn_Rebu autrement dit B\xe2timent (R\xe9gion)) g\xe9r\xe9 par les r\xe9gions. L\u2019AGDP ne sera d\xe8s lors plus responsable pour la repr\xe9sentation des b\xe2timents sur le plan parcellaire cadastral.",
                nl: "De AAPD is de auteur van het kadastraal percelenplan en de producent van de databank waarin deze gegevens zijn opgenomen en geniet de intellectuele eigendomsrechten opgenomen in de Auteurswet en de Databankenwet. Vanaf 01/01/2018 worden de gebouwen op het kadastraal percelenplan geleidelijk vervangen door een dataset (= Bpn_Rebu oftewel Gebouwen(gewesten)) beheerd door de gewesten. De AAPD zal dan niet langer verantwoordelijk zijn voor de voorstelling van de gebouwen op het kadastraal percelenplan"
            },
            e.PRINT_CENTERED_ON = {
                fr: "Centr\xe9 sur : ",
                nl: "Centr\xe9 sur : "
            },
            e
        }()
          , xo = n("8T/8");
        var No = function(e, t) {
            let n = new Promise( (t, n) => {
                let i = setTimeout( () => {
                    clearTimeout(i),
                    n("Timed out in " + e + "ms.")
                }
                , e)
            }
            );
            return Promise.race([t, n])
        }
          , Po = function() {
            return function(e, t, n, i, a, o, r, s, l, c, p, u, d, g, h, f, y, m, v, b, S, C) {
                this.url = e,
                this.format = t,
                this.orientation = n,
                this.xmin = i,
                this.xmax = a,
                this.ymin = o,
                this.ymax = r,
                this.dpi = s,
                this.width = l,
                this.height = c,
                this.title = p,
                this.centered = u,
                this.division = d,
                this.copyright = g,
                this.official = h,
                this.situation = f,
                this.situationName = y,
                this.dateCreation = m,
                this.scale = v,
                this.imageFormat = b,
                this.polygonRings = S,
                this.selectedPolygons = C
            }
        }()
          , Mo = this && this.__extends || function() {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    t.hasOwnProperty(n) && (e[n] = t[n])
            }
            ;
            return function(t, n) {
                function i() {
                    this.constructor = t
                }
                e(t, n),
                t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype,
                new i)
            }
        }()
          , Fo = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , Vo = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , Do = function(e) {
            function t(t, n, i, a, o, r, s, l, c) {
                var p = e.call(this) || this;
                return p.setupService = t,
                p.configService = n,
                p.viewRepository = i,
                p.localisationService = a,
                p.printService = o,
                p.vpService = r,
                p.cmsService = s,
                p.notificationService = l,
                p.labelService = c,
                p.printTitleOfficial = _o.PRINT_OFFICIAL_TITLE,
                p.printTitleUnofficial = _o.PRINT_UNOFFICIAL_TITLE,
                p.printCopyrightOfficial = _o.PRINT_OFFICIAL_COPYRIGHT,
                p.printCopyrightUnofficial = _o.PRINT_UNOFFICIAL_COPYRIGHT,
                p.printCenteredOn = _o.PRINT_CENTERED_ON,
                p.getCMSString(),
                p
            }
            return Mo(t, e),
            t.prototype.ngOnInit = function() {
                var e = this;
                this.appState.get("layers").valueChanges.filter(function(e) {
                    return 0 !== e.length
                }).subscribe(function(t) {
                    var n = 100 * e.appState.get("sections").value.get("layersGr");
                    e.appState.get("layers").value.forEach(function(t, i) {
                        t.get("layers").forEach(function(t, a) {
                            var o = e.setupService.layers.get(i).get("layers").get(a);
                            ("VECTOR" !== o.layer.type || "VECTOR" === o.layer.type && !0 === e.appState.get("vectorActivated").value) && (o.layer.setVisible(t.active),
                            o.layer.setOpacity(t.opacity),
                            o.layer.setZIndex(n--),
                            o.layer.getSource().changed()),
                            o.layer.set("name", t.name)
                        }),
                        t.get("subGroup").forEach(function(t, a) {
                            t.forEach(function(t, o) {
                                var r = e.setupService.layers.get(i).get("subGroup").get(a).get(o);
                                ("VECTOR" !== r.layer.get("category") || "VECTOR" === r.layer.get("category") && !0 === e.appState.get("vectorActivated").value) && (r.layer.setVisible(t.active),
                                r.layer.setOpacity(t.opacity),
                                r.layer.setZIndex(n--),
                                r.layer.getSource().changed()),
                                r.layer.set("name", t.name)
                            })
                        })
                    })
                }),
                this.appState.get("backdrops").valueChanges.filter(function(e) {
                    return 0 !== e.length
                }).subscribe(function(t) {
                    e.appState.get("backdrops").value.forEach(function(t, n) {
                        var i = e.setupService.backdrops.get(n);
                        i.layer.setVisible(t.active),
                        i.layer.setOpacity(t.opacity)
                    })
                }),
                this.appState.get("inspire").valueChanges.filter(function(e) {
                    return 0 !== e.length
                }).subscribe(function(t) {
                    var n = e.appState.get("sections").value.has("inspireGr") ? 100 * e.appState.get("sections").value.get("inspireGr") : 0;
                    e.appState.get("inspire").value.forEach(function(t, i) {
                        t.get("layers").forEach(function(t, a) {
                            var o = e.setupService.inspire.get(i).get("layers").get(a);
                            o.layer.setVisible(t.active),
                            o.layer.setOpacity(t.opacity),
                            o.layer.set("name", t.name),
                            o.layer.setZIndex(n--),
                            o.layer.getSource().changed()
                        }),
                        t.get("subGroup").forEach(function(t, a) {
                            t.forEach(function(t, o) {
                                var r = e.setupService.inspire.get(i).get("subGroup").get(a).get(o);
                                r.layer.setVisible(t.active),
                                r.layer.setOpacity(t.opacity),
                                r.layer.set("name", t.name),
                                r.layer.setZIndex(n--),
                                r.layer.getSource().changed()
                            })
                        })
                    })
                }),
                this.appState.get("historic").valueChanges.filter(function(e) {
                    return 0 !== e.length
                }).subscribe(function(t) {
                    e.appState.get("historic").value.forEach(function(t, n) {
                        var i = e.appState.get("sections").value.has("historicGr") ? 100 * e.appState.get("sections").value.get("historicGr") : 0
                          , a = e.setupService.historic.get(n);
                        a.layer.setVisible(t.active),
                        a.layer.setOpacity(t.opacity),
                        a.layer.setZIndex(i--),
                        a.layer.getSource().changed()
                    })
                }),
                this.appState.get("searchResultTable").valueChanges.subscribe(function(t) {
                    t && e.activeLayerForTableName(t)
                }),
                this.appState.get("vectorActivated").valueChanges.distinctUntilChanged().subscribe(function(t) {
                    !0 === t ? (e.appState.get("featureLoading").setValue(!0),
                    setTimeout(function() {
                        e.appState.get("featureLoading").setValue(!1)
                    }, 3e3),
                    e.appState.get("layers").value.forEach(function(t, n) {
                        t.get("layers").forEach(function(t, i) {
                            var a = e.setupService.layers.get(n).get("layers").get(i);
                            ("VECTOR" !== a.layer.type || "VECTOR" === a.layer.type && !0 === e.appState.get("vectorActivated").value) && (a.layer.setVisible(t.active),
                            a.layer.setOpacity(t.opacity)),
                            a.layer.set("name", t.name)
                        }),
                        t.get("subGroup").forEach(function(t, i) {
                            t.forEach(function(t, a) {
                                var o = e.setupService.layers.get(n).get("subGroup").get(i).get(a);
                                ("VECTOR" !== o.layer.get("category") || "VECTOR" !== o.layer.get("category") && !0 === e.appState.get("vectorActivated").value) && (o.layer.setVisible(t.active),
                                o.layer.setOpacity(t.opacity)),
                                o.layer.set("name", t.name)
                            })
                        })
                    })) : !1 === t && (e.appState.get("featureLoading").setValue(!1),
                    e.appState.get("layers").value.forEach(function(t, n) {
                        t.get("layers").forEach(function(t, i) {
                            var a = e.setupService.layers.get(n).get("layers").get(i);
                            "VECTOR" === a.layer.type && (a.layer.setVisible(!1),
                            a.layer.setOpacity(t.opacity)),
                            a.layer.set("name", t.name)
                        }),
                        t.get("subGroup").forEach(function(t, i) {
                            t.forEach(function(t, a) {
                                var o = e.setupService.layers.get(n).get("subGroup").get(i).get(a);
                                "VECTOR" === o.layer.get("category") && (o.layer.setVisible(!1),
                                o.layer.setOpacity(t.opacity)),
                                o.layer.set("name", t.name)
                            })
                        })
                    }))
                }),
                this.appState.get("vizualizeResult").valueChanges.subscribe(function(t) {
                    if (t && t.tableName && e.activeLayerForTableName(t.tableName),
                    null === t)
                        return e.appState.get("precad").get("active").value || e.appState.get("cdms").get("active").value || e.cadexCapakeySelection() || e.select.setActive(!1),
                        e.select.getFeatures().clear(),
                        e.appState.get("drawToolChoice").setValue("None"),
                        e.appState.get("sourceOnMap").setValue(null),
                        void e.appState.get("resultOnMap").setValue(null);
                    if (t.coordinates) {
                        e.map.getView().setCenter(t.coordinates),
                        e.map.getView().setResolution(T.getResolutionFromScale(t.zoom || e.configService.getConfig().searchZoomLevels || 1e3));
                        var n = e;
                        setTimeout(function() {
                            var e = n.map.getPixelFromCoordinate(t.coordinates);
                            n.map.forEachFeatureAtPixel(e, function(e, i) {
                                i.get("tableName") === t.tableName && (void 0 === t.id && (n.select.setActive(!0),
                                n.select.getFeatures().clear(),
                                n.select.getFeatures().push(e)),
                                e.getId().includes(t.id) && (n.select.setActive(!0),
                                n.select.getFeatures().clear(),
                                n.select.getFeatures().push(e)))
                            })
                        }, 1500)
                    } else {
                        var i = e
                          , a = null;
                        e.drawResultVectorSource.getFeatures().forEach(function(e) {
                            var n = null;
                            if ("None" === i.appState.get("spatialAnalysisType").value) {
                                if (e.id_ && (n = parseInt(e.id_.split(".")[1])),
                                n === t.id)
                                    return void (a = e)
                            } else if ("None" !== i.appState.get("spatialAnalysisType").value && (e.id_ && (n = parseInt(e.id_)),
                            n === t.id))
                                return void (a = e)
                        });
                        var o = Object(Bn.cloneDeep)(a)
                          , r = new q.d({
                            stroke: new q.c({
                                color: e.configService.getConfig().thirdColor || "#C71585",
                                width: 3
                            }),
                            image: new q.a({
                                radius: 3,
                                fill: new q.b({
                                    color: e.configService.getConfig().thirdColor || "#C71585"
                                }),
                                stroke: new q.c({
                                    color: e.configService.getConfig().thirdColor || "#C71585",
                                    width: 3
                                })
                            })
                        });
                        setTimeout(function() {
                            o.setStyle(r),
                            i.select.setActive(!0),
                            i.select.getFeatures().clear(),
                            i.select.getFeatures().push(o),
                            i.appState.get("pendingLoading").setValue(!1)
                        }, 1500)
                    }
                }),
                this.appState.get("searchResultCapakey").valueChanges.filter(function(e) {
                    return 0 !== e.length
                }).subscribe(function(t) {
                    e.appState.get("vectorActivated").setValue(!0),
                    e.map.getView().setCenter(t.coord),
                    e.map.getView().setResolution(T.getResolutionFromScale(e.configService.getConfig().searchZoomLevels || 1e3)),
                    setTimeout(function() {
                        t.capakey ? e.getFeatureAtPixel(t.coord, t.capakey) : t.capakeys && e.getFeatureInExtent(t.capakeysCoords, t.capakeys)
                    }, 3e3)
                }),
                this.appState.get("searchResultCoordinates").valueChanges.filter(function(e) {
                    return void 0 !== e
                }).subscribe(function(t) {
                    var n = t.coordSystem
                      , i = [t.valueX, t.valueY];
                    switch (n) {
                    case "LB72":
                        i = transformProjectionFrom72To2008(t.valueX, t.valueY);
                        break;
                    case "WGS84":
                        i = transformProjectionFromWGS84To2008(t.valueY, t.valueX);
                        break;
                    case "ETRS89":
                        i = transformProjectionFromETRS89To2008(t.valueY, t.valueX)
                    }
                    e.appState.get("vectorActivated").setValue(!0),
                    e.map.getView().setCenter(i),
                    e.map.getView().setResolution(T.getResolutionFromScale(1e3)),
                    !0 === e.appState.get("cadex").get("active").value ? setTimeout(function() {
                        e.getFeatureAtPixel(i, null)
                    }, 3e3) : e.addFeaturePointFromSearch(i)
                }),
                this.appState.get("searchResultStreet").valueChanges.filter(function(e) {
                    return void 0 !== e
                }).subscribe(function(t) {
                    var n = transformProjectionFrom72To2008(t.position.x, t.position.y);
                    e.appState.get("vectorActivated").setValue(!0),
                    e.map.getView().setCenter(n),
                    "LOCALITY" === t.type || "COMMUNE" === t.type ? e.map.getView().setResolution(T.getResolutionFromScale(1e4)) : e.map.getView().setResolution(T.getResolutionFromScale(e.configService.getConfig().searchZoomLevels || 1e3)),
                    !0 === e.appState.get("cadex").get("active").value && setTimeout(function() {
                        e.getFeatureAtPixel(n, null)
                    }, 3e3),
                    t.houseNumber ? e.addFeaturePointFromSearch(n) : (e.map.removeLayer(e.featuresResults),
                    e.map.removeLayer(e.pointVectorLayer))
                }),
                this.appState.get("print").get("triggerPrint").valueChanges.filter(function(e) {
                    return void 0 !== e
                }).subscribe(function(t) {
                    var n = e
                      , i = e.getPolygonFromDrawLayer();
                    e.appState.get("print").get("pdfGenerated").setValue(!1);
                    var a = e.map.getSize()
                      , o = e.map.getView().calculateExtent(a);
                    if (e.appState.get("mapLoading").setValue(!0),
                    e.changeBackdropVisibility(!1),
                    e.appState.get("print").get("printOfficial").value) {
                        e.changeLayersVisibilityForOfficialPrint(!1);
                        var r, s, l, c = void 0, p = void 0;
                        "portrait" === n.appState.get("print").get("printOrientation").value ? (c = Eo.getPageDimensionInPixelForResolution(n.appState.get("print").get("printPageSize").value, n.appState.get("print").get("printResolution").value)[0],
                        p = Eo.getPageDimensionInPixelForResolution(n.appState.get("print").get("printPageSize").value, n.appState.get("print").get("printResolution").value)[1]) : "paysage" === n.appState.get("print").get("printOrientation").value && (p = Eo.getPageDimensionInPixelForResolutionLandscape(n.appState.get("print").get("printPageSize").value, n.appState.get("print").get("printResolution").value)[0],
                        c = Eo.getPageDimensionInPixelForResolutionLandscape(n.appState.get("print").get("printPageSize").value, n.appState.get("print").get("printResolution").value)[1]);
                        var u = void 0;
                        e.appState.get("print").get("printOfficial").value ? (r = e.printCopyrightOfficial,
                        s = e.printTitleOfficial) : (r = e.printCopyrightUnofficial,
                        s = e.printTitleUnofficial),
                        "CURRENT" === n.appState.get("currentSituation").value ? (l = e.currentYear,
                        u = e.configService.getConfig().print.current) : (l = e.fiscalYear,
                        u = e.configService.getConfig().print.fiscal);
                        var d, g = new Po(u,e.appState.get("print").get("printPageSize").value,e.getCorrectOrientation(),"" + e.drawPrintInteraction.xmin,"" + e.drawPrintInteraction.xmax,"" + e.drawPrintInteraction.ymin,"" + e.drawPrintInteraction.ymax,n.appState.get("print").get("printResolution").value,c,p,e.strip_html_tags(s[e.getLang().toLowerCase()]),e.strip_html_tags(e.printCenteredOn[n.getLang().toLowerCase()]),e.appState.get("print").get("printDivision").value,e.strip_html_tags(r[e.getLang().toLowerCase()]),e.appState.get("print").get("printOfficial").value,e.strip_html_tags(l[e.getLang().toLowerCase()]),e.appState.get("currentSituation").value,e.getDate(),e.appState.get("print").get("printScale").value,"SVG",i.get("polygonRings"),i.get("selectedPolygon"));
                        e.printService.generateImage(g).subscribe(function(t) {
                            e.appState.get("officialImageGenerated").setValue(!1),
                            d = new ko(e.appState.get("print").get("printPageSize").value,e.getCorrectOrientation(),e.strip_html_tags(s[e.getLang().toLowerCase()]),e.strip_html_tags(e.printCenteredOn[n.getLang().toLowerCase()]),e.appState.get("print").get("printDivision").value,e.strip_html_tags(r[e.getLang().toLowerCase()]),e.appState.get("print").get("printOfficial").value,e.strip_html_tags(l[e.getLang().toLowerCase()]),e.getDate(),"1:" + e.appState.get("print").get("printScale").value,t),
                            e.appState.get("imagePlan").setValue(d),
                            e.appState.get("officialImageGenerated").setValue(!0)
                        })
                    } else if (!1 === e.appState.get("print").get("printOfficial").value) {
                        c = void 0,
                        p = void 0;
                        e.map.removeLayer(e.printZone),
                        "portrait" === n.appState.get("print").get("printOrientation").value ? (c = Eo.getPageDimensionInPixelForResolution(n.appState.get("print").get("printPageSize").value, n.appState.get("print").get("printResolution").value)[0],
                        p = Eo.getPageDimensionInPixelForResolution(n.appState.get("print").get("printPageSize").value, n.appState.get("print").get("printResolution").value)[1]) : "paysage" === n.appState.get("print").get("printOrientation").value && (p = Eo.getPageDimensionInPixelForResolutionLandscape(n.appState.get("print").get("printPageSize").value, n.appState.get("print").get("printResolution").value)[0],
                        c = Eo.getPageDimensionInPixelForResolutionLandscape(n.appState.get("print").get("printPageSize").value, n.appState.get("print").get("printResolution").value)[1]);
                        var h = [c, p];
                        e.map.setSize(h),
                        e.map.getView().setResolution(T.getResolutionFromScale(.61 * e.appState.get("print").get("printScale").value)),
                        No(1e5, e.getMapAfterRender(e.map)).then(function(t) {
                            var i, r, s;
                            e.appState.get("print").get("printOfficial").value ? (i = e.printCopyrightOfficial,
                            r = e.printTitleOfficial) : (i = e.printCopyrightUnofficial,
                            r = e.printTitleUnofficial),
                            s = "CURRENT" === n.appState.get("currentSituation").value ? e.currentYear : e.fiscalYear;
                            var l = new ko(e.appState.get("print").get("printPageSize").value,e.getCorrectOrientation(),e.strip_html_tags(r[e.getLang().toLowerCase()]),e.strip_html_tags(e.printCenteredOn[n.getLang().toLowerCase()]),e.appState.get("print").get("printDivision").value,e.strip_html_tags(i[e.getLang().toLowerCase()]),e.appState.get("print").get("printOfficial").value,e.strip_html_tags(s[e.getLang().toLowerCase()]),e.getDate(),"1:" + e.appState.get("print").get("printScale").value,t.toDataURL("image/png").replace("data:image/png;base64,", ""));
                            e.vpService.getScripturaDocumentFromVp(l, n.getLang()).toPromise().then(function(t) {
                                e.map.setSize(a),
                                e.map.getView().fit(o, {
                                    size: a,
                                    constrainResolution: !1
                                }),
                                e.appState.get("mapLoading").setValue(!1),
                                e.changeBackdropVisibility(!0),
                                e.changeDrawingLayerVisibility(!0),
                                e.changeFeaturesResultsLayerVisibility(!0),
                                e.appState.get("print").get("pdfGenerated").setValue(!0);
                                var n = document.createElement("a");
                                n.href = URL.createObjectURL(t),
                                n.download = "export-cadgis.pdf",
                                n.dispatchEvent(new MouseEvent("click"))
                            }).catch(function(t) {
                                console.error(t),
                                e.map.setSize(a),
                                e.map.getView().fit(o, {
                                    size: a,
                                    constrainResolution: !1
                                }),
                                e.appState.get("mapLoading").setValue(!1),
                                e.appState.get("print").get("pdfGenerated").setValue(!0),
                                e.changeBackdropVisibility(!0),
                                e.changeDrawingLayerVisibility(!0),
                                e.changeFeaturesResultsLayerVisibility(!0)
                            })
                        }).catch(function(t) {
                            e.notificationService.notify("error", "NOTIFICATION_PRINT_ERROR"),
                            e.map.setSize(a),
                            e.map.getView().fit(o, {
                                size: a,
                                constrainResolution: !1
                            }),
                            e.appState.get("mapLoading").setValue(!1),
                            e.appState.get("print").get("pdfGenerated").setValue(!0),
                            e.changeBackdropVisibility(!0),
                            e.changeDrawingLayerVisibility(!0),
                            e.changeFeaturesResultsLayerVisibility(!0)
                        })
                    }
                }),
                this.appState.get("officialImageGenerated").valueChanges.subscribe(function(t) {
                    if (!0 === t) {
                        var n = e;
                        e.vpService.getScripturaDocumentFromVp(e.appState.get("imagePlan").value, n.getLang()).toPromise().then(function(t) {
                            e.appState.get("mapLoading").setValue(!1),
                            e.changeBackdropVisibility(!0),
                            e.changeLayersVisibilityForOfficialPrint(!0),
                            e.appState.get("print").get("pdfGenerated").setValue(!0),
                            e.changeDrawingLayerVisibility(!0),
                            e.changeFeaturesResultsLayerVisibility(!0);
                            var n = document.createElement("a");
                            n.href = URL.createObjectURL(t),
                            n.download = "export-cadgis.pdf",
                            n.dispatchEvent(new MouseEvent("click"))
                        })
                    }
                }),
                this.appState.get("showPrintSelection").valueChanges.subscribe(function(t) {
                    !0 === t && e.addRectangleForPrint(),
                    !1 === t && e.map.removeLayer(e.printZone)
                }),
                this.appState.get("print").get("pdfGenerated").valueChanges.filter(function(e) {
                    return null != e
                }).subscribe(function(e) {}),
                this.appState.get("sourceOnMap").valueChanges.subscribe(function(t) {
                    if (null === t)
                        e.select.getFeatures().clear();
                    else {
                        var n, i = t.geometry, a = t.id;
                        if (e.appState.get("spatialAnalysisCoordinates").value) {
                            var o = new ke.e([i[0], i[1]]);
                            n = new Ve.a(o),
                            null !== a && n.setId(a);
                            var r = n.getGeometry();
                            e.map.getView().setCenter(r.getCoordinates()),
                            e.map.getView().setResolution(T.getResolutionFromScale(e.configService.getConfig().searchZoomLevels || 1e3)),
                            setTimeout(function() {
                                e.drawResultVectorSource.addFeature(n),
                                e.featuresResults.setSource(e.drawResultVectorSource)
                            }, 500)
                        } else {
                            i = t.geometry;
                            var s = new ke.f([i]);
                            n = new Ve.a(s),
                            null !== a && n.setId(a);
                            r = n.getGeometry();
                            e.map.getView().setCenter(r.getCoordinates()[0][0]),
                            e.map.getView().setResolution(T.getResolutionFromScale(e.configService.getConfig().searchZoomLevels || 1e3)),
                            setTimeout(function() {
                                e.drawResultVectorSource.addFeature(n),
                                e.featuresResults.setSource(e.drawResultVectorSource)
                            }, 500)
                        }
                    }
                }),
                this.appState.get("resultOnMap").valueChanges.subscribe(function(t) {
                    if (null === t) {
                        var n = [];
                        e.map.getLayers().forEach(function(e) {
                            void 0 != e.get("name") && "drawingVector" === e.get("name") && n.push(e)
                        });
                        for (var i = n.length, a = 0; a < i; a++)
                            e.map.removeLayer(n[a])
                    } else {
                        var o, r = t.geometry, s = t.id, l = new q.d({
                            stroke: new q.c({
                                color: e.configService.getConfig().secondaryColor || "#00FF00",
                                width: 3
                            }),
                            image: new q.a({
                                radius: 3,
                                fill: new q.b({
                                    color: e.configService.getConfig().secondaryColor || "#00FF00"
                                }),
                                stroke: new q.c({
                                    color: e.configService.getConfig().secondaryColor || "#00FF00",
                                    width: 3
                                })
                            }),
                            zIndex: -1
                        });
                        if ("WPT_INCO" === e.appState.get("searchResultTable").value || "BPT_PRST" === e.appState.get("searchResultTable").value || "SPT_BEAD" === e.appState.get("searchResultTable").value || "APT_ADST" === e.appState.get("searchResultTable").value) {
                            var c = new ke.e([r[0], r[1]])
                              , p = new Ve.a(c);
                            p.setId(s);
                            var u = p.getGeometry();
                            e.map.getView().setCenter(u.getCoordinates()),
                            e.map.getView().setResolution(T.getResolutionFromScale(e.configService.getConfig().searchZoomLevels || 1e3)),
                            setTimeout(function() {
                                p.setStyle(l),
                                e.drawResultVectorSource.addFeature(p),
                                e.featuresResults.setSource(e.drawResultVectorSource)
                            }, 500)
                        } else {
                            r = t.geometry;
                            var d = new ke.f([r]);
                            (o = new Ve.a(d)).setId(s);
                            u = o.getGeometry();
                            e.map.getView().setCenter(u.getCoordinates()[0][0]),
                            e.map.getView().setResolution(T.getResolutionFromScale(e.configService.getConfig().searchZoomLevels || 1e3)),
                            setTimeout(function() {
                                o.setStyle(l),
                                e.drawResultVectorSource.addFeature(o),
                                e.featuresResults.setSource(e.drawResultVectorSource)
                            }, 500)
                        }
                    }
                }),
                this.appState.get("selectedLayer").valueChanges.filter(function(e) {
                    return 0 !== e.length
                }).subscribe(function(t) {
                    if (null !== t) {
                        var n = e;
                        e.select.getFeatures().clear();
                        var i = [];
                        e.map.forEachFeatureAtPixel(e.selectedPixel, function(e) {
                            e.style = new q.d({
                                stroke: new q.c({
                                    color: n.configService.getConfig().primaryColor || "#00abff",
                                    width: 2
                                }),
                                fill: new q.b({
                                    color: "rgba(0,171,255, 0.1)"
                                })
                            }),
                            i.push(e)
                        }, {
                            layerFilter: function(e) {
                                return e.get("name") === t.name
                            },
                            hitTolerance: 10
                        }),
                        t.index + 1 <= i.length && n.select.getFeatures().push(i[t.index])
                    }
                }),
                this.appState.get("chosenTools").valueChanges.subscribe(function(t) {
                    var n = e;
                    "DRAW" === t || "MESURE" === t || "STRUCTURED_SEARCH" === t || "EXTRACTION_TOOL" === t || "SPATIAL_ANALYSIS" === t || "NONE" === t ? !0 === e.appState.get("precad").get("active").value || !0 === e.appState.get("cdms").get("active").value || e.cadexCapakeySelection() ? n.select.setActive(!0) : n.select.setActive(!1) : n.select.setActive(!0)
                }),
                this.appState.get("spatialAnalysisRoundOption").valueChanges.subscribe(function(t) {
                    var n = e;
                    n.select.getFeatures().clear(),
                    "roundParcelClic" === t ? n.select.setActive(!0) : n.select.setActive(!1)
                }),
                this.appState.get("spatialAnalysisTenantsOption").valueChanges.subscribe(function(t) {
                    var n = e;
                    n.select.getFeatures().clear(),
                    "tenantsClic" === t ? n.select.setActive(!0) : n.select.setActive(!1)
                }),
                this.appState.get("spatialAnalysisCapakeySelection").valueChanges.subscribe(function(t) {
                    var n = e;
                    n.select.getFeatures().clear(),
                    t ? n.select.setActive(!0) : n.select.setActive(!1)
                }),
                this.appState.get("drawFeaturesResultsLayerOn").valueChanges.subscribe(function(t) {
                    e.map.removeLayer(e.featuresResults),
                    !0 === t && (e.map.removeLayer(e.featuresResults),
                    e.drawFeaturesResults = new nt(e.configService),
                    e.drawResultVectorSource = new xe.a,
                    e.featuresResults = e.drawFeaturesResults.getVectorLayerForFeaturesResults())
                }),
                this.appState.get("displayFeaturesResultsOnMap").valueChanges.subscribe(function(t) {
                    !0 === t ? (e.map.addLayer(e.featuresResults),
                    e.appState.get("interactions").get("featuresResults").get("layer").setValue(e.featuresResults),
                    e.changeFeaturesResultsLayerVisibility(!0)) : e.changeFeaturesResultsLayerVisibility(!1)
                }),
                this.appState.get("displayFeaturePointFromSearchOnMap").valueChanges.subscribe(function(t) {
                    !0 === t ? (e.map.addLayer(e.pointVectorLayer),
                    e.appState.get("interactions").get("featuresResults").get("layer").setValue(e.pointVectorLayer),
                    e.changeFeaturesResultsLayerVisibility(!0)) : e.changeFeaturesResultsLayerVisibility(!1)
                }),
                this.appState.get("spatialSearchResults").valueChanges.filter(function(e) {
                    return 0 !== e.length
                }).subscribe(function(t) {
                    if (null == t.feature && "" == t.tableName && !e.appState.get("precad").get("active").value && !e.appState.get("cdms").get("active").value && !e.cadexCapakeySelection())
                        return e.select.setActive(!1),
                        e.select.getFeatures().clear(),
                        e.appState.get("drawToolChoice").setValue("None"),
                        e.appState.get("sourceOnMap").setValue(null),
                        void e.appState.get("resultOnMap").setValue(null);
                    t && t.tableName && (e.activeLayerForTableName(t.tableName),
                    e.map.getView().setResolution(T.getResolutionFromScale(t.zoom || e.configService.getConfig().searchZoomLevels || 1e3)),
                    setTimeout(function() {
                        e.drawResultVectorSource.addFeature(t.feature),
                        e.featuresResults.setSource(e.drawResultVectorSource)
                    }, 500))
                }),
                this.appState.get("removeFeatureFromResults").valueChanges.subscribe(function(t) {
                    var n = null;
                    e.drawResultVectorSource.getFeatures().forEach(function(e) {
                        parseInt(e.id_.split(".")[1]) !== t || (n = e)
                    });
                    var i = e;
                    null != n && (setTimeout(function() {
                        i.select.getFeatures().clear(),
                        e.drawResultVectorSource.removeFeature(n),
                        e.featuresResults.setSource(e.drawResultVectorSource)
                    }, 500),
                    e.changeFeaturesResultsLayerVisibility(!1),
                    e.appState.get("interactions").get("featuresResults").get("layer").setValue(e.featuresResults),
                    e.changeFeaturesResultsLayerVisibility(!0))
                })
            }
            ,
            t.prototype.cadexCapakeySelection = function() {
                return this.configService.cadexBundle.active && "capakey" === this.configService.cadexBundle.selectType
            }
            ,
            t.prototype.getMapAfterRender = function(e) {
                return new Promise(function(t, n) {
                    e.once("rendercomplete", function(e) {
                        t(e.context.canvas)
                    })
                }
                )
            }
            ,
            t.prototype.getPolygonFromDrawLayer = function() {
                var e = []
                  , t = []
                  , n = new Map;
                return this.select.getFeatures().forEach(function(e) {
                    var n = e.getGeometry().getCoordinates();
                    n[0].forEach(function(e) {
                        e.map(function(e) {
                            return e.slice(0, -1)
                        })
                    }),
                    t.push(n[0][0])
                }),
                this.map.getLayers().forEach(function(n) {
                    "FEATURES_RESULTS" === n.get("category") && !0 === n.getVisible() && n.getSource().getFeatures().forEach(function(n) {
                        var i = n.getGeometry();
                        if ("Polygon" === i.getType())
                            if (null !== n.getStyle()) {
                                var a = i.getCoordinates();
                                e.push(a[0])
                            } else {
                                a = i.getCoordinates();
                                t.push(a[0])
                            }
                        else if ("MultiPolygon" === i.getType()) {
                            (a = i.getCoordinates()).forEach(function(e) {
                                e.forEach(function(e) {
                                    e.map(function(e) {
                                        return e.slice(0, -1)
                                    })
                                }),
                                t.push(e[0])
                            })
                        }
                    })
                }),
                n.set("selectedPolygon", t),
                n.set("polygonRings", e),
                n
            }
            ,
            t.prototype.addFeaturePointFromSearch = function(e) {
                var t = this;
                this.appState.get("drawFeaturesResultsLayerOn").setValue(!0);
                var n = new je;
                n.getFeatureForDisplayPoint(e),
                this.removeFeaturePoint(),
                this.pointVectorLayer = n.getVectorLayerForDisplayPoint(),
                this.appState.get("displayFeaturePointFromSearchOnMap").setValue(!0),
                this.appState.get("chosenTools").valueChanges.subscribe(function(e) {
                    "POPUP" != e && "NONE" != e && t.removeFeaturePoint()
                })
            }
            ,
            t.prototype.removeFeaturePoint = function() {
                this.pointVectorLayer && this.map.removeLayer(this.pointVectorLayer)
            }
            ,
            t.prototype.getRectangleForExtent = function() {
                var e = this;
                this.drawPrintInteraction = new wo;
                var t = 90.7 * this.map.getView().getResolution() * 39.37
                  , n = this.map.getView().calculateExtent()
                  , i = T.getCenterOfExtent(n);
                this.drawPrintInteraction.getRectangleForExtent(n, this.map, this.appState.get("print").get("printPageSize").value, this.appState.get("print").get("printOrientation").value, this.appState.get("print").get("printScale").value, t, this.appState.get("print").get("printResolution").value),
                this.map.removeLayer(this.printZone),
                this.printZone = this.drawPrintInteraction.getVectorLayerForDisplayPrintZone(),
                this.map.addLayer(this.printZone),
                this.appState.get("print").get("printBox").setValue(this.drawPrintInteraction.getExtentOfZone()),
                this.localisationService.getDivisionFromCoordinates(i[0], i[1]).subscribe(function(t) {
                    e.appState.get("print").get("printDivision").setValue(t)
                })
            }
            ,
            t.prototype.addRectangleForPrint = function() {
                this.getRectangleForExtent(),
                this.triggerEachSecond()
            }
            ,
            t.prototype.triggerEachSecond = function() {
                var e = this;
                this.map.on("pointerdrag", function() {
                    !0 === e.appState.get("showPrintSelection").value && (e.appState.get("print").get("printDivision").setValue(""),
                    e.getRectangleForExtent())
                }),
                this.appState.get("print").get("printPageSize").valueChanges.distinctUntilChanged().subscribe(function() {
                    !0 === e.appState.get("showPrintSelection").value && e.getRectangleForExtent()
                }),
                this.appState.get("print").get("printOrientation").valueChanges.distinctUntilChanged().subscribe(function() {
                    !0 === e.appState.get("showPrintSelection").value && e.getRectangleForExtent()
                }),
                this.appState.get("print").get("printScale").valueChanges.distinctUntilChanged().subscribe(function() {
                    !0 === e.appState.get("showPrintSelection").value && e.getRectangleForExtent()
                }),
                this.appState.get("print").get("printResolution").valueChanges.distinctUntilChanged().subscribe(function() {
                    !0 === e.appState.get("showPrintSelection").value && e.getRectangleForExtent()
                }),
                this.appState.get("print").get("pdfGenerated").valueChanges.filter(function(e) {
                    return !0 === e
                }).subscribe(function() {
                    !0 === e.appState.get("showPrintSelection").value && e.getRectangleForExtent()
                })
            }
            ,
            t.prototype.changeBackdropVisibility = function(e) {
                this.map.getLayers().forEach(function(t) {
                    "BACKDROP" === t.get("category") && (!0 === e && "Cartoweb_title" === t.get("name") ? t.setVisible(e) : !1 === e && t.setVisible(e))
                })
            }
            ,
            t.prototype.changeDrawingLayerVisibility = function(e) {
                this.map.getLayers().forEach(function(t) {
                    "DRAWING_LAYER" === t.get("category") && t.setVisible(e)
                })
            }
            ,
            t.prototype.changeLayersVisibilityForOfficialPrint = function(e) {
                this.map.getLayers().forEach(function(t) {
                    null == t.get("activated") && t.set("activated", t.getVisible()),
                    "LAYERS" !== t.get("category") && "BACKDROP" !== t.get("category") && (!0 === e ? t.setVisible(t.get("activated")) : t.setVisible(e))
                })
            }
            ,
            t.prototype.changeFeaturesResultsLayerVisibility = function(e) {
                this.map.getLayers().forEach(function(t) {
                    "FEATURES_RESULTS" === t.get("category") && t.setVisible(e)
                })
            }
            ,
            t.prototype.activeLayerForTableName = function(e) {
                var t = this.appState.get("layers").value;
                t.forEach(function(t) {
                    t.get("layers").forEach(function(t) {
                        t.tableName === e && (t.active = !0)
                    }),
                    t.get("subGroups") && t.get("subGroups").forEach(function(t) {
                        t.layers.forEach(function(t) {
                            t.tableName === e && (t.active = !0)
                        })
                    })
                }),
                this.appState.get("layers").setValue(t)
            }
            ,
            t.prototype.getCorrectOrientation = function() {
                return "paysage" === this.appState.get("print").get("printOrientation").value ? "LANDSCAPE" : "portrait" === this.appState.get("print").get("printOrientation").value ? "PORTRAIT" : void 0
            }
            ,
            t.prototype.getDate = function() {
                var e = new Date
                  , t = e.getDate()
                  , n = e.getMonth() + 1
                  , i = e.getFullYear();
                return t < 10 && (t = "0" + t),
                n < 10 && (n = "0" + n),
                i + "-" + n + "-" + t
            }
            ,
            t.prototype.getLang = function() {
                return this.labelService.lang.value
            }
            ,
            t.prototype.getCMSString = function() {
                var e = this;
                this.cmsService.getCmsContentByKey("PRINT_TITLE_OFFICIAL").toPromise().then(function(t) {
                    e.printTitleOfficial = t
                }),
                this.cmsService.getCmsContentByKey("PRINT_TITLE_UNOFFICIAL").toPromise().then(function(t) {
                    e.printTitleUnofficial = t
                }),
                this.cmsService.getCmsContentByKey("PRINT_COPYRIGHT_OFFICIAL").toPromise().then(function(t) {
                    e.printCopyrightOfficial = t
                }),
                this.cmsService.getCmsContentByKey("PRINT_COPYRIGHT_UNOFFICIAL").toPromise().then(function(t) {
                    e.printCopyrightUnofficial = t
                }),
                this.cmsService.getCmsContentByKey("PRINT_CENTERED_ON").toPromise().then(function(t) {
                    e.printCenteredOn = t
                }),
                this.cmsService.getCmsContentByKey("FISCAL_YEAR").toPromise().then(function(t) {
                    e.fiscalYear = t
                }),
                this.cmsService.getCmsContentByKey("CURRENT_YEAR").toPromise().then(function(t) {
                    e.currentYear = t
                })
            }
            ,
            t.prototype.strip_html_tags = function(e) {
                return null !== e && "" !== e && void 0 !== e && (e = e.toString(),
                (e = (new xo.AllHtmlEntities).decode(e)).replace(/<[^>]*>/g, ""))
            }
            ,
            t.prototype.getFeatureAtPixel = function(e, t) {
                var n = this
                  , i = this.map.getPixelFromCoordinate(e);
                return t ? this.map.forEachFeatureAtPixel(i, function(e) {
                    e.get("CaPaKey") && e.get("CaPaKey") == t && (n.appState.get("drawFeaturesResultsLayerOn").setValue(!0),
                    n.appState.get("displayFeaturesResultsOnMap").setValue(!0),
                    n.drawResultVectorSource.addFeature(e),
                    n.featuresResults.setSource(n.drawResultVectorSource),
                    n.appState.get("vectorActivated").setValue(!1))
                }) : this.map.forEachFeatureAtPixel(i, function(e) {
                    e.get("CaPaKey") && (n.appState.get("drawFeaturesResultsLayerOn").setValue(!0),
                    n.appState.get("displayFeaturesResultsOnMap").setValue(!0),
                    n.drawResultVectorSource.addFeature(e),
                    n.featuresResults.setSource(n.drawResultVectorSource))
                }),
                []
            }
            ,
            t.prototype.getFeatureInExtent = function(e, t) {
                var n = this
                  , i = this
                  , a = [];
                if (e.forEach(function(e, t) {
                    var i = e[0].labelPoints[0].x
                      , o = e[0].labelPoints[0].y;
                    a.push(n.map.getPixelFromCoordinate([i, o]))
                }),
                t) {
                    i.appState.get("drawFeaturesResultsLayerOn").setValue(!0),
                    i.appState.get("displayFeaturesResultsOnMap").setValue(!0);
                    var o = [];
                    i.appState.get(""),
                    setTimeout(function() {
                        t.forEach(function(e, t) {
                            n.map.forEachFeatureAtPixel(a[t], function(t) {
                                t.get("CaPaKey") && t.get("CaPaKey") == e && o.push(t)
                            })
                        }),
                        i.drawResultVectorSource.addFeatures(o),
                        i.featuresResults.setSource(i.drawResultVectorSource),
                        i.appState.get("vectorActivated").setValue(!1)
                    }, 1e3)
                }
                return []
            }
            ,
            Fo([Object(i.Input)(), Vo("design:type", f.d)], t.prototype, "appState", void 0),
            Fo([Object(i.Input)(), Vo("design:type", h.a)], t.prototype, "map", void 0),
            Fo([Object(i.Input)(), Vo("design:type", To.a)], t.prototype, "select", void 0),
            Fo([Object(i.Input)(), Vo("design:type", Object)], t.prototype, "selectedPixel", void 0),
            t = Fo([Object(i.Component)({
                selector: "mapview-subscription-manager",
                template: "<div></div>"
            }), Vo("design:paramtypes", [be, O, k, tt, ga, ya, se, p, s.b])], t)
        }(ba)
          , jo = n("iixe")
          , Go = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , Bo = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , Uo = function() {
            function e(e, t, n) {
                this.cms = e,
                this.labelService = t,
                this.sanitizer = n,
                this.htmlContent = {
                    nl: "",
                    fr: "",
                    de: ""
                }
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.alertPopupIsVisible = !0,
                this.bodyIsVisible = !0,
                this.bodyIsNotVisible = !1,
                this.widthVal = 100,
                this.fontSizeVal = 100,
                this.cms.getCmsContentByKey(this.key).subscribe(function(t) {
                    e.htmlContent = t
                })
            }
            ,
            e.prototype.getLang = function() {
                return this.labelService.lang.value.toLowerCase()
            }
            ,
            e.prototype.sanitizeStyle = function(e) {
                return this.sanitizer.bypassSecurityTrustHtml(this.replaceLink(e))
            }
            ,
            e.prototype.replaceLink = function(e) {
                if (void 0 !== e) {
                    var t = new RegExp(/\[\[key="/,"g")
                      , n = new RegExp(/,label="/,"g");
                    e = (e = (e = e.replace(t, '<a href="/ecad-web/#/help/')).replace(n, ">")).replace(/"\]\]/g, "</a>")
                }
                return e
            }
            ,
            e.prototype.closeAlert = function() {
                this.alertPopupIsVisible = !1
            }
            ,
            e.prototype.reduceAlert = function() {
                this.bodyIsVisible = !1,
                this.bodyIsNotVisible = !0,
                this.widthVal = 40,
                this.fontSizeVal = 80
            }
            ,
            e.prototype.expandAlert = function() {
                this.bodyIsNotVisible = !1,
                this.bodyIsVisible = !0,
                this.widthVal = 100,
                this.fontSizeVal = 100
            }
            ,
            Go([Object(i.Input)(), Bo("design:type", String)], e.prototype, "key", void 0),
            e = Go([Object(i.Component)({
                selector: "app-cms-alert",
                template: n("NYDE"),
                styles: [n("yXsi")]
            }), Bo("design:paramtypes", [se, s.b, o.DomSanitizer])], e)
        }()
          , zo = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , Ko = function() {
            function e() {}
            return e = zo([Object(i.NgModule)({
                imports: [Ct.CommonModule, jo.a, f.e, We.c.forRoot(), f.h, tn.a, vn, s.a, yi.a],
                declarations: [Na, Fa, Uo, Pn],
                exports: [Na, Fa, Uo]
            })], e)
        }()
          , Yo = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , Zo = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , Wo = function() {
            function e(e, t, n, i, a, o, r) {
                this.configService = e,
                this.localisationService = t,
                this.notificationService = n,
                this.searchService = i,
                this.cadexService = a,
                this.cmsService = o,
                this.labelService = r,
                this.isSetup = !1,
                this.capakeys = null,
                this.firstCapakey = null,
                this.cancelReturnMyMinfin = {
                    nl: "...",
                    fr: "...",
                    de: "...",
                    en: "..."
                },
                this.helpCadex = {
                    nl: "...",
                    fr: "...",
                    de: "...",
                    en: "..."
                }
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.cmsService.getCmsContentByKey("CANCEL_RETURN_MYMINFIN").subscribe(function(t) {
                    e.cancelReturnMyMinfin = t
                }),
                this.cmsService.getCmsContentByKey("HELP_CADEX").subscribe(function(t) {
                    e.helpCadex = t
                }),
                this.appState.get("cadex").setValue(this.configService.cadexBundle),
                this.appState.get("mapLoading").valueChanges.subscribe(function(t) {
                    !1 === e.isSetup && e.setupCadex()
                })
            }
            ,
            e.prototype.setupCadex = function() {
                !0 === this.appState.get("cadex").get("active").value && ("round" === this.appState.get("cadex").get("selectType").value && this.appState.get("spatialAnalysisType").setValue("round"),
                "tenants" === this.appState.get("cadex").get("selectType").value && this.appState.get("spatialAnalysisType").setValue("tenants"),
                "capakey" === this.appState.get("cadex").get("selectType").value && this.appState.get("spatialAnalysisType").setValue("capakey"),
                null !== this.appState.get("cadex").get("fiscYear").value && ("current" === this.appState.get("cadex").get("fiscYear").value ? this.appState.get("currentSituation").setValue("CURRENT") : "last" === this.appState.get("cadex").get("fiscYear").value && this.appState.get("currentSituation").setValue("FISCAL")),
                null !== this.appState.get("cadex").get("capakey").value && (this.capakeys = this.appState.get("cadex").get("capakey").value.replaceAll(";", ","),
                this.firstCapakey = this.capakeys.split(",")[0]),
                "print" === this.appState.get("cadex").get("action").value && this.setupCadexPrint(),
                "select" === this.appState.get("cadex").get("action").value && this.setupCadexSelect(),
                this.isSetup = !0)
            }
            ,
            e.prototype.setupCadexSelect = function() {
                var e = this.configService.getConfig();
                "round" === this.appState.get("cadex").get("selectType").value && (e.menus.toolsMenu.visibility = !0,
                e.menus.toolsMenu.localisation = !0,
                e.menus.toolsMenu.spatialAnalysis = !0,
                this.configService.setConfig(e)),
                "tenants" === this.appState.get("cadex").get("selectType").value && (e.menus.toolsMenu.visibility = !0,
                e.menus.toolsMenu.localisation = !0,
                e.menus.toolsMenu.spatialAnalysis = !0,
                this.configService.setConfig(e)),
                "capakey" === this.appState.get("cadex").get("selectType").value && (e.menus.toolsMenu.visibility = !0,
                e.menus.toolsMenu.localisation = !0,
                e.menus.toolsMenu.spatialAnalysis = !0,
                this.configService.setConfig(e),
                null !== this.firstCapakey && (this.goToCapakey(),
                this.selectCapakey()))
            }
            ,
            e.prototype.setupCadexPrint = function() {
                var e = this.configService.getConfig()
                  , t = !1;
                e.menus.printMenu = !0,
                this.configService.setConfig(e),
                this.goToCapakey(),
                this.capakeys.includes(",") && (t = !0),
                "round" === this.appState.get("cadex").get("selectType").value && this.getRound(t),
                "tenants" === this.appState.get("cadex").get("selectType").value && this.getTenants(t)
            }
            ,
            e.prototype.goToCapakey = function() {
                var e = this;
                null !== this.firstCapakey && ("CURRENT" === this.appState.get("currentSituation").value ? this.localisationService.getCoordinatesFromCapakey(this.firstCapakey).subscribe(function(t) {
                    e.localisationService.getCenterOfParcels(t).toPromise().then(function(t) {
                        e.appState.get("searchResultCapakey").setValue({
                            coord: [Number(t.labelPoints[0].x), Number(t.labelPoints[0].y)],
                            capakey: e.firstCapakey
                        })
                    })
                }) : "FISCAL" === this.appState.get("currentSituation").value && this.localisationService.getCoordinatesFromFiscalCapakey(this.firstCapakey).subscribe(function(t) {
                    e.localisationService.getCenterOfParcels(t).toPromise().then(function(t) {
                        e.appState.get("searchResultCapakey").setValue({
                            coord: [Number(t.labelPoints[0].x), Number(t.labelPoints[0].y)],
                            capakey: e.firstCapakey
                        })
                    })
                }))
            }
            ,
            e.prototype.selectCapakey = function() {
                var e = this;
                this.searchService.postAttributaireSearch({
                    tableName: "BPN_CAPA",
                    criteria: {
                        attribute: "CAPAKEY",
                        operation: "EQUAL",
                        stringValue: this.firstCapakey,
                        numericValue: 0,
                        dateValue: "",
                        or: [],
                        and: []
                    }
                }).toPromise().then(function(t) {
                    e.appState.get("cadex").get("responseBody").setValue(t),
                    e.appState.get("searchResultList").setValue(t),
                    e.appState.get("resultListReady").setValue(!0)
                })
            }
            ,
            e.prototype.getRound = function(e) {
                var t = this;
                this.appState.get("searchResultTable").setValue("BPN_CAPA"),
                this.localisationService.getBufferAndRound4Parcels(this.capakeys, this.appState.get("cadex").get("radius").value, this.appState.get("currentSituation").value).catch(function(e) {
                    return null != e.error ? e.error.message === ki.ERROR_JSON_ROUND_NOT_CONTIGUOUSLY ? t.notificationService.notify("error", "NOTIFICATION.ERROR.ROUND_NOT_CONTIGUOUSLY") : e.error.message === ki.ROUND_TOO_MANY_PARCELS ? t.notificationService.notify("error", "NOTIFICATION.ERROR.ROUND_TOO_MANY_PARCELS") : t.notificationService.notify("error", "NOTIFICATION.ERROR.CAPAKEY_JSON_PROCESS") : t.notificationService.notify("error", "NOTIFICATION.ERROR.CAPAKEY_JSON_PROCESS"),
                    Ft.Observable.empty()
                }).subscribe(function(n) {
                    if (null === n)
                        t.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT");
                    else {
                        t.appState.get("drawFeaturesResultsLayerOn").setValue(!0),
                        t.appState.get("cadex").get("responseBody").setValue(n);
                        var i = []
                          , a = []
                          , o = !1;
                        if (e)
                            for (var r = 0; r < n.selectedPlots.length; r++)
                                i.push(n.selectedPlots[r].attributes),
                                a.push(n.selectedPlots[r].attributes.OBJECTID);
                        else
                            i.push(n.selectedPlot.attributes),
                            a.push(n.selectedPlot.attributes.OBJECTID);
                        for (r = 0; r < n.plotsAround.length; r++) {
                            for (var s = 0; s < a.length; s++)
                                a[s] === n.plotsAround[r].attributes.OBJECTID && (o = !0);
                            o || (i.push(n.plotsAround[r].attributes),
                            t.appState.get("resultOnMap").setValue({
                                geometry: n.plotsAround[r].geometry.rings[0],
                                id: n.plotsAround[r].attributes.OBJECTID
                            })),
                            o = !1
                        }
                        if (e)
                            for (r = 0; r < n.selectedPlots.length; r++)
                                t.appState.get("sourceOnMap").setValue({
                                    geometry: n.selectedPlots[r].geometry.rings[0],
                                    id: n.selectedPlots[r].attributes.OBJECTID
                                });
                        else
                            t.appState.get("sourceOnMap").setValue({
                                geometry: n.selectedPlot.geometry.rings[0],
                                id: n.selectedPlot.attributes.OBJECTID
                            });
                        t.appState.get("sourceOnMap").setValue({
                            geometry: n.geometry[0].rings[0],
                            id: 0
                        }),
                        t.appState.get("displayFeaturesResultsOnMap").setValue(!0),
                        t.appState.get("searchResultList").setValue(i),
                        t.appState.get("resultListReady").setValue(!0)
                    }
                })
            }
            ,
            e.prototype.getTenants = function(e) {
                var t = this;
                this.appState.get("searchResultTable").setValue("BPN_CAPA"),
                this.localisationService.getTenantsFromCapakeys(this.capakeys, this.appState.get("currentSituation").value).catch(function(e) {
                    return e.error.message === ki.ERROR_JSON_TENANTS_NOT_CONTIGUOUSLY ? t.notificationService.notify("error", "NOTIFICATION.ERROR.TENANTS_NOT_CONTIGUOUSLY") : e.error.message === ki.TENANTS_TOO_MANY_PARCELS ? t.notificationService.notify("error", "NOTIFICATION.ERROR.TENANTS_TOO_MANY_PARCELS") : t.notificationService.notify("error", "NOTIFICATION.ERROR.CAPAKEY_JSON_PROCESS"),
                    Ft.Observable.empty()
                }).subscribe(function(n) {
                    if (null === n)
                        t.notificationService.notify("error", "NOTIFICATION.NO_SEARCH_RESULT");
                    else {
                        t.appState.get("drawFeaturesResultsLayerOn").setValue(!0),
                        !0 === t.appState.get("cadex").get("active").value && t.appState.get("cadex").get("responseBody").setValue(n);
                        for (var i = [], a = 0; a < n.plotsAround.length; a++)
                            i.push(n.plotsAround[a].attributes),
                            t.appState.get("resultOnMap").setValue({
                                geometry: n.plotsAround[a].geometry.rings[0],
                                id: n.plotsAround[a].attributes.OBJECTID
                            });
                        if (e)
                            for (a = 0; a < n.selectedPlots.length; a++)
                                i.push(n.selectedPlots[a].attributes),
                                t.appState.get("sourceOnMap").setValue({
                                    geometry: n.selectedPlots[a].geometry.rings[0],
                                    id: n.selectedPlots[a].attributes.OBJECTID
                                });
                        else
                            i.push(n.selectedPlot.attributes),
                            t.appState.get("sourceOnMap").setValue({
                                geometry: n.selectedPlot.geometry.rings[0],
                                id: n.selectedPlot.attributes.OBJECTID
                            });
                        t.appState.get("displayFeaturesResultsOnMap").setValue(!0),
                        t.appState.get("searchResultList").setValue(i),
                        t.appState.get("resultListReady").setValue(!0)
                    }
                })
            }
            ,
            e.prototype.exportToCadex = function() {
                if ("tenants" === this.appState.get("cadex").get("selectType").value || "round" === this.appState.get("cadex").get("selectType").value) {
                    var e = this.appState.get("cadex").get("returnUrl").value;
                    null !== e && (localStorage.setItem(this.appState.get("cadex").get("uid").value, null),
                    window.location.href = e)
                }
            }
            ,
            e.prototype.goToHelpCadex = function() {
                var e = this.labelService.lang.value;
                window.open(window.location.toString().split("?")[0] + "cadex_help/" + e + "/cadex_home", "_blank")
            }
            ,
            e.prototype.lang = function() {
                return this.labelService.lang.value.toLowerCase()
            }
            ,
            e.prototype.strip_html_tags = function(e) {
                return null !== e && "" !== e && (e = e.toString()).replace(/<[^>]*>/g, "")
            }
            ,
            Yo([Object(i.Input)(), Zo("design:type", f.d)], e.prototype, "appState", void 0),
            Yo([Object(i.Input)(), Zo("design:type", To.a)], e.prototype, "select", void 0),
            e = Yo([Object(i.Component)({
                selector: "app-cadex-manager",
                template: n("9Th9"),
                styles: [n("O500")]
            }), Zo("design:paramtypes", [O, tt, pe, bi, $n, se, s.b])], e)
        }()
          , Ho = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , Xo = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , Jo = function() {
            function e(e, t, n, i, a, o, r) {
                this.configService = e,
                this.localisationService = t,
                this.notificationService = n,
                this.searchService = i,
                this.precadService = a,
                this.cmsService = o,
                this.labelService = r,
                this.isSetup = !1,
                this.cancelReturnMyMinfin = {
                    nl: "...",
                    fr: "...",
                    de: "...",
                    en: "..."
                },
                this.helpPrecad = {
                    nl: "...",
                    fr: "...",
                    de: "...",
                    en: "..."
                }
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.cmsService.getCmsContentByKey("CANCEL_RETURN_MYMINFIN").subscribe(function(t) {
                    e.cancelReturnMyMinfin = t
                }),
                this.cmsService.getCmsContentByKey("HELP_PRECAD").subscribe(function(t) {
                    e.helpPrecad = t
                }),
                this.appState.get("precad").setValue(this.configService.precadBundle),
                this.appState.get("mapLoading").valueChanges.subscribe(function(t) {
                    !1 === e.isSetup && e.setupPrecad()
                })
            }
            ,
            e.prototype.setupPrecad = function() {
                !0 === this.appState.get("precad").get("active").value && (this.appState.get("currentSituation").setValue("CURRENT"),
                this.setupPrecadSelect(),
                this.isSetup = !0)
            }
            ,
            e.prototype.setupPrecadSelect = function() {
                var e = this.configService.getConfig();
                e.menus.toolsMenu.visibility = !0,
                e.menus.toolsMenu.localisation = !0,
                e.menus.toolsMenu.spatialAnalysis = !0,
                this.configService.setConfig(e)
            }
            ,
            e.prototype.exportToPrecad = function() {
                var e = this.appState.get("precad").get("returnUrl").value;
                null !== e && (localStorage.setItem(this.appState.get("precad").get("uid").value, null),
                window.location.href = e)
            }
            ,
            e.prototype.goToHelpPrecad = function() {
                var e = this.labelService.lang.value;
                window.open(window.location.toString().split("?")[0] + "precad_help/" + e + "/precad_home", "_blank")
            }
            ,
            e.prototype.lang = function() {
                return this.labelService.lang.value.toLowerCase()
            }
            ,
            e.prototype.strip_html_tags = function(e) {
                return null !== e && "" !== e && (e = e.toString()).replace(/<[^>]*>/g, "")
            }
            ,
            Ho([Object(i.Input)(), Xo("design:type", f.d)], e.prototype, "appState", void 0),
            Ho([Object(i.Input)(), Xo("design:type", To.a)], e.prototype, "select", void 0),
            e = Ho([Object(i.Component)({
                selector: "app-precad-manager",
                template: n("v/Xl"),
                styles: [n("Yjj+")]
            }), Xo("design:paramtypes", [O, tt, pe, bi, ni, se, s.b])], e)
        }()
          , qo = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , Qo = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , $o = function() {
            function e(e, t) {
                this.labelService = e,
                this.utilsService = t
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.utilsService.getVersion().subscribe(function(t) {
                    e.projectVersion = t
                })
            }
            ,
            e.prototype.lang = function() {
                return this.labelService.lang.value
            }
            ,
            e = qo([Object(i.Component)({
                selector: "app-footer",
                template: n("1B/m"),
                styles: [n("tUmx")]
            }), Qo("design:paramtypes", [s.b, Ze])], e)
        }()
          , er = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , tr = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , nr = function() {
            function e(e) {
                void 0 === e && (e = []),
                this.selected = [],
                this.base = e.slice()
            }
            return e.prototype.selectNone = function() {
                this.selected = []
            }
            ,
            e.prototype.isSelectedNone = function() {
                return 0 === this.selected.length
            }
            ,
            e.prototype.selectAll = function() {
                this.selected = this.base.slice()
            }
            ,
            e.prototype.isSelectedAll = function() {
                var e = this;
                return this.selected.length === this.base.length && this.selected.every(function(t) {
                    return e.base.find(function(e) {
                        return t === e
                    })
                })
            }
            ,
            e
        }()
          , ir = function() {
            function e() {
                this.display = "name",
                this.leftTitle = "Available",
                this.rightTitle = "Chosen",
                this.updateLists = new i.EventEmitter
            }
            return Object.defineProperty(e.prototype, "leftList", {
                set: function(e) {
                    this._leftList = new nr(e)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "rightList", {
                set: function(e) {
                    this._rightList = new nr(e)
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.isSelected = function(e, t) {
                return Boolean(e.filter(function(e) {
                    return Object.is(e, t)
                }).length)
            }
            ,
            e.prototype.selectItem = function(e, t) {
                var n = e.filter(function(e) {
                    return Object.is(e, t)
                });
                n.length ? n.forEach(function(t) {
                    var n = e.indexOf(t);
                    n + 1 && e.splice(n, 1)
                }) : e.push(t)
            }
            ,
            e.prototype.moveSelectedItems = function(e, t) {
                e.base = e.base.filter(function(t) {
                    return !(e.selected.indexOf(t) + 1)
                }),
                t.base = t.base.concat(e.selected),
                e.selectNone(),
                this.updateLists.next({
                    leftList: this._leftList.base,
                    rightList: this._rightList.base
                })
            }
            ,
            er([Object(i.Input)(), tr("design:type", String)], e.prototype, "display", void 0),
            er([Object(i.Input)(), tr("design:type", String)], e.prototype, "leftTitle", void 0),
            er([Object(i.Input)(), tr("design:type", String)], e.prototype, "rightTitle", void 0),
            er([Object(i.Input)(), tr("design:type", Array), tr("design:paramtypes", [Array])], e.prototype, "leftList", null),
            er([Object(i.Input)(), tr("design:type", Array), tr("design:paramtypes", [Array])], e.prototype, "rightList", null),
            er([Object(i.Output)(), tr("design:type", Object)], e.prototype, "updateLists", void 0),
            e = er([Object(i.Component)({
                selector: "app-dual-list",
                template: n("Jp34"),
                styles: [n("6YaK")]
            }), tr("design:paramtypes", [])], e)
        }()
          , ar = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , or = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(e, t)
        }
          , rr = function() {
            function e(e, t, n, i, a, o, r) {
                this.configService = e,
                this.localisationService = t,
                this.notificationService = n,
                this.searchService = i,
                this.cdmsService = a,
                this.cmsService = o,
                this.labelService = r,
                this.isSetup = !1,
                this.cancelReturnMyMinfin = {
                    nl: "...",
                    fr: "...",
                    de: "...",
                    en: "..."
                },
                this.helpCdms = {
                    nl: "...",
                    fr: "...",
                    de: "...",
                    en: "..."
                }
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.cmsService.getCmsContentByKey("CANCEL_RETURN_MYMINFIN").subscribe(function(t) {
                    e.cancelReturnMyMinfin = t
                }),
                this.cmsService.getCmsContentByKey("HELP_CDMS").subscribe(function(t) {
                    e.helpCdms = t
                }),
                this.appState.get("cdms").setValue(this.configService.cdmsBundle),
                this.appState.get("mapLoading").valueChanges.subscribe(function(t) {
                    !1 === e.isSetup && e.setupCdms()
                })
            }
            ,
            e.prototype.setupCdms = function() {
                !0 === this.appState.get("cdms").get("active").value && (this.appState.get("currentSituation").setValue("CURRENT"),
                this.setupCdmsSelect(),
                this.isSetup = !0)
            }
            ,
            e.prototype.setupCdmsSelect = function() {
                var e = this.configService.getConfig();
                e.menus.toolsMenu.visibility = !0,
                e.menus.toolsMenu.localisation = !0,
                e.menus.toolsMenu.spatialAnalysis = !0,
                this.configService.setConfig(e)
            }
            ,
            e.prototype.exportToCdms = function() {
                var e = this.appState.get("cdms").get("returnUrl").value;
                null !== e && (localStorage.setItem(this.appState.get("cdms").get("uid").value, null),
                window.location.href = e)
            }
            ,
            e.prototype.goToHelpCdms = function() {
                var e = this.labelService.lang.value;
                window.open(window.location.toString().split("?")[0] + "cdms_help/" + e + "/cdms_home", "_blank")
            }
            ,
            e.prototype.lang = function() {
                return this.labelService.lang.value.toLowerCase()
            }
            ,
            e.prototype.strip_html_tags = function(e) {
                return null !== e && "" !== e && (e = e.toString()).replace(/<[^>]*>/g, "")
            }
            ,
            ar([Object(i.Input)(), or("design:type", f.d)], e.prototype, "appState", void 0),
            ar([Object(i.Input)(), or("design:type", To.a)], e.prototype, "select", void 0),
            e = ar([Object(i.Component)({
                selector: "app-cdms-manager",
                template: n("gYgX"),
                styles: [n("DxUx")]
            }), or("design:paramtypes", [O, tt, p, bi, pi, se, s.b])], e)
        }()
          , sr = this && this.__decorate || function(e, t, n, i) {
            var a, o = arguments.length, r = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, i);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r);
            return o > 3 && r && Object.defineProperty(t, n, r),
            r
        }
          , lr = function() {
            function e() {}
            return e = sr([Object(i.NgModule)({
                declarations: [g, rt, Do, ht, Ra, Ro, Wo, Jo, rr, $o, ja, ir],
                imports: [o.BrowserModule, f.h, vn, f.e, Ko, va, Ka, jo.a, f.h, Ri.MyDatePickerModule, s.a.forRoot({
                    languages: ["NL", "FR"],
                    labelSourceUrl: Sn,
                    appName: "ecad",
                    urlPrefix: Cn,
                    urlSuffix: In,
                    prod: bn
                }), sa, pa, la.a, S.b, Hn.a, We.c.forRoot(), r.SimpleNotificationsModule.forRoot(), Lo, Ko, R.DeviceDetectorModule.forRoot(), tn.a],
                exports: [Do, Wo, Jo, rr],
                providers: [O, {
                    provide: i.APP_INITIALIZER,
                    useFactory: function(e) {
                        return function() {
                            return e.loadCurrentConfig()
                        }
                    },
                    deps: [O],
                    multi: !0
                }, {
                    provide: i.APP_INITIALIZER,
                    useFactory: function(e) {
                        return function() {
                            return e.loadPermissions()
                        }
                    },
                    multi: !0,
                    deps: [ae]
                }, s.b, $n, ni, pi],
                bootstrap: [g]
            })], e)
        }();
        bn && Object(i.enableProdMode)(),
        Object(a.a)().bootstrapModule(lr).catch(function(e) {
            return console.error(e)
        })
    },
    x3QM: function(e, t) {
        e.exports = ".chosen{\n  background-color: lightgrey;\n}\n\n\n.toChose{\n  padding-left: 10px;\n  border: solid #000 1px;\n}\n\n\n.margin-left{\n  margin-left: 10px;\n}\n"
    },
    yH2H: function(e, t) {
        e.exports = '<div class="modal-header">\n  <h4 class="modal-title"><l key="description"></l></h4>\n  <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss(\'Cross click\')">\n    <span aria-hidden="true">&times;</span>\n  </button>\n</div>\n<div class="modal-body">\n  <div [innerHtml]="htmlContent[getLang()]"></div>\n</div>\n<div class="modal-footer">\n  <button type="button" class="btn btn-outline-dark" (click)="activeModal.close(\'Close click\')">Close</button>\n</div>\n'
    },
    yXsi: function(e, t) {
        e.exports = ".alert {\n  padding-top: 0rem;\n    padding-left: 0rem;\n    padding-right: 0rem;\n    margin-bottom: 0rem;\n    position: relative;\n}\n\n.minimize {\n    position: initial;\n    top: auto;\n    right: 40px;\n    bottom: auto;\n    left: auto;\n  }\n\n.expand {\n    position: initial;\n    top: 15px;\n    right: 40px;\n    bottom: auto;\n    left: auto;  \n  }\n\n.modal-header{\n    height: 22px;\n    display: block;\n   }\n\n.close {\n    float: right;\n    padding-right: 10px;\n    font-size: 1rem;\n   }\n"
    },
    yc3C: function(e, t) {
        e.exports = ".margin-left{\n  margin-left: 20px;\n}\n\n.card {\n  word-wrap: normal !important;\n}\n\n#button {\n  position: relative;\n\n}\n\n.row {\n  margin-right: 0 !important;\n  margin-left: 0 !important\n}\n\nhr.splitGroup {\n  border : solid 1px #353535;\n}\n\n.btn-fin01 {\n  background: #fff;\n  color: rgba(3, 174, 216, 1);\n  border: 1px solid rgba(3, 174, 216, 1);\n}\n\n.close {\n  margin-left: auto;\n}\n\n.custom-title {\n  padding-bottom: 10px;\n  font-size: 1em;\n  font-weight: bold;\n  display: inline-block;\n  color: blue;\n}\n\n.hr {\n  border-top: 1px solid rgba(0,0,0,.2) !important;\n}\n"
    },
    "yg+K": function(e, t) {
        e.exports = ".infobulle-alert {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border-left-style: solid;\n  border-width: 1rem;\n  border-color: #f9df58;\n  background-color: #fceda2;\n  color: black;\n  padding: 1rem;\n}\n\n.infobulle-danger {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border-left-style: solid;\n  border-width: 1rem;\n  border-color: #f5384d;\n  background-color: #fbafb7;\n  color: black;\n  padding: 1rem;\n}\n"
    },
    ylO1: function(e, t) {
        e.exports = '<div class="card">\n    <div class="container">\n\n      <div class="edit-form">\n        <br/>\n        <div class="edit-form-elem">\n\n              <div class="row">\n                  <br />\n                  <div class="col-lg-4 col-sm-4 col-md-4">\n                  <label><l key="texttool.text"></l></label>\n                  </div>\n                  <div class="col-lg-6 col-sm-6 col-md-6" >\n                  <input type="text"   id="draw-Text" [(ngModel)]="drawText" style="width:80%"/>\n                  </div>\n              </div>\n            <div class="row">\n              <div class="col-lg-4 col-sm-4 col-md-4">\n                <label><l key="texttool.police"></l></label>\n              </div>\n              <div class="col-lg-6 col-sm-6 col-md-6" >\n                <select id="points-font" [(ngModel)]="font" style="width:80%">\n                  <option [value]="\'Arial\'"   >Arial</option>\n                  <option [value]="\'Courier New\'" >Courier New</option>\n                  <option [value]="\'Open Sans\'" >Open Sans</option>\n                  <option [value]="\'Verdana\'" >Verdana</option>\n                </select>\n              </div>\n           </div>\n           <div class="row">\n              <br />\n              <div class="col-lg-4 col-sm-4 col-md-4" >\n                <label><l key="texttool.weight"></l></label>\n              </div>\n              <div class="col-lg-6 col-sm-6 col-md-6" >\n                <select id="points-weight" [(ngModel)]="weight" style="width:80%">\n                  <option [value]="\'Bold\'" ><l key="Bold"></l></option>\n                  <option [value]="\'Normal\'" ><l key="Normal"></l></option>\n                </select>\n              </div>\n          </div>\n          <div class="row">\n            <br />\n            <div class="col-lg-4 col-sm-4 col-md-4">\n            <label><l key="texttool.size"></l></label>\n            </div>\n            <div class="col-lg-6 col-sm-6 col-md-6" >\n                <select id="points-weight" [(ngModel)]="size" style="width:80%">\n                  <option *ngFor="let sz of textSizes" [value]="sz" >{{sz}}</option>\n                </select>\n           </div>\n              \x3c!--\n            <div class="col-lg-6 col-sm-6 col-md-6" >\n            <input type="text"  id="points-size" [(ngModel)]="size" style="width:80%"/>\n            </div>--\x3e\n          </div>\n          <div class="row">\n            <br />\n            <div class="col-lg-4 col-sm-4 col-md-4" >\n            <label><l key="texttool.color"></l></label>\n            </div>\n            <div class="col-lg-6 col-sm-6 col-md-6" >\n             <input [(colorPicker)]="color" [cpOutputFormat]="\'hex\'"  [cpOKButton]="true"\n             \n                [style.background]="color" style="width:80%"/>\n            </div>\n          </div>\n\n          \n\n          </div>\n        </div>\n        <div class="card-footer">\n            <button class="btn btn-fin01" style = "float:right"  value="Update" (click)="saveCloseModal()"><l key="texttool.submit"></l></button>\n            <button class="btn btn-fin01" value="Close" (click)="closeModal()"><l key="texttool.close"></l></button>\n          </div>\n        </div>\n      </div>\n'
    },
    z0li: function(e, t) {
        e.exports = '<div class="card" *ngIf="!isMenuEmpty()">\n  <div class=" padding-right">\n    <h6 class="card-title info-lvl-1"> <l key="interactions.menu.interactions"></l></h6>\n    <table class="table">\n      <div *ngIf="!isDrawingAndMesuringEmpty()">\n      <tr>\n        <td class="nopadding">\n          <div class="row nopadding" *ngIf="drawingLayer !== null">\n            <div class="col-lg-1 col-1">\n              <input type="checkbox" [checked]="drawingLayerVisible" [(ngModel)]="drawingLayerVisible" (ngModelChange)="updateDrawing(drawingLayerVisible)"/>\n            </div>\n            <div  class="col-lg-11 col-11 info-lvl-2 nopadding">\n              <p><l key="showDrawingAndMesuring"></l></p>\n            </div>\n          </div>\n        </td>\n      </tr>\n  </div>\n  <div *ngIf="!isFeaturesResultsEmpty()">\n      <tr>\n        <td class="nopadding">\n          <div class="row nopadding" *ngIf="featuresResultsLayer !== null">\n            <div class="col-lg-1 col-1">\n              <input type="checkbox" [checked]="featuresResultsLayerVisible" [(ngModel)]="featuresResultsLayerVisible" (ngModelChange)="updateFeaturesResults(featuresResultsLayerVisible)"/>\n            </div>\n            <div  class="col-lg-11 col-11 info-lvl-2 nopadding">\n              <p><l key="showFeaturesResultsLayer"></l></p>\n            </div>\n          </div>\n        </td>\n      </tr>\n  </div>\n    </table>\n\n  </div>\n</div>\n<hr class="splitGroup" *ngIf="!isMenuEmpty()" />\n'
    },
    zKSU: function(e, t) {
        e.exports = ""
    },
    zSdt: function(e, t) {
        e.exports = '<div class="modal-header  ">\n</div>\n<div class="modal-body ">\n  <div class="row">\n    <div class="col-lg-3">\n      <l key="layerName"></l>\n    </div>\n    <div class="col-lg-9">\n      <div class="input-group">\n        <input class="form-control" type="text" [(ngModel)]="layer.layerName"/>\n      </div>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-lg-3">\n      <l key="title"></l>\n    </div>\n    <div class="col-lg-9">\n      <div class="input-group">\n        <input class="form-control" type="text" [(ngModel)]="layer.title"/>\n      </div>\n    </div>\n  </div>\n  <br/>\n  <div class="row">\n    <div class="col-lg-3">\n      <l key="active"></l>\n    </div>\n    <div class="col-lg-9">\n      <div class="input-group">\n        <input class="form-control" type="checkbox" [(ngModel)]="layer.active"/>\n      </div>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-lg-3">\n      <l key="description"></l>\n    </div>\n    <div class="col-lg-9">\n      <div class="input-group">\n        <textarea class="form-control" [(ngModel)]="layer.description"></textarea>\n      </div>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-lg-3">\n      <l key="wms"></l>\n    </div>\n    <div class="col-lg-9">\n      <div class="input-group">\n        <textarea class="form-control" type="text" [(ngModel)]="layer.wms"></textarea>\n      </div>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-lg-3">\n      <l key="legendUrl"></l>\n    </div>\n    <div class="col-lg-9">\n      <div class="input-group">\n        <textarea class="form-control" type="text" [(ngModel)]="layer.legendUrl"></textarea>\n      </div>\n    </div>\n  </div>\n  <br/>\n  <div class="row">\n    <div class="col-lg-3">\n      <l key="opacity"></l>\n    </div>\n    <div class="col-lg-9">\n      <div class="input-group">\n        <input type="range" min="0" max="1" step="0.1" [(ngModel)]="layer.opacity">\n      </div>\n    </div>\n  </div>\n  <br/>\n  <div class="row">\n    <div class="col-lg-3">\n      <l key="tiled"></l>\n    </div>\n    <div class="col-lg-9">\n      <div class="input-group">\n        <input class="form-control" type="checkbox" [(ngModel)]="layer.tiled"/>\n      </div>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-lg-3">\n      <l key="canDelete"></l>\n    </div>\n    <div class="col-lg-9">\n      <div class="input-group">\n        <input class="form-control" type="checkbox" [(ngModel)]="layer.canDelete"/>\n      </div>\n    </div>\n  </div>\n  <br/>\n  <div *ngIf="layer.translations">\n    <div class="row">\n      <div class="col-lg-3">\n        <l key="TranslationFR"></l>\n      </div>\n      <div class="col-lg-9">\n        <div class="input-group">\n          <input class="form-control" type="text" [(ngModel)]="layer.translations.FR"/>\n        </div>\n      </div>\n    </div>\n    <div class="row">\n      <div class="col-lg-3">\n        <l key="TranslationNL"></l>\n      </div>\n      <div class="col-lg-9">\n        <div class="input-group">\n          <input class="form-control" type="text" [(ngModel)]="layer.translations.NL"/>\n        </div>\n      </div>\n    </div>\n    <div class="row">\n      <div class="col-lg-3">\n        <l key="TranslationDE"></l>\n      </div>\n      <div class="col-lg-9">\n        <div class="input-group">\n          <input class="form-control" type="text" [(ngModel)]="layer.translations.DE"/>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class="modal-footer">\n  <div class="text-right">\n    <button class="btn btn-fin01" (click)="closeModal()"><l key="close"></l></button>\n  </div>\n</div>\n'
    },
    zxYT: function(e, t) {
        e.exports = '<div>\n  <div>\n    <div class="row pab20" *ngIf="!configService.precadBundle.active && !configService.cdmsBundle.active">\n      <div class="col-lg-12">\n        <app-switch-situation [formGroup]="appState"></app-switch-situation>\n      </div>\n    </div>\n    <div class="row">\n      <div class="col-lg-12">\n        <h3 class="card-title bold-title">\n          <l key="layer.menu.tools"></l>\n        </h3>\n      </div>\n    </div>\n    <div class="mesureTools" *ngIf="isMesureToolsInConfig()">\n      <hr/>\n      <div class="row" (click)="showMenu(\'measureTool\')">\n        <div class="col-lg-2 col-2">\n          <span class="top-logo-tool">\n            <i class="icon-fin-pict-measure icon-2x"></i>\n          </span>\n        </div>\n        <div class="col-lg-8 col-8">\n          <p>\n            <l key="mesureTools"></l>\n          </p>\n        </div>\n        <div class="col-lg-2 col-2">\n          <i *ngIf="menuShown === \'measureTool\'" class="fa fa-caret-up"></i>\n          <i *ngIf="menuShown !== \'measureTool\'" class="fa fa-caret-down"></i>\n        </div>\n      </div>\n      <div *ngIf="menuShown === \'measureTool\'">\n        <div class="row logo-row" (click)="chooseTool(\'measureTools\',\'LineString\')">\n          <div class="col-lg-4 col-4 check-icon">\n            <i class="fa fa-check"\n               *ngIf="toolChosen === \'LineString\' && tooltypeChosen === \'measureTools\'"></i>\n          </div>\n          <div class="col-lg-4 col-4">\n            <span class="logo-tool">\n              <i class="icon-fin-pict-measureline icon-2x"></i>\n            </span>\n          </div>\n          <div class="col-lg-4 col-4">\n            <l key="mesureTools.LineString"></l>\n          </div>\n        </div>\n        <hr/>\n        <div class="row logo-row" (click)="chooseTool(\'measureTools\',\'Polygon\')">\n          <div class="col-lg-4 col-4 check-icon">\n            <i class="fa fa-check fa-2x"\n               *ngIf="toolChosen === \'Polygon\' && tooltypeChosen === \'measureTools\'"></i>\n          </div>\n          <div class="col-lg-4 col-4">\n            <span class="logo-tool">\n              <i class="icon-fin-pict-measuresurf icon-2x"></i>\n            </span>\n          </div>\n          <div class="col-lg-4 col-4">\n            <l key="mesureTools.Polygone"></l>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="drawTools" *ngIf="isDrawToolsInConfig()">\n      <hr/>\n      <div class="row" (click)="showMenu(\'drawTools\')">\n        <div class="col-lg-2 col-2">\n          <span class="top-logo-tool">\n            <i class="icon-fin-pict-draw icon-2x"></i>\n          </span>\n        </div>\n        <div class="col-lg-8 col-8">\n          <p>\n            <l key="drawTools"></l>\n          </p>\n        </div>\n        <div class="col-lg-2 col-2">\n          <i *ngIf="menuShown === \'drawTools\'" class="fa fa-caret-up"></i>\n          <i *ngIf="menuShown !== \'drawTools\'" class="fa fa-caret-down"></i>\n        </div>\n      </div>\n      <div *ngIf="menuShown === \'drawTools\'">\n        <div class="row logo-row" (click)="chooseTool(\'drawTools\',\'LineString\')">\n          <div class="col-lg-4 col-4 check-icon">\n            <i class="fa fa-check fa-2x"\n               *ngIf="toolChosen === \'LineString\' && tooltypeChosen === \'drawTools\'"></i>\n          </div>\n          <div class="col-lg-4 col-4">\n            <span class="logo-tool">\n              <i class="icon-fin-pict-drawline icon-2x"></i>\n            </span>\n          </div>\n          <div class="col-lg-4 col-4">\n            <l key="drawTools.LineString"></l>\n          </div>\n        </div>\n        <hr/>\n        <div class="row logo-row" (click)="chooseTool(\'drawTools\',\'Polygon\')">\n          <div class="col-lg-4 col-4 check-icon">\n            <i class="fa fa-check fa-2x" *ngIf="toolChosen === \'Polygon\' && tooltypeChosen === \'drawTools\'"></i>\n          </div>\n          <div class="col-lg-4 col-4">\n            <span class="logo-tool">\n              <i class="icon-fin-pict-drawpoly icon-2x"></i>\n            </span>\n          </div>\n          <div class="col-lg-4 col-4">\n            <l key="drawTools.Polygon"></l>\n          </div>\n        </div>\n        <hr/>\n        <div class="row logo-row" (click)="chooseTool(\'drawTools\',\'Circle\')">\n          <div class="col-lg-4 col-4 check-icon">\n            <i class="fa fa-check fa-2x" *ngIf="toolChosen === \'Circle\' && tooltypeChosen === \'drawTools\'"></i>\n          </div>\n          <div class="col-lg-4 col-4">\n            <span class="logo-tool">\n              <i class="icon-fin-pict-drawcircle icon-2x"></i>\n            </span>\n          </div>\n          <div class="col-lg-4 col-4">\n            <l key="drawTools.Circle"></l>\n          </div>\n        </div>\n        <hr/>\n        <div class="row logo-row" (click)="chooseTool(\'drawTools\',\'Point\')">\n          <div class="col-lg-4 col-4 check-icon">\n            <i class="fa fa-check fa-2x" *ngIf="toolChosen === \'Point\' && tooltypeChosen === \'drawTools\'"></i>\n          </div>\n          <div class="col-lg-4 col-4">\n            <span class="logo-tool">\n              <i class="icon-fin-pict-drawpoint icon-2x"></i>\n            </span>\n          </div>\n          <div class="col-lg-4 col-4">\n            <l key="drawTools.Point"></l>\n          </div>\n        </div>\n        <hr/>\n        <div>\n          <div class="row logo-row" (click)="chooseTool(\'drawTools\',\'Text\')">\n            <div class="col-lg-4 col-4 check-icon">\n              <i class="fa fa-check fa-2x" *ngIf="toolChosen === \'Text\' && tooltypeChosen === \'drawTools\'"></i>\n            </div>\n            <div class="col-lg-4 col-4">\n              <span class="logo-tool">\n                <i class="icon-fin-pict-drawtext fa-2x"></i>\n              </span>\n            </div>\n            <div class="col-lg-4 col-4">\n              <l key="drawtools.text"></l>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="advancedSearch" *ngIf="isAdvancedSearchInConfig()">\n      <hr/>\n      <div class="row" (click)="showMenu(\'advancedSearch\')">\n        <div class="col-lg-2 col-2">\n          <span class="top-logo-tool">\n          <i class="icon-fin-pict-search-adv icon-2x"></i>\n          </span>\n        </div>\n        <div class="col-lg-8 col-8">\n          <p>\n            <l key="advanced-search"></l>\n          </p>\n        </div>\n        <div class="col-lg-2 col-2">\n          <i *ngIf="menuShown === \'advancedSearch\'" class="fa fa-caret-up"></i>\n          <i *ngIf="menuShown !== \'advancedSearch\'" class="fa fa-caret-down"></i>\n        </div>\n      </div>\n      <div *ngIf="menuShown === \'advancedSearch\'">\n        <app-advanced-search [footerActive]=false [appState]="appState"></app-advanced-search>\n      </div>\n    </div>\n    <div class="structured" *ngIf="isStructuredSearchInConfig()">\n      <hr/>\n      <div class="row" (click)="showMenu(\'structuredSearch\')">\n        <div class="col-lg-2 col-2">\n          <span class="top-logo-tool">\n            <i class="icon-fin-pict-search icon-2x"></i>\n          </span>\n        </div>\n        <div class="col-lg-8 col-8">\n          <p>\n            <l key="structured-search"></l>\n          </p>\n        </div>\n        <div class="col-lg-2 col-2">\n          <i *ngIf="menuShown === \'structuredSearch\'" class="fa fa-caret-up"></i>\n          <i *ngIf="menuShown !== \'structuredSearch\'" class="fa fa-caret-down"></i>\n        </div>\n      </div>\n      <div *ngIf="menuShown === \'structuredSearch\'">\n        <app-structured-search [appState]="appState"></app-structured-search>\n      </div>\n    </div>\n    <div class="spatialAnalysis" *ngIf="isAnalyseSpatialInConfig()">\n      <hr/>\n      <div class="row" (click)="showMenu(\'spatialAnalysis\')" *ngIf="showSpatialAnalysis()">\n        <div class="col-lg-2 col-2">\n            <span class="top-logo-tool">\n              <i class="icon-fin-pict-spaciala icon-2x"></i>\n            </span>\n        </div>\n        <div class="col-lg-8 col-8">\n          <p>\n            <l key="spatialAnalysis"></l>\n          </p>\n        </div>\n        <div class="col-lg-2 col-2">\n          <i *ngIf="menuShown === \'spatialAnalysis\'" class="fa fa-caret-up"></i>\n          <i *ngIf="menuShown !== \'spatialAnalysis\'" class="fa fa-caret-down"></i>\n        </div>\n      </div>\n      <div *ngIf="menuShown === \'spatialAnalysis\'">\n        <spatial-analysis spatialAnalysisType="spatialAnalysis" [appState]="appState"></spatial-analysis>\n      </div>\n      <hr/>\n      <div class="row" (click)="showMenu(\'capakeySelection\')" *ngIf="showCapakeySelection()">\n        <div class="col-lg-2 col-2">\n            <span class="top-logo-tool">\n              <i class="icon-fin-pict-spaciala icon-2x"></i>\n            </span>\n        </div>\n        <div class="col-lg-8 col-8">\n          <p>\n            <l key="capakeySelection"></l>\n          </p>\n        </div>\n        <div class="col-lg-2 col-2">\n          <i *ngIf="menuShown === \'capakeySelection\'" class="fa fa-caret-up"></i>\n          <i *ngIf="menuShown !== \'capakeySelection\'" class="fa fa-caret-down"></i>\n        </div>\n      </div>\n      <div *ngIf="menuShown === \'capakeySelection\'">\n        <spatial-analysis spatialAnalysisType="capakeySelection" [appState]="appState"></spatial-analysis>\n      </div>\n    </div>\n    <div class="extractionTool" *ngIf="isExtractionToolInConfig() && permissions!=\'WEB\'">\n      <div class="row" (click)="showMenu(\'extractionTool\')">\n        <div class="col-lg-2 col-2">\n            <span class="top-logo-tool">\n              <i class="icon-fin-pict-email icon-2x"></i>\n            </span>\n        </div>\n        <div class="col-lg-8 col-8" *ngIf="!configService.precadBundle.active && !configService.cdmsBundle.active">\n          <p>\n            <l key="extractionTool"></l>\n          </p>\n        </div>\n        <div class="col-lg-2 col-2">\n          <i *ngIf="menuShown === \'extractionTool\'" class="fa fa-caret-up"></i>\n          <i *ngIf="menuShown !== \'extractionTool\'" class="fa fa-caret-down"></i>\n        </div>\n      </div>\n      <div *ngIf="menuShown === \'extractionTool\'">\n        <app-extraction-tool [appState]="appState"></app-extraction-tool>\n      </div>\n    </div>\n  </div>\n</div>\n'
    }
}, [0]);
