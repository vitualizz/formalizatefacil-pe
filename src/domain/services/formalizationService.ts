import { type StepFormalization } from '@/domain/entities/Merchant';

export const initialFormalizationSteps: StepFormalization[] = [
  {
    id: '1',
    title: 'Cómo registrarme en la SUNAT',
    description: 'Dirígete a SUNAT o ingresar a https://www.sunat.gob.pe. Necesitarás tu DNI y datos de tu negocio. El RUC es gratuito.',
    completed: false
  },
  {
    id: '2',
    title: 'Elegir el mejor régimen tributario',
    description: 'Selecciona entre RER, RMT o Régimen General según tus ingresos. Para pequeños negocios, el RER es lo más recomendado.',
    completed: false
  },
  {
    id: '3',
    title: 'Obtener la licencia de funcionamiento',
    description: 'Tramita en la Municipalidad de Huancayo. Requiere 5-10 días y cuesta entre S/. 50 a S/. 150.',
    completed: false
  },
  {
    id: '4',
    title: 'Abrir cuenta bancaria empresarial',
    description: 'Acude a un banco en Huancayo con tu DNI, RUC y comprobante de domicilio. Separa tus finanzas personales del negocio.',
    completed: false
  },
  {
    id: '5',
    title: 'Llevar el libro de ventas correctamente',
    description: 'Registra fecha, cliente, comprobante, descripción y montos. Puedes usar libro físico o app digital. Presenta a SUNAT mensualmente.',
    completed: false
  },
  {
    id: '6',
    title: 'Conocer los costos totales',
    description: 'Presupuesta entre S/. 200 a S/. 400 incluyendo RUC, licencia, permisos y libros. Asesoría adicional cuesta S/. 200-500.',
    completed: false
  }
];

