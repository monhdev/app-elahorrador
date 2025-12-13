import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes,
      withPreloading(PreloadAllModules)),
      provideFirebaseApp(() => initializeApp({
        projectId: "ahorradordatos",
        appId: "1:183975969634:web:296efa35718cdbc144223b", storageBucket: "ahorradordatos.firebasestorage.app", apiKey: "AIzaSyBrLNwEpaOdkU4T30Z5p3oEXnYmi3X0uR8", authDomain: "ahorradordatos.firebaseapp.com", messagingSenderId: "183975969634", measurementId: "G-1018LHD7N3" })),
      provideAuth(() => getAuth()),
      provideAnalytics(() => getAnalytics()),
      ScreenTrackingService,
      UserTrackingService,
      provideFirestore(() => getFirestore()),
      provideMessaging(() => getMessaging()),
      provideStorage(() => getStorage()),
  ],
});
