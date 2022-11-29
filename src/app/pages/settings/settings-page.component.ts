import { Component, OnInit } from '@angular/core';

import { Settings } from '../../@types/settings';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-settings',
  template: require('./settings-page.component.html'),
  styles: [require('./settings-page.component.css')]
})
export class SettingsPageComponent implements OnInit {
  settings?: Settings;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings()
      .subscribe((settings) => {
        this.settings = settings;
      });
  }

  updateSetting(field: keyof Settings) {
    return (value: Settings[keyof Settings]) => {
      this.settings![field] = value;
      this.settingsService.updateSetting({ field, value });
    };
  }
}
