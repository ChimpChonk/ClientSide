const btnOff = document.getElementById('btnOff');
const btnOn = document.getElementById('btnOn');
const imgLight = document.getElementById('imgLight');

btnOn?.addEventListener('click', (e) => {
    let contact = confirm("turn on the light?");
    if (contact) {
    imgLight.src = '../img/pic_bulbon.gif';
    imgLight.className = "tiltDown";
    }
});

btnOff?.addEventListener('click', (e) => {
    let contact = confirm("turn off the light?");
    if (contact) {
    imgLight.src = '../img/pic_bulboff.gif';
    //imgLight?.classList.toggle("tiltRight");
    imgLight.className = "tiltUp";
    }

});