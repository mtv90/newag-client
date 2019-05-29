//  MANUELLE KONFIGURATION FÜR DIE REST-ENDPOINTS
//  Bitte die URLs ändern, wenn App von Local/Entwicklung in Produktiv und andersherum gehen soll

///DAFÜR GANZ UNTEN VARIABLEN AUSTAUSCHEN


/////////////////////////////////////////////////////////////////
// TERMIN-URLs für die PRODUKTIV- und die DEVELOPMENT-Umgebung 

const appointmentsProductionGET = 'https://newag-app.herokuapp.com/patient2/appointments';
const appointmentsProductionPOST = 'https://newag-app.herokuapp.com/patient2/api/appointments';


const appointmentsLocalGET = 'http://localhost:8080/patient2/appointments';
const appointmentsLocalPOST = 'http://localhost:8080/patient2/api/appointments';

/////////////////////////////////////////////////////////////////


// PATIENTEN-URLs für die PRODUKTIV- und die DEVELOPMENT-Umgebung 

const patientsProductionGET = 'https://newag-app.herokuapp.com/patient2/patients';
const patientsProductionPOST = 'https://newag-app.herokuapp.com/patient2/patients';


const patientsLocalGET = 'http://localhost:8080/patient2/api/patients';
const patientsLocalPOST = 'http://localhost:8080/patient2/patients';

///HIER BITTE VARIABLEN ÄNDERN!!!

//URLs für Termine
export const appointmentGET = appointmentsProductionGET;
export const appointmentPOST = appointmentsProductionPOST;

//URLs für Patienten
export const patientGET = patientsProductionGET;
export const patientPOST = patientsProductionPOST;