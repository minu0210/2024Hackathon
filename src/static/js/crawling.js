const axios = require("axios")
const cheerio = require("cheerio")
const express = require('express')
const app = express()

const getHtml = async() => {
    try{
        const html = await axios.get("https://school.koreacharts.com/school/meals/B000011300/202312.html")
        let ulList = []
        const $ = cheerio.load(html.data)
        const bodyList = $("table.table-bordered tbody tr")
        bodyList.map((i, element) => {
          ulList[i] = {
            idx: i + 1,
            // title: $(element).find("tr.box-title").text().replace(/\s/g, ""),
            day: $(element).find("td.text-center:nth-child(1)").text().replace(/\s/g, " "),
            week: $(element).find("td.text-center:nth-child(2)").text().replace(/\s/g, " "),
            menu: $(element).find("td.text-center p").text().replace(/\s/g, " ")
          }
        })
        console.log("Meals Menu : ", ulList)
    }catch(error){
        console.error(error)
    }
}