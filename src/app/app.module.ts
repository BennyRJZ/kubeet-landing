import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { IndexModule } from "./index/index.module";
import { SharedModule } from "./shared/shared.module";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "./app.routing";
import { TranslateService } from "./shared/services/translate.service";
import { ProductModule } from "./layouts/product/product.module";
import { ProjectModule } from "./layouts/project/project.module";
import { UserModule } from "./layouts/user/user.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { NgxSoapModule } from "ngx-soap";
import { ProjectService } from "./shared/services/project.service";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FireBaseConfig } from "../environments/firebaseConfig";
import * as firebase from 'firebase/app';


/* to load and set en.json as the default application language */
export function setupTranslateFactory(service: TranslateService): Function {
 return () => service.use("en");
}

@NgModule({
declarations: [ AppComponent ],
imports: [
 NgxSoapModule,
 BrowserModule,
 BrowserAnimationsModule,
 IndexModule,
 ProductModule,
 ProjectModule,
 UserModule,
 SharedModule,
 RouterModule.forRoot(AppRoutes),
 ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production }),
 AngularFireModule.initializeApp(FireBaseConfig.firebase),
 AngularFirestoreModule,
 AngularFireAuthModule
 ],
providers: [
TranslateService,
ProjectService,
 {
  provide: APP_INITIALIZER,
  useFactory: setupTranslateFactory,
  deps: [ TranslateService ],
  multi: true
 }
],
bootstrap: [ AppComponent ],
schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {}
