import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {Proveedor} from '@configs/interfaces';
import {BackEndConst} from '@configs/constantes';
import {VtigerServiceService} from '@service/vtiger.Service';

@Injectable()
export class ProveedoresService implements Resolve<any>
{
    entidades: any[];
    onEntidadesChanged: BehaviorSubject<any>;
    url = `${BackEndConst.backEndUrl}`; // ${BackEndConst.endPoints.proveedores}

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _vtgierService: VtigerServiceService,
    )
    {
        // Set the defaults
        this.onEntidadesChanged = new BehaviorSubject({});
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
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getEntidades()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get entidades
     *
     * @returns {Promise<any>}
     */
    async getEntidades(): Promise<any> {
        /*return new Promise((resolve, reject) => {
            this._httpClient.get(this.url)
                .subscribe((response: any[]) => {
                    this.entidades = response;
                    this.onEntidadesChanged.next(this.entidades);
                    resolve(response);
                }, reject);

        });*/
        this.entidades = await this._vtgierService.doQuery('select vendor_no, vendorname, phone, email from Vendors');
        this.onEntidadesChanged.next(this.entidades);
        return this.entidades;
    }
}
