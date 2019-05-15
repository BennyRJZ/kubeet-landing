import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private angularStorage: AngularFireStorage) { }
  upload(fileName, fileArchive) {
    return this.angularStorage.upload(fileName, fileArchive);
  }
  reference(fileName) {
  return this.angularStorage.ref(fileName);
  }
}
