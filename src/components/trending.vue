<script setup>
function trendingAnime(title, slug, url, image, description, rating, episodes, status, aired, aired_start, aired_end,type){
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
function getFile(url){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
}
function getTrending() {
    const array = [];
    const response =  getFile('https://kitsu.io/api/edge/trending/anime');
    const json = JSON.parse(response);
    for(var i = 0; i < json.data.length; i++){
        var anime = json.data[i];
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
        array.push(new trendingAnime(title, slug, url, image, description, rating, episodes, status, aired, aired_start, aired_end,type));
    }
    return array;
}
var trending = getTrending();
</script>

<template>
<div class="trending">
    <v-card v-for="item in trending">
        <v-card-text style="
    opacity: 1;
">
            <v-row>
                <v-col cols="2">
                    <img :src="item.image" :alt="item.title" class="rounded-3xl shadow-lg" />
                </v-col>
                <v-col cols="10">
                    <h1 class="text-3xl font-bold">
                        {{item.title}}
                    </h1>
                    <p class ="text-black-400 max-h-40 overflow-y-hidden">
                        {{item.description}}
                    </p>
                    <v-btn color="primary" :to="'/anime/'+item.slug" class="mt-3">
                        View
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</div>
</template>