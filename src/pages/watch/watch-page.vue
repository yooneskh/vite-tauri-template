<script setup>
    import Banner from '../../components/banner.vue';
    import { fetch ,Body} from '@tauri-apps/api/http';
    import { onUnmounted, onUpdated } from 'vue';

  
    

</script>

<template #fallback>
  <banner></banner>
  <select>
    <option v-for="video in videos">
      {{ video.quality }}
    </option>
  </select>
  <!--load the video quality that's registred in the selection-->
  <div class="player">
  <video id="video-js" controls preload="auto" data-setup="{}" class="vjs-default-skin" width="640" height="480">
  <source :src="getValueFromKey(videos,lang)" type="application/x-mpegURL"/>
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="http://videojs.com/html5-video-support/" target="_blank">
          supports HTML5 video
        </a>
      </p>
  </video>
  </div>
  
  <!-- <div class="player" v-for="video of videos">
  {{video.quality}}
    <video
      id="vid1"
      width="1280"
      height="720"
      class="video-js"
      preload="false"
      controls
      data-setup="{}"
    >
      
    </video>
  </div> -->
  
</template>
 

<script>
export default {
  
    data() {
        return {
           videos: null,
           lang: 'ja-JP fr-FR'
        }
    },
    methods:{
      getQuality(keys) {
        let quality = [];
        for (var x = 0; x < keys.length; x++) {
          let tKey = keys[x];
          quality.push(tKey.quality);
        }
        return quality;
      }
      
    },
    created: async function() {
    function Videos(quality,link,subs){
        this.quality = quality;
        this.link = link;
        this.subs = subs;
    }
    function ModuleRequest(link, headers) {
      this.link = link;
      this.headers = headers;
    }
    function Subs(lang,link){
        this.lang = lang;
        this.link = link;
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
        ;
        let result = response.data;
        ;
        return result;
      } catch (e) {
        console.log(e);
      }
    }
    async function getVideos(id) {
        let videos = [];
        var streams = '';
        var subs = '';
        const url = 'https://kamyroll.herokuapp.com/videos/v1/streams?channel_id=crunchyroll&id='+id+'&locale=en-US&type=adaptive_hls&format=vtt';
        var token = await getToken();
        const headers = {
          'Authorization': 'Bearer ' + token.access_token,
          'Content-Type': 'application/x-www-form-urlencoded',
        };
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: headers
          })
          ;
          let result = response.data;
          const emptyHeaders = null;
          for(streams of result.streams){
            var quality = streams.audio_locale + ' ' + streams.hardsub_locale;
            var link = streams.url;
            link = new ModuleRequest(link, emptyHeaders);
            
            if(quality.split(' ')[1] == 'en-US' || quality.split(' ')[1] == 'fr-FR'){
                
                videos.push(new Videos(quality,link,null));
                continue;
            } else if(!quality.split(' ')[1]) {
                for(subs of result.subtitles){
                    var lang = subs.locale;
                    if(lang == 'en-US'){
                      var subslink = subs.url;
                      videos.push(new Videos(quality,link,new Subs(lang,subslink)));
                    }
                }
            }
          }
          return videos;
        } catch (e) {
          ;
        }
    }
        var streams = await getVideos(window.location.href.split('/').pop());
        this.videos = streams;
    },
    async mounted() {
      var video = document.getElementById('video-js');
      video.addEventListener('loadedmetadata', function() {
        video.play();
      });
      // var select = document.querySelector('select');
      // select.addEventListener('change', function() {
      //   var quality = 'ja-JP en-US';
      //   var video = document.querySelector('source').src;
      //   video.src = getValueFromKey(this.videos,quality);
      //   video.play();
      // });
    }
}
</script>
<!-- <template>
  <div class="hello">
    **<video
      id="vid1"
      width="500"
      height="300"
      class="video-js"
      preload="auto"
      poster="//vjs.zencdn.net/v/oceans.png"
      controls
      data-setup="{}"
    >
      <source src="https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8" type="application/x-mpegURL"/>
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="http://videojs.com/html5-video-support/" target="_blank">
          supports HTML5 video
        </a>
      </p>
    </video>
  </div>
</template>
 -->

<style scoped>
select {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  color: #fff;
  outline-color: white;
  outline-width: 1px;
}
</style>