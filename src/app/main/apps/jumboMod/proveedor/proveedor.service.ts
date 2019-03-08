import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {Hotel, Proveedor} from '@configs/interfaces';
import {BackEndConst} from '@configs/constantes';

@Injectable()
export class ProveedorService implements Resolve<any>
{
    routeParams: any;
    entidad: Proveedor;
    onEntidadChanged: BehaviorSubject<any>;
    hoteles: Hotel[];
    url = `${BackEndConst.backEndUrl}${BackEndConst.endPoints.proveedores}`; // ${BackEndConst.endPoints.proveedores}

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onEntidadChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getEntidad()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get entidad
     *
     * @returns {Promise<any>}
     */
    async getEntidad(): Promise<any>
    {
        this.hoteles = await <any>this._httpClient.get(`${BackEndConst.backEndUrl}${BackEndConst.endPoints.hoteles}`).toPromise();
        return new Promise((resolve, reject) => {
            if ( !this.routeParams.id ) // === 'new'
            {
                this.onEntidadChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get(`${this.url}/${this.routeParams.id}`)
                    .subscribe((response: any) => {
                        this.entidad = response;
                        this.onEntidadChanged.next(this.entidad);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Save entidad
     *
     * @param entidad
     * @returns {Promise<any>}
     */
    saveEntidad(entidad: any): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${this.url}/${entidad._id}`, entidad)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add entidad
     *
     * @param entidad
     * @returns {Promise<any>}
     */
    addEntidad(entidad: any): Promise<any>
    {
        if (entidad._id === null) {
            delete entidad._id;
        }
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${this.url}`, entidad)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Remove entidad
     *
     * @returns {Promise<any>}
     */
    removeEntidad(entidad: any): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${this.url}/${entidad._id}`)
                .subscribe((response: any) => {
                    this.entidad = response;
                    this.onEntidadChanged.next(this.entidad);
                    resolve(response);
                }, reject);
        });
    }
}
