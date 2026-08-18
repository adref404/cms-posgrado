import {
  MdCampaign,
  MdQuiz,
  MdRecordVoiceOver,
  MdEmojiEvents,
  MdHowToReg,
  MdAutorenew,
  MdPersonAdd,
  MdGroups,
  MdMenuBook,
  MdEdit,
  MdBookmarkAdded,
  MdCancel,
  MdFlag,
  MdGrade,
  MdSchedule,
  MdSchool,
  MdPayment,
  MdCheckCircle,
  MdEvent,
  MdAssignment,
  MdWarning,
} from "react-icons/md";

// Íconos disponibles para el selector del panel admin al crear/editar un
// hito del cronograma (de Admisión o Académico). La clave es exactamente
// lo que se guarda en la columna "icono" de Supabase (texto plano); si
// algún registro trae un nombre que no está en esta lista (borrado del
// código, error de tipeo desde antes), ICONO_POR_DEFECTO cubre el hueco
// para que nunca rompa el render — ver hooks/useCronograma.js.
export const ICONOS_CRONOGRAMA = {
  MdCampaign,
  MdQuiz,
  MdRecordVoiceOver,
  MdEmojiEvents,
  MdHowToReg,
  MdAutorenew,
  MdPersonAdd,
  MdGroups,
  MdMenuBook,
  MdEdit,
  MdBookmarkAdded,
  MdCancel,
  MdFlag,
  MdGrade,
  MdSchedule,
  MdSchool,
  MdPayment,
  MdCheckCircle,
  MdEvent,
  MdAssignment,
  MdWarning,
};

export const ICONO_POR_DEFECTO = MdSchedule;

// Lista para el <select> del formulario admin: nombre guardable + el
// propio componente, para pintar una vista previa junto a cada opción.
export const OPCIONES_ICONO = Object.keys(ICONOS_CRONOGRAMA).map((nombre) => ({
  nombre,
  Icono: ICONOS_CRONOGRAMA[nombre],
}));
