const sw = 300;
const sh = 50;
const pixelRatio = 3;
const speed = 5;
const fps = 1000 / 120;
const PI2 = 2 * Math.PI;
let cValue = 0, mode;
let leon, controll, time, canvas, ctx;
function init() {
    var canvas=document.getElementById('myCanvas');
    ctx = canvas.getContext("2d");
    canvas.width = sw * pixelRatio;
    canvas.height = sh * pixelRatio;
    canvas.style.width = sw + 'px';
    canvas.style.height = sh + 'px';
    ctx.scale(pixelRatio, pixelRatio);
    controll = {
        size: 200,
        pathGap: 0,
        patternWidth: 2,
        visual: {},
        drawing: () => {
            let i, total = leon.drawing.length;
            for (i = 0; i < total; i++) {
                TweenMax.killTweensOf(leon.drawing[i]);
                TweenMax.fromTo(leon.drawing[i], 2, {
                    value: 0
                }, {
                    delay: i * 0.1,
                    value: 1,
                    ease: Power4.easeOut
                });
            }
        }
    };
    let ratio = Math.sqrt(sw * sw + sh * sh) / 1800;
    if (ratio > 1) ratio = 1;
    else if (ratio < 0.5) ratio = 0.5;
    leon = new LeonSans({
        text: 'welcome to pxxyyz\' blog',
        size: 50 * ratio,
        weight: 400,
        pathGap: -1,
        isPath: true
    });
    requestAnimationFrame(animate);
}
function canvasupdate() {
    ctx.clearRect(0, 0, sw, sh);
    ctx.lineWidth = 2;
    const w = controll.patternWidth * leon.scale;
    const total = leon.data.length;
    let i, p, pos, no = 0; 
    let d, j, j_total;

    for (i = 0; i < total; i++) {
        d = leon.data[i].paths;
        j_total = Math.round(d.length * leon.drawing[i].value);
        for (j = 0; j < j_total; j++) {
            pos = d[j];
            ctx.fillStyle = randomColor(no);
            ctx.strokeStyle = randomColor(no);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, w, 0, PI2);
            ctx.stroke();
            no += 1;
        }
    }
    cValue -= speed;
}
function randomColor(no) {
    return "hsl(" + (no + cValue) + ',' + '70%,' + '50%)';
}
function animate(t) {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, sw, sh);
    const x = (sw - leon.rect.w) / 2;
    const y = (sh - leon.rect.h) / 2;
    leon.position(x, y);
    if (t) {
        if (!time) time = t;
        if (t - time > fps) {
            time = t;
            canvasupdate();
        }
    }
}
window.onload = () => {
    init();
};