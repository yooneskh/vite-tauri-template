<script setup>
import Banner from '../../components/banner.vue';

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

var meta = getInfo(window.location.href.split('/').pop());
console.log(meta);

</script>

<template>
    <banner></banner>
    <div class="info page"
      :style="{ 'backgroundImage': `url(${meta.image})`, 'backgroundPosition': 'center', 'backgroundRepeat': 'no-repeat', 'backgroundSize': 'cover', 'backgroundAttachment': 'fixed'}">
      <div class="backdrop-blur-md inset-0-z-10">
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
