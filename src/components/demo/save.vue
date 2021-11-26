<template>
  <el-dialog v-model="isVisible" :title="`${props.inheritTenant.id ? '编辑' : '新增'}租户`" width="500px" :before-close="close">
    <el-form ref="form" :model="state.form" :rules="state.formRules" label-suffix=":" label-width="100px">
      <el-form-item label="编码" prop="code">
        <el-input size="small" v-model="state.form.code" placeholder="请输入" style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input size="small" v-model="state.form.name" placeholder="请输入" style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="管理员账号" prop="tenantUserName">
        <el-input size="small" v-model="state.form.tenantUserName" placeholder="请输入" style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" prop="initPassword">
        <el-input size="small" v-model="state.form.initPassword" placeholder="请输入" style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contacts">
        <el-input size="small" v-model="state.form.contacts" placeholder="请输入" style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel">
        <el-input size="small" v-model="state.form.tel" placeholder="请输入" style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="行业" prop="industryCode">
        <el-select size="small" v-model="state.form.industryCode" placeholder="请选择" style="width:300px;" @change="changeIndustry">
          <el-option v-for="item in state.industries" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, reactive, watch, onMounted, defineEmits } from 'vue'
import http from '../../utils/http'

const props = defineProps({
  inheritIsVisible: Boolean,
  inheritTenant: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const form = ref()
const isVisible = ref(false)

const state = reactive({
  form: {
    code: '',
    name: '',
    tenantUserName: '',
    initPassword: '',
    contacts: '',
    tel: '',
    industryCode: '',
    industryName: ''
  },
  formRules: {
    code: [{
      required: true,
      message: '请输入编码',
      trigger: 'change'
    }],
    name: [{
      required: true,
      message: '请输入名称',
      trigger: 'change'
    }],
    tenantUserName: [{
      required: true,
      message: '请输入管理员账号',
      trigger: 'change'
    }],
    initPassword: [{
      required: true,
      message: '请输入管理员密码',
      trigger: 'change'
    }],
    contacts: [{
      required: true,
      message: '请输入联系人',
      trigger: 'change'
    }],
    tel: [{
      required: true,
      message: '请输入联系电话',
      trigger: 'change'
    }],
    industryCode: [{
      required: true,
      message: '请选择行业',
      trigger: 'change'
    }]
  },
  industries: [{
    code: '101',
    name: '互联网'
  }, {
    code: '102',
    name: '服务业'
  }]
})

watch(() => props.inheritIsVisible, val => {
  isVisible.value = val
})

watch(() => props.inheritTenant, val => {
  state.form.code = val.code
  state.form.name = val.name
  state.form.tenantUserName = val.tenantUserName
  state.form.initPassword = val.initPassword
  state.form.contacts = val.contacts
  state.form.tel = val.tel
  state.form.industryCode = val.industryCode
  changeIndustry(val.industryCode)
})

onMounted(() => {
  isVisible.value = false
})

const emit = defineEmits(['close', 'save'])

const close = () => {
  isVisible.value = false
  emit('close')
}

// 修改行业
const changeIndustry = (industryCode: string) => {
  if (!industryCode) {
    state.form.industryName = ''
    return
  }
  interface RoleItem {
    code?: string,
    name?: string
  }
  const industry: RoleItem = state.industries.find((item: RoleItem) => item.code === industryCode) || {}
  state.form.industryName = industry.name || ''
}

const save = () => {
  form.value.validate(async (valid: boolean) => {
    if (!valid) {
      return
    }
    let apiName = 'addTenant'
    const query = {
      id: ''
    }
    const id = props.inheritTenant.id
    if (id) {
      apiName = 'editTenant'
      query.id = id
    }
    const res = await http({
      apiName,
      // data: { ...state.form },
      query
    })
    console.log('res', res)
    form.value.clearValidate()
    form.value.resetFields()
    emit('save')
    close()
  })
}
</script>
