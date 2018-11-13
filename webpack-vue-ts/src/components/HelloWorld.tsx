import Vue, { CreateElement } from 'vue'
import Component from 'vue-class-component'

@Component
export default class World extends Vue {
  render (h: CreateElement) {
    return <p>This is rendered viaxx TSX</p>
  }
}
