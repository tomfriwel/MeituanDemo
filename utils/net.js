// import fetch from 'fetch'

function post(options) {
    let url = options.url,
        data = options.data || {},
        extra = options.extra || {},
        success = options.success,
        fail = options.fail

    data = Object.assign(data, extra)

    console.log('url:' + url)
    console.log(data)

    // url = 'https://api.douban.com/v2/movie/coming_soon?count=20'

    // , {
    //     method: 'POST',
    // headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    // },
    //     body: JSON.stringify(data),
    // }
    let res = fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(res => {
        console.log(res)
    }).catch(res => {
        console.log(res)
    })

    // console.log(res)
    // startGetRequest(){
    // fetch(url)
    //     .then((response) => response.json()) //下一步操作
    //     .then((responseData) => {
    //         console.log(responseData); //打印出来
    //         // alert(responseData);
    //     })
    //     .catch((error) => {
    //         alert(error);
    //     })
    //  }

    // return fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    // }).then(function(response) {
    //     console.log(response)
    //     return response.blob()
    //   })
}

function get(options) {
    let url = options.url,
        data = options.data || {},
        extra = options.extra || {},
        success = options.success,
        fail = options.fail

    data = Object.assign(data, extra)

    console.log('url:' + url)
    console.log(data)

    return fetch(url, {
        method: 'GET'
    }).then(res => res.json())
}

module.exports = {
    post: post,
    get: get
}