<script setup>
import Banner from '../../components/banner.vue';
import { fetch ,Body} from '@tauri-apps/api/http';


// function Episode(title,url,description,headers){
//   this.title = title;
//   this.url = url;
//   this.headers = headers;
//   this.description = description;
// }

function getFile(url){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
}

function infoAnime (title, slug, url, image, description, rating, episodes, status, aired, aired_start, aired_end,type){
    this.title = title;
    this.slug = slug;
    this.url = url;
    this.image = image;
    this.description = description;
    this.rating = rating;
    this.episodes = episodes;
    this.status = status;
    this.aired = aired;
    this.aired_start = aired_start;
    this.aired_end = aired_end;
    this.type = type;
}

function getInfo(slug){
    const response =  getFile(`https://kitsu.io/api/edge/anime?fields%5Bcategories%5D=slug%2Ctitle&filter%5Bslug%5D=${slug}&include=categories%2CanimeProductions.producer`);
    const json = JSON.parse(response);
    var anime = json.data[0];
    var show  = anime.attributes;
    var title = show.titles.en;
    if(title == undefined){
        title = show.titles.en_jp;
    }
    var slug = show.slug;
    var url = 'url';
    var image = show.posterImage.medium;
    var description = show.synopsis;
    var rating = show.averageRating;
    var episodes = show.episodeCount;
    if(episodes == undefined){
        episodes = 0;
    }
    var status = show.status;
    var aired = show.startDate;
    var aired_start = show.startDate;
    var aired_end = show.endDate;
    if(aired_end == undefined){
        aired_end = 'N/A';
    }
    var type = show.showType
    return new infoAnime(title, slug, url, image, description, rating, episodes, status, aired, aired_start, aired_end,type);
}
// async function getToken() {


//   const url = 'https://kamyroll.herokuapp.com/auth/v1/token';
//   const headers = {
//     'Authorization': 'Basic vrvluizpdr2eby+RjSKM17dOLacExxq1HAERdxQDO6+2pHvFHTKKnByPD7b6kZVe1dJXifb6SG5NWMz49ABgJA==',
//     'Content-Type': 'application/x-www-form-urlencoded',
//   };
//   try {
//     var body = Body.text('refresh_token=IV%2BFtTI%2BSYR0d5CQy2KOc6Q06S6aEVPIjZdWA6mmO7nDWrMr04cGjSkk4o6urP%2F6yDmE4yzccSX%2FrP%2FOIgDgK4ildzNf2G%2FpPS9Ze1XbEyJAEUyN%2BoKT7Gs1PhVTFdz%2FvYXvxp%2FoZmLWQGoGgSQLwgoRqnJddWjqk0ageUbgT1FwLazdL3iYYKdNN98BqGFbs%2Fbaeqqa8aFre5SzF%2F4G62y201uLnsElgd07OAh1bnJOy8PTNHpGqEBxxbo1VENqtYilG9ZKY18nEz8vLPQBbin%2FIIEjKITjSa%2BLvSDQt%2F0AaxCkhClNDUX2uUZ8q7fKuSDisJtEyIFDXtuZGFhaaA%3D%3D&grant_type=refresh_token&scope=offline_access')
//     const response = await fetch(url, {
//       method: "POST",
//       body: body,
//       headers: headers

//     })
//     let result = response.data;
//     return result;
//   } catch (e) {
//     console.log(e);
//   }
//   }
// const json = new Promise(async (resolve, reject) => {
//   const result = await getToken();
//   resolve(result);
// }).then(result => {
//   let test = result.access_token;
//   console.log(test);
// });

// async function getId(slug) {
//   var type = '';
//   var anime = '';
//   var token = await getToken();
//   const url = `https://kamyroll.herokuapp.com/content/v1/search?query=${slug}&limit=1&channel_id=crunchyroll`;
//   const response = await fetch(url, {
//     headers: {
//       'User-Agent': 'Kamyroll/3.17.0 Android/7.1.2 okhttp/4.9.1',
//       'Authorization': `Bearer ${token.access_token}`,
//     },
//     method: "GET",
//   });
//   let result = response.data;
//   for (type of result.items) {
//     for (anime of type.items) {
//       if (anime.slug_title == slug) {
//         return anime.id;
//       }
//     }
//   }
// }

// async function getEpisodes(slug){
//     var season = '';
//     var epi=' ';
//     var episodes = [];
//     var id  = await getId(slug);
//     console.log(id);
//     var token = await getToken();
//     const url = `https://kamyroll.herokuapp.com/content/v1/seasons?id=${id}&channel_id=crunchyroll&locale=en-US`;
//     const options =  {
//         headers: {
//             'User-Agent': 'Kamyroll/3.17.0 Android/7.1.2 okhttp/4.9.1',
//             'Authorization': `Bearer ${token.access_token}`,
//         },
//         method: "GET",
//     }
//     const response = await fetch(url,options);
//     let result = response.data;
//     if(url.includes('seasons')){
//       for(season of result.items){
//         for(epi of season.episodes){
//             var titre = epi.title;
//             var id = epi.id;
//             var desc = epi.description;
//             var link = 'https://kamyroll.herokuapp.com/videos/v1/streams?id=' + id + '&channel_id=crunchyroll&locale=en-US';
//             episodes.push(new Episode(titre,link,desc,options));
//         }
//     }
//     console.log(episodes)
//     return episodes
//     }
    
// }
const slug = window.location.href.split('/').pop();
const meta = getInfo(slug);
// let episodes = await getEpisodes(slug);

// getId(slug).then(result =>
//   console.log(result)
// );

</script>

<template class="bg-gray-800">
  <banner></banner>
  <div class="info page"
    :style="{ 'backgroundImage': `url(${meta.image})`, 'backgroundPosition': 'center', 'backgroundRepeat': 'repeat', 'backgroundSize': 'cover','padding-top':'10px'}">
    <div class="backdrop-blur-md">
      <div class="hero text-left px-8 text-white h-screen relative">
        <v-row class="kitsu_metadata">
          <v-col cols="3">
            <img :src="meta.image" :alt="meta.title" class="rounded-3xl shadow-lg" />
          </v-col>
          <v-col cols="9">
            <v-row>
              <v-col cols="12">
                <h1 class="text-3xl font-bold">{{ meta.title }}</h1>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p class="text-xl">{{ meta.description }}</p>
                <p class="text-xl">{{ meta.rating }}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div class="episodes">
          <h1 class="text-3xl font-bold pt-10">Episodes</h1>
          <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 flex justify-center">
            <div v-for=" episode in episodes"
              class="rounded-lg shadow-lg bg-white max-w-sm">
              <img class="rounded-t-lg"
                :src="episode.poster" :alt="episode.title" />
              <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">{{ episode.title }}</h5>
                <p class="text-gray-700 text-base mb-4">{{ episode.description }}</p>
                <a :href="episode.url.link"
                  class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Watch Video
                  <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      episodes: null,
    }
  },
  async mounted () {
    function Episode(title, url, description,poster) {
      this.title = title;
      this.url = url;
      this.description = description;
      this.poster = poster;
    }

    function ModuleRequest(link, headers) {
      this.link = link;
      this.headers = headers;
    }
    async function getToken() {
      const url = 'https://kamyroll.herokuapp.com/auth/v1/token';
      const headers = {
        'Authorization': 'Basic vrvluizpdr2eby+RjSKM17dOLacExxq1HAERdxQDO6+2pHvFHTKKnByPD7b6kZVe1dJXifb6SG5NWMz49ABgJA==',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      try {
        var body = Body.text('refresh_token=IV%2BFtTI%2BSYR0d5CQy2KOc6Q06S6aEVPIjZdWA6mmO7nDWrMr04cGjSkk4o6urP%2F6yDmE4yzccSX%2FrP%2FOIgDgK4ildzNf2G%2FpPS9Ze1XbEyJAEUyN%2BoKT7Gs1PhVTFdz%2FvYXvxp%2FoZmLWQGoGgSQLwgoRqnJddWjqk0ageUbgT1FwLazdL3iYYKdNN98BqGFbs%2Fbaeqqa8aFre5SzF%2F4G62y201uLnsElgd07OAh1bnJOy8PTNHpGqEBxxbo1VENqtYilG9ZKY18nEz8vLPQBbin%2FIIEjKITjSa%2BLvSDQt%2F0AaxCkhClNDUX2uUZ8q7fKuSDisJtEyIFDXtuZGFhaaA%3D%3D&grant_type=refresh_token&scope=offline_access')
        const response = await fetch(url, {
          method: "POST",
          body: body,
          headers: headers

        })
        console.log(response);
        let result = response.data;
        console.log(result);
        return result;
      } catch (e) {
        console.log(e);
      }
    }
    async function getId(slug) {
      console.log(slug);
      var type = '';
      var anime = '';
      var token = await getToken();
      const url = `https://kamyroll.herokuapp.com/content/v1/search?query=${slug}&limit=35&channel_id=crunchyroll`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Kamyroll/3.17.0 Android/7.1.2 okhttp/4.9.1',
          'Authorization': `Bearer ${token.access_token}`,
        },
        method: "GET",
      });
      let result = response.data;
      for (type of result.items) {
        for (anime of type.items) {
          if (slug.includes(anime.slug_title)) {
            return anime.id;
          } else {
            console.log('not found');
          }
        }
      }
    }
    var season = '';
    var epi=' ';
    var episodes = [];
    var id  = await getId(window.location.href.split('/').pop());
    console.log(id);
    var token = await getToken();
    const url = `https://kamyroll.herokuapp.com/content/v1/seasons?id=${id}&channel_id=crunchyroll&locale=en-US`;
    const options =  {
        headers: {
            'User-Agent': 'Kamyroll/3.17.0 Android/7.1.2 okhttp/4.9.1',
            'Authorization': `Bearer ${token.access_token}`,
        },
        method: "GET",
    }
    const response = await fetch(url,options);
    let result = response.data;
    console.log(result)
    if(url.includes('seasons')){
      for(season of result.items){
        for(epi of season.episodes){
            var titre = epi.title;
            var id = epi.id;
            var desc = epi.description;
            var image = epi.images.thumbnail[2].source;
            var link = 'http://localhost:8080/watch/series/' + id;
            var headers = {
                'User-Agent': 'Kamyroll/3.17.0 Android/7.1.2 okhttp/4.9.1',
                'Authorization': `Bearer ${token.access_token}`,
            };
            link = new ModuleRequest(link, headers);
            episodes.push(new Episode(titre,link,desc,image));
        }
    }
    console.log(episodes);
    this.episodes = episodes
    }
  },
}
</script>