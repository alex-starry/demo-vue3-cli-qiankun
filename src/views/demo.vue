<template>
  <div>
    <el-form ref="form" inline :model="state.form" label-suffix=":" label-width="72px">
      <el-form-item label="编号">
        <el-input size="small" v-model="state.form.code" placeholder="请输入" style="width:170px;"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input size="small" v-model="state.form.name" placeholder="请输入" style="width:170px;"></el-input>
      </el-form-item>
    </el-form>
    <el-row justify="end">
      <el-space>
        <el-button type="primary" size="small" :loading="state.isLoading" @click="setPaging">查询</el-button>
        <el-button size="small" @click="resetForm">重置</el-button>
      </el-space>
    </el-row>
    <el-divider></el-divider>
    <el-row justify="start" style="margin-bottom: 20px;">
      <el-space>
        <el-button type="primary" size="small" @click="add">新增</el-button>
      </el-space>
    </el-row>
    <el-table :data="state.list" border v-loading="state.isLoading" style="width: 100%">
      <el-table-column label="编号" prop="code" min-width="180"></el-table-column>
      <el-table-column label="名称" prop="name" min-width="180"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="scope">
          <el-space>
            <el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="del(scope.row)">删除</el-button>
            <el-button type="text" size="mini" @click="allocateRole(scope.row)">分配角色</el-button>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="state.total" :current-page="state.pageNum" :page-size="state.pageSize" :page-sizes="[10, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
  <dialog-save :inheritIsVisible="isVisibleDialogSave" :inheritTenant="state.currTenant" @close="isVisibleDialogSave = false" @save="save"></dialog-save>
  <dialog-allocate ref="refDialogAllocate" :inheritRecord="state.currTenant" inheritType="tenant" @save="saveRole"></dialog-allocate>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

import http from '../utils/http'

import DialogSave from '../components/demo/save.vue'
import DialogAllocate from '../components/demo/allocate.vue'

interface TenantItem {
  id: string
}

const form = ref(null)
const refDialogAllocate = ref()

const isVisibleDialogSave = ref(false)

const state = reactive({
  isLoading: false,
  communities: [],
  form: {
    code: '',
    name: ''
  },
  total: 0,
  pageNum: 1,
  pageSize: 10,
  list: [],
  currTenant: {}
})

const resetForm = () => {
  state.form.code = ''
  state.form.name = ''
}
const handleSizeChange = (pageSize: number) => {
  state.pageSize = pageSize
  state.pageNum = 1
  setPaging()
}
const handleCurrentChange = (pageNum: number) => {
  state.pageNum = pageNum
  setPaging()
}
const setPaging = async () => {
  state.isLoading = true
  const { total, records } = await http({
    apiName: 'pageTenant',
    params: {
      pageNo: state.pageNum,
      pageSize: state.pageSize,
      code: state.form.code,
      name: state.form.name
    }
  })
  state.total = total
  state.list = records
  state.isLoading = false
}
// 新增
const add = () => {
  state.currTenant = {}
  isVisibleDialogSave.value = true
}
// 编辑
const edit = (tenant: TenantItem) => {
  state.currTenant = tenant
  isVisibleDialogSave.value = true
}
// 分配角色
const allocateRole = (tenant: TenantItem) => {
  state.currTenant = tenant
  refDialogAllocate.value.isVisible = true
}
// 删除
const del = (tenant: TenantItem) => {
  ElMessageBox.confirm('此操作无法恢复，确认删除吗？', {
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    distinguishCancelAndClose: true,
    callback: async (action: string) => {
      if (action === 'confirm') {
        await http({
          apiName: 'delTenant',
          query: {
            id: tenant.id
          }
        })
        ElMessage.success('删除租户成功')
        setPaging()
      }
    }
  })
}
// 保存
const save = () => {
  setPaging()
}
// 保存角色
const saveRole = () => {
  setPaging()
}

setPaging()
</script>
