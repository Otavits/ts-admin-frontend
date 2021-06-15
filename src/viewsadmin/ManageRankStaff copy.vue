<template>
    <div>
        <div id="main_content">
            Conrtent here
        </div>
    </div>
</template>

<script>
export default {
  components: {
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

#main_content {
    position: absolute;
    text-align: left;
    color: black;
    overflow: auto;
    display: flex;
    max-width: none;
    margin-top: 70px;
    left: 50%;
    transform: translate(-50%);
    display: block;
}
#gender {
    color: black;
    text-align: center;
    font-family: 'Noto Sans', sans-serif;
}
#province {
    color: black;
    text-align: center;
    font-family: 'Noto Sans', sans-serif;
}
.jumbotron {
    background-color: #ffc107;
}
.table{
    background-color:white;
}
.button {
    float: right;
}
</style>
