import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {Habitacion} from '@configs/interfaces';
import {BackEndConst} from '@configs/constantes';
import {RequestServices} from '@service/servicios.service';

@Injectable()
export class HabitacionesService implements Resolve<any>
{
    entidades: Habitacion[];
    onEntidadesChanged: BehaviorSubject<any>;
    url = `${BackEndConst.backEndUrl}${BackEndConst.endPoints.habitaciones}`;

    /**
     * Constructor
     *
     * @param requestServices
     */
    constructor(
        private requestServices: RequestServices,
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
    getEntidades(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.requestServices.reqGet(this.url)
                .subscribe((response: any[]) => {
                    this.entidades = response;
                    this.onEntidadesChanged.next(this.entidades);
                    resolve(response);
                }, reject);
        });
    }
}
