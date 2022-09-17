import { Injectable } from '@angular/core';

const ROUTEDETAIL = 'RouteToken';
const INCOTERMSDETAIL = 'IncotermsToken';
const COMMODITYDETAIL = 'CommodityToken';
const CARGODETAIL = 'CargoToken';
const LOADTYPEDETAIL = 'LoadTypeToken';
const CARGOREADINESS = 'CargoReadinessToken';
const WELCOMEPAGE = 'WelcomeToken';
const SHIPMENTMODE = 'ShipmentModeToken';

const USERNAME_KEY = 'AuthUsername';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
    window.sessionStorage.removeItem(USERNAME_KEY);
  }
 
  public saverouteDetails(data: any) {
    window.sessionStorage.removeItem(ROUTEDETAIL);
    window.sessionStorage.setItem(ROUTEDETAIL, data);
  }

  public getrouteDetails(): any {
    return sessionStorage.getItem(ROUTEDETAIL);
  }

//   incoterms

public setIncotermsDetails(data: any) {
    window.sessionStorage.removeItem(INCOTERMSDETAIL);
    window.sessionStorage.setItem(INCOTERMSDETAIL, data);
  }

  public getIncotermsDetails(): any {
    return sessionStorage.getItem(INCOTERMSDETAIL);
  }

  //commodity

  public setCommodityDetails(data: any) {
    window.sessionStorage.removeItem(COMMODITYDETAIL);
    window.sessionStorage.setItem(COMMODITYDETAIL, data);
  }

  public getCommodityDetails(): any {
    return sessionStorage.getItem(COMMODITYDETAIL);
  }

  //cargo readiness

  public setReadinessDetails(data: any) {
    window.sessionStorage.removeItem(CARGOREADINESS);
    window.sessionStorage.setItem(CARGOREADINESS, data);
  }

  public getReadinessDetails(): any {
    return sessionStorage.getItem(CARGOREADINESS);
  }

  //cargo details

  public setCargoDetails(data: any) {
    window.sessionStorage.removeItem(CARGODETAIL);
    window.sessionStorage.setItem(CARGODETAIL, data);
  }

  public getCargoDetails(): any {
    return sessionStorage.getItem(CARGODETAIL);
  }

  //loadtype

  public setLoadDetails(data: any) {
    window.sessionStorage.removeItem(LOADTYPEDETAIL);
    window.sessionStorage.setItem(LOADTYPEDETAIL, data);
  }

  public getLoadDetails(): any {
    return sessionStorage.getItem(LOADTYPEDETAIL);
  }

  //welcomepage

  public setWelcomeDetails(data: any) {
    window.sessionStorage.removeItem(WELCOMEPAGE);
    window.sessionStorage.setItem(WELCOMEPAGE, data);
  }

  public getWelcomeDetails(): any {
    return sessionStorage.getItem(WELCOMEPAGE);
  }

  //modeOfShippment

  public setShipmentDetails(data: any) {
    window.sessionStorage.removeItem(SHIPMENTMODE);
    window.sessionStorage.setItem(SHIPMENTMODE, data);
  }

  public getShipmentDetails(): any {
    return sessionStorage.getItem(SHIPMENTMODE);
  }

}
