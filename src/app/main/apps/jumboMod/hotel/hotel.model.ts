import {CuentaBancariaSchema, Habitacion, HotelType, Penalidad, Servicio, Sistema, TipoTarifaType} from '@configs/interfaces';

export class HotelModel
{
    _id: string;
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
        this.segmeto = entidad.segmeto || null;
        this.habitaciones = entidad.habitaciones || [];
        this.servicios = entidad.servicios || [];
        this.serviciosNoIncluidos = entidad.serviciosNoIncluidos || [];
        this.penalidades = entidad.penalidades || [];
        this.region = entidad.region || null;
        this.regimenAlimentacion = entidad.regimenAlimentacion || [];
        this.tipoPlan = entidad.tipoPlan || [];
        this.tipoTarifa = entidad.tipoTarifa || [];
        this.email = entidad.email || null;
        this.telefonos = entidad.telefonos || null;
        this.ejecutivoVentas = entidad.ejecutivoVentas || null;
        this.cuentaBancaria = entidad.cuentaBancaria || null;
        this.descripcion = entidad.descripcion || '';
        this.sistema = entidad.sistema || {};
    }
}

export const HotelConst = {
    name: 'Hotel',
    names: 'Hoteles',
    icon: 'shopping_basket',
    urlEntidades: '/apps/jumbomod/hoteles',
    urlEntidad: '/apps/jumbomod/hotel'
};

