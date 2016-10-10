function formatDate(input) {
  input = '' + input;
  var year = input.slice(0, 4)
  var month = input.slice(4, 6)
  var day = input.slice(6)
  var weekday = new Date(year, month-1, day).getDay()
  var weekdays = ['日', '一', '二', '三', '四', '五', '六']

  var result = month + '月' + day + '日 星期' + weekdays[weekday]
  return result
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatDate: formatDate
}
