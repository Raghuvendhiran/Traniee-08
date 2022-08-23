let apikey = "AIzaSyDOTs9mMVwL3E6GiMOv3Efb1jvik-SxIrU";
let channels = "https://www.googleapis.com/youtube/v3/channels?";
let video = "https://www.googleapis.com/youtube/v3/videos?";
let playlist = "https://www.googleapis.com/youtube/v3/playlists?";
let subcription = "https://www.googleapis.com/youtube/v3/subscriptions?"


const videoCard = document.getElementById("video-container");
const subcripe = document.getElementById("subcription");
const search1 =document.getElementById("search");


(async function get() {
    try {
        const res = await fetch(video + new URLSearchParams
            ({
                key: apikey,
                part: 'snippet',
                chart: 'mostPopular',
                maxResults: 50,
                regionCode: 'IN'
            }))
        if (res.ok) {
            const data = await res.json();
            data.items.forEach(item => {
                getchannel(item)
            })
        } else {
            throw new Error("Couldn't get carros car")
        }
    } catch (err) {
        console.log(err.message)
    }
})()

const getchannel = (output) => {
    (async function get2() {
        try {
            const res2 = await fetch(channels + new URLSearchParams
                ({
                    key: apikey,
                    part: 'snippet',
                    id: output.snippet.channelId,
                }))
            if (res2.ok) {
                const chl = await res2.json();
                output.channelThumbnail = chl.items[0].snippet.thumbnails.default.url;
                // console.log(output);
                makevideo(output);
            } else {
                throw new Error("Couldn't get API")
            }
        } catch (err) {
            console.log(err.message)
        }
    })()
}


const makevideo = (data) => {
    videoCard.innerHTML += `

    <div class="col-12 col-md-6 col-lg-4 col-xl-3" onclick="location.href='https://www.youtube.com/watch?v=${data.id}'">
    <a href="#" class="card card-video border-0 bg-transparent mb-4">
        <img src=" ${data.snippet.thumbnails.high.url}" class="img-fluid" alt="Minions">
        <div class="card-video-details d-flex mt-2">
            <div class="me-2">
                <img src="${data.channelThumbnail}" width="40" alt="">
            </div>
            <div>
                <h4>${data.snippet.title}</h4>
                <div>
                    <p ${data.snippet.channelTitle}></p>
                </div>                
            </div>
        </div>
    </a>
</div>   
 `}



const search = document.getElementById('search');
const searchbtn = document.getElementById('searchbtn');
let searchlink = "https://www.youtube.com/results?search_query=";


searchbtn.addEventListener('click', (e) => {
    if (search.value.length) {
        location.href = searchlink + search.value;
    }
})
search1.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        location.href = searchlink + search.value;
    }
})

