window.addEventListener('load', navigator) 
window.addEventListener('hashchange', navigator) // La manera como se va a ejecutar el hash porque es una propiedad de window
function navigator(){
    if(location.hash.startsWith('#home')){
        homePage()
    } else if(location.hash.startsWith('#favorites')){
        imgAnimeFavorites()
    }
}

function homePage(){
    viewImgAnime()
    console.log('HOME')
}

function imgAnimeFavorites(){
    containerAnimeFav()
    console.log('FAVORITES')
}