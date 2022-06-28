<script setup>
import Banner from '../../components/banner.vue';
import { fetch ,Body} from '@tauri-apps/api/http';


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
var slug = window.location.href.split('/').pop();
var meta = getInfo(slug);

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
    let result = response.data;


    return result;

  } catch (e) {
    console.log(e);
  }
}
// const json = new Promise(async (resolve, reject) => {
//   const result = await getToken();
//   resolve(result);
// }).then(result => {
//   let test = result.access_token;
//   console.log(test);
// });

async function getEpisodes(slug){
    var token = await getToken();
    const url = `https://kamyroll.herokuapp.com/content/v1/search?query=${slug}&limit=1&channel_id=crunchyroll`;
    console.log(url);
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Kamyroll/3.17.0 Android/7.1.2 okhttp/4.9.1',
            'Authorization': `Bearer ${token.access_token}`,
        },
        method: "GET",
    });
    let result = response.data;
    return {data: result};
}
getEpisodes(slug).then(result => {
    console.log(result.data);
});
</script>

<template>
    <banner></banner>
    <div class="info page"
      :style="{ 'backgroundImage': `url(${meta.image})`, 'backgroundPosition': 'center', 'backgroundRepeat': 'no-repeat', 'backgroundSize': 'cover', 'backgroundAttachment': 'fixed','padding-top':'10px'}">
      <div class="backdrop-blur-md">
        <div class="hero text-left px-8 text-white h-screen relative">
          <v-row class ="kitsu_metadata">
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
          <!-- <v-row v-for=" episode in episodes" class ="episodes">
            <v-col cols="3">
              <img :src="episode.image" :alt="episode.title" class="rounded-3xl shadow-lg" />
            </v-col>
            <v-col cols="9">
              <v-row>
                <v-col cols="12">
                  <h1 class="text-3xl font-bold">{{ episode.title }}</h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <p class="text-xl">{{ episode.description }}</p>
                  <p class="text-xl">{{ episode.rating }}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row> -->
          </div>
        </div>
      </div>
    </div>
</template>
<script>

</script>