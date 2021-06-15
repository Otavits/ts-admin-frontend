<template>
  <div>
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    axios.get('//localhost:8000/data').then(({ data }) => {
      console.log(data)
    })
  }
}
</script>
