const mongoose = require('mongoose');
const { Schema} = mongoose;
require('mongoose-type-email');
const SistemaSchema = require('./sistema');

const FormaPagoSchema = new Schema(
  {
      efectivo: {
          disponible: Boolean,
          total: Number,
      },
    tarjetaCredito: {
      disponible: Boolean,
      porcentaje: Number
    },
    transferencia: {
      disponible: Boolean,
      costoTransferencia: Number
    }
  }
);

const CuentaBancariaSchema = new Schema({
  razonSocial: String,
  pais: String,
  nombreBeneficiario: String,
  nombreBancoBeneficiario: String,
  numeroCuenta: String,
  tipoCuenta: String,
  aba: String,
  swift: String,
  bancoIntermediario: String,
  cuentaIntermediaria: String,
  formaPago: FormaPagoSchema,
  descripcion: String,
  sistema: SistemaSchema
});

/*CuentaBancariaSchema.pre('findOne', () =>{
  // this.populate('sistema');
  this.populate('Pais');
});

CuentaBancariaSchema.pre('find', () =>{
  // this.populate('sistema');
  this.populate('Pais');
});*/

module.exports = CuentaBancariaSchema;
