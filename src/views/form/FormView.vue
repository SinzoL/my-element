<template lang="">
    <div>
        <el-form :model="model" :rules="rules">
            <el-form-item label="email" prop="email">
                <el-input v-model="model.email"></el-input>
            </el-form-item>
            <el-form-item label="password" prop="password">
                <el-input v-model="model.password" type="password"></el-input>
            </el-form-item>
            <div>
                <el-button type="primary">Submit</el-button>
                <el-button type="info">Reset</el-button>
            </div>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import ElForm from '@/components/Form/Form.vue'
import ElFormItem from '@/components/Form/FormItem.vue'
import ElInput from '@/components/Input/Input.vue'
import ElButton from '@/components/Button/Button.vue'

import { reactive } from 'vue'

const model = reactive({
    email: '123@qq.com',
    password: 'temp'
})

const rules = reactive({
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
    ]
})

defineOptions({
    name: 'FormView'
})

</script>
