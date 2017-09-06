/* 
* @Author: Marte
* @Date:   2017-09-06 21:55:31
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-06 22:50:27
*/

// 配置文件
require.config({
    // baseUrl:'../lib',//基于html文件的路径,一般不设置
    paths:{
        // 这里的路径也是基于baseUrl,
        'jquery':'/lib/jquery-3.2.1',
    },
    // shim:{
    //     // 设置依赖
    //     // 表示jqueryui依赖jquery
    //     jqueryui:['jquery'],
        
    //     cookie:{
    //         exports:'Cookie'//暴露接口
    //     }
    // }
})