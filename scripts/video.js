console.log("video seript added");

function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let reminingSecond = time % 3600;
    const minute = parseInt(reminingSecond / 60);
    reminingSecond = reminingSecond % 60;
    return `${hour} hour ${minute} minute ${reminingSecond} second ago`;
}

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => dispayCategorics(data.categories))
        .catch((error) => console.log(error))
};

const loadvideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        .then((data) => displayvideos(data.videos))
        .catch((error) => console.log(error))
};

const loadCategoryVideos= (id)=>{
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayvideos(data.category))
    .catch((error) => console.log(error))
}

// const cardDemo = {

//     "category_id": "1001",
//     "video_id": "aaad",
//     "thumbnail": "https://i.ibb.co/f9FBQwz/smells.jpg",
//     "title": "Smells Like Teen Spirit",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
//             "profile_name": "Oliver Harris",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "5.4K",
//         "posted_date": "1672656000"
//     },
//     "description": "'Smells Like Teen Spirit' by Oliver Harris captures the raw energy and rebellious spirit of youth. With over 5.4K views, this track brings a grunge rock vibe, featuring powerful guitar riffs and compelling vocals. Oliver's verified profile guarantees a quality musical journey that resonates with fans of dynamic, high-energy performances."

// }

const displayvideos = (videos) => {
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";
    if(videos.length ===0 ){
        videoContainer.innerHTML = `
        <div class="min-h-screen flex flex-col gap-5 justify-center items-center">
        <img src="assets/" />
        </div>
        `;
        return;
    }
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement('div');
        card.classList = "card card-compact"
        card.innerHTML = `
        <figure class="h-[200px] relative">
        <img
          src=${video.thumbnail}
          class="h-full w-full object-cover"
          alt="Shoes" />
          ${
            video.others.posted_date?.length == 0 ? "" : `<span class="absolute text-xs right-2 bottom-2 bg-black rounded p-1 text-white">${getTimeString(video.others.posted_date)}</span>
            `
          }
      </figure>
      <div class="px-0 py-2 flex gap-2">
       <div>
       <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
       </div>
       <div>
       <h2 class="font-bold">${video.title}</h2>
       <div class="flex items-center gap-2">
       <p class="text-gray-400">${video.authors[0].profile_name}</p>

       ${video.authors[0].verified === true ? ' <i class="fa-solid fa-check bg-blue-500 text-white rounded-full p-1"></i>' : ""}


       </div>
       <p></p>
       </div>
      </div>
    `;
        videoContainer.append(card)
    });
}
// create DispayCategorics


const dispayCategorics = (categories) => {
    const categoryContainer = document.getElementById("categories");

    categories.forEach((item) => {
        console.log(item);
        // cerate a button
        const buttonContainer = document.createElement("div");
       buttonContainer.innerHTML=
       `
       <button onclick="loadCategoryVideos(${item.category_id})" class="btn">
       ${item.category}</button>
       `
        

        // add buttor
        categoryContainer.append(buttonContainer);
    });

};

loadCategories();
loadvideos();