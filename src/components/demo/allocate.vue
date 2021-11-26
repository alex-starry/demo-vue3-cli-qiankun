<template>
  <el-dialog v-model="isVisible" title="分配角色" width="500px" :before-close="close">
    <el-tree ref="refTree" :props="state.treeProps" :data="state.tree" show-checkbox default-expand-all node-key="id" @check-change="checkTree" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, reactive, watch, defineExpose } from 'vue'
import { useStore } from 'vuex'
import http from '../../utils/http'

const store = useStore()

const props = defineProps({
  inheritType: {
    type: String,
    default: 'tenant'
  },
  inheritRecord: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const emit = defineEmits(['close', 'save'])

const refTree = ref()
const isVisible = ref(false)

const state = reactive({
  treeProps: {
    label: 'name',
    children: 'roleList',
    disabled: 'false'
  },
  tree: [],
  checkedKeys: []
})

watch(() => isVisible.value, async val => {
  if (!val) {
    return
  }
  await setTree()
  if (props.inheritType === 'tenant') {
    setList()
    return
  }
  setUserList()
})

watch(() => props.inheritRecord, val => {
  console.log('inheritRecord', val)
  // queryTree()
})

const close = () => {
  isVisible.value = false
  emit('close')
}
// 设置树
const setList = async () => {
  const keys = await http({
    apiName: 'listTenantRole',
    query: {
      id: props.inheritRecord.id
    }
  })
  refTree.value.setCheckedKeys(keys || [])
}
// 设置树
const setTree = async () => {
  const tree = await http({
    apiName: 'treeTenantRole'
  })
  state.tree = tree
}
// 设置已分配用户角色
const setUserList = async () => {
  const roles = await http({
    apiName: 'listAllocatedUserRole',
    query: {
      id: props.inheritRecord.id
    }
  })
  interface RoleItem {
    id: string
  }
  const keys = roles.map((item: RoleItem) => item.id)
  refTree.value.setCheckedKeys(keys)
}
// 选中树节点
const checkTree = () => {
  const checkedKeys = refTree.value.getCheckedKeys(true)
  state.checkedKeys = checkedKeys
}
// 保存
const save = async () => {
  if (!state.checkedKeys || state.checkedKeys.length === 0) {
    store.dispatch('showToast', { type: 'fail', message: '请选择角色' })
    return
  }
  let apiName = 'addTenantRoles'
  if (props.inheritType === 'user') {
    apiName = 'allocateUserRoles'
  }
  await http({
    apiName,
    query: {
      id: props.inheritRecord.id
    }
    // data: state.checkedKeys
  })
  emit('save')
  close()
}

defineExpose({
  isVisible
})
</script>
