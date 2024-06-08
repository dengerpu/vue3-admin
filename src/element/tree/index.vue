<template>
  <el-tree
    style="max-width: 600px"
    :data="data"
    :show-checkbox="false"
    node-key="id"
    :props="defaultProps"
  />
</template>

<script lang="ts" setup>
const defaultProps = {
  children: 'children',
  label: 'label'
}
const data = [
  {
    id: 1,
    label: 'Level one 1',
    catory: true,
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        catory: true,
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
            catory: false
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
            catory: false
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: 'Level one 2',
    catory: true,
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
        catory: false
      },
      {
        id: 6,
        label: 'Level two 2-2',
        catory: false
      }
    ]
  },
  {
    id: 3,
    label: 'Level one 3',
    catory: true,
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
        catory: false
      },
      {
        id: 8,
        label: 'Level two 3-2',
        catory: false
      }
    ]
  }
]
</script>
