/* ----------------------------------------------------------------
*   AUTHOR:         Luis Belloch
*   FILE:           localization.js
*   DATE:           15/06/2020
*   STATE:          WIP
*  ---------------------------------------------------------------- */

var arrLang = {
    'en' : {
        // Pages titles
        'index.html' : "e-Horta | Digital agriculture",
        'weather.html' : "e-Horta | Weather",
        'login.html' : "e-Horta | Login",
        'contact.html' : "e-Horta | Contact us",
        'about.html' : "e-Horta | About us",
        'access_error.html' : "e-Horta | Access error",
        'admin.html' : "e-Horta | Admin",
        'alerts.html' : "e-Horta | Alerts",
        'app.html' : "e-Horta | Graphs",
        'faqs.html' : "e-Horta | FAQs",
        'threshold.html' : "e-Horta | Thresholds",
        // El Tiempo
        weather : 'Weather',
        alerts : 'Alerts',
        thresholds : 'Thresholds',
        graph : 'Graphs',
        aemet : 'Information elaborated by AEMET',
        close_session : 'Log Out',
        today : 'Today',
        tomorrow : 'Tomorrow',
        after_tomorrow : 'After Tomorrow',
        prob : 'prob',
        wind : 'wind',
        humidty : 'humidity',
        // Landing page index
        home : "Home",
        about : "About us",
        faq : "FAQs",
        contact : "Contact",
        login : "Login",
        slogan : "Agriculture from the future has arrived",
        costs : "Reduce costs and production time, increase harvest.",
        know_us : "Get to know us",
        offer : "What we offer",
        capacities : "Discover what our app can do",
        multifunction : "Multifunction",
        multifunction_txt : "Graphs, alerts, thresholds, geolocalized drones and much more",
        fast : "Fast",
        fast_txt : "Consult real-time data anytime",
        multiplatform : "Multiplatform",
        multiplatform_txt : "Access our app from any device",
        contact_us : "Contact us now",
        measure : "Available data",
        measure_txt : "We get data from this magnitudes",
        temperature : "Temperature",
        luminosity : "Luminosity",
        salinity : "Salinity",
        humidity : "Humidity",
        preassure : "Preassure",
        precipitation : "Precipitation",
        gps : "GPS",
        anti_theft : "Anti-theft",
        reviews_title : "Reviews",
        reviews_txt : "Discover our users opinions",
        review_1 : '"It reduces work hours, optimizing farming techniques."',
        review_2 : '"A wise choice! In a year I have improved production a 15%"',
        review_3 : '"Now I can manage my fields from anywhere with e-Horta."',
        // Contacto
        attend : "We are available monday to friday from 8:00 AM to 4:00 PM.",
        doubts : "Tell us your doubts and questions.",
        // Login
        hello : "Hello there!",
        log_in : "Access",
        forgot : "Don't remember your password? ",
        click : "Click here.",
        still_not : "Still not a client? ",
        password : "Password",
        login_error : "COULD NOT LOGIN",
        // FAQs
        general : "General",
        problems : "Problems",
        faq_1 : "What does e-Horta do?",
        faq_1_t : "e-Horta is a probe management tool. It will receive data from your agricultural probes and show it to you instantly in organised graphs. You can also stablish thresholds and e-Horta will warn you when they are surpassed.",
        faq_2 : "Minium requirements",
        faq_2_t : "You only need some probes and internet connection to use e-Horta. It can be accessed from any device and anytime, though the presented information might vary.",
        faq_3 : "How do I register?",
        faq_3_t : "Contact us and we will visit your fields to install top-notch agricultural probes, then we will give you an user and password to access the app freely.",
        faq_4 : "I can't access the app",
        faq_4_t : "Make sure your credentials are correct or if you don't remember them, press the button below login to restore your password.",
        faq_5 : "My fields are not showing",
        faq_5_t : "Reload the page. If the problem persists contact us to get personalized help.",
        faq_6 : "One of my probes is not working. What should I do?",
        faq_6_t : "Make sure the probe is powered. If the solar panel is dirty, you can clean it, if its broken or the problem persists contact us to get personalized help.",
        faq_7 : "Payment methods and rates",
        faq_7_t : "Payment is negotiated when contracting e-Horta service. It is meant to be a monthly rate of a fixed price per probe.",
        faq_8 : "Privacy policy",
        faq_8_t : "We are very concerned about our clients private data. We will not sell it to third party members and it will only be used for this app purposes.",
        video : "You can see how e-Horta works in this video: ",
        cant_find : "Didn't find what you were searching for?",
        // About
        we_are : "Who we are",
        we_are_txt : "<p class='about_p'>The work team for the realization of this project is formed by a group of first-year GTI students.</p><p class='about_p'>The result is the fruit of trust and commitment that we have all had in carrying it out, assuming responsibility for the tasks we had been assigned and collaborating with each other when problems came up.</p><p class='about_p'>The project that has been carried out is an agricultural management web page, which allows the user to be able to visualize different data easily and quickly, in addition to making comparisons, adjusting thresholds and seeing the weather prediction among other functionalities. This application manages to offer a comfortable and easy to use service for the user.</p>"
    },
    'es' : {
        // Pages titles
        'index.html' : "e-Horta | Agricultura digital",
        'weather.html' : "e-Horta | El Tiempo",
        'login.html' : "e-Horta | Inciar sesión",
        'contact.html' : "e-Horta | Contacto",
        'about.html' : "e-Horta | Nostros",
        'access_error.html' : "e-Horta | Error de acceso",
        'admin.html' : "e-Horta | Administrador",
        'alerts.html' : "e-Horta | Alertas",
        'app.html' : "e-Horta | Gráficas",
        'faqs.html' : "e-Horta | Preguntas frecuentes",
        'threshold.html' : "e-Horta | Umbrales",
        // El Tiempo
        weather : 'El Tiempo',
        alerts : 'Alertas',
        thresholds : 'Umbrales',
        graph : 'Gráficas',
        aemet : 'Información elaborada por la Agencia Estatal de Meteorología',
        close_session : 'Cerrar Sesión',
        today : 'Hoy',
        tomorrow : 'Mañana',
        after_tomorrow : 'Pasado Mañana',
        prob : 'prob',
        wind : 'viento',
        humidty : 'humedad',
        // Landing page index
        home : "Inicio",
        about : "Nosotros",
        faq : "FAQs",
        contact : "Contacto",
        login : "Iniciar sesión",
        slogan : "La agricultura del futuro ha llegado",
        costs : "Reduce costes y tiempos de producción, aumenta la cosecha.",
        know_us : "Conócenos",
        offer : "Ofrecemos",
        capacities : "Descubre las capacidades de nuestra aplicación",
        multifunction : "Multifunción",
        multifunction_txt : "Gráficas, alertas, umbrales, sondas geolocalizadas y mucho más.",
        fast : "Rápido",
        fast_txt : "Revisa los datos en tiempo real en cualquier momento.",
        multiplatform : "Multiplataforma",
        multiplatform_txt : "Accede a la aplicación desde cualquier plataforma.",
        contact_us : "Ponte en contacto",
        measure : "Medimos",
        measure_txt : "Recopilamos datos de muchas magnitudes",
        temperature : "Temperatura",
        luminosity : "Luminosidad",
        salinity : "Salinidad",
        humidity : "Humedad",
        preassure : "Presión",
        precipitation : "Precipitación",
        gps : "GPS",
        anti_theft : "Antirrobo",
        reviews_title : "Opiniones",
        reviews_txt : "Descubre la opinión de nuestros usuarios",
        review_1 : '"Ahorra muchas horas de trabajo, optimizando las técnicas de cultivo."',
        review_2 : '"¡Todo un acierto! En un año ha mejorado la producción un 15%."',
        review_3 : '"Ahora puedo gestionar mis tierras desde cualquier sitio con e-Horta."',
        // Contacto
        attend : "Te atendemos de lunes a viernes de 8:00 a 16:00 h.",
        doubts : "Haznos llegar tus dudas e inquietudes.",
        // Login
        hello : "¡Hola de nuevo!",
        log_in : "Entrar",
        forgot : "¿Olvidaste tu contraseña? ",
        click : "Pulsa aquí.",
        still_not : "¿Aún no eres cliente? ",
        password : "Contraseña",
        login_error : "ERROR AL INICIAR SESIÓN",
        // FAQs
        general : "General",
        problems : "Problemas",
        faq_1 : "¿Qué hace e-Horta?",
        faq_1_t : "e-Horta es un servicio de administración de sondas. Recibirá datos de tus sondas agrarias y te los mostrará al instante en cómodas gráficas. Además, puedes establecer umbrales y te avisará cuando no se cumplan.",
        faq_2 : "Requisitos mínimos",
        faq_2_t : "Solo necesitas unas cuantas sondas y conexión a Internet para utilizar e-Horta. Puedes acceder desde cualquier dispositivo, aunque la cantidad de información presentada puede variar.",
        faq_3 : "¿Cómo me registro?",
        faq_3_t : "Contáctanos y visitaremos tus campos contigo para instalar sondas agrarias de la mejor categoría, entonces te daremos un usuario y contraseña para que puedas acceder a la aplicación cuando quieras.",
        faq_4 : "No puedo acceder",
        faq_4_t : "Asegurate de las credenciales son correctas o si no las recuerdas pulsa recuperar contraseña.",
        faq_5 : "No se muestran mis parcelas",
        faq_5_t : "Recarga la página. Si el problema no se ha solucionado, por favor, contacta con el servio técnico.",
        faq_6 : "Una de mis sondas no funciona. ¿Qué hago?",
        faq_6_t : "Compruebe que la sonda recibe energía, esto se pude revisar observando el panel solar de la sonda, si esta obstruido o sucio limpie el panel. Si el problema no se ha solucionado contacte con el servicio técnico.",
        faq_7 : "Método de pago y tasas",
        faq_7_t : "El pago es negociado al contratar los servicio de e-Horta. Será una tasa mensual para el mantenimiento de las sondas a un precio por sonda.",
        faq_8 : "Política de privacidad",
        faq_8_t : "Estamos muy preocupados por la privacidad de nuestros clientes. No venderemos tus datos a ningún tercero y solo se usaran para el uso de la aplicación.",
        video : "Puedes ver como funciona la aplicación desde este video: ",
        cant_find : "¿No encuentras lo que buscas?",
        // About
        we_are : "¿Quiénes somos?",
        we_are_txt : "<p class='about_p'>El equipo de trabajo para la realización de este proyecto está formado por un grupo de estudiantes de primer año de GTI.</p><p class='about_p'>El resultado es fruto de la confianza y compromiso que hemos tenido todos en la realización del mismo, asumiendo la responsabilidad de las tareas que teníamos asignadas y colaborando entre todos cuando los problemas salían a flote.</p><p class='about_p'>El proyecto que se ha realizado es el de una página web de gestión agrícola, que permite al usuario poder visualizar diferentes datos de forma sencilla y rápida, además de realizar comparaciones, ajustar umbrales y ver el tiempo entre otras funcionalidades.  Esta aplicación consigue ofrecer un servicio cómodo y fácil de usar para el usuario.</p>"
        
    },
    'val' : {
        // Pages titles
        'index.html' : "e-Horta | Agricultura digital",
        'weather.html' : "e-Horta | El Temps",
        'login.html' : "e-Horta | Iniciar sessió",
        'contact.html' : "e-Horta | Contacte",
        'about.html' : "e-Horta | Nosaltres",
        'access_error.html' : "e-Horta | Error d'accés",
        'admin.html' : "e-Horta | Administrador",
        'alerts.html' : "e-Horta | Alertes",
        'app.html' : "e-Horta | Gràfiques",
        'faqs.html' : "e-Horta | Preguntes freqüents",
        'threshold.html' : "e-Horta | Umbrals",
        // El Tiempo
        weather : "L'Oratge",
        alerts : 'Alertes',
        thresholds : 'Umbrals',
        graph : 'Gràfiques',
        aemet : "Informació elaborada per l'Agencia Estatal de Meteorología",
        close_session : 'Tancar Sessió',
        today : 'Hui',
        tomorrow : 'Demà',
        after_tomorrow : 'Despusdemà',
        prob : 'prob',
        wind : 'vent',
        humidty : 'humitat',
        // Landing page index
        home : "Inici",
        about : "Nosaltres",
        faq : "FAQs",
        contact : "Contacte",
        login : "Iniciar sessió",
        slogan : "L'agricultura del futur ha aplegat",
        costs : "Reduix costos y temps de producció, aumenta la collita.",
        know_us : "Coneix-nos",
        offer : "Oferim",
        capacities : "Descobrix les capacitats de la nostra aplicació",
        multifunction : "Multifunció",
        multifunction_txt : "Gràfiques, alertes, umbrals, sondes geolocalisadess y molr més.",
        fast : "Ràpit",
        fast_txt : "Revisa les dates en temps real en qualsevol moment.",
        multiplatform : "Multiplataforma",
        multiplatform_txt : "Accedix a l'aplicació des de qualsevol plataforma.",
        contact_us : "Posat en contacte",
        measure : "Mesurem",
        measure_txt : "Recopilem dates de moltes magnituds",
        temperature : "Temperatura",
        luminosity : "Lluminositat",
        salinity : "Salinitat",
        humidity : "Humitat",
        preassure : "Pressió",
        precipitation : "Precipitació",
        gps : "GPS",
        anti_theft : "Antirrobament",
        reviews_title : "Opinions",
        reviews_txt : "Descobrix les opinions dels nostres usuaris",
        review_1 : '"Estalvia moltes hores de treball, optimisant les tècniques de cultiu."',
        review_2 : '"Tot un encert! En un any ha millorat la producció un 15%."',
        review_3 : '"Ara puc gestionar els meus camps des de qualsevol lloc en e-Horta."',
        // Contacto
        attend : "T'atenem de dilluns a divendres de 8:00 a 16:00 h.",
        doubts : "Fes-nos aplegar els teus dubtes i inquietuts.",
        // Login
        hello : "Benvingut!",
        log_in : "Accedir",
        forgot : "No recordes la teua contrasenya? ",
        click : "Pulsa ací.",
        still_not : "Encara no eres client? ",
        password : "Contrasenya",
        login_error : "ERROR EN INICIAR SESSIÓ",
        // FAQs
        general : "General",
        problems : "Problemes",
        faq_1 : "Què fa e-Horta?",
        faq_1_t : "e-Horta es un serveï d'administració de sondes. Rebrà dates de les teues sondes agràries y te'ls mostrarà al instant en cómodes gràfiques. A més, pots establir umbrals i t'avisarà quan no es complixquen.",
        faq_2 : "Requisits mínims",
        faq_2_t : "Només necessitaràs unes sondes i conexió a Internet per a usar e-Horta. Es pot gastar des de qualsevol dispositiu encara que la quantitat de informació mostrada pot variar.",
        faq_3 : "Com em registre?",
        faq_3_t : "Contàctans y visitaremes els teus camps contigo per a instalar sondes agràries de la millor categoria, després et donarem un usuari y contrasenya per a que pugues accedir a l'aplicació quan vulgues.",
        faq_4 : "No puc accedir",
        faq_4_t : "Assegura't de que les credencials son correctes o si no les recordes prem recuperar contrasenya.",
        faq_5 : "No es mostren les meues parceles",
        faq_5_t : "Recarrega la pàgina. Si el problema persistix, contacta amb el serveï tècnic.",
        faq_6 : "Una de les sondes no funciona. Què faig?",
        faq_6_t : "Comprova que la sonda rep energia. Si la placa solar està bruta, pots netejar-la. Si el problema persistix, contacta amb el serveï tècnic.",
        faq_7 : "Métode de pagament y tases",
        faq_7_t : "El pagament és negocia quan es contracta el serveï. És una tasa mensual dedicada al manteniment de les sondes.",
        faq_8 : "Política de privacitat",
        faq_8_t : "Estem preocupats per la privacitat dels nostres usuaris. No es vendràn a tercer i només es gastaràn per al funcionament de l'aplicació.",
        video : "Pots vore com funciona l'aplicació ací: ",
        cant_find : "¿No trobes el que busques?",
        // About
        we_are : "¿Qui som?",
        we_are_txt : "<p class='about_p'>L'equip de treball d'aquest projecte està format per un grup d'estudiants de primer de GTI.</p><p class='about_p'>El resultat es fruit de la confiança i el compromís de totos en la realització del mateix, assumint la responsabilitat de les tasques assignades i col·laborant entre tots quan hi hagueren problemes.</p><p class='about_p'>El projecte que s'ha realitzat és una pàgina web de gestió agrícola, que permés a l'usuari visualitzar dates de forma senzilla i ràpida, a més de fer comparacións, ajustar umbrals i consultar l'oratge. Esta plicació aconseguix un serveï còmode i fàcil d'usar per a l'usuari.</p>"
        
    }
};
// Buttons call this and reload the page
function changeLang(lang) {
    // Define el idioma en el almacenamiento local
    localStorage.setItem("lang", lang);
}

// Called when page reloaded to translate everything
function prepareTranslation() {
    const button = document.getElementById('globe-icon');
    const tooltip = document.getElementById('lang-selector');
    tooltip.style.display = "none";
    // Cuando se pulsa el icono del globo, se abre o cierra el tooltip
    button.onclick = function() {
        if(tooltip.style.display != "block") {
            tooltip.style.display = "block";
        } else {
            tooltip.style.display = "none";
        }
    };
    // Sets the language page to the stored one
    let lang = localStorage.getItem("lang");
    // If there is no language stored it puts spanish as default
    if(localStorage.getItem("lang") === null) {
        lang = "es"
    }
    translate(lang);
}

// In a separate function for code clarity
function translate(lang) {
    // lang will be its id, which is the language chosen
    // searches for all items with class="lang" and changes its text to the one associated within their "key" to the variable arrLang
    let texts = document.getElementsByClassName('lang')
    let translation = arrLang[lang]
    Array.prototype.forEach.call(texts, item => {
        item.innerHTML = translation[item.id]
    })
    // Traduce las excepciones como placeholders que no pueden accederse con el metodo anterior
    let page = window.location.pathname.split("/").pop();
    if(page == "login.html") {
        let passwordPlaceholder = document.getElementById("password");
        passwordPlaceholder.placeholder += translation[passwordPlaceholder.id];
    }
    // Traduce los titulos de las paginas
    document.title = translation[page];
    
    // Cierra el tooltip
    const tooltip = document.getElementById('lang-selector');
    tooltip.style.display = "none";
}

// Start page
prepareTranslation();