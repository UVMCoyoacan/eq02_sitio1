function insertarMenus() {
    crearMenu();
    crearFooter();

}
function crearMenu() {
    //rutas
    const rutas = ["../index.html", "../sec_tienda/tienda.html",
        "../sec_contacto/contacto.html", "../sec_nosotros/nosotros.html",
        "../sec_inicioSesion/iniciarSesion.html"];
    const rutasIMG = ["../ims/logo.jpeg", "../ims/Iconos/hamburguer.svg", "../ims/Iconos/close.svg", "../ims/Iconos/login.svg"];
    const titulos = ["Inicio", "Tienda", "Contacto", "Acerca de nosotros"];
    //variables
    var listaItems = [];
    var listaLinks = [];
    //elementos html
    const header = document.getElementById("menu");
    const nav = document.createElement("nav");
    nav.className = "nav container";
    nav.id = "nav";
    const logo = document.createElement("a");
    logo.href = rutas[0];
    const imgLogo = document.createElement("img");
    imgLogo.src = rutasIMG[0];
    imgLogo.className = "nav-logo";
    logo.appendChild(imgLogo);
    const titulo = document.createElement("h4");
    titulo.innerHTML = "Beauty Shop MX";
    titulo.className = "nav-title";
    const lista = document.createElement("ul");
    lista.className = "nav-links";
    for (let i = 0; i < rutas.length; i++) {
        const li = document.createElement("li");
        li.className = "nav-item";
        const enl = document.createElement("a");
        enl.className = "nav-link";
        enl.href = rutas[i];
        if (i < rutas.length - 1) {
            enl.innerHTML = titulos[i];
        }
        else {
            const logoIS = document.createElement("img");
            logoIS.src = rutasIMG[3];
            enl.appendChild(logoIS);
        }
        listaItems.push(li);
        listaLinks.push(enl);
        listaItems[i].appendChild(listaLinks[i]);
    }
    for (let i = 0; i < listaItems.length; i++) {
        lista.appendChild(listaItems[i]);
    }

    //agregar hamburguesa y cerrar
    const hamb = document.createElement("a");
    hamb.href = "#nav";
    hamb.className = "nav-hamburguesa";
    const hambICN = document.createElement("img");
    hambICN.src = rutasIMG[1];
    hambICN.className = "nav-icon";
    hamb.appendChild(hambICN);

    const cerrar = document.createElement("a");
    cerrar.href = "#";
    cerrar.className = "nav-close";
    const cerrarICN = document.createElement("img");
    cerrarICN.src = rutasIMG[2];
    cerrarICN.className = "nav-icon";
    cerrar.appendChild(cerrarICN);



    //agregar items al contenedor


    nav.appendChild(logo);
    nav.appendChild(titulo);
    nav.appendChild(lista);
    nav.appendChild(hamb);
    nav.appendChild(cerrar);
    header.appendChild(nav);

}
function crearFooter(){
    const enlaces=["tel:+525545538595","mailto:jessicafdz02@outlook.com","https://www.instagram.com/beautyshopmx02/",
    "https://www.facebook.com/profile.php?id=100091941377168","https://chat.whatsapp.com/JEiBSMUKyuzBxZ9lKkKDee",
    "https://www.tiktok.com/@beautyshopmx02?_t=8cDjYBdsVPR&_r=1"];
    const rutasIMG=["../ims/Iconos/instagram.svg","../ims/Iconos/facebook.svg",
    "../ims/Iconos/whatsapp.svg","../ims/Iconos/tiktok.svg"];
    var listaUL=[];
    var listaEnlacesRS=[];

    const footer=document.getElementById("menu-footer");
    const nav=document.createElement("nav");
    nav.className="nav container footer-cont";
    nav.id="nav";
    const info=document.createElement("div");
    info.className="footer-contacto";
    const titulo=document.createElement("h2");
    titulo.className="nav-title";
    titulo.innerHTML="Beauty Shop MX";
    info.appendChild(titulo);

    //seccion de contacto
    const contactos=document.createElement("p");
    contactos.innerHTML="Teléfono: ";
    const tel=document.createElement("a");
    tel.href=enlaces[0];
    tel.target="_blank";
    tel.className="nav-link2";
    tel.innerHTML="55-4553-8595";
    contactos.appendChild(tel);
    contactos.appendChild(document.createElement("br"));
    contactos.innerHTML+="Correo: ";
    const mail=document.createElement("a");
    mail.href=enlaces[1];
    mail.target="_blank";
    mail.className="nav-link2";
    mail.innerHTML="jessicafdz02@outlook.com";
    contactos.appendChild(mail);
    info.appendChild(contactos);
    nav.appendChild(info);
    

    //seccion de redes sociales
    const listaRS=document.createElement("ul");
    listaRS.className="nav-links2";
    for(let i=0;i<4;i++)
    {
        const item=document.createElement("li");
        item.className="nav-item2";
        listaUL.push(item);
        const enlaceRS=document.createElement("a");
        enlaceRS.href=enlaces[i+2];
        enlaceRS.target="_blank";
        enlaceRS.className="nav-link2";
        const icono=document.createElement("img");
        icono.src=rutasIMG[i];
        icono.className="footer-icono";
        enlaceRS.appendChild(icono);
        listaEnlacesRS.push(enlaceRS);
        listaUL[i].appendChild(listaEnlacesRS[i]);
        listaRS.appendChild(listaUL[i]);
        nav.appendChild(listaRS);

        //agregar todo al footer
        footer.appendChild(nav);
    }


    


}