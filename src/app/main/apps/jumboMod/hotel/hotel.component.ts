import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
import {Habitacion, Penalidad, Servicio} from '@configs/interfaces';


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
    habitacionesForm: FormGroup;
    serviciosForm: FormGroup;
    noServiciosForm: FormGroup;
    penalidadesForm: FormGroup;
    entidadConst: any;
    countries: any[];
    regions: string[];
    hotelTypes: any[];
    habitaciones: Habitacion[];
    servicios: Servicio[];
    penalidades: Penalidad[];
    // Private
    private _unsubscribeAll: Subject<any>;

    regimenAlimentacion: FormArray;
    tipoPlan: FormArray;
    tipoTarifa: FormArray;

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
        this.hotelTypes = this.entidadService.hotelTypes;
        this.habitaciones = this.entidadService.habitaciones;
        this.servicios = this.entidadService.servicios;
        this.penalidades = this.entidadService.penalidades;
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

                this.createEntidadForm();
            });
    }

    getHabitaciones(): Habitacion[] {
        const habs = this.entidadForm.get('habitaciones').value;
        return this.habitaciones.filter( h =>
            !Utilities.arrays.findPropObjectInArray(habs, '_id', h._id)
        );
    }

    getServicios(): Servicio[] {
        const servs = [...this.entidadForm.get('servicios').value, ...this.entidadForm.get('serviciosNoIncluidos').value];
        return this.servicios.filter( s =>
            !Utilities.arrays.findPropObjectInArray(servs, '_id', s._id)
        );
    }

    getPenalidades(): Penalidad[] {
        const pens = this.entidadForm.get('penalidades').value;
        return this.penalidades.filter( p =>
            !Utilities.arrays.findPropObjectInArray(pens, '_id', p._id)
        );
    }

    getSelectedHabitaciones(): Habitacion[] {
        return this.entidadForm.get('habitaciones').value;
    }

    getSelectedServicios(): Servicio[] {
        return this.entidadForm.get('servicios').value;
    }

    getSelectedNoServicios(): Servicio[] {
        return this.entidadForm.get('serviciosNoIncluidos').value;
    }

    getSelectedPenalidades(): Penalidad[] {
        return this.entidadForm.get('penalidades').value;
    }

    updateHabitaciones(): void {
        const habId = this.habitacionesForm.get('habitacion').value;
        if ( !habId )
        {
            return;
        }
        const habs = [...this.entidadForm.get('habitaciones').value, this.habitaciones.find(h => h._id === habId)];
        if (!Utilities.objects.areEquals(this.entidad.habitaciones, habs)) {
            this.entidadForm.markAsDirty();
        } else {
            // todo
        }
        this.entidadForm.controls['habitaciones'].setValue(habs);
        this.habitacionesForm.reset();
    }

    updateServicios(): void {
        const servId = this.serviciosForm.get('servicio').value;
        if ( !servId )
        {
            return;
        }
        const servs = [...this.entidadForm.get('servicios').value, this.servicios.find(s => s._id === servId)];
        if (!Utilities.objects.areEquals(this.entidad.servicios, servs)) {
            this.entidadForm.markAsDirty();
        } else {
            // todo
        }
        this.entidadForm.controls['servicios'].setValue(servs);
        this.serviciosForm.reset();
    }

    updateNoServicios(): void {
        const servId = this.noServiciosForm.get('servicio').value;
        if ( !servId )
        {
            return;
        }
        const servs = [...this.entidadForm.get('serviciosNoIncluidos').value, this.servicios.find(s => s._id === servId)];
        if (!Utilities.objects.areEquals(this.entidad.serviciosNoIncluidos, servs)) {
            this.entidadForm.markAsDirty();
        } else {
            // todo
        }
        this.entidadForm.controls['serviciosNoIncluidos'].setValue(servs);
        this.noServiciosForm.reset();
    }

    updatePenalidades(): void {
        const penID = this.penalidadesForm.get('penalidad').value;
        if ( !penID )
        {
            return;
        }
        const pens = [...this.entidadForm.get('penalidades').value, this.penalidades.find(p => p._id === penID)];
        if (!Utilities.objects.areEquals(this.entidad.penalidades, pens)) {
            this.entidadForm.markAsDirty();
        } else {
            // todo
        }
        this.entidadForm.controls['penalidades'].setValue(pens);
        this.penalidadesForm.reset();
    }

    eliminarHab(id): void {
        const habs = [...this.entidadForm.get('habitaciones').value].filter(h => h._id !== id);
        this.entidadForm.controls['habitaciones'].setValue(habs);
    }

    eliminarServ(id): void {
        const servs = [...this.entidadForm.get('servicios').value].filter(s => s._id !== id);
        this.entidadForm.controls['servicios'].setValue(servs);
    }

    eliminarNoServ(id): void {
        const servs = [...this.entidadForm.get('serviciosNoIncluidos').value].filter(s => s._id !== id);
        this.entidadForm.controls['serviciosNoIncluidos'].setValue(servs);
    }

    eliminarPen(id): void {
        const pens = [...this.entidadForm.get('penalidades').value].filter(p => p._id !== id);
        this.entidadForm.controls['penalidades'].setValue(pens);
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
        this.habitacionesForm = this._formBuilder.group({
            habitacion: ['']
        });

        this.serviciosForm = this._formBuilder.group({
            servicio: ['']
        });

        this.noServiciosForm = this._formBuilder.group({
            servicio: ['']
        });
        this.penalidadesForm = this._formBuilder.group({
            penalidad: ['']
        });


        const email = this._formBuilder.group({
            pagos: [this.entidad.email.pagos, [Validators.email]],
            reservas: [this.entidad.email.reservas, [Validators.email]],
            jefeReservas: [this.entidad.email.jefeReservas, [Validators.email]],
        });

        const telefonos = this._formBuilder.group({
            pagos: [this.entidad.telefonos.pagos],
            reservas: [this.entidad.telefonos.reservas],
            jefeReservas: [this.entidad.telefonos.jefeReservas],
        });

        const ejecutivoVentas = this._formBuilder.group({
            nombre: [this.entidad.ejecutivoVentas.nombre],
            telefono: [this.entidad.ejecutivoVentas.telefono],
            email: [this.entidad.ejecutivoVentas.email, [Validators.email]]
        });

        this.entidadForm = this._formBuilder.group({
            _id                 : [this.entidad._id],
            nombre              : [this.entidad.nombre, Validators.required],
            segmetohotel        : [this.entidad.segmetohotel, Validators.required],
            habitaciones        : [this.entidad.habitaciones],
            servicios           : [this.entidad.servicios],
            serviciosNoIncluidos: [this.entidad.serviciosNoIncluidos],
            penalidades         : [this.entidad.penalidades],
            region              : [this.entidad.region],
            regimenAlimentacion : this._formBuilder.array([]),
            tipoPlan            : this._formBuilder.array([]),
            tipoTarifa          : this._formBuilder.array([]),
            email               : email,
            telefonos           : telefonos,
            ejecutivoVentas     : ejecutivoVentas,
            cuentaBancaria      : [this.entidad.cuentaBancaria],
            descripcion         : [this.entidad.descripcion],
            /*sistema           : [this.entidad.sistema]*/
        });
        this.regimenAlimentacion = this.entidadForm.get('regimenAlimentacion') as FormArray;
        this.tipoPlan = this.entidadForm.get('tipoPlan') as FormArray;
        this.tipoTarifa = this.entidadForm.get('tipoTarifa') as FormArray;
        this.iniRegimenAlimentacion();
        this.iniTipoPlan();
        this.iniTipoTarifa();
    }

    private iniRegimenAlimentacion(): void {
        this.entidad.regimenAlimentacion.forEach(f => {
            this.regimenAlimentacion.push(this.insertRegimenAlimentacion(f));
        });
    }

    createRegimenAlimentacion(): FormGroup {
        return this._formBuilder.group({
            nombreRegimen: '',
            descripcion: ''
        });
    }

    addRegimenAlimentacion(): void {
        this.regimenAlimentacion.push(this.createRegimenAlimentacion());
    }

    removeRegimenAlimentacion (index): void {
        this.regimenAlimentacion.removeAt(index);
    }

    private insertRegimenAlimentacion({nombreRegimen, descripcion}): FormGroup {
        return this._formBuilder.group({
            nombreRegimen: nombreRegimen || '',
            descripcion: descripcion || '',
        });
    }

    private iniTipoPlan(): void {
        this.entidad.tipoPlan.forEach(f => {
            this.tipoPlan.push(this.insertTipoPlan(f));
        });
    }

    createTipoPlan(): FormGroup {
        return this._formBuilder.group({
            nombrePlna: '',
            descripcion: ''
        });
    }

    addTipoPlan(): void {
        this.tipoPlan.push(this.createTipoPlan());
    }

    removeTipoPlan (index): void {
        this.tipoPlan.removeAt(index);
    }

    private insertTipoPlan({nombrePlna, descripcion}): FormGroup {
        return this._formBuilder.group({
            nombrePlna: nombrePlna || '',
            descripcion: descripcion || '',
        });
    }

    private iniTipoTarifa(): void {
        this.entidad.tipoTarifa.forEach(f => {
            this.tipoTarifa.push(this.insertTipoTarifa(f));
        });
    }

    createTipoTarifa(): FormGroup {
        return this._formBuilder.group({
            tipoHabitacion: [],
            numPersonas: 0,
            tipo: null,
            monto: 0
        });
    }

    addTipoTarifa(): void {
        this.tipoTarifa.push(this.createTipoTarifa());
    }

    removeTipoTarifa (index): void {
        this.tipoTarifa.removeAt(index);
    }

    private insertTipoTarifa({tipoHabitacion, numPersonas, tipo, monto}): FormGroup {
        return this._formBuilder.group({
            tipoHabitacion: tipoHabitacion || [],
            numPersonas: numPersonas || 0,
            tipo: tipo || null,
            monto: monto || 0,
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
