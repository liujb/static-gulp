#### 相关声明

    为了更好的管理静态资源在项目中的使用规范，现出具如下规范，请各位开发人员务必遵从。

#### 静态资源大致规划

    ➜  static git:(develop) ✗ tree -L 1 
    .
    ├── README.md
    ├── auth (权限系统)
    ├── base（开发人员写的公共）
    ├── cms（CMS系统）
    ├── crm（CRM系统）
    ├── kefu（客服系统）
    └── lib（第三方类库）
    
#### 1. base目录 (大MIS项目公共的js，css，imgs，主要针对开发人员自己写的代码)
 
    ➜  base git:(develop) ✗ tree -L 2
    .
    ├── css
    │   └── common.css
    ├── imgs
    └── js

#### 2. lib目录 (主要包含第三方js，css，fonts类库)

    ➜  lib git:(develop) ✗ tree -L 2
    .
    ├── jquery.js
    ├── main.js（requirejs的main函数）
    ├── require.js
    └── res(其中res目录下的文件都是通过bower来获取的)
        ├── bootstrap
        ├── handlebars
        ├── jquery
        ├── jquery-mods
        ├── requirejs
        └── zepto
    
#### 3. crm目录 (主要包含CRM系统js，css，imgs，html)

    ➜  crm git:(develop) ✗ tree -L 1
    .
    ├── css
    ├── imgs
    ├── js
    └── html（实际项目中并不会用到，开发人员在写纯静态页面时使用，项目完成后留作备份）

另外：项目下的js和css里面都采用模块的形式来组织，跟Controller下面的形式一样如
    
    ➜  auth git:(develop) ✗ tree -L 3
    .
    ├── css
    │   └── placeholder
    ├── imgs
    │   └── placeholder
    └── js
        ├── menu
        │   ├── add.js
        │   ├── edit.js
        │   └── query.js
        └── placeholder
    
*Note by liujb 2015-02-07*
