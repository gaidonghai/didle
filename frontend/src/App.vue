<template>
  <el-container>
    <el-main>
      <div>
        <svg width="200" height="200">
          <polygon v-for="(polygon,i) in polygons" :key="i" :points="polygon" fill="#111111"></polygon>
        </svg>
      </div>

      <div>
        <el-select v-model="userInput" filterable placeholder="输入城市名称查询" @change="select">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>

        <el-table v-if="answers.length" :data="answers" :show-header="false">
          <el-table-column prop="attempt" label="城市"/>
          <el-table-column prop="message" label="目标"/>
        </el-table>


      </div>


    </el-main>
    <el-footer>
      <div>
        <el-link disabled>{{ currentUrl() }}</el-link>
      </div>
      <div>
        <el-button type="success" @click="copyClipboardGame">分享结果</el-button>
        <el-button type="primary" @click="initialize">随机新局</el-button>
      </div>
    </el-footer>
  </el-container>

</template>

<script>

import axios from 'axios'
import {ElMessage} from 'element-plus'
import {copyText} from 'vue3-clipboard'


export default {
  name: 'App',

  data() {
    return {
      cities: [],
      id: null,
      polygons: [],
      options: [],
      answers: []
    }
  },
  methods: {
    currentUrl() {
      return window.location.origin + '/?id=' + this.id;
    },
    select(val) {
      axios.get(this.apiServer + val + '/' + this.id).then(res => {
        let o = this.cities[val - 1];
        let direction = res.data.direction ? "⬆↗➡↘⬇↙⬅↖⬆"[Math.round(res.data.direction / 45)] : '';
        let remoteness = Math.min(Math.ceil(Math.log(res.data.distance / 150 + 1) / Math.log(2)), 5)
        let message = Array(remoteness).fill(direction).join('') + Array(5 - remoteness).fill("✅").join('')
        this.answers.push({
          attempt: o.provCh + o.cityCh,
          message
        })
      })
    },

    copyClipboardGame() {
      let message = []
          .concat('#Didle ' + this.id)
          .concat(this.answers.map(o => o.message))
          .concat(this.currentUrl())
          .join('\n');

      copyText(message, undefined, (error) => {
        if (error) {
          alert(error)
        } else {
          ElMessage.success('Game state copied!')
        }
      })
    },
    async initialize(id) {
      id=Number(id);
      if(!id) id = Math.floor(Math.random() * 1e4)
      this.polygons = [];
      this.answers = [];
      this.id =id;
      this.polygons = (await axios.get(this.apiServer + 'svgPolygons/' + this.id)).data
    }
  },
  async mounted() {

    //City options
    this.cities = (await axios.get(this.apiServer + 'all/')).data
    this.options = this.cities.map(o => ({
      value: o.id,
      label: o.provCh + o.cityCh + " " + o.cityEn
    }))

    let urlParams = new URLSearchParams(window.location.search);
    await this.initialize(urlParams.get('id'));



  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
