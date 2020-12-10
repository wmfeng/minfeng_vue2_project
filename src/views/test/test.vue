<template>
  <div class="components-container board">
    <nx-kanban :key="1" class="kanban todo" :list="list1" :options="options" header-text="Todo" />
    <nx-kanban
      :key="2"
      class="kanban working"
      :list="list2"
      :options="options"
      header-text="Working"
    />
    <nx-kanban :key="3" class="kanban done" :list="list3" :options="options" header-text="Done" />
  </div>
</template>
<script>
import nxKanban from "@/components/nx-kanban";
import { formatDate, getYearTimestamp } from "@/utils/data";
export default {
  name: "dragKanban-demo",
  components: {
    nxKanban
  },
  data() {
    return {
      options: {
        group: "mission"
      },
      list1: [
        { name: "Mission", id: 1 },
        { name: "Mission", id: 2 },
        { name: "Mission", id: 3 },
        { name: "Mission", id: 4 }
      ],
      list2: [
        { name: "Mission", id: 5 },
        { name: "Mission", id: 6 },
        { name: "Mission", id: 7 }
      ],
      list3: [
        { name: "Mission", id: 8 },
        { name: "Mission", id: 9 },
        { name: "Mission", id: 10 }
      ]
    };
  },
  methods: {
    delUrlParams(url, name) {
      //根据#号拆分
      let poundArr = url.split("#");
      //？拆分
      let questionArr = [];
      if (poundArr) {
        //把#接上
        poundArr.forEach((element, index) => {
          if (index > 0) {
            element = "#" + element;
          }

          let tempArr = element.split("?");
          if (!tempArr) {
            return true;
          }
          tempArr.forEach((item, idx) => {
            //保留问号
            if (idx > 0) {
              item = "?" + item;
            }
            questionArr.push(item);
          });
        });
      } else {
        questionArr = url.split("?");
        if (questionArr) {
          questionArr.forEach((item, idx) => {
            if (idx > 0) {
              item = "?" + item;
            }
          });
        }
      }

      if (!questionArr) {
        return url;
      }

      //&符号的处理
      let andArr = [];
      questionArr.forEach((item, index) => {
        let andIdx = item.indexOf("&");
        if (andIdx <= -1) {
          andArr.push(item);
          return true;
        }

        let tempAndArr = item.split("&");
        tempAndArr.forEach((ele, idx) => {
          if (idx > 0) {
            ele = "&" + ele;
          }
          andArr.push(ele);
        });
      });
      let newUrl = "";
      andArr.forEach(item => {
        let nameIndex = item.indexOf(name + "=");
        //不拼接要删除的参数
        if (nameIndex > -1) {
          //保留第一个问号
          let questionIdx = item.indexOf("?");
          if (questionIdx == 0) {
            newUrl += "";
          }
          return true;
        }
        newUrl += item;
      });

      return newUrl.replace(/\?\&/g, "?");
    }
  },
  mounted() {
    console.log(11111,this.delUrlParams("http://10.1.193.200:5002/?code=3425211#/project/1/vizs","code"))

    // window.onresize = () => {
    //   return (() => {
    //     window.screenWidth = document.body.clientWidth;
    //     window.screenHeight = document.body.clientHeight;
    //     console.log(1, window.screenWidth);
    //     console.log(2, window.screenHeight);
    //   })();
    // };
    // console.log(
    //   formatDate(getYearTimestamp()),
    //   getYearTimestamp(),
    //   getYearTimestamp("2020-05-27")
    // );
  }
};
</script>
<style lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4a9ff9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>

