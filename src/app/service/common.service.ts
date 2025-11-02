import { Injectable } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import * as personaldetails from '../../Assets/Mydetails.json';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private devicedetection: DeviceDetectorService) { }

  getDeviceInfoValue<K extends keyof DeviceInfo>(param: K): DeviceInfo[K] {
    const deviceInfo = this.devicedetection.getDeviceInfo();
    return deviceInfo[param];
  }


  getPersonalDetails(param: string) {
    return personaldetails[param as keyof typeof personaldetails];
  }

}
