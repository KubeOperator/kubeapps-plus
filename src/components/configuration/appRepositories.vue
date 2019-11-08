<template>
  <div class="app-repositories-content">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <h1 style="float: left">{{$t('message.app_repositories')}}</h1>
        </div>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <el-table
            :data="tableData"
            stripe
            style="width: 100%">
      <el-table-column
              type="index"
              width="50">
      </el-table-column>
      <el-table-column
              prop="repo"
              :label="$t('message.repo')"
              width="180">
      </el-table-column>
      <el-table-column
              prop="url"
              :label="$t('message.url')">
      </el-table-column>
      <el-table-column :label="$t('message.actions')">
        <template slot-scope="scope">
          <el-button
                  size="medium" icon="el-icon-refresh"
                  @click="handleEdit(scope.$index, scope.row)">{{$t('message.refresh')}}</el-button>
<!--          <el-button-->
<!--                  size="mini"-->
<!--                  type="danger"-->
<!--                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-button class="gred-btn" type="primary" icon="el-icon-refresh">{{$t('message.refresh_all')}}</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
          repo: 'bitnami',
          url: 'https://charts.bitnami.com/bitnami'
        }, {
            repo: 'incubator',
            url: 'https://kubernetes-charts-incubator.storage.googleapis.com'
        }, {
            repo: 'stable',
            url: 'https://kubernetes-charts.storage.googleapis.com'
        }, {
            repo: 'svc-cat',
            url: 'https://svc-catalog-charts.storage.googleapis.com'
        }]
      }
    }
  }
</script>

<style scoped>
  .app-repositories-content{
    padding: 1em;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 5em;
  }
  .gred-btn {
    margin: 2em;
    float: left;
  }
</style>
