
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
  }
}
