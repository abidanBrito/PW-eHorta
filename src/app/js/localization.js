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
        'faq.html' : "e-Horta | FAQs",
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
        login_error : "COULD NOT LOGIN"
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
        'faq.html' : "e-Horta | Preguntas frecuentes",
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
        login_error : "ERROR AL INICIAR SESIÓN"
        
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
        'faq.html' : "e-Horta | Preguntes freqüents",
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
        login_error : "ERROR EN INICIAR SESSIÓ"
        
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