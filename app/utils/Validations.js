/** Aqui voy a crear todas las funciones que van a realizar las validaciones de los datos que van a firebase */

// Creo la función para validar el email la cual recibe por parametro el String
export function validateEmail (email) {
  // Creamos la expresión regular para validar el email
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  // Devolverá false en case de que email sea incorrecto y true en caso de que el email sea correcto
  return re.test(email)
}
