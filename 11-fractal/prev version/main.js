window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    // H-TREE Fractal

    // Canvas settings
    ctx.fillStyle = 'green';
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;

    // Effect settings
    let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
    const maxLevel = 8;   
    const branches = 2; 

    let sides = 5;
    let scale = 0.7;
    let spread = 0.6;
    let color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
    let lineWidth = Math.floor(Math.random() * 20 + 10);

    // Controls
    const randomizeBtn = document.getElementById('randomizeBtn');
    const resetBtn = document.getElementById('resetBtn');
    const slider_spread = document.getElementById('spread');
    const label_spread = document.querySelector('[for="spread"]');
    const slider_sides = document.getElementById('sides');
    const label_sides = document.querySelector('[for="sides"]');


    function drawBranch(level) {
        if(level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();

        for(let i = 0; i < branches; i++) {
            ctx.save();
            ctx.translate(size - (size / branches) * i, 0);
            ctx.scale(scale, scale);

            ctx.save();
            ctx.rotate(spread);
            drawBranch(level + 1);
            ctx.restore();
    
            /*ctx.save();
            ctx.rotate(-spread);
            drawBranch(level + 1);
            ctx.restore();*/

            ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(0, size, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawFractal() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.translate(canvas.width / 2, canvas.height / 2);        
        for(let i=0; i < sides; i++) {
            ctx.rotate((Math.PI * 2) / sides);
            drawBranch(0);
        }
        ctx.restore();
        randomizeBtn.style.backgroundColor = color;
    }

    function randomizeFractal() {
        sides = Math.floor(Math.random() * 13 + 2);
        scale = Math.random() * 0.4 + 0.4;
        spread = Math.random() * 2.9 + 0.1;
        color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
        lineWidth = Math.floor(Math.random() * 20 + 10);
    }

    function resetFractal() {
        sides = 5;
        scale = 0.5;
        spread = 0.7;
        color = 'hsl(290, 100%, 50%)';
        lineWidth = 15;
    }

    function updateSlider() {
        slider_spread.value = spread;
        label_spread.innerHTML = 'Spread: ' + Number(spread).toFixed(2);
        slider_sides.value = sides;
        label_sides.innerHTML = 'Sides: ' + sides;
    }

    updateSlider();
    drawFractal();

    randomizeBtn.addEventListener('click', () => {
        randomizeFractal();
        updateSlider();
        drawFractal();
    });

    resetBtn.addEventListener('click', () => {
        resetFractal();
        updateSlider();
        drawFractal();
    });

    slider_spread.addEventListener('change', (e) => {
        spread = e.target.value;
        updateSlider();
        drawFractal();
    });

    slider_sides.addEventListener('change', (e) => {
        sides = e.target.value;
        updateSlider();
        drawFractal();
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 10;
        drawFractal();
    });

});