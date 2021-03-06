import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {OportunidadesConst, OportunidadModel} from '../oportunidad.model';


@Component({
    selector     : 'oportunidad-form-dialog',
    templateUrl  : './oportunidad-form.component.html',
    styleUrls    : ['./oportunidad-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class OportunidadModelsOportunidadModelFormDialogComponent
{
    action: string;
    entidad: OportunidadModel;
    entidadForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<OportunidadModelsOportunidadModelFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<OportunidadModelsOportunidadModelFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = `Editar ${OportunidadesConst.name}`;
            this.entidad = _data.oportunidad;
        }
        else
        {
            this.dialogTitle = `Crear Nueva ${OportunidadesConst.name}`;
            this.entidad = new OportunidadModel({});
        }

        this.entidadForm = this.createOportunidadModelForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create entidad form
     *
     * @returns {FormGroup}
     */
    createOportunidadModelForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.entidad.id],
            potentialname    : [this.entidad.potentialname],
            potential_no: [this.entidad.potential_no],
            assigned_user_id: [this.entidad.assigned_user_id],
            contact_id  : [this.entidad.contact_id],
            description: [this.entidad.description],
            related_to : [this.entidad.related_to],
            sales_stage: [this.entidad.sales_stage],
            service_status   : [this.entidad.service_status],
        });
    }
}
