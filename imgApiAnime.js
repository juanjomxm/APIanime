function initApp(){
    let sectionImages = document.getElementById('section-home')
    sectionImages.style.display = 'none'

    let sectionFavorites = document.getElementById('anime-favorite')
    sectionFavorites.style.display = 'none'

    let titleFavorites = document.getElementById('title-favorites')
    titleFavorites.style.display = 'none'
}

const apiImagesAnime = axios.create({
    baseURL: 'https://api.waifu.im/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
        'Accept-Version': 'v5',
        'Authorization': 'Bearer qfFOspVSC27qyYMEaNMEmTdykJVCXh2Ie2Whb7zPhlLK18CEgBq6htApKD36OhSIpbqO98limoxFcjJsekEw3wBzsgw2zP0uGbNTohhJE2MjfSUJrVq6td8ZR4ujmitnv1ybrU56bdAA5gedpADQcdMCFN_xAuM2VXlBgIP-3JU'
    }
})

let inputCategory = document.getElementById('category-images')

function searchCategoryImages(){

        if(inputCategory.value){        
            let sectionImages = document.getElementById('section-home')
            sectionImages.style.display = 'block'
            viewImgAnime()
        } else{
            let sectionImages = document.getElementById('section-home')
            sectionImages.style.display = 'none'
        }
}

async function viewImgAnime(){
    const {data, status} = await apiImagesAnime.get(`/search?many=1&included_tags=${inputCategory.value}`)

    if(status == 200){
        const imgAnime = document.querySelector("#image-anime")
        const imgAnime2 = document.querySelector("#image-anime2")
        const btnAnime1 = document.getElementById('btnAnime1')
        const btnAnime2 = document.getElementById('btnAnime2')

            imgAnime.src = data.images[0].url
            imgAnime.width = 400
            imgAnime.height = 400

            imgAnime2.src = data.images[1].url
            imgAnime2.width = 400
            imgAnime2.height = 400

            btnAnime1.onclick = () => editAnimeFav(data.images[0].image_id)
            btnAnime2.onclick = () => editAnimeFav(data.images[1].image_id)
    } else{
        console.log(`Hubo un error : ${status}`)
    }
}
//viewImgAnime()

const sectionAnime = document.querySelector("#anime-favorite")

async function containerAnimeFav(){
    let sectionFavorites = document.getElementById('anime-favorite')
    sectionFavorites.style.display = 'block'
    const {data, status} = await apiImagesAnime.get('/fav?many=1')
    sectionAnime.innerHTML = ""

    if(status == 200,201){
        data.images.forEach(item =>{
            const articuleAnime = document.createElement("articule")
            const imgAnime = document.createElement("img")
            const btnAnime = document.createElement("button")
            const btnTextAnime = document.createTextNode("Eliminar")
        
            imgAnime.width = 400
            imgAnime.height = 400
            imgAnime.src = item.url
            btnAnime.appendChild(btnTextAnime)
            articuleAnime.appendChild(imgAnime) 
            articuleAnime.appendChild(btnAnime)
            btnAnime.onclick = () => deleteAnimeFavorite(item.image_id)
            sectionAnime.appendChild(articuleAnime)
        })
    } else{
        alert('No hay mas imagenes')
    }
    console.log(data)
}
containerAnimeFav()

async function editAnimeFav(id){
    let sectionFavorites = document.getElementById('anime-favorite')
    sectionFavorites.style.display = 'flex'
    let titleFavorites = document.getElementById('title-favorites')
    titleFavorites.style.display = 'flex'

    const {data, status} = await apiImagesAnime.post(`/fav/insert?${id}`,{
        image_id: id
    })

        if(status == 200,201){
            containerAnimeFav()  
            console.log(data)
        } else {
            console.log(`Falla catastrofica: ${status.code}`)
        }
}

async function deleteAnimeFavorite(id){
    const {data, status} = await apiImagesAnime.post(`/fav/toggle?${id}`,{
        image_id: id
    })

        if(status == 200,201){
            containerAnimeFav()
            console.log(data)
        } else {
            console.log(`Falla catastrofica: ${status.code}`)
        }     
}
window.addEventListener("load", initApp)