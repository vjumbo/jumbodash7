(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sample-sample-module"],{

/***/ "./src/app/main/apps/sample/i18n/en.ts":
/*!*********************************************!*\
  !*** ./src/app/main/apps/sample/i18n/en.ts ***!
  \*********************************************/
/*! exports provided: locale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locale", function() { return locale; });
var locale = {
    lang: 'en',
    data: {
        'SAMPLE': {
            'HELLO': 'Hello, World!'
        }
    }
};


/***/ }),

/***/ "./src/app/main/apps/sample/i18n/tr.ts":
/*!*********************************************!*\
  !*** ./src/app/main/apps/sample/i18n/tr.ts ***!
  \*********************************************/
/*! exports provided: locale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locale", function() { return locale; });
var locale = {
    lang: 'tr',
    data: {
        'SAMPLE': {
            'HELLO': 'Merhaba Dünya!'
        }
    }
};


/***/ }),

/***/ "./src/app/main/apps/sample/sample.component.html":
/*!********************************************************!*\
  !*** ./src/app/main/apps/sample/sample.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-layout blank p-24\" fusePerfectScrollbar>\n\n    <h2>{{'SAMPLE.HELLO' | translate}}</h2>\n\n</div>\n"

/***/ }),

/***/ "./src/app/main/apps/sample/sample.component.scss":
/*!********************************************************!*\
  !*** ./src/app/main/apps/sample/sample.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21haW4vYXBwcy9zYW1wbGUvc2FtcGxlLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/main/apps/sample/sample.component.ts":
/*!******************************************************!*\
  !*** ./src/app/main/apps/sample/sample.component.ts ***!
  \******************************************************/
/*! exports provided: SampleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SampleComponent", function() { return SampleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _fuse_services_translation_loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fuse/services/translation-loader.service */ "./src/@fuse/services/translation-loader.service.ts");
/* harmony import */ var _i18n_en__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./i18n/en */ "./src/app/main/apps/sample/i18n/en.ts");
/* harmony import */ var _i18n_tr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./i18n/tr */ "./src/app/main/apps/sample/i18n/tr.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SampleComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    function SampleComponent(_fuseTranslationLoaderService) {
        this._fuseTranslationLoaderService = _fuseTranslationLoaderService;
        this._fuseTranslationLoaderService.loadTranslations(_i18n_en__WEBPACK_IMPORTED_MODULE_2__["locale"], _i18n_tr__WEBPACK_IMPORTED_MODULE_3__["locale"]);
    }
    SampleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'sample',
            template: __webpack_require__(/*! ./sample.component.html */ "./src/app/main/apps/sample/sample.component.html"),
            styles: [__webpack_require__(/*! ./sample.component.scss */ "./src/app/main/apps/sample/sample.component.scss")]
        }),
        __metadata("design:paramtypes", [_fuse_services_translation_loader_service__WEBPACK_IMPORTED_MODULE_1__["FuseTranslationLoaderService"]])
    ], SampleComponent);
    return SampleComponent;
}());



/***/ }),

/***/ "./src/app/main/apps/sample/sample.module.ts":
/*!***************************************************!*\
  !*** ./src/app/main/apps/sample/sample.module.ts ***!
  \***************************************************/
/*! exports provided: SampleModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SampleModule", function() { return SampleModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _fuse_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fuse/shared.module */ "./src/@fuse/shared.module.ts");
/* harmony import */ var _sample_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sample.component */ "./src/app/main/apps/sample/sample.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _sample_component__WEBPACK_IMPORTED_MODULE_4__["SampleComponent"]
    }
];
var SampleModule = /** @class */ (function () {
    function SampleModule() {
    }
    SampleModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _sample_component__WEBPACK_IMPORTED_MODULE_4__["SampleComponent"]
            ],
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes),
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateModule"],
                _fuse_shared_module__WEBPACK_IMPORTED_MODULE_3__["FuseSharedModule"]
            ],
            exports: [
                _sample_component__WEBPACK_IMPORTED_MODULE_4__["SampleComponent"]
            ]
        })
    ], SampleModule);
    return SampleModule;
}());



/***/ })

}]);
//# sourceMappingURL=sample-sample-module.js.map