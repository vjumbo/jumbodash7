import {CuentaBancariaSchema, Habitacion, HotelType, Penalidad, Servicio, Sistema, TipoTarifaType} from '@configs/interfaces';

export class HotelModel
{
    _id: string;
    nombre: string;
    segmetohotel: HotelType;
    habitaciones?: Habitacion[];
    servicios?: Servicio[];
    serviciosNoIncluidos?: Servicio[];
    penalidades?: Penalidad[];
    region: string;
    regimenAlimentacion?: [
        {
            nombreRegimen: string;
            descripcion: string
        }
        ];
    tipoPlan?: [{
        nombrePlna: string;
        descripcion: string
    }];
    tipoTarifa?: [{
        tipoHabitacion: Habitacion;
        numPersonas: number;
        tipo: TipoTarifaType;
        monto: number
    }];
    email?: {
        pagos?: string;
        reservas?: string;
        jefeReservas?: string;
    };
    telefonos?: {
        pagos?: string;
        reservas?: string;
        jefeReservas?: string;
    };
    ejecutivoVentas?: {
        nombre: string;
        telefono: string;
        email: string;
    };
    cuentaBancaria?: CuentaBancariaSchema;
    descripcion: string;
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
        this.nombre = entidad.nombre || '';
        this.segmetohotel = entidad.segmetohotel || null;
        this.habitaciones = entidad.habitaciones || [];
        this.servicios = entidad.servicios || [];
        this.serviciosNoIncluidos = entidad.serviciosNoIncluidos || [];
        this.penalidades = entidad.penalidades || [];
        this.region = entidad.region || null;
        this.regimenAlimentacion = entidad.regimenAlimentacion || [];
        this.tipoPlan = entidad.tipoPlan || [];
        this.tipoTarifa = entidad.tipoTarifa || [];
        this.setEmail(entidad);
        this.setTelefonos(entidad);
        this.setEjecutivoVentas(entidad);
        this.setCuentaBancaria(entidad);
        this.descripcion = entidad.descripcion || '';
        this.sistema = entidad.sistema || {};
    }

    private setEmail(entidad): void {
        if (entidad.email) {
            this.email = {
                pagos: entidad.email.pagos || '',
                reservas: entidad.email.reservas || '',
                jefeReservas: entidad.email.jefeReservas || ''
            };
        } else {
            this.email = {
                pagos: '',
                reservas: '',
                jefeReservas: ''
            };
        }
    }

    private setTelefonos(entidad): void {
        if (entidad.telefonos) {
            this.telefonos = {
                pagos: entidad.telefonos.pagos || '',
                reservas: entidad.telefonos.reservas || '',
                jefeReservas: entidad.telefonos.jefeReservas || ''
            };
        } else {
            this.telefonos = {
                pagos: '',
                reservas: '',
                jefeReservas: ''
            };
        }
    }

    private setEjecutivoVentas(entidad): void {
        if (entidad.ejecutivoVentas) {
            this.ejecutivoVentas = {
                nombre: entidad.ejecutivoVentas.nombre || '',
                telefono: entidad.ejecutivoVentas.telefono || '',
                email: entidad.ejecutivoVentas.email || ''
            };
        } else {
            this.ejecutivoVentas = {
                nombre: '',
                telefono: '',
                email: ''
            };
        }
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
                        disponible: entidad.cuentaBancaria.formaPago.efectivo.disponible,
                        total: entidad.cuentaBancaria.formaPago.efectivo.total,
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
                        disponible: false,
                        total: 0,
                    }
                },
                descripcion: '',
            };
        }
    }
}

export const HotelConst = {
    name: 'Hotel',
    names: 'Hoteles',
    icon: 'shopping_basket',
    urlEntidades: '/apps/jumbomod/hoteles',
    urlEntidad: '/apps/jumbomod/hotel'
};

