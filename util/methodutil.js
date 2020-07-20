// const pageAppElements = require('../pages/luminateApps.page')
// const pageHomeElements = require('../pages/luminatehome.page')
// const elementutil = require('../util/elementutil')
// const frameworkStrings = require('../config/framework.strings')
// const luminateurls = require('../config/luminate.app.constants')
// const webdriverconstants = require('../config/webdriver.constants')
// const { assert } = require('chai')
// const {addStep} = require('@wdio/allure-reporter').default
// const {addAttachment} = require('@wdio/allure-reporter').default

// class UtilMethods{

//     navigateTo(page){
//         elementutil.logInfo('Navigating '+page+' Page ')
//         elementutil.logInfo('luminateurls.AppPage: '+luminateurls.AppPage)
//         switch(page) {
//             case luminateurls.AppPage:
//                 elementutil.doNavigateTo(luminateurls.AppURL)
//                 elementutil.doPause(webdriverconstants.INTERMETTENT_PAUSE)
//                 elementutil.doIsDocumentReady()
//                 elementutil.logInfo("Loaded page description is :"+pageAppElements.getAppPageDescription())                
//                 break;
//             case luminateurls.AnalyticsPage:
//                 elementutil.doNavigateTo(luminateurls.AnalyticsURL)
//                 break;
//             case luminateurls.HomePage:
//                 elementutil.doNavigateTo(luminateurls.HomeURL)
//                 console.log(pageHomeElements.getHomePageDescription())
//                 break;
//             default:
//               // code block
//           }
//     }

//     launchDataMaintenance(url){
//         this.logInfo('Launching Data Mainatenance App ')
//         elementutil.doLaunch(url)
//     }

//     // logInfo(description,status=frameworkStrings.PASS){
//     //     addStep(description,{},status)
//     //     if(status == frameworkStrings.FAIL){
//     //         addAttachment(frameworkStrings.ATTACHMENT, Buffer.from(browser.takeScreenshot(), "base64"), "image/png")
//     //         assert.isTrue(false,'Test Case failed')
//     //     }        
//     // }
// }

// module.exports = new UtilMethods();