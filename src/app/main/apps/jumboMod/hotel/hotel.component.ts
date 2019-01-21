import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import {MatSnackBar} from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import {HotelConst, HotelModel} from './hotel.model';
import {HotelService} from './hotel.service';
import {Router} from '@angular/router';
import {Utilities} from '@utilities/utilities';
import {CountriesService} from '@service/countries.service';


@Component({
    selector     : 'jum-hotel',
    templateUrl  : './hotel.component.html',
    styleUrls    : ['./hotel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class HotelComponent implements OnInit, OnDestroy
{
    entidad: HotelModel;
    pageType: string;
    entidadForm: FormGroup;
    entidadConst: any;
    countries: any[];
    regions: string[];
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param entidadService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param router
     * @param _countries
     */
    constructor(
        private entidadService: HotelService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private router: Router,
        private _countries: CountriesService,
    )
    {
        this.entidadConst = HotelConst;
        // Set the default
        this.entidad = new HotelModel();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        /*await this._countries.iniSet();
        this.countries = this._countries.countries;
        this.regions = this._countries.regions;*/
        // Subscribe to update entidad on changes
        this.entidadService.onEntidadChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(entidad => {
                if ( entidad )
                {
                    this.entidad = new HotelModel(entidad);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.entidad = new HotelModel();
                }

                this.entidadForm = this.createEntidadForm();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create entidad form
     *
     * @returns {FormGroup}
     */
    createEntidadForm(): FormGroup
    {
        return this._formBuilder.group({
            _id             : [this.entidad._id],
            nombre          : [this.entidad.nombre, Validators.required],
            segmento        : [this.entidad.segmeto, Validators.required],
            habitaciones    : [this.entidad.habitaciones],
            servicios       : [this.entidad.servicios],
            serviciosNoIncluidos       : [this.entidad.serviciosNoIncluidos],
            penalidades       : [this.entidad.penalidades],
            region          : [this.entidad.region],
            regimenAlimentacion  : [this.entidad.regimenAlimentacion],
            tipoPlan        : [this.entidad.tipoPlan],
            tipoTarifa      : [this.entidad.tipoTarifa],
            email           : [this.entidad.email],
            telefonos           : [this.entidad.telefonos],
            ejecutivoVentas           : [this.entidad.ejecutivoVentas],
            cuentaBancaria           : [this.entidad.cuentaBancaria],
            descripcion     : [this.entidad.descripcion],
            /*sistema         : [this.entidad.sistema]*/
        });
    }

    /*createhabitaciones(): FormGroup {
        return this._formBuilder.group({
            _id: null,
            nombre: '',
        });
    }*/

    /**
     * Save entidad
     */
    saveEntidad(): void
    {
        const data = this.entidadForm.getRawValue();

        this.entidadService.saveEntidad(Utilities.systems.setEntitySistema(data))
            .then(() => {

                // Trigger the subscription with new data
                this.entidadService.onEntidadChanged.next(data);

                // Show the success message
                this._matSnackBar.open(`${this.entidadConst.name} Guardado`, 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    /**
     * Add entidad
     */
    addEntidad(): void
    {
        const data = this.entidadForm.getRawValue();

        this.entidadService.addEntidad(Utilities.systems.setEntitySistema(data))
            .then((entidad) => {

                // Trigger the subscription with new data
                this.entidadService.onEntidadChanged.next(entidad);

                // Show the success message
                this._matSnackBar.open(`${this.entidadConst.name} Agregado`, 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this._location.go(`${this.entidadConst.urlEntidad}/${ this.entidad._id}`);
            });
    }

    removeEntidad(): void
    {
        const data = this.entidadForm.getRawValue();

        this.entidadService.removeEntidad(data)
            .then(() => {

                // Show the success message
                this._matSnackBar.open(`${this.entidadConst.name} Borrado`, 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // this._location.go(`${this.entidadConst.urlEntidades}`);
                this.router.navigate([`${this.entidadConst.urlEntidades}`]);
            });
    }
}
