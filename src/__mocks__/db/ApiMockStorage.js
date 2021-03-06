import {AsyncStorage as storage} from "react-native";

const keys = {
  PROFILE: 'profile.db',
  CONTACTS: 'contacts.db',
};

export default class ApiMockStorage {

  static async clear(){
    await storage.clear();
  }

  static async saveProfile(profile){
    await storage.setItem(keys.PROFILE, JSON.stringify(profile));
  }

  static async getProfile(){
    return await storage.getItem(keys.PROFILE).then(profile => JSON.parse(profile));
  }

  static async saveContacts(contacts){
    await storage.setItem(keys.CONTACTS, JSON.stringify(contacts));
  }

  static async getContacts(){
    return await storage.getItem(keys.CONTACTS).then(contacts => JSON.parse(contacts));
  }

  static async saveTransferValue(uuid,register){
    await storage.setItem(uuid, JSON.stringify(register));
  }

  static async getTransfersValue(uuid){
    return await storage.getItem(uuid).then(register => JSON.parse(register));
  }

}