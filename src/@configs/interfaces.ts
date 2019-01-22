export interface WidthHeightMed {
    width?: number;
    height?: number;
    Media?: number;
}

export interface Sistema {
    fechaCreacion: Date;
    fechaModificacion: Date;
    usuarioCreador: number | any;
    usuarioAsignado: number | any;
}

export interface Rol {
    id: number;
    name: string;
    descripcion: string;
    permisos: any[];
    sistema: Sistema;
}

export interface Usuario {
    id?: number;
    username: string;
    apikey: string;
    crmid: string;
    userInfo: any;
    rol?: Rol;
    sistema: Sistema;
}

export interface Moneda {
    id: number;
    nombre: string;
    code: string;
    simbolo: string;
    principal: boolean;
    descripcion: string;
    relacionPrincipal: number;
    sistema: Sistema;
}

export interface Servicio {
    _id?: string;
    nombre: string;
    descripcion: string;
    costo: number;
    moneda?: Moneda;
    sistema?: Sistema;
}

export interface FechasPenalidad {
    fechasini: Date;
    fechaFin: Date;
}

export interface Penalidad {
    _id?: string;
    nombre: string;
    fechas?: FechasPenalidad[];
    cancelacionesDias: number;
    cargo: string;
    descripcion: string;
    sistema?: Sistema;
}

export interface Docs {
    _id: number;
}

export interface Habitacion {
  _id?: string;
  nombre: string;
  descripcion: string;
  capacidad: number;
  adulto: number;
  ninos: number;
  inf: number;
  tipoCama: string;
  sistema?: Sistema;
}

export interface FormaPago {
    tarjetaCredito: {
        disponible: boolean;
        porcentaje: number;
    };
    transferencia: {
        disponible: boolean;
        costoTransferencia: number;
    };
    efectivo: {
        disponible: boolean;
    };
}

export interface CuentaBancariaSchema {
    _id?: string;
    razonSocial: string;
    pais: string;
    nombreBeneficiario: string;
    nombreBancoBeneficiario: string;
    numeroCuenta: string;
    tipoCuenta: string;
    aba: string;
    swift: string;
    bancoIntermediario: string;
    cuentaIntermediaria: string;
    formaPago: FormaPago;
    descripcion: string;
    sistema?: Sistema;
}

export type HotelType = 'Adulto' | 'Familias' | 'LGTB';
export type TipoTarifaType = 'Habitacion' | 'Personas';

export interface Hotel {
    _id?: string;
    nombre: string;
    segmeto: HotelType;
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
}