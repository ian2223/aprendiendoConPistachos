addEventListener('load', () => {
    const cursor = document.querySelector('.punto-cursor');
    const circuloCursor = document.querySelector('.circulo-cursor')

    document.addEventListener('mousemove', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
        cursor.style.opacity = '1';
    });

    document.addEventListener('mousemove', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        circuloCursor.style.left = x + 'px';
        circuloCursor.style.top = y + 'px';
        circuloCursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function () {
        cursor.style.opacity = '0';
        circuloCursor.style.opacity = '0';
    })

    const hoverElements = document.querySelectorAll('[cursor-hover]');

    hoverElements.forEach(item => {
        item.addEventListener('mouseover', () => {
            cursor.classList.add('hover');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    })
})