const API_ANIME = 'https://api.waifu.im'

async function viewImgAnime(){
    const res = await fetch(`${API_ANIME}/search?many=1`)
    const data = await res.json()

    if(res.status == 200){
        const imgAnime = document.querySelector("#image-anime")
        const imgAnime2 = document.querySelector("#image-anime2")

        const btnAnime1 = document.getElementById('btnAnime1')
        const btnAnime2 = document.getElementById('btnAnime2')

        imgAnime.src = data['images'][0]['url']
        imgAnime2.src = data['images'][1]['url']

        btnAnime1.onclick = () => editAnimeFav(data['images'][0].image_id)
        btnAnime2.onclick = () => editAnimeFav(data['images'][1].image_id)
    } else{
        alert = 'FAILED'
    }
    console.log(data)
}
viewImgAnime()

const sectionAnime = document.querySelector("#anime-favorite")

async function containerAnimeFav(){
    const res = await fetch(`${API_ANIME}/fav?full=1`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Accept-Version': 'v5',
        'Authorization': 'Bearer qfFOspVSC27qyYMEaNMEmTdykJVCXh2Ie2Whb7zPhlLK18CEgBq6htApKD36OhSIpbqO98limoxFcjJsekEw3wBzsgw2zP0uGbNTohhJE2MjfSUJrVq6td8ZR4ujmitnv1ybrU56bdAA5gedpADQcdMCFN_xAuM2VXlBgIP-3JU'
        }
    })
    const data = await res.json()
    
    if(res.status == 200,201){
        //data.forEach(anime => {
            const articuleAnime = document.createElement("articule")
            const imgAnime = document.createElement("img")
            const btnAnime = document.createElement("button")
            const btnTextAnime = document.createTextNode("Delete anime of favorites")
            const h2 = document.createElement('h2')
            const h2Text = document.createTextNode("Anime Favorite")

            h2.appendChild(h2Text)
            sectionAnime.appendChild(h2)
            imgAnime.src = data['images'][0].url
            imgAnime.width = 300
            imgAnime.height = 400
            articuleAnime.appendChild(imgAnime)
            articuleAnime.appendChild(btnAnime)
            btnAnime.appendChild(btnTextAnime)
            btnAnime.onclick = () => deleteAnimeFavorite(data['images'][0]['image_id'])    
            sectionAnime.appendChild(articuleAnime)
        //})
    }
}

async function editAnimeFav(image_id){
    const res = await fetch(`${API_ANIME}/fav/insert?${image_id}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept-Version': 'v5',
        'Authorization': 'Bearer qfFOspVSC27qyYMEaNMEmTdykJVCXh2Ie2Whb7zPhlLK18CEgBq6htApKD36OhSIpbqO98limoxFcjJsekEw3wBzsgw2zP0uGbNTohhJE2MjfSUJrVq6td8ZR4ujmitnv1ybrU56bdAA5gedpADQcdMCFN_xAuM2VXlBgIP-3JU'
        },
        body:
        JSON.stringify({
            image_id: image_id
        })
    })
    if(res.status == 200,201){
        containerAnimeFav()
    }
}

async function deleteAnimeFavorite(image_id){
    const res = fetch(`${API_ANIME}/fav/delete?${image_id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Accept-Version': 'v5',
        'Authorization': 'Bearer qfFOspVSC27qyYMEaNMEmTdykJVCXh2Ie2Whb7zPhlLK18CEgBq6htApKD36OhSIpbqO98limoxFcjJsekEw3wBzsgw2zP0uGbNTohhJE2MjfSUJrVq6td8ZR4ujmitnv1ybrU56bdAA5gedpADQcdMCFN_xAuM2VXlBgIP-3JU'
        },
        body:
        JSON.stringify({
            image_id: image_id
        })
    })
    if(res.status == 200,201){
        containerAnimeFav()
        sectionAnime.innerHTML = ''
    }
}