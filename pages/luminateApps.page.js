const elementutil = require('../util/elementutil')
const webdriverconstants = require('../config/webdriver.constants')
const frameworkStrings = require('../config/framework.strings')
const h3Tag = '<h3>'
const classTag = 'MuiTypography-root MuiTypography-h3 MuiTypography-gutterBottom'
const divTag = '<div>'
const buttonTag = '<button>'
const buttonClass = 'MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary'

class LuminateAppsPage{
    
    //Locators
    get myApps(){ 
        return $("//*[@id='root']/div/div[2]/div/div[1]/div/div/div/h1")
    }
    get appFrame(){
        return  $('iframe#mfe')
        //return $("//*[@id='mfe']")
        //return $('mfe')
    }

    get appParent(){
        
        return $("//*[@id='root']//div[2]//div[@class='MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3']")
    }

    //Actions
    getPageTitle(){
        return elementutil.doGetPageTitle()
    }

    getAppPageDescription(){
        elementutil.doSwitchToFrame(this.appFrame)
        return elementutil.doGetText(this.myApps)
    }

    launchApp(appname){
        elementutil.logInfo('Launching the Application '+appname)
        let num = 0
        let i,j

        //elementutil.doSwitchToFrame(this.appFrame)
        let parentElement = this.appParent
        console.log('got the parent element '+parentElement)
         if(!elementutil.doIsDisplayed(parentElement)){
             elementutil.logInfo(frameworkStrings.ELEMENT_NOT_PRESENT,frameworkStrings.FAIL)
         }
        //******************** For Label***************************        
        let childElements = parentElement.$$(h3Tag)
        console.log('The child elements are '+childElements.length)
        for(i=0;i<childElements.length;i++){
            try{
                if(childElements[i].getAttribute('class') === classTag){
                    num = i
                    let tmp = childElements[i].$$(divTag)
                    console.log("App Title "+tmp[0].getText())
                    if(tmp[0].getText().includes(appname)){
                        elementutil.logInfo("Found the Application "+appname)
                        //**********For button using parent*********** */
                        let btnParent = childElements[i].$('..').$('..').$('..')
                        let childElementsbtn = btnParent.$$(buttonTag)
                        for(j=0;j<childElementsbtn.length;j++){
                            try{
                                if(childElementsbtn[j].getAttribute('class') === buttonClass){
                                    console.log("before clicking on button" )
                                    elementutil.doPause(webdriverconstants.INTERMETTENT_PAUSE)
                                    childElementsbtn[j].click()
                                    elementutil.logInfo("Clicked on "+appname+" Launch button")
                                    console.log("Clicked on App Button")
                                    elementutil.doPause(webdriverconstants.INTERMETTENT_PAUSE)
                                    break
                                }
                            }catch(err){}            
                        }
                        //**********For button using parent*********** */
                        break
                    }
                }
            }catch(err){}            
        }
    }
}
module.exports = new LuminateAppsPage();