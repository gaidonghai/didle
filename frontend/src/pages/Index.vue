<template>
  <q-page>
    <div class="column justify-center items-center">
      <div class="q-ma-md">
        <svg width="200" height="200">
          <polygon v-for="(polygon,i) in polygons" :key="i" :points="polygon" fill="#111111"></polygon>
        </svg>
      </div>
      <div>
        <q-table v-if="answers.length"
                 :rows="answers"
                 :columns="columnDef"
                 separator="none"
                 :pagination="{rowsPerPage:0}"
                 hide-header
                 hide-bottom
                 flat
                 dense
        />
      </div>
      <div>
        <q-select
          outlined
          v-model="userInput"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="currentOptions"
          @filter="filterFn"
          @update:model-value="select"
          emit-value
          map-options
          label="输入名称或拼音检索"
          dense
          options-dense
        >
        </q-select>


      </div>

      <div class="row">
        <q-btn class="q-ma-sm" color="secondary" @click="copyClipboardGame">分享结果</q-btn>
        <q-btn class="q-ma-sm" color="primary" @click="initialize">随机新局</q-btn>
      </div>
      <span style="color:grey"> {{ currentUrl() }}</span>
    </div>

  </q-page>
</template>

<script>

import {defineComponent} from "vue";
import {useQuasar, copyToClipboard} from 'quasar'

export default defineComponent({
  name: "PageIndex",

  data() {
    return {
      cities: [],
      id: null,
      polygons: [],
      options: [],
      currentOptions: [],
      answers: [],
      userInput: '',
      notification: () => {
      }
    }
  },
  setup() {
    let columnDef = [];
    columnDef.push({
      name: 'attempt',
      label: '',
      field: r => r.attempt,
      style: 'padding-right:16px',
      align: 'center'
    })
    for (let i = 0; i < 5; i++) {
      columnDef.push({
        name: String(i),
        label: '',
        field: (o => (p => p.message[o]))(i),
        style: `width:18px;${(i < 4) ? 'padding:0' : 'padding-left:0'}`,
        align: 'center'
      })
    }

    return {
      quasar: useQuasar(),
      columnDef
    }
  },
  async mounted() {
    //City options
    this.cities = (await this.$api.get('/all')).data
    this.currentOptions = this.options = this.cities.map((o, i) => ({
      value: i,
      label: o.fullCH,
      search: o.fullCH + o.cityPY + o.cityInitialPY
    }))

    //Initialize
    let urlParams = new URLSearchParams(window.location.search);
    await this.initialize(urlParams.get('id') || this.$route.params.id);
  },

  methods: {
    //Initialize with given or randomized id
    async initialize(id) {
      id = Number(id);
      if (!id) id = Math.floor(Math.random() * 1e6)
      this.polygons = [];
      this.answers = [];
      this.id = id;
      this.polygons = (await this.$api.get(`/svgPolygons/${this.id}`)).data
      let o = this.cities[id % this.cities.length];
      console.log(`Game initialized with: ${id} (${o.fullCH})`)
    },

    currentUrl() {
      return window.location.origin + '/?id=' + this.id;
    },

    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.currentOptions = this.options.filter(v => v.search.toLowerCase().indexOf(needle) > -1)
      })
    },

    select(val) {
      let cityPickedByUser = this.cities[val];
      let cityFullName = cityPickedByUser.fullCH;
      console.log(`User selected: ${val} (${cityFullName})`)
      this.$api.get(`/${val}/${this.id}`).then(res => {
        let distance = res.data.distance;
        let direction = res.data.direction;
        let arrow = direction ? "⬆↗➡↘⬇↙⬅↖⬆"[Math.round(direction / 45)] : '';
        let remoteness = Math.min(Math.ceil(Math.log(distance / 150 + 1) / Math.log(2)), 5)
        let message = Array(remoteness).fill(arrow).join('') + Array(5 - remoteness).fill("✅").join('')
        console.log({distance, direction, message})
        this.answers.push({
          attempt: cityFullName,
          message
        });
        this.userInput = '';
      })
    },

    copyClipboardGame() {
      let message = []
        .concat('#Didle ' + this.id)
        .concat(this.answers.map(o => o.message))
        .concat(this.currentUrl())
        .join('\n');

      copyToClipboard(message)
        .then(() => {
          this.notification();
          this.notification = this.quasar.notify({
            message: '已复制到剪贴板',
            color: 'green',
            position: 'top',
            timeout: 1000
          })
        })
        .catch((err) => {
          alert(err)
        })
    }
  }
});
</script>
