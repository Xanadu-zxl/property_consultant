
// 公用方法
export default {
  // 表单数据处理
  tableListData (fields, orderFieldList) {
    let tableList = []
    orderFieldList.forEach(element => {
      let field = fields.find(field => field.identity_key === element)
      let objData = {}

      if (field) {
        switch (field.type) {
          case 'Field::RadioButton': {
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.option_id = ''
            objData.options = field.options
            break
          }
          case 'Field::DateTime': {
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.value = ''
            break
          }
          default: {
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.value = ''
          }
        }
        tableList.push(objData)
      }
    })
    return tableList
  },

  // 排行榜排序
  rank (list) {
    for (let i = 0; i < list.length; i++) {
      list[i].top = i + 1
    }
    return list
  },
  // 级联数据渲染
  cascade (res) {
    let columns = []
    res.forEach(el => {
      // console.log(el)
      let obj = {}
      if (!el.parent_id) {
        obj.text = el.name
        obj.id = el.id
        columns.push(obj)
      }
    })
    // 二级级联
    this.cascadeChildren(columns, res)
    return columns
  },
  cascadeChildren (columns, res) {
    columns.forEach(columns => {
      let children = []
      res.forEach(res => {
        let obj = {}
        if (columns.id === res.parent_id) {
          obj.text = res.name
          obj.id = res.id
          if (obj.text) {
            children.push(obj)
          }
        }
      })
      columns.children = children
      this.cascadeChildrenThird(children, res)
    })
  },
  cascadeChildrenThird (children, res) {
    children.forEach(children => {
      let childrens = []
      res.forEach(res => {
        let obj = {}
        if (children.id === res.parent_id) {
          obj.text = res.name
          obj.id = res.id
          if (obj.text) {
            childrens.push(obj)
          }
        }
      })
      children.children = childrens
    })
  }
}
