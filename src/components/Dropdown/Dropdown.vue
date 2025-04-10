<template>
    <div 
    class="el-dropdown">

    @click="toggleDropdown">
        <slot></slot>
        <div class="el-dropdown-content" v-show="showDropdown">
            <slot name="content"></slot>
        </div>
</template>