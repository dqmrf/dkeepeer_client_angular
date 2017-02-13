webpackJsonp([0,3],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_notifications__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_notifications__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var AuthService = (function () {
    function AuthService(http, router, location, _flash, config) {
        this.http = http;
        this.router = router;
        this.location = location;
        this._flash = _flash;
        this.isLoggedIn = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        this.baseUrl = config.serverUrl;
        this.tokenUrl = config.serverUrl + "/oauth/token?client_id=" + config.clientId + "&grant_type=password";
    }
    AuthService.prototype.login = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        return this.http.post(this.tokenUrl, body, { headers: this.headers })
            .subscribe(function (res) {
            if (res.status == 200) {
                _this.setAccessToken(res.json().access_token);
                _this.setLogIn(true);
                _this.router.navigate(['/admin']);
                _this._flash.success('', 'Signed in successfully!');
            }
        }, function (error) {
            _this.handleError(error.text(), 'Login failed!');
        });
    };
    AuthService.prototype.logout = function () {
        this.removeAccessToken();
        this.setLogIn(false);
        this.router.navigate(['/login']);
        this._flash.success('', 'Signed out successfully!');
    };
    AuthService.prototype.registration = function (user) {
        var _this = this;
        var url = this.baseUrl + "/api/users";
        var body = JSON.stringify({ user: user });
        this.http.post(url, body, { headers: this.headers })
            .subscribe(function (res) {
            if (res.status == 200) {
                _this.router.navigate(['/login']);
                _this._flash.success('Registration successfully!', 'Please check your mailbox and confirm your email address');
            }
        }, function (error) {
            _this.handleError(error.text(), 'Registration failed!');
        });
    };
    AuthService.prototype.checkConfirmationToken = function (confirmation_token) {
        var _this = this;
        var url = this.baseUrl + "/api/users/" + confirmation_token + "/confirm_email";
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (error) {
            _this.router.navigate(['/login']);
            _this.handleError(error, 'Could not confirm email address!');
        });
    };
    AuthService.prototype.setAccessToken = function (token) {
        localStorage.setItem('token', token);
    };
    AuthService.prototype.setLogIn = function (value) {
        this._isLoggedIn = value;
        this.isLoggedIn.next(this._isLoggedIn);
    };
    AuthService.prototype.removeAccessToken = function () {
        localStorage.removeItem('token');
    };
    AuthService.prototype.handleError = function (error, flash) {
        if (flash === void 0) { flash = null; }
        console.error(error);
        flash ? this._flash.error('', flash) : null;
        return Promise.reject(error.message || error);
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Injectable */])(),
        __param(4, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__app_config__["a" /* APP_CONFIG */])), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* Location */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6_angular2_notifications__["NotificationsService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6_angular2_notifications__["NotificationsService"]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__app_config__["c" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__app_config__["c" /* AppConfig */]) === 'function' && _e) || Object])
    ], AuthService);
    return AuthService;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/auth.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__(349);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AppConfig; });
/* harmony export (immutable) */ __webpack_exports__["b"] = appConfig;


var APP_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* OpaqueToken */]('app.config');
var AppConfig = (function () {
    function AppConfig() {
    }
    return AppConfig;
}());
var CONFIG_PRODUCTION = {
    serverUrl: "https://dkeeper-api-server.herokuapp.com",
    apiEndpoint: "https://dkeeper-api-server.herokuapp.com/api",
    clientId: "b6633ae982516d3f54a80749bc5c6b3749e3cededed1cf8b52bbd7386bec8b86"
};
var CONFIG_DEVELOPMENT = {
    serverUrl: "http://localhost:3000",
    apiEndpoint: "http://localhost:3000/api",
    clientId: "051476c1165ee4094f9102db43c5a70381f1dc6cce8012aa855dbc935d126541"
};
function appConfig() {
    return __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].production ? CONFIG_PRODUCTION : CONFIG_DEVELOPMENT;
}
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/app.config.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AdminComponent = (function () {
    function AdminComponent() {
    }
    AdminComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            template: __webpack_require__(698)
        }), 
        __metadata('design:paramtypes', [])
    ], AdminComponent);
    return AdminComponent;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/admin.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmEmailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ConfirmEmailComponent = (function () {
    function ConfirmEmailComponent(router, route, location, _authService) {
        this.router = router;
        this.route = route;
        this.location = location;
        this._authService = _authService;
        this.loading = true;
        this.checkConfirmationToken();
    }
    ConfirmEmailComponent.prototype.checkConfirmationToken = function () {
        var _this = this;
        this.route.queryParams
            .subscribe(function (params) {
            var token = params['confirmation_token'];
            if (params && token) {
                _this._authService.checkConfirmationToken(token)
                    .then(function (res) {
                    _this.loading = false;
                });
            }
            else {
                _this.router.navigate(['/login']);
            }
        });
    };
    ConfirmEmailComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            template: __webpack_require__(700)
        }),
        __param(3, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Inject */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_3__services_auth__["a" /* AuthService */]; }))), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* Location */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_auth__["a" /* AuthService */]) === 'function' && _d) || Object])
    ], ConfirmEmailComponent);
    return ConfirmEmailComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/confirm-email.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var LoginComponent = (function () {
    function LoginComponent(_authService, fb) {
        this._authService = _authService;
        this.loginForm = fb.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")
                ])],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].minLength(6)])]
        });
    }
    LoginComponent.prototype.login = function () {
        this._authService.login(this.loginForm.value);
    };
    LoginComponent.prototype.isValid = function (field, rule) {
        var field_ = this.loginForm.controls[field];
        return (field_.hasError(rule) && field_.touched) ? false : true;
    };
    LoginComponent.prototype.isValidCompletely = function (field) {
        var field_ = this.loginForm.controls[field];
        return (!field_.valid && field_.touched) ? false : true;
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            template: __webpack_require__(703)
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Inject */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_2__services_auth__["a" /* AuthService */]; }))),
        __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */])), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === 'function' && _b) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/login.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var RegistrationComponent = (function () {
    function RegistrationComponent(_authService, fb) {
        this._authService = _authService;
        this.registerForm = fb.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")
                ])],
            first_name: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required],
            last_name: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].minLength(6)])],
            password_confirmation: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].minLength(6)])]
        }, { validator: this.matchingPasswords('password', 'password_confirmation') });
    }
    RegistrationComponent.prototype.registration = function () {
        this._authService.registration(this.registerForm.value);
    };
    RegistrationComponent.prototype.matchingPasswords = function (passwordKey, passwordConfirmationKey) {
        return function (group) {
            var passwordInput = group.controls[passwordKey];
            var passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true });
            }
        };
    };
    RegistrationComponent.prototype.isValid = function (field, rule) {
        var field_ = this.registerForm.controls[field];
        return (field_.hasError(rule) && field_.touched) ? false : true;
    };
    RegistrationComponent.prototype.isValidCompletely = function (field) {
        var field_ = this.registerForm.controls[field];
        return (!field_.valid && field_.touched) ? false : true;
    };
    RegistrationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            template: __webpack_require__(705)
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Inject */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_2__services_auth__["a" /* AuthService */]; }))),
        __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */])), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === 'function' && _b) || Object])
    ], RegistrationComponent);
    return RegistrationComponent;
    var _a, _b;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/registration.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TasksComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TasksComponent = (function () {
    function TasksComponent() {
    }
    TasksComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            template: __webpack_require__(706)
        }), 
        __metadata('design:paramtypes', [])
    ], TasksComponent);
    return TasksComponent;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/tasks.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_task__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TasksDetailInlineComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TasksDetailInlineComponent = (function () {
    function TasksDetailInlineComponent(route, location, _taskService) {
        this.route = route;
        this.location = location;
        this._taskService = _taskService;
    }
    TasksDetailInlineComponent.prototype.getTask = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this._taskService.getTask(+params['id']); })
            .subscribe(function (task) {
            _this.task = task;
        });
    };
    TasksDetailInlineComponent.prototype.onUpdate = function (res) {
        this.task[res.field] = res.value;
        this.save();
    };
    TasksDetailInlineComponent.prototype.save = function () {
        this._taskService.update(this.task);
    };
    TasksDetailInlineComponent.prototype.goBack = function () {
        this.location.back();
    };
    TasksDetailInlineComponent.prototype.ngOnInit = function () {
        this.getTask();
    };
    TasksDetailInlineComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            template: __webpack_require__(707)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* Location */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_task__["a" /* TaskService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_task__["a" /* TaskService */]) === 'function' && _c) || Object])
    ], TasksDetailInlineComponent);
    return TasksDetailInlineComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/detail-inline.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_task__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TasksDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TasksDetailComponent = (function () {
    function TasksDetailComponent(router, route, location, _taskService) {
        this.router = router;
        this.route = route;
        this.location = location;
        this._taskService = _taskService;
    }
    TasksDetailComponent.prototype.getTask = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this._taskService.getTask(+params['id']); })
            .subscribe(function (task) {
            _this.task = task;
        });
    };
    TasksDetailComponent.prototype.delete = function (task) {
        var _this = this;
        if (confirm('Are you sure?')) {
            this._taskService.delete(task.id)
                .then(function () {
                _this.router.navigate(['/']);
            });
        }
        ;
    };
    TasksDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    TasksDetailComponent.prototype.ngOnInit = function () {
        this.getTask();
    };
    TasksDetailComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            template: __webpack_require__(708)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* Location */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_task__["a" /* TaskService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_task__["a" /* TaskService */]) === 'function' && _d) || Object])
    ], TasksDetailComponent);
    return TasksDetailComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/detail.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_notifications__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_notifications__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_task__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskEditComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var TaskEditComponent = (function () {
    function TaskEditComponent(_tasksService, fb, route, location, _flash) {
        this._tasksService = _tasksService;
        this.route = route;
        this.location = location;
        this._flash = _flash;
        this._date = new Date();
        this.datePickerOptions = {
            inline: true,
            width: "100%",
            dateFormat: 'dd-mm-yyyy',
            disableUntil: {
                year: this._date.getFullYear(),
                month: this._date.getMonth() + 1,
                day: this._date.getDate() - 1
            }
        };
        this.editTaskForm = fb.group({
            title: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required],
            description: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required],
            priority: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(6),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].pattern("^[0-9]+$")])
            ],
            due_date: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required]
        });
    }
    TaskEditComponent.prototype.getTask = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this._tasksService.getTask(+params['id']); })
            .subscribe(function (task) {
            _this.taskId = task.id;
            var date = new Date();
            date.setTime(Date.parse(task.due_date));
            _this.editTaskForm.setValue({
                title: task.title,
                description: task.description,
                priority: task.priority,
                due_date: {
                    date: {
                        day: date.getDate(),
                        month: date.getMonth() + 1,
                        year: date.getFullYear()
                    },
                    formatted: date.toDateString(),
                    jsdate: date,
                    epoc: +date.valueOf() / 1000
                },
            });
        });
    };
    TaskEditComponent.prototype.update = function () {
        var _this = this;
        this._tasksService
            .updateById(this.taskId, this.editTaskForm.value)
            .then(function () {
            _this._flash.success('', 'Task successfully updated!');
            _this.goBack();
        });
    };
    TaskEditComponent.prototype.goBack = function () {
        this.location.back();
    };
    TaskEditComponent.prototype.ngOnInit = function () {
        this.getTask();
    };
    TaskEditComponent.prototype.onDateChanged = function (event) { };
    TaskEditComponent.prototype.isValid = function (field, rule) {
        var field_ = this.editTaskForm.controls[field];
        return (field_.hasError(rule) && field_.touched) ? false : true;
    };
    TaskEditComponent.prototype.isValidCompletely = function (field) {
        var field_ = this.editTaskForm.controls[field];
        return (!field_.valid && field_.touched) ? false : true;
    };
    TaskEditComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            template: __webpack_require__(709)
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Inject */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_5__services_task__["a" /* TaskService */]; }))),
        __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */])), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__services_task__["a" /* TaskService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__services_task__["a" /* TaskService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* Location */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_notifications__["NotificationsService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_angular2_notifications__["NotificationsService"]) === 'function' && _e) || Object])
    ], TaskEditComponent);
    return TaskEditComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/edit.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: true
};
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/environment.js.map

/***/ }),

/***/ 403:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 403;


/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(525);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/main.js.map

/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routes__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_task__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_app__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_login__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_navbar__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_inline_edit__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_registration__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_confirm_email__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_admin__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_tasks__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_tasks_list__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_tasks_form__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_tasks_detail__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_tasks_detail_inline__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_tasks_edit__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_angular2_notifications__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_angular2_notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_angular2_notifications__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_mydatepicker__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_mydatepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22_mydatepicker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__rxjs_extensions__ = __webpack_require__(537);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__components_app__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_login__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_registration__["a" /* RegistrationComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_confirm_email__["a" /* ConfirmEmailComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_navbar__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_admin__["a" /* AdminComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_tasks__["a" /* TasksComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_tasks_list__["a" /* TaskListComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_tasks_form__["a" /* TaskFormComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_tasks_detail__["a" /* TasksDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_tasks_detail_inline__["a" /* TasksDetailInlineComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_inline_edit__["a" /* InlineEditComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_tasks_edit__["a" /* TaskEditComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5__app_routes__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_21_angular2_notifications__["SimpleNotificationsModule"],
                __WEBPACK_IMPORTED_MODULE_22_mydatepicker__["MyDatePickerModule"] /*,
                NgbModule.forRoot()*/
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__services_auth__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_7__services_task__["a" /* TaskService */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormBuilder */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */],
                { provide: __WEBPACK_IMPORTED_MODULE_4__app_config__["a" /* APP_CONFIG */], useFactory: __WEBPACK_IMPORTED_MODULE_4__app_config__["b" /* appConfig */] }
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8__components_app__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/app.module.js.map

/***/ }),

/***/ 526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_login__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_registration__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_confirm_email__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_admin__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_tasks__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_tasks_detail__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_tasks_detail_inline__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_tasks_edit__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_errors_404__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__guards_signed_in__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__guards_signed_out__ = __webpack_require__(534);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var routes = [
    {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
    },
    {
        path: 'login',
        canActivate: [__WEBPACK_IMPORTED_MODULE_11__guards_signed_in__["a" /* SignedInGuard */]],
        component: __WEBPACK_IMPORTED_MODULE_2__components_login__["a" /* LoginComponent */]
    },
    {
        path: 'registration',
        canActivate: [__WEBPACK_IMPORTED_MODULE_11__guards_signed_in__["a" /* SignedInGuard */]],
        component: __WEBPACK_IMPORTED_MODULE_3__components_registration__["a" /* RegistrationComponent */]
    },
    {
        path: 'confirm_email',
        canActivate: [__WEBPACK_IMPORTED_MODULE_11__guards_signed_in__["a" /* SignedInGuard */]],
        component: __WEBPACK_IMPORTED_MODULE_4__components_confirm_email__["a" /* ConfirmEmailComponent */]
    },
    {
        path: 'admin',
        component: __WEBPACK_IMPORTED_MODULE_5__components_admin__["a" /* AdminComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_signed_out__["a" /* SignedOutGuard */]],
        children: [
            {
                path: '',
                canActivateChild: [__WEBPACK_IMPORTED_MODULE_12__guards_signed_out__["a" /* SignedOutGuard */]],
                children: [
                    {
                        path: 'tasks',
                        component: __WEBPACK_IMPORTED_MODULE_6__components_tasks__["a" /* TasksComponent */]
                    },
                    {
                        path: 'tasks/:id',
                        component: __WEBPACK_IMPORTED_MODULE_7__components_tasks_detail__["a" /* TasksDetailComponent */]
                    },
                    {
                        path: 'tasks/:id/edit',
                        component: __WEBPACK_IMPORTED_MODULE_9__components_tasks_edit__["a" /* TaskEditComponent */]
                    },
                    {
                        path: 'tasks/:id/inline',
                        component: __WEBPACK_IMPORTED_MODULE_8__components_tasks_detail_inline__["a" /* TasksDetailInlineComponent */]
                    },
                    {
                        path: '',
                        component: __WEBPACK_IMPORTED_MODULE_6__components_tasks__["a" /* TasksComponent */]
                    },
                ],
            }
        ]
    },
    {
        path: '**',
        component: __WEBPACK_IMPORTED_MODULE_10__components_errors_404__["a" /* PageNotFoundComponent */]
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]],
            providers: [__WEBPACK_IMPORTED_MODULE_11__guards_signed_in__["a" /* SignedInGuard */], __WEBPACK_IMPORTED_MODULE_12__guards_signed_out__["a" /* SignedOutGuard */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_10__components_errors_404__["a" /* PageNotFoundComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/app.routes.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.notificationsOptions = {
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true,
            maxLength: 0,
            maxStack: 6,
            showProgressBar: true,
            pauseOnHover: true,
            preventDuplicates: false,
            preventLastDuplicates: 'visible',
            rtl: false,
            animate: 'fromRight',
            position: ['right', 'bottom']
        };
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(699)
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/app.js.map

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            template: __webpack_require__(701)
        }), 
        __metadata('design:paramtypes', [])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/404.js.map

/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(56);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InlineEditComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* NG_VALUE_ACCESSOR */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* forwardRef */])(function () { return InlineEditComponent; }),
    multi: true
};
var InlineEditComponent = (function () {
    function InlineEditComponent(element, _renderer) {
        this._renderer = _renderer;
        this.field = '';
        this.disabled = false;
        this.update = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this._value = '';
        this.preValue = '';
        this.editing = false;
        this._changed = false;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    Object.defineProperty(InlineEditComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this._changed = true;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    InlineEditComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    InlineEditComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    InlineEditComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    InlineEditComponent.prototype.onBlur = function (value) {
        this.editing = false;
        if (this._changed) {
            this.update.emit(value);
            this._changed = false;
        }
    };
    InlineEditComponent.prototype.edit = function (value) {
        var _this = this;
        if (this.disabled)
            return;
        this.preValue = value;
        this.editing = true;
        setTimeout(function (_) {
            _this._renderer.invokeElementMethod(_this.inlineEditControl.nativeElement, 'focus', []);
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])('inlineEditControl'), 
        __metadata('design:type', Object)
    ], InlineEditComponent.prototype, "inlineEditControl", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(), 
        __metadata('design:type', String)
    ], InlineEditComponent.prototype, "field", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(), 
        __metadata('design:type', Boolean)
    ], InlineEditComponent.prototype, "disabled", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Output */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === 'function' && _a) || Object)
    ], InlineEditComponent.prototype, "update", void 0);
    InlineEditComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'inline-edit',
            template: __webpack_require__(702),
            providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
            styles: [__webpack_require__(697)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* ElementRef */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Renderer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Renderer */]) === 'function' && _c) || Object])
    ], InlineEditComponent);
    return InlineEditComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/inline-edit.js.map

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NavbarComponent = (function () {
    function NavbarComponent(_authService) {
        var _this = this;
        this._authService = _authService;
        this.isLoggedIn = localStorage.getItem('token') ? true : false;
        this._isLoggedInSubscription = _authService.isLoggedIn.subscribe(function (value) {
            if (value == undefined)
                return;
            _this.isLoggedIn = value;
        });
    }
    NavbarComponent.prototype.logout = function () {
        this._authService.logout();
    };
    NavbarComponent.prototype.ngOnDestroy = function () {
        this._isLoggedInSubscription.unsubscribe();
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'navbar',
            template: __webpack_require__(704)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth__["a" /* AuthService */]) === 'function' && _a) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/navbar.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_task__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var TaskFormComponent = (function () {
    function TaskFormComponent(fb, _taskService) {
        var _this = this;
        this._taskService = _taskService;
        this.tasks = [];
        this._date = new Date();
        this.datePickerOptions = {
            inline: true,
            width: "100%",
            dateFormat: 'dd-mm-yyyy',
            disableUntil: {
                year: this._date.getFullYear(),
                month: this._date.getMonth() + 1,
                day: this._date.getDate() - 1
            }
        };
        this.createTaskForm = fb.group({
            title: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required],
            description: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required],
            priority: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(6),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].pattern("^[0-9]+$")])
            ],
            due_date: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required]
        });
        this._tasksSubscription = _taskService.tasks.subscribe(function (value) {
            if (value == undefined)
                return;
            _this.tasks = value;
        });
    }
    TaskFormComponent.prototype.createTask = function () {
        var _this = this;
        this._taskService.create(this.createTaskForm.value)
            .then(function (data) {
            _this.tasks.unshift(data);
            _this._taskService.tasks.next(_this.tasks);
            _this.resetForm();
        });
    };
    TaskFormComponent.prototype.resetForm = function () {
        this.createTaskForm.reset();
        this.clearDate();
    };
    TaskFormComponent.prototype.clearDate = function () {
        this.createTaskForm.patchValue({ due_date: '' });
    };
    TaskFormComponent.prototype.isValid = function (field, rule) {
        var field_ = this.createTaskForm.controls[field];
        return (field_.hasError(rule) && field_.touched) ? false : true;
    };
    TaskFormComponent.prototype.isValidCompletely = function (field) {
        var field_ = this.createTaskForm.controls[field];
        return (!field_.valid && field_.touched) ? false : true;
    };
    TaskFormComponent.prototype.ngOnDestroy = function () {
        this._tasksSubscription.unsubscribe();
    };
    TaskFormComponent.prototype.onDateChanged = function (event) { };
    TaskFormComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'tasks-form',
            template: __webpack_require__(710)
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */])),
        __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Inject */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_2__services_task__["a" /* TaskService */]; }))), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_task__["a" /* TaskService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_task__["a" /* TaskService */]) === 'function' && _b) || Object])
    ], TaskFormComponent);
    return TaskFormComponent;
    var _a, _b;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/form.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_task__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipes_filter_by_field__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_sort_by_field__ = __webpack_require__(536);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TaskListComponent = (function () {
    function TaskListComponent(_taskService, filterByField, sortByField) {
        var _this = this;
        this._taskService = _taskService;
        this.filterByField = filterByField;
        this.sortByField = sortByField;
        this.tasks = [];
        this.selectedTasks = [];
        this.sorted = false;
        this._taskService.loadTasks()
            .then(function (tasks) {
            _this.refreshTasks(tasks);
        });
        this._tasksSubscription = _taskService.tasks.subscribe(function (value) {
            if (value == undefined)
                return;
            _this.tasks = value;
            _this.refreshPipes(value);
        });
    }
    TaskListComponent.prototype.update = function (task) {
        var _this = this;
        this._taskService.update(task)
            .then(function () { return _this.refreshTasks(_this.tasks); });
    };
    TaskListComponent.prototype.batchDestroy = function (ids) {
        var _this = this;
        if (confirm('Are you sure?')) {
            this._taskService.batchDestroy(ids)
                .then(function (ids) {
                if (!ids)
                    return false;
                for (var i = 0; i < _this.tasks.length; i++) {
                    if (_this.tasks[i]['marked'] === true) {
                        _this.tasks.splice(i, 1);
                        i--;
                    }
                }
                _this.refreshTasks(_this.tasks);
                _this.selectedTasks = [];
            });
        }
    };
    TaskListComponent.prototype.delete = function (task) {
        var _this = this;
        var self = this;
        if (confirm('Are you sure?')) {
            this._taskService.delete(task.id)
                .then(function (data) {
                _this.tasks.forEach(function (t, index) {
                    if (t.id === task.id) {
                        _this.tasks.splice(index, 1);
                        checkIfMarked();
                    }
                });
                _this.refreshTasks(_this.tasks);
            });
        }
        ;
        function checkIfMarked() {
            if (task.marked === true) {
                self.selectedTasks.forEach(function (selectedTask, j) {
                    if (selectedTask == task.id) {
                        self.selectedTasks.splice(j, 1);
                    }
                });
            }
        }
    };
    TaskListComponent.prototype.updateCheckedOptions = function (task, $event) {
        var tasks = this.selectedTasks;
        if ($event.target.checked) {
            tasks.push(task.id);
            task.marked = true;
        }
        else {
            tasks.forEach(function (t, index) {
                if (t === task.id) {
                    tasks.splice(index, 1);
                    task.marked = false;
                    return;
                }
            });
        }
    };
    TaskListComponent.prototype.checkAll = function () {
        var _this = this;
        this.selectedTasks = [];
        this.tasks.forEach(function (task, i) {
            _this.selectedTasks.push(task.id);
            task.marked = true;
        });
    };
    TaskListComponent.prototype.uncheckAll = function () {
        this.selectedTasks = [];
        this.tasks.forEach(function (task, i) {
            if (task.marked === true) {
                task.marked = false;
            }
        });
    };
    TaskListComponent.prototype.isExists = function (obj) {
        if (obj && obj !== undefined && obj.length) {
            return true;
        }
        return false;
    };
    TaskListComponent.prototype.refreshTasks = function (tasks) {
        this._taskService.tasks.next(tasks);
        this.refreshPipes(tasks);
    };
    TaskListComponent.prototype.sortBy = function (field) {
        var desc = this.sorted === true ? true : false;
        this.tasks = this.sortByField.transform(this.tasks, field, desc);
        this.refreshTasks(this.tasks);
    };
    TaskListComponent.prototype.refreshPipes = function (tasks) {
        this.activeTasks = this.filterByField.transform(tasks, 'completed', false);
        this.completedTasks = this.filterByField.transform(tasks, 'completed', true);
    };
    TaskListComponent.prototype.ngOnDestroy = function () {
        this._tasksSubscription.unsubscribe();
    };
    TaskListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'tasks-list',
            providers: [__WEBPACK_IMPORTED_MODULE_2__pipes_filter_by_field__["a" /* FilterByFieldPipe */], __WEBPACK_IMPORTED_MODULE_3__pipes_sort_by_field__["a" /* SortByFieldPipe */]],
            template: __webpack_require__(711)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_task__["a" /* TaskService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_task__["a" /* TaskService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__pipes_filter_by_field__["a" /* FilterByFieldPipe */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__pipes_filter_by_field__["a" /* FilterByFieldPipe */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__pipes_sort_by_field__["a" /* SortByFieldPipe */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__pipes_sort_by_field__["a" /* SortByFieldPipe */]) === 'function' && _c) || Object])
    ], TaskListComponent);
    return TaskListComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/list.js.map

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(59);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignedInGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SignedInGuard = (function () {
    function SignedInGuard(router) {
        this.router = router;
    }
    SignedInGuard.prototype.canActivate = function () {
        if (!localStorage.getItem('token')) {
            return true;
        }
        this.router.navigate(['/admin']);
        return false;
    };
    SignedInGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], SignedInGuard);
    return SignedInGuard;
    var _a;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/signed-in.js.map

/***/ }),

/***/ 534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(59);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignedOutGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SignedOutGuard = (function () {
    function SignedOutGuard(router) {
        this.router = router;
    }
    SignedOutGuard.prototype.canActivate = function (route, state) {
        var url = state.url;
        return this.checkLogin(url);
    };
    SignedOutGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    SignedOutGuard.prototype.checkLogin = function (url) {
        if (localStorage.getItem('token')) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    SignedOutGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], SignedOutGuard);
    return SignedOutGuard;
    var _a;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/signed-out.js.map

/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterByFieldPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FilterByFieldPipe = (function () {
    function FilterByFieldPipe() {
    }
    FilterByFieldPipe.prototype.transform = function (items, key, value) {
        if (items) {
            return items.filter(function (item) { return item[key] === value; });
        }
    };
    FilterByFieldPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Pipe */])({
            name: 'filterByField',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], FilterByFieldPipe);
    return FilterByFieldPipe;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/filter-by-field.js.map

/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SortByFieldPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SortByFieldPipe = (function () {
    function SortByFieldPipe() {
    }
    SortByFieldPipe.prototype.transform = function (items, field, desc) {
        if (desc === void 0) { desc = false; }
        if (items) {
            return items.sort(function (a, b) {
                var A = getFormatted(a);
                var B = getFormatted(b);
                return !desc ? _sort(A, B) : _sort(B, A);
            });
        }
        function getFormatted(s) {
            return typeof s == 'string' ? s[field].toUpperCase() : s[field];
        }
        function _sort(A, B) {
            return (A < B) ? -1 : (A > B) ? 1 : 0;
        }
    };
    SortByFieldPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Pipe */])({
            name: 'sortByField',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], SortByFieldPipe);
    return SortByFieldPipe;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/sort-by-field.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap__);









//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/rxjs-extensions.js.map

/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/polyfills.js.map

/***/ }),

/***/ 697:
/***/ (function(module, exports) {

module.exports = ".bold {\n  font-weight: 700;\n}\n.block {\n  display: inline-block;\n}\ndiv.inline-edit {\n  text-decoration: none;\n  border-bottom: #A8B9CE dashed 1px;\n  cursor: pointer;\n  text-align: left;\n  padding: .5em 0;\n  color: #444 !important;\n  width: auto;\n}\ninput {\n  border: 1px solid #ccc;\n  border-radius: 2px;\n  padding: 4px 10px;\n}\n"

/***/ }),

/***/ 698:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ 699:
/***/ (function(module, exports) {

module.exports = "<navbar></navbar>\n<div class=\"container\">\n  <simple-notifications [options]=\"notificationsOptions\"></simple-notifications>\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ 700:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"loading\">\n  <h3>Please wait...</h3>\n</div>\n<div *ngIf=\"!loading\">\n  <h2>Congratulations!</h2>\n  <h4>Your Email address was successfully confirmed.</h4>\n  <div class=\"actions\">\n    <a routerLink='/login'>Login</a>\n  </div>\n</div>\n"

/***/ }),

/***/ 701:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-6 col-md-offset-3\">\n    <div class=\"err-content err-404\">\n      <h1 class=\"text-center\">Error 404</h1>\n      <h4 class=\"text-center\">This is not the web page you are looking for.</h4>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 702:
/***/ (function(module, exports) {

module.exports = "<div>\n  <label class=\"block bold\">{{label}}</label>\n  <div *ngIf=\"editing\">\n    <input #inlineEditControl [required]=\"required\"\n      (blur)=\"onBlur({$event: $event, field: field, value: value})\"\n      [name]=\"value\" [(ngModel)]=\"value\" [type]=\"type\" [placeholder]=\"label\"\n      class=\"form-control\" />\n  </div>\n  <div *ngIf=\"!editing\">\n    <div title=\"Click to edit\" (click)=\"edit(value);\" \n      tabindex=\"0\" class=\"inline-edit\">{{value}}&nbsp;</div>\n  </div>\n</div>\n"

/***/ }),

/***/ 703:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <form [formGroup]=\"loginForm\" (ngSubmit)=\"login()\" class=\"form-signin col-md-offset-3 col-md-6\">\n    <!-- Title -->\n    <h3 class=\"form-signin-heading\">Please Login</h3>\n    <!-- Email -->\n    <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('email')}\">\n      <label for=\"inputEmail\" class=\"control-label\">Email address</label>\n      <input formControlName=\"email\" type=\"email\" \n        class=\"form-control\" id=\"inputEmail\" placeholder=\"Email\">\n        <div *ngIf=\"!isValid('email', 'required')\" class=\"help-block\">* Email is required!</div>\n        <div *ngIf=\"!isValid('email', 'pattern')\" class=\"help-block\">* Email is not correct!</div>\n    </div>\n    <!-- Password -->\n    <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('password')}\">\n      <label for=\"inputPassword\" class=\"control-label\">Password</label>\n      <input formControlName=\"password\" type=\"password\"\n        class=\"form-control\" id=\"inputPassword\" placeholder=\"Password\">\n      <div *ngIf=\"!isValid('password', 'required')\" class=\"help-block\">* Password is required!</div>\n      <div *ngIf=\"!isValid('password', 'minlength')\" class=\"help-block\">* Minimum password length is 6!</div>\n    </div>\n    <!-- Actions -->\n    <button [disabled]=\"!loginForm.valid\" type=\"submit\" class=\"btn btn-default\">Login</button>\n    <a class=\"btn btn-info\" routerLink=\"/registration\">Sign up</a>\n  </form>\n</div>\n"

/***/ }),

/***/ 704:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <ul *ngIf=\"isLoggedIn\" class=\"nav navbar-nav\">\n      <!-- Logged in -->\n      <li class=\"nav-item\">\n        <a routerLink=\"/\" class=\"nav-link\">Home</a>\n      </li>\n      <li>\n        <a routerLink=\"/admin/tasks\" class=\"nav-link\">Tasks</a>\n      </li>\n      <li>\n        <a (click)=\"logout();\" href=\"javascript:void(false);\" class=\"nav-link\">Sign out</a>\n      </li>\n    </ul>\n    <ul *ngIf=\"!isLoggedIn\" class=\"nav navbar-nav\">\n      <!-- Logged out -->\n      <li class=\"nav-item\">\n        <a routerLink=\"/\" class=\"nav-link\">Home</a>\n      </li>\n      <li>\n        <a routerLink=\"/login\" class=\"nav-link\">Sign in</a>\n      </li>\n      <li>\n        <a routerLink=\"/registration\" class=\"nav-link\">Sign up</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n"

/***/ }),

/***/ 705:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <form [formGroup]=\"registerForm\" (ngSubmit)=\"registration()\" class=\"form-signin col-md-offset-3 col-md-6\">\n    <!-- Title -->\n    <h3 class=\"form-signin-heading\">Please Sign up</h3>\n    <!-- Email -->\n    <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('email')}\">\n      <label for=\"inputEmail\" class=\"control-label\">Email address</label>\n      <input formControlName=\"email\" type=\"email\" \n        class=\"form-control\" id=\"inputEmail\" placeholder=\"Email\">\n        <div *ngIf=\"!isValid('email', 'required')\" class=\"help-block\">* Email is required!</div>\n        <div *ngIf=\"!isValid('email', 'pattern')\" class=\"help-block\">* Email is not correct!</div>\n    </div>\n    <!-- First Name -->\n    <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('first_name')}\">\n      <label for=\"inputEmail\" class=\"control-label\">First Name</label>\n      <input formControlName=\"first_name\" type=\"text\" \n        class=\"form-control\" id=\"inputFirstName\" placeholder=\"First Name\">\n        <div *ngIf=\"!isValid('first_name', 'required')\" class=\"help-block\">* First Name is required!</div>\n    </div>\n    <!-- Last Name -->\n    <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('last_name')}\">\n      <label for=\"inputEmail\" class=\"control-label\">Last Name</label>\n      <input formControlName=\"last_name\" type=\"text\" \n        class=\"form-control\" id=\"inputLastName\" placeholder=\"Last Name\">\n        <div *ngIf=\"!isValid('last_name', 'required')\" class=\"help-block\">* Last Name is required!</div>\n    </div>\n    <!-- Password -->\n    <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('password')}\">\n      <label for=\"inputPassword\" class=\"control-label\">Password</label>\n      <input formControlName=\"password\" type=\"password\"\n        class=\"form-control\" id=\"inputPassword\" placeholder=\"Password\">\n      <div *ngIf=\"!isValid('password', 'required')\" class=\"help-block\">* Password is required!</div>\n      <div *ngIf=\"!isValid('password', 'minlength')\" class=\"help-block\">* Minimum password length is 6!</div>\n    </div>\n    <!-- Password confirmation -->\n    <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('password_confirmation')}\">\n      <label for=\"inputPasswordConfirmation\" class=\"control-label\">Password confirmation</label>\n      <input formControlName=\"password_confirmation\" type=\"password\"\n        id=\"inputPasswordConfirmation\" class=\"form-control\" placeholder=\"Password Confirmation\">\n      <div *ngIf=\"!isValid('password_confirmation', 'required')\" class=\"help-block\">* Confirm Password is required!</div>\n      <div *ngIf=\"!isValid('password_confirmation', 'notEquivalent')\" class=\"help-block\">* Passwords don't match!</div>\n    </div>\n    <!-- Actions -->\n    <button [disabled]=\"!registerForm.valid\" class=\"btn btn-primary\" type=\"submit\">Sign up</button>\n    <a class=\"btn btn-info\" routerLink='/login'>Login</a>\n  </form>\n</div>\n"

/***/ }),

/***/ 706:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-8\">\n    <tasks-list></tasks-list>\n  </div>\n  <div class=\"col-md-4\">\n    <tasks-form></tasks-form>\n  </div>\n</div>\n"

/***/ }),

/***/ 707:
/***/ (function(module, exports) {

module.exports = "<!-- Just Demo -->\n<div *ngIf=\"task\">\n  <inline-edit [(ngModel)]=\"task.title\" field=\"title\" label=\"Title\"\n    (update)=\"onUpdate($event);\" [required]=\"true\" type=\"text\"></inline-edit>\n</div>\n"

/***/ }),

/***/ 708:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"task\" class=\"single-task\">\n  <div class=\"task-heading\">\n    <h3>{{ task.title }}</h3>\n    <span *ngIf=\"task.completed\" class=\"label label-success\">\n      Completed\n    </span>\n    <span *ngIf=\"!task.completed\" class=\"label label-danger\">\n      Active\n    </span>\n  </div>\n  <div class=\"task-attributes\">\n    <p>\n      <b>Priority:</b>\n      {{ task.priority }}\n    </p>\n    <p>\n      <b>Due date:</b>\n      {{ task.due_date }}\n    </p>\n  </div>\n  <div class=\"task-description\">\n    <p>\n      <b>Description:</b>\n    </p>\n    <p>\n      {{ task.description }}\n    </p>\n  </div>\n  <div class=\"links\">\n    <a [routerLink]=\"['/admin/tasks', task.id, 'edit']\" class=\"btn btn-primary\">Edit Task</a>\n    <button (click)=\"delete(task);\" type=\"button\" class=\"btn btn-danger\">Delete</button>\n    <button (click)=\"goBack();\" class=\"btn btn-default\">Back</button>\n  </div>\n</div>\n"

/***/ }),

/***/ 709:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <form [formGroup]=\"editTaskForm\" (ngSubmit)=\"update()\" class=\"site-form col-md-offset-3 col-md-6\">\n    <!-- Title -->\n    <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('title')}\">\n      <label for=\"inputTitle\" class=\"control-label\">Title</label>\n      <input formControlName=\"title\" type=\"text\"\n        class=\"form-control\" id=\"inputTitle\" placeholder=\"Title\">\n        <div *ngIf=\"!isValid('title', 'required')\" class=\"help-block\">* Title is required!</div>\n    </div>\n    <!-- Description -->\n    <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('description')}\">\n      <label for=\"inputDescription\" class=\"control-label\">Description</label>\n      <textarea formControlName=\"description\" type=\"text\" \n        class=\"form-control\" id=\"inputDescription\" placeholder=\"Description\" rows=\"7\"></textarea>\n        <div *ngIf=\"!isValid('description', 'required')\" class=\"help-block\">* Description is required!</div>\n    </div>\n    <!-- Priority -->\n    <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('priority')}\">\n      <label for=\"inputPriority\" class=\"control-label\">Priority</label>\n      <input formControlName=\"priority\" type=\"number\" \n        class=\"form-control\" id=\"inputPrioritye\" placeholder=\"Priority\">\n        <div *ngIf=\"!isValid('priority', 'required')\" class=\"help-block\">* Priority is required!</div>\n        <div *ngIf=\"!isValid('priority', 'maxlength')\" class=\"help-block\">* Maximum priority length is 6!</div>\n        <div *ngIf=\"!isValid('priority', 'pattern')\" class=\"help-block\">* Priority must be integer!</div>\n    </div>\n    <!-- Due Date -->\n    <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('due_date')}\">\n      <label for=\"inputDueDate\" class=\"control-label\">Due Date</label>\n      <my-date-picker [options]=\"datePickerOptions\" formControlName=\"due_date\"\n        (dateChanged)=\"onDateChanged($event)\"></my-date-picker>\n      <!-- <div *ngIf=\"!isValid('due_date', 'required')\" class=\"help-block\">* Due date is required!</div> -->\n    </div>\n    <!-- Actions -->\n    <button [disabled]=\"!editTaskForm.valid || !editTaskForm.dirty\" \n      type=\"submit\" class=\"btn btn-success\">Update Task</button>\n    <a [routerLink]=\"['/admin/tasks', taskId]\" class=\"btn btn-primary\">Show Task</a>\n    <button (click)=\"goBack();\" type=\"button\" class=\"btn btn-default\">Back</button>\n  </form>\n</div>\n"

/***/ }),

/***/ 710:
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"createTaskForm\" (ngSubmit)=\"createTask()\" class=\"site-form\">\n  <!-- Title -->\n  <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('title')}\">\n    <label for=\"inputTitle\" class=\"control-label\">Title</label>\n    <input formControlName=\"title\" type=\"text\" \n      class=\"form-control\" id=\"inputTitle\" placeholder=\"Title\">\n      <div *ngIf=\"!isValid('title', 'required')\" class=\"help-block\">* Title is required!</div>\n  </div>\n  <!-- Description -->\n  <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('description')}\">\n    <label for=\"inputDescription\" class=\"control-label\">Description</label>\n    <textarea formControlName=\"description\" type=\"text\" \n      class=\"form-control\" id=\"inputDescription\" placeholder=\"Description\" rows=\"4\"></textarea>\n      <div *ngIf=\"!isValid('description', 'required')\" class=\"help-block\">* Description is required!</div>\n  </div>\n  <!-- Priority -->\n  <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('priority')}\">\n    <label for=\"inputPriority\" class=\"control-label\">Priority</label>\n    <input formControlName=\"priority\" type=\"number\" \n      class=\"form-control\" id=\"inputPrioritye\" placeholder=\"Priority\">\n      <div *ngIf=\"!isValid('priority', 'required')\" class=\"help-block\">* Priority is required!</div>\n      <div *ngIf=\"!isValid('priority', 'maxlength')\" class=\"help-block\">* Maximum priority length is 6!</div>\n      <div *ngIf=\"!isValid('priority', 'pattern')\" class=\"help-block\">* Priority must be integer!</div>\n  </div>\n  <!-- Due Date -->\n  <div class=\"form-group\" [ngClass]=\"{'has-error': !isValidCompletely('due_date')}\">\n    <label for=\"inputDueDate\" class=\"control-label\">Due Date</label>\n    <my-date-picker [options]=\"datePickerOptions\" formControlName=\"due_date\"\n      (dateChanged)=\"onDateChanged($event)\"></my-date-picker>\n    <!-- <div *ngIf=\"!isValid('due_date', 'required')\" class=\"help-block\">* Due date is required!</div> -->\n  </div>\n  <!-- Actions -->\n  <button [disabled]=\"!createTaskForm.valid\" type=\"submit\" class=\"btn btn-success\">Create Task</button>\n</form>\n"

/***/ }),

/***/ 711:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"isExists(tasks)\">\n  <!-- Control Panel -->\n  <div class=\"panel panel-default cpanel\">\n    <div class=\"panel-body\">\n      <button [disabled]=\"!selectedTasks.length\" (click)=\"batchDestroy(selectedTasks);\"\n        class=\"btn btn-danger\">Delete Selected</button>\n      <button (click)=\"checkAll();\"\n        class=\"btn btn-default\">Check All</button>\n      <button (click)=\"uncheckAll();\"\n        class=\"btn btn-default\">Uncheck All</button>\n      <button *ngIf=\"!sorted\" (click)=\"sortBy('title'); sorted = !sorted;\"\n        class=\"btn btn-default\">Sort by Title</button>\n      <button *ngIf=\"sorted\" (click)=\"sortBy('id'); sorted = !sorted;\"\n        class=\"btn btn-default\">Sort by Id</button>\n    </div>\n  </div>\n  <!-- Active Tasks -->\n  <div *ngIf=\"isExists(activeTasks)\" class=\"panel panel-primary\">\n    <div class=\"panel-heading\">Active Tasks</div>\n    <ul class=\"list-group tasks-list\">\n      <li class=\"list-group-item\" *ngFor=\"let task of activeTasks\">\n        <!-- Left side -->\n        <div class=\"actions left_actions\">\n          <label>\n            <input type=\"checkbox\" name=\"selectedTasks\" value=\"{{task}}\" [checked]=\"task.marked\"\n              (change)=\"updateCheckedOptions(task, $event)\"/>\n          </label>\n          <a [routerLink]=\"['/admin/tasks', task.id]\">\n            <span class=\"task-name\">{{task.title}}</span>\n          </a>\n        </div>\n        <!-- Right side -->\n        <div class=\"actions rigth_actions btn-group animated\">\n          <button [ngClass]=\"{'btn-success': !task.completed, 'btn-warning': task.completed }\"\n            (click)=\"task.completed = !task.completed; update(task);\" type=\"button\" class=\"btn btn-sm\">\n            <span *ngIf=\"!task.completed\">Mark done</span>\n            <span *ngIf=\"task.completed\">Mark active</span>\n          </button>\n          <a [routerLink]=\"['/admin/tasks', task.id, 'edit']\" class=\"btn btn-primary btn-sm\">Edit Task</a>\n          <button (click)=\"delete(task);\" type=\"button\" class=\"btn btn-danger btn-sm\">Delete</button>\n        </div>\n      </li>\n    </ul>\n  </div>\n  <!-- Completed Tasks -->\n  <div *ngIf=\"isExists(completedTasks)\" class=\"panel panel-success\">\n    <div class=\"panel-heading\">Completed Tasks</div>\n    <ul class=\"list-group tasks-list\">\n      <li class=\"list-group-item\" *ngFor=\"let task of completedTasks\">\n        <!-- Left side -->\n        <div class=\"actions left_actions\">\n          <label>\n            <input type=\"checkbox\" name=\"selectedTasks\" value=\"{{task}}\" [checked]=\"task.marked\"\n              (change)=\"updateCheckedOptions(task, $event)\"/>\n          </label>\n          <a [routerLink]=\"['/admin/tasks', task.id]\">\n            <span class=\"task-name\">{{task.title}}</span>\n          </a>\n        </div>\n        <!-- Right side -->\n        <div class=\"actions rigth_actions btn-group animated\">\n          <button [ngClass]=\"{'btn-success': !task.completed, 'btn-warning': task.completed }\"\n            (click)=\"task.completed = !task.completed; update(task);\" type=\"button\" class=\"btn btn-sm\">\n            <span *ngIf=\"!task.completed\">Mark done</span>\n            <span *ngIf=\"task.completed\">Mark active</span>\n          </button>\n          <a [routerLink]=\"['/admin/tasks', task.id, 'edit']\" class=\"btn btn-primary btn-sm\">Edit Task</a>\n          <button (click)=\"delete(task);\" type=\"button\" class=\"btn btn-danger btn-sm\">Delete</button>\n        </div>\n      </li>\n    </ul>\n  </div>\n</div>\n<!-- Not found -->\n<div *ngIf=\"!isExists(tasks)\">\n  <h3>There are no tasks yet!</h3>\n</div>\n"

/***/ }),

/***/ 745:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(404);


/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_notifications__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_notifications__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_config__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var TaskService = (function () {
    function TaskService(http, _flash, config) {
        this.http = http;
        this._flash = _flash;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        this.tasksUrl = config.apiEndpoint + "/tasks";
        this.tasks = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
    }
    TaskService.prototype.loadTasks = function () {
        var _this = this;
        var url = this.tasksUrl + "?access_token=" + localStorage.getItem('token');
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return res.json().tasks; })
            .catch(function (error) { return _this.handleError(error, 'Could not load tasks!'); });
    };
    TaskService.prototype.getTask = function (id) {
        var _this = this;
        var url = this.tasksUrl + "/" + id + "?access_token=" + localStorage.getItem('token');
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, 'Could not load task!'); });
    };
    TaskService.prototype.create = function (task) {
        var _this = this;
        task['due_date'] = task['due_date']['formatted'];
        var body = JSON.stringify({ task: task });
        var url = this.tasksUrl + "?access_token=" + localStorage.getItem('token');
        return this.http.post(url, body, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (error) {
            _this.handleError(error, 'Could not create task!');
        });
    };
    TaskService.prototype.update = function (task) {
        var _this = this;
        var url = this.tasksUrl + "/" + task.id + "?access_token=" + localStorage.getItem('token');
        if (task['due_date'] && task['due_date']['formatted']) {
            task['due_date'] = task['due_date']['formatted'];
        }
        return this.http.put(url, JSON.stringify(task), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (error) {
            _this.handleError(error, 'Could not update task!');
        });
    };
    TaskService.prototype.updateById = function (id, task) {
        task.id = id;
        return this.update(task);
    };
    TaskService.prototype.delete = function (id) {
        var _this = this;
        var url = this.tasksUrl + "/" + id + "?access_token=" + localStorage.getItem('token');
        return this.http.delete(url)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (error) {
            _this.handleError(error, 'Could not delete task!');
        });
    };
    TaskService.prototype.batchDestroy = function (ids) {
        var _this = this;
        var body = JSON.stringify({ tasks: ids });
        var url = this.tasksUrl + "/batch_destroy?access_token=" + localStorage.getItem('token');
        return this.http.delete(url, { body: body, headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().ids; })
            .catch(function (error) {
            _this.handleError(error, 'Could not delete tasks!');
        });
    };
    TaskService.prototype.handleError = function (error, flash) {
        if (flash === void 0) { flash = null; }
        console.error(error);
        flash ? this._flash.error('', flash) : null;
        return Promise.reject(error.message || error);
    };
    TaskService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Injectable */])(),
        __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* APP_CONFIG */])), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_notifications__["NotificationsService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_angular2_notifications__["NotificationsService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* AppConfig */]) === 'function' && _c) || Object])
    ], TaskService);
    return TaskService;
    var _a, _b, _c;
}());
//# sourceMappingURL=/opt/lampp/htdocs/apps/ruby/dkeeper/angularcli/src/task.js.map

/***/ })

},[745]);
//# sourceMappingURL=main.bundle.map