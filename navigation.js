window.addEventListener('DOMContentLoaded', navigator, false) 
window.addEventListener('hashchange', navigator, false) // La manera como se va a ejecutar el hash porque es una propiedad de window
function navigator(){
    if(location.hash.startsWith('#favorites')){
        imgAnimeFavorites()
    } else {
        homePage()
    }

function homePage(){
    viewImgAnime()
    console.log('HOME')
}

function imgAnimeFavorites(){
    containerAnimeFav()
    console.log('FAVORITES')
}
}