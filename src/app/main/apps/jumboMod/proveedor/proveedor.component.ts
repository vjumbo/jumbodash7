import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import {MatSnackBar} from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import {ProveedorModel, ProveedorConst} from './proveedor.model';
import {ProveedorService} from './proveedor.service';
import {Router} from '@angular/router';
import {Hotel, Moneda} from '@configs/interfaces';
import {Utilities} from '@utilities/utilities';


@Component({
    selector     : 'jum-proveedor',
    templateUrl  : './proveedor.component.html',
    styleUrls    : ['./proveedor.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProveedorComponent implements OnInit, OnDestroy
{
    entidad: ProveedorModel;
    pageType: string;
    entidadForm: FormGroup;
    entidadConst: any;
    hoteles: Hotel[];
    hotelesForm: FormArray;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProveedorService} entidadService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param router
     */
    constructor(
        private entidadService: ProveedorService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private router: Router
    )
    {
        this.entidadConst = ProveedorConst;
        // Set the default
        this.entidad = new ProveedorModel();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to update entidad on changes
        this.hoteles = this.entidadService.hoteles;
        this.entidadService.onEntidadChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(entidad => {
                if ( entidad )
                {
                    this.entidad = new ProveedorModel(entidad);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.entidad = new ProveedorModel();
                }

                this.createEntidadForm();
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
    createEntidadForm(): void
    {
        const tarjetaCredito = this._formBuilder.group({
            disponible: [this.entidad.cuentaBancaria.formaPago.tarjetaCredito.disponible],
            porcentaje: [this.entidad.cuentaBancaria.formaPago.tarjetaCredito.porcentaje],
        });

        const transferencia = this._formBuilder.group({
            disponible: [this.entidad.cuentaBancaria.formaPago.transferencia.disponible],
            costoTransferencia: [this.entidad.cuentaBancaria.formaPago.transferencia.costoTransferencia],
        });

        const efectivo = this._formBuilder.group({
            disponible: [this.entidad.cuentaBancaria.formaPago.efectivo.disponible],
        });

        const formaPago = this._formBuilder.group({
            tarjetaCredito: tarjetaCredito,
            transferencia: transferencia,
            efectivo: efectivo
        });

        const cuentaBancaria = this._formBuilder.group({
            razonSocial: [this.entidad.cuentaBancaria.razonSocial],
            pais: [this.entidad.cuentaBancaria.pais],
            nombreBeneficiario: [this.entidad.cuentaBancaria.nombreBeneficiario],
            nombreBancoBeneficiario: [this.entidad.cuentaBancaria.nombreBancoBeneficiario],
            numeroCuenta: [this.entidad.cuentaBancaria.numeroCuenta],
            tipoCuenta: [this.entidad.cuentaBancaria.tipoCuenta],
            aba: [this.entidad.cuentaBancaria.aba],
            swift: [this.entidad.cuentaBancaria.swift],
            bancoIntermediario: [this.entidad.cuentaBancaria.bancoIntermediario],
            cuentaIntermediaria: [this.entidad.cuentaBancaria.cuentaIntermediaria],
            formaPago: formaPago,
            descripcion: [this.entidad.cuentaBancaria.descripcion],
        });

        const cargoPromociones = this._formBuilder.group({
            name: [this.entidad.cargoPromociones.name],
            type: [this.entidad.cargoPromociones.type],
            data: [this.entidad.cargoPromociones.data],
        });

        const contrato = this._formBuilder.group({
            name: [this.entidad.contrato.name],
            type: [this.entidad.contrato.type],
            data: [this.entidad.contrato.data],
        });

        this.entidadForm = this._formBuilder.group({
            _id                 : [this.entidad._id],
            nombre              : [this.entidad.nombre],
            hoteles             : [this.entidad.hoteles],
            email               : [this.entidad.email],
            telefono            : [this.entidad.telefono],
            cuentaBancaria      : cuentaBancaria,
            contrato            : contrato,
            cargoPromociones    : cargoPromociones,
            descripcion         : [this.entidad.descripcion],
           /*sistema             : [this.entidad.sistema]*/
        });
    }

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
