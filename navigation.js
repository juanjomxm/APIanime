window.addEventListener('load', navigator) 
window.addEventListener('hashchange', navigator) // La manera como se va a ejecutar el hash porque es una propiedad de window
function navigator(){
    if(location.hash.startsWith(`#favorites=${'image_id'}`)){
        animesFavorites()
    }
}

function animesFavorites(){
    containerAnimeFav()
}