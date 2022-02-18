<template>
  <div class="project-container" ref="projectContainer">
    <div
      class="project-item"
      title="点击图片或标题跳转"
      v-for="p in project"
      :key="p.id"
    >
      <a :href="p.url" target="_blank">
        <div class="img">
          <img class="t" :src="p.imgUrl" />
        </div>
      </a>
      <div class="info">
        <h2>
          <a
            :href="
             p.url
            "
            target="_blank"
          >
            {{ p.name }}
          </a>
        </h2>
        <p>效果预览图</p>
      </div>
    </div>
    <div style="padding:20px;">持续更新中...</div>
  </div>
</template>

<script>
import mainScroll from "@/mixins/mainScroll.js";
import Empty from "@/components/Empty";
import getProjects from "@/api/project.js";
export default {
  components: {
    Empty,
  },
  mixins: [mainScroll("projectContainer")],
 async created() {
    const rep = await getProjects();
    this.project = rep;
  },
  data() {
    return {
      project: [],
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
div.img{
  width: 180px;
  height: 180px;
  padding: 0 20px;
  img{
    width: 100%;
    height: 100%;
  }
}
.project-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.project-item {
  transition: 0.5s;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  &:hover {
    box-shadow: -1px 1px 5px #000;
    transform: scale(1.01) translate(3px, -3px);
    color: inherit;
  }
  .info {
    line-height: 1.7;
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .github {
    font-size: 14px;
    color: @primary;
  }
}
</style>
