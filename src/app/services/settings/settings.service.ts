import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Api } from '../../@types/api';
import { Settings } from '../../@types/settings';

const initialSettings = {
  showDeleteTaskMessage: false,
  setDefaultStatusOnCreateTask: false,
};

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _settings: Settings = initialSettings;
  private isSettingsRequested = false;

  constructor(private http: HttpClient) {}

  getSettingsRequest(): Observable<Settings> {
    const request = this.http.get<Api<Settings>>('/api/settings');
    return request.pipe(
      map(response => {
        if (response.data) {
          this._settings = response.data;
        }
        return this._settings;
      })
    );
  }

  updateSettingsRequest(body: Settings) {
    return this.http.put('/api/settings', body);
  }

  getSettings(): Observable<Settings> {
    if (this.isSettingsRequested) {
      return new Observable(
        (observer) => observer.next(this._settings)
      );
    } else {
      this.isSettingsRequested = true;
      return this.getSettingsRequest();
    }
  }

  updateSetting({ field, value }: { field: keyof Settings, value: Settings[keyof Settings] }) {
    this.updateSettingsRequest(this._settings)
      .subscribe(() => {
        this._settings[field] = value;
      });
  }
}
