import { bootstrap }        from '@angular/platform-browser-dynamic';
import { enableProdMode }   from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';

import { AppComponent }     from './app.component';

enableProdMode();
bootstrap(AppComponent, [ROUTER_PROVIDERS]);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
