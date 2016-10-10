const util = require('../../utils/util.js')

Page({
  data: {
    show_index: false,
    welcome_animation_data: {},
    welcome_image: {
      url: "/images/default-background.jpg",
      user: "Panmax"
    },
    loading: false,
    top_stories: [],
    article_list: [],
    date: null
  },

  onLoad: function () {
    this.fetchLatest()
  },

  onReady: function () {
    var animation = wx.createAnimation({
      duration: 5000,
      timingFunction: "ease"
    });

    animation.scale(1.1).step()
    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      this.setData({
        show_index: true
      })
    }.bind(this), 3000)
  },

  fetchLatest: function () {
    if (this.data.loading) {
      return
    }
    this.setData({
      loading: true
    });
    var that = this;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/latest',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        data = data.data
        that.setData({
          top_stories: data.top_stories,
          article_list: [data],
          date: data.date
        })
      },
      complete: function () {
        that.setData({
          loading: false
        })
      }
    });
  },

  fetchBefore: function () {
    console.log('===')
    if (!this.data.date || this.data.loading) {
      return
    }
    this.setData({
      loading: true
    })
    var that = this
    wx.request({
      url: "http://news-at.zhihu.com/api/4/news/before/" + this.data.date,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        data = data.data
        data.title = util.formatDate(data.date)
        that.setData({
          article_list: that.data.article_list.concat(data),
          date: data.date
        })
      },
      complete: function () {
        setTimeout(function () {
          that.setData({
            loading: false
          })
        }.bind(this), 200)
      }
    })
  }
})