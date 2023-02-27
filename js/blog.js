addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.blog-pantalla').classList.add('activo');
        document.body.style.overflow = 'auto';
    }, 300)
    AOS.init();

    const banner = document.querySelector('.banner');
    const tituloBanner = document.querySelector('.banner-titulo p');
    const volverArriba = document.querySelector('button.volver-arriba');

    addEventListener('scroll', () => {
        if (scrollY < 400) {
            banner.style.filter = `blur(${scrollY / 10}px)`;
            tituloBanner.style.transform = `translateX(${(scrollY / 2)}px)`;
        }
        
        if (scrollY < 800) volverArriba.classList.remove('activo');
        else volverArriba.classList.add('activo');
    })

    let aviso = document.createElement('div');
    aviso.classList.add('aviso-copiado')
    aviso.textContent = '¡Enlace copiado!';
    document.body.appendChild(aviso);

    /**
        EVENTO CLICK
    **/
    addEventListener('click', (e) => {
        if (e.target.matches('button.volver-arriba')) {
            scrollTo(0, 0);
        }
        
        if (e.target.matches('button.menu')) {
            e.target.classList.toggle('activo');
            document.querySelector('aside').classList.toggle('activo');
        }

        if (e.target.matches('.indice__item')) {
            document.querySelector('button.menu').classList.remove('activo');
            document.querySelector('aside').classList.remove('activo');
        }

        if (e.target.matches('.compartir__item')) {
            let red = e.target.classList[1];
            compartirRed(red);
        }

        if (e.target.matches('.frecuentes__item .icono')) {
            let clase = '.frecuentes__item.activo';
            if (document.querySelector(clase) && !e.target.parentNode.classList.contains('activo')) {
                document.querySelector(clase).classList.remove('activo');
            }
            e.target.parentNode.classList.toggle('activo');
        }
    })

    function compartirRed(red) {
        let enlace;

        if (red == 'comp-wp') {
            let mensaje = `Desarrolla una pasión por el aprendizaje. Si lo haces, nunca dejarás de crecer. Equipo Pistachos. Aprendé Programando. Visita ${location} para más información`;
            mensaje = convirtiendoEnlace(mensaje);
            enlace = 'https://api.whatsapp.com/send?text=' + mensaje;
        }

        if (red == 'comp-tw') {
            let texto = 'Desarrolla una pasión por el aprendizaje. Si lo haces, nunca dejarás de crecer.';
            texto = convirtiendoEnlace(texto);
            let url = `&url=${location}`;
            let hashtags = '&hashtags=pistachos,aprendéprogramando,educación';
            enlace = 'https://twitter.com/intent/tweet?text=' + texto + url + hashtags;
        }

        if (red == 'comp-fb') {
            enlace = 'http://www.facebook.com/sharer.php?u=' + location;
        }

        if (red == 'copy') {
            navigator.clipboard.writeText(location);
            aviso.classList.add('activo');
            setTimeout(() => aviso.classList.remove('activo'), 3000);
        } else {
            open(enlace, '_blank');
        }
    }

    function convirtiendoEnlace(str) {
        let mensaje = "";

        str = str.split(' ')
        str.forEach(str => {
            mensaje += str + '%20';
        });

        return mensaje;
    }

})