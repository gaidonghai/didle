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

        <el-table v-if="answers.length" :data="answers">
          <el-table-column prop="attempt" label="城市"/>
          <el-table-column prop="direction" label="目标方向"/>
          <el-table-column prop="distance" label="目标距离(km)"/>
        </el-table>


      </div>

      <hr>


    </el-main>
    <el-footer>
      <div>
      <el-link disabled>{{currentUrl}}</el-link>
      </div><div>
        <el-button type="success" @click="copyClipboard">复制链接</el-button>
        <el-button type="primary" @click="randomize">随机新局</el-button>
      </div>
    </el-footer>
  </el-container>

</template>

<script>

import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
  name: 'App',

  data() {
    return {
      cities: [],
      currentUrl: window.location.href,
      id: null,
      polygons: [],
      options: [],
      answers:[]
    }
  },
  methods: {
    select(val) {
      axios.get(this.apiServer + val + '/' + this.id).then(res => {
        let o = this.cities[val - 1];
        let directions = "↑↗→↘↓↙←↖↑";
        this.answers.push({
          attempt: o.provCh + o.cityCh,
          direction: res.data.direction?directions[Math.floor(res.data.direction / 45)]:'',
          distance: res.data.distance
        })
      })
    },
    copyClipboard() {
      navigator.clipboard.writeText(this.currentUrl);
      ElMessage({
        message: '链接已复制',
        type: 'success',
      })
    },
    randomize() {
      let totalCityCount = this.cities.length;
      let randomId = Math.floor(Math.random() * totalCityCount) + 1;
      let randomMultiplier = Math.floor(Math.random() * 1000) + 223;
      let newId = randomId + 787 * randomMultiplier;
      window.location.href = '/?id=' + newId;
    }
  },
  async mounted() {

    //City options
    this.cities = (await axios.get(this.apiServer + 'all/')).data

    let urlParams = new URLSearchParams(window.location.search);
    this.id = (urlParams.get('id')) % 787;
    if (!this.id) this.randomize();

    this.options = this.cities.map(o => ({
      value: o.id,
      label: o.provCh + o.cityCh + " " + o.cityEn
    }))

    this.polygons = (await axios.get(this.apiServer + 'svgPolygons/' + this.id)).data


  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
