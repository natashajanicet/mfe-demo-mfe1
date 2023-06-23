import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Directive({
  selector: '[appTokenHandler]'
})
export class TokenHandlerDirective {

  @HostListener('window:beforeunload', ['$event']) 
  closeWeb() {
    this.clearSessionSyncLocalStorage();
  }

  @HostListener('window:storage', ['$event'])
  onLocalStorageChange(event: StorageEvent) {
      if (!event.newValue) return;          // do nothing if no value to work with
      const storageKey = {
        syncStorage: "SyncStorage",
        logout: "Logout",
        initStorage: "InitSessionStorage"
      }
      if (event.key === storageKey.initStorage) {
        // another tab asked for the sessionStorage -> send it
        localStorage.setItem(storageKey.syncStorage, JSON.stringify(sessionStorage));
      } else if (event.key === storageKey.syncStorage) {
        const data = JSON.parse(event.newValue);
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            sessionStorage.setItem(key, data[key]);
          }
        }
        this.clearSessionSyncLocalStorage()
      } else if (event.key === storageKey.logout) {
        sessionStorage.clear();
        this.clearSessionSyncLocalStorage()
      }
  }

  constructor(protected idle: Idle, protected keepalive: Keepalive, protected router: Router) { 
    this.clearSessionSyncLocalStorage();
    // Ask other tabs for session storage (this is ONLY to trigger event)
    localStorage.setItem("InitSessionStorage", (new Date()).toString()) 
    // set idle parameters
    idle.setIdle(10); // how long can they be inactive before considered idle, in seconds
    idle.setTimeout(0);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active

    // do something when the user becomes idle
    idle.onIdleStart.subscribe(() => this.logout());

    // set keepalive parameters, omit if not using keepalive
    keepalive.interval(3); // will ping at this interval while not idle, in seconds
    keepalive.onPing.subscribe(() => this.refreshToken()); // do something when it pings
    this.idle.watch();
  }

  clearSessionSyncLocalStorage() {
    const storageKey = {
      syncStorage: "SyncStorage",
      logout: "Logout",
      initStorage: "InitSessionStorage"
    }

    for (const value of Object.values(storageKey)) {
      localStorage.removeItem(value);
    }
  }

  isTabActive() {
    return !document.hidden;
  }

  logout() {
    localStorage.setItem('Logout', (new Date()).toString());
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn() {
    return !!sessionStorage.getItem('accessToken');
  }

  refreshToken() {
    if (this.isLoggedIn() && this.isTabActive()) {
      console.log('refreshToken', new Date());
      sessionStorage.setItem('accessToken', (new Date()).toString())
      localStorage.setItem('SyncStorage', JSON.stringify(sessionStorage));
    }
    
  }

}
