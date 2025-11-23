export interface Question {
  question: string;
  answer: string;
}

export const questionsMentor: Question[] = [
  {
    question: '¿Cómo registrarme en la SUNAT?',
    answer: 'Debes dirigirte a las oficinas de SUNAT en Huancayo o ingresar a https://www.sunat.gob.pe. Necesitarás tu DNI y datos de tu negocio. El proceso es gratuito para personas naturales. Se recomienda ir presencialmente para mayor asesoría.'
  },
  {
    question: '¿Cuál es el mejor régimen tributario para mi negocio?',
    answer: 'Existen tres opciones: RER (Régimen Especial - para pequeños negocios), RMT (Régimen Mype) y Régimen General. Para negocios informales pequeños, el RER es ideal. La SUNAT te ayudará a elegir según tus ingresos.'
  },
  {
    question: '¿Cómo obtener la licencia de funcionamiento?',
    answer: 'Debes dirigirte a la Municipalidad Provincial de Huancayo. Necesitarás tu DNI, solicitud de licencia y un plano de ubicación de tu local. El trámite dura entre 5 a 10 días hábiles y cuesta entre S/. 50 a S/. 150.'
  },
  {
    question: '¿Qué bancos ofrecen cuentas empresariales en Huancayo?',
    answer: 'Los principales bancos son: BCP, Scotiabank, Interbank, BBVA, Banco Regional. Necesitarás tu DNI, RUC y comprobante de domicilio fiscal. Muchos tienen oficinas en Huancayo o cuentas virtuales.'
  },
  {
    question: '¿Cómo llevar el libro de ventas correctamente?',
    answer: 'Puedes usar un libro físico o digital. Debes registrar: fecha, cliente, número de comprobante, descripción, monto e impuesto. SUNAT requiere que lo presentes mensualmente. Muchas apps te ayudan a hacerlo gratis.'
  },
  {
    question: '¿Cuánto cuesta todo el proceso de formalización?',
    answer: 'Aproximadamente S/. 200 a S/. 400: RUC (gratis), Licencia de funcionamiento (S/. 50-150), Permisos adicionales (S/. 50-100), Libros contables (S/. 30-50). Si contratas asesoría, añade S/. 200 a S/. 500.'
  }
];

export const getMentorAnswer = (questionIndex: number): string => {
  if (questionIndex >= 0 && questionIndex < questionsMentor.length) {
    return questionsMentor[questionIndex].answer;
  }
  return 'Lo siento, no tengo una answer para esa question.';
};
