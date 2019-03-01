import {CuentaBancariaSchema, FileSys, Hotel, Sistema} from '@configs/interfaces';

export class ProveedorModel
{
    _id: number;
    crmid: string;
    nombre: string;
    hoteles: Hotel[];
    email: string;
    telefono: string;
    cuentaBancaria?: CuentaBancariaSchema;
    contrato: FileSys;
    cargoPromociones: FileSys;
    descripcion: String;
    sistema: Sistema;

    /**
     * Constructor
     *
     * @param entidad
     */
    constructor(entidad?)
    {
        entidad = entidad || {};
        this._id = entidad._id || null;
        this.crmid = entidad.crmid || '';
        this.nombre = entidad.nombre || '';
        this.hoteles = entidad.hoteles || [];
        this.email = entidad.email || '';
        this.setCuentaBancaria(entidad);
        this.setContrato(entidad);
        this.setCargoPromociones(entidad);
        this.descripcion = entidad.descripcion || '';
        this.sistema = entidad.sistema || {};
    }

    private setCuentaBancaria(entidad): void {
        if (entidad.cuentaBancaria) {
            this.cuentaBancaria = {
                razonSocial: entidad.cuentaBancaria.razonSocial,
                pais: entidad.cuentaBancaria.pais,
                nombreBeneficiario: entidad.cuentaBancaria.nombreBeneficiario,
                nombreBancoBeneficiario: entidad.cuentaBancaria.nombreBancoBeneficiario,
                numeroCuenta: entidad.cuentaBancaria.numeroCuenta,
                tipoCuenta: entidad.cuentaBancaria.tipoCuenta,
                aba: entidad.cuentaBancaria.aba,
                swift: entidad.cuentaBancaria.swift,
                bancoIntermediario: entidad.cuentaBancaria.bancoIntermediario,
                cuentaIntermediaria: entidad.cuentaBancaria.cuentaIntermediaria,
                formaPago: {
                    tarjetaCredito: {
                        disponible: entidad.cuentaBancaria.formaPago.tarjetaCredito.disponible,
                        porcentaje: entidad.cuentaBancaria.formaPago.tarjetaCredito.porcentaje,
                    },
                    transferencia: {
                        disponible: entidad.cuentaBancaria.formaPago.transferencia.disponible,
                        costoTransferencia: entidad.cuentaBancaria.formaPago.transferencia.costoTransferencia,
                    },
                    efectivo: {
                        disponible: entidad.cuentaBancaria.formaPago.efectivo.disponible
                    }
                },
                descripcion: entidad.cuentaBancaria.descripcion,
            };
        } else {
            this.cuentaBancaria = {
                razonSocial: '',
                pais: '',
                nombreBeneficiario: '',
                nombreBancoBeneficiario: '',
                numeroCuenta: '',
                tipoCuenta: '',
                aba: '',
                swift: '',
                bancoIntermediario: '',
                cuentaIntermediaria: '',
                formaPago: {
                    tarjetaCredito: {
                        disponible: false,
                        porcentaje: 0,
                    },
                    transferencia: {
                        disponible: false,
                        costoTransferencia: 0,
                    },
                    efectivo: {
                        disponible: false
                    }
                },
                descripcion: '',
            };
        }
    }

    private setCargoPromociones(entidad): void {
        if (entidad.cargoPromociones) {
            this.cargoPromociones = {
                name: entidad.cargoPromociones.name,
                type: entidad.cargoPromociones.type,
                data: entidad.cargoPromociones.data,
            };
        } else {
            this.cargoPromociones = {
                name: '',
                type: '',
                data: null,
            };
        }
    }

    private setContrato(entidad): void {
        if (entidad.contrato) {
            this.contrato = {
                name: entidad.contrato.name,
                type: entidad.contrato.type,
                data: entidad.contrato.data,
            };
        } else {
            this.contrato = {
                name: '',
                type: '',
                data: null,
            };
        }
    }
}

export const ProveedorConst = {
    name: 'Proveedor',
    names: 'Proveedores',
    icon: 'shopping_basket',
    urlEntidades: '/apps/jumbomod/proveedores',
    urlEntidad: '/apps/jumbomod/proveedor'
};

