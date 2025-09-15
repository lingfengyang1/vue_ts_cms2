export const TIME_OUT = 10000

let BASE_URL = ""
// 当我们通过dev命令启动项目时 当前环境处于development 如若我们通过build、preview来启动项目的话 那么当前环境就处于production
if (import.meta.env.MODE === "production") {
  BASE_URL = "http://codercba.com:4000"
} else {
  BASE_URL = "http://codercba.com:5000"
}

export { BASE_URL }
