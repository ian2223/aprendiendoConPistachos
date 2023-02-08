/**
    SLIDER
**/
let slider = [
    {
        titulo: 'moti-vación',
        descripcion: `
            Los motivos que incitan la falta de motivación ante el estudio suelen
            ser muy diversos, como considerar que aquello que estudias no te será necesario, que
            simplemente lo que estudies te resulte aburrido, que creas que aunque estudies no vas a poder sacar la
            calificación que quieres, etc... ¿qué hacer cuando no quieres estudiar? ¿De dónde sacar el
            interés para estudiar?
        `,
        duracion: 20,
    },
    {
        titulo: 'pas-ión',
        descripcion: `
            Puede ser un tema en concreto, un método de aprendizaje, un espacio de
            trabajo. Se trata de buscar aquello que encienda la chispa de la motivación, algo que llame
            tu atención y despierte el interés que tienes por aprender.
        `,
        duracion: 15,
    },
    {
        titulo: 'concen-tración',
        descripcion: `
            Realiza sesiones de descanso, evita utilizar el celular, estudia en un
            lugar limpio, organizado y silencionso pero sobretodo pregúntate constantemente cómo te
            estas acercando a tu objetivo de estudio y si lo estás logrando. Esto mantendrá tu mente
            enfocada en las mejorías, en las estrategias para alcanzar tu objetivo y evitarás que tu
            mente se disperse.
        `,
        duracion: 18,
    },
    {
        titulo: 'or-den',
        descripcion: `
            Haz un diario semanal en dónde apuntes en qué horario estudiarás que
            cosa, que actividades extras al estudio tienes que hacer y especificaciones de las obras que
            tienes que estudiar. Habrá días que no puedas seguirlo al pie de la letra pero tener un
            orden de vida y estudio evitará la incertidumbre y frustración de que no tengas tiempo de
            estudiar.
        `,
        duracion: 18,
    },
    {
        titulo: 'confi-anza',
        descripcion: `
            Sabemos que los pensamientos juegan un papel principal en la motivación y
            por ello, es imprescindible que te ofrezcas a vos mismo pensamientos positivos como:
            “sé que voy a superar este examen; si los demás lo han conseguido por qué yo no; ya me he
            enfrentado a esto, confío en mis capacidades…” estos pensamientos te ayudarán
            considerablemente a mantener tu motivación para estudiar.
        `,
        duracion: 20,
    },
]

slider.forEach(item => {
    let div = document.createElement('div');
    div.classList.add('slider__item');
    div.setAttribute('duracion', item.duracion);
    document.querySelector('.slider').appendChild(div);

    let titulo = item.titulo.split('-');
    div.innerHTML = `
    <h2 style="--delay: 1;"><span>${titulo[0]}</span>${titulo[1]}</h2>
        <p style="--delay: 2;">${item.descripcion}</p>
        <a style="--delay: 3;" href="./blog.html" class="btn-bubble" cursor-hover>
            <span></span><span></span>
            <p>Visitar el blog</p>
        </a>
    `;
})

addEventListener('load', () => {
    // preloader
    document.querySelector('.preloader').classList.add('cargado');
    document.body.style.overflow = 'auto';
    AOS.init();
    
    let referencias = [];
    document.querySelectorAll('.referencia__item').forEach(item => {
        referencias.push(item.textContent);
    })

    /**
        EVENTO CLICK
    **/
    addEventListener('click', (e) => {
        if (e.target.matches('.referencia__item')) {
            let nombre = e.target.textContent;
            referencias.forEach((item, index) => {
                if (nombre == item) {
                    pasarSlider(index);
                }
            })
        }
    })

    const sliderItems = document.querySelectorAll('.slider__item');
    sliderItems[0].setAttribute('revelar', '');
    let sliderItemActivo = document.querySelector('[revelar]');
    let imagenActiva = document.querySelector('.slider__image[activo]');
    const imagenesSlider = document.querySelectorAll('.slider__image');
    let posActual = 0;

    let autoSlideInterval, tiempoSlide = 20500;
    const autoSlide = function () {
        let duracion = sliderItemActivo.getAttribute('duracion');
        tiempoSlide = parseInt(duracion) * 1000 + 500;
        
        autoSlideInterval = setInterval(() => {
            if (posActual != 4) pasarSlider(posActual + 1);
            else pasarSlider(0);
        }, tiempoSlide)
    }
    autoSlide();


    function pasarSlider(pos) {
        // reinicio
        clearInterval(autoSlideInterval);
        posActual = pos;
        document.querySelector('.referencia__item.activo').classList.remove('activo');
        document.querySelectorAll('.referencia__item')[pos].classList.add('activo');
        sliderItemActivo.removeAttribute('revelar');
        imagenActiva.removeAttribute('activo');

        // definir siguiente
        sliderItemActivo = sliderItems[pos];
        imagenActiva = imagenesSlider[pos];

        // animar
        sliderItemActivo.setAttribute('revelar', '');
        imagenActiva.setAttribute('activo', '')

        // reiniciar contador
        autoSlide();
    }


    /**
        NAV
    **/
    const nav = document.querySelector('nav');

    addEventListener('scroll', () => {
        if (scrollY >= 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    })


    /** 
        TRANSICIÓN AL VISITAR EL BLOG 
    **/
    const botonesBlog = document.querySelectorAll('.slider__item a');
    const transicion = document.querySelector('.cuadro-transicion');


    botonesBlog.forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            let ruta = e.target.href;
            transicion.classList.add('activo');

            setTimeout(() => {
                location.href = ruta;
            }, 500)
        })
    })
})